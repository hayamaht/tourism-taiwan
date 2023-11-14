import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Activity } from 'src/app/models/scene.model';

@Component({
  selector: 'app-card-feature',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-white mb-4 rounded shadow border border-stone-300">
      <a routerLink="/Activity/{{ activity.id}}"
        class="flex">
        <div class="min-w-fit max-h-full">
          <ng-template #def>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
              alt="Ranjithsiji, CC BY-SA 4.0 https://creativecommons.org/licenses/by-sa/4.0, via Wikimedia Commons"
              class="object-cover w-24 h-full rounded-s bg-stone-200/70">
          </ng-template>
          <ng-container *ngIf="activity.pictures.length > 0 else def">
            <div class="bg-gray-200  h-full object-cover">
              <img title="{{activity.pictures[0].alt}}"
                [src]="activity.pictures[0].url"
                [alt]="activity.pictures[0].alt"
                class="w-24 h-40 max-h-fit rounded-s">
            </div>
          </ng-container>
        </div>

        <div class="p-2 w-full">
          <div class="flex justify-between">
            <span class="text-lg text-white bg-lime-600 px-2 font-bold">
              {{ activity.period.start | date:'MM/dd'}}
            </span>
            <span class="text-sm text-gray-500 ">
              {{ activity.period.end | date:'YYYY'}}
            </span>
          </div>
          <h2 class="text-xl font-bold my-2">
            {{ activity.name }}
          </h2>
          <div class="space-x-1">
            <ng-container *ngIf="activity.classes.length > 0">
              <div *ngFor="let c of activity.classes"
                class="badge badge-accent badge-outline text-sm ">
                {{ c }}
              </div>
            </ng-container>
          </div>
        </div>
      </a>
    </div>
  `
})
export class CardFeatureComponent {
  @Input() activity!: Activity;
}
