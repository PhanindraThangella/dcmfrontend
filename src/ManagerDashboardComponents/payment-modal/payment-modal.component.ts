import { Component, EventEmitter, Input, Output,SimpleChanges,inject } from '@angular/core';
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
import { PurseRefreshService } from '../../services/purse-refresh.service';
import { OrdersRefreshServiceService } from '../../services/orders-refresh-service.service';
@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [CommonModule,CurrencyPipe,ReactiveFormsModule,CommaNumberDirective,ModalComponent],
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.css'
})
export class PaymentModalComponent {
  private http=inject(ManagerServicesService);
  private purseService=inject(PurseRefreshService);
  private OrdersRefreshService=inject(OrdersRefreshServiceService);
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
    oldSilverWeight: [
      '',
      [Validators.min(0.001)]
    ],

    oldSilverAmount: [
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
      this.toNumber(form.oldSilverAmount)+
      this.toNumber(form.creditAmount);

    return calculatedTotal === this.totalAmount;
  }
  save() {
    console.log(this.paymentForm.value);
    if(this.isPaymentValid())
    {
      console.log(this.paymentForm.value);
      this.processNewTransaction();
    }
    else{
      const form = this.paymentForm.value;
      const calculatedTotal =
      this.toNumber(form.cash) +
      this.toNumber(form.upi) +
      this.toNumber(form.oldGoldAmount) +
      this.toNumber(form.oldSilverAmount)+
      this.toNumber(form.creditAmount);
      this.isAmountModalOpen=true;
      this.validAmountMessage=`Old Amount: ${this.totalAmount} and new Amount: ${calculatedTotal}`;
    }
    this.paymentForm.reset();
  }
  processNewTransaction(): void {

    // Take a snapshot of the form values BEFORE any asynchronous API call.
    const formValue = this.paymentForm.getRawValue();

    const requiredCredit = formValue.requiredCredit === true;

    if (requiredCredit) {
      this.createCreditAndProcessPayment(formValue);
    } else {
      this.addPayment(0, formValue);
    }
  }


  /**
   * Creates credit first and then processes the payment.
   */
  private createCreditAndProcessPayment(formValue: any): void {

    const creditPayload = {
      customerName: formValue.customerName,
      mobileNumber: formValue.mobileNumber,
      creditAmount: formValue.creditAmount
    };

    this.http.createCredit(creditPayload).subscribe({

      next: (response) => {

        console.log('Credit created:', response);

        const creditId = response.data.creditId;

        this.addPayment(creditId, formValue);
      },

      error: (error) => {
        this.handleError(error);
      }
    });
  }


  /**
   * Creates the payment and then updates the transaction status.
   */
  private addPayment(creditId: number, formValue: any): void {

    const paymentPayload = this.buildPaymentPayload(
      creditId,
      formValue
    );

    console.log('Payment payload:', paymentPayload);

    this.http.addNewPayment(paymentPayload).subscribe({

      next: (response) => {

        console.log('Payment added:', response);

        this.updateTransactionStatus();
        this.closeModal();
      },

      error: (error) => {
        this.handleError(error);
      }
    });
  }


  /**
   * Builds the payment payload.
   */
  private buildPaymentPayload(
    creditId: number,
    formValue: any
  ): any {

    const {
      cash,
      upi,
      oldGoldAmount,
      oldGoldWeight,
      oldSilverWeight,
      oldSilverAmount
    } = formValue;

    return {
      tagNumber: this.tagNumber,

      totalCash: cash || 0,

      totalUpi: upi || 0,

      ogGrams:
        oldGoldWeight > 0
          ? oldGoldWeight
          : oldSilverWeight || 0,

      ogAmount:
        oldGoldAmount > 0
          ? oldGoldAmount
          : oldSilverAmount || 0,

      creditId: creditId,

      itemType: this.itemType
    };
  }


  /**
   * Updates the transaction status after payment is successfully added.
   */
  private updateTransactionStatus(): void {

    this.http
      .updateTransactionStatus(
        this.tagNumber,
        this.totalAmount
      )
      .subscribe({

        next: (response) => {

          console.log('Transaction status updated:', response);

          this.showSuccessMessage();

          setTimeout(() => {
            this.OrdersRefreshService.triggerOrdersREfresh();
          }, 1000);
        },

        error: (error) => {
          this.handleError(error);
        }
      });
  }


  /**
   * Displays success message.
   */
  private showSuccessMessage(): void {

    this.isModalOpen = true;

    this.validMessage = 'Payment Added Successfully.';

    this.iconValue = 'bi bi-check-circle text-success';

    this.textColor = 'success';

    this.purseService.triggerPurseRefresh();
  }


  /**
   * Common error handling.
   */
  private handleError(error: any): void {

    console.error('Transaction error:', error);

    this.isModalOpen = true;

    this.validMessage =
      error?.error?.message ||
      'Something went wrong. Please try again.';

    this.iconValue =
      'bi bi-exclamation-circle-fill text-danger';

    this.textColor = 'danger';
  }
}
