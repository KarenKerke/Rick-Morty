import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'characters',
    loadComponent: () =>
      import('./characters/components/card-list/card-list')
  },
  {
    path:'characters/:id',
    loadComponent: () =>
      import('./characters/pages/characters/character')
  },
  {
    path: '**',
    loadComponent: () =>
      import('./characters/pages/Error404/Error404')
  }
];
