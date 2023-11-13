import { Component, OnInit, inject, AfterViewInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { TourismService } from 'src/app/services/tourism.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, map, of, tap } from 'rxjs';
import { MapComponent } from 'src/app/components/map/map.component';
import { TourismCat } from 'src/app/models/tourism-cat.model';
import { Hotel, ScenicSpot, Spot } from 'src/app/models/scene.model';

@Component({
  selector: 'app-spot-detail',
  standalone: true,
  templateUrl: './spot-detail.page.html',
  imports: [
    CommonModule, RouterModule,
    MapComponent,
  ],
})
export class SpotDetailPage implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #location = inject(Location);
  #tourismService = inject(TourismService);

  spot!: ScenicSpot;
  nearbys$!: Observable<Spot[]>;
  nearbyHotels$!: Observable<Spot[]>;

  ngOnInit(): void {
    this.#route.paramMap.subscribe(params => {
      const id = params.get('id');
      //const type = params.get('type');
      if (!id) {
        this.#router.navigateByUrl('scenes');
        return;
      }
      this.#tourismService.getById(
        TourismCat.ScenicSpot,
        id
      ).pipe(
        tap(_ => this.#goTop()),
        map(spot => {
          if (!spot) {
            this.#router.navigateByUrl('scenes');
            return;
          }

          this.nearbys$ = this.#tourismService.getNearByLocations(
            spot.position.lat, spot.position.lng, TourismCat.ScenicSpot
          );

          this.nearbyHotels$ = this.#tourismService.getNearByLocations(
            spot.position.lat, spot.position.lng, TourismCat.Hotel
          );

          return spot
        })
      ).subscribe((spot) => this.spot = spot as ScenicSpot);
    });
  }

  goBack() {
    this.#location.back()
  }

  // goto(id: string) {
  //   console.log(id);
  //   //this.#location.replaceState(`/spot/${id}`);
  //   this.#router.navigateByUrl(`/spot/${id}` ,{
  //     onSameUrlNavigation: 'reload'
  //   });
  // }

  #goTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
