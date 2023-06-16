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

export const getHours = (unix?: number) => {
  return moment(unix).format('HH:mm');
};

export const getDate = (unix?: number) => {
  return moment(unix).format('DD/MM/yyyy');
};

export const isBetween = (unix: number, from: number, to: number): boolean => {
  return moment(unix).isBetween(from, to, undefined, '[]');
};
