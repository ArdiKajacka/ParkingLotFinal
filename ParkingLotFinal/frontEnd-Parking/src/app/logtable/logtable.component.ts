import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-logtable',
  templateUrl: './logtable.component.html',
  styleUrls: ['./logtable.component.css']

})
export class LogtableComponent implements OnInit {
  logs: any[] = [];
  filteredLogs: any[] = [];
  searchTerm: string = '';
  isStartLogDisabled: boolean = false;
  isLogging: boolean = false;
  startTime: Date | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getLogData();
  }

  getLogData() {
    this.http.get<any>('./assets/logs.json').subscribe((data) => {
      this.logs = data.map((log: any) => ({ ...log, isRunning: false }));
      this.filterLogs();
    });
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.filterLogs();
  }

  onDelete(id: number) {
    console.log(`Deleting log with ID: ${id}`);
  }

  onStartLogForNewLog() {
    this.isLogging = true;
    this.startTime = new Date();
  }

  onStopLog() {
    this.isLogging = false;
    const endTime = new Date();
    console.log('Start Time:', this.startTime?.toISOString());
    console.log('End Time:', endTime.toISOString());
  }

  filterLogs() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredLogs = this.logs;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      this.filteredLogs = this.logs.filter((log) =>
        this.searchInLog(log, searchTermLower)
      );
    }
  }

  searchInLog(log: any, searchTermLower: string): boolean {
    return (
      log.id.toString().includes(searchTermLower) ||
      log.subscriptionId.toString().includes(searchTermLower) ||
      log.subscription?.subscriber?.firstName.toLowerCase().includes(searchTermLower) ||
      log.subscription?.subscriber?.lastName.toLowerCase().includes(searchTermLower) ||
      log.subscription?.startTime.includes(searchTermLower) ||
      log.subscription?.endTime.includes(searchTermLower)
    );
  }

  saveLogData(log: any) {
    console.log(`Saving log with ID: ${log.id}`);
    console.log('Start Time:', log.startTime);
    console.log('End Time:', log.endTime);
  }
}
