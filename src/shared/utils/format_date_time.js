import moment from 'moment';

export default {
  fullDateWithTime(date) {
    return moment(date).format('lll');
  },
  fromNow(date) {
    return moment(date).fromNow();
  },
};
