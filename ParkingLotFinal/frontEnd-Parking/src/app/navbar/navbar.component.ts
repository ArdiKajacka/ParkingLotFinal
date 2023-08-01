import { Component, EventEmitter, Inject, Output, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ViewportScroller } from '@angular/common';
import { SubscribeService } from '../subscribe.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent {
  // @Output() scrollToPrice = new EventEmitter();

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  goToMain() {
    this.router.navigate(['/main']);
  }

  scrollToPrice($event?:any){
    console.log('$event',$event)
  }

  navigateToComplain(){
    this.router.navigate(['/complain']);

  }

  goToPriceSection() {
    if (isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/main', { outlets: { section: ['price'] } }]);
      this.viewportScroller.scrollToAnchor('priceSection');
    }
  }
}
