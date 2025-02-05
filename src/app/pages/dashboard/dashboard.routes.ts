import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';

export const dashboardChildrenRoutes: Routes = [
  {
    path: 'productos',
    loadComponent: () => import('./products/products.component').then((c) => c.ProductsComponent)
  },
  {
    path: 'categorias',
    loadComponent: () => import('./categories/categories.component').then((c) => c.CategoriesComponent)
  },
  {
    path: 'vendors',
    loadComponent: () => import('./vendors/vendors.component').then((c) => c.VendorsComponent)
  },
  {
    path: 'orders',
    loadComponent: () => import('./orders/orders.component').then((c) => c.OrdersComponent)
  },
  {
    path: '',
    redirectTo: 'productos',
    pathMatch: 'full'
  }
];
