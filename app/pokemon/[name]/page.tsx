'use client'

import { usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchPokemonByName } from '../../services/pokemon'
import Image from 'next/image'
import styled from 'styled-components'
import MoveChart from '../../components/MoveChart'
import Link from 'next/link'
import LoadingSpinner from '../../components/LoadingSpinner'
import React from 'react'

const PokemonContainer = styled.div.attrs({
  className: 'm-5 flex flex-col items-center',
})``
const Card = styled.div.attrs({
  className:
    'p-6 max-w-sm mx-auto bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg shadow-md flex flex-col items-center mb-10',
})``

const Pokemon = () => {
  const pathname = usePathname()
  const name = pathname.replace('/pokemon', '')
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemonByName(name as string),
    enabled: !!name,
  })

  if (isLoading)
    return (
      <div className={'my-10'}>
        {' '}
        <LoadingSpinner />
      </div>
    )
  if (isError) return <div className={'my-10'}>Pokemon not found!r</div>

  return (
    <>
      <PokemonContainer>
        <Link
          className="text-white bg-gradient-to-r from-blue-400 to-indigo-800 px-4 py-2 rounded-r-md hover:bg-blue-900 rounded mb-10"
          href="/"
        >
          Back to Home
        </Link>
        <Card>
          <h1 className="text-2xl font-bold text-white">
            {data && data[0]?.name}
          </h1>
          <Image
            src={`https://img.pokemondb.net/artwork/large/${data && data[0]?.name}.jpg`}
            alt={`${data && data[0]?.name}`}
            width={300}
            height={300}
            className="my-4 rounded-lg"
          />
        </Card>
        <MoveChart moves={data && data[0]?.moves} />
      </PokemonContainer>
    </>
  )
}

export default Pokemon
