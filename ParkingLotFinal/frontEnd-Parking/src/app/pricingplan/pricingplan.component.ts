import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pricing-plan',
  templateUrl: './pricingplan.component.html',
  styleUrls: ['./pricingplan.component.css']
})
export class PricingPlanComponent implements OnInit {
  weekdayData: any[] = [];
  weekendData: any[] = [];

  // Variables for update form
  showWeekdayUpdateFormFlag: boolean = false;
  showWeekendUpdateFormFlag: boolean = false;
  updatingWeekday: boolean = false;
  updatingWeekend: boolean = false;
  weekdayId: number = 0;
  weekendId: number = 0;
  hourlyPricing: number = 0;
  dailyPricing: number = 0;
  minimumHours: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPricingData();
  }

  getPricingData() {
    this.http.get<any[]>('https://localhost:7145/api/PricingPlans').subscribe((data) => {
      this.weekdayData = data.filter((item) => item.type === 0);
      this.weekendData = data.filter((item) => item.type === 1);
    });
  }

  // Weekday update functions
  showWeekdayUpdateForm(item: any) {
    this.showWeekdayUpdateFormFlag = true;
    this.updatingWeekday = true;
    this.weekdayId = item.id;
    this.hourlyPricing = item.hourlyPricing;
    this.dailyPricing = item.dailyPricing;
    this.minimumHours = item.minimumHours;
  }

  onCancelWeekdayUpdate() {
    this.showWeekdayUpdateFormFlag = false;
    this.updatingWeekday = false;
  }

  onUpdateWeekday(
    hourlyPricingInput: HTMLInputElement,
    dailyPricingInput: HTMLInputElement,
    minimumHoursInput: HTMLInputElement
  ) {
    const updatedData = {
      id: this.weekdayId,
      hourlyPricing: parseFloat(hourlyPricingInput.value),
      dailyPricing: parseFloat(dailyPricingInput.value),
      minimumHours: parseInt(minimumHoursInput.value, 10),
      type: 0
    };

    const updateUrl = `https://localhost:7145/api/PricingPlans/${this.weekdayId}`;

    this.http.patch(updateUrl, updatedData).subscribe(
      (response) => {
        // Update successful, handle any response if needed
        console.log('Weekday Update Successful:', response);

        // Update the data in the local array
        const index = this.weekdayData.findIndex((item) => item.id === this.weekdayId);
        if (index !== -1) {
          this.weekdayData[index] = updatedData;
        }

        this.showWeekdayUpdateFormFlag = false;
        this.updatingWeekday = false;
      },
      (error) => {
        // Handle errors if any
        console.error('Weekday Update Failed:', error);
        // You can add error handling here (e.g., display an error message to the user)
      }
    );
  }

  // Weekend update functions
  showWeekendUpdateForm(item: any) {
    this.showWeekendUpdateFormFlag = true;
    this.updatingWeekend = true;
    this.weekendId = item.id;
    this.hourlyPricing = item.hourlyPricing;
    this.dailyPricing = item.dailyPricing;
    this.minimumHours = item.minimumHours;
  }

  onCancelWeekendUpdate() {
    this.showWeekendUpdateFormFlag = false;
    this.updatingWeekend = false;
  }

  onUpdateWeekend(
    hourlyPricingInput: HTMLInputElement,
    dailyPricingInput: HTMLInputElement,
    minimumHoursInput: HTMLInputElement
  ) {
    const updatedData = {
      id: this.weekendId,
      hourlyPricing: parseFloat(hourlyPricingInput.value),
      dailyPricing: parseFloat(dailyPricingInput.value),
      minimumHours: parseInt(minimumHoursInput.value, 10),
      type: 1
    };

    const updateUrl = `https://localhost:7145/api/PricingPlans/${this.weekendId}`;

    this.http.patch(updateUrl, updatedData).subscribe(
      (response) => {
        // Update successful, handle any response if needed
        console.log('Weekend Update Successful:', response);

        // Update the data in the local array
        const index = this.weekendData.findIndex((item) => item.id === this.weekendId);
        if (index !== -1) {
          this.weekendData[index] = updatedData;
        }

        this.showWeekendUpdateFormFlag = false;
        this.updatingWeekend = false;
      },
      (error) => {
        // Handle errors if any
        console.error('Weekend Update Failed:', error);
        // You can add error handling here (e.g., display an error message to the user)
      }
    );
  }
}
