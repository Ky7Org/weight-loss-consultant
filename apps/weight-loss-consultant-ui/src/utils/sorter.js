import moment from "moment";

const dateSort = (dateA, dateB) => moment(dateA).diff(moment(dateB));

const defaultSort = (a, b) => {
  if (a < b) return -1;
  if (b < a) return 1;
  return 0;
};

const numberSort = (a, b) => a - b;

const textSort = (a, b) => a.localeCompare(b);

export const Sorter = {
  DEFAULT: defaultSort,
  DATE: dateSort,
  NUMBER: numberSort,
  TEXT: textSort,
};
