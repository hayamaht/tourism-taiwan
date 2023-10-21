import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
<app-navbar></app-navbar>
<div class="m-4">
  <router-outlet></router-outlet>
</div>
<app-footer></app-footer>
  `,
  imports: [
    CommonModule, RouterOutlet,
    NavbarComponent, FooterComponent
  ],
})
export class AppComponent {}
