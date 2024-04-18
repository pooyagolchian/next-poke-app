'use client'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { fetchPokemonByName } from './services/pokemon'
import { PokemonType } from './types/pokemonType'
import Image from 'next/image'
import Link from 'next/link'
import debounce from 'debounce'

const Container = styled.main.attrs({
  className: 'w-full lg:w-4/5 mx-auto px-10 lg:px-0',
})``

const Grid = styled.div.attrs({
  className:
    'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-10 pb-20',
})``

const PokemonItem = styled.div.attrs({
  className:
    'break-inside-avoid-column flex flex-col items-center border border-black rounded-xl',
})``

const StyledImage = styled(Image)`
  max-width: 100%;
  height: 300px;
  object-fit: cover;
`

const Home = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [type, setType] = useState<string>('')

  const { data, isLoading, isError, refetch } = useQuery<PokemonType[]>({
    queryFn: async () => {
      try {
        return await fetchPokemonByName(searchQuery, type)
      } catch (error) {
        console.error('Error fetching data: ', error)
        throw error
      }
    },
    queryKey: ['pokemon', searchQuery, type],
    enabled: false,
  })

  useEffect(() => {
    refetch()
  }, [refetch])

  const debouncedApiCall = useMemo(
    () =>
      debounce(() => {
        refetch()
      }, 500),
    [refetch],
  )

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    debouncedApiCall()
  }

  const updateSearchQuery = (value: string) => {
    setSearchQuery(value)
    debouncedApiCall()
  }

  const updateType = (value: string) => {
    setType(value)
    debouncedApiCall()
  }

  const renderPokemon = (pokemonList: PokemonType[]) => {
    return pokemonList.map((pokemonItem, index) => (
      <PokemonItem key={index}>
        <Link href={`/pokemon/${pokemonItem?.name}`}>
          <StyledImage
            className={'rounded-xl'}
            height={300}
            width={300}
            src={`https://img.pokemondb.net/artwork/large/${pokemonItem?.name}.jpg`}
            alt={pokemonItem?.name}
          />
          <hr />
          <div className={'text-xl font-bold p-5'}>{pokemonItem?.name}</div>
        </Link>
      </PokemonItem>
    ))
  }

  return (
    <Container>
      <form onSubmit={handleSearch} className="w-full flex mt-10">
        <input
          type="text"
          value={searchQuery}
          onChange={e => updateSearchQuery(e.target.value)}
          placeholder="Search Pokémon"
          className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          value={type}
          onChange={e => updateType(e.target.value)}
          placeholder="Type"
          className="px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-400 to-indigo-800 text-white px-4 py-2 rounded-r-md"
        >
          Search
        </button>
      </form>
      {isLoading && <div className={'my-10'}>Loading...</div>}
      {isError && <div className={'my-10'}>Pokemon not found!</div>}
      {data && searchQuery.length === 0 && (
        <Grid>{renderPokemon(data[0]?.results || [])}</Grid>
      )}
      {data && searchQuery.length > 0 && <Grid>{renderPokemon(data)}</Grid>}
    </Container>
  )
}

export default Home
