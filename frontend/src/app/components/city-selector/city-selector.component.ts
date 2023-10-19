import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CityName } from 'src/app/models/city-name.model';

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
      <option value="" hidden selected ></option>
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
export class CitySelectorComponent {
  @Output() cityEvent = new EventEmitter<string>();

  #fb = inject(FormBuilder);
  cities = Object.values(CityName);
  form = this.#fb.group({
    city: ['', ]
  });

  onFormSubmit(event: SubmitEvent) {
    const v = this.form.get('city')!.value;
    if (!v) return;
    this.cityEvent.emit(v);
  }
}
