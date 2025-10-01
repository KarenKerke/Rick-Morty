import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { RickYMortyService } from '../../../services/rickymorty.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
})
export default class Card {
  rickymortyService = inject(RickYMortyService);
  private router = inject(Router);
  id = input.required<number>();
  name = input.required<string>();
  image = input.required<string>();

  viewCharacterDetail() {
    this.router.navigate(['/characters', this.id()]);
  }
}
