import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Activity } from 'src/app/models/scene.model';

@Component({
  selector: 'app-card-activity',
  standalone: true,
  templateUrl: './card-activity.component.html',
  imports: [
    CommonModule, RouterModule
  ],
})
export class CardActivityComponent {
  @Input() activity!: Activity;
  @Input() end = false;
}
