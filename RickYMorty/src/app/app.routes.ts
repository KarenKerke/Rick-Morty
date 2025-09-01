import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'characters',
    loadComponent: () =>
      import('./characters/pages/characters/characters')
  }
];
