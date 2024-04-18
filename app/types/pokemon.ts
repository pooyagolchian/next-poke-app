export interface Pokemon {
  results: any
  id: number
  name: string
  sprites: {
    front_default: string
  }
  moves: Move[] | undefined
}

export interface Type {
  id: number
  name: string
}

export interface Ability {
  id: number
  name: string
}

export interface Move {
  move: {
    name: string
  }
  version_group_details: VersionGroupDetail[]
}

export interface VersionGroupDetail {
  level_learned_at: number
  move_learn_method: {
    name: string
  }
  version_group: {
    name: string
  }
}

export interface MovesChartProps {
  moves: Move[] | undefined
}
