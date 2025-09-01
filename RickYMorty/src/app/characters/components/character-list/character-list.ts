import { Component, input } from '@angular/core';
import { Character } from '../../interfaces/character';
import { CharacterListItem } from './character-list-item/character-list-item';

@Component({
  selector: 'character-list',
  imports: [CharacterListItem],
  templateUrl: './character-list.html'
})
export default class CharacterList {
  characters = input.required<Character[]>();
 }
