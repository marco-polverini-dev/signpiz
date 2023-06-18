import * as moment from 'moment';

export function getTodayUnix() {
  return moment().hours(0).minutes(0).seconds(0).milliseconds(0).valueOf();
}

export function getUnix(date: string) {
  return moment(date, 'yyyy/MM/DD')
    .hours(0)
    .minutes(0)
    .seconds(0)
    .milliseconds(0)
    .valueOf();
}

export function hour(date: string, morning: boolean) {
  return moment(date, 'yyyy/MM/DD')
    .hours(morning ? 8 : 13)
    .minutes(0)
    .seconds(0)
    .milliseconds(0)
    .valueOf();
}

export function getUnixDate(date: number, hours: string) {
  const h = parseHours(hours);
  return moment(date)
    .hours(h.hours())
    .minutes(h.minutes())
    .seconds(0)
    .milliseconds(0)
    .valueOf();
}

export function parseHours(hours: string) {
  return moment(hours, 'HH:mm');
}

export const getHours = (unix?: number) => {
  return moment(unix).format('HH:mm');
};

export const getDate = (unix?: number) => {
  return moment(unix).format('DD/MM/yyyy');
};

export const isBetween = (unix: number, from: number, to: number): boolean => {
  return moment(unix).isBetween(from, to, undefined, '[]');
};
