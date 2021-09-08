import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom'
import SearchForm from './components/SearchForm/SearchForm.jsx'
import SearchResults from './components/SearchResults/SearchResults.jsx';
import About from './components/About/About.jsx';
import IngredientCart from './components/IngredientCart/IngredientCart.jsx';
import SideBar from './components/SideBar/SideBar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Logo from './components/Logo/Logo.jsx';
import Header from './components/Header/Header.jsx';
import style from './App.module.css';
import {Container, Grid, Paper}  from '@material-ui/core';



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
    <Container>
      <div>
        <Logo />
        <SideBar />
        <Grid>
          <Paper style={{ height: 100, width: 400, }}>
            <SearchForm path='/' setQuery={setQuery} />
          </Paper>
        </Grid>
        <Route exact path='/search-results' component={() => <SearchResults searchResults={searchResults} />} />
        <Route path='/ingredient/:ingredientID' component={IngredientCart} />
        <Route exact path='/about' component={About} />
        <Footer />
      </div>
    </Container>
  )
};

export default App;