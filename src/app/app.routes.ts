import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./components/login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'manager',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./components/manager/manager.component').then((m) => m.ManagerComponent),
    },
    {
        path: 'operator',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./components/operator/operator.component').then((m) => m.OperatorComponent)
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' },

];
