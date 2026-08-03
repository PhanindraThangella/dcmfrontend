import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmpRegisterServiceService {
  private apiUrl=`${environment.apiBaseUrl}/api/auth/register`;
  private apiUrl2=`${environment.apiBaseUrl}/api/auth/getEmployeeNames`;
  constructor(private http:HttpClient) {}
  sendFormData(formData:FormData):Observable<any>{
    return this.http.post(this.apiUrl,formData,{ responseType: 'text' });
  }
  getEmployeeNames():Observable<any>{
    return this.http.get(this.apiUrl2);
  }
}
