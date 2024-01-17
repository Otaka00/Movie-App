// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly storageKey = 'user';
  private storageKey2 = 'users';
  private readonly tokenKey = 'token'; // Add a token key
  isLoggingIn: boolean = false;

   getUsers(): { email: string; password: string }[]
    {
    const usersString = localStorage.getItem(this.storageKey2);
    return usersString ? JSON.parse(usersString) : [];
  }

  isEmailTaken(email: string): boolean {
    const users = this.getUsers();
    return users.some((user) => user.email === email);
  }

//   addUser(user: { email: string; password: string }): boolean {
//     const users = this.getUsers();
//     if (this.isEmailTaken(user.email))
//       return false;
//
//     users.push(user);
//     localStorage.setItem(this.storageKey, JSON.stringify(users));
//     return true; // User added successfully
//   }

  // Auth Guard
   isLoggedIn(): boolean {
      this.isLoggingIn = true;
      // Check if there is a token in local storage
      return localStorage.getItem(this.storageKey) ? true: false;
    }

    // Save the token to local storage
    saveToken(token: string): void {
      sessionStorage.setItem(this.tokenKey, token);
      this.isLogging();
  }

    // Remove the token from local storage (during logging out)
    removeToken(): void {
      sessionStorage.removeItem(this.tokenKey);
    }

  logoutUser(): void {
    this.isLoggingIn = false;
    this.removeToken();
  }
  isLogging(): boolean {
   return this.isLoggingIn;
  }
 // Add a new user to the list
    addUser(user: { email: string; password: string }): void {
      const users = this.getUsers();
      users.push(user);
      localStorage.setItem(this.storageKey2, JSON.stringify(users));
    }

  saveUser(email: string, password: string) {
    const user = { email, password };
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  getUser(): { email: string; password: string } | null {
    const userString = localStorage.getItem(this.storageKey);
    return userString ? JSON.parse(userString) : null;
  }
  removeUser() {
    localStorage.removeItem(this.storageKey);
  }
}
