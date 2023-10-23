import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BikeService } from 'src/app/services/bike.service';
import { Observable } from 'rxjs';
import { CityName } from 'src/app/models/city-name.model';
import { CitySelectorComponent } from 'src/app/components/city-selector/city-selector.component';
import { MapComponent } from 'src/app/components/map/map.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bike',
  standalone: true,
  templateUrl: './bike.page.html',
  imports: [
    CommonModule, RouterModule,
    CitySelectorComponent, MapComponent
  ],
})
export class BikePage implements OnInit {
  #bikeService = inject(BikeService);

  bikes$!: Observable<any>;

  ngOnInit(): void {
    this.bikes$ = this.#bikeService
      .getRouteByCity(CityName.Kaohsiung, 'json');
  }

  getBikes(event: any) {

  }
}
