import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../enums/auth-status.enums';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.authStatus() === AuthStatus.Authenticated) {
    router.navigateByUrl('/dashboard/home');
    return false;
  }

  return true;
};
