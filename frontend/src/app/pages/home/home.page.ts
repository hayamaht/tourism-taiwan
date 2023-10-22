import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TourismService } from 'src/app/services/tourism.service';
import { Observable } from 'rxjs';
import {
  Collapse,
  Ripple,
  initTE,
} from "tw-elements";

import { CityName } from 'src/app/models/city-name.model';
import { CardActivityComponent } from 'src/app/components/card-activity/card-activity.component';
import { TourismCat } from 'src/app/models/tourism-cat.model';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  imports: [CommonModule, CardActivityComponent],
})
export class HomePage implements OnInit {
  #router = inject(Router);
  #tourismService = inject(TourismService);

  activities$!: Observable<any>;

  ngOnInit(): void {
    initTE({ Collapse, Ripple });
    this.activities$ = this.#tourismService.getByCityName(
      TourismCat.Activity,
      CityName.Taipei,
      1,
      9,
      'StartTime desc'
    );
  }

  getStarted() {
    this.#router.navigateByUrl('/spots')
  }
}
