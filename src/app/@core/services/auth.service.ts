import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  LoginCredentials,
  SignupCredentials,
  LoginResponse,
  SignupResponse
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authURL = `${environment.baseURL}/auth`;
  private readonly options = { withCredentials: true };

  constructor(private http: HttpClient) {
  }

  signup(credentials: SignupCredentials): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(
      `${this.authURL}/signup`,
      credentials,
      this.options
    );
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.authURL}/login`,
      credentials,
      this.options
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      `${this.authURL}/logout`,
      undefined,
      this.options
    );
  }

  authenticated(): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.authURL}/authenticated`,
      this.options
    );
  }
}
