import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FormatDateTime from 'src/shared/utils/format_date_time';
import styles from './data_table.module.scss';

const DataTable = (props) => {
  const { columns = [], data = [], defaultSortBy, defaultSort = true } = props;

  const [sortedField, setSortedField] = useState(defaultSortBy);
  const [sortAscending, setSortAscending] = useState(defaultSort);

  const sortIndicator = useMemo(() => {
    return {
      [sortedField]: sortAscending ? 'asc' : 'desc',
    };
  }, [sortedField, sortAscending]);

  const sortedTableItems = useMemo(() => {
    return data.sort((a, b) => {
      if (a[sortedField] === b[sortedField]) return 0;
      const sort = a[sortedField] < b[sortedField] ? 1 : -1;
      return sort * (sortAscending ? 1 : -1);
    });
  }, [sortedField, sortAscending, data]);

  const handleSortField = (key) => {
    setSortAscending(key === sortedField ? !sortAscending : false);
    setSortedField(key);
  };

  const tableHeaders = columns.map((column) => {
    const { key, label } = column;
    return (
      <th key={key} onClick={() => handleSortField(key)} data-sort={sortIndicator[key]}>
        {label}
      </th>
    );
  });

  const tableRowItems = sortedTableItems.map((item) => {
    return (
      <tr key={item.id}>
        {columns.map((column) => {
          const { key, link, format, align } = column;

          const value = item[key];
          const alignClass = align && `text-${align}`;
          const redirectTo =
            link && link.replace(/(:\w+)/gi, (tag) => item[tag.replace(/:/, '')]);

          const tdItem = link ? (
            <Link to={redirectTo}>{value}</Link>
          ) : format ? (
            FormatDateTime[format](value)
          ) : (
            value
          );

          return (
            <td key={`${item.id}-${key}`} className={alignClass}>
              {tdItem}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <table className={styles.dataTable}>
      <thead>
        <tr>{tableHeaders}</tr>
      </thead>
      <tbody>{tableRowItems}</tbody>
    </table>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      format: PropTypes.string,
      align: PropTypes.string,
      link: PropTypes.string,
    })
  ),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  defaultSort: PropTypes.bool,
  defaultSortBy: PropTypes.string,
};

export default DataTable;
