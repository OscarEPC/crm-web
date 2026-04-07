import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  public isLoading = signal<boolean>(false);

  public loginForm = this.fb.nonNullable.group({
    email: ['oscar.edu.dev@gmail.com', [Validators.required, Validators.email]],
    password: ['Asdf#1234', [Validators.required, Validators.minLength(7)]],
  });

  login(): void {
    const { email, password } = this.loginForm.value;
    this.isLoading.set(true);
    this.authService.login(email!, password!).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigateByUrl('/dashboard/home');
      },
      error: (error) => {
        this.isLoading.set(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
        });
      },
    });
  }
}
