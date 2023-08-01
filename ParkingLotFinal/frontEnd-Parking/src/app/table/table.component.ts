import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

type FormType = 'add' | 'update'; // Define a custom type for formType

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  subscribersData: any[] = [];
  selectedTable: string = 'subscribers'; // Initialize to 'subscribers'
  showDropdown: boolean = false;
  showAddForm: boolean = false;
  showAddFormType: FormType = 'add'; // Initialize with 'add'
  subscriberForm: FormGroup;
  updateForm: FormGroup;
  searchText: string = ''; // Initialize the searchText variable

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {
    this.subscriberForm = this.formBuilder.group({
      idCard: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      plateNumber: ['', Validators.required],
      isDeleted: [false],
    });

    this.updateForm = this.formBuilder.group({
      idCard: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      plateNumber: ['', Validators.required],
      isDeleted: [false],
    });
  }

  ngOnInit() {
    this.loadData();
  }

  toggleDropdownAndButtons() {
    this.showDropdown = !this.showDropdown;
  }

  search() {
    // Implement the search logic here based on the searchText
    // For example, we can filter the subscribersData array based on the searchText
    this.loadData();
  }

  refreshTable() {
    this.loadData();
  }

  selectTable(tableType: string) {
    this.selectedTable = tableType;
    this.toggleDropdownAndButtons();
  }

  loadData() {
    this.dataService.getSubscribersData().subscribe(
      (data: any[]) => {
        this.subscribersData = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  toggleAddForm(formType: FormType) {
    this.showAddForm = !this.showAddForm;
    this.showAddFormType = formType;
  
    if (this.showAddFormType === 'add') {
      this.subscriberForm.reset();
      // Clear the idCard field when adding a new subscriber
      this.subscriberForm.get('idCard')?.clearValidators();
      this.subscriberForm.get('idCard')?.updateValueAndValidity();
    } else if (this.showAddFormType === 'update') {
      // Set the idCard field as required when updating a subscriber
      this.subscriberForm.get('idCard')?.setValidators(Validators.required);
      this.subscriberForm.get('idCard')?.updateValueAndValidity();
    }
  }

  addSubscriber() {
    const newSubscriber = {
      idCard: Number(this.subscriberForm.get('idCard')!.value), // Convert to number
      firstName: this.subscriberForm.get('firstName')!.value,
      lastName: this.subscriberForm.get('lastName')!.value,
      email: this.subscriberForm.get('email')!.value,
      phone: Number(this.subscriberForm.get('phone')!.value) || 0, // Convert to number
      plateNumber: Number(this.subscriberForm.get('plateNumber')!.value) || 0, // Convert to number
      isDeleted: this.subscriberForm.get('isDeleted')!.value === 'true', // Convert to boolean
    };
  
    console.log(newSubscriber);
  
    this.http.post('https://localhost:7145/api/subscribers', newSubscriber).subscribe(
      () => {
        this.refreshTable(); // Call refreshTable() after successful addition
        this.toggleAddForm('add'); // Reset the form type to 'add' after successful addition
      },
      (error: any) => {
        console.log('Error adding subscriber:', error);
      }
    );
  }
  
  
  deleteSubscriber(idCard: number) {
    const apiAddress = `https://localhost:7145/api/subscribers/${idCard}`;
    this.http.delete(apiAddress).subscribe(
      () => {
        this.refreshTable(); // Call refreshTable() after successful deletion
      },
      (error: any) => {
        console.error('Error deleting subscriber:', error);
      }
    );
  }

  updateSubscriber(idCard: number) {
    const subscriberToUpdate = this.subscribersData.find((subscriber) => subscriber.idCard === idCard);

    if (!subscriberToUpdate) {
      console.error('Subscriber not found for update.');
      return;
    }

    this.updateForm.setValue({
      idCard: subscriberToUpdate.idCard,
      firstName: subscriberToUpdate.firstName,
      lastName: subscriberToUpdate.lastName,
      email: subscriberToUpdate.email,
      phone: subscriberToUpdate.phone,
      plateNumber: subscriberToUpdate.plateNumber,
      isDeleted: subscriberToUpdate.isDeleted,
    });

    this.showAddFormType = 'update';
    this.showAddForm = true;
  }

  updateSubscriberData() {
    const idCard = this.updateForm.get('idCard')?.value;
    if (!idCard) {
      console.error('ID Card is required for updating.');
      return;
    }

    // Create the subscriber data object with correct data types
    const updatedSubscriber = {
      firstName: this.updateForm.get('firstName')?.value,
      lastName: this.updateForm.get('lastName')?.value,
      idCard: +this.updateForm.get('idCard')?.value || 0,
      email: this.updateForm.get('email')?.value,
      phone: +this.updateForm.get('phone')?.value || 0,
      plateNumber: +this.updateForm.get('plateNumber')?.value || 0,
      isDeleted: this.updateForm.get('isDeleted')?.value,
    };

    const apiAddress = `https://localhost:7145/api/subscribers/${idCard}`;

    this.http.put(apiAddress, updatedSubscriber).subscribe(
      () => {
        this.refreshTable();
        this.toggleAddForm('add'); // Reset the form type to 'add' after successful update
      },
      (error: any) => {
        console.error('Error updating subscriber:', error);
      }
    );
  }

  onFormSubmit() {
    if (this.showAddFormType === 'add') {
      this.addSubscriber();
    } else if (this.showAddFormType === 'update') {
      this.updateSubscriberData();
    }
  }

  // Function to cancel the add form and reset the form fields
  cancelAdd() {
    this.toggleAddForm('add'); // Reset the form type to 'add' when cancelling
  }
}
