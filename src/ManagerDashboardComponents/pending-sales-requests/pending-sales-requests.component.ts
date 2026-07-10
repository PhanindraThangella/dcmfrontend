import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ManagerServicesService } from '../../services/manager-services.service';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { CommonModule } from '@angular/common';
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
  selector: 'app-pending-sales-requests',
  standalone: true,
  imports: [PaymentModalComponent,CommonModule],
  templateUrl: './pending-sales-requests.component.html',
  styleUrl: './pending-sales-requests.component.css'
})
export class PendingSalesRequestsComponent {
  transactions:GoldTransaction[]=[];
  private managerService=inject(ManagerServicesService);
  flag=false;
  selectedTagNumber:number=0;
  selectedTotalGrams:number=0;
  selectedTotalAmount:number=0;
  selectedItemType:string='';
  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(){
    this.managerService.getPendingTransations().subscribe({
      next:(response)=>{
        console.log(response);
        this.transactions=response.data;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
  openVerifyModal(item:GoldTransaction){
    this.flag=true;
    this.selectedItemType=item.itemType;
    this.selectedTagNumber=item.tagNumber;
    this.selectedTotalAmount=item.totalAmount;
    this.selectedTotalGrams=item.totalGrams;
  }
  setModalFlag(option:any){
    this.flag=option;
    this.fetchData();
  }
  removeSelectedTransaction(item:GoldTransaction){
    this.managerService.removeTransaction(item.tagNumber).subscribe({
      next:(response)=>{
        console.log("Response success",response);
        this.fetchData();
      },
      error:(error)=>{
        console.log("Error response: ",error);
      }
    })
  }
}
