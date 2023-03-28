import React, { useContext } from 'react';
import AppContext from '../contexts/AppContext';

export default function Table() {
  const { planets, searchPlanetName, handleSearchPlanetName } = useContext(AppContext);

  return (
    <>
      <h1>Project Starwars Planets Search</h1>
      <label htmlFor="name">
        Name
        <input
          data-testid="name-filter"
          type="text"
          name="name"
          value={ searchPlanetName }
          onChange={ handleSearchPlanetName }
        />

      </label>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((planet, index) => (
            <tr key={ index }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>))}
        </tbody>
      </table>
    </>

  );
}
