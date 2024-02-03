// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private authUrl = 'http://localhost:8080/api/v1/auth/authenticate';

  constructor(private http: HttpClient) {}

  authenticate(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post<any>(this.authUrl, credentials);
  }
}
