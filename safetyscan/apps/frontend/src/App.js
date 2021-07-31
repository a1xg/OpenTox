import React, { Component } from 'react';
import { render } from "react-dom";
import TextForm from './components/Forms/TextForm.jsx';
import ImageForm from './components/Forms/ImageForm.jsx';
import SearchResults from './components/SearchResults/SearchResults.jsx';
import { data } from 'jquery';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    const textRequest = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'butanol, eugenol, water, methanol, butylparaben' })
    };


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
        {/* <SearchResults data={this.state.data.product_ingredients }/> */}
        
        <ul>
          {this.state.data.product_ingredients.map(i => {
            return (
              <li key={i.id}>
                Name: {i.main_name}
                ID: {i.id}
              </li>
            );
          })}
        </ul> 
        
      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
