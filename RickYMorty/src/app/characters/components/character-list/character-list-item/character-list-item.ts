import { Component, input } from '@angular/core';

@Component({
  selector: 'character-list-item',
  templateUrl: './character-list-item.html'
})
export class CharacterListItem {
  image = input.required<string>();
  name = input.required<string>();
 }
