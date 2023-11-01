import { Component, EventEmitter, OnInit, Output, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initTE, Ripple, Select, Carousel, Dropdown,  } from 'tw-elements';
import { CityName, CityNameTW } from 'src/app/models/city-name.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-city-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  template: `
<form [formGroup]="form"
  class="m-4">
  <div class="flex space-x-2 items-center justify-center ">
    <select (ngModelChange)="onChange($event)"
      title="city" name="city" id="city"
      formControlName="city"
      class="border border-gray-400 p-2 rounded-md w-28">
      <!-- <option value="" hidden selected></option> -->
      <option *ngFor="let c of citiesTW"
        [value]="c[0]"
      >{{ c[1] }}</option>
    </select>
  </div>
</form>
  `
})
export class CitySelectorComponent implements OnInit {
  @Output() cityEvent = new EventEmitter<string>();

  #route = inject(ActivatedRoute);
  #fb = inject(FormBuilder);

  citiesTW = Object.entries(CityNameTW);
  form = this.#fb.group({
    city: ['Taipei', ]
  });

  ngOnInit(): void {
    initTE({ Ripple, Select });
    this.#route.paramMap.subscribe(params => {
      const c = params.get('city');
      if (!c) return;
      this.form.patchValue({
        city: c
      })
    });
  }

  onChange(cityName: string) {
    this.cityEvent.emit(cityName);
  }
}
