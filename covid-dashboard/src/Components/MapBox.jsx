import { MapComponent } from "./MapComponent";
import { MapSetValue } from "./MapSetValue";
import styles from "./MapBox.module.css";
import { useState } from "react";
import { Legend } from "./Legend";

export const MapBox = ({ countriesInfo }) => {
    const [value, setValue] = useState("deaths");
    return (
        <div className={styles.mapBox}>
            <MapSetValue
                arrValues={["Cases", "Deaths", "Recovered"]}
                setValue={setValue}
            ></MapSetValue>
            <MapComponent
                countriesInfo={countriesInfo}
                className={styles.mapComponent}
                value={value}
            ></MapComponent>
            <Legend></Legend>
        </div>
    );
};
