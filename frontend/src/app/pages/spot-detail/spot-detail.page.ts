import { Component, OnInit, inject, AfterViewInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { initTE, Carousel, Lightbox } from 'tw-elements';
import { TourismService } from 'src/app/services/tourism.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MapComponent } from 'src/app/components/map/map.component';
import { TourismCat } from 'src/app/models/tourism-cat.model';
import { Spot } from 'src/app/models/spot.model';

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

  spot$!: Observable<Spot>;

  ngOnInit(): void {
    initTE({ Carousel, Lightbox });
    window.scrollTo({ top: 0, left:0, behavior: 'smooth'});
    this.#route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this.#router.navigateByUrl('spots');
        return;
      }
      this.spot$ = this.#tourismService.getById(
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
