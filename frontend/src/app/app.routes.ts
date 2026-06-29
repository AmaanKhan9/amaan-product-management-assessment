import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth-guard';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },

    {
        path: 'auth/login',
        canActivate: [guestGuard],
        loadComponent: () =>
            import('./features/auth/login/login.component')
                .then(m => m.LoginComponent)
    },

    {
        path: 'auth/register',
        canActivate: [guestGuard],
        loadComponent: () =>
            import('./features/auth/register/register.component')
                .then(m => m.RegisterComponent)
    },

    {
        path: 'categories',
        canActivate: [authGuard],
        loadChildren: () =>
            import('./features/categories/categories.routes')
                .then(m => m.categoryRoutes)
    },
    {
        path: 'products',
        canActivate: [authGuard],
        loadChildren: () =>
            import('./features/products/products.routes')
                .then(m => m.productRoutes)
    }

];