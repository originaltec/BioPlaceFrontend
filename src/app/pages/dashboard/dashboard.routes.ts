import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';

export const dashboardChildrenRoutes: Routes = [
  {
    path: 'productos',
    component: ProductsComponent
  },
  {
    path: 'categorias',
    component: CategoriesComponent
  },
  {
    path: '',
    redirectTo: 'productos',
    pathMatch: 'full'
  }
];
