import { Component, EventEmitter, Input, Output,inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommaNumberDirective } from '../../directives/comma-number.directive';
import { ManagerServicesService } from '../../services/manager-services.service';
import { ModalComponent } from '../../modal/modal.component';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [CommonModule,CurrencyPipe,ReactiveFormsModule,CommaNumberDirective,ModalComponent],
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.css'
})
export class PaymentModalComponent {
  private http=inject(ManagerServicesService);
  constructor(private fb:FormBuilder){}
  @Input()
  showPaymentModal:boolean = false;
  @Output()
  flagEmitter=new EventEmitter<boolean>();
  @Input()
  tagNumber:number=0;
  @Input()
  totalGrams:number =0;
  @Input()
  totalAmount:number =0;
  @Input()
  itemType:string ='';
  paymentForm!: FormGroup;
  isModalOpen=false;
  validMessage="";
  iconValue="";
  textColor="";
  isAmountModalOpen=false;
  validAmountMessage='';
  ngOnInit(): void {

  this.paymentForm = this.fb.group({

    cash: [''],

    upi: [''],

    oldGoldWeight: [
      '',
      [Validators.min(0.001)]
    ],

    oldGoldAmount: [
      '',
      [Validators.min(0)]
    ],

    requiredCredit: [false],

    customerName: [''],

    mobileNumber: [''],

    creditAmount: ['']

  });

  this.paymentForm
    .get('requiredCredit')
    ?.valueChanges.subscribe((checked) => {

      const customerName = this.paymentForm.get('customerName');
      const mobileNumber = this.paymentForm.get('mobileNumber');
      const creditAmount = this.paymentForm.get('creditAmount');

      if (checked) {

        customerName?.setValidators([
          Validators.required
        ]);

        mobileNumber?.setValidators([
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/)
        ]);

        creditAmount?.setValidators([
          Validators.required,
          Validators.min(1)
        ]);

      } else {

        customerName?.clearValidators();
        mobileNumber?.clearValidators();
        creditAmount?.clearValidators();

        customerName?.reset();
        mobileNumber?.reset();
        creditAmount?.reset();

      }

      customerName?.updateValueAndValidity();
      mobileNumber?.updateValueAndValidity();
      creditAmount?.updateValueAndValidity();

    });

}
  closeModal() {
    this.showPaymentModal = false;
    this.flagEmitter.emit(false);
  }
  closeAmountModal(){
    this.isAmountModalOpen=false;
  }
  toNumber(value: any): number {
    const parsed = Number(value);
    return isNaN(parsed) ? 0 : parsed;
  }

  isPaymentValid(): boolean {

    const form = this.paymentForm.value;

    const calculatedTotal =
      this.toNumber(form.cash) +
      this.toNumber(form.upi) +
      this.toNumber(form.oldGoldAmount) +
      this.toNumber(form.creditAmount);

    return calculatedTotal === this.totalAmount;
  }
  save() {
    if(this.isPaymentValid())
    {
      this.processNewTransaction();
    }
    else{
      const form = this.paymentForm.value;
      const calculatedTotal =
      this.toNumber(form.cash) +
      this.toNumber(form.upi) +
      this.toNumber(form.oldGoldAmount) +
      this.toNumber(form.creditAmount);
      this.isAmountModalOpen=true;
      this.validAmountMessage=`Old Amount: ${this.totalAmount} and new Amount: ${calculatedTotal}`;
    }
  }
  processNewTransaction(){
    this.http.updateTransactionStatus(this.tagNumber,this.totalAmount).subscribe({
        next:(response)=>{
          console.log(response);
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
      const triggerPayment=(finalCreditId:number)=>
      {
        const {cash,upi,oldGoldAmount,oldGoldWeight}=this.paymentForm.value;
        const payload = {
          tagNumber: this.tagNumber,
          totalCash: cash || 0,
          totalUpi: upi || 0,
          ogGrams: oldGoldWeight || 0,
          ogAmount: oldGoldAmount || 0,
          creditId: finalCreditId
        };
        this.http.addNewPayment(payload).subscribe({
          next:(response)=>{
            console.log("Payment added:",response);
            this.isModalOpen=true;
            this.validMessage="Payment Added Successfully.";
            this.iconValue="bi bi-check-circle text-success";
            this.textColor="success";
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
      };
      if(this.paymentForm.get('requiredCredit')?.value === true)
      {
        const { customerName, mobileNumber, creditAmount } = this.paymentForm.value;
        const payload = { customerName, mobileNumber, creditAmount };
        this.http.createCredit(payload).subscribe({
          next:(response)=>{
            const creditId=response.data.creditId;
            triggerPayment(creditId);
            console.log("created credit",response);
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
      else{
        triggerPayment(0);
      }
      this.closeModal();
  }
}
