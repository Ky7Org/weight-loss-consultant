import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import store from '../redux-flow/store';
const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback="loading">
          <WelcomePage />
        </Suspense>
      </Provider>
    </BrowserRouter>
  );
};
export default App;
