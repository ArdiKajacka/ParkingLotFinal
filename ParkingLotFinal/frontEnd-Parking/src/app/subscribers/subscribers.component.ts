import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {
  subscribers: any[] = [];
  filteredSubscribers: any[] = [];
  searchTerm: string = '';

  showCreateFormFlag: boolean = false;
  showUpdateFormFlag: boolean = false;
  selectedSubscriber: any;

  constructor(private http: HttpClient, private elementRef: ElementRef) {}

  ngOnInit() {
    this.getSubscriberData();
  }

  getSubscriberData() {
    this.http.get<any[]>('https://localhost:7145/api/subscribers').subscribe((data) => {
      this.subscribers = data;
      this.filterSubscribers();
    });
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.filterSubscribers();
  }

  filterSubscribers() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredSubscribers = this.subscribers;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      this.filteredSubscribers = this.subscribers.filter((subscriber) =>
        this.searchInSubscriber(subscriber, searchTermLower)
      );
    }
  }

  cancelCreateForm() {
    this.showCreateFormFlag = false;
  }

  cancelUpdateForm() {
    this.showUpdateFormFlag = false;
  }

  searchInSubscriber(subscriber: any, searchTermLower: string): boolean {
    if (!subscriber) {
      return false;
    }
  
    const id = subscriber.id?.toString() || '';
    const firstName = subscriber.firstName?.toLowerCase() || '';
    const lastName = subscriber.lastName?.toLowerCase() || '';
    const idCard = subscriber.idCard?.toString() || '';
    const email = subscriber.email?.toLowerCase() || '';
    const phone = subscriber.phone?.toString() || '';
    const plateNumber = subscriber.plateNumber?.toString() || '';
    const isDeleted = subscriber.isDeleted?.toString() || '';
  
    return (
      id.includes(searchTermLower) ||
      firstName.includes(searchTermLower) ||
      lastName.includes(searchTermLower) ||
      idCard.includes(searchTermLower) ||
      email.includes(searchTermLower) ||
      phone.includes(searchTermLower) ||
      plateNumber.includes(searchTermLower) ||
      isDeleted.includes(searchTermLower)
    );
  }
  

// ... (existing code)

onDelete(idCard: number) {
  const deleteUrl = `https://localhost:7145/api/subscribers/${idCard}`;

  this.http.delete(deleteUrl).subscribe(
    (response) => {
      // Deletion successful, handle any response if needed
      console.log('Delete successful:', response);

      // Update the subscriber in the local array
      const index = this.subscribers.findIndex(subscriber => subscriber.idCard === idCard);
      if (index !== -1) {
        this.subscribers[index].isDeleted = true;
        this.filterSubscribers();
      }
    },
    (error) => {
      // Handle errors if any
      console.error('Delete failed:', error);
      // You can add error handling here (e.g., display an error message to the user)
    }
  );
}

// ... (existing code)


// ... (existing code)

  toggleCreateForm() {
    this.showCreateFormFlag = !this.showCreateFormFlag;
  }

  showUpdateForm(subscriber: any) {
    this.showUpdateFormFlag = true;
    this.selectedSubscriber = subscriber;
  }

// ... (existing code)

onSubmitCreateForm(firstName: string, lastName: string, idCardInput: string, email: string, phoneInput: string, plateNumber: string) {
  const newSubscriber = {
    firstName: firstName,
    lastName: lastName,
    idCard: Number(idCardInput),
    email: email,
    phone: Number(phoneInput),
    plateNumber: plateNumber,
    isDeleted: false // For a new subscriber, set isDeleted to false
  };

  const createUrl = `https://localhost:7145/api/subscribers`;

  this.http.post(createUrl, newSubscriber).subscribe(
    (response) => {
      // Creation successful, handle any response if needed
      console.log('Creation successful:', response);

      // Add the new subscriber to the local array
      this.subscribers.push(newSubscriber);
      this.filterSubscribers();

      this.showCreateFormFlag = false;
    },
    (error) => {
      // Handle errors if any
      console.error('Creation failed:', error);
      // You can add error handling here (e.g., display an error message to the user)
    }
  );
}

// ... (existing code)



onSubmitUpdateForm(firstName: string, lastName: string, idCardInput: string, email: string, phoneInput: string, plateNumber: string, idCard: string) {
  const updatedSubscriber = {
    firstName: firstName,
    lastName: lastName,
    idCard: Number(idCardInput),
    email: email,
    phone: Number(phoneInput),
    plateNumber: plateNumber
  };

  const updateUrl = `https://localhost:7145/api/subscribers/${idCard}`;

  this.http.put(updateUrl, updatedSubscriber).subscribe(
    (response) => {
      console.log('Update successful:', response);

      const index = this.subscribers.findIndex(subscriber => subscriber.idCard === Number(idCard));
      if (index !== -1) {
        this.subscribers[index] = { ...this.subscribers[index], ...updatedSubscriber };
        this.filterSubscribers();
      }

      this.showUpdateFormFlag = false;
    }
  );
}


}
