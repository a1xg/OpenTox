import React, { useState } from 'react';
import { Route } from 'react-router-dom'
import SearchForm from './components/SearchForm/SearchForm.jsx'
import SearchResults from './components/SearchResults/SearchResults.jsx';
import About from './components/About/About.jsx';
import IngredientCart from './components/IngredientCart/IngredientCart.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import ErrorMessage from './components/SearchResults/ErrorMessage/ErrorMessage.jsx';
import Logo from './components/Logo/Logo.jsx';
import Header from './components/Header/Header.jsx';
import {EmptyListResults} from './components/EmptyResults';
import style from './App.module.css';
import {Button, TextField, Paper, Container, Grid} from '@material-ui/core'; 
import Search from '@material-ui/icons/Search';

const App = (props) => {
  const [searchResults, setSearchResults] = useState({
    data: EmptyListResults,
    found:false
    });


  return (
    <div className={style['app-wrapper']}>
      <Logo />
      <Navbar />
      <Grid>
        <Paper style={{height: 100, width: 100, }}>
          <Button size='small'/>
        </Paper>
      </Grid>
      <SearchForm path='/' setSearchResults={setSearchResults} />
      <Route exact path='/search-results' component={() => <SearchResults data={searchResults} />} />
      <Route path='/ingredient/:ingredientID' component={IngredientCart} />
      <Route exact path='/about' component={About} />
      <Footer />



    </div>
  )
};

export default App