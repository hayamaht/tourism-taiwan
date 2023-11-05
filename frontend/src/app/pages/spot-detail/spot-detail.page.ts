import { Component, OnInit, inject, AfterViewInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { initTE, Carousel, Lightbox } from 'tw-elements';
import { TourismService } from 'src/app/services/tourism.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { MapComponent } from 'src/app/components/map/map.component';
import { TourismCat } from 'src/app/models/tourism-cat.model';
import { Spot } from 'src/app/models/spot.model';

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

  spot!: Spot;
  nearbys$!: Observable<Spot[]>;

  ngOnInit(): void {
    initTE({ Carousel, Lightbox });

    this.#route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this.#router.navigateByUrl('spots');
        return;
      }
      this.#tourismService.getById(
        TourismCat.ScenicSpot,
        id
      ).pipe(
        tap(_ => this.#goTop())
      ).subscribe(spot => {
        if (!spot) {
          this.#router.navigateByUrl('spots');
          return;
        }
        this.spot = spot;

        this.nearbys$ = this.#tourismService
          .getNearByLocations(
            spot.Position.PositionLat,
            spot.Position.PositionLon,
          )
      });


    });
  }

  goBack() {
    this.#location.back()
  }

  #goTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
