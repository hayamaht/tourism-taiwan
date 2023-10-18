import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TourismService } from './services/tourism.service';
import { Observable } from 'rxjs';
import { CityName } from './models/city-name.model';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [CommonModule, RouterOutlet],
})
export class AppComponent implements OnInit {
  #tourismService = inject(TourismService);

  spots$!:  Observable<any>;
  activities$!: Observable<any>;

  ngOnInit(): void {
    this.spots$ = this.#tourismService
      .getByCityName('spot', CityName.Tainan);
    this.activities$ = this.#tourismService
      .getByCityName('activity', CityName.Tainan);
  }
}
