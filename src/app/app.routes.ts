import { Routes } from '@angular/router';
import { AuthGuard } from './pages/auth/auth.guard';

export const routes: Routes = [
    {
        path: 'search',
        canActivate: [AuthGuard],
        loadComponent: () => import('./pages/search/search.component').then(c => c.SearchComponent)
    },
    {
        path: 'auth',
        loadComponent: () => import('./pages/auth/auth.component').then(c => c.AuthComponent),
        loadChildren: () => import('./pages/auth/auth.routes').then(r => r.authRoute)
    },
    {
        path: 'categories',
        loadComponent: () => import('./pages/categories/categories.component').then(c => c.CategoriesComponent),
    },
    {
        path: 'favorites',
        loadComponent: () => import('./pages/favorites/favorites.component').then(c => c.FavoritesComponent),
    },
    {
        path: 'recipes/:id',
        loadComponent: () => import('./pages/recipe/recipe.component').then(c => c.RecipeComponent),
    }
];
