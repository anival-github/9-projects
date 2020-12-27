/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import styles from './Table.module.scss';

export default function Table(props) {
  return (
    <div className={styles.tableContent}>

      {
      // eslint-disable-next-line react/destructuring-assignment
      props.countries.length
        // eslint-disable-next-line react/destructuring-assignment
        && (props.dataTypes.map((element, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>

            <div className={styles.dataType}>{element}</div>

            <div className={styles.data}>
              {props.showGlobalCases(
                props.countries,
                props.currentPopulationIndex,
                props.currentPeriodIndex,
                props.currentTerritoryIndex,
                index,
                props.currentCountry,
              )}
            </div>

          </div>
        )))
      }
    </div>
  );
}
