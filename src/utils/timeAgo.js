import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

let timeAgoFormatter = {};

timeAgoFormatter.format = (date, style=`mini-minute-now`) => {
  return timeAgo.format(Date.parse(date), style)
}

export default timeAgoFormatter;
