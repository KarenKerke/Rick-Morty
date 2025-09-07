import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import CharactersList from './characters/pages/characters-list/characters-list';
import Card from './characters/components/card/card';
import CardList from './characters/components/card-list/card-list';
import CharacterPage from './characters/pages/characters/character';

export const routes: Routes = [
  {
    path:'characters',
    loadComponent: () =>
      import('./characters/pages/characters-list/characters-list')
  },
  {
    path:'characters/:id',
    component: CharacterPage

    // loadComponent: () =>
    //   import('./characters/pages/characters/character')
  },
  {
    path: '**',
    loadComponent: () =>
      import('./characters/pages/Error404/Error404')
  }
];
