import moment from 'moment'

export default time =>
  new Date(time) < Date.now() - 1000 * 60 * 60 * 24
    ? moment(time).format('LL')
    : moment(time).fromNow()
