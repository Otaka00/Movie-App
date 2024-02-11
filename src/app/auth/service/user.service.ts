// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

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
    const credentials = { email, password };

    return this.http.post('http://localhost:8080/api/v1/auth/authenticate', credentials).pipe(
      tap((response: any) => {
        this.handleAuthentication(response.token);
//         this.validateCredentials(email, password, response.token);
      }),
      catchError((error: any) => {
            return of(false); // Return an observable with false in case of error
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
    const credentials = { email, password };

    return this.http.post('http://localhost:8080/api/v1/auth/register', credentials).pipe(

      tap((response: any) => {
        this.handleAuthentication(response.token);
      })
    );
  }

  private handleAuthentication(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
    this.isLoggedInSubject.next(true);
  }

  private validateCredentials(email: string, password: string, token: string): Observable<boolean> {
    // Make an API call to validate the user credentials
    const credentials = { email, password };

    return this.http.post('http://localhost:8080/api/v1/auth/validate', credentials).pipe(
      map((validationResponse: any) => {
        if (validationResponse.valid) {
          // If the credentials are valid, set the authentication token
          localStorage.setItem(this.authTokenKey, token);
          this.isLoggedInSubject.next(true);
          return true;
        } else {
          // If the credentials are not valid, handle accordingly
          console.error('Invalid credentials');
          return false;
        }
      }),
      catchError((error) => {
        // Handle API call error, e.g., network issue
        console.error('Error validating credentials:', error);
        return of(false); // Return an observable with false in case of error
      })
    );
  }



  private isTokenAvailable(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

}
