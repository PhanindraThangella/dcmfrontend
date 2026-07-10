import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { TransactionServiceService } from '../services/transaction-service.service';
import { ModalComponent } from '../modal/modal.component';
export interface GoldTransaction {
  transactionId:any,
  dateTime: string;
  totalAmount: string;
  ratePerGram: string;
  totalGrams: string;
  itemType:string;
}

@Component({
  selector: 'app-employee-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,ModalComponent],
  templateUrl: './employee-home.component.html',
  styleUrl: './employee-home.component.css'
})
export class EmployeeHomeComponent implements OnInit {
  userName: string | null = localStorage.getItem("nickname");
  employeeId=localStorage.getItem("employeeId");
  selectedBill: File | null = null;
  isModalOpen=false;
  validMessage="";
  iconValue="";
  textColor="";
  // Safe initialization for the template to prevent "Cannot read property of undefined" errors
  selectedTransaction: GoldTransaction = {
  transactionId:'',dateTime:'',totalAmount:'',  ratePerGram: '',totalGrams:'',itemType:''};

  updateForm!: FormGroup;
  addTransactionForm!: FormGroup;

  transactions: GoldTransaction[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private cdr: ChangeDetectorRef,
    private transactionServie:TransactionServiceService
  ) {
    this.initForms();
  }

  ngOnInit(): void {
    // FIX: Guarantees the view updates its loops even when arriving asynchronously from a routing/login redirect
    this.cdr.detectChanges();
    this.fetchData();
  }

  private initForms(): void {
    this.updateForm = this.fb.group({
      transactionId:['',[Validators.required]],
      totalGrams: ['', [Validators.required, Validators.min(0.001)]],
      ratePerGram: ['', [Validators.required, Validators.min(1)]],
      makingCharges: ['', [Validators.required, Validators.min(1)]],
      wastage: ['', [Validators.required, Validators.min(0.001)]],
      tagNumber: ['', [Validators.required,Validators.pattern(/^[0-9]{3,10}$/)]],
    });

    this.addTransactionForm = this.fb.group({
      employeeId:[this.employeeId,[Validators.required]],
      totalGrams: ['', [Validators.required, Validators.min(0.001)]],
      ratePerGram: ['', [Validators.required, Validators.min(1)]],
      makingCharges: ['',[Validators.required, Validators.min(1)]],
      wastage: ['',[Validators.required, Validators.min(1)]],
      tagNumber: ['', Validators.required]
    });
  }

  fetchData():void{
    this.transactionServie.getAllTransaction().subscribe({
      next:(response)=>{
        this.transactions=response.data;
        this.transactions.sort((a, b) => {
          return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
        });
      },
      error:(error)=>{
        console.log("error",error);
      }
    })
  }
  openEditModal(item: GoldTransaction): void {
    this.selectedTransaction = item;
    this.updateForm.patchValue({
      transactionId:item.transactionId,
      totalGrams: item.totalGrams,
      ratePerGram: item.ratePerGram
    });
  }

  updateTransaction(): void {
    this.transactionServie.updateTransaction(this.updateForm.value).subscribe({
      next:()=>{
        this.fetchData();
        this.isModalOpen=true;
        this.validMessage="Transaction Updated Successfully!.";
        this.iconValue="bi bi-check-circle text-success";
        this.textColor="success";
      },
      error:()=>{
        this.isModalOpen=true;
        this.validMessage="Error Occured";
        this.iconValue="bi bi-exclamation-circle text-danger";
        this.textColor="danger";
      }
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedBill = input.files[0];
    }
  }

  saveTransaction(): void {
    this.transactionServie.registerTransaction(this.addTransactionForm.value).subscribe({
        next:(response)=>{
          console.log("success response",response);
          if(response.success === false)
          {
            this.isModalOpen=true;
            this.validMessage="Duplicate transactions!.";
            this.iconValue="bi bi-exclamation-triangle text-danger";
            this.textColor="danger";
          }
          if(response.success === true)
          {
            this.isModalOpen=true;
            this.validMessage="Transaction Added Successfully!.";
            this.iconValue="bi bi-check-circle text-success";
            this.textColor="success";
          }
          this.fetchData();
        },
        error:()=>{
          this.isModalOpen=true;
          this.validMessage="Error Occured";
          this.iconValue="bi bi-exclamation-circle text-danger";
          this.textColor="danger";
        } 
      });
    }
    getLogout(): void {
    this.authService.logout();
  }
}