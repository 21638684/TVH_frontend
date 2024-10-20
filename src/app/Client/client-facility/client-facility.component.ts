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
  TotalPrice: number;

  constructor(
    facilityId: number,
    facilityName: string,
    bookingDate: Date,
    durationInHours: number,
    totalPrice: number
  ) {
    this.FacilityId = facilityId;
    this.FacilityName = facilityName;
    this.BookingDate = bookingDate;
    this.DurationInHours = durationInHours;
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
    this.bookingHours = 1; // Default to 1 hour booking
    this.calculateTotalPrice(); // Calculate initial price
    this.isModalOpen = true; // Set modal flag to true to open the modal
  }

  // Close custom modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedFacility = null; // Reset selected facility
  }

  // Calculate the total price
  calculateTotalPrice(): void {
    if (this.selectedFacility) {
      this.totalPrice = this.selectedFacility.pricePerHour * this.bookingHours;
    }
  }

  // Book the facility and reduce capacity
  bookFacility(): void {
    if (this.selectedFacility && this.selectedFacility.capacity > 0) {
      // Reduce facility capacity
      this.selectedFacility.capacity -= 1;

      // Prepare booking details
      const bookingDetails: BookingViewModel = {
        FacilityId: this.selectedFacility.facilityId,
        FacilityName: this.selectedFacility.facilityName,
        BookingDate: this.bookingDate,
        DurationInHours: this.bookingHours,
        TotalPrice: this.totalPrice
      };

      console.log('Booking details:', bookingDetails); // Log the booking details

      // Store booking details and navigate to payment
      localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
      this.closeModal(); // Close modal after booking
      this.router.navigate(['/payment']);
    } else {
      console.error('Booking failed. Facility capacity is full or facility is not selected.');
    }
  }
}




