import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserFavorite, } from '../models/user.model';
import { USER_FAVORITES_URL, USER_FAVORITE_URL, USER_GETSETTINGS_URL, USER_SETTINGS_URL, } from 'src/urls';
import { Setting } from '../models/setting.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  #http = inject(HttpClient);

  getSettings(email: string) {
    return this.#http.post(USER_GETSETTINGS_URL, {email }) as Observable<Setting>;
  }

  setSettings(settings: Setting) {
    return this.#http.post(USER_SETTINGS_URL, settings);
  }

  getByOwnerFavorites(email: string) {
    return this.#http.post(USER_FAVORITES_URL, { email });
  }

  setFavoriteOnCat(fav: UserFavorite) {
    return this.#http.post(USER_FAVORITE_URL, fav).pipe(
      // tap(fav => {
      //   console.log(fav);
      // })
    );
  }

  removeFavoriteOnCat(fav: UserFavorite) {
    return this.#http.delete(USER_FAVORITE_URL, {
      body: fav
    }).pipe(
      // tap(fav => {
      //   console.log(fav);
      // })
    );
  }

}
