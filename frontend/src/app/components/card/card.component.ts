import { initTE, Ripple } from 'tw-elements';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {
  @Input() item: any;

  ngOnInit(): void {
    initTE({ Ripple });
  }
}
