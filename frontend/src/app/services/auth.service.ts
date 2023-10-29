import { SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, filter, forkJoin, map, race, tap, zip } from 'rxjs';
import { User, UserLogin, UserRegister } from '../models/user.model';
import { USER_LOGIN_URL, USER_REGISTER_URL } from 'src/urls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static USER_LS_KEY = 'tourism-user';

  #http = inject(HttpClient);
  #socialAuthService = inject(SocialAuthService);
  #userSubjest = new BehaviorSubject<User>(
    this._getUserFromLocalStoage()
  );

  authState$ = zip(
    this.#socialAuthService.authState,
    this.#userSubjest.asObservable()
  ).pipe(
    tap(([socalUser, user]) => {
      console.log(socalUser);
      console.log(user);
      this.refreshAuthToken();
    }),
    map(([socalUser, user]) => {
      return {...socalUser, ...user};
    })
  );

  get currentUser() {
    return this.#userSubjest.value;
  }

  login(user: UserLogin) {
    return this.#http.post<User>(USER_LOGIN_URL, user).pipe(
      tap({
        next: (user) => {
          this._setUserToLocalStoage(user);
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

  /**
   *
   * @param providerId A given static string.
   *   e.g: FacebookLoginProvider.PROVIDER_ID,\
   *        GoogleLoginProvider.PROVODER_ID does not work here.
   */
  signInWithProvider(providerId: string) {
    this.#socialAuthService.signIn(
      providerId
    ).then(soicalUser => {
      console.log(soicalUser);
      const user:User = {
        ...soicalUser,
        isAdmin: false,
        token: '',
        address: ''
      };
      this._setUserToLocalStoage(user);
      this.#userSubjest.next(user);
    }).catch(reason => {
      console.log(reason);
    });
  }

  refreshAuthToken() {
    console.log('refreshAuthToken');
    this.#socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  refreshAccessToken() {
    this.#socialAuthService.refreshAccessToken(GoogleLoginProvider.PROVIDER_ID);
  }

  getAccessToken() {
    this.#socialAuthService.getAccessToken(GoogleLoginProvider.PROVIDER_ID);
  }

  register(user: UserRegister) {
    return this.#http.post<User>(USER_REGISTER_URL, user).pipe(
      tap({
        next: (user) => {
          this._setUserToLocalStoage(user);
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
    this.#socialAuthService.signOut();
    this.#userSubjest.next({} as User);
    localStorage.removeItem(AuthService.USER_LS_KEY);
    window.location.reload();
  }

  private _setUserToLocalStoage(user: User) {
    localStorage.setItem(
      AuthService.USER_LS_KEY,
      JSON.stringify(user)
    );
  }

  private _getUserFromLocalStoage() {
    const userJSON = localStorage.getItem(AuthService.USER_LS_KEY);
    if (userJSON) return JSON.parse(userJSON) as User;
    return {} as User;
  }
}
