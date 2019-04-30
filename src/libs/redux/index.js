/* eslint-disable no-case-declarations */
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// actions.js

export function fetchArticleDetails (data) {
  return function (dispatch) {
    dispatch(activateDataLoad(data));
  };
}

export function fillFromLocalStorage (data) {
  return function (dispatch) {
    dispatch(fillCompany(data));
  };
}

export function deleteContact(id) {
  return function (dispatch) {
    dispatch(remove(id));
  };
}

export function updateData(data) {
  return function (dispatch) {
    dispatch(update(data));
  };
}

export const remove = (id) => {
  return {
      type: 'REMOVE',
      id: id
  };
};

export const activateDataLoad = data => ({
  type: 'ACTIVATE_DATA',
  data: data
});

export const update = data => ({
  type: 'UPDATE_DATA',
  data: data
});

export const fillCompany = data => {
  return {
    type: 'FILL_FROM_LOCALSTORAGE',
    data: data
  };
};

// reducers.js
export const data = (state = [], action) => {
  switch (action.type) {
    case 'ACTIVATE_DATA':
      console.info(action.data);
      let newData = [...state, Object.assign({}, action.data)];
      localStorage.setItem('data', JSON.stringify(newData));

      return newData;

    case 'FILL_FROM_LOCALSTORAGE':
      let data = JSON.parse(localStorage.getItem('data'));
      state = data;

      return data;

    case 'REMOVE':
    let filtered = state.filter((data, i) => i !== action.id);
    localStorage.setItem('data', JSON.stringify(filtered));
    return filtered;

    case 'UPDATE_DATA':
    state = action.data;

    localStorage.setItem('data', JSON.stringify(state));


    return state;

    default:
      return state;
  }
};

export const reducers = combineReducers({
  data
});

// store.js
export function configureStore (initialState = { data: [] }) {
  const store = createStore(reducers, initialState, applyMiddleware(thunk));
  return store;
}

export const store = configureStore();
