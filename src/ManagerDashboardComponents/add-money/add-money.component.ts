import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrentPurseService } from '../../services/current-purse.service';
import { CommaNumberDirective } from '../../directives/comma-number.directive';
import { PurseRefreshService } from '../../services/purse-refresh.service';

interface PurseHistory {
  time: string;
  amountAdded: number;
  currentPurse: number;
}

@Component({
  selector: 'app-add-money',
  standalone: true,
  imports: [CommonModule, FormsModule,CommaNumberDirective],
  templateUrl: './add-money.component.html',
  styleUrl: './add-money.component.css'
})
export class AddMoneyComponent implements OnInit{
  @Input() show = false;

  @Output() close = new EventEmitter<void>();

  loading = false;
  amount = 0;
  private purseService=inject(CurrentPurseService);
  private purseRefresh=inject(PurseRefreshService);
  purseHistory: PurseHistory[] = [];
  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(){
    this.purseService.getRecentPurseDetails().subscribe({
      next:(response)=>{
        this.purseHistory=response.data;
      },
      error:(error)=>{
        console.log("error",error);
      }
    });
  }
  addMoney() {

    if (!this.amount) return;
    this.purseService.addMoney(this.amount).subscribe({
      next:(response)=>{
        console.log("Success ",response);
        this.fetchData();
        this.purseRefresh.triggerPurseRefresh();
      },
      error:(error)=>{
        console.log("error",error);
      }
    })

    this.amount = 0;

  }
  closeModal(): void {

    this.amount = 0;

    this.close.emit();

  }
}
