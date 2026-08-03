import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PurseRefreshService {

   // A simple Subject to broadcast the refresh event
  private refreshPurseSource = new Subject<void>();
  
  // Observable stream for the Header to listen to
  refreshPurse$ = this.refreshPurseSource.asObservable();

  // Call this method to trigger the refresh signal
  triggerPurseRefresh() {
    this.refreshPurseSource.next();
  }
}
