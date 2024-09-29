import moment from "moment";

export const dateTimeFormat = (date, format = "DD/MM/YYYY hh:mm:ss") => {
  const isValid = moment(date).isValid();
  if (!isValid) return "";

  return moment(date).format(format);
};

export const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD'); // Format the date
};

export const getWeeklyPeriods = (weeksBack) => {
  const periods = [];
  const today = moment().startOf('week');

  for (let i = 0; i < weeksBack; i++) {
    const startDate = today.clone().subtract(i, 'weeks').startOf('week');
    const endDate = startDate.clone().endOf('week');

    periods.push({
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  }

  return periods.reverse(); // Ensure periods are in chronological order
};

export const getMonthlyPeriods = (monthsBack) => {
  const periods = [];
  const today = moment().startOf('month');

  for (let i = 0; i < monthsBack; i++) {
    const startDate = today.clone().subtract(i, 'months').startOf('month');
    const endDate = startDate.clone().endOf('month');

    periods.push({
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  }

  return periods.reverse(); // Ensure periods are in chronological order
};

export const getYearlyPeriods = (yearsBack) => {
  const periods = [];
  const today = moment().startOf('year');

  for (let i = 0; i < yearsBack; i++) {
    const startDate = today.clone().subtract(i, 'years').startOf('year');
    const endDate = startDate.clone().endOf('year');

    periods.push({
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  }

  return periods.reverse(); // Ensure periods are in chronological order
};
