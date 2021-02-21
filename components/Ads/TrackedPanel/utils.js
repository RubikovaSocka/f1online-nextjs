const pickPartner = ({ partnersVector, partnersData }) => {
  const randomNumber = 100 * Math.random(); //0 - 99.999

  let i = 0;
  let aggregator = 0;
  while (i < partnersVector.length) {
    aggregator += parseFloat(partnersVector[i].probability);
    if (aggregator > randomNumber) break;
    i++;
  }
  console.log("DONE", i, partnersVector, aggregator);
  return i === partnersVector.length
    ? null
    : partnersData[`${partnersVector[i].name}`];
};

export { pickPartner };
