import { Component, OnInit } from '@angular/core';
import { FacilityService } from '../../Facilities/facility.service';
import { Facility } from '../../shared/facility';

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

  constructor(private facilityService: FacilityService) {}

  ngOnInit(): void {
    // Fetch all facilities from the backend
    this.facilityService.getFacilities().subscribe((data: Facility[]) => {
      this.facilities = data;
      this.filteredFacilities = data;
      this.extractCategories();
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
      
      // If selectedAvailability is 'Available', check if availabilityStatus is true, otherwise if 'Not Available' check if it's false
      const matchesAvailability = this.selectedAvailability === 'Available' 
        ? facility.availabilityStatus === true 
        : this.selectedAvailability === 'Not Available'
        ? facility.availabilityStatus === false
        : true; // If no filter is selected for availability, return all

      return matchesCategory && matchesName && matchesAvailability;
    });
  }

  // Method to handle booking
  bookFacility(facilityId: number) {
    console.log(`Booking facility with ID: ${facilityId}`);
    // Implement booking logic here
  }
}

