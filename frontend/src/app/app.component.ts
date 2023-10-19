import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { initTE, Carousel, Dropdown, Ripple } from 'tw-elements';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
<app-navbar></app-navbar>
<div class="m-4">
  <router-outlet></router-outlet>
</div>
  `,
  imports: [
    CommonModule, RouterOutlet, NavbarComponent,
  ],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    initTE({ Carousel, Dropdown, Ripple })
  }
}
