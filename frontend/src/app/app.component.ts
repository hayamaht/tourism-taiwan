import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Carousel, Dropdown, initTE, Ripple } from 'tw-elements';
import { TourismService } from './services/tourism.service';
import { Observable } from 'rxjs';
import { CityName } from './models/city-name.model';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    CommonModule, RouterOutlet,
    CardComponent, HeaderComponent, NavbarComponent,
  ],
})
export class AppComponent implements OnInit {
  #tourismService = inject(TourismService);

  spots$!:  Observable<any>;
  activities$!: Observable<any>;

  ngOnInit(): void {
    initTE({ Ripple });

    this.spots$ = this.#tourismService
      .getByCityName('spot', CityName.Tainan);
    this.activities$ = this.#tourismService
      .getByCityName('activity', CityName.Tainan);
  }
}
