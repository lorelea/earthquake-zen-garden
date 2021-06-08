import { createSlice } from '@reduxjs/toolkit';

import { setProfile } from 'src/store/slices/profile';
import { setEarthquakeData } from 'src/store/slices/earthquake_data';

const siteSlice = createSlice({
  name: 'siteConfig',
  initialState: {
    title: null,
    logoImage: null,
    heroImage: null,
  },
  reducers: {
    setSiteConfig(state, action) {
      const { title, logoImage, heroImage } = action.payload;
      state.title = title;
      state.logoImage = logoImage;
      state.heroImage = heroImage;
    },
  },
});

export const fetchSiteConfig = () => (dispatch) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  return fetch('/mock_data/data.json', options)
    .then((response) => response.json())
    .then((json) => {
      const { site, profile, data } = json;
      dispatch(siteSlice.actions.setSiteConfig(site));
      // since we already got all mock data from one source instead of separate requests
      dispatch(setProfile(profile));
      dispatch(setEarthquakeData(data));
    })
    .catch(() => {
      // failed fetch handler
    });
};

export const { setSiteConfig } = siteSlice.actions;
export default siteSlice.reducer;
