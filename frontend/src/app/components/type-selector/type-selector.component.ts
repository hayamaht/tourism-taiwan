import { Component, EventEmitter, OnInit, Output, OnChanges, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourismCat, TourismCategoryTW } from 'src/app/models/tourism-cat.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-type-selector',
  standalone: true,
  template: `
  <select
    (change)="onChange($event)"
    class="select select-sm select-bordered leading-3 min-w-min max-w-xs">
    <option value="" selected disabled>- 類型 -</option>
    <option *ngFor="let t of typesTW"
      value="{{t[0]}}" >
      {{ t[1] }}
    </option>
  </select>
  `,
  imports: [CommonModule, FormsModule],
})
export class TypeSelectorComponent implements OnInit {
  //@Input() selected!: string;
  @Output() typeChange = new EventEmitter<string>();

  typesTW = Object.entries(TourismCategoryTW);

  ngOnInit(): void {
    //console.log(this.selected);
  }

  onChange(event: any) {
    this.typeChange.emit(event.target.value);
  }
}
