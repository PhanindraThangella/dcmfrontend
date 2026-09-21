import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
// import { EmpLoginService } from '../services/emp-login.service';
import { AuthServiceService } from '../services/auth-service.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  role:any;
  errorMessage:any;
  private router=inject(Router);
  constructor(private fb: FormBuilder,private authService:AuthServiceService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required,Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )]]
    });
  }

  login(): void {
    this.authService.login(this.loginForm.value).subscribe({
      next:(response)=>{
         this.role=response.data.role;
          if( this.role== "EMPLOYEE")
          {
            this.router.navigate(["employee"]);
          }
          else if( this.role=="ADMIN")
          {
            this.router.navigate(["admin"]);
          }
          else if( this.role=="MANAGER")
          {
            this.router.navigate(["manager"]);
          }
          else if( this.role=="TAGGENERATOR")
          {
            this.router.navigate(["tagGenerator"]);
          }
      },
      error:(error)=>{
        this.errorMessage=error.error.message;
      }
    })
  }
}
