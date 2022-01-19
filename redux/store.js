<<<<<<< HEAD
import { createStore, applyMiddleware } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunk from 'redux-thunk'

import reducers from './reducers/reducers'

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }

    return applyMiddleware(...middleware)
}

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload
        }
        return nextState
    } else {
        return reducers(state, action)
    }
}

const initStore = () => {
    return createStore(reducer, bindMiddleware([thunk]))
}

export const wrapper = createWrapper(initStore)
=======
import { createStore, applyMiddleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";

import reducers from "./reducers/reducers";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }

  return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return reducers(state, action);
  }
};

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunk]));
};

export const wrapper = createWrapper(initStore);
>>>>>>> 3c80f1339543dfb371138ebe28b6f69fd4638a13
