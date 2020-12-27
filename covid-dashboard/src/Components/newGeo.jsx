import geoJson from "./countries.geo.json";
export const newGeo = () => {
    let newGeo = [];
    geoJson.features.forEach((item, index) => {
        newGeo.push([]);
        item.geometry.coordinates.forEach((item2, index2) => {
            newGeo[index].push([]);
            item2.forEach((item3) => {
                newGeo[index][index2].push([item3[1], item3[0]]);
            });
        });
    });
    return newGeo;
};
