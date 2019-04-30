import React, { Component } from 'react';

import './App.less';

import { connect } from 'react-redux';

import { fetchArticleDetails, fillFromLocalStorage, deleteContact, updateData } from './libs/redux';
import AddValueInput from './Components/AddValueInput';
import StockCard from './Components/stockCard';
import { Button } from '@material-ui/core';
import stockdata from 'stock-data.js';

let symbols = new Set();
let autoUpdate = '';

class App extends Component {
  updateCompanyData = () => {
    return stockdata
      .realtime({
        symbols: Array.from(symbols),
        API_TOKEN: 'hk67dLRdMrHCHWVK4OkTyDpobkfS5eTbjS4Li5By0sDg006rAtX6mW7QN20l'
      })
      .then(response => {
        this.props.updateData(response.data);
      });
  }

  componentDidMount() {
    if (!this.props.data.length && localStorage.getItem('data')) {
      for (let el of JSON.parse(localStorage.getItem('data'))) {
        symbols.add(el.symbol);
      }
      this.updateCompanyData();
      this.props.fillFromLocalStorage();
    }
  }

  render () {
    return (
      <div className='container'>
        <Button
          onClick={async () => {
            await this.updateCompanyData();
          }}>
          Update Data
        </Button>

        <Button
          onClick={async () => {
            autoUpdate = await setInterval(async () => {
              return await this.updateCompanyData();
            }, 10 * 60000);
          }}>
          AutoUpdate Data with 10m
        </Button>

        <Button
          onClick={() => {
            window.clearInterval(autoUpdate);
          }}>
          Stop AutoUpdate
        </Button>

        <AddValueInput
          onSubm={(found, resetInputValue) => {
            onkeypress = e => {
              if (e.keyCode === 13) {
                e.preventDefault();
                symbols.add(found.symbol);
                resetInputValue();

                this.props.fetchArticleDetails(found);
              }
            };
          }}
        />

        {this.props.data.length ? <StockCard data={this.props.data} deleteContact={this.props.deleteContact} /> : null}
      </div>
    );
  }
}

const mapStateToProps = ({ data = [] }) => ({
  data
});

const mapDispatchToProps = {
  fetchArticleDetails,
  fillFromLocalStorage,
  deleteContact,
  updateData
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
