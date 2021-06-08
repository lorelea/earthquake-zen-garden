import { createSlice } from '@reduxjs/toolkit';

const earthquakeDataSlice = createSlice({
  name: 'earthquakeData',
  initialState: {
    loading: false,
    metadata: {
      url: null,
      title: null,
      count: null,
      generated: null,
    },
    features: [],
  },
  reducers: {
    setLoading(state, action) {
      state.loading = !!action.payload;
    },
    setEarthquakeData(state, action) {
      const { metadata, features } = action.payload;
      state.metadata = metadata;
      state.features = features;
      state.loading = false;
    },
  },
});

export const fetchEarthquakeData = () => (dispatch, getState) => {
  dispatch(earthquakeDataSlice.actions.setLoading(true));

  const url = getState().earthquakeData.metadata.url;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  return fetch(url, options)
    .then((response) => response.json())
    .then((json) => {
      dispatch(earthquakeDataSlice.actions.setEarthquakeData(json));
    })
    .catch(() => {
      // failed fetch handler
      dispatch(earthquakeDataSlice.actions.setLoading(false));
    });
};

export const { setEarthquakeData } = earthquakeDataSlice.actions;
export default earthquakeDataSlice.reducer;
