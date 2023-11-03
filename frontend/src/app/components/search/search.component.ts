import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-term',
  standalone: true,
  imports: [CommonModule],
  template: `
<div>
<input #s type="search" title="search"
  name="search" id="search"
  placeholder="請輸入您要搜尋景點、旅遊活動"
  (keyup.enter)="search(s.value)"
  [value]="term"
  class="input input-bordered input-primary"/>
</div>
  `
})
export class SearchTermComponent {
  #router = inject(Router);
  @Input() term: string = '';
  searchTerm = '';

  search(term: string) {
    term = term.trim();
    if(!term) return;
    this.#router.navigateByUrl('/search/'+ term);
  }
}
