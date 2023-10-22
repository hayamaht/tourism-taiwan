import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initTE, Ripple } from 'tw-elements';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-hotel',
  standalone: true,
  templateUrl: './card-hotel.component.html',
  imports: [
    CommonModule, RouterModule
  ],
})
export class CardHotelComponent {
  @Input() hotel: any;

  ngOnInit(): void {
    initTE({ Ripple });
  }
}
