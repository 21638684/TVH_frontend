import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacilityService } from '../../Facilities/facility.service';
import { BookingViewModel } from '../client-facility/client-facility.component'; // Adjust the path as needed
import { PaymentDetailsModel } from '../../shared/paymentdetails';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  // Booking details received from the previous component
  paymentDetails: PaymentDetailsModel = new PaymentDetailsModel(); // Initialize payment details model
  paymentMessage: string = '';
  bookingDetails: BookingViewModel | undefined;  // Add type for bookingDetails

  constructor(private router: Router, private bookingService: FacilityService) {} // Inject the booking service

  ngOnInit(): void {
    // Retrieve booking details from local storage (or state passed via routing)
    const bookingDetailsFromStorage = localStorage.getItem('bookingDetails');
    if (bookingDetailsFromStorage) {
      this.bookingDetails = JSON.parse(bookingDetailsFromStorage);
      console.log('Booking details from localStorage:', this.bookingDetails);
    } else {
      console.error('No booking details found');
    }
  }

  // Method to handle payment submission
  submitPayment() {
    const validationMessage = this.paymentDetails.IsPaymentValid();

    if (validationMessage === 'Valid' && this.bookingDetails) {
      // Combine booking details and payment details into one object for the request body
      const requestBody = {
        bookingModel: {
          facilityId: this.bookingDetails.FacilityId,
          facilityName: this.bookingDetails.FacilityName,
          bookingDate: this.bookingDetails.BookingDate,
          durationInHours: this.bookingDetails.DurationInHours,
          totalPrice: this.bookingDetails.TotalPrice
        },
        paymentDetails: {
          cardNumber: this.paymentDetails.CardNumber,
          cardHolder: this.paymentDetails.CardHolder,
          cvv: this.paymentDetails.CVV,
          expirationDate: this.paymentDetails.ExpirationDate
        }
      };

      // Proceed to book the facility after successful payment
      this.bookingService.bookFacility(requestBody).subscribe(
        (response) => {
          console.log('Booking successful:', response);
          // Navigate to a booking confirmation page or show a success message
          this.router.navigate(['/client-facility']);
        },
        (error) => {
          console.error('Booking failed:', error);
          // Handle booking failure, maybe show an error message
        }
      );

    } else {
      this.paymentMessage = validationMessage; // Display the validation message
    }
  }
}



