import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { TourismCat } from 'src/app/models/tourism-cat.model';
import { CityName } from 'src/app/models/city-name.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  template: `
    <div class="join my-2 px-1">
      <button (click)="prevPage()"
        [disabled]="page === 1"
        class="join-item btn btn-sm">
        <span class="material-symbols-outlined">
          chevron_left
        </span>
      </button>
      <select #pagination title="pagination"
            [(ngModel)]="selectedPage"
            (change)="onPageChange($event)"
      class="join-item select select-sm select-bordered leading-3 ">
        <option *ngFor="let j of [].constructor(total); let i=index"
          value="{{i+1}}">第 {{ i+1 }} 頁</option>
      </select>
      <button  (click)="nextPage()"
        [disabled]="page === total"
        class="join-item btn btn-sm">
        <span class="material-symbols-outlined">
          chevron_right
          </span>
      </button>
    </div>
  `,
  imports: [CommonModule, FormsModule],
})
export class PaginationComponent implements OnInit {
  //@Input() type!: string;
  //@Input() city!: string;
  @Input() total!: number;
  @Input() page!: number;
  @Input() selectedPage!: number;
  //@Output() pageChange = new EventEmitter<number>();

  #location = inject(Location);
  #router = inject(Router);

  ngOnInit(): void {
    console.log(this.page);
  }

  onPageChange(event: any) {
    const n = event.target.value;
    this.gotoPage(n)
  }

  gotoPage(n: number) {
    this.page = n;
    this.#gotoPage();
  }

  prevPage() {
    this.page -= 1;
    this.#gotoPage();
  }

  nextPage() {
    this.page += 1;
    this.#gotoPage();
  }

  #gotoPage() {
    console.log(this.page);
    this.#router.navigate([], {
      queryParams: {
        p: this.page
      },
      queryParamsHandling: 'merge'
    });
    //this.pageChange.emit(this.page);
    this.selectedPage = this.page;
  }

}
