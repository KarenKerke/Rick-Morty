import { Routes } from '@angular/router';
import { noAuthGuard } from './guards/no-auth.guard';
import { authGuard } from './guards/auth.guard';
import CharacterPageComponent from './characters/pages/characters/character-page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
   {
    path: 'register',
    loadComponent: () =>
      import('./pages/register-page/register-page.component')
        .then(m => m.RegisterPageComponent),
    canActivate: [noAuthGuard]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-page/login-page.component')
        .then(m => m.LoginPageComponent),
    canActivate: [noAuthGuard]
  },
  {
    path:'characters',
    loadComponent: () =>
      import('./characters/pages/characters-list/characters-list-page')
    .then(m => m.CharactersListPageComponent),
    canActivate: [authGuard]
  },
  {
    path:'characters/:id',
    component: CharacterPageComponent
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/Error404/Error404')
  }
];
