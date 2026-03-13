import { Routes } from '@angular/router';
import { CartComponent } from './features/cart/cart';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'cart', component: CartComponent, canActivate: [authGuard] },
    { path: '', redirectTo: 'cart', pathMatch: 'full' }
];
