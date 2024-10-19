export interface Facility {
    facilityId: number;
    facilityName: string;
    categoryName: string;
    location: string;
    availabilityStatus: boolean;
    capacity: number;
    pricePerHour: number;
    pricePerDay: number;
    description: string;
    openingHours: string;
    closingHours: string;
    images: File; // Can be a string or other types depending on how you're handling images
  }
  