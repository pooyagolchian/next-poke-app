'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchPokemonByName } from '../../services/pokemon'
import Image from 'next/image'
import styled from 'styled-components'

const PokemonContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Pokemon = () => {
  const pathname = usePathname()
  const name = pathname.replace('/pokemon', '')
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemonByName(name as string),
    enabled: !!name,
  })

  if (isLoading) return <div>Loading</div>
  if (isError) return <div>Sorry There was an Error</div>

  return (
    <PokemonContainer>
      <h1>{data?.name}</h1>
      <Image
        src={`https://img.pokemondb.net/artwork/large/${data && data[0]?.name}.jpg`}
        alt={`${data && data[0]?.name}`}
        width={300}
        height={300}
      />
    </PokemonContainer>
  )
}

export default Pokemon
