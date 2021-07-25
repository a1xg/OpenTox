import React, { Component } from 'react';
import { render } from "react-dom";


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
    fetch("/api/test")
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
      <ul>
        {this.state.data.map((i) => {
          return (
            <li key={i.description}>
             {i.hazard_class} -
             {i.abbreviation} -
             {i.hazard_category} -
             {i.ghs_code} -
             {i.description} -
             {i.confirmed_status} -
             {i.hazard_scale_score} -
             {i.number_of_notifiers} -
            </li>
          );
        })}
      </ul>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
