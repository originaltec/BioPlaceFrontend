import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceToken } from '../services/auth/auth.service';

export const tokenGuard: CanActivateFn = (route, state) => {
  const _authServiceToken = inject(AuthServiceToken);
  const router = inject(Router);

  const token = _authServiceToken.getToken();

  if (token) {
    return true;
  } else {
    router.navigate(['/sign-in']); 
    return false;
  }
};
