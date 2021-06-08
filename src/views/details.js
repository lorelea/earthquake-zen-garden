import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getEarthquakeList } from 'src/store/slices/selectors/earthquake_data';

import DataList from 'src/components/data_list/data_list';
import FormatDateTime from 'src/shared/utils/format_date_time';

const EarthquakeDetail = () => {
  const { earthquakeId } = useParams();
  const earthquakeList = useSelector(getEarthquakeList);

  const currentItemDetails = useMemo(() => {
    return earthquakeList.find((item) => item.id === earthquakeId);
  }, [earthquakeId, earthquakeList]);

  if (!currentItemDetails) {
    return <h3>We have no data regarding this earthquake, please return to home page</h3>;
  }

  const { title, mag, time, status, tsunami, type } = currentItemDetails;
  const details = {
    title,
    magnitude: mag,
    time: FormatDateTime.fullDateWithTime(time),
    status,
    tsunami,
    type,
  };

  return (
    <>
      <h3 className="category-header">{title}</h3>
      <section>
        <DataList data={details} />
      </section>
    </>
  );
};

export default EarthquakeDetail;
