import api from '../api'
import { Pokemon, Type, Ability } from '../types/pokemon'

export const fetchPokemon = async (searchQuery: string): Promise<Pokemon> => {
  const { data } = await api.get<Pokemon>(`pokemon`)
  return data
}
export const fetchPokemonByName = async (
  pokemon: string,
  type?: string,
): Promise<Pokemon[]> => {
  try {
    let url = `pokemon/${pokemon}?limit=198&offset=0`
    if (type) {
      url += `&type=${type}`
    }
    const { data } = await api.get<Pokemon>(url)
    return [data]
  } catch (error) {
    console.error('Error fetching Pokémon by name:', error)
    return []
  }
}
export const fetchType = async (type: string): Promise<Type> => {
  const { data } = await api.get<Type>(`type/${type}`)
  return data
}

export const fetchAbility = async (ability: string): Promise<Ability> => {
  const { data } = await api.get<Ability>(`ability/${ability}`)
  return data
}
