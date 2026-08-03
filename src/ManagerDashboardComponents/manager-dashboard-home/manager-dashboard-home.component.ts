import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ManagerDashboardSidebarComponent } from '../manager-dashboard-sidebar/manager-dashboard-sidebar.component';
import { CommonModule } from '@angular/common';
import { PendingSalesRequestsComponent } from '../pending-sales-requests/pending-sales-requests.component';
import { ManagerDashboardHeaderComponent } from '../manager-dashboard-header/manager-dashboard-header.component';
import { PurchaseOldMetalComponent } from '../purchase-old-metal/purchase-old-metal.component';
import { SellPureMetalComponent } from '../sell-pure-metal/sell-pure-metal.component';
import { NormalCreditsComponent } from '../normal-credits/normal-credits.component';
import { DayBookDetailsComponent } from '../day-book-details/day-book-details.component';
import { CreditReportsComponent } from '../credit-reports/credit-reports.component';
import { GoldSalesComponent } from '../gold-sales/gold-sales.component';
import { SilverSalesComponent } from '../silver-sales/silver-sales.component';
import { EmployeeSalaryComponent } from '../employee-salary/employee-salary.component';
export interface GoldTransaction {
  tagNumber:number,
  totalAmount: number;
  ratePerGram: number;
  totalGrams: number;
  itemType:string;
  wastage:number;
  makingCharges:number;
}
@Component({
  selector: 'app-manager-dashboard-home',
  standalone: true,
  imports: [EmployeeSalaryComponent,GoldSalesComponent,SilverSalesComponent,CreditReportsComponent,DayBookDetailsComponent,NormalCreditsComponent,SellPureMetalComponent,PendingSalesRequestsComponent,PurchaseOldMetalComponent,ManagerDashboardSidebarComponent,CommonModule,ManagerDashboardHeaderComponent],
  templateUrl: './manager-dashboard-home.component.html',
  styleUrl: './manager-dashboard-home.component.css'
})
export class ManagerDashboardHomeComponent {
  selectedComponent:string='';
  assignSelectedComponent(option:string){
    this.selectedComponent=option;
    console.log(option);
  }
  enableSidebarOptions(option:string){
    this.selectedComponent=option;
  }
}
