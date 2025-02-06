import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';

export const dashboardChildrenRoutes: Routes = [
  {
    path: 'add-product',
    loadComponent: () => import('./add-product/add-product.component').then((c) => c.AddProductComponent)
  },
  {
    path: 'productos',
    loadComponent: () => import('./products/products.component').then((c) => c.ProductsComponent)
  },
  {
    path: 'productos/:id/:suk',
    loadComponent: () => import('./product/product.component').then((c) => c.ProductComponent)
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
