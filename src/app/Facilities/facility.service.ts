import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facility } from '../shared/facility';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {
  private baseUrl = 'https://localhost:7129/api/Facility';  // Base URL for the API

  constructor(private http: HttpClient) { }

  // Method to get all facilities
  getFacilities(): Observable<Facility[]> {
    return this.http.get<Facility[]>(`${this.baseUrl}/GetAll`);
  }

  // Method to create a new facility
  createFacility(facilityData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/Create`, facilityData);
  }
}
