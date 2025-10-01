import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import type { RickMortyResponse } from '../interfaces/rickymorty.interface';
import { CharacterMapper } from '../characters/mapper/character.mapper';
import { Character } from '../interfaces/character.interface';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class RickYMortyService {
  private http = inject(HttpClient);
  characterStatus = signal<Character[]>([]);
  charactersLoading = signal(false);

  constructor() {
    this.loadCharacters();
  }

  loadCharacters(page: number = 1) {
    if (this.charactersLoading()) return;
    this.charactersLoading.set(true);

    this.http.get<RickMortyResponse>(
      `https://rickandmortyapi.com/api/character?page=${page}`
    ).subscribe(
      (resp) => {
        const characters = CharacterMapper.mapCharactersArray(resp.results);
        this.characterStatus.update(currentCharacter => [
          ...currentCharacter,
          ...characters
        ]);
        this.charactersLoading.set(false);

        console.log({ characters, info: resp.info });
      },
      (error) => {
        console.error('Error cargando personajes', error);
        this.charactersLoading.set(false);
      }
    );
  }

  getCharacters(page: number) {
    return this.http.get<RickMortyResponse>(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
  }


  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`https://rickandmortyapi.com/api/character/${id}`);
  }

  loadEpisodes(character: Character) {
    const requests = character.episode.map(url => this.http.get<any>(url));
    return forkJoin(requests);
  }
}
