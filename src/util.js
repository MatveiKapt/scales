export const getRandomInteger = (start, end) => {
  return Math.floor(Math.random() * (end - start + 1) + start);
};
