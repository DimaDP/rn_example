export const formatDateForAxis = date => {
  const dateString = new Date(date).toString().split(' ');
  return parseInt(dateString[2], 10) + ' ' + dateString[1];
};

export const formatDateForTransactions = date => {
  const dateString = new Date(date).toString().split(' ');
  return dateString[4];
};

export const formatDateForForms = date => {
  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    date.getDate().toString().padStart(2, '0')
  );
};
