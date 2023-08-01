import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SubscribeService {
  private apiUrl = 'https://localhost:7145/api/subscribers'; // Replace with your backend API endpoint

  constructor(private http: HttpClient) {}

  getSubscribers() {
    return this.http.get(this.apiUrl);
  }

  createSubscriber(subscriberData: any) {
    return this.http.post(this.apiUrl, subscriberData);
  }
}
