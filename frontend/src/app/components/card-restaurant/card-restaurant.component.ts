import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-restaurant',
  standalone: true,
  templateUrl: './card-restaurant.component.html',
  imports: [CommonModule, RouterModule],
})
export class CardRestaurantComponent implements OnInit {
  @Input() restaurant: any;

  ngOnInit(): void {
  }
}
