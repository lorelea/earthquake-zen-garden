import { combineReducers } from 'redux';

import siteReducer from './slices/site';
import profileReducer from './slices/profile';
import earthquakeDataReducer from './slices/earthquake_data';

const rootReducer = () =>
  combineReducers({
    siteConfig: siteReducer,
    profile: profileReducer,
    earthquakeData: earthquakeDataReducer,
  });

export default rootReducer;
