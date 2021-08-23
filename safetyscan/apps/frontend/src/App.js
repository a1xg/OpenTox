import React, { useState } from 'react';
import { render } from "react-dom";
import TextForm from './components/TextForm/TextForm.jsx';
import ImageForm from './components/ImageForm/ImageForm.jsx';
import SearchResults from './components/SearchResults/SearchResults.jsx';
import ProductHazardTable from './components/ProductHazardTable/ProductHazardTable.jsx';
import EmptyListResults from './components/EmptyResults'

function App () {
  // определяем результат поиска и функцию управления его состоянием
  const [searchResults, setSearchResults] = useState({
    data: EmptyListResults,
    found:false
    });
  
  console.log('App searchResults', searchResults)
  return (
    <div className="container">
      <TextForm setSearchResults={setSearchResults} />
      <ImageForm setSearchResults={setSearchResults} />

      { searchResults.found &&
      <div>
        <ProductHazardTable data={searchResults.data} />
        <SearchResults data={searchResults.data} />
      </div>
      }

    </div>
  );

}

export default App;

const container = document.getElementById("app");
render(<App />, container);
