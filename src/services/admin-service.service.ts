import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private http=inject(HttpClient);
  private apiUrl=`${environment.apiBaseUrl}/api/admin/getStatsForDashboard`;
  private apiUrl2=`${environment.apiBaseUrl}/api/admin/getGoldSilverStats`;
  private apiUrl3=`${environment.apiBaseUrl}/api/admin/getRecentTransaction`;
  private apiUrl4=`${environment.apiBaseUrl}/api/admin/getTopPerformingEmployees`;
  private apiUrl5=`${environment.apiBaseUrl}/api/admin/createNewLot`;
  constructor() { }
  getDashboardStats(date:any):Observable<any>{
    return this.http.get(`${this.apiUrl}/${date}`);
  }
  getGoldSilverStats(date:any):Observable<any>{
    return this.http.get(`${this.apiUrl2}/${date}`);
  }
  getRecentTransactions(date:any):Observable<any>{
    return this.http.get(`${this.apiUrl3}/${date}`);
  }
  getTopPerformingEmployees(date:any):Observable<any>{
    return this.http.get(`${this.apiUrl4}/${date}`);
  }
  createLot(formData:FormData):Observable<any>{
    return this.http.post(this.apiUrl5,formData);
  }
}
