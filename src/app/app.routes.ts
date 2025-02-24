import { Routes } from '@angular/router';
import { dashboardChildrenRoutes } from './pages/dashboard/dashboard.routes';
import { tokenGuard } from './guards/token.guard';

export const routes: Routes = [
    {
        path: 'sign-in',
        loadComponent: () => import('./pages/auth/sign-in/sign-in.component').then((c) => c.SignInComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then((c) => c.DashboardComponent),
        children: dashboardChildrenRoutes,
        canActivate: [tokenGuard]
    },
    {
        path: '',
        redirectTo: 'dashboard/productos',
        pathMatch: 'full'
    }
];
