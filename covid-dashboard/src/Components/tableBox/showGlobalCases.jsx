export default function showGlobalCases(
  countries,
  currentPopulationIndex,
  currentPeriodIndex,
  currentTerritoryIndex,
  dataType,
  currentCountry,
) {
  const totalPopulation = countries.reduce((acc, elem) => acc + Number(elem.population), 0);
  const populationToCompare = 100000;
  const populationIndex100k = totalPopulation / populationToCompare;

  // Sick
  const allTimeWorldTotalCases = countries.reduce((acc, elem) => acc + Number(elem.cases), 0);
  const lastDayWorldTotalCases = countries.reduce((acc, elem) => acc + Number(elem.todayCases), 0);
  const allTimeWorldPer100kCases = Math.round(allTimeWorldTotalCases / populationIndex100k);
  const lastDayWorldPer100kCases = Math.round(lastDayWorldTotalCases / populationIndex100k);

  // Deaths
  const allTimeWorldTotalDeaths = countries.reduce((acc, elem) => acc + Number(elem.deaths), 0);
  const allTimeWorldPer100kDeaths = Math.round(allTimeWorldTotalDeaths / populationIndex100k);
  const lastDayWorldTotalDeaths = countries
    .reduce((acc, elem) => acc + Number(elem.todayDeaths), 0);
  const lastDayWorldPer100kDeaths = Math.round(lastDayWorldTotalDeaths / populationIndex100k);

  // Recoveries
  const allTimeWorldTotalRecovered = countries
    .reduce((acc, elem) => acc + Number(elem.recovered), 0);
  const allTimeWorldPer100kRecovered = Math.round(allTimeWorldTotalRecovered / populationIndex100k);
  const lastDayWorldTotalRecovered = countries
    .reduce((acc, elem) => acc + Number(elem.todayRecovered), 0);
  const lastDayWorldPer100kRecovered = Math.round(lastDayWorldTotalRecovered / populationIndex100k);

  // Render allTimeWorldTotal
  if (
    currentPopulationIndex === 0
    && currentPeriodIndex === 0
    && currentTerritoryIndex === 0
  ) {
    if (dataType === 0) {
      return allTimeWorldTotalCases;
    }

    if (dataType === 1) {
      return allTimeWorldTotalDeaths;
    }

    return allTimeWorldTotalRecovered;
  }

  // Render allTimeWorldPer100k
  if (
    currentPopulationIndex === 1
    && currentPeriodIndex === 0
    && currentTerritoryIndex === 0
  ) {
    if (dataType === 0) {
      return allTimeWorldPer100kCases;
    }
    if (dataType === 1) {
      return allTimeWorldPer100kDeaths;
    }

    return allTimeWorldPer100kRecovered;
  }

  // Render lastDayWorldTotal
  if (
    currentPopulationIndex === 0
    && currentPeriodIndex === 1
    && currentTerritoryIndex === 0
  ) {
    if (dataType === 0) {
      return lastDayWorldTotalCases;
    }

    if (dataType === 1) {
      return lastDayWorldTotalDeaths;
    }

    return lastDayWorldTotalRecovered;
  }

  // Render lastDayWorldPer100k
  if (
    currentPopulationIndex === 1
    && currentPeriodIndex === 1
    && currentTerritoryIndex === 0
  ) {
    if (dataType === 0) {
      return lastDayWorldPer100kCases;
    }

    if (dataType === 1) {
      return lastDayWorldPer100kDeaths;
    }

    return lastDayWorldPer100kRecovered;
  }

  // Render allTimeCountryTotal
  if (
    currentPopulationIndex === 0
    && currentPeriodIndex === 0
    && currentTerritoryIndex === 1
  ) {
    if (!currentCountry) {
      return 'Choose a country';
    }

    if (dataType === 0) {
      return `${currentCountry.country}: ${currentCountry.cases}`;
    }

    if (dataType === 1) {
      return `${currentCountry.country}: ${currentCountry.deaths}`;
    }

    return `${currentCountry.country}: ${currentCountry.recovered}`;
  }

  // Render allTimeCountryPer100k
  if (
    currentPopulationIndex === 1
    && currentPeriodIndex === 0
    && currentTerritoryIndex === 1
  ) {
    if (!currentCountry) {
      return 'Choose a country';
    }

    if (dataType === 0) {
      return `${currentCountry.country}: ${currentCountry.casesPerOneMillion / 10}`;
    }

    if (dataType === 1) {
      return `${currentCountry.country}: ${currentCountry.deathsPerOneMillion / 10}`;
    }

    return `${currentCountry.country}: ${currentCountry.recoveredPerOneMillion / 10}`;
  }

  // Render lastDayCountryTotal
  if (
    currentPopulationIndex === 0
    && currentPeriodIndex === 1
    && currentTerritoryIndex === 1
  ) {
    if (!currentCountry) {
      return 'Choose a country';
    }

    if (dataType === 0) {
      return `${currentCountry.country}: ${currentCountry.todayCases}`;
    }

    if (dataType === 1) {
      return `${currentCountry.country}: ${currentCountry.todayDeaths}`;
    }

    return `${currentCountry.country}: ${currentCountry.todayRecovered}`;
  }

  // Render lastDayCountryPer100k
  if (
    currentPopulationIndex === 1
    && currentPeriodIndex === 1
    && currentTerritoryIndex === 1
  ) {
    if (!currentCountry) {
      return 'Choose a country';
    }

    if (dataType === 0) {
      return `${currentCountry.country}:
        ${((currentCountry.todayCases / currentCountry.population) * populationToCompare).toFixed(2)}`;
    }

    if (dataType === 1) {
      return `${currentCountry.country}:
        ${((currentCountry.todayDeaths / currentCountry.population) * populationToCompare).toFixed(2)}`;
    }

    return `${currentCountry.country}:
      ${((currentCountry.todayRecovered / currentCountry.population) * populationToCompare).toFixed(2)}`;
  }

  return new Error('Some mistake has happened');
}
