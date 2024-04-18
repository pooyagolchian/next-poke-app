import api from '../api'
import { PokemonType } from '../types/pokemonType'

export const fetchPokemonByName = async (
  pokemon: string,
  type?: string,
): Promise<PokemonType[]> => {
  try {
    let url = `pokemon/${pokemon}?limit=198&offset=0`
    if (type) {
      url += `&type=${type}`
    }
    const { data } = await api.get<PokemonType>(url)
    return [data]
  } catch (error) {
    console.error('Error fetching Pokémon by name:', error)
    return []
  }
}
