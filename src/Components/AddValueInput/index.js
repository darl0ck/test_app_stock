import React, { Component } from 'react';

import Autosuggest from 'react-autosuggest';

import stockdata from 'stock-data.js';


let languages = [];

const renderSuggestion = suggestion => (
  <div>
    {`${suggestion.symbol}| ${suggestion.name}`}
  </div>
);

export default class AddValueInput extends Component {

  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  getSuggestionValue = suggestion => {
    
    this.props.onSubm(suggestion,this.resetInputValue);

    return suggestion.name;
  };


  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };



  onSuggestionsFetchRequested = ({ value }) => {

    stockdata.search({
      search_term: value,
      API_TOKEN: 'M2DQYMRuTSAQ5aN166eZfvt7PLYvPqEALhapbhVcsxLG2KuMojcOjJJSwXc6',
    })
      .then(response => {
        console.info(response.message,'res');
        languages = response.data;
        
        this.setState({
          suggestions: languages,
          message: response.message
        });

        return response.data;
      });
    
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  resetInputValue = () => {
    this.setState({
      value: ''
    });
  }

  render () {

    console.info(this.state);

    const { value, suggestions, message } = this.state;

    const inputProps = {
      placeholder: 'Search',
      value,
      onChange: this.handleChange,
      onSubmit: this.onSubmit

    };

    return (
      <div >
{     suggestions ?  <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      /> : message }
      </div>
    );
  }
}
