import { MapSetValueButton } from "./MapSetValueButtons";
import styles from "./MapBox.module.css";

export const MapSetValue = ({ arrValues, setValue }) => {
    return (
        <div className={styles.mapSetValueBox}>
            {arrValues.map((item, index) => {
                return (
                    <MapSetValueButton
                        value={item}
                        setValue={setValue}
                        key={index}
                    ></MapSetValueButton>
                );
            })}
        </div>
    );
};
