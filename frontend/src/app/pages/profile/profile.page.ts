import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.page.html',
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule,
  ],
})
export class ProfilePage implements OnInit {
  #authService = inject(AuthService);

  user!: User;
  lat!: number;
  lng!: number;

  ngOnInit(): void {
    this.getLocation();

    this.#authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  getLocation() {
    const geo = navigator.geolocation;
    if (!geo) {
      alert('Geolocation is not supported by this browser')
    }

    geo.getCurrentPosition(pos => {
      if (!pos) return
      console.log(pos);
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
    }, err => {
      console.log(err)
    });
  }
}
