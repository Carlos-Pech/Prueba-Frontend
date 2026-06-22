import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/**
 * Interceptor que agrega automáticamente el token JWT
 * en las peticiones HTTP y maneja errores de autenticación.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (token) {
     // Clona la petición HTTP y agrega el JWT en la cabecera Authorization
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
     // Si el token es inválido o expiró, se cierra la sesión y se redirige al login
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.log('Token inválido o expirado');
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
