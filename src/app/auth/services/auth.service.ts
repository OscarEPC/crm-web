import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse, User } from '../interfaces/login-response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CheckAuthResponse } from '../interfaces/check-auth-response.interface';
import { AuthStatus } from '../enums/auth-status.enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = `${environment.apiUrl}/auth`;
  private http = inject(HttpClient);
  public _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.Checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuth().subscribe();
  }

  public login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, {
        email,
        password,
      })
      .pipe(
        map((resp) => this.setAuthentication(resp.user, resp.token)),
        catchError((resp) => {
          return throwError(() => resp.error.message);
        }),
      );
  }

   public checkAuth(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<CheckAuthResponse>(`${this.baseUrl}/check-auth`, { headers })
      .pipe(
        map((resp) => this.setAuthentication(resp.user, resp.token)),
        catchError((resp) => {
          this.logout();
          return of(false);
        }),
      );
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    localStorage.setItem('token', token);
    this._authStatus.set(AuthStatus.Authenticated);
    return true;
  }

  public logout(): void {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.NotAuthenticated);
  }
}
