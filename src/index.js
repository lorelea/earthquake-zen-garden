import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from 'src/store';

import 'src/index.scss';

import App from 'src/app';

// fetch siteConfig as soon as we can
import { fetchSiteConfig } from 'src/store/slices/site';
store.dispatch(fetchSiteConfig());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
