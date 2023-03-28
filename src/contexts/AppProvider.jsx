import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// import React, { useMemo, useState } from 'react';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const fetchData = async () => {
    const request = await fetch('https://swapi.dev/api/planets');
    const response = await request.json();
    const result = response.results;
    const resultPlanet = result.map((element) => {
      delete element.residents;
      return element;
    });
    setPlanets(resultPlanet);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (

    <AppContext.Provider value={ { planets } }>
      { children }
    </AppContext.Provider>

  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
