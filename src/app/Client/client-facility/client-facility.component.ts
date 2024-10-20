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
  TotalPrice: number;        // Total price to be calculated based on hours or days

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
  selectedAvailability: string = ''; // This will be 'Available', 'Not Available', or ''

  constructor(private facilityService: FacilityService, private router: Router) {}

  ngOnInit(): void {
    // Fetch all facilities from the backend
    this.facilityService.getFacilities().subscribe((data: Facility[]) => {
      console.log('Facilities data from backend:', data);  // Log the facilities data returned
      this.facilities = data;
      this.filteredFacilities = data;
  
      // Check if the facilities array has any undefined values
      this.facilities.forEach((facility, index) => {
        console.log(`Facility at index ${index}:`, facility);  // Log each facility in the array
        if (!facility.facilityName) {
          console.warn(`Facility at index ${index} has undefined facilityName.`);
        }
      });
  
      this.extractCategories();
    }, error => {
      console.error('Error fetching facilities:', error);  // Log any errors from the backend
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

  // Method to handle booking
// Method to handle booking
bookFacility(facilityId: number) {
  const selectedFacility = this.filteredFacilities.find(facility => facility.facilityId === facilityId);
  console.log('Selected facility:', selectedFacility); // Log the selected facility
  
  if (selectedFacility) {
    // Prepare booking details
    const bookingDetails: BookingViewModel = {
      FacilityId: selectedFacility.facilityId,
      FacilityName: selectedFacility.facilityName,
      BookingDate: new Date(), // Current date for booking
      DurationInHours: 1, // Set a default duration or get user input
      TotalPrice: selectedFacility.pricePerHour // Calculate based on duration; adjust as necessary
    };

    console.log('Booking details:', bookingDetails); // Log the booking details

    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
    this.router.navigate(['/payment']);
  } else {
    console.error('Facility not found for booking');
  }
}

}


