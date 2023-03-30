import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../contexts/AppContext';

export default function Table() {
  const {
    searchPlanetName,
    handleSearchPlanetName,
    arrayByColumns, setarrayByColumns,
    allFiltered,
    columnFilter,
  } = useContext(AppContext);

  const [valorNume, setValorNum] = useState(0);
  const [actualColum, setActualColum] = useState('population');
  const [actualComparison, setActualComparison] = useState('maior que');

  useEffect(() => {
    setActualColum(columnFilter[0]);
  }, [columnFilter]);

  const handleChangeNum = (event) => {
    setValorNum(event.target.value);
  };

  const handleChangeActualColum = (event) => {
    setActualColum(event.target.value);
  };

  const handleChangeActualComparison = (event) => {
    setActualComparison(event.target.value);
  };

  const handleClick = () => {
    const columnInfo = {
      actualColum,
      actualComparison,
      valorNume,
    };
    setarrayByColumns([...arrayByColumns, columnInfo]);
  };

  const removeOne = (col) => {
    const arrayByColumns2 = arrayByColumns
      .filter((element) => element.actualColum !== col);
    setarrayByColumns(arrayByColumns2);
  };

  const removeEverthing = () => {
    setarrayByColumns([]);
  };

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
          value={ actualColum }
          onChange={ handleChangeActualColum }
        >
          { columnFilter.map((colum) => (
            <option
              key={ colum }
              value={ colum }
            >
              {colum }
            </option>))}
        </select>
      </label>

      <label htmlFor="comparison-filter">
        Operador
        <select
          data-testid="comparison-filter"
          name="comparison"
          value={ actualComparison }
          onChange={ handleChangeActualComparison }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>

      <label
        htmlFor="value-filter"
      >
        <input
          data-testid="value-filter"
          name="valorNumerico"
          type="number"
          value={ valorNume }
          onChange={ handleChangeNum }
        />
      </label>

      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleClick }
      >
        FILTRAR
      </button>

      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ removeEverthing }
      >
        Remover todas filtragens
      </button>

      {
        arrayByColumns.map((element) => (
          <p
            key={ element.actualColum }
            data-testid="filter"
          >
            {element.actualColum}

            {element.actualComparison}

            {element.valorNume}

            <button
              type="button"
              onClick={ () => removeOne(element.actualColum) }
            >
              Remover
            </button>
          </p>
        ))
      }

      <hr />

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
          {allFiltered.map((planet, index) => (
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
