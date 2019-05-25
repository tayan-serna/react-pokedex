// @vendors
import React from 'react';
import {
  Card,
  CardTitle,
  CardText
} from 'react-md';

const Pokemon = ({ pokemon, history }) => {
  const newUrl = history.location.pathname === '/pokemons'
    ? `pokemon/${pokemon.id}`
    : `/pokemon/${pokemon.id}`
  return (
  <Card
    key={pokemon.id}
    className="pokemon-list-container__pokemon-card"
    onClick={() => history.push(newUrl)}
  >
    <CardTitle
      className="pokemon-list-container__pokemon-card-title"
      title={`${pokemon.name} #${pokemon.id}`}
    />
    <CardText
      className="pokemon-list-container__pokemon-card-body"
    >
      <img
        alt={pokemon.name}
        className="pokemon-list-container__pokemon-card-image"
        src={pokemon.sprites.front_default}
      />
      <div className="pokemon-list-container__pokemon-card-type-container">
        {pokemon.types.map(type => (
          <span
            className="pokemon-list-container__pokemon-card-type"
            key={type.slot}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </CardText>
  </Card>
)};

export default Pokemon;
