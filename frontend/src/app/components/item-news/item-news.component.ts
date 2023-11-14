import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { News, NewsCategory } from 'src/app/models/news.model';

@Component({
  selector: 'app-item-news',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
<div class="flex space-x-2 items-start border-b-2 border-dotted my-2">
  <div class="badge badge-outline shrink-0 text-white"
    [ngClass]="setCategoryColor()">
    {{ category }}
  </div>
  <div>
    <h2 class="text-sm font-bold text-secondary link">
      <a (click)="modal.showModal();onClick()">
        {{ news.Title }}
      </a>
    </h2>
    <div>
      <span class="material-symbols-outlined text-gray-400">calendar_month</span>
      <span class="text-gray-400">{{ news.PublishTime |date: 'YYYY-MM-dd'}}</span>
    </div>
  </div>
</div>

<dialog #modal id="modal" class="modal  ">
  <div class="modal-box w-11/12 max-w-5xl">
    <h3 class="font-bold text-2xl flex items-center space-x-2">
      <div class="badge badge-outline shrink-0 text-white"
        [ngClass]="setCategoryColor()">
        {{ category }}
      </div>
      {{ news.Title }}
    </h3>
    <div class="my-4 h-fit max-h-64 overflow-y-auto touch-auto">
      <div #desc id="desc" [outerHTML]="news.Description"></div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-secondary">關閉</button>
      </form>
    </div>
  </div>
</dialog>
  `
})
export class ItemNewsComponent implements OnInit {
  @Input() news!: News;
  @ViewChild('desc') desc!: ElementRef;

  categories = Object.values(NewsCategory);
  category!: string;

  ngOnInit(): void {
    this.category = this.categories[parseInt(this.news.NewsCategory)];
  }

  setCategoryColor() {
    return {
      'bg-primary': this.news.NewsCategory === '0',
      'bg-info': this.news.NewsCategory === '1',
      'bg-warning': this.news.NewsCategory === '2',
      'bg-red-400': this.news.NewsCategory === '3',
    }
  }

  onClick() {
    // console.log(this.desc.nativeElement);
    // this.desc.nativeElement.scrollTo(0,0);
  }
}
