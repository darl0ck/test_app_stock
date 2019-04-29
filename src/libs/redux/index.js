import {
  combineReducers,
  createStore,
  applyMiddleware
} from 'redux';
import thunk from "redux-thunk";

const axios = require('axios')

// actions.js

export function fetchArticleDetails() {
  return function(dispatch) {
    return axios.get(`${window.location.origin}/data.json`).then(({ data }) => {
      localStorage.setItem('data', JSON.stringify(data));
      dispatch(activateDataLoad(data,false));
    });
  };
}

export const activateDataLoad = (data,loaded) => ({
  type: 'ACTIVATE_DATA',
  data: {data,
    loaded}
  
});


// reducers.js
export const data = (state = {}, action) => {
  switch (action.type) {
    case 'ACTIVATE_DATA':
      return action.data;
    default:
      return state;
  }
};

export const reducers = combineReducers({
  data,
});

// store.js
export function configureStore(initialState = {data: []}) {
  const store = createStore(reducers, initialState,applyMiddleware(thunk));
  return store;
};

export const store = configureStore();