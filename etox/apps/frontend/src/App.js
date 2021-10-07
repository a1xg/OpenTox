import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom'
import { Container, Grid, useScrollTrigger, makeStyles, ThemeProvider } from '@material-ui/core';
import SearchForm from './components/SearchForm/SearchForm.jsx'
import SearchResultsContainer from './components/SearchResults/SearchResultsContainer.jsx';
import About from './components/About/About.jsx';
import IngredientContainer from './components/Ingredient/IngredientContainer.jsx';
import SideBar from './components/SideBar/SideBar.jsx';
import Footer from './components/Footer/Footer.jsx';
import HowUse from './components/HowUse/HowUse.jsx';
import Contacts from './components/Contacts/Contacts.jsx';
import customTheme from './components/CustomTheme/CustomTheme.jsx';

// * useScrollTrigger  для переключения строки поиска в appbar при скролле

const useStyles = makeStyles((theme) => ({
  app: {
    backgroundColor: theme.palette.grey[100],
    minHeight: '100vh',
    display: 'flex',
    flex: '1'
  }
}));

const App = (props) => {
  const classes = useStyles();
  const [searchQuery, setQuery] = useState();
  const [searchResults, setSearchResults] = useState();
  const [backButton, setBackButton] = useState(false);

  useEffect(() => {
    document.title = 'Etox';
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
              setBackButton(true);
            }
          }
        })
    } else {
      setSearchResults({ loaded: false })
    }
  }, [searchQuery]);

  return (
  <ThemeProvider theme={customTheme}>
    <Container maxWidth={'xl'} className={classes.app} >
      <Grid container spacing={3} direction='row'>
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
            <Route
              exact path='/search-results'
              component={() => <SearchResultsContainer searchResults={searchResults} />}
            />
            <Route
              path='/ingredient/:ingredientID'
              component={(props) => <IngredientContainer data={props} backButton={backButton} />}
            />
            <Route exact path='/about' component={About} />
            <Route exact path='/how-use' component={HowUse} />
            <Route exact path='/contacts' component={Contacts} />
          </Container>
        </Grid>
        <Grid item xs={12} >
          <Container maxWidth={'lg'}>
            <Footer />
          </Container>
        </Grid>
      </Grid>
    </Container>
  </ThemeProvider>
  )
};

export default App;