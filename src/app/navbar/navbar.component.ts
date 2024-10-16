import { Component } from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private router: Router) {}

  onTabSelected(event: MatTabChangeEvent) {
    switch (event.tab.textLabel) {
      case 'Product': {
        this.router.navigateByUrl('product-list');
        break;
      }
      case 'Home': {
        this.router.navigateByUrl('');
        break;
      }
    }
  }
}
