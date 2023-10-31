import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Input, Ripple, initTE, } from "tw-elements";
import { UserService } from 'src/app/services/user.service';
import { UserRegister } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

function passwordMatchValidator(g: FormGroup) {
  return g.get('password')!.value === g.get('confirmPassword')!.value
    ? null : {'mismatch': true};
}

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.page.html',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class RegisterPage implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #authService = inject(AuthService);
  #fb = inject(FormBuilder);

  returnURL = '';
  isSubmitted = false;

  form = this.#fb.group({
    email: ['', [
      Validators.required,
      Validators.email,
    ]],
    name: ['', [Validators.required]],
    address: ['', [Validators.required]],
    password: ['', [
      Validators.required,
      Validators.minLength(5),
    ]],
    confirmPassword: ['', [
      Validators.required
    ]]
  }, );

  ngOnInit(): void {
    initTE({ Input, Ripple });
    this.returnURL = this.#route
      .snapshot
      .queryParams['returnURL'];
  }

  get ctrls() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const value = this.form.value;
    const user = {
      email: value.email,
      name: value.name,
      address: value.address,
      password: value.password,
      confirmPassword: value.confirmPassword,
    } as UserRegister;

    this.#authService.register(user).subscribe(_ => {
      this.#router.navigateByUrl(this.returnURL);
    });
  }
}
