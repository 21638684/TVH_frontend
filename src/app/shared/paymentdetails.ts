export class PaymentDetailsModel {
    PaymentDetailsId: number = 0;
    CardNumber: string = '';
    CardHolder: string = '';
    CVV: string = '';
    ExpirationDate: string = ''; // Format: MM/yyyy
  
    IsPaymentValid(): string {
      // Validate Card Number (16 digits)
      if (this.CardNumber.length !== 16 || !/^\d{16}$/.test(this.CardNumber)) {
        return "Invalid Card Number.";
      }
  
      // Validate CVV (3 or 4 digits)
      if (this.CVV.length < 3 || this.CVV.length > 4 || !/^\d+$/.test(this.CVV)) {
        return "Invalid CVV.";
      }
  
      // Validate Expiration Date (MM/yyyy)
      const expDateParts = this.ExpirationDate.split('/');
      if (expDateParts.length !== 2 || expDateParts[0].length !== 2 || expDateParts[1].length !== 4) {
        return "Invalid Expiration Date format.";
      }
  
      const month = parseInt(expDateParts[0], 10);
      const year = parseInt(expDateParts[1], 10);
  
      // Check if the month is valid
      if (month < 1 || month > 12) {
        return "Invalid month in expiration date.";
      }
  
      // Create a Date object to compare expiration
      const currentDate = new Date();
      const expDate = new Date(year, month - 1); // Month is 0-based
  
      // Check if the expiration date is in the past
      if (expDate < currentDate) {
        return "Card is expired.";
      }
  
      return "Valid";
    }
  }
  