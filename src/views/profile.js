import React from 'react';
import { useSelector } from 'react-redux';

import { getProfile } from 'src/store/slices/selectors/profile';

import DataList from 'src/components/data_list/data_list';
import styles from 'src/views/styles/profile.module.scss';

const Profile = () => {
  const { avatarImage, ...profile } = useSelector(getProfile);

  return (
    <>
      <h3 className="category-header">Profile</h3>
      <section className={styles.profile}>
        <img src={avatarImage} className={styles.avatar} alt="profile photo" />
        <DataList data={profile} />
      </section>
    </>
  );
};

export default Profile;
