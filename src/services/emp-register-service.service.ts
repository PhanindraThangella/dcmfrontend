import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmpRegisterServiceService {
  private apiUrl=`${environment.apiBaseUrl}/api/auth/register`;
  constructor(private http:HttpClient) {}
  sendFormData(formData:FormData):Observable<any>{
    return this.http.post(this.apiUrl,formData,{ responseType: 'text' });
  }
}
