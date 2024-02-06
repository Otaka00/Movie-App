// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

private isLoggedInSubject: BehaviorSubject<boolean>;
  private authTokenKey = 'authToken';
  isLoggingIn: boolean = false;
  constructor(private http: HttpClient) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.isTokenAvailable());
  }

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };

    return this.http.post('http://localhost:8080/api/v1/auth/authenticate', loginData).pipe(
      tap((response: any) => {
        this.handleAuthentication(response.token);
      })
    );
  }

  logoutUser(): void {
    localStorage.removeItem(this.authTokenKey);
    this.isLoggedInSubject.next(false);
  }

  isLogged(): boolean {
    return this.isTokenAvailable();
  }

  register(email: string, password: string ): Observable<any> {
    const registerData = { email, password };

    return this.http.post('http://localhost:8080/api/v1/auth/register', registerData).pipe(

      tap((response: any) => {
        this.handleAuthentication(response.token);
      })
    );
  }

  private handleAuthentication(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
    this.isLoggedInSubject.next(true);
  }

  private isTokenAvailable(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

}
