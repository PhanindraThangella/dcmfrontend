import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../modal/modal.component';
import { ManagerServicesService } from '../../services/manager-services.service';
@Component({
  selector: 'app-normal-credits',
  standalone: true,
  imports: [CommonModule, FormsModule,ModalComponent],
  templateUrl: './normal-credits.component.html',
  styleUrl: './normal-credits.component.css'
})
export class NormalCreditsComponent {
  private managerService=inject(ManagerServicesService);
  customerName = '';
  mobileNumber = '';
  creditAmount: number | null = null;
  isModalOpen=false;
  validMessage="";
  iconValue="";
  textColor="";
  save() {
    if(this.customerName.length>0 && this.mobileNumber.length>0  && this.creditAmount!=null)
    {
      const payload = { customerName:this.customerName,
                        mobileNumber:this.mobileNumber,
                        creditAmount:this.creditAmount 
                      };
        this.managerService.createCredit(payload).subscribe({
          next:(response)=>{
            console.log("created credit",response);
            const creditId=response.data.creditId;
            this.managerService.createNormalCredit(creditId).subscribe({
              next:(response)=>{
                console.log(response);
                this.isModalOpen=true;
                this.validMessage="Credit Created Successfully.";
                this.iconValue="bi bi-check-circle text-success";
                this.textColor="success";
              },
              error:(error)=>{
                console.log("credit error",error);
                this.isModalOpen=true;
                const errorObj = JSON.parse(error.error);
                this.validMessage= errorObj.message;
                this.iconValue="bi bi-esclamation-circle-fill text-danger";
                this.textColor="danger";
              }
            })
            
          },
          error:(error)=>{
            console.log("credit error",error);
            this.isModalOpen=true;
            const errorObj = JSON.parse(error.error);
            this.validMessage= errorObj.message;
            this.iconValue="bi bi-esclamation-circle-fill text-danger";
            this.textColor="danger";
          }
        });
    }
  }

  cancel() {
    this.customerName = '';
    this.mobileNumber = '';
    this.creditAmount = null;
  }
}
