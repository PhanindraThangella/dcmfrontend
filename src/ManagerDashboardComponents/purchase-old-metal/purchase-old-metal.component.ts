import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManagerServicesService } from '../../services/manager-services.service';
import { ModalComponent } from '../../modal/modal.component';
@Component({
  selector: 'app-purchase-old-metal',
  standalone: true,
  imports: [CommonModule,FormsModule,ModalComponent],
  templateUrl: './purchase-old-metal.component.html',
  styleUrl: './purchase-old-metal.component.css'
})
export class PurchaseOldMetalComponent {
  private managerService=inject(ManagerServicesService);
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
        },
        error:(error)=>{
          console.log("error",error);   
          this.isModalOpen=true;
          const errorObj = JSON.parse(error.error);
          this.validMessage= errorObj.message;
          this.iconValue="bi bi-esclamation-circle-fill text-danger";
          this.textColor="danger";     
        }
      });
    }
  }
  clearContent(){
    this.weight=null;
    this.amount=null;
  }
}
