import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MapComponent } from 'src/app/components/map/map.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TourismService } from 'src/app/services/tourism.service';
import { Observable } from 'rxjs';
import { TourismCat } from 'src/app/models/tourism-cat.model';

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  templateUrl: './hotel-detail.page.html',
  imports: [CommonModule, MapComponent],
})
export class HotelDetailPage implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #location = inject(Location);
  #tourismService = inject(TourismService);

  hotels$!: Observable<any>;

  ngOnInit(): void {
    //initTE({ Carousel, Lightbox });
    this.#route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) return;
      this.hotels$ = this.#tourismService.getById(
        TourismCat.Hotel,
        id
      );
    });
  }

  goBack() {
    this.#location.back()
    //this.#router.navigate(['..']);
  }
}
