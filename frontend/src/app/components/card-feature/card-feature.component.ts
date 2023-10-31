import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-feature',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="border border-stone-300 rounded shadow flex">
      <div class="min-w-fit max-h-full">
        <ng-template #def>
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
            alt="Ranjithsiji, CC BY-SA 4.0 https://creativecommons.org/licenses/by-sa/4.0, via Wikimedia Commons"
            class="object-cover w-24  h-full rounded-s bg-stone-200/70">
        </ng-template>
        <ng-container *ngIf="activity.Picture.PictureUrl1 else def">
          <img title="{{activity.Picture.PictureDescription1}}"
            [src]="activity.Picture.PictureUrl1"
            [alt]="activity.Picture.PictureDescription1"
            class="object-cover w-24 h-full rounded-s">

        </ng-container>
      </div>

      <div class="p-2 w-full">
        <div class="flex justify-between">
          <span class="text-lg text-white bg-lime-600 px-2 font-bold">{{ activity.StartTime | date:'MM/dd'}}</span>
          <span class="text-sm text-gray-500 ">{{ activity.StartTime | date:'YYYY'}}</span>
        </div>
        <h2 class="text-xl font-bold my-2">
          <a routerLink="/activity/{{ activity.ActivityID}}"
            class="link link-hover hover:text-secondary">
            {{ activity.ActivityName }}
          </a>
        </h2>
        <div>
          <div *ngIf="activity.Class1"
            class="badge badge-accent badge-outline text-sm ">
            {{ activity.Class1 }}
          </div>
          <div *ngIf="activity.Class2"
            class="badge badge-accent badge-outline text-sm ">
            {{ activity.Class2 }}
          </div>
        </div>
      </div>
    </div>
  `
})
export class CardFeatureComponent {
  @Input() activity: any;
}
