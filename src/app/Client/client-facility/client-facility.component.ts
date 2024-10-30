import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { FacilityService } from '../../Facilities/facility.service';
import { Facility } from '../../shared/facility';

// BookingViewModel class definition
export class BookingViewModel {
  FacilityId: number;        // Foreign Key to FacilityModel
  FacilityName: string;      // Facility Name to display in view
  BookingDate: Date;         // Date for booking
  DurationInHours: number;   // Number of hours the facility is booked for
  SeatsBooked: number;       // Number of seats booked
  TotalPrice: number;

  constructor(
    facilityId: number,
    facilityName: string,
    bookingDate: Date,
    durationInHours: number,
    seatsBooked: number,
    totalPrice: number
  ) {
    this.FacilityId = facilityId;
    this.FacilityName = facilityName;
    this.BookingDate = bookingDate;
    this.DurationInHours = durationInHours;
    this.SeatsBooked = seatsBooked;
    this.TotalPrice = totalPrice;
  }
}

@Component({
  selector: 'app-client-facility',
  templateUrl: './client-facility.component.html',
  styleUrls: ['./client-facility.component.scss']
})
export class ClientFacilityComponent implements OnInit {
  facilities: Facility[] = [];
  filteredFacilities: Facility[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  searchName: string = '';
  selectedAvailability: string = ''; // 'Available', 'Not Available', or ''

  selectedFacility: Facility | null = null;  // Selected facility for booking
  bookingDate: Date = new Date();
  bookingHours: number = 1;
  seatsToBook: number = 1;  // Number of seats selected for booking
  totalPrice: number = 0;
  isModalOpen: boolean = false;  // Custom modal flag

  constructor(private facilityService: FacilityService, private router: Router) {}

  ngOnInit(): void {
    // Fetch all facilities from the backend
    this.facilityService.getFacilities().subscribe((data: Facility[]) => {
      this.facilities = data;
      this.filteredFacilities = data;
      this.extractCategories();
    }, error => {
      console.error('Error fetching facilities:', error);  // Log any errors
    });
  }

  // Extract unique categories for filtering
  extractCategories() {
    this.categories = [...new Set(this.facilities.map(facility => facility.categoryName))];
  }

  // Filter facilities by category, name, and availability
  filterFacilities() {
    this.filteredFacilities = this.facilities.filter(facility => {
      const matchesCategory = this.selectedCategory ? facility.categoryName === this.selectedCategory : true;
      const matchesName = this.searchName ? facility.facilityName.toLowerCase().includes(this.searchName.toLowerCase()) : true;
      const matchesAvailability = this.selectedAvailability === 'Available' 
        ? facility.availabilityStatus === true 
        : this.selectedAvailability === 'Not Available'
        ? facility.availabilityStatus === false
        : true;

      return matchesCategory && matchesName && matchesAvailability;
    });
  }

  // Open custom modal for booking
  openBookingModal(facility: Facility): void {
    this.selectedFacility = facility;
    this.bookingHours = 1;  // Default to 1 hour booking
    this.seatsToBook = 1;   // Default to 1 seat
    this.calculateTotalPrice();  // Calculate initial price
    this.isModalOpen = true;  // Set modal flag to true to open the modal
  }

  // Close custom modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedFacility = null;  // Reset selected facility
  }

  // Calculate the total price
  calculateTotalPrice(): void {
    if (this.selectedFacility) {
      this.totalPrice = this.selectedFacility.pricePerHour * this.bookingHours * this.seatsToBook;
    }
  }

  // Book the facility and reduce capacity
  bookFacility(): void {
    if (this.selectedFacility && this.selectedFacility.capacity >= this.seatsToBook) {
      // Reduce facility capacity based on seats booked
      this.selectedFacility.capacity -= this.seatsToBook;

      // Prepare booking details
      const bookingDetails: BookingViewModel = {
        FacilityId: this.selectedFacility.facilityId,
        FacilityName: this.selectedFacility.facilityName,
        BookingDate: this.bookingDate,
        DurationInHours: this.bookingHours,
        SeatsBooked: this.seatsToBook,
        TotalPrice: this.totalPrice
      };

      console.log('Booking details before sending to backend:', bookingDetails); // Log the booking details before saving

      // Store booking details and navigate to payment
      localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
      console.log('Booking details saved to localStorage:', JSON.parse(localStorage.getItem('bookingDetails')!)); // Log saved details
      this.closeModal(); // Close modal after booking
      this.router.navigate(['/payment']);
    } else {
      console.error('Booking failed. Not enough seats available or facility not selected.'); // Log if booking fails
    }
  }
}




