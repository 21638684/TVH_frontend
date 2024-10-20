import { Component, OnInit } from '@angular/core';
import { FacilityService } from '../facility.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  bookings: any[] = []; // Array to hold booking data

  constructor(private facilityService: FacilityService) {}

  ngOnInit(): void {
    this.getBookings(); // Fetch bookings when the component initializes
  }

  // Method to fetch bookings
  getBookings(): void {
    this.facilityService.getAllBookings().subscribe(
      (data) => {
        this.bookings = data; // Store the fetched bookings
      },
      (error) => {
        console.error('Error fetching bookings', error);
      }
    );
  }
}

