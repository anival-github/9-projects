/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import styles from './ListCountries.module.scss';
import Input from './Input/Input'

export default function ListCountries({
  countries,
  title,
  setTitle,
  setCountry,
  searchTerm,
  setSearchTerm,
}) {
  function sortByTotal(arr, x) {
    arr.sort((a, b) => b[x] - a[x]);
    return arr;
  }

  return (
    <div className={styles.listCountries}>
      <div className={styles.buttons}>
        <button
          type="button"
          onClick={() => setTitle('deaths')}
        >
          Deaths
        </button>
        <button
          type="button"
          onClick={() => setTitle('recovered')}
        >
          Recovered
        </button>
        <button
          type="button"
          onClick={() => setTitle('cases')}
        >
          Total cases
        </button>
      <Input
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />  
      </div>
      
      <ul>
        {sortByTotal(countries, title).filter((value) => {
          if (searchTerm === '') {
            return value;
          }
          if (value.country.toLowerCase().includes(searchTerm.toLowerCase())) {
            return value;
          }
        }).map((country, index) => (
          <li
            className={styles.li}
            // key={country.countryInfo._id}
            key={index}
            onClick={() => setCountry(country)}
          >
            <p>
              <span className={styles.info}>{country[title]}</span>
              <span>{country.country}</span>
              <img
                className={styles.img}
                src={country.countryInfo.flag}
                alt="flag"
              />
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
