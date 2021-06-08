import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: {
      firstName: null,
      lastName: null,
      avatarImage: null,
      phone: null,
      email: null,
      bio: null,
    },
  },
  reducers: {
    setProfile(state, action) {
      state.user = action.payload;
    },
  },
});

// not in use, since setting Profile from fetchSiteConfig mock data
export const fetchProfile = () => (dispatch) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  return fetch('/mock_data/data.json', options)
    .then((response) => response.json())
    .then((json) => {
      const { profile } = json;
      dispatch(profileSlice.actions.setProfile(profile));
    })
    .catch(() => {
      // failed fetch handler
    });
};

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
