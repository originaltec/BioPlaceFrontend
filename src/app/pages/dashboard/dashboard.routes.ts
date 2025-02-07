import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';

export const dashboardChildrenRoutes: Routes = [
  {
    path: 'productos',
    loadComponent: () => import('./products/products.component').then((c) => c.ProductsComponent)
  },
  {
    path: 'productos/:id/:suk',
    loadComponent: () => import('./product/product.component').then((c) => c.ProductComponent)
  },
  {
    path: 'edit-product/:id',
    loadComponent: () => import('./edit-product/edit-product.component').then((c) => c.EditProductComponent)
  },
  {
    path: 'categorias',
    loadComponent: () => import('./categories/categories.component').then((c) => c.CategoriesComponent)
  },
  {
    path: 'categories/:id',
    loadComponent: () => import('./category/category.component').then((c) => c.CategoryComponent)
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
    path: 'orders/:id',
    loadComponent: () => import('./order/order.component').then((c) => c.OrderComponent)
  },
  {
    path: '',
    redirectTo: 'productos',
    pathMatch: 'full'
  }
];
