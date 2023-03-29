import React, { useContext } from 'react';
import AppContext from '../contexts/AppContext';

export default function Table() {
  const {
    planets,
    searchPlanetName,
    handleSearchPlanetName,
    comparisonFilter,
    columnFilter,
    handleButtonClick,
    valorNumerico,
    setValorNumerico,
    actualSelector,
    setActualSelector } = useContext(AppContext);

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

      <label htmlFor="column-filter">
        Coluna
        <select
          data-testid="column-filter"
          name="column"
          value={ actualSelector.column }
          onChange={ ({ target }) => setActualSelector(
            { ...actualSelector, [target.name]: target.value },
          ) }
        >
          {columnFilter.map(
            (colum) => <option key={ colum } value={ colum }>{colum}</option>,
          )}
        </select>
      </label>

      <label htmlFor="comparison-filter">
        Operador
        <select
          data-testid="comparison-filter"
          name="comparison"
          value={ actualSelector.comparison }
          onChange={ ({ target }) => setActualSelector(
            { ...actualSelector, [target.name]: target.value },
          ) }
        >
          {comparisonFilter.map(
            (operator) => <option key={ operator } value={ operator }>{operator}</option>,
          )}
        </select>
      </label>

      <label
        htmlFor="value-filter"
      >
        <input
          data-testid="value-filter"
          name="valorNumerico"
          type="number"
          value={ valorNumerico }
          onChange={ ({ target }) => setValorNumerico(target.value) }
        />
      </label>

      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleButtonClick }
      >
        FILTRAR
      </button>

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
