const pick = (obj, keys) =>
  keys.reduce((acc, key) => {
    if (obj && obj[key]) acc[key] = obj[key];
    return acc;
  }, {});

module.exports = {
  pick,
};
