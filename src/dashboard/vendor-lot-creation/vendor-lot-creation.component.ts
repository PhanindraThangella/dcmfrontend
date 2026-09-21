import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminServiceService } from '../../services/admin-service.service';
import { ModalComponent } from '../../modal/modal.component';
@Component({
  selector: 'app-vendor-lot-creation',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,ModalComponent],
  templateUrl: './vendor-lot-creation.component.html',
  styleUrl: './vendor-lot-creation.component.css'
})
export class VendorLotCreationComponent {
  lotForm: FormGroup;
  private adminService=inject(AdminServiceService);
  isModalOpen=false;
  validMessage="";
  iconValue="";
  textColor="";
  metalTypes = [
    'Gold',
    'Silver'
  ];
  productNames=[
    'Others'
  ];
  goldProductNames=[
    'Baby Rings',
    'Small Chains',
    'Medium Chains',
    'Big Chains',
    'Tadu',
    'Matilu',
    'Anji Rings',    
  ]
  silverProductNames=[
    'Aavu Duda',
    'Small Chains',
    'Medium Chains',
    'Big Chains',
    'Plates',
    'Knachalu',
    'Spoons',
    'Glasses'    
  ]
  constructor(private fb: FormBuilder) {

    this.lotForm = this.fb.group({

      vendorName: ['', Validators.required],
      metalType: ['', Validators.required],
      productName: ['', Validators.required],
      peices: ['', Validators.required],
      grossWeight: ['', Validators.required],
      netWeight: ['', Validators.required],
      fine: ['', Validators.required],
      stoneAmount: ['', Validators.required],
      timeForPayment: ['', Validators.required]

    });
    this.changeProductNames();

  }
  changeProductNames(){
    this.lotForm.get('metalType')?.valueChanges.subscribe(() => {
      if(this.lotForm.get('metalType')?.value=='Gold')
        this.productNames=this.goldProductNames;
      else if(this.lotForm.get('metalType')?.value=='Silver')
        this.productNames=this.silverProductNames;
    });
  }
  get f() {
    return this.lotForm.controls;
  }

  createLot() {

    if (this.lotForm.invalid) {
      this.lotForm.markAllAsTouched();
      return;
    }
    this.adminService.createLot(this.lotForm.value).subscribe({
      next:(response)=>{
        console.log("Success Response:",response);
        this.isModalOpen=true;
        this.validMessage=response.message;
        this.iconValue="bi bi-check-circle text-success";
        this.textColor="success";
      },
      error:(error)=>{
        console.log("Error ",error);
        this.isModalOpen=true;
        this.validMessage= error.error.message;
        this.iconValue="bi bi-esclamation-circle-fill text-danger";
        this.textColor="danger";
      }
    })
    this.cancel();
  }

  cancel() {
    this.lotForm.reset();
  }

}
