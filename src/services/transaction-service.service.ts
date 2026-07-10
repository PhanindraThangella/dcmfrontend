import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthServiceService } from './auth-service.service';
@Injectable({
  providedIn: 'root'
})
export class TransactionServiceService {
  private apiUrl=`${environment.apiBaseUrl}/api/transactions/addTransaction`
  private apiUrl2=`${environment.apiBaseUrl}/api/transactions/getTransactions`
  private apiUrl3=`${environment.apiBaseUrl}/api/transactions/updateTransaction`;
  constructor(private httpClient:HttpClient,private authService:AuthServiceService) { }
  registerTransaction(formData:FormData):Observable<any>{
    return this.httpClient.post(this.apiUrl,formData);
  }
  getAllTransaction():Observable<any>{
    const employeeId=this.authService.getEmployeeId();
    return this.httpClient.get(`${this.apiUrl2}/${employeeId}`);
  }
  updateTransaction(formData:FormData):Observable<any>{
    return this.httpClient.post(this.apiUrl3,formData);
  }
}
