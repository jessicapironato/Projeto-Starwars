import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// import React, { useMemo, useState } from 'react';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [searchPlanetName, setSearchPlanetName] = useState('');
  const [planetsFixed, setPlanetsFixed] = useState([]);

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
    console.log(searchPlanets);
  }, [searchPlanetName, planetsFixed]);

  return (

    <AppContext.Provider value={ { planets, handleSearchPlanetName } }>
      { children }
    </AppContext.Provider>

  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
