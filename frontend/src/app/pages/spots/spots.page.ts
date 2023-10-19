import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Carousel, Dropdown, initTE, Ripple } from 'tw-elements';
import { CardComponent } from 'src/app/components/card/card.component';
import { TourismService } from 'src/app/services/tourism.service';
import { Observable } from 'rxjs';
import { CityName } from 'src/app/models/city-name.model';

@Component({
  selector: 'app-spots',
  standalone: true,
  templateUrl: './spots.page.html',
  imports: [
    CommonModule, RouterModule,
    CardComponent,
  ],
})
export class SpotsPage {
  #tourismService = inject(TourismService);

  spots$!:  Observable<any>;

  ngOnInit(): void {
    initTE({ Ripple });

    this.spots$ = this.#tourismService
      .getByCityName('spot', CityName.Tainan);
  }
}
