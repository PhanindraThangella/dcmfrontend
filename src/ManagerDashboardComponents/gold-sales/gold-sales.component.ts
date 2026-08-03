import { Component, inject, OnInit } from '@angular/core';
import { ManagerServicesService } from '../../services/manager-services.service';
import { CommonModule } from '@angular/common';
export interface GoldDayBookRecord {

  typeOfPayment: string;

  tagNumber?: number;

  totalGrams?: number;

  totalAmount?: number;
}
@Component({
  selector: 'app-gold-sales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gold-sales.component.html',
  styleUrl: './gold-sales.component.css'
})
export class GoldSalesComponent implements OnInit{
  private managerService=inject(ManagerServicesService);
  records:GoldDayBookRecord[]=[];
  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(){
    this.managerService.getGoldDayBook().subscribe({
      next:(response)=>{
        this.records=response.data;
        console.log("Success",response);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
}
