import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RickYMortyService } from '../../services/rickymorty.service';
import { ActivatedRoute } from '@angular/router';
import type { Character } from '../../interfaces/character';
import { DividerModule } from 'primeng/divider';
import { NgClass } from '@angular/common';

@Component({
  selector: 'character',
  imports: [DividerModule, NgClass],
  templateUrl: './character.html',
  styleUrl: './character.css'
})
export default class CharacterPage implements OnInit {
  private readonly rickymortyService = inject(RickYMortyService);
  private readonly route = inject(ActivatedRoute);
  public character = signal<Character | null>(null);
  public episodeNames = signal<string[]>([]);


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadCharacter(Number(id));
      }
    });
  }

  private loadCharacter(id: number): void {
  this.rickymortyService.getCharacterById(id).subscribe(
    (resp) => {
      this.character.set(resp);

      // Una vez que tenemos el personaje, pedimos los episodios
      this.rickymortyService.loadEpisodes(resp).subscribe(episodes => {
        // episodes es un array de objetos episodio
        const names = episodes.map(ep => ep.name);
        this.episodeNames.set(names);
      });
    },
    (error) => {
      console.error('Error al cargar el personaje', error);
    }
  );
}


  changeColorStatus = computed( () => {
    return{
      'text-success': this.character()?.status === 'Alive',
      'text-danger': this.character()?.status === 'Dead',
      'text-warning': this.character()?.status === 'unknown'
    }
  })

  private change(pipe: string | undefined){
    if(pipe === 'Female') return 'Femenino';
    if(pipe === 'Male') return 'Masculino';
    if(pipe === 'unknown') return 'Desconocido';
    if(pipe === 'Alive') return 'Vivo';
    if(pipe === 'Dead') return 'Muerto';
    return pipe;
  }

  changeLanguageGender = computed( () => {
    return this.change(this.character()?.gender);
  });

  changeLanguageStatus = computed(() => {
  return this.change(this.character()?.status);
  });
}
