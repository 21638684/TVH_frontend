import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import {EventModel} from '../../app/shared/event';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'https://localhost:7129/api/Event'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { 
  }

  createEvent(event: EventModel): Observable<EventModel> {
    return this.httpClient.post<EventModel>(this.apiUrl, event, this.httpOptions);
  }

}


