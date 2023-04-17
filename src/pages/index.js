import { useState } from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar";
import PokemonList from "@/components/PokemonList";
import { useQuery, gql, ApolloClient, InMemoryCache } from "@apollo/client";
import Pagination from "@/components/Pagination";

const GET_POKEMON_LIST = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      types
      image
    }
  }
`;

const POKEMON_PER_PAGE = 20;

const client = new ApolloClient({
  uri: "https://graphql-pokemon2.vercel.app/",
  cache: new InMemoryCache(),
});

export default function Home({ pokemons }) {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_POKEMON_LIST, {
    skip: page < 4,
    variables: {
      first: page * POKEMON_PER_PAGE , // fetch the first 60 Pokemons to statically generate the first 3 pages
    },
  });

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    // show loading message only for the first 3 pages
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const start = (page - 1) * POKEMON_PER_PAGE;
  const end = page * POKEMON_PER_PAGE;
  const currentPagePokemons = page < 4 ? pokemons.slice(start, end) : data.pokemons.slice(start, end);

  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokemon details with Pokedex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Navbar />
        <h1 className={styles.title}>Welcome to the Pokedex</h1>
        <ul className={styles.list}>
          {currentPagePokemons.map((pokemon) => {
            return <PokemonList pokemon={pokemon} key={pokemon.id} />;
          })}
        </ul>
        <Pagination
          currentPage={ page }
          onPageChange={handlePageChange}
          totalPages={Math.ceil((page<= 3?pokemons.length:data.pokemons.length) / POKEMON_PER_PAGE)}
          setPage={setPage}
        />
      </main> 
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_POKEMON_LIST,
    variables: {
      first: POKEMON_PER_PAGE * 3, // fetch the first 60 Pokemons to statically generate the first 3 pages
    },
  });

  return {
    props: {
      pokemons: data.pokemons,
    },
  };
}
