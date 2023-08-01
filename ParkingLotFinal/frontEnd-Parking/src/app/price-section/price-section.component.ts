import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-price-section',
  templateUrl: './price-section.component.html',
  styleUrls: ['./price-section.component.css'],
})
export class PriceSectionComponent implements OnInit {
  overallSpots!: number;
  occupiedSpots!: number;
  reservedSpots!: number;
  freeSpots!: number;
  busySpots!: number;

  @Input() priceSection: any;

  weekDayHourly!: number;
  weekDayDaily!: number;
  weekDayMinimumHours!: number;
  weekEndHourly!: number;
  weekEndDaily!: number;
  weekEndMinimumHours!: number;
  
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
    this.fetchPricingData();
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  fetchData(): void {
    this.dataService
      .fetchOverallSpots()
      .then((overallSpots: number) => {
        this.overallSpots = overallSpots;
        return this.dataService.fetchOccupiedSpots();
      })
      .then((occupiedSpots: number) => {
        this.occupiedSpots = occupiedSpots;
        return this.dataService.fetchReservedSpots();
      })
      .then((reservedSpots: number) => {
        this.reservedSpots = reservedSpots;
        this.freeSpots = this.overallSpots - (this.occupiedSpots + this.reservedSpots);
        this.busySpots = this.occupiedSpots + this.reservedSpots;

        this.processOccupiedSpots(this.occupiedSpots);
        this.updateSpotsLeft(this.freeSpots);

        // Animate the progress of freeSpots and busySpots
        this.animateSpots(this.overallSpots, this.occupiedSpots, this.reservedSpots);

      })
      .catch((error: any) => {
        console.error('Error fetching or parsing the data:', error);
      });
  }

  processOccupiedSpots(occupiedSpots: number): void {
    console.log('Processing occupied spots: ' + occupiedSpots);
  }

  updateSpotsLeft(freeSpots: number): void {
    const h2Element = document.getElementById('freeSpots-header');
    const freeProgressBar = document.getElementById('firstProgress');
    if (h2Element && freeProgressBar) {
      const widthPercentage = `${freeSpots}%`;
      freeProgressBar.textContent = freeSpots.toString();
      freeProgressBar.classList.add('progress-bar');
      setTimeout(() => {
        freeProgressBar.style.width = widthPercentage;
      }, 50);
  
      if (freeSpots <= 10) {
        freeProgressBar.style.backgroundColor = 'red';
      } else if (freeSpots <= 25) {
        freeProgressBar.style.backgroundColor = 'yellow';
      } else {
        freeProgressBar.style.backgroundColor = 'green';
      }
      h2Element.textContent = `Parking spots left: ${freeSpots}`;
    } 
  }

  updateBusySpots(busySpots: number): void {
    const busyProgressBar = document.getElementById('secondProgress');
    if (busyProgressBar) {
      const widthPercentage = `${busySpots}%`;
      busyProgressBar.textContent = busySpots.toString();
      busyProgressBar.classList.add('progress-bar');
      setTimeout(() => {
        busyProgressBar.style.width = widthPercentage;
      }, 50);
    }
  }

  fetchPricingData(): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://localhost:7145/api/PricingPlans', true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          try {
            const jsonData = JSON.parse(xhr.responseText);
  
            if (jsonData && Array.isArray(jsonData) && jsonData.length >= 2) {
              // Assuming the weekday data is the first item in the array and weekend data is the second item
              this.weekDayHourly = jsonData[0].hourlyPricing;
              this.weekDayDaily = jsonData[0].dailyPricing;
              this.weekDayMinimumHours = jsonData[0].minimumHours;
  
              this.weekEndHourly = jsonData[1].hourlyPricing;
              this.weekEndDaily = jsonData[1].dailyPricing;
              this.weekEndMinimumHours = jsonData[1].minimumHours;
  
              console.log("Pricing Data fetched.");
              this.updatePrices();
            } else {
              console.error("Unexpected JSON response:", jsonData);
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        } else {
          console.error("Failed to fetch pricing data. Status code:", xhr.status);
        }
      }
    };
    xhr.send();
  }
  
  animatePrices(
    startValue: number,
    endValue: number,
    updateFunction: (value: number) => void,
    duration: number
  ): void {
    const startTime = performance.now();
  
    function animate(currentTime: number): void {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentValue = startValue + (endValue - startValue) * progress;
  
      updateFunction(currentValue);
  
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
  
    requestAnimationFrame(animate);
  }

  updatePrices(): void {
    const weekDayHourlyFunction = document.getElementById("weekDayHourly");
    const weekDayDailyFunction = document.getElementById("weekDayDaily");
    const weekDayMinHoursFunction = document.getElementById("weekDayMinHours");
  
    if (weekDayHourlyFunction && weekDayDailyFunction && weekDayMinHoursFunction) {
      this.animatePrices(0, this.weekDayHourly, (value) => {
        weekDayHourlyFunction.textContent = value.toFixed(2) + "€";
      }, 1500);
  
      this.animatePrices(0, this.weekDayDaily, (value) => {
        weekDayDailyFunction.textContent = value.toFixed(2) + "€";
      }, 1500);
  
      this.animatePrices(0, this.weekDayMinimumHours, (value) => {
        weekDayMinHoursFunction.textContent = "Minimum: " + value.toFixed(0) + " hours";
      }, 1500);
    }
  
    const weekEndHourlyFunction = document.getElementById("weekEndHourly");
    const weekEndDailyFunction = document.getElementById("weekEndDaily");
    const weekEndMinHoursFunction = document.getElementById("weekEndMinHours");
  
    if (weekEndHourlyFunction && weekEndDailyFunction && weekEndMinHoursFunction) {
      this.animatePrices(0, this.weekEndHourly, (value) => {
        weekEndHourlyFunction.textContent = value.toFixed(2) + "€";
      }, 1500);
  
      this.animatePrices(0, this.weekEndDaily, (value) => {
        weekEndDailyFunction.textContent = value.toFixed(2) + "€";
      }, 1500);
  
      this.animatePrices(0, this.weekEndMinimumHours, (value) => {
        weekEndMinHoursFunction.textContent = "Minimum: " + value.toFixed(0) + " hours";
      }, 1500);
    }
  }
  
  animateSpots(overallSpots: number, occupiedSpots: number, reservedSpots: number): void {
    const freeProgressBar = document.getElementById('firstProgress');
    const busyProgressBar = document.getElementById('secondProgress');
    const h2Element = document.getElementById('freeSpots-header');
  
    const startFreeWidth = parseFloat(freeProgressBar?.style.width || '0');
    const startBusyWidth = parseFloat(busyProgressBar?.style.width || '0');
  
    const endFreeWidth = (this.freeSpots / overallSpots) * 100;
    const endBusyWidth = (this.busySpots / overallSpots) * 100;
  
    const startFreeNumber = parseFloat(freeProgressBar?.textContent || '0');
    const startBusyNumber = parseFloat(busyProgressBar?.textContent || '0');
  
    const endFreeNumber = this.freeSpots;
    const endBusyNumber = this.busySpots;
  
    const startTime = performance.now();
    const duration = 1500; // 2 seconds
  
    function updateProgress(progress: number): void {
      freeProgressBar!.style.width = startFreeWidth + (endFreeWidth - startFreeWidth) * progress + '%';
      busyProgressBar!.style.width = startBusyWidth + (endBusyWidth - startBusyWidth) * progress + '%';
      const currentFreeNumber = startFreeNumber + (endFreeNumber - startFreeNumber) * progress;
      const currentBusyNumber = startBusyNumber + (endBusyNumber - startBusyNumber) * progress;
      freeProgressBar!.textContent = currentFreeNumber.toFixed(0);
      busyProgressBar!.textContent = currentBusyNumber.toFixed(0);
      h2Element!.textContent = `Parking spots left: ${currentFreeNumber.toFixed(0)}`;
    }
  
    function animate(currentTime: number): void {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
  
      updateProgress(progress);
  
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
  
    requestAnimationFrame(animate);
  }
}
