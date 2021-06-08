import { createSelector } from '@reduxjs/toolkit';

const selectConfig = (state) => state.siteConfig;

export const getSiteConfig = createSelector([selectConfig], (siteConfig) => siteConfig);

export default { getSiteConfig };
