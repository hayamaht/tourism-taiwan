import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CityName, CityNameTW } from 'src/app/models/city-name.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-city-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  template: `
<select (change)="onChange($event)"
  class="select select-sm select-bordered leading-3 min-w-min max-w-xs">
  <option value="" selected disabled>- 城市 -</option>
  <option *ngFor="let c of citiesTW"
    [value]="c[0]"
  >{{ c[1] }}</option>
</select>
  `
})
export class CitySelectorComponent implements OnInit  {
  @Input() selectedCity!: string;
  @Output() cityChange = new EventEmitter<string>();

  #route = inject(ActivatedRoute);

  citiesTW = Object.entries(CityNameTW);

  ngOnInit(): void {
  }

  onChange(event: any) {
    this.cityChange.emit(event.target.value);
  }
}
