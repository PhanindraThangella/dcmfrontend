import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TagRelatedServiceService {
  private http=inject(HttpClient);
  private apiurl1=`${environment.apiBaseUrl}/api/tags/createNewTag`;
  constructor() { }
  createTag(formData:FormData):Observable<any>{
    return this.http.post(this.apiurl1,formData);
  }
}
