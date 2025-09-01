import { Character } from "../interfaces/character";
import { Result } from "../interfaces/rickymorty";

export class CharacterMapper {
  static mapCharacter(item: Result): Character {
    return {
      id: item.id,
      name: item.name,
      url: item.url,
      image: item.image,
    }
  }

  static mapCharactersArray(items: Result[]): Character[]{
    return items.map(this.mapCharacter);
  }
}
