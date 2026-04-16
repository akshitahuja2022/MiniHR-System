export const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffTime = end - start;
  const days = diffTime / (1000 * 60 * 60 * 24) + 1;
  return days;
};
