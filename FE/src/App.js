import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Route from './Route';
// store and reducer 
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers'
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);


class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <MuiThemeProvider>              
            <Route  />        
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
