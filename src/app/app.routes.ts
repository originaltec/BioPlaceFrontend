import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'sign-in',
        loadComponent: () => import('./pages/auth/sign-in/sign-in.component').then((c) => c.SignInComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then((c) => c.DashboardComponent)
    },
    {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
    }
];
