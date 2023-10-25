import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-bike-route',
  standalone: true,
  templateUrl: './card-bike-route.component.html',
  imports: [CommonModule, RouterModule],
})
export class CardBikeRouteComponent {
  @Input() route: any;
  @Input() city!: string;
}
