import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ManagerServicesService } from '../../services/manager-services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../modal/modal.component';
import { PurseRefreshService } from '../../services/purse-refresh.service';
import { CommaNumberDirective } from '../../directives/comma-number.directive';
export interface credits {
  id:number;
  customerName: string;
  contactNumber:number;
  totalAmount:number;
}
@Component({
  selector: 'app-credit-reports',
  standalone: true,
  imports: [CommonModule,FormsModule,ModalComponent,CommaNumberDirective],
  templateUrl: './credit-reports.component.html',
  styleUrl: './credit-reports.component.css'
})
export class CreditReportsComponent implements OnInit{
  private managerService=inject(ManagerServicesService);
  private purseService=inject(PurseRefreshService);
  private cdr=inject(ChangeDetectorRef);
  creditReports:credits[]=[];
  currentPage = 0; // Match Spring 0-indexed count
  pageSize = 10;
  totalPages = 0;
  isFirst = true;
  isLast = false;
  settleCredit=false;
  selectedId:number=0;
  isVisible=false;
  settledAmount:number=0;
  isModalOpen=false;
  validMessage="";
  iconValue="";
  textColor="";
  contactNumber=0;
  customerName='';
  ngOnInit(): void {
    this.loadPage(this.currentPage);
    this.cdr.detectChanges();
  }
  removeCredit(creditId: number): void {
    const index = this.creditReports.findIndex(credit => credit.id === creditId);
    
    if (index !== -1) {
      this.creditReports.splice(index, 1);
    }
  }
  loadPage(page: number): void {
    this.managerService.getCreditReports(page, this.pageSize).subscribe({
      next: (response) => {
        console.log(response);
        this.creditReports = [...response.data.data];
        this.currentPage = response.data.currentPage;
        this.totalPages = response.data.totalPages;
        this.isFirst = response.data.isFirst;
        this.isLast = response.data.isLast;
      },
      error: (err) => console.log('Error fetching items', err)
    });
  }

  onPageChange(direction: number): void {
    const nextTargetPage = this.currentPage + direction;
    if (nextTargetPage >= 0 && nextTargetPage < this.totalPages) {
      this.loadPage(nextTargetPage);
    }
  }
  settleCurrentCredit(credit:credits)
  {
    this.isVisible=true;
    this.selectedId=credit.id;
  }
  closeModal(){
    this.isVisible=false;
    this.settledAmount=0;
  }
  settle()
  {
    this.managerService.settleCredit(this.selectedId,this.settledAmount,this.settleCredit).subscribe({
      next:(response)=>{
            this.isModalOpen=true;
            this.validMessage=response.message;
            this.iconValue="bi bi-check-circle text-success";
            this.textColor="success";
            this.purseService.triggerPurseRefresh();
          },
          error:(error)=>{
            console.log("Error response:",error);
            this.isModalOpen=true;
            const errorObj = JSON.parse(error.error);
            this.validMessage= errorObj.message;
            this.iconValue="bi bi-esclamation-circle-fill text-danger";
            this.textColor="danger"; 
          }
    });
    this.isVisible=false;
    this.loadPage(this.currentPage);
    this.settledAmount=0;
    this.removeCredit(this.selectedId);
  }
  findByContactNumber(){
    if(this.contactNumber.toString().length<10)
    {
      alert("Enter valid Mobile Number");
    }
    else{
      this.managerService.getCreditDetailsByContactNumber(this.contactNumber).subscribe({
        next:(response)=>{
          this.creditReports=response.data;
          console.log(response);
        },
        error:(err)=>{
          console.log("Error response:",err);
          this.isModalOpen=true;
          this.validMessage= err.error.message;
          this.iconValue="bi bi-esclamation-circle-fill text-danger";
          this.textColor="danger"; 
        }
      });
    }
    this.contactNumber=0;
  }
  findByCustomerName(){
    if(this.customerName.length==0)
      alert("Enter valid Customer Name");
    else{
      this.managerService.getCreditDetailsByCustomerName(this.customerName).subscribe({
        next:(response)=>{
          this.creditReports=response.data;
          console.log(response);
        },
        error:(err)=>{
          console.log("Error response:",err);
          this.isModalOpen=true;
          this.validMessage= err.error.message;
          this.iconValue="bi bi-esclamation-circle-fill text-danger";
          this.textColor="danger"; 
        }
      });
    }
    this.customerName='';
  }
}
