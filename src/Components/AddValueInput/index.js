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
      API_TOKEN: 'hk67dLRdMrHCHWVK4OkTyDpobkfS5eTbjS4Li5By0sDg006rAtX6mW7QN20l',
    })
      .then(response => {
        languages = response.data;
        
        this.setState({
          suggestions: languages
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

    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Search',
      value,
      onChange: this.handleChange,
      onSubmit: this.onSubmit

    };

    return (
      <div >
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      </div>
    );
  }
}
