import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getLogsData() {
    return this.http.get<any>('https://localhost:7145/api/logs'); // Update the API endpoint for logs
  }

  deleteLog(logId: number) {
    return this.http.delete<any>(`https://localhost:7145/api/logs/${logId}`); // Update the API endpoint for deleting logs
  }

  getSubscribersData() {
    return this.http.get<any>('https://localhost:7145/api/subscribers'); // Update the API endpoint for subscribers
  }

  deleteSubscriber(subscriberId: number) {
    return this.http.delete<any>(`https://localhost:7145/api/subscribers/${subscriberId}`); // Update the API endpoint for deleting subscribers
  }

  addSubscriber(subscriber: any) {
    return this.http.post('https://localhost:7145/api/subscribers', subscriber); // Update the API endpoint for adding subscribers
  }

  addLog(log: any) {
    return this.http.post('https://localhost:7145/api/logs', log); // Update the API endpoint for adding logs
  }

  getData() {
    return this.http.get('https://localhost:7145/api/data'); // Update the API endpoint for general data
  }

  fetchOverallSpots(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.http.get('https://localhost:7145/api/ParkingSpots/Total').subscribe(
        (jsonData: any) => {
          const overallSpots = jsonData.totalSpots;
          console.log("overallSpots" + overallSpots)
          resolve(overallSpots);
        },
        (error) => {
          console.error('Error fetching the JSON:', error);
          reject(error);
        }
      );
    });
  }

  fetchOccupiedSpots(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.http.get('https://localhost:7145/api/ParkingSpots/Occupied/Regular').subscribe(
        (jsonData: any) => {
          const occupiedSpots = jsonData.occupiedRegularSpots;
          resolve(occupiedSpots);
        },
        (error) => {
          console.error('Error fetching or parsing the JSON:', error);
          reject(error);
        }
      );
    });
  }

  fetchReservedSpots(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.http.get<any[]>('https://localhost:7145/api/subscribers').subscribe(
        (jsonData: any[]) => {
          const reservedSpots = jsonData.length;
          console.log("reservedSpots" + reservedSpots)
          resolve(reservedSpots);
        }
      );
    });
  }
  
}
