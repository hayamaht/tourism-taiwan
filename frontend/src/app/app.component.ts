import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  template: `
<app-navbar></app-navbar>
<router-outlet></router-outlet>
<app-footer></app-footer>
  `,
  imports: [
    CommonModule, RouterOutlet,
    NavbarComponent, FooterComponent
  ],
})
export class AppComponent implements OnInit {
  //#tourismService = inject(TourismService);

  ngOnInit(): void {

  }
}
