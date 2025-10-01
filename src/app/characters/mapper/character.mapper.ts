import { Character } from "../../interfaces/character.interface";
import { Result } from "../../interfaces/rickymorty.interface";

export class CharacterMapper {
  static mapCharacter(item: Result): Character {
    return {
      id:   item.id,
      name: item.name,
      status: item.status,
      species: item.species,
      gender: item.gender,
      origin: item.origin,
      location: item.location,
      image: item.image,
      episode: item.episode
    }
  }

  static mapCharactersArray(items: Result[]): Character[]{
    return items.map(this.mapCharacter);
  }
}
