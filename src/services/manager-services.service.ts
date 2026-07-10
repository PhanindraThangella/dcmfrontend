import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
export interface MyRequestBody{
  tagNumber:number,
  totalAmount:number
}
@Injectable({
  providedIn: 'root'
})
export class ManagerServicesService {

  private http=inject(HttpClient);
  private apiurl=`${environment.apiBaseUrl}/api/manager/getPendingTransactions`;
  private apiurl2=`${environment.apiBaseUrl}/api/manager/updateTransactionStatus`;
  private apiurl3=`${environment.apiBaseUrl}/api/manager/createCredit`;
  private apiurl4=`${environment.apiBaseUrl}/api/manager/addNewPayment`;
  private apiurl5=`${environment.apiBaseUrl}/api/manager/remove/transaction`;
  private apiurl6=`${environment.apiBaseUrl}/api/manager/addPurchaseOldMetalPayment`;
  private apiurl7=`${environment.apiBaseUrl}/api/manager/addSellPureMetalPayment`;
  private apiurl8=`${environment.apiBaseUrl}/api/manager/newNormalCredit`;
  private apiurl9=`${environment.apiBaseUrl}/api/manager/getDayBookSales`;
  constructor() { }
  getPendingTransations():Observable<any>{
    return this.http.get(this.apiurl);
  }
  updateTransactionStatus(tagNumber:number,totalAmount:number):Observable<any>{
    const body:MyRequestBody={
      tagNumber:tagNumber,
      totalAmount:totalAmount
    }
    return this.http.post(`${this.apiurl2}`,body);
  }
  createCredit(formData:any):Observable<any>{
    return this.http.post(this.apiurl3,formData);
  }
  addNewPayment(formData:any):Observable<any>{
    return this.http.post(this.apiurl4,formData);
  }
  removeTransaction(tagNumber:number):Observable<any>{
    return this.http.delete(`${this.apiurl5}/${tagNumber}`);
  }
  addPOMPayment(formData:any):Observable<any>{
    return this.http.post(this.apiurl6,formData);
  }
  addSPMPayment(formData:any):Observable<any>{
    return this.http.post(this.apiurl7,formData);
  }
  createNormalCredit(creditId:number):Observable<any>{
    return this.http.post(`${this.apiurl8}/${creditId}`,null);
  }
  getDayBookDetails():Observable<any>{
    return this.http.get(this.apiurl9);
  }
}
