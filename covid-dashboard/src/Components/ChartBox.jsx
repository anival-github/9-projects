import styles from "./ChartBox.module.scss";
import { Charts } from "./Charts";

export const ChartBox = ({ setCountry, currentCountry }) => {
  return (
    <div className={styles.div}>
      <Charts setCountry={setCountry} currentCountry={currentCountry} />
    </div>
  );
};
