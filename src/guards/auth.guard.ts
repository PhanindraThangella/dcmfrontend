import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const authService=inject(AuthServiceService);
  if(!authService.isLogedIn())
  {
    router.navigate(['login']);
    return false;
  }
  const expectedRole = route.data['role'];
  const userRole = authService.getRole();
  if(!expectedRole || expectedRole.includes(userRole))
  {
    return true;
  }
  return false;
};
