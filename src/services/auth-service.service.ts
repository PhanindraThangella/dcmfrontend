import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
interface ApiResponse {
  success:boolean;
  data:LoginResponse;
  message:string;
  timestamp:string;
}
interface LoginResponse{
  accessToken:string;
  tokenType:string;
  expiresIn:any;
  employeeId:string;
  employeeName:string;
  nickname:string;
  username:string;
  role:any;
}
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private http = inject(HttpClient);
  private readonly TOKEN_KEY = 'auth_session';
  private router=inject(Router);
  login(credentials: any) {
    return this.http.post<ApiResponse>(`${environment.apiBaseUrl}/api/auth/login`, credentials)
      .pipe(
        tap(response => {
          // Store the extracted JWT token in localStorage
          const now = new Date();
          
          // 2. Target tomorrow morning at 01:00 AM
          const expirationDate = new Date();
          expirationDate.setDate(now.getDate()+1);
          expirationDate.setHours(1, 0, 0, 0);

          // 3. Create an auth object
          const authData = {
            token: response.data.accessToken,
            expiresAt: expirationDate.getTime() // Unix timestamp in milliseconds
          };

          // 4. Save to localStorage
          localStorage.setItem('auth_session', JSON.stringify(authData));
          localStorage.setItem("nickname",response.data.nickname);
          localStorage.setItem("role",response.data.role);
          localStorage.setItem("employeeId",response.data.employeeId);
        })
      );
  }
  getValidToken() {
    const sessionStr = localStorage.getItem('auth_session');
    if (!sessionStr) return null;

    try {
      const session = JSON.parse(sessionStr);
      const now = new Date().getTime();
      if (now >= session.expiresAt) {
        this.logout();
        return null;
      }

      return session.token;
    } catch (error) {
      this.logout();
      return null;
    }
  }
  getRole():string{
    return localStorage.getItem("role") || '';
  }
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  isLogedIn():boolean{
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
  getEmployeeId():string{
    return localStorage.getItem("employeeId") || '';
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
