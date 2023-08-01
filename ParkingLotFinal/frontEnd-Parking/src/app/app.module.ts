import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Make sure to include this import
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { PriceSectionComponent } from './price-section/price-section.component';
import { SubscribeSectionComponent } from './subscribe-section/subscribe-section.component';
import { DataService } from './data.service';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { ComplainComponent } from './complain/complain.component';
import { MainComponent } from './main/main.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { TableComponent } from './table/table.component';
import { AdminComponent } from './admin/admin.component';
import { LogtableComponent } from './logtable/logtable.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { PricingPlanComponent } from './pricingplan/pricingplan.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    AppComponent,
    PriceSectionComponent,
    NavbarComponent,
    HeroSectionComponent,
    SubscribeSectionComponent,
    SubscribeComponent,
    ComplainComponent,
    MainComponent,
    ComplaintsComponent,
    TableComponent,
    AdminComponent,
    LogtableComponent,
    PricingPlanComponent,
    SubscribersComponent,
    SubscriptionsComponent,
  ],
  // exports:[AppRoutingModule],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {
  
}
