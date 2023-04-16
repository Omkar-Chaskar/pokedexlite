import React from "react";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import Image from "next/image";

function PokemonList({ pokemon }) {

    const getStyle = (type) => {
        switch(type){
            case "Ice" : return styles.Ice;
            case "Grass" : return styles.Grass;
            case "Water" : return styles.Water;
            case "Fire" : return styles.Fire;
            case "Flying" : return styles.Flying;
            case "Dragon" : return styles.Dragon;
            case "Normal" : return styles.Normal;
            case "Electric" : return styles.Electric;
            case "Ground" : return styles.Ground;
            case "Fairy" : return styles.Fairy;
            case "Fighting" : return styles.Fighting;
            case "Psychic" : return styles.Psychic;
            case "Rock" : return styles.Rock;
            case "Steel" : return styles.Steel;
            case "Ghost" : return styles.Ghost;
            case "Dark" : return styles.Dark;
            case "Bug" : return styles.Bug;
            case "Poison" : return styles.Poison;
        }
    }
  return (
    <li className={styles.card}>
      <Link href={`/pokemon/${(pokemon.id, pokemon.name)}`}>
        <div className={styles.cardheader}>
          <h3>#{pokemon?.number}</h3>
        </div>
        <div className={styles.cardheader}>
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={300}
            height={300}
          />
        </div>
        <div className={styles.cardbody}>
          <div className={styles.type}>
            {pokemon?.types &&
              pokemon.types.map((type, i) => {
                return (
                  <span className={styles.tag} id={getStyle(type)} key={i}>
                    {type}
                  </span>
                );
              })}
          </div>
          <h3>{pokemon?.name}</h3>
        </div>
      </Link>
    </li>
  );
}

export default PokemonList;
