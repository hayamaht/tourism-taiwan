import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { UserFavorite, } from '../models/user.model';
import { USER_FAVORITES_URL, USER_FAVORITE_URL, } from 'src/urls';
import { TourismCat } from '../models/tourism-cat.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  #http = inject(HttpClient);

  getByOwnerFavorites(email: string) {
    return this.#http.post(USER_FAVORITES_URL, { email });
  }

  setFavoriteOnCat(fav: UserFavorite) {
    return this.#http.post(USER_FAVORITE_URL, fav).pipe(
      tap(fav => {
        console.log(fav);
      })
    );
  }

  removeFavoriteOnCat(fav: UserFavorite) {
    return this.#http.delete(USER_FAVORITE_URL, {
      body: fav
    }).pipe(
      tap(fav => {
        console.log(fav);
      })
    );
  }

}
