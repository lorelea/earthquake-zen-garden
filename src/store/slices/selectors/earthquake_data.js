import { createSelector } from '@reduxjs/toolkit';

const selectConfig = (state) => state.earthquakeData;

export const getEarthquakeList = createSelector([selectConfig], (earthquakeData) =>
  earthquakeData.features.map(({ id, properties }) => ({ id, ...properties }))
);

export const getCollectionTitle = createSelector(
  [selectConfig],
  (earthquakeData) => earthquakeData.metadata.title
);

export const getTimeOfLastUpdate = createSelector(
  [selectConfig],
  (earthquakeData) => earthquakeData.metadata.generated
);

export const getEarthquakeIsLoading = createSelector(
  [selectConfig],
  (earthquakeData) => earthquakeData.loading
);

export default {
  getEarthquakeList,
  getCollectionTitle,
  getTimeOfLastUpdate,
  getEarthquakeIsLoading,
};
