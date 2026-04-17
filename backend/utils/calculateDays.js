export const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffTime = end - start;

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays + 1;
};
