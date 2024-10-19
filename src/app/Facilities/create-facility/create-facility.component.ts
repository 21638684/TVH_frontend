import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacilityService } from '../facility.service';
import { Router } from '@angular/router';  // To navigate back after creation

@Component({
  selector: 'app-create-facility',
  templateUrl: './create-facility.component.html',
  styleUrls: ['./create-facility.component.scss']
})
export class CreateFacilityComponent {
  facilityForm: FormGroup;  // Form group to handle facility creation
  selectedImage: File | null = null;  // For the image file

  constructor(
    private fb: FormBuilder,
    private facilityService: FacilityService,
    private router: Router
  ) {
    this.facilityForm = this.fb.group({
      facilityName: ['', Validators.required],
      categoryName: ['', Validators.required],
      location: ['', Validators.required],
      availabilityStatus: [false, Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      pricePerHour: ['', [Validators.required, Validators.min(0)]],
      pricePerDay: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      openingHours: ['', Validators.required],
      closingHours: ['', Validators.required],
      image: [null]  // Optional image input
    });
  }

  // Method to handle file selection
  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  // Method to create a facility
  onSubmit(): void {
    if (this.facilityForm.valid) {
      const formData = new FormData();
      formData.append('FacilityName', this.facilityForm.get('facilityName')?.value);
      formData.append('CategoryName', this.facilityForm.get('categoryName')?.value);
      formData.append('Location', this.facilityForm.get('location')?.value);
      formData.append('AvailabilityStatus', this.facilityForm.get('availabilityStatus')?.value);
      formData.append('Capacity', this.facilityForm.get('capacity')?.value);
      formData.append('PricePerHour', this.facilityForm.get('pricePerHour')?.value);
      formData.append('PricePerDay', this.facilityForm.get('pricePerDay')?.value);
      formData.append('Description', this.facilityForm.get('description')?.value);
      formData.append('OpeningHours', this.facilityForm.get('openingHours')?.value);
      formData.append('ClosingHours', this.facilityForm.get('closingHours')?.value);

      if (this.selectedImage) {
        formData.append('Image', this.selectedImage);  // Add the image if selected
      }

      // Call the service to create the facility
      this.facilityService.createFacility(formData).subscribe(
        (response) => {
          console.log('Facility created successfully', response);
          this.router.navigate(['/facility']);  // Redirect to the facilities list page after creation
        },
        (error) => {
          console.error('Error creating facility', error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }
}
