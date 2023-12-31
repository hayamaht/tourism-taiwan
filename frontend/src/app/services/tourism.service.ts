import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CityName } from '../models/city-name.model';
import { TourismCat } from '../models/tourism-cat.model';
import { TokenService } from './token.service';
import { Observable, catchError, combineLatest, combineLatestAll, forkJoin, map, merge, mergeAll, mergeMap, of, switchMap, tap, throwError, toArray } from 'rxjs';
import { SearchResult } from '../models/search-result.model';
import { Spot } from '../models/scene.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from './user.service';
import { toActivity, toSpot } from './../models/scene.model';

@Injectable({
  providedIn: 'root'
})
export class TourismService {
  #tokenService = inject(TokenService);
  #userService = inject(UserService);

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

  getRandom(type?: TourismCat, city?: CityName) {
    //console.log(`Type: ${type}, City: ${city}`);
    let url ='';
    if (!type) type = this.#getRandomType();
    if (!city) city = this.#getRandomCity();

    url = url + this.#getTourismURL(type, city);
    url = url + '&$top=20';
    //console.log(url);
    return this.#tokenService.getHttp(url).pipe(
      map(spots => this.#toSpots(type as TourismCat, spots))
    );
  }

  getSpots(
    type: TourismCat,
    city: CityName,
    page = 1,
    limit = 20,
    orderBy?: string
  ) {
    //console.log(`type: ${type}, city: ${city}`);
    let url = this.#getTourismURL(type, city);
    url = url + '&$top=' + limit;
    url = url + '&$skip=' + ((page - 1) * limit);

    if (orderBy) {
      url = url + '&$orderby=' + orderBy;
    }
    //console.log(url);
    return this.#tokenService.getHttp(url).pipe(
      map(spots => {
        const ss = this.#toSpots(type, spots);
        return ss
      }),
    );
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
    //console.log(`${start}, ${end}, ${nowStr}`)
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

    return this.#tokenService.getHttp(url).pipe(
      map((ss: any) => {
        return ss.map((s: any) => toActivity(s))
      })
    );
  }

  getActivitiesInPeriod(
    city: CityName,
  ) {
    const d = new Date();
    const dt = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
    let url = this.#getTourismURL(TourismCat.Activity, city);
    url = url + `&$filter=`
      + `date(EndTime) ge ${dt}`
      + `&$orderby=StartTime asc`;
    return this.#tokenService.getHttp(url).pipe(
      map((ss: any) => {
        return ss.map((s: any) => toActivity(s))
      })
    );
  }

  getActivitiesNotInPeriod(
    city: CityName,
    page = 1,
    limit = 20
  ) {
    const d = new Date();
    const dt = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
    let url = this.#getTourismURL(TourismCat.Activity, city);
    url = url + `&$filter=date(EndTime) lt ${dt}`
      + `&$orderby=StartTime asc`
      + `&$top=${limit}`
      + `&$skip=${((page - 1)*limit)}`;
    return this.#tokenService.getHttp(url).pipe(
      map((ss: any) => {
        return ss.map((s: any) => toActivity(s))
      })
    );
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
    return this.#tokenService.getHttp(url) as Observable<Spot[]>;
  }

  getById(type: TourismCat, id: string ): Observable<Spot|undefined> {
    if (!id) return of();

    let url = this.#getTourismURL(type);
    url = url + `&$filter=${type+'ID'} eq '${id}'`
    // console.log(url);
    return this.#tokenService.getHttp(url).pipe(
      catchError(this.#handleError),
      map((vs: any) => {
        if (vs.length <= 0) return
        return toSpot(type, vs[0]);
      }),
    );
  }

  getNearByLocations(lat: number, lon:number, type: TourismCat) {
    let url = this.#getTourismURL(type);
    url = url + `&$spatialFilter=` +
      `nearby(Position, ${lat}, ${lon}, 10000)` +
      `&$top=20`;

    return this.#tokenService.getHttp(url).pipe(
      map(spots => this.#toSpots(type, spots)),
    ) as Observable<Spot[]>;
  }

  #handleError(error: HttpErrorResponse): any {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  #toSpots(type: TourismCat, spots: any) {
    const ss = spots as any[];
    return ss.map(s => toSpot(type, s));
  }

  #getRandomType() {
    const types = Object.keys(TourismCat);
    const n = Math.floor(Math.random() * 3);
    return types[n] as TourismCat;
  }

  #getRandomCity() {
    const cities = Object.keys(CityName);
    const n = Math.floor(Math.random() * cities.length);
    return cities[n] as CityName;
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
