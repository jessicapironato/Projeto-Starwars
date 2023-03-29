import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';
// import React, { useMemo, useState } from 'react';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [searchPlanetName, setSearchPlanetName] = useState('');
  const [planetsFixed, setPlanetsFixed] = useState([]);
  const [columnFilter, setColumnFilter] = useState('');
  const [comparisonFilter, setComparisonFilter] = useState('');

  const [button, setButton] = useState(false);

  const [valorNumerico, setValorNumerico] = useState(null);
  const [actualSelector, setActualSelector] = useState({
    column: 'population',
    comparison: 'maior que',

  });

  // requisito 1
  const fetchData = async () => {
    const request = await fetch('https://swapi.dev/api/planets');
    const response = await request.json();
    const result = response.results;
    console.log(response.results);
    const resultPlanet = result.map((element) => {
      delete element.residents;
      return element;
    });
    setPlanets(resultPlanet);
    setPlanetsFixed(resultPlanet);
  };

  // useEffect(() => {
  //   const filters = planetsFixed.filter((planet) => {
  //     const allFilters =

  //   });
  // }, []);

  useEffect(() => {
    fetchData();
  }, []);

  // requisito 2 Realizado com auxílio do Filipe Santana na monitoria. Foi necessário criar o setPlanetsFixed para realizar o filter. Se não fizesse dessa forma, após limpar a digitação, os planetas estariam apagados, ou seja, estava criando um resultado, apagando os resultados originais. O setPlanetFixed preserva as informações originais
  // requisito 3 Realizado com auxílio de colega Allex. Foi necessaŕio colocar a lógica  de filtors dentro do useEffect

  const handleButtonClick = useCallback(() => {
    setButton(true);
  }, []);

  const handleSearchPlanetName = ({ target }) => {
    setSearchPlanetName(target.value);
  };

  useEffect(() => {
    const searchPlanets = [...planetsFixed].filter((planet) => {
      const filterByName = planet.name.includes((searchPlanetName));
      let filterByColumn = true;

      if (comparisonFilter === 'maior que') {
        filterByColumn = Number(planet[columnFilter])
            > Number(valorNumerico);
      } else if (comparisonFilter === 'menor que') {
        filterByColumn = Number(planet[columnFilter])
            < Number(valorNumerico);
      } else if (comparisonFilter === 'igual a') {
        filterByColumn = Number(planet[columnFilter])
            === Number(valorNumerico);
      }

      return filterByName && filterByColumn;
    });
    setPlanets(searchPlanets);
  }, [searchPlanetName,
    planetsFixed,
    columnFilter,
    comparisonFilter,
    valorNumerico,
    handleButtonClick,
  ]);

  const exportValues = {
    planets,
    setPlanets,
    handleSearchPlanetName,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    button,
    setButton,
    setValorNumerico,
    handleButtonClick,
    valorNumerico,
    actualSelector,
    setActualSelector,

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
