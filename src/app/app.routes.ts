import { Routes } from '@angular/router';
import { dashboardChildrenRoutes } from './pages/dashboard/dashboard.routes';
import { tokenGuard } from './guards/token.guard';

/**
 * Defines the application routes for the Angular application.
 * 
 * Routes:
 * - `sign-in`: Lazy loads the SignInComponent.
 * - `dashboard`: Lazy loads the DashboardComponent, includes child routes defined in `dashboardChildrenRoutes`, and is protected by the `tokenGuard`.
 * - `` (empty path): Redirects to `dashboard/productos` with a full path match.
 * 
 * @constant
 * @type {Routes}
 */
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
        redirectTo: 'dashboard/products',
        pathMatch: 'full'
    }
];
