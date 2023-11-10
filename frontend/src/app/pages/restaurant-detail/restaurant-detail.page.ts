import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MapComponent } from 'src/app/components/map/map.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TourismService } from 'src/app/services/tourism.service';
import { TourismCat } from 'src/app/models/tourism-cat.model';
import { Observable, tap } from 'rxjs';
import { Restaurant } from 'src/app/models/scene.model';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  templateUrl: './restaurant-detail.page.html',
  imports: [CommonModule, MapComponent,],
})
export class RestaurantDetailPage {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #location = inject(Location);
  #tourismService = inject(TourismService);

  restaurants!: Restaurant;

  ngOnInit(): void {
    this.#route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this.#router.navigateByUrl('scenes');
        return;
      }
      this.#tourismService.getById(
        TourismCat.Restaurant,
        id
      ).pipe(
        tap(_ => this.#goTop())
      ).subscribe(r => {
        this.restaurants = r as Restaurant
      })
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
