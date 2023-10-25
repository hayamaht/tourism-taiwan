import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { initTE, Ripple, Collapse, Dropdown } from 'tw-elements';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [CommonModule, RouterModule],
})
export class NavbarComponent implements OnInit {
  #userService = inject(UserService);

  user!: User;

  ngOnInit() {
    initTE({ Collapse, Ripple, Dropdown });
    this.#userService.user$.subscribe(u => {
      this.user = u;
    });
  }

  logout() {
    this.#userService.logout();
  }

  get isAuth() {
    return this.user.token;
  }
}
