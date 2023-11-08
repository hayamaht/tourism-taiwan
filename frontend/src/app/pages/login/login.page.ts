import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SocialLoginModule, SocialAuthService,
  FacebookLoginProvider, GoogleLoginProvider,
  SocialUser, GoogleSigninButtonModule
} from '@abacritt/angularx-social-login';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule,
    SocialLoginModule, GoogleSigninButtonModule
  ],
})
export class LoginPage implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #authService = inject(AuthService);
  #fb = inject(FormBuilder);

  returnURL = '';
  isSubmitted = false;
  user!: SocialUser;

  form = this.#fb.group({
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', Validators.required],
  });

  get ctrls() {
    return this.form.controls;
  }

  ngOnInit(): void {
    // this.#authService.authState$.subscribe(user => {
    //   console.log(user);
    //   this.user = user;
    //   this.#router.navigateByUrl('/');
    // });
    this.user = this.#authService.currentUser;
    this.returnURL = this.#route
      .snapshot
      .queryParams['returnURL'];
  }

  // signInWithFB() {
  //   this.#authService.signInWithProvider(
  //     FacebookLoginProvider.PROVIDER_ID
  //   );
  // }

  submit() {
    console.log(this.form.errors);
    console.log(this.form.status);
    this.isSubmitted = true;
    if (this.form.invalid) return;

    this.#authService.login({
      email: this.ctrls.email.value!,
      password: this.ctrls.password.value!
    }).subscribe(() => {
      this.#router.navigateByUrl(this.returnURL);
    });
  }
}
