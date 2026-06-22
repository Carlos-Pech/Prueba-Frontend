import { Routes } from '@angular/router';
import { noAuthGuard, authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [noAuthGuard],
    loadComponent: () =>
      import('./features/auth/pages/login/login').then(m => m.Login)
  },
  {
    path: 'products',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/products/pages/product/productPage').then(m => m.ProductPage )
    // loadComponent Carga bajo demanda.
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  }
];
