import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import type { RickMortyResponse } from '../interfaces/rickymorty';
import { CharacterMapper } from '../mapper/character.mapper';
import { Character } from '../interfaces/character';

@Injectable({providedIn: 'root'})

export class RickYMortyService {
  private http = inject(HttpClient);
  characterStatus = signal<Character[]>([]);
  charactersLoading = signal(false);

  constructor(){
    this.loadCharacters();
  }

  loadCharacters(){
    if(this.charactersLoading()) return;
    this.charactersLoading.set(true);

    this.http.get<RickMortyResponse>
    ('https://rickandmortyapi.com/api/character').subscribe(
      (resp) => {
        const characters = CharacterMapper.mapCharactersArray(resp.results);
        this.characterStatus.update(currentCharacter => [
          ...currentCharacter,
          ...characters
        ]);
        this.charactersLoading.set(false);
        console.log({characters});
    })
  }

}
