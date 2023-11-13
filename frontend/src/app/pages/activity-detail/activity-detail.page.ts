import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TourismService } from 'src/app/services/tourism.service';
import { Observable, tap } from 'rxjs';
import { MapComponent } from 'src/app/components/map/map.component';
import { TourismCat } from 'src/app/models/tourism-cat.model';
import { Activity, EventSpot } from 'src/app/models/scene.model';

@Component({
  selector: 'app-activity-detail',
  standalone: true,
  templateUrl: './activity-detail.page.html',
  imports: [CommonModule, MapComponent],
})
export class ActivityDetailPage implements OnInit {
  #route = inject(ActivatedRoute);
  #location = inject(Location);
  #tourismService = inject(TourismService);

  activity!: Activity;

  ngOnInit(): void {
    this.#route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) return;
      this.#tourismService.getById(
        TourismCat.Activity,
        id
      ).pipe(
        tap(_ => this.#goTop()),
      ).subscribe(a => {
        this.activity = a as EventSpot;
      });
    });
  }

  goBack() {
    this.#location.back()
    //this.#router.navigate(['..']);
  }

  #goTop() {
    window.scrollTo({
      top:0, left:0, behavior:'smooth'
    });
  }
}
