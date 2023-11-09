import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  template: `
    <div class="join my-2 px-1">
      <button class="join-item btn btn-sm">
        <span class="material-symbols-outlined">
          chevron_left
        </span>
      </button>
      <select title="Pages"
      class="join-item select select-sm select-bordered leading-3 ">
        <option value="1">第 1 頁</option>
        <option value="2">第 2 頁</option>
      </select>
      <button class="join-item btn btn-sm">
        <span class="material-symbols-outlined">
          chevron_right
          </span>
      </button>
    </div>
  `,
  imports: [CommonModule],
})
export class PaginationComponent {
  @Input() total!: number;
  @Input() selected!: number;

  page = 0;
}
