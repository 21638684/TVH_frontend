import { Component, OnInit } from '@angular/core';
import { FacilityService } from '../facility.service';
import { Facility } from '../../shared/facility';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.scss']
})
export class FacilityComponent implements OnInit {

  facilities: Facility[] = [];    // Stores the list of all facilities
  filteredFacilities: Facility[] = [];  // Stores the filtered list
  selectedCategory: string = '';  // Category selected by the user

  constructor(private facilityService: FacilityService) { }

  ngOnInit(): void {
    this.getAllFacilities();
  }

  // Method to fetch all facilities
  getAllFacilities(): void {
    this.facilityService.getFacilities().subscribe(
      (data: Facility[]) => {
        this.facilities = data;  // Store all facilities
        this.filteredFacilities = data;  // Initially, filtered list is the same as all facilities
      },
      (error) => {
        console.error('Error fetching facilities:', error);
      }
    );
  }

  // Method to filter facilities by category
  filterByCategory(): void {
    if (this.selectedCategory === '') {
      this.filteredFacilities = this.facilities;  // If no category is selected, show all
    } else {
      this.filteredFacilities = this.facilities.filter(facility => 
        facility.categoryName.toLowerCase() === this.selectedCategory.toLowerCase());
    }
  }
}