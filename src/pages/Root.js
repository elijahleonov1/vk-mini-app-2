import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from '../store/reducers';

import App from './App';

const store = createStore(rootReducer, applyMiddleware(thunk));

const Root = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};
export default Root;
