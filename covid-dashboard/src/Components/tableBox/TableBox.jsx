/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import styles from './TableBox.module.scss';
import showGlobalCases from './showGlobalCases';
import Table from './Table/Table';

export default function TableBox({
  currentCountry,
  dataCategories,
  countries,
  currentPopulationIndex,
  currentPeriodIndex,
  currentTerritoryIndex,
  setCurrentPeriodIndex,
  changeCategoryStatus,
  setCurrentTerritoryIndex,
  setCurrentPopulationIndex,
}) {
  return (
    <div className={styles.tableBox}>
      <Table
        currentCountry={currentCountry}
        dataTypes={dataCategories.dataType}
        countries={countries}
        currentPopulationIndex={currentPopulationIndex}
        currentPeriodIndex={currentPeriodIndex}
        currentTerritoryIndex={currentTerritoryIndex}
        setCurrentPeriodIndex={setCurrentPeriodIndex}
        changeCategoryStatus={changeCategoryStatus}
        showGlobalCases={showGlobalCases}
      />
      <div className={styles.dataTypesButtons}>
        <button
          type="button"
          className={styles.toggler}
          onClick={() => {
            setCurrentTerritoryIndex(
              changeCategoryStatus(currentTerritoryIndex),
            );
          }}
        >
          <span>
            {dataCategories.territory[currentTerritoryIndex]}
          </span>
        </button>

        <button
          type="button"
          className={styles.toggler}
          onClick={() => {
            setCurrentPeriodIndex(
              changeCategoryStatus(currentPeriodIndex),
            );
          }}
        >
          <span>{dataCategories.period[currentPeriodIndex]}</span>
        </button>

        <button
          type="button"
          className={styles.toggler}
          onClick={() => {
            setCurrentPopulationIndex(
              changeCategoryStatus(currentPopulationIndex),
            );
          }}
        >
          <span>
            {dataCategories.population[currentPopulationIndex]}
          </span>
        </button>
      </div>
    </div>
  );
}
