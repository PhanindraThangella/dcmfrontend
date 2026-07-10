import { Component, OnInit ,inject,Input, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminServiceService } from '../../services/admin-service.service';
interface Transaction {
  dateTime: string;
  employeeName: string;
  totalSaleAmount: string;
  totalGrams:string;
  totalProfit:string;
  itemType: 'GOLD' | 'SILVER';
}
@Component({
  selector: 'app-recent-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-transactions.component.html',
  styleUrl: './recent-transactions.component.css'
})
export class RecentTransactionsComponent implements OnInit {
  private adminService=inject(AdminServiceService);
  @Input()
  date:string='';
  public transactions: Transaction[] = [];
  ngOnInit()
  {
    this.fetchData();
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
    this.adminService.getRecentTransactions(cleanDateStr).subscribe({
      next:(response)=>{
        console.log(response);
        this.transactions=response.data;
      },
      error:(error)=>{
        console.log("Error message:",error);
      }
    })
  }
}
