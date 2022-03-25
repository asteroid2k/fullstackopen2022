import { useEffect, useState } from "react";
import axios from "axios";
import Search from "./Search";
import Result from "./Result";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const fetchCountries = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(fetchCountries, []);

  const handleInputChange = (event) => {
    setSearch(event.target.value.trim());
  };

  const searchCountry = () => {
    return countries.filter((country) =>
      country.name.common
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase())
    );
  };

  const countryList = search.length ? searchCountry() : [];
  const noResults = countryList.length === 0;
  const manyResults = countryList.length > 10;
  const acceptedResults = countryList.length > 0 && countryList.length < 11;

  return (
    <div>
      <Search search={search} handleInputChange={handleInputChange} />
      <div>
        {noResults && <p>No results</p>}
        {manyResults && <p>Too many matches, specify another field</p>}
        {acceptedResults && <Result results={countryList} />}
      </div>
    </div>
  );
};

export default App;
