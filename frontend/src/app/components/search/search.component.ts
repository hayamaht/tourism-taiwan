import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  template: `
<input type="search" title="search"
      name="search" id="search"
      placeholder="請輸入您要搜尋景點、旅遊活動"
      class="input input-bordered input-primary"/>
  `
})
export class SearchComponent {

}
