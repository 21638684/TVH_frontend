import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.scss'
})
export class ClientHomeComponent {

  constructor(private router: Router) {}

  bookNow() {
    this.router.navigate(['/client-facility']);
  }
}
