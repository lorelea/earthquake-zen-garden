import React from 'react';
import PropTypes from 'prop-types';

import styles from './data_list.module.scss';

const DataList = ({ data }) => {
  return (
    <dl className={styles.definitionList}>
      {Object.entries(data).map(([key, value]) => {
        // un-camelCase each key
        const processedKey = key.replace(/([A-Z])/g, ' $1').toLowerCase();
        return (
          <React.Fragment key={key}>
            <dt>{processedKey}</dt>
            <dd>{value}</dd>
          </React.Fragment>
        );
      })}
    </dl>
  );
};
DataList.propTypes = {
  data: PropTypes.object,
};

export default DataList;
