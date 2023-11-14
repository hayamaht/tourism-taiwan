import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MapComponent } from 'src/app/components/map/map.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TourismService } from 'src/app/services/tourism.service';
import { Observable, map, tap } from 'rxjs';
import { TourismCat } from 'src/app/models/tourism-cat.model';
import { Hotel } from 'src/app/models/scene.model';

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  templateUrl: './hotel-detail.page.html',
  imports: [CommonModule, RouterModule, MapComponent],
})
export class HotelDetailPage implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #location = inject(Location);
  #tourismService = inject(TourismService);

  hotel!: Hotel;
  nearbys$!: Observable<Hotel[]>;

  ngOnInit(): void {
    this.#route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this.#router.navigateByUrl('scenes');
        return;
      }
      this.#tourismService.getById(
        TourismCat.Hotel, id
      ).pipe(
        tap(_ => this.#goTop()),
        map(h => {
          if (!h) {
            this.#router.navigateByUrl('scenes');
            return
          }
          this.nearbys$ = this.#tourismService.getNearByLocations(
            h.position.lat, h.position.lng, TourismCat.Hotel
          ) as Observable<Hotel[]>;
          return h;
        })
      ).subscribe(h => this.hotel = h as Hotel);
    });
  }

  goBack() {
    this.#location.back()
    //this.#router.navigate(['..']);
  }

  #goTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
