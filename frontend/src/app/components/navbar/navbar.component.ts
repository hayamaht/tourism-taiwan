import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { initTE, Ripple, Collapse, Dropdown } from 'tw-elements';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [CommonModule, RouterModule],
})
export class NavbarComponent implements OnInit {
  #authService = inject(AuthService);

  user!: User;
  isLoggin = false;

  ngOnInit() {
    initTE({ Collapse, Ripple, Dropdown });
    this.user = this.#authService.currentUser;
    this.#authService.user$.subscribe(user => {
      if (!user.email) {
        this.isLoggin = false;
        return;
      }
      this.user = user;
      this.isLoggin = true;
    });
    //console.log(this.user);
    // this.#authService.userObser$.subscribe(user => {
    //   console.log(user);
    // });
    // this.user = this.#authService.user;
    // this.isLoggin = this.user ? true : false;
    // this.#authService.authState$.subscribe(user => {
    //   this.user = { ...user, address: '', token: '', isAdmin: false};
    //   this.isLoggin = true;
    //   this.#authService.refreshAuthToken();
    // });
    // this.#authService.user$.subscribe(user => {
    //   if (user.name === undefined) {
    //     this.isLoggin = false;
    //     return;
    //   }
    //   this.user = user;
    //   this.isLoggin = true;
    // });
  }

  logout() {
    //this.isLoggin = false;
    this.#authService.logout();
  }

}
