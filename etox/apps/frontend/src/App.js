import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom'
import SearchForm from './components/SearchForm/SearchForm.jsx'
import SearchResults from './components/SearchResults/SearchResults.jsx';
import About from './components/About/About.jsx';
import Ingredient from './components/Ingredient/Ingredient.jsx';
import SideBar from './components/SideBar/SideBar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Logo from './components/Logo/Logo.jsx';
import Header from './components/Header/Header.jsx';
import style from './App.module.css';
import { Container, Grid, Paper, useScrollTrigger } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// * useScrollTrigger  для переключения строки поиска в appbar при скролле
// * у https://devexpress.github.io/ есть еще неплохие гриды 
// * для вывода табличных данных с встроенными графиками и пагинацией

const useStyles = makeStyles((theme) => ({
  app: {
    backgroundColor: '#EFFFF3',
  }
}));
// !TODO Сделать очистку searchQuery и searchResults
const App = (props) => {
  const classes = useStyles();
  const [searchQuery, setQuery] = useState();
  const [searchResults, setSearchResults] = useState();

  useEffect(() => {
    if (searchQuery) {
      setSearchResults({ loaded: false });
      fetch(searchQuery.url, searchQuery.options)
        .then(response => { return response.json(); })
        .then((data) => {
          if (data.text) {
            setSearchResults({ loaded: 'error' })
          } else {
            if (data.product_ingredients.length == 0) {
              setSearchResults({ loaded: 'error', })
            } else {
              setSearchResults({ loaded: true, data: data })
            }
          }
        })
    } else {
      setSearchResults({ loaded: false })
    }
  }, [searchQuery]);

  return (
    <Container maxWidth={'xl'} className={classes.app}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SideBar />
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            alignItems="center"
            justifyContent="center">
            <SearchForm path='/' setQuery={setQuery} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth={'lg'}>
            <Route exact path='/search-results' component={() => <SearchResults searchResults={searchResults} />} />
            <Route path='/ingredient/:ingredientID' component={Ingredient} />
            <Route exact path='/about' component={About} />
          </Container>
        </Grid>
        <Footer />
      </Grid>
    </Container>
  )
};

export default App;