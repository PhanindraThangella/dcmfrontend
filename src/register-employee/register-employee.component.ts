import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { passwordMatchValidator } from './passwordvalidator';
import { EmpRegisterServiceService } from '../services/emp-register-service.service';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-register-employee',
  standalone: true,
  imports: [ReactiveFormsModule,ModalComponent],
  templateUrl: './register-employee.component.html',
  styleUrl: './register-employee.component.css'
})
export class RegisterEmployeeComponent implements OnInit  {
  registrationForm!:FormGroup;
  isModalOpen=false;
  validMessage="";
  iconValue="";
  textColor="";
  constructor(private fb:FormBuilder,private empRegisterServiceService:EmpRegisterServiceService){

  }
  ngOnInit(): void {
    this.registrationForm=this.fb.group({
      employeeName:[,[Validators.required,Validators.pattern(/^[a-zA-Z ]{3,30}$/)]],
      employeeDOB:[,[Validators.required]],
      nickname:[,[Validators.required,Validators.pattern(/^[a-zA-Z0-9]{3,10}$/)]],
      employeePhoneNumber:[,[Validators.required,Validators.pattern(/^[0-9]{10}$/)]],
      employeeEmail:[,Validators.email],
      employeeAddress:[,[Validators.required]],
      password:[,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      employeeConformPassword:[,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    },{
      validators:passwordMatchValidator
    });
  }
  getRegister():void{
    this.empRegisterServiceService.sendFormData(this.registrationForm.value).subscribe({
      next: (response) => {
        console.log('Server response success:', response);
        this.isModalOpen=true;
        this.validMessage="Registration Success";
        this.iconValue="bi bi-check-circle text-success";
         this.textColor="success";
      },
      error: (error) => {
        console.error('Upload failed:', error);
        this.isModalOpen=true;
        const errorObj = JSON.parse(error.error);
        this.validMessage= errorObj.message;
        this.iconValue="bi bi-esclamation-circle-fill text-danger";
        this.textColor="danger";
      }
    });
  }
}
