import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initTE, Ripple } from 'tw-elements';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-card-spot',
  standalone: true,
  templateUrl: './card-spot.component.html',
  imports: [CommonModule, RouterModule, ],
})
export class CardSpotComponent implements OnInit {
  @Input() spot: any;

  ngOnInit(): void {
    initTE({ Ripple });
  }

}
