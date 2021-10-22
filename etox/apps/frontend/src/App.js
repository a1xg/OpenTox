import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom'
import Container  from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/core/styles';
import SearchForm from './components/SearchForm/SearchForm.jsx';
import SearchResultsContainer from './components/SearchResults/SearchResultsContainer.jsx';
import About from './components/About/About.jsx';
import IngredientContainer from './components/Ingredient/IngredientContainer.jsx';
import SideBar from './components/SideBar/SideBar.jsx';
import Footer from './components/Footer/Footer.jsx';
import HowUse from './components/HowUse/HowUse.jsx';
import Contacts from './components/Contacts/Contacts.jsx';
import customTheme from './components/CustomTheme/CustomTheme.jsx';
import useStyles from './AppStyles.js';

// * useScrollTrigger  для переключения строки поиска в appbar при скролле
// TODO проверить правильность и грамматику title, tooltip итд
// TODO сделать мобильную версию сайта, возможно придется написать отдельные гриды для мобильной версии

const App = (props) => {
  const classes = useStyles();
  const [searchQuery, setQuery] = useState();
  const [searchResults, setSearchResults] = useState();
  const [backButton, setBackButton] = useState(false);

  useEffect(() => {
    document.title = 'OpenTox';
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
      <Container maxWidth={'xl'} className={classes.appContainer}>
        <Grid container spacing={0} direction='row' className={classes.grid}>
          <Grid item xs={12} className={classes.headerWrapper}>
            <SideBar />
          </Grid>
          <Grid item xs={12} className={classes.searchWrapper}>
            <Grid item container
              alignItems="center"
              justifyContent="center"
              >
              <SearchForm path='/' setQuery={setQuery} />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.contentWrapper}>
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
          </Grid>
          <Grid item xs={12} className={classes.footerWrapper}>
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