import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrentPurseService {
  private http=inject(HttpClient);
  private apiUrl1=`${environment.apiBaseUrl}/api/purse/getCurrentPurse`;
  private apiUrl2=`${environment.apiBaseUrl}/api/purse/addMoneyToPurse`;
  private apiUrl3=`${environment.apiBaseUrl}/api/purse/getPurseRecords`;
  constructor() { }
  getCurrentPurse():Observable<any>{
    return this.http.get(this.apiUrl1);
  }
  addMoney(amount:number):Observable<any>{
    return this.http.post(`${this.apiUrl2}/${amount}`,null);
  }
  getRecentPurseDetails():Observable<any>{
    return this.http.get(`${this.apiUrl3}`);
  }
}
