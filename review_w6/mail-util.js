// ...

const makeArg = val => ["HEADER", "MESSAGE-ID", val];

const makeSearchArgs = array => {
  if (!Array.isArray(array)) {
    array = [array];
  }
  if (array.length === 0) {
    return [];
  }
  if (array.length === 1) {
    return [makeArg(array[0])];
  }

  const result = [];
  let cur;
  let prev;

  for (let i = 0; i < array.length; i++) {
    if (i === 0) {
      result.push(makeArg(array[i]));
    } else if (i === 1) {
      result.unshift("OR", makeArg(array[i]));
      prev = result;
    } else {
      cur = ["OR", prev[2], makeArg(array[i])];
      prev[2] = cur;
      prev = prev[2];
    }
  }
  return [result];
};

// ...
