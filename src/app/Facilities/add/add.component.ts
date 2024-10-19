import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import the Router for navigation

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  constructor(private router: Router) { }

  // Method to navigate to the create-facility page
  goToCreateFacility(): void {
    this.router.navigate(['/create-facility']);  // Navigate to the create-facility route
  }
}
