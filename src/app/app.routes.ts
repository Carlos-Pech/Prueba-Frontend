import { Routes } from '@angular/router';
import { noAuthGuard, authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [noAuthGuard],
    // Lazy loading del componente de login para optimizar carga inicial
    loadComponent: () => import('./features/auth/pages/login/login').then((m) => m.Login),
  },
  {
    path: 'products',
    canActivate: [authGuard],
    // Ruta protegida: solo accesible con autenticación
    // Lazy loading para cargar el módulo bajo demanda
    loadComponent: () =>
      import('./features/products/pages/product/productPage').then((m) => m.ProductPage),
    // loadComponent Carga bajo demanda.
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
];
