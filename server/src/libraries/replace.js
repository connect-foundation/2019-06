const hideIdUseAsterisk = (str, start, end) => {
  const length = end - start;
  const asterisks = '*'.repeat(length);

  return str.replace(str.substring(start, end), asterisks);
};

export default {
  hideIdUseAsterisk,
};
