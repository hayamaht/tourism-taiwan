import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CityName } from '../models/city-name.model';
import { TourismCat } from '../models/tourism-cat.model';
import { TokenService } from './token.service';
import { Observable, combineLatest, combineLatestAll, forkJoin, map, merge, mergeAll, mergeMap, of, switchMap, tap, toArray } from 'rxjs';
import { SearchResult } from '../models/search-result.model';
import { Spot } from '../models/spot.model';

@Injectable({
  providedIn: 'root'
})
export class TourismService {
  #tokenService = inject(TokenService);

  #apiURL = environment.apiURL;

  search(keyword: string) {
    keyword = keyword.trim();
    return forkJoin([
      this.searchByType(keyword, TourismCat.ScenicSpot),
      this.searchByType(keyword, TourismCat.Activity),
      this.searchByType(keyword, TourismCat.Hotel),
      this.searchByType(keyword, TourismCat.Restaurant),
    ]).pipe(
      map(([v1, v2, v3, v4]) => [...v1, ...v2, ...v3, ...v4]),
      //tap(v => console.log(v)),
    );
  }

  searchByType(keyword: string, type: TourismCat) {
    const p = type.toString();
    let url = this.#apiURL +
      '/v2/Tourism/' + p +
      '?$format=JSON' +
      `&$select=${p+'ID'},${p+'Name'},Description` +
      `&$filter=contains(${p+'Name'}, '${keyword}') or ` +
        `contains(Description, '${keyword}')`;
    //console.log(url);
    return this.#tokenService.getHttp(url).pipe(
      map((v: any) => {
        let a:any[] = [];
        for(let i in v) {
          a[parseInt(i)] = {
            id: v[i][`${p+'ID'}`],
            type: p,
            name: v[i][`${p+'Name'}`],
            description: v[i]['Description'],
          } as SearchResult;
        }
        return a;
      }),
      //tap(value => console.log(value)),
    ) as Observable<SearchResult[]>;
  }

  getActivitesByMonth(
    cityName: CityName,
    mohtn: 'this'|'next',
    page = 1,
    limit = 15
  ) {
    const p = TourismCat.Activity.toString();
    const now = new Date();
    const nowStr = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
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
    console.log(`${start}, ${end}, ${nowStr}`)
    const url = this.#apiURL +
      '/v2/Tourism/' + p +
      '/' + cityName.toString() +
      '?$format=JSON' +
      `&$filter=date(StartTime) le ${end} and ` +
        `date(StartTime) ge ${start} `+
        ((mohtn === 'this') ? `and date(EndTime) ge ${nowStr}` : '') +
      '&$orderby=StartTime ' + (mohtn === 'next' ? 'desc' : 'asc') +
      `&$top=${limit}` +
      `&$skip=${((page - 1)*limit)}`;

    return this.#tokenService.getHttp(url);
  }

  getCountByType(
    type: TourismCat,
    cityName?: CityName,
  ) {
    let url = this.#getTourismURL(type, cityName);
    url = url + '&$count=true';
    return this.#tokenService.getHttp(url).pipe(
      map(vs => {
        const len = (vs as []).length;
        return len
      }),
    ) as Observable<number>;
  }

  getByCityName(
    type: TourismCat,
    cityName: CityName,
    page = 1,
    limit = 15,
    orderBy?: string
  ) {
    let url = this.#getTourismURL(type, cityName);
    url = url + '&$top=' + limit;
    url = url + '&$skip=' + ((page - 1) * limit);

    if (orderBy) {
      url = url + '&$orderby=' + orderBy;
    }
    // console.log(url);
    return this.#tokenService.getHttp(url);
  }

  getById(type: TourismCat, id: string ) {
    let url = this.#getTourismURL(type);
    url = url + `&$filter=${type+'ID'} eq '${id}'`
    // console.log(url);
    return this.#tokenService.getHttp(url).pipe(
      map((vs: any) => {
        return vs[0]
      })
    ) as Observable<Spot>;
  }

  getNearByLocations(lat: number, lon:number) {
    let url = this.#getTourismURL(TourismCat.ScenicSpot);
    url = url + `&$spatialFilter=` +
      `nearby(Position, ${lat}, ${lon}, 10000)` +
      `&$top=15`;

    return this.#tokenService.getHttp(url).pipe(

    ) as Observable<Spot[]>;
  }

  #getTourismURL(type: TourismCat, cityName?: CityName) {
    let url = this.#apiURL +
      '/v2/Tourism/' + type.toString();
    if (cityName) {
      url = url + '/' + cityName.toString();
    }
    return url + '?$format=JSON';
  }
}
