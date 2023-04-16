import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { gql } from "apollo-boost";
import Link from "next/link";
import styles from "@/styles/Detail.module.css";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import PokemonList from "@/components/PokemonList";

const GET_POKEMON = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
      evolutions {
        id
        number
        name
        image
      }
    }
  }
`;

const PokemonDetail = () => {
  const [showEvolution, setShowEvolution] = useState(false);
  const router = useRouter();
  const { id, name } = router.query;
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: {
      id,
      name,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error?.message}</div>;

  const pokemon = data.pokemon;

  const handleShowEvolutions = () => {
    setShowEvolution(!showEvolution);
  };

  const handleGoBack = () => {
    router.back();
  };

  console.log(pokemon.evolutions);

  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <div className={styles.navigation}>
          <button className={styles.navButton} onClick={handleGoBack}>
            Go Back
          </button>
          <Link className={styles.navButton} href="/">
            Home
          </Link>
        </div>
        <div className={styles.container}>
          <h1 className={styles.name}>{pokemon.name}</h1>
          <div className={styles.imageContainer}>
            <Image
              className={styles.img}
              src={pokemon.image}
              alt={pokemon.name}
              width={300}
              height={300}
            />
          </div>
          <div className={styles.detailsContainer}>
            <div className={styles.detailsRow}>
              <div className={styles.detailsTitle}>Height:</div>
              <div className={styles.detailsValue}>
                {pokemon.height.minimum} - {pokemon.height.maximum}
              </div>
            </div>
            <div className={styles.detailsRow}>
              <div className={styles.detailsTitle}>Weight:</div>
              <div className={styles.detailsValue}>
                {pokemon.weight.minimum} - {pokemon.weight.maximum}
              </div>
            </div>
            <div className={styles.detailsRow}>
              <div className={styles.detailsTitle}>Classification:</div>
              <div className={styles.detailsValue}>
                {pokemon.classification}
              </div>
            </div>
            <div className={styles.detailsRow}>
              <div className={styles.detailsTitle}>Type:</div>
              <div className={styles.detailsValue}>
                {pokemon.types.join(" | ")}
              </div>
            </div>
            <div className={styles.detailsRow}>
              <div className={styles.detailsTitle}>Weakness:</div>
              <div className={styles.detailsValue}>
                {pokemon.weaknesses.join(" | ")}
              </div>
            </div>
            <div className={styles.detailsRow}>
              <div className={styles.detailsTitle}>Resistance:</div>
              <div className={styles.detailsValue}>
                {pokemon.resistant.join(" | ")}
              </div>
            </div>
            <button className={styles.button} onClick={handleShowEvolutions}>
              {showEvolution ? "Close Evolutions" : "Show Evolutions"}
            </button>
            {showEvolution && (
              <div>
                {pokemon.evolutions && pokemon.evolutions.length > 0 ? (
                  <ul className={styles.list}>
                    {pokemon.evolutions.map((evolution) => (
                      <PokemonList pokemon={evolution}  key={evolution.id}/>
                    ))}
                  </ul>
                ) : (
                  <p>No evolutions found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonDetail;
