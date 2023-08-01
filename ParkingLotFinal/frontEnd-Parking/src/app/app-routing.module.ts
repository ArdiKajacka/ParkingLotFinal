import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ComplainComponent } from './complain/complain.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { PriceSectionComponent } from './price-section/price-section.component';
import { SubscribeSectionComponent } from './subscribe-section/subscribe-section.component';
import { MainComponent } from './main/main.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { TableComponent } from './table/table.component';


const routes: Routes =[
  { path: 'home', component: MainComponent },
  { path: 'complain', component: ComplainComponent },
  { path: 'subscribe', component: SubscribeComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: 'home' },
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
