import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManagerServicesService } from '../../services/manager-services.service';
import { ModalComponent } from '../../modal/modal.component';
@Component({
  selector: 'app-sell-pure-metal',
  standalone: true,
  imports: [CommonModule,FormsModule,ModalComponent],
  templateUrl: './sell-pure-metal.component.html',
  styleUrl: './sell-pure-metal.component.css'
})
export class SellPureMetalComponent {
  selectedMetal = '';
  private managerService=inject(ManagerServicesService);
  weight: number | null = null;
  amount: number | null = null;
  isModalOpen=false;
  validMessage="";
  iconValue="";
  textColor="";
  clearContent(){
    this.weight=null;
    this.amount=null;
  }
  save(){
    if(this.selectedMetal !="PUREGOLD" && this.selectedMetal !="PURESILVER")
    {
      alert("choose PURE GOLD or PURE SILVER");
    }
    else{
      const payload={
        selectedMetal:this.selectedMetal,
        weight:this.weight,
        amount:this.amount,
      };
      this.managerService.addSPMPayment(payload).subscribe({
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
}
