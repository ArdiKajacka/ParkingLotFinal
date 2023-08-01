import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComplainService {
  constructor(private http: HttpClient) {}

  getComplaintData() {
    return this.http.get<any>('..\assets\complain.json');
  }

  submitComplaintData(newComplaint: any) {
    return this.http.post<any>('api/complaints', newComplaint);
  }
}
