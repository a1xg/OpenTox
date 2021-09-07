import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom'
import SearchForm from './components/SearchForm/SearchForm.jsx'
import SearchResults from './components/SearchResults/SearchResults.jsx';
import About from './components/About/About.jsx';
import IngredientCart from './components/IngredientCart/IngredientCart.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Logo from './components/Logo/Logo.jsx';
import Header from './components/Header/Header.jsx';
//import { EmptyListResults } from './components/EmptyResults';
import style from './App.module.css';
import { Button, TextField, Paper, Container, Grid } from '@material-ui/core';
import Search from '@material-ui/icons/Search';

const App = (props) => {
  const [searchQuery, setQuery] = useState()
  const [searchResults, setSearchResults] = useState();

  useEffect(() => {
    console.log('QUERY:', searchQuery)
    if (searchQuery) {
      fetch(searchQuery.url, searchQuery.options)
      .then(response => { return response.json(); })
      .then((data) => {
        if (data.text) {
          setSearchResults({loaded: 'error'})
        } else {
          if (data.product_ingredients.length == 0) {
            setSearchResults({loaded: 'error', })
          } else {
            setSearchResults({loaded: true, data:data})
          }
        }
      })
    } else {
      setSearchResults({loaded:false})
    }
  }, [searchQuery]);

  return (
    <div className={style['app-wrapper']}>
      <Logo />
      <Navbar />
      <Grid>
        <Paper style={{ height: 100, width: 100, }}>
          <Button size='small' />
        </Paper>
      </Grid>
      <SearchForm path='/' setQuery={setQuery} />
      <Route exact path='/search-results' component={() => <SearchResults searchResults={searchResults} />} />
      <Route path='/ingredient/:ingredientID' component={IngredientCart} />
      <Route exact path='/about' component={About} />
      <Footer />
    </div>
  )
};

export default App;