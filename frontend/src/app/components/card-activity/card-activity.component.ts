import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { initTE, Ripple } from 'tw-elements';

@Component({
  selector: 'app-card-activity',
  standalone: true,
  templateUrl: './card-activity.component.html',
  imports: [
    CommonModule, RouterModule
  ],
})
export class CardActivityComponent implements OnInit {
  @Input() activity: any;

  ngOnInit(): void {
    initTE({ Ripple });
  }
}