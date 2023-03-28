import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// import React, { useMemo, useState } from 'react';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [searchPlanetName, setSearchPlanetName] = useState('');
  const [planetsFixed, setPlanetsFixed] = useState([]);
  const [columnFilter, setColumnFilter] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );
  const [comparisonFilter, setComparisonFilter] = useState(
    ['maior que', 'menor que', 'igual'],
  );

  // requisito 1
  const fetchData = async () => {
    const request = await fetch('https://swapi.dev/api/planets');
    const response = await request.json();
    const result = response.results;
    const resultPlanet = result.map((element) => {
      delete element.residents;
      return element;
    });
    setPlanets(resultPlanet);
    setPlanetsFixed(resultPlanet);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // requisito 2 Realizado com auxílio do Filipe Santana na monitoria. Foi necessário criar o setPlanetsFixed para realizar o filter. Se não fizesse dessa forma, após limpar a digitação, os planetas estariam apagados, ou seja, estava criando um resultado, apagando os resultados originais. o setPlanetFixed preserva as informações originais

  const handleSearchPlanetName = ({ target }) => {
    setSearchPlanetName(target.value);
  };
  useEffect(() => {
    const searchPlanets = planetsFixed.filter((planet) => planet
      .name.includes((searchPlanetName)));
    setPlanets(searchPlanets);
  }, [searchPlanetName, planetsFixed]);

  const exportValues = {
    planets,
    setPlanets,
    handleSearchPlanetName,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,

  };

  return (

    <AppContext.Provider value={ exportValues }>
      { children }
    </AppContext.Provider>

  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
