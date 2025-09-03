import { Component, inject, signal } from '@angular/core';
import { RickYMortyService } from '../../services/rickymorty.service';
import type { Character } from '../../interfaces/character';
import Card from '../card/card';


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.html',
  imports: [Card],
})
export default class CardList{
  characters = signal<Character[]>([]);
  rickymortyService = inject(RickYMortyService);

  ngOnInit() {
    this.characters.set(this.rickymortyService.characterStatus());
  }
}
