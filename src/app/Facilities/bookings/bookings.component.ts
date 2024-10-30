import { Component, OnInit, ViewChild } from '@angular/core';
import { FacilityService } from '../facility.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  bookings: any[] = []; // Array to hold booking data
  paginatedBookings: any[] = []; // Array to hold bookings for the current page
  pageSize = 5; // Number of bookings per page
  currentPage = 0; // Current page index

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private facilityService: FacilityService) {}

  ngOnInit(): void {
    this.getBookings(); // Fetch bookings when the component initializes
  }

  // Method to fetch bookings
  getBookings(): void {
    this.facilityService.getAllBookings().subscribe(
      (data) => {
        this.bookings = data; // Store the fetched bookings
        this.paginateBookings(); // Initialize pagination
      },
      (error) => {
        console.error('Error fetching bookings', error);
      }
    );
  }

  // Method to handle pagination
  paginateBookings(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedBookings = this.bookings.slice(startIndex, endIndex);
  }

  // Method called when paginator page is changed
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateBookings(); // Update paginated bookings
  }
}

