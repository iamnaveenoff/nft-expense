import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService) { }

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Expenses',
        icon: 'fa-solid fa-sack-dollar',
        routerLink: '/'
      },
      {
        label: 'Add Expenses',
        icon: 'fa-solid fa-plus',
        routerLink: '/expense'
      },
      {
        label: 'List Expenses',
        icon: 'fa-solid fa-list',
        routerLink: '/listexpense'
      }
    ];
  }
}
