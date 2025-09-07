import { Component, OnInit, inject, signal } from '@angular/core';
import { RickYMortyService } from '../../services/rickymorty.service';
import { Character } from '../../interfaces/character';
import CardList from '../../components/card-list/card-list';
import { PaginatorComponent } from '../../components/paginator/paginator';


@Component({
  selector: 'characters-list-page',
  templateUrl: './characters-list.html',
  imports: [CardList, PaginatorComponent],
})
export default class CharactersList implements OnInit {
  private readonly rickymortyService = inject(RickYMortyService);

  characters = signal<Character[]>([]);
  currentPage = signal(1);
  totalPages = signal(1);
  charactersLoading = signal(false);

  ngOnInit(): void {
    this.loadCharacters(1);
  }

  loadCharacters(page: number) {
    if (this.charactersLoading()) return;
    this.charactersLoading.set(true);

    this.rickymortyService.getCharacters(page).subscribe(
      (resp) => {
        this.characters.set(resp.results);
        this.totalPages.set(resp.info.pages);
        this.currentPage.set(page);
        this.charactersLoading.set(false);
      },
      (error) => {
        console.error('Error cargando personajes', error);
        this.charactersLoading.set(false);
      }
    );
  }

  onPageChange(page: number) {
  this.loadCharacters(page);
}
}
