import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Use the inject() function to access other Angular services
  const authService = inject(AuthServiceService);
  const token = authService.getToken();

  // Clone the request and attach the authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  // Pass the cloned request onto the next handler in the chain
  return next(authReq);
};
