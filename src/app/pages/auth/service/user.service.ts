// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly storageKey = 'users';
  isLoggingIn: boolean = false;

   getUsers(): { email: string; password: string }[]
    {
    const usersString = localStorage.getItem(this.storageKey);
    return usersString ? JSON.parse(usersString) : [];
  }

  isEmailTaken(email: string): boolean {
    const users = this.getUsers();
    return users.some((user) => user.email === email);
  }

  addUser(user: { email: string; password: string }): boolean {
    const users = this.getUsers();
    if (this.isEmailTaken(user.email))
      return false;

    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    return true; // User added successfully
  }

  // Auth Guard
   isLoggedIn(): boolean {
      this.isLoggingIn = true;
      // Check if there is a token in local storage
      return localStorage.getItem(this.storageKey) ? true: false;
    }

    // Save the token to local storage
    saveToken(token: string): void {
      localStorage.setItem(this.storageKey, token);
      this.isLogging();
  }

    // Remove the token from local storage (during logging out)
    removeToken(): void {
      localStorage.removeItem(this.storageKey);
    }

  logoutUser(): void {
    this.isLoggingIn = false;
    this.removeToken();
  }
  isLogging(): boolean {
   return this.isLoggingIn;
  }
}
