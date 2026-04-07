import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from 'src/app/auth/enums/auth-status.enums';
import { AuthService } from 'src/app/auth/services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.authStatus() === AuthStatus.NotAuthenticated) {
    router.navigateByUrl('/auth/login');
    return false;
  }

  return true;
};
