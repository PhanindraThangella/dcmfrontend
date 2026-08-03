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
  private apiurl2=`${environment.apiBaseUrl}/api/tags/getTagDetails`;
  private apiurl3=`${environment.apiBaseUrl}/api/tags/updateTagDetails`;
  private apiurl4=`${environment.apiBaseUrl}/api/tags/getItems`;
  private apiurl5=`${environment.apiBaseUrl}/api/tags/deleteItem`;
  private apiurl6=`${environment.apiBaseUrl}/api/tags/getRecentItems`;
  constructor() { }
  createTag(formData:FormData):Observable<any>{
    return this.http.post(this.apiurl1,formData);
  }
  fetchTagDetails(tag:number):Observable<any>{
    return this.http.get(`${this.apiurl2}/${tag}`);
  }
  updateTagDetails(formData:FormData):Observable<any>{
    return this.http.put(this.apiurl3,formData);
  }
  getItemsByProductName(productName:string):Observable<any>{
    return this.http.get(`${this.apiurl4}/${productName}`);
  }
  deleteItem(id:number):Observable<any>{
    return this.http.delete(`${this.apiurl5}/${id}`);
  }
  getRecentItems():Observable<any>{
    return this.http.get(this.apiurl6);
  }
}
