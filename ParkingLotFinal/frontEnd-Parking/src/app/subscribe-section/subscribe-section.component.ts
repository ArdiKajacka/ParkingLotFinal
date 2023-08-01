import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-subscribe-section',
  templateUrl: './subscribe-section.component.html',
  styleUrls: ['./subscribe-section.component.css']
})

export class SubscribeSectionComponent implements OnInit {
  ngOnInit(): void {
      
  }
  constructor(private router: Router) {}
  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }
}
