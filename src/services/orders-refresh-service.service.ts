import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrdersRefreshServiceService {
  private refreshPendingOrdersSource =new Subject<void>();

  refreshPendingOrders$=this.refreshPendingOrdersSource.asObservable();

  triggerOrdersREfresh(){
    this.refreshPendingOrdersSource.next();
  }
}
