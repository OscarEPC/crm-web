import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/enums/auth-status.enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'crm-web';
  private authService = inject(AuthService);
  private router = inject(Router);

  public finishedAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.Checking) return false;
    return true;
  });

  public authStatusChangedEffect = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.Checking:
        return;
      case AuthStatus.Authenticated:
        this.router.navigateByUrl('/dashboard/home');
        return;
      case AuthStatus.NotAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;
    }
  });
}
