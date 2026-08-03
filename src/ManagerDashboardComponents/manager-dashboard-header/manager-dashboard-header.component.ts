import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AddMoneyComponent } from '../add-money/add-money.component';
import { CurrentPurseService } from '../../services/current-purse.service';
import { CurrencyPipe } from '@angular/common';
import { PurseRefreshService } from '../../services/purse-refresh.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-manager-dashboard-header',
  standalone: true,
  imports: [AddMoneyComponent,CurrencyPipe],
  templateUrl: './manager-dashboard-header.component.html',
  styleUrl: './manager-dashboard-header.component.css'
})
export class ManagerDashboardHeaderComponent implements OnInit{
  ngOnInit(): void {
    this.optionEmitted.emit(this.selectedOption);
    this.fetchCurrentPurse();
    this.purseSubscription=this.purseRefresh.refreshPurse$.subscribe(()=>{
      this.fetchCurrentPurse();
    })
  }
  username=localStorage.getItem('nickname');
  selectedOption='pendingOrders';
  showModal = false;
  currentPurse:number=0;
  private purseService=inject(CurrentPurseService);
  private purseRefresh=inject(PurseRefreshService);
  private purseSubscription!:Subscription;
  @Output()
  optionEmitted=new EventEmitter<string>();
  activeItemIndex: number | null = null; // Stores the clicked item index
  fetchCurrentPurse(){
    this.purseService.getCurrentPurse().subscribe({
      next:(response)=>{
        console.log(response);
        this.currentPurse=response.data.currentPurse;
      },
      error:(error)=>{
        console.log("error",error);
      }
    })
  }
  setSelectedOption(option:string,i:number){
    this.selectedOption=option;
    console.log(option);
    this.setActive(i); 
    this.optionEmitted.emit(option);
  }
  setActive(index: number) {
    this.activeItemIndex = index;
  }
  addMoney()
  {
    this.showModal = true;
  }
}
