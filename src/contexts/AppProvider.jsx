import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [searchPlanetName, setSearchPlanetName] = useState('');
  const [planetsFixed, setPlanetsFixed] = useState([]);
  const [columnFilter, setColumnFilter] = useState('');
  const [comparisonFilter, setComparisonFilter] = useState('');
  const [valorNumerico, setValorNumerico] = useState(null);

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
  ]);

  const exportValues = {
    planets,
    searchPlanetName,
    handleSearchPlanetName,
    setValorNumerico,
    setColumnFilter,
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

// requisito 2 Realizado com auxílio do Filipe Santana na monitoria. Foi necessário criar o setPlanetsFixed para realizar o filter. Se não fizesse dessa forma, após limpar a digitação, os planetas estariam apagados, ou seja, estava criando um resultado, apagando os resultados originais. O setPlanetFixed preserva as informações originais
// requisito 3 Realizado com auxílio de colega Allex. Foi necessaŕio colocar a lógica  de filtors dentro do useEffect. Em monitoria, foi refatorada a logica, para que a mudança de estado ocorra no componente, localmente e depois, entrasse no if novamente.
