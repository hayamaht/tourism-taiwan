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
  getActivitesByMonth(
    cityName: CityName,
    mohtn: 'this'|'next',
    page = 1,
    limit = 15
  ) {
    const p = TourismCat.Activity.toString();
    const now = new Date();
    const nowYear = now.getFullYear();
    const month = now.getMonth() + (mohtn === 'this' ? 1 : 2);
    const nowMonth = (month < 10)
      ? '0' + month
      : month.toString();
    const lastDay = new Date(
      now.getFullYear(),
      month,
      0
    );
    const start = `${nowYear}-${nowMonth}-${(mohtn === 'next' ? '01' : now.getDate())}`;
    const end = `${nowYear}-${nowMonth}-${lastDay.getDate()}`;
    console.log(`${start}, ${end}`)
    const url = this.#apiURL +
      '/v2/Tourism/' + p +
      '/' + cityName.toString() +
      '?$format=JSON' +
      `&$filter=date(StartTime) le ${end} and date(StartTime) ge ${start}` +
      '&$orderby=StartTime ' + (mohtn === 'next' ? 'desc' : 'asc') +
      `&$top=${limit}` +
      `&$skip=${((page - 1)*limit)}`;

    return this.#tokenService.getHttp(url);
  }

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
