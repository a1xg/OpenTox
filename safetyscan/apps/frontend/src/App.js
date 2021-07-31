import React, { Component } from 'react';
import { render } from "react-dom";
import TextForm from './components/TextForm/TextForm.jsx';
import ImageForm from './components/ImageForm/ImageForm.jsx';
import SearchResults from './components/SearchResults/SearchResults.jsx';
import ProductHazardTable from './components/ProductHazardTable/ProductHazardTable.jsx';
import EmptyListResults from './components/EmptyResults.js';
import { data } from 'jquery';

// TODO: пробросить данные из формы в запрос.

class App extends Component {
  constructor(props) {
    super(props);
    // пока данные не загружены используем заглушку
    this.state = {
      data: EmptyListResults,
      loaded: false,
      placeholder: "Loading"
    };
  }
  
  componentDidMount() {
    // содержимое запроса
    const textRequest = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'butanol, eugenol, water, methanol, butylparaben' })
    }

    fetch("api/test", textRequest)
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return {
              placeholder: "Something went wrong!"
            };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
  }
  
  render() {
     return (
      <div className="container">
        <TextForm />
        <ImageForm />
        <ProductHazardTable data={this.state.data} />
        <SearchResults data={this.state.data} />
      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
