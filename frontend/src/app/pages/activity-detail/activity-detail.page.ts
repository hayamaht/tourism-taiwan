import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TourismService } from 'src/app/services/tourism.service';
import { Observable } from 'rxjs';
import { MapComponent } from 'src/app/components/map/map.component';
import { TourismCat } from 'src/app/models/tourism-cat.model';

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

  activities$!: Observable<any>;

  ngOnInit(): void {
    this.#route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) return;
      this.activities$ = this.#tourismService.getById(
        TourismCat.Activity,
        id
      );
    });
  }

  goBack() {
    this.#location.back()
    //this.#router.navigate(['..']);
  }
}
