import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MapComponent } from 'src/app/components/map/map.component';
import { BikeService } from 'src/app/services/bike.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CityName } from 'src/app/models/city-name.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bike-detail',
  standalone: true,
  templateUrl: './bike-detail.page.html',
  imports: [CommonModule, MapComponent],
})
export class BikeDetailPage implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #location = inject(Location);
  #bikeService = inject(BikeService);

  bikes$!: Observable<any>;
  name!: string|null;

  ngOnInit(): void {
    this.#route.paramMap.subscribe(param => {
      console.log(param);
      const city = param.get('city');
      this.name = param.get('name');
      if (!city || !this.name) {
        this.#router.navigateByUrl('/bike');
        return;
      }
      this.#getRouteByName(city, this.name);
    });
  }

  goBack() {
    this.#location.back()
    //this.#router.navigate(['..']);
  }

  #getRouteByName(city: string, name: string) {
    this.bikes$ = this.#bikeService.getRouteByName(
      city as CityName,
      name
    );
  }
}
