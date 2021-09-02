import React, { useState } from 'react';
import { Route } from 'react-router-dom'
import SearchForm from './components/SearchForm/Search.jsx'
import SearchResults from './components/SearchResults/SearchResults.jsx';
import About from './components/About/About.jsx';
import IngredientCart from './components/IngredientCart/IngredientCart.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import ErrorMessage from './components/SearchResults/ErrorMessage/ErrorMessage.jsx';
import Logo from './components/Logo/Logo.jsx';
import Header from './components/Header/Header.jsx';
import {EmptyListResults} from './components/EmptyResults';
import style from './components/style.module.css';

// Кнопки и формы более удобные, чем бутстрап: https://material-ui.com/components/buttons/

const App = (props) => {
  const [searchResults, setSearchResults] = useState({
    data: EmptyListResults,
    found:false
    });

    const show_results = () => {
      if (searchResults.data.product_ingredients) {
        return (<Route exact path='/search-results' component={() => <SearchResults data={searchResults} />} />)
      } 
      return (<ErrorMessage />);
    };

  return (
    <div className={style['app-wrapper']}>
      <Logo />
      <Navbar />
      <SearchForm setSearchResults={setSearchResults} />
      {show_results()}
        <Route path='/ingredient/:ingredientID' component={IngredientCart} />
        <Route exact path='/about' component={About} />
      <Footer />
    </div>
  )
};

export default App