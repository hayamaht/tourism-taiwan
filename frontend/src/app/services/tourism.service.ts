import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CityName } from '../models/city-name.model';
import { TourismCat } from '../models/tourism-cat.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class TourismService {
  #tokenService = inject(TokenService);

  #apiURL = environment.apiURL;

  // getAll(type: TourismCat) {
  //   const p = type.toString();
  //   const url = this.#apiURL +
  //     '/v2/Tourism/' + p +
  //     '?$format=JSON';
  //   return this.#getHttp(url);
  // }

  getByCityName(
    type: TourismCat,
    cityName: CityName,
    page = 1,
    limit = 15,
    orderBy?: string
  ) {
    const p = type.toString();
    let url = this.#apiURL +
      '/v2/Tourism/' + p + '/' + cityName.toString() +
      '?$format=JSON';
    url = url + '&$top=' + limit;
    url = url + '&$skip=' + ((page - 1) * limit);

    if (orderBy) {
      url = url + '&$orderby=' + orderBy;
    }
    console.log(url);
    return this.#tokenService.getHttp(url);
  }

  getById(type: TourismCat, id: string ) {
    const p = type.toString();
    const t = p + 'ID';
    let url = this.#apiURL +
      '/v2/Tourism/' + p +
      '?$format=JSON';
    url = url + `&$filter=${t} eq '${id}'`

    return this.#tokenService.getHttp(url);
  }



}
