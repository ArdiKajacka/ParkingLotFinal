import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubscribeService } from '../subscribe.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent {
  firstName: string = '';
  lastName: string = '';
  cardNumber: string = '';
  email: string = '';
  phone: string = '';
  plateNumber: string = '';

  constructor(private http: HttpClient, private subscribeService: SubscribeService) {}

  ngOnInit() {
    this.getSubscriberData();
  }
  
  getSubscriberData() {
    this.http.get('https://localhost:7145/api/subscribers').subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.error('Failed to fetch subscribers:', error);
      }
    );
  }

  submitSubscriberData() {
    const newSubscriber = {
      firstName: this.firstName,
      lastName: this.lastName,
      idCard: parseInt(this.cardNumber),
      email: this.email,
      phone: this.phone,
      plateNumber: this.plateNumber,
      isDeleted: false
    };

    this.subscribeService.createSubscriber(newSubscriber).subscribe(
      (response: any) => {
        console.log(newSubscriber);
        this.getSubscriberData(); // Fetch updated data after successful submission
      }
    );
  }
}
