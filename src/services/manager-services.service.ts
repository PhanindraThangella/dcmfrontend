import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
export interface MyRequestBody{
  tagNumber:number,
  totalAmount:number
}
export interface credits {
  id:number;
  customerName: string;
  contactNumber:number;
  totalAmount:number;
}

export interface CreditResponse {
  success: boolean;
  message: string;
  timestamp: string;
  data: {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    isFirst: boolean;
    isLast: boolean;
    data: credits[]; // Or replace any[] with your CreditItem interface
  };
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
  private apiurl10=`${environment.apiBaseUrl}/api/manager/getCreditHistory`;
  private apiurl11=`${environment.apiBaseUrl}/api/manager/settleCreditOfCustomer`;
  private apiurl12=`${environment.apiBaseUrl}/api/manager/getGoldDayBook`;
  private apiurl13=`${environment.apiBaseUrl}/api/manager/getSilverDayBook`;
  private apiurl14=`${environment.apiBaseUrl}/api/manager/getCreditDetailsContactNumber`;
  private apiurl15=`${environment.apiBaseUrl}/api/manager/getCreditDetailsCustomerName`;
  private apiurl16=`${environment.apiBaseUrl}/api/manager/addEmployeeSalaryPayment`;
  constructor() { }
  getPendingTransations():Observable<any>{
    return this.http.get(this.apiurl);
  }
  updateTransactionStatus(tagNumber:number,totalAmount:number):Observable<any>{
    const body:MyRequestBody={
      tagNumber:tagNumber,
      totalAmount:totalAmount
    }
    return this.http.put(`${this.apiurl2}`,body);
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
  settleCredit(id:number,amount:number,flag:boolean):Observable<any>{
    return this.http.put(`${this.apiurl11}/${id}/${amount}/${flag}`,null);
  }
  getCreditReports(page:number,size:number):Observable<CreditResponse>{
      const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<CreditResponse>(this.apiurl10, { params });
  }
  getGoldDayBook():Observable<any>{
    return this.http.get(this.apiurl12);
  }
  getSilverDayBook():Observable<any>{
    return this.http.get(this.apiurl13);
  }
  getCreditDetailsByContactNumber(mobile:number):Observable<any>{
    return this.http.get(`${this.apiurl14}/${mobile}`);
  }
  getCreditDetailsByCustomerName(name:string):Observable<any>{
    return this.http.get(`${this.apiurl15}/${name}`);
  }
  addEmployeeSalary(data:any):Observable<any>{
    return this.http.post(this.apiurl16,data);
  }
}
