import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { CityName } from '../models/city-name.model';

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  #tokenService = inject(TokenService);

  #apiURL = environment.apiURL;

  getRouteByCity(
    cityName: CityName,
    type: 'json'|'geojson',
    page = 1,
    limit = 30
  ) {
    const url = this.#apiURL +
      '/V3/Map/Bike/Network/CityBike/City/' +
      cityName.toString() +
      '?$format=' + type.toUpperCase() +
      '&$top=' + limit +
      '&$skip=' + ((page - 1) * limit);
    return this.#tokenService.getHttp(url);
  }

  getRouteByName(cityName:CityName, name: string) {
    const url = this.#apiURL +
      '/V3/Map/Bike/Network/CityBike/City/' +
      cityName.toString() +
      '?$format=GEOJSON' +
      `&$filter=RouteName eq '${name}'`;
    return this.#tokenService.getHttp(url);
  }
}
