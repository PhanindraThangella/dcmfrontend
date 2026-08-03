import { Component, inject, OnInit } from '@angular/core';
import { ManagerServicesService } from '../../services/manager-services.service';
import { PurseRefreshService } from '../../services/purse-refresh.service';
import { ModalComponent } from '../../modal/modal.component';
import { CommonModule } from '@angular/common';
import { EmpRegisterServiceService } from '../../services/emp-register-service.service';
import { FormsModule } from '@angular/forms';
import { CommaNumberDirective } from '../../directives/comma-number.directive';

@Component({
  selector: 'app-employee-salary',
  standalone: true,
  imports: [ModalComponent,CommonModule,FormsModule,CommaNumberDirective],
  templateUrl: './employee-salary.component.html',
  styleUrl: './employee-salary.component.css'
})
export class EmployeeSalaryComponent implements OnInit{
  private managerService=inject(ManagerServicesService);
  private purseService=inject(PurseRefreshService);
  private employeeService=inject(EmpRegisterServiceService);
  employeeName='';
  amount: number | null = null;
  Employees=[];
  isModalOpen=false;
  validMessage="";
  iconValue="";
  textColor="";
  ngOnInit(): void {
    this.fetchNames();
  }
  fetchNames(){
    this.employeeService.getEmployeeNames().subscribe({
      next:(response)=>{
        this.Employees=response.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  save(){
    console.log(this.employeeName,this.amount);
    const payload={
      employeeName:this.employeeName,
      amount:this.amount
    }
    this.managerService.addEmployeeSalary(payload).subscribe({
      next:(response)=>{
        console.log("success",response);
        this.isModalOpen=true;
        this.validMessage="Payment Added Successfully.";
        this.iconValue="bi bi-check-circle text-success";
        this.textColor="success";
        this.purseService.triggerPurseRefresh();
      },
      error:(error)=>{
        console.log("error",error);   
        this.isModalOpen=true;
        this.validMessage= error.error.message;
        this.iconValue="bi bi-esclamation-circle-fill text-danger";
        this.textColor="danger";     
      }
    })
    this.clearContent();
  }
  clearContent(){
    this.amount=0;
    this.employeeName='';
  }
}
