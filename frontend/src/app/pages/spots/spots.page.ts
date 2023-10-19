import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { initTE, Ripple, Select, Carousel, Dropdown,  } from 'tw-elements';
import { CardComponent } from 'src/app/components/card/card.component';
import { TourismService } from 'src/app/services/tourism.service';
import { Observable } from 'rxjs';
import { CityName } from 'src/app/models/city-name.model';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-spots',
  standalone: true,
  templateUrl: './spots.page.html',
  imports: [
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule,
    CardComponent,
  ],
})
export class SpotsPage {
  #tourismService = inject(TourismService);
  #fb = inject(FormBuilder);

  spots$!:  Observable<any>;

  cities = Object.values(CityName);
  form = this.#fb.group({
    city: ['', ]
  });

  ngOnInit(): void {
    initTE({ Ripple, Select });
  }

  onFormSubmit(event: SubmitEvent) {
    const v = this.form.get('city')!.value;
    if (!v) return;

    this.spots$ = this.#tourismService
      .getByCityName('spot', v as CityName);
  }
}
