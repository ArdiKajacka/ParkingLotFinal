import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComplainService } from '../complain.service';

@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.css']
})
export class ComplainComponent {

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  type: string = '';
  details: string = '';


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getComplaintData(); // Call the function here during component initialization.
  }

  getComplaintData() {
    const xhr = new XMLHttpRequest();
    console.log(xhr);
    xhr.open('GET', 'https://localhost:7145/api/complaints', true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const jsonResponse = JSON.parse(xhr.responseText);
        console.log(jsonResponse);
      }
    };
    xhr.send();
  }

  submitComplaintData() {
    // Create complaint object
    const newComplaint = {
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      email: this.email,
      type: this.type,
      details: this.details
    };

    // Convert the JavaScript object to a JSON string
    const newComplaintJson = JSON.stringify(newComplaint);

    // Create a new XMLHttpRequest object
    const postRequest = new XMLHttpRequest();
    postRequest.open('POST', 'https://localhost:7145/api/complaints', true);
    postRequest.setRequestHeader('Content-Type', 'application/json');

    postRequest.onreadystatechange = () => {
      if (postRequest.readyState === 4) {
        if (postRequest.status === 200) {
          console.log(postRequest.responseText);
        } else {
          console.error('Failed to submit complaint:', postRequest.responseText);
        }
      }
    };

    postRequest.send(newComplaintJson);
  }

  onLoad() {
    this.getComplaintData();
  }

  onSubmit() {
    this.getComplaintData();
    this.submitComplaintData();
  }
}
