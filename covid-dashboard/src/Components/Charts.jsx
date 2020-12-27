import React, { useState, useEffect } from "react";
import styles from "./Charts.module.scss";
import { Bar } from "react-chartjs-3";

// const API1 =
//   "https://api.covid19api.com/world?from=2020-06-20T00:00:00Z&to=2020-12-20T00:00:00Z";
// const API2 = 'https://corona-api.com/countries?include=timeline';
const API3 = 'https://disease.sh/v3/covid-19/historical?lastdays=all';

export const Charts = ({ setCountry, currentCountry }) => {
  const [day, setDay] = useState({ days: [] });

  useEffect(() => {
    const fetchData1 = async () => {
      const response = await fetch(API3);
      const result = await response.json();
      setDay({ days: result });
    };
    fetchData1();
  }, []);

  let ind;

  if (currentCountry && currentCountry.country) {
    ind = day.days.map((el) => el.country).indexOf(currentCountry.country);
  }
  
  const [label, setLabel] = useState("cases");
  // const labelDates = new Array(day.days.length).fill(1);
  // const dateStamp = day.days.data.map(elem => elem.timeline.map(el=>el.date)).flat();
  //  const totalConfirmed = day.days.data.map((elem) =>
  //    elem.timeline.map((el) => el.confirmed).flat()
  //  );
  //const dateStamp2 = Object.keys(day.days[0].timeline.cases); // ---- timeline
  //const countryValuesTotal = Object.values(day.days[0].timeline.cases); // ---- chart for 1 country

  //const [time, setTime] = useState(Object.keys(day.days[0].timeline.cases));
  //const [info, setInfo] = useState(Object.values(day.days[0].timeline.cases));

  // const getSum = (arr) => {
  //   let prev = 0;
  //   return arr.map((elem) => {
  //     prev += elem;
  //     return prev;
  //   });
  // };
  // data: Object.values(day.days[ind].timeline.cases) || [1,2,3],
  const data = {
    labels: !day.days[ind]
      ? [1, 2, 3,4,5,6,7,8,9,10]
      : Object.keys(day.days[ind].timeline[label]),
    datasets: [
      {
        label: "Cases",
        borderColor: "cyan",
        backgroundColor: "blue",
        borderWidth: 2,
        data: !day.days[ind]
          ? [0,0,0,1,1,1, 2,2,3,6]
          : Object.values(day.days[ind].timeline[label]),
      },
    ],
  };

  return (
    <div>
      <div className={styles.buttons}>
        <button onClick={() => setLabel("cases")}>
          Total(country)
        </button>
        <button onClick={() => setLabel("recovered")}>
          Recovered (country)
        </button>
        <button onClick={() => setLabel("deaths")}>
          Deaths (country)
        </button>
      </div>

      <Bar
        data={data}
        height={250}
        width={400}
        options={{
          title: {
            display: true,
            text: !currentCountry ? "total world" : currentCountry.country,
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "bottom",
          },
          tooltips: {
            mode: "index",
            intersect: true,
          },
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

  