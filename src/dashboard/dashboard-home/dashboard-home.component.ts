import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { StatsCardComponent } from '../stats-card/stats-card.component';
import { SalesChartComponent } from '../sales-chart/sales-chart.component';
import { RecentTransactionsComponent } from '../recent-transactions/recent-transactions.component';
import { GoldsilversalesComponent } from '../goldsilversales/goldsilversales.component';
import { TopPerformingEmpTableComponent } from '../top-performing-emp-table/top-performing-emp-table.component';
import { RegisterEmployeeComponent } from '../../register-employee/register-employee.component';
import { AdminServiceService } from '../../services/admin-service.service';
import { VendorLotCreationComponent } from '../vendor-lot-creation/vendor-lot-creation.component';
import { inject } from '@angular/core';
export interface StatsResponse{
  totalSales:string,
  totalProfits:string,
  totalGoldSold:string,
  totalSilverSold:string,
  totalEmployeesPresent:string,
  totalSalesProgress:string,
  totalProfitsProgress:string,
  totalGoldProgress:string,
  totalSilverProgress:string,
  totalOrders:string
}
@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
  CommonModule,
  SidebarComponent,
  HeaderComponent,
  StatsCardComponent,
  SalesChartComponent,
  RecentTransactionsComponent,
  GoldsilversalesComponent,
  TopPerformingEmpTableComponent,
  RegisterEmployeeComponent,
  VendorLotCreationComponent
  ],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent implements OnInit {
  private adminService=inject(AdminServiceService);
  fetchedStats!:StatsResponse;
  showEmpReg=false;
  showLotComp=false;
  showTodayOverview=false;
  noStatsFlag=false;
  retrivedDate='';
  failureMessage="No Sales Today, Wait for sometime.";
  ngOnInit(): void {
    this.showTodayOverview=true;
    this.fetchDashboardStats(new Date());
  }
  enableSidebarOptions(option:String){
    if(option === "dashboard")
    {
      this.showEmpReg=false;
      this.showTodayOverview=true;
      this.showLotComp=false;
    }
    else if(option === "createlot")
    {
      this.showEmpReg=false;
      this.showTodayOverview=false;
      this.showLotComp=true;
    }
  }
  fetchDashboardStats(date:any)
  {
    console.log("In statsfunction",this.retrivedDate);
    console.log("Instast function pp",date);
    // Convert any input date type (string, timestamp, Date object) safely into a clean YYYY-MM-DD string
    const cleanDateStr = new Intl.DateTimeFormat('fr-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date(date));

    this.adminService.getDashboardStats(cleanDateStr).subscribe({
      next: (response) => {
        this.fetchedStats = response.data;
        this.noStatsFlag = true;
      },
      error: (error) => {
        if(error.error.message === "No Transactions found on that Day.")
        {
          this.noStatsFlag=false;
          const checkToday=new Date();
          const checkRT=new Date(this.retrivedDate);
          checkRT.setHours(23,0,0,0);
          if(checkToday>checkRT)
          {
            this.failureMessage=" No Transactions found for the provided day.";
          }
          else{
            this.failureMessage="No Sales Today, Wait for sometime.";
          }
        }
      }
    });
  }
  enableEmpReg(){
    this.showEmpReg=true;
    this.showTodayOverview=false;
    this.showLotComp=false;
  }
  fetchDateFromHeader(option:any){
    console.log("infetch",option);
    this.retrivedDate=option;
    this.fetchDashboardStats(option);
  }
}
