import { Component, OnInit, inject, AfterViewInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { initTE, Carousel, Lightbox } from 'tw-elements';
import { TourismService } from 'src/app/services/tourism.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MapComponent } from 'src/app/components/map/map.component';
import { TourismCat } from 'src/app/models/tourism-cat.model';

@Component({
  selector: 'app-spot-detail',
  standalone: true,
  templateUrl: './spot-detail.page.html',
  imports: [CommonModule, MapComponent,],
})
export class SpotDetailPage implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #location = inject(Location);
  #tourismService = inject(TourismService);

  spots$!: Observable<any>;

  ngOnInit(): void {
    initTE({ Carousel, Lightbox });
    this.#route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) return;
      this.spots$ = this.#tourismService.getById(
        TourismCat.ScenicSpot,
        id
      );
    });
  }

  goBack() {
    this.#location.back()
    //this.#router.navigate(['..']);
  }
}
