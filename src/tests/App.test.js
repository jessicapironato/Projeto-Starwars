import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import helper from './helper';

describe('Testa os elementos da página Table', () => {
  test('1.Testa a renderização da página', () => {
    render(<App />);
  
  
    const title = screen.getByText(/Project Starwars Planets Search/i);
    const namePlanet = screen.getAllByText(/Name/i);
    const rotationPlanet = screen.getByText(/Rotation Period/i);
    const orbitalPlanet = screen.getByText(/Orbital Period/i)
    const diameterPlanet = screen.getByText("Diameter")
    const gravityPlanet = screen.getByText(/Gravity/i)
    const terrainPlanet = screen.getByText(/Terrain/i)
    const surfacePlanet = screen.getByText(/Surface Water/i)
    const populationPlanet = screen.getByText("Population")
    const filmsPlanet = screen.getByText(/Films/i)
    const createdPlanet = screen.getByText(/Created/i)
    const editedPlanet = screen.getByText(/Edited/i)
    const urlPlanet = screen.getByText(/Url/i)
   
  
    expect(title).toBeInTheDocument();
    expect(namePlanet).toHaveLength(2)
    expect(namePlanet[1]).toBeInTheDocument()
    expect(rotationPlanet).toBeInTheDocument()
    expect(orbitalPlanet).toBeInTheDocument()
    expect(diameterPlanet).toBeInTheDocument()
    expect(gravityPlanet).toBeInTheDocument()
    expect(terrainPlanet).toBeInTheDocument()    
    expect(surfacePlanet).toBeInTheDocument()
    expect(populationPlanet).toBeInTheDocument()
    expect(filmsPlanet).toBeInTheDocument()
    expect(createdPlanet).toBeInTheDocument()
    expect(editedPlanet).toBeInTheDocument()
    expect(urlPlanet).toBeInTheDocument()
  });

  test('2.Testa existencia de inputs e botões', () => {
    render(<App />);
      
    const nameFilter = screen.getByTestId('name-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');
    const btnRemoveFilters = screen.getByTestId('button-remove-filters');
  
    expect(nameFilter).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(btnFilter).toBeInTheDocument();
    expect(btnRemoveFilters).toBeInTheDocument();
       
  });

  test('3. Testa se o retorno do conteúdo da API é renderizado', async () => {

    jest.spyOn(global, 'fetch');
  
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(helper),
      });
  
    render(<App />);
  
    const tatooinePlanet = await screen.findByText(/Tatooine/i);
    const alderaanPlanet = await screen.findByText(/Alderaan/i);
    const yavinPlanet = await screen.findByText(/Yavin IV/i);
    const hothPlanet = await screen.findByText(/Hoth/i);
    const dagobahPlanet = await screen.findByText(/Dagobah/i);
    const bespinPlanet = await screen.findByText(/Bespin/i);
    const endorPlanet = await screen.findByText(/Endor/i);
    const nabooPlanet = await screen.findByText(/Naboo/i);
    const coruscantPlanet = await screen.findByText(/Coruscant/i);
    const kaminoPlanet = await screen.findByText(/Kamino/i);
  
    expect(tatooinePlanet).toBeVisible();
    expect(alderaanPlanet).toBeVisible();
    expect(yavinPlanet).toBeVisible();
    expect(hothPlanet).toBeVisible();
    expect(dagobahPlanet).toBeVisible();
    expect(bespinPlanet).toBeVisible();
    expect(endorPlanet).toBeVisible();
    expect(nabooPlanet).toBeVisible();
    expect(coruscantPlanet).toBeVisible();
    expect(kaminoPlanet).toBeVisible();
  });

  test('4. Testa se ao digitar Ta no input name, o nome correspondente é renderizado', async () => {

    jest.spyOn(global, 'fetch');
  
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(helper),
      });
  
    render(<App />);

    const nameFilter = screen.getByTestId('name-filter');
    expect(nameFilter).toBeInTheDocument();

    const tatooinePlanet = await screen.findByText(/Tatooine/i);
    expect(tatooinePlanet).toBeVisible();

    const yavinPlanet = await screen.findByText(/Yavin IV/i);
    expect(yavinPlanet).toBeVisible();

    userEvent.type(nameFilter, 'Ta')

    expect(tatooinePlanet).toBeInTheDocument();
    expect(yavinPlanet).not.toBeInTheDocument();
  
    
  
    
  });

  test('5.Testa funcionabilidade dos filtros', async () => {

    jest.spyOn(global, 'fetch');
  
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(helper),
      });
  
    render(<App />);
  
    const valueFilter = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    expect(valueFilter).toBeInTheDocument();
    expect(btnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
  
    const allPlanets = await screen.findAllByTestId('planet')
    expect(allPlanets).toHaveLength(10)
  
    userEvent.type(valueFilter, '2000');
    userEvent.selectOptions(comparisonFilter, 'menor que')
    userEvent.click(btnFilter);


    const allPlanets2 = await screen.findAllByTestId('planet')
    expect(allPlanets2).toHaveLength(1)

  
    
  });

  




})

