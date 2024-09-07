const pick = (obj, keys) =>
  keys.reduce((acc, key) => {
    if (obj && obj[key]) acc[key] = obj[key];
    return acc;
  }, {});

function getKSTDate(offsetInDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetInDays);

  const dt = date
    .toLocaleString("en-US", {
      timeZone: "Asia/Seoul",
    })
    .split(" ")[0];
  const [month, day, year] = dt.split("/");
  console.log(month, day, year);

  return `${year.slice(0, 4)}-${month.padStart(2, "0")}-${day.padStart(
    2,
    "0"
  )}`;
}

module.exports = {
  pick,
  getKSTDate,
};
