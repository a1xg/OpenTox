import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import SearchForm from './components/SearchForm/SearchForm.jsx'
import SearchResultsContainer from './components/SearchResults/SearchResultsContainer.jsx';
import About from './components/About/About.jsx';
import IngredientContainer from './components/Ingredient/IngredientContainer.jsx';
import SideBar from './components/SideBar/SideBar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Logo from './components/Logo/Logo.jsx';
import Header from './components/Header/Header.jsx';
import style from './App.module.css';
import { Container, Grid, Box, useScrollTrigger, createTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// TODO Сделать очистку searchQuery и searchResults
// TODO вынести Paper в вызываемые компоненты, а компоненты в свою очередь оборачивать в единый для всех ItemCart
// TODO Уменьшить ширину app.container до 1024
// * useScrollTrigger  для переключения строки поиска в appbar при скролле


const useStyles = makeStyles((theme) => ({
  app: {
    backgroundColor: '#EFFFF3',
    height:'100%',
  }
}));

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
              setSearchResults({ loaded: true, data: data });
            }
          }
        })
    } else {
      setSearchResults({ loaded: false })
    }
  }, [searchQuery]);

  return (
    <Container maxWidth={'xl'} className={classes.app}>
      <Grid container spacing={3} >
        <Grid item xs={12} >
          <SideBar />
        </Grid>
        <Grid item xs={12} >
          <Grid
            container
            alignItems="center"
            justifyContent="center">
            <SearchForm path='/' setQuery={setQuery} />
          </Grid>
        </Grid>
        <Grid item xs={12} >
          <Container maxWidth={'lg'}> 
            <Route exact path='/search-results' component={() => <SearchResultsContainer searchResults={searchResults} />} />
            <Route path='/ingredient/:ingredientID' component={IngredientContainer} />
            <Route exact path='/about' component={About} />
          </Container>
        </Grid>
        <Grid item xs={12} >
          <Container maxWidth={'lg'}>
            <Footer />
          </Container>
        </Grid>
      </Grid>
    </Container>
  )
};

export default App;