import { createSelector } from '@reduxjs/toolkit';

const selectConfig = (state) => state.profile.user;

export const getProfile = createSelector([selectConfig], (profile) => profile);

export const getProfileFirstName = createSelector(
  [selectConfig],
  (profile) => profile.firstName
);

export default { getProfile, getProfileFirstName };
