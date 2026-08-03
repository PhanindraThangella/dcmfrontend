import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManagerServicesService } from '../../services/manager-services.service';
import { ModalComponent } from '../../modal/modal.component';
import { PurseRefreshService } from '../../services/purse-refresh.service';
import { CommaNumberDirective } from '../../directives/comma-number.directive';
@Component({
  selector: 'app-purchase-old-metal',
  standalone: true,
  imports: [CommonModule,FormsModule,ModalComponent,CommaNumberDirective],
  templateUrl: './purchase-old-metal.component.html',
  styleUrl: './purchase-old-metal.component.css'
})
export class PurchaseOldMetalComponent {
  private managerService=inject(ManagerServicesService);
  private purseService=inject(PurseRefreshService);
  selectedMetal = '';
  weight: number | null = null;
  amount: number | null = null;
  isModalOpen=false;
  validMessage="";
  iconValue="";
  textColor="";
  save(){
    if(this.selectedMetal !="GOLD" && this.selectedMetal !="SILVER")
    {
      alert("choose GOLD or SILVER");
    }
    else{
      const payload={
        selectedMetal:this.selectedMetal,
        weight:this.weight,
        amount:this.amount,
      };
      this.managerService.addPOMPayment(payload).subscribe({
        next:(response)=>{
          console.log("success",response);
          this.isModalOpen=true;
          this.validMessage="Payment Added Successfully.";
          this.iconValue="bi bi-check-circle text-success";
          this.textColor="success";
          this.purseService.triggerPurseRefresh();
        },
        error:(error)=>{
          console.log("error",error);   
          this.isModalOpen=true;
          this.validMessage= error.error.message;
          this.iconValue="bi bi-esclamation-circle-fill text-danger";
          this.textColor="danger";     
        }
      });
      this.clearContent();
    }
  }
  clearContent(){
    this.weight=null;
    this.amount=null;
    this.selectedMetal='';
  }
}
