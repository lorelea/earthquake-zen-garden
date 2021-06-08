import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getCollectionTitle,
  getEarthquakeList,
  getTimeOfLastUpdate,
  getEarthquakeIsLoading,
} from 'src/store/slices/selectors/earthquake_data';
import { fetchEarthquakeData } from 'src/store/slices/earthquake_data';

import DataTable from 'src/components/data_table/data_table';
import FormatDateTime from 'src/shared/utils/format_date_time';

const columns = [
  { key: 'place', label: 'Title', link: '/earthquake/:id' },
  { key: 'mag', label: 'Magnitude', align: 'center' },
  { key: 'time', label: 'Time', format: 'fullDateWithTime' },
];

const Home = () => {
  const dispatch = useDispatch();

  const collectionTitle = useSelector(getCollectionTitle);
  const earthquakeList = useSelector(getEarthquakeList);
  const updatedAt = useSelector(getTimeOfLastUpdate);
  const isLoading = useSelector(getEarthquakeIsLoading);

  const updatedAtTitle = useMemo(() => {
    return `updated ${FormatDateTime.fromNow(updatedAt)}`;
  }, [updatedAt]);

  const loadData = () => {
    dispatch(fetchEarthquakeData());
  };

  return (
    <>
      <h3 className="category-header">{collectionTitle}</h3>
      <section>
        <h5 className="text-right">
          {updatedAtTitle}
          <span
            className={['loader', isLoading && 'active'].join(' ')}
            onClick={loadData}
          />
        </h5>
        <DataTable columns={columns} data={earthquakeList} defaultSortBy="time" />
      </section>
    </>
  );
};

export default Home;
