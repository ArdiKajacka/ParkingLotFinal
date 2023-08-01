import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delayWhen } from 'rxjs';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  subscriptions: any[] = [];
  filteredSubscriptions: any[] = [];
  searchTerm: string = '';

  showCreateFormFlag: boolean = false;
  showUpdateFormFlag: boolean = false;
  updating: boolean = false;
  code: number = 0;
  subscriberId: number = 0;
  price: number = 0;
  discountValue: number = 0;
  startDate: string = '';
  endDate: string = '';
  subscriberData: any; // To store the fetched subscriber data
  idCard: string = ''; // Add the idCard property and set its initial value to an empty string


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getSubscriptionData();
  }

  getSubscriptionData() {
    this.http.get<any[]>('https://localhost:7145/api/subscriptions').subscribe((data) => {
      this.subscriptions = data;
      this.filterSubscriptions();
    });
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.filterSubscriptions();
  }

  filterSubscriptions() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredSubscriptions = this.subscriptions;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      this.filteredSubscriptions = this.subscriptions.filter((subscription) =>
        this.searchInSubscription(subscription, searchTermLower)
      );
    }
  }

  searchInSubscription(subscription: any, searchTermLower: string): boolean {
    return (
      subscription.code.toString().includes(searchTermLower) ||
      subscription.subscriber.firstName.toLowerCase().includes(searchTermLower) ||
      subscription.subscriber.lastName.toLowerCase().includes(searchTermLower) ||
      subscription.subscriber.idCard.toString().includes(searchTermLower) ||
      subscription.subscriber.email.toLowerCase().includes(searchTermLower) ||
      subscription.subscriber.phone.toString().includes(searchTermLower) ||
      subscription.subscriber.plateNumber.toString().includes(searchTermLower) ||
      subscription.isDeleted.toString().includes(searchTermLower)
    );
  }

  onDelete(code: number) {
    // Find the index of the subscription to be deleted
    const index = this.subscriptions.findIndex((subscription) => subscription.code === code);
    if (index !== -1) {
      // Update the isDeleted property of the subscription
      this.subscriptions[index].isDeleted = true;
    }
  }

  showCreateForm() {
    this.showCreateFormFlag = true;
    this.code = 0;
    this.subscriberId = 0;
    this.price = 0;
    this.discountValue = 0;
    this.startDate = '';
    this.endDate = '';
  }

  onCancelCreate() {
    this.showCreateFormFlag = false;
  }


  showUpdateForm(subscription: any) {
    this.showUpdateFormFlag = true;
    this.updating = true;
    this.code = subscription.code;
    this.subscriberId = subscription.subscriberId;
    this.price = subscription.price;
    this.discountValue = subscription.discountValue;
    this.startDate = subscription.startTime;
    this.endDate = subscription.endTime;
  }

  onCancelUpdateSubscription() {
    this.showUpdateFormFlag = false;
    this.updating = false;
  }

  onUpdateSubscription() {
    // Find the index of the subscription to be updated
    const index = this.subscriptions.findIndex((subscription) => subscription.code === this.code);

    if (index !== -1) {
      // Construct the updated subscription object in the correct JSON format
      const updatedSubscription = {
        id: this.subscriptions[index].id, // Make sure to include the ID
        code: this.code,
        subscriberId: this.subscriberId,
        price: this.price,
        discountValue: this.discountValue,
        startTime: this.startDate,
        endTime: this.endDate,
        isDeleted: this.subscriptions[index].isDeleted,
      };

      // Set the headers for the PUT request
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      this.http.put('https://localhost:7145/api/subscriptions', updatedSubscription, httpOptions)
        .subscribe((response) => {
          // Update the subscription in the local list if the request was successful
          this.subscriptions[index] = updatedSubscription;

          // Reset form variables
          this.showUpdateFormFlag = false;
          this.updating = false;
        }, (error) => {
          console.error('Error updating subscription:', error);
          // Optionally, you can show an error message to the user here
        });
    }
  }

  toggleCreateSubscriptionForm() {
    this.showCreateFormFlag = !this.showCreateFormFlag;
    this.code = 0;
    this.subscriberId = 0;
    this.price = 0;
    this.discountValue = 0;
    this.startDate = '';
    this.endDate = '';
  }




  fetchSubscriberData(idCard: string) {
    const subscriberEndpoint = `https://localhost:7145/api/subscribers/${idCard}`;
    console.log(subscriberEndpoint)
    return this.http.get<any>(subscriberEndpoint);
  }
  
  onCreate(
    codeInputValue: string,
    idCardInputValue: string,
    priceInputValue: string,
    discountValueInputValue: string,
    startDateInputValue: string,
    startTimeInputValue: string,
    endDateInputValue: string,
    endTimeInputValue: string
  ) {
    const code = +codeInputValue;
    const idCard = +idCardInputValue;
    const price = +priceInputValue;
    const discountValue = +discountValueInputValue;
  
    const startTime = startDateInputValue + 'T' + startTimeInputValue;
    const endTime = endDateInputValue + 'T' + endTimeInputValue;
  
    this.fetchSubscriberData(idCard.toString()).subscribe(
      (subscriberData) => {
        this.subscriberData = subscriberData;
        this.subscriberId = idCard;
        const subscriber = this.subscriberData;
  
        const newSubscription = {
          id: 0, // Id doesn't matter as it will be generated by the backend
          code: code,
          subscriberId: this.subscriberId, // Use the subscriber ID from the fetched data (idCard)
          subscriber: {
            firstName: subscriber.firstName,
            lastName: subscriber.lastName,
            idCard: subscriber.idCard,
            email: subscriber.email,
            phone: subscriber.phone,
            plateNumber: subscriber.plateNumber,
            isDeleted: subscriber.isDeleted,
          },
          price: price,
          discountValue: discountValue,
          startTime: new Date(startTime).toISOString(), // Convert to ISO string format
          endTime: new Date(endTime).toISOString(), // Convert to ISO string format
          isDeleted: false, // Always set this to false
        };
  
        // Send a POST request to the backend API with the newSubscription data
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
  
        this.http.post('https://localhost:7145/api/subscriptions', newSubscription, httpOptions)
          .subscribe((response) => {
            // Add the new subscription to the local list
            this.subscriptions.push(response);
  
            // Update the filtered list
            this.filterSubscriptions();
  
            // Reset form variables
            this.showCreateFormFlag = false;
            this.subscriberData = null; // Reset subscriber data after creating the subscription
          }, (error) => {
            console.error('Error creating subscription:', error);
            // Optionally, you can show an error message to the user here
          });
      },
      (error) => {
        console.error('Error fetching subscriber details:', error);
        // Optionally, you can show an error message to the user here
      }
    );
  }
  
  }