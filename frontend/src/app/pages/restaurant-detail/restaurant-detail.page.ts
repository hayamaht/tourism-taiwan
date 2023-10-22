import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MapComponent } from 'src/app/components/map/map.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TourismService } from 'src/app/services/tourism.service';
import { TourismCat } from 'src/app/models/tourism-cat.model';
import { Observable } from 'rxjs';

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

  restaurants$!: Observable<any>;

  ngOnInit(): void {
    this.#route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) return;
      this.restaurants$ = this.#tourismService.getById(
        TourismCat.Restaurant,
        id
      );
    });
  }

  goBack() {
    this.#location.back()
    //this.#router.navigate(['..']);
  }
}
