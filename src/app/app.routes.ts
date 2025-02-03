import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'sign-in',
        loadComponent: () => import('./pages/auth/sign-in/sign-in.component').then((c) => c.SignInComponent)
    },
    {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
    }
];
