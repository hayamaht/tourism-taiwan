import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  static ACCESS_NAME_LS = 'tourism_access';

  #http = inject(HttpClient);

  #authURL = environment.authURL;
  #accesToken!: string|null;
  #expiresIn!: number|null;
  #currentTime = Date.now();

  getTokenIsLive() {
    const bool = this.#getTokenExpire();
    const t = localStorage.getItem(TokenService.ACCESS_NAME_LS);
    if(bool || !t) {
      return this.#getToken();
    }
    return of( {
      access_token: this.#accesToken,
      expires_in: this.#expiresIn,
    } );
  }

  getHttp(url: string) {
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
    if (this.#expiresIn && t <= this.#expiresIn) {
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
    ).pipe(
      tap((value: any) => {
        const v = JSON.stringify(value);
        localStorage.setItem('tourism_access', v);
        // console.log('---- getToken ----');
        // console.log(v)
        // console.log('-------------------')
        this.#accesToken = value['access_token'];
        this.#expiresIn = value['expires_in'];
        this.#currentTime = Date.now();
      })
    );
  }
}
