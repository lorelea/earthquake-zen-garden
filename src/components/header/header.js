import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getSiteConfig } from 'src/store/slices/selectors/site';
import { getProfileFirstName } from 'src/store/slices/selectors/profile';

import styles from './header.module.scss';

const Header = () => {
  const { title, logoImage, heroImage } = useSelector(getSiteConfig);
  const userFirstName = useSelector(getProfileFirstName);

  useEffect(() => {
    if (!title || !heroImage) return;

    document.title = title;
    document.getElementById('favicon').href = heroImage;
  }, [title, heroImage]);

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logoImage} className={styles.logo} alt={title} />
      </Link>
      <div className={styles.title}>{title}</div>
      <Link to="/profile" className={styles.profile}>
        Welcome {userFirstName}
      </Link>
    </header>
  );
};

export default Header;
