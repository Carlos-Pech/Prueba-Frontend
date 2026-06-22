import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../features/auth/models/loginRequest.model';
import { LoginResponse } from '../../features/auth/models/loginResponse.models';
import { environment } from '../../../environments/environment';

/**
 * Servicio encargado de gestionar la autenticación del usuario:
 * inicio de sesión, almacenamiento y eliminación del JWT.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private TOKEN_KEY = 'token';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/Auth/login`, data);
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
