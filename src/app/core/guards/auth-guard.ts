import { AuthService } from '../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject  } from '@angular/core';

/**
 * Permite acceder únicamente a usuarios autenticados.
 * Si no existe un token válido, redirige al usuario al login.
 */
export const authGuard: CanActivateFn =(route, state)=>{
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isAuthenticated();

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  return true;


}

/**
 * Evita que usuarios autenticados accedan nuevamente a páginas públicas
 * como el login. Si ya tienen una sesión activa, se redirigen al listado
 * de productos.
 */
export const noAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    router.navigate(['/products']);
    return false;
  }

  return true;
};
