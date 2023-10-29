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

  ngOnInit() {
    initTE({ Collapse, Ripple, Dropdown });
    this.#authService.authState$.subscribe(u => {
      console.log(u);
      this.user = u;
      this.#authService.refreshAuthToken();
    });
  }


  logout() {
    this.#authService.logout();
  }

}
