export interface Pokemon {
  results: any
  id: number
  name: string
  sprites: {
    front_default: string
  }
}

export interface Type {
  id: number
  name: string
}

export interface Ability {
  id: number
  name: string
}
