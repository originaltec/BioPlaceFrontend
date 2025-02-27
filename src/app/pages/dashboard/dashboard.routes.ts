import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';

/**
 * Defines the child routes for the dashboard module.
 * 
 * Routes:
 * - `products`: Loads the ProductsComponent.
 * - `products/:id/:sku`: Loads the ProductComponent for a specific product.
 * - `edit-product/:id`: Loads the EditProductComponent for editing a specific product.
 * - `categories`: Loads the CategoriesComponent.
 * - `categories/:id`: Loads the CategoryComponent for a specific category.
 * - `vendors`: Loads the VendorsComponent.
 * - `vendors/:id`: Loads the VendorComponent for a specific vendor.
 * - `orders`: Loads the OrdersComponent.
 * - `orders/:id`: Loads the OrderComponent for a specific order.
 * - `settings`: Loads the SettingsComponent.
 * - `''`: Redirects to the 'products' route.
 */
export const dashboardChildrenRoutes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./products/products.component').then((c) => c.ProductsComponent)
  },
  {
    path: 'products/:id/:sku',
    loadComponent: () => import('./product/product.component').then((c) => c.ProductComponent)
  },
  {
    path: 'edit-product/:id',
    loadComponent: () => import('./edit-product/edit-product.component').then((c) => c.EditProductComponent)
  },
  {
    path: 'categories',
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
    path: 'vendors/:id',
    loadComponent: () => import('./vendor/vendor.component').then((c) => c.VendorComponent)
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
    path: 'users',
    loadComponent: () => import('./users/users.component').then((c) => c.UsersComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then((c) => c.SettingsComponent)
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  }
];
