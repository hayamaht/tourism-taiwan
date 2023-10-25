import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Input,
  Ripple,
  initTE,
} from "tw-elements";
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #userService = inject(UserService);
  #fb = inject(FormBuilder);

  returnURL = '';
  isSubmitted = false;

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
    initTE({ Input, Ripple });
    this.returnURL = this.#route
      .snapshot
      .queryParams['returnURL'];
  }

  submit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    this.#userService.login({
      email: this.ctrls.email.value!,
      password: this.ctrls.password.value!
    }).subscribe(() => {
      this.#router.navigateByUrl(this.returnURL);
    });
  }
}
