import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { CitySelectorComponent } from 'src/app/components/city-selector/city-selector.component';
import { CityName, CityNameTW } from 'src/app/models/city-name.model';
import { UserService } from 'src/app/services/user.service';
import { Setting } from 'src/app/models/setting.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.page.html',
  imports: [
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule,
    CitySelectorComponent,
  ],
})
export class ProfilePage implements OnInit {
  #authService = inject(AuthService);
  #userService = inject(UserService);
  #fb = inject(FormBuilder);

  form!: FormGroup;

  user!: User;
  setting!: Setting;
  citiesTW = Object.entries(CityNameTW);

  get ctrols() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.#authService.user$.subscribe(user => {
      this.user = user;
      this.form = this.#fb.group({
        email: [this.user.email, [Validators.email, Validators.required]],
        name: [this.user.name],
        city: [CityName.Taipei]
      });

      this.#userService.getSettings(user.email).subscribe(s => {
        this.setting = s;
        this.form.get('city')?.patchValue(s.city);
        this.form.get('name')?.patchValue(s.name);
      });
    });
  }

  onSubmit() {
    //console.log(this.form.value) ;
    if (this.form.invalid) return;
    this.#userService
      .setSettings(this.form.value as Setting)
      .subscribe(res => console.log(res));
  }
}
