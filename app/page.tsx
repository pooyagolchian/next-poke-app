'use client'
import { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { fetchPokemonByName } from './services/pokemon'
import Image from 'next/image'
import Link from 'next/link'

const Container = styled.main.attrs({
  className: 'max-w-7xl mx-auto px-10 lg:px-0',
})``

const Grid = styled.div.attrs({
  className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10',
})``

const PokemonItem = styled.div.attrs({
  className:
    'break-inside-avoid-column flex flex-col items-center border border-black rounded-xl',
})``

const StyledImage = styled(Image)`
  max-width: 100%;
  height: 300px; /* Fixed height */
  object-fit: cover; /* Maintain aspect ratio and cover container */
`

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: async () => await fetchPokemonByName(searchQuery),
    queryKey: ['pokemon', searchQuery],
  })

  const handleSearch = async (e: any) => {
    e.preventDefault()
    await refetch()
  }

  return (
    <Container>
      <form onSubmit={handleSearch} className="w-full flex my-10">
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search Pokémon"
          className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-400 to-indigo-800 text-white px-4 py-2 rounded-r-md"
        >
          Search
        </button>
      </form>
      {isLoading && <div>Loading</div>}
      {isError && <div>Sorry, there was an error</div>}
      {data && searchQuery.length === 0 && (
        <Grid>
          {data &&
            data[0]?.results?.map((pokemonItem: any, index: any) => {
              return (
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
                    <div className={'text-xl font-bold p-5'}>
                      {pokemonItem?.name}
                    </div>
                  </Link>
                </PokemonItem>
              )
            })}
        </Grid>
      )}

      {data && searchQuery.length > 0 && (
        <Grid>
          {data?.map((pokemonItem: any, index: any) => {
            return (
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
                  <div className={'text-xl font-bold py-5'}>
                    {pokemonItem?.name}
                  </div>
                </Link>
              </PokemonItem>
            )
          })}
        </Grid>
      )}
    </Container>
  )
}

export default Home
