import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TagRelatedServiceService } from '../services/tag-related-service.service';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-tag-generator',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,ModalComponent],
  templateUrl: './tag-generator.component.html',
  styleUrl: './tag-generator.component.css'
})
export class TagGeneratorComponent implements OnInit {
  tagForm!: FormGroup;

  metalTypes = [
    'Gold',
    'Silver'
  ];
  isModalOpen=false;
  validMessage="";
  iconValue="";
  textColor="";
  private tagService=inject(TagRelatedServiceService);
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    this.tagForm = this.fb.group({

      lotNo: ['', Validators.required],

      metalType: ['', Validators.required],

      productName: ['', Validators.required],

      peices: ['', Validators.required],

      grossWeight: ['', Validators.required],

      lessWeight: ['', Validators.required],

      netWeight: ['', Validators.required],

      stonePresent: [false],

      stoneWeight: [''],

      stoneAmount: ['']

    });

    this.calculateNetWeight();

    this.toggleStoneValidators();

  }

  calculateNetWeight() {

    this.tagForm.get('grossWeight')?.valueChanges.subscribe(() => {
      this.updateNetWeight();
    });

    this.tagForm.get('lessWeight')?.valueChanges.subscribe(() => {
      this.updateNetWeight();
    });

  }

  updateNetWeight() {

    const gross =
      Number(this.tagForm.get('grossWeight')?.value) || 0;

    const less =
      Number(this.tagForm.get('lessWeight')?.value) || 0;

    this.tagForm
      .get('netWeight')
      ?.setValue(gross - less, { emitEvent: false });

  }

  toggleStoneValidators() {

    this.tagForm.get('stonePresent')?.valueChanges.subscribe(value => {

      const weight = this.tagForm.get('stoneWeight');
      const amount = this.tagForm.get('stoneAmount');

      if (value) {

        weight?.setValidators([Validators.required]);

        amount?.setValidators([Validators.required]);

      } else {

        weight?.clearValidators();

        amount?.clearValidators();

        weight?.setValue('');

        amount?.setValue('');

      }

      weight?.updateValueAndValidity();

      amount?.updateValueAndValidity();

    });

  }

  get f() {
    return this.tagForm.controls;
  }

  generate() {

    console.log(this.tagForm.value);
    if (this.tagForm.invalid) {

      this.tagForm.markAllAsTouched();

      return;

    }
    this.tagService.createTag(this.tagForm.value).subscribe({
      next:(response)=>{
        console.log(response);
        this.isModalOpen=true;
        this.validMessage=response.message;
        this.iconValue="bi bi-check-circle text-success";
         this.textColor="success";
      },
      error:(error)=>{
        console.log(error);
        this.isModalOpen=true;
        const errorObj = JSON.parse(error.error);
        this.validMessage= errorObj.message;
        this.iconValue="bi bi-esclamation-circle-fill text-danger";
        this.textColor="danger";
      }
    })

  }

}
