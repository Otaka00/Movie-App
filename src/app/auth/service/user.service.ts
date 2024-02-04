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



//   private readonly storageKey = 'user';
//   private storageKey2 = 'users';
//   private readonly tokenKey = 'token'; // Add a token key
//   isLoggingIn: boolean = false;
//
//   private AUTH_ENDPOINT = 'http://localhost:8080/api/v1/auth/authenticate';
//   constructor(private http: HttpClient) {}
//
//   authenticateUser(email: string, password: string) {
//     const credentials = { email, password };
//     return this.http.post(this.AUTH_ENDPOINT, credentials);
//   }
//
//    getUsers(): { email: string; password: string }[]
//     {
//     const usersString = localStorage.getItem(this.storageKey2);
//     return usersString ? JSON.parse(usersString) : [];
//   }
//
//   isEmailTaken(email: string): boolean {
//     const users = this.getUsers();
//     return users.some((user) => user.email === email);
//   }
//
//
//   // Auth Guard
//    isLoggedIn(): boolean {
//       this.isLoggingIn = true;
//       // Check if there is a token in local storage
// //       return localStorage.getItem(this.storageKey) ? true: false;
//         return !!localStorage.getItem(this.tokenKey);
//
//     }
//
//     // Save the token to local storage
//     saveToken(token: string): void {
//       localStorage.setItem(this.tokenKey, token);
//       this.isLoggingIn = true;
//   }
//
//   getToken(): string | null {
//     return localStorage.getItem(this.tokenKey);
//   }
//
//
//     // Remove the token from local storage (during logging out)
//     removeToken(): void {
//       sessionStorage.removeItem(this.tokenKey);
//     }
//
//   logoutUser(): void {
//     this.isLoggingIn = false;
//     this.removeToken();
//   }
//   isLogging(): boolean {
//    return this.isLoggingIn;
//   }
//  // Add a new user to the list
//     addUser(user: { email: string; password: string }): void {
//       const users = this.getUsers();
//       users.push(user);
//       localStorage.setItem(this.storageKey2, JSON.stringify(users));
//     }
//
//   saveUser(email: string, password: string) {
//     const user = { email, password };
//     localStorage.setItem(this.storageKey, JSON.stringify(user));
//   }
//
//   getUser(): { email: string; password: string } | null {
//     const userString = localStorage.getItem(this.storageKey);
//     return userString ? JSON.parse(userString) : null;
//   }
//   removeUser() {
//     localStorage.removeItem(this.storageKey);
//   }


}
