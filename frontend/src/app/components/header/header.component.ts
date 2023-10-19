import { initTE, Ripple, Collapse, Dropdown } from 'tw-elements';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    initTE({ Collapse, Ripple, Dropdown })
  }
}
