import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  console.log(planets);
  const [searchPlanetName, setSearchPlanetName] = useState('');
  const [planetsFixed, setPlanetsFixed] = useState([]);

  const [arrayByColumns, setarrayByColumns] = useState([]);

  const [allFiltered, setAllFiltered] = useState([]);

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

  const handleSearchPlanetName = ({ target }) => {
    setSearchPlanetName(target.value);
  };

  const searchPlanets = (array) => {
    if (searchPlanetName === '') return array;
    return array.filter((planet) => planet.name.includes(searchPlanetName));
  };

  const columnFiltered = (array) => {
    let currentArray = array;

    if (arrayByColumns.length === 0) return array;

    arrayByColumns.forEach((e) => {
      if (e.actualComparison === 'maior que') {
        currentArray = currentArray
          .filter((planet) => Number(planet[e.actualColum]) > Number(e.valorNume));
      } else if (e.actualComparison === 'menor que') {
        currentArray = currentArray
          .filter((planet) => Number(planet[e.actualColum]) < Number(e.valorNume));
      } else if (e.actualComparison === 'igual a') {
        currentArray = currentArray
          .filter((planet) => Number(planet[e.actualColum]) === Number(e.valorNume));
      }
    });
    return currentArray;
  };

  useEffect(() => {
    const filteredByName = searchPlanets(planetsFixed);
    const filteredByColumn = columnFiltered(filteredByName);

    setAllFiltered(filteredByColumn);
  }, [searchPlanetName, planetsFixed, arrayByColumns]);

  const exportValues = {

    searchPlanetName,
    handleSearchPlanetName,

    arrayByColumns,
    setarrayByColumns,
    allFiltered,
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

// requisito 2 Realizado com auxílio do Filipe Santana na monitoria. Foi necessário criar o setPlanetsFixed para realizar o filter. Se não fizesse dessa forma, após limpar a digitação, os planetas estariam apagados, ou seja, estava criando um resultado, apagando os resultados originais. O setPlanetFixed preserva as informações originais
// requisito 3/4 Em monitoria e com auxílio do colega Raphael, foi refatorada a logica, para que a mudança de estado ocorra no componente, localmente e depois, entrasse no if novamente.Alem disso, dentro do useEffect, vai acontecendo a logica de filtros
