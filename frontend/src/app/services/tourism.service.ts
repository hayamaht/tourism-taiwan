import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, from, map, of, switchMap, tap } from 'rxjs';
import { CityName } from '../models/city-name.model';

@Injectable({
  providedIn: 'root'
})
export class TourismService {
  #http = inject(HttpClient);

  #apiURL = environment.apiURL;
  #authURL = environment.authURL;
  #accesToken!: string|null;
  #expiresIn!: number|null;
  #currentTime = Date.now();

  constructor() {
    this.getTokenIsLive().subscribe((value: any) => {
      this.#accesToken = value['access_token'];
      this.#expiresIn = value['expires_in'];
    });
  }

  getAll(type: 'spot'|'activity') {
    const p = type === 'spot' ? 'ScenicSpot' : 'Activity';
    const url = this.#apiURL +
      '/v2/Tourism/' + p +
      '?$format=JSON';
    return this.#getHttp(url);
  }

  getByCityName(
    type: 'spot'|'activity',
    cityName: CityName,
    page = 1,
    limit = 15,
    orderBy?: string
  ) {
    const p = type === 'spot' ? 'ScenicSpot' : 'Activity';
    let url = this.#apiURL +
      '/v2/Tourism/' + p + '/' + cityName.toString() +
      '?$format=JSON';
    url = url + '&$top=' + limit;
    url = url + '&$skip=' + ((page - 1) * limit);

    if (orderBy) {
      url = url + '&$orderby=' + orderBy;
    }
    console.log(url);
    return this.#getHttp(url);
  }

  getTokenIsLive() {
    const bool = this.#getTokenExpire();
    if(bool || !this.#accesToken) {
      return this.#getToken();
    }
    return of( {
      access_token: this.#accesToken,
      expires_in: this.#expiresIn,
    } );
  }

  #getHttp(url: string) {
    return this.getTokenIsLive().pipe(
      switchMap(_ => {
        return this.#http.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.#accesToken}`
          }
        });
      })
    );
  }

  #getTokenExpire() {
    const t = Date.now() - this.#currentTime;
    if (this.#expiresIn && t < this.#expiresIn) {
      return false;
    }
    this.#getToken();
    return true;
  }

  #getToken() {
    const data = `grant_type=client_credentials&client_id=${environment.clientId}&client_secret=${environment.clientSecret}`
    return this.#http.post(
      this.#authURL,
      data,
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
      }
    );
  }

}
