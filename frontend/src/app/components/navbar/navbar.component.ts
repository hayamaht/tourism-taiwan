import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { initTE, Ripple, Collapse, Dropdown } from 'tw-elements';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [CommonModule, RouterModule],
})
export class NavbarComponent implements OnInit {
  ngOnInit() {
    initTE({ Collapse, Ripple, Dropdown });
  }
}
