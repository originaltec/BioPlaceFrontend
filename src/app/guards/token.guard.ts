import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceToken } from '../services/auth/auth.service';

/**
 * Guard to check if a user has a valid token.
 * 
 * This guard uses the `AuthServiceToken` to retrieve the current token. If a token is present,
 * the guard allows the navigation to proceed. If no token is found, the user is redirected to the
 * sign-in page.
 * 
 * @param route - The activated route snapshot.
 * @param state - The router state snapshot.
 * @returns `true` if the token is present, otherwise `false` and redirects to the sign-in page.
 */
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
