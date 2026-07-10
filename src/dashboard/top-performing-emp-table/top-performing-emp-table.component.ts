import { Component,inject, OnInit,Input,SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminServiceService } from '../../services/admin-service.service';
interface Employee {
  rank: number;
  employeeName: string;
  sales: string;
  bills: string;
}
@Component({
  selector: 'app-top-performing-emp-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-performing-emp-table.component.html',
  styleUrl: './top-performing-emp-table.component.css'
})
export class TopPerformingEmpTableComponent implements OnInit{
  private adminService=inject(AdminServiceService);
  @Input()
  date='';
  public employees: Employee[] = [];
  ngOnInit(): void {
    this.fetchData();
    console.log(this.date,"Date");
  }
  ngOnChanges(changes:SimpleChanges):void{
    if (changes['date'] && changes['date'].currentValue) {
      // Re-run the API call with the fresh date string instantly
      this.fetchData();
    }
  }
  fetchData()
  {
    const parsedDate = new Date(this.date);
    const isValid = this.date && !isNaN(parsedDate.getTime());
    const finalDate = isValid ? parsedDate : new Date();
    const cleanDateStr = new Intl.DateTimeFormat('fr-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(finalDate);
    this.adminService.getTopPerformingEmployees(cleanDateStr).subscribe({
      next:(response)=>{
        console.log(response);
        this.employees=response.data;
      },
      error:(error)=>{
        console.log("Error message:",error);
      }
    })
  }
}
