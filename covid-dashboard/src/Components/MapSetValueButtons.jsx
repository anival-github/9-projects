import styles from "./MapBox.module.css";
export const MapSetValueButton = ({ value, setValue }) => {
    return (
        <button className={styles.button} onClick={() => setValue(value)}>
            {value}
        </button>
    );
};
