import {
    MapContainer,
    TileLayer,
    Popup,
    Circle,
    FeatureGroup,
    Tooltip,
    Polygon,
} from "react-leaflet";
import styles from "./MapBox.module.css";
import geoJson from "./countries.geo.json";
import { newGeo } from "./newGeo";

export const MapComponent = ({ countriesInfo, value }) => {
    const newGeoObj = newGeo();
    return (
        <MapContainer
            center={[40, 0]}
            zoom={2}
            scrollWheelZoom={true}
            className={styles.mapContainer}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
            {countriesInfo &&
                countriesInfo.map((item, index) => {
                    let lat = item.countryInfo.lat,
                        long = item.countryInfo.long,
                        weight = 0,
                        HSLA = null;
                    if (value.toLowerCase() === "recovered") {
                        if (item.recovered > 5000000) {
                            weight = "60";
                        } else if (item.recovered > 1000000) {
                            weight = "40";
                        } else if (item.recovered > 700000) {
                            weight = "30";
                        } else if (item.recovered > 500000) {
                            weight = "25";
                        } else if (item.recovered > 200000) {
                            weight = "17";
                        } else if (item.recovered > 100000) {
                            weight = "13";
                        } else if (item.recovered > 50000) {
                            weight = "10";
                        } else if (item.recovered > 10000) {
                            weight = "10";
                        }
                        if (item.recovered > 5000000) {
                            HSLA = "hsl(120 70% 60% / .95)";
                        } else if (item.recovered > 1000000) {
                            HSLA = "hsl(120 70% 55% / .95)";
                        } else if (item.recovered > 700000) {
                            HSLA = "hsl(120 70% 45% / .95)";
                        } else if (item.recovered > 500000) {
                            HSLA = "hsl(120 70% 40% / .95)";
                        } else if (item.recovered > 200000) {
                            HSLA = "hsl(120 70% 35% / .95)";
                        } else if (item.recovered > 100000) {
                            HSLA = "hsl(120 70% 30% / .95)";
                        } else if (item.recovered > 50000) {
                            HSLA = "hsl(120 70% 27% / .95)";
                        } else if (item.recovered > 10000) {
                            HSLA = "hsl(120 70% 25% / .95)";
                        }
                    } else if (value.toLowerCase() === "deaths") {
                        if (item.deaths > 300000) {
                            HSLA = "hsl(4 70% 20% / .95)";
                        } else if (item.deaths > 200000) {
                            HSLA = "hsl(4 70% 23% / .95)";
                        } else if (item.deaths > 150000) {
                            HSLA = "hsl(4 70% 26% / .95)";
                        } else if (item.deaths > 100000) {
                            HSLA = "hsl(4 70% 28% / .95)";
                        } else if (item.deaths > 50000) {
                            HSLA = "hsl(4 70% 33% / .95)";
                        } else if (item.deaths > 25000) {
                            HSLA = "hsl(4 70% 35% / .95)";
                        } else if (item.deaths > 15000) {
                            HSLA = "hsl(4 70% 40% / .95)";
                        } else if (item.deaths > 5000) {
                            HSLA = "hsl(4 70% 50% / .95)";
                        } else if (item.deaths > 1000) {
                            HSLA = "hsl(4 70% 60% / .95)";
                        } else if (item.deaths > 0) {
                            HSLA = "hsl(4 70% 70% / .95)";
                        }

                        if (item.deaths > 300000) {
                            weight = "60";
                        } else if (item.deaths > 200000) {
                            weight = "55";
                        } else if (item.deaths > 150000) {
                            weight = "45";
                        } else if (item.deaths > 100000) {
                            weight = "35";
                        } else if (item.deaths > 50000) {
                            weight = "25";
                        } else if (item.deaths > 25000) {
                            weight = "20";
                        } else if (item.deaths > 15000) {
                            weight = "15";
                        } else if (item.deaths > 5000) {
                            weight = "10";
                        }
                    } else {
                        if (item.cases > 10000000) {
                            HSLA = "hsl(4 70% 20% / .95)";
                        } else if (item.cases > 1000000) {
                            HSLA = "hsl(4 70% 23% / .95)";
                        } else if (item.cases > 700000) {
                            HSLA = "hsl(4 70% 26% / .95)";
                        } else if (item.cases > 500000) {
                            HSLA = "hsl(4 70% 30% / .95)";
                        } else if (item.cases > 250000) {
                            HSLA = "hsl(4 70% 32% / .95)";
                        } else if (item.cases > 100000) {
                            HSLA = "hsl(4 70% 35% / .95)";
                        } else if (item.cases > 50000) {
                            HSLA = "hsl(4 70% 40% / .95)";
                        } else if (item.cases > 25000) {
                            HSLA = "hsl(4 70% 50% / .95)";
                        } else if (item.cases > 10000) {
                            HSLA = "hsl(4 70% 60% / .95)";
                        } else if (item.cases > 0) {
                            HSLA = "hsl(4 70% 70% / .95)";
                        }

                        if (item.cases > 10000000) {
                            weight = "60";
                        } else if (item.cases > 1000000) {
                            weight = "27";
                        } else if (item.cases > 700000) {
                            weight = "25";
                        } else if (item.cases > 500000) {
                            weight = "23";
                        } else if (item.cases > 250000) {
                            weight = "20";
                        } else if (item.cases > 100000) {
                            weight = "17";
                        } else if (item.cases > 50000) {
                            weight = "15";
                        } else if (item.cases > 25000) {
                            weight = "13";
                        } else if (item.cases > 10000) {
                            weight = "11";
                        } else if (item.cases > 0) {
                            weight = "10";
                        }
                    }
                    return (
                        <FeatureGroup key={index}>
                            <Popup>
                                {item.country +
                                    `: ${value.toLowerCase()} - ${
                                        item[value.toLowerCase()]
                                    }`}
                            </Popup>
                            <Circle
                                center={[lat, long]}
                                pathOptions={{
                                    color: HSLA,
                                    weight: `${
                                        weight < 10 ? weight + 10 : weight
                                    }`,
                                }}
                            />
                        </FeatureGroup>
                    );
                })}
            {geoJson.features.map((item, index) => {
                return (
                    <Polygon
                        pathOptions={{
                            color: "lime",
                            fillOpacity: "0",
                            opacity: "0",
                        }}
                        positions={newGeoObj[index]}
                        key={index}
                    >
                        <Tooltip sticky>{item.properties.name}</Tooltip>
                    </Polygon>
                );
            })}
        </MapContainer>
    );
};
