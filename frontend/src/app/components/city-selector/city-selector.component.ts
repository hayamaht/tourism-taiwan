import { Component, EventEmitter, OnInit, Output, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initTE, Ripple, Select, Carousel, Dropdown,  } from 'tw-elements';
import { CityName } from 'src/app/models/city-name.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-city-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  template: `
<form [formGroup]="form" (ngSubmit)="onFormSubmit($event)"
  class="m-4">
  <div class="flex space-x-2 items-center justify-center ">
    <select title="city" name="city" id="city"
      formControlName="city"
      data-te-select-init>
      <option *ngFor="let c of cities"
        [value]="c"
      >{{ c }}</option>
    </select>
    <label data-te-select-label-ref>請選擇城市</label>
    <button type="submit"
      [disabled]="form.pristine "
      class="btn btn-primary"
      data-te-ripple-init
      data-te-ripple-color="light">
      確定
    </button>
  </div>
</form>
  `
})
export class CitySelectorComponent implements OnInit {
  @Output() cityEvent = new EventEmitter<string>();

  #route = inject(ActivatedRoute);
  #fb = inject(FormBuilder);

  cities = Object.values(CityName);
  form = this.#fb.group({
    city: ['', ]
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

  onFormSubmit(event: SubmitEvent) {
    const v = this.form.get('city')!.value;
    if (!v) return;
    this.cityEvent.emit(v);
  }
}
