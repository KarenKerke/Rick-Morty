import { Component, input } from '@angular/core';
import Card from '../card/card';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.html',
  imports: [Card],
})
export default class CardList {
  characters = input.required<Character[]>();
}
