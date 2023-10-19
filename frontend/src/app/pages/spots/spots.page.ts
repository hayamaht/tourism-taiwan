import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { initTE, Ripple, Select, Carousel, Dropdown,  } from 'tw-elements';
import { CardComponent } from 'src/app/components/card/card.component';
import { TourismService } from 'src/app/services/tourism.service';
import { Observable } from 'rxjs';
import { CityName } from 'src/app/models/city-name.model';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CitySelectorComponent } from 'src/app/components/city-selector/city-selector.component';

@Component({
  selector: 'app-spots',
  standalone: true,
  templateUrl: './spots.page.html',
  imports: [
    CommonModule, RouterModule,
    CardComponent, CitySelectorComponent,
  ],
})
export class SpotsPage {
  #tourismService = inject(TourismService);

  spots$!:  Observable<any>;

  ngOnInit(): void {
    initTE({ Ripple, Select });
  }

  getSpots(cityName: string) {
    this.spots$ = this.#tourismService
      .getByCityName('spot', cityName as CityName);
  }
}
