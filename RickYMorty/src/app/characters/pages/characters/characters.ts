import { Component, inject } from '@angular/core';
import { RickYMortyService } from '../../services/rickymorty.service';
import { Router } from '@angular/router';

@Component({
  selector: 'characters',
  templateUrl: './characters.html',
})
export default class Characters {
  rickymortyService = inject(RickYMortyService);
  private router = inject(Router);

  viewCharacter() {
    this.router.navigate(['/characters',this.rickymortyService]);
  }
}
