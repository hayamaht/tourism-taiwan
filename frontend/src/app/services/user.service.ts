import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { User, UserLogin, UserRegister } from '../models/user.model';
import { USER_LOGIN_URL, USER_REGISTER_URL } from 'src/urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static USER_KEY = 'tourism-user';

  #http = inject(HttpClient);
  #userSubjest = new BehaviorSubject<User>(
    this.getUserFromLocalStoage()
  );

  user$: Observable<User> = this.#userSubjest.asObservable();

  get currentUser() {
    return this.#userSubjest.value;
  }

  login(user: UserLogin) {
    return this.#http.post<User>(USER_LOGIN_URL, user).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStoage(user);
          this.#userSubjest.next(user);
          // TODO: https://tw-elements.com/docs/standard/components/toast/
        },
        error: (err: any) => {
          console.log(err);
          // TODO: https://tw-elements.com/docs/standard/components/toast/
        }
      }),
    );
  }

  register(user: UserRegister) {
    return this.#http.post<User>(USER_REGISTER_URL, user).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStoage(user);
          this.#userSubjest.next(user);
          // TODO: https://tw-elements.com/docs/standard/components/toast/
        },
        error: (err: any) => {
          console.log(err);
          // TODO: https://tw-elements.com/docs/standard/components/toast/
        }
      })
    );
  }

  logout() {
    this.#userSubjest.next({} as User);
    localStorage.removeItem(UserService.USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStoage(user: User) {
    localStorage.setItem(
      UserService.USER_KEY,
      JSON.stringify(user)
    );
  }

  private getUserFromLocalStoage() {
    const userJSON = localStorage.getItem(UserService.USER_KEY);
    if (userJSON) return JSON.parse(userJSON) as User;
    return {} as User;
  }
}
