import { FormControl } from "@mui/material";
import "./App.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import InfoBoxs from "./components/InfoBoxs";
function App() {
  const [countries, setCountries] = useState(["USA", "UK", "INDIA"]);
  const [country, setCountry] = useState("worldwide");
  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };
  useEffect(() => {
    // The code inside here will run once when the component loads and not again
    // async -> send a request, wait for it, do something with it
    // const options = {
    //   method: "GET",
    //   headers: {
    //     "X-RapidAPI-Key": "d3a68cab91msh57c2913a6e9819ep1dc646jsn378e4144aaac",
    //     "X-RapidAPI-Host": "covid-19-coronavirus-statistics.p.rapidapi.com",
    //   },
    // };

    const getCountriesData = async () => {
      // await fetch(
      //   "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats",
      //   options
      // )
      //   .then((response) => response.json())
      //   .then((response) => console.log(response, response.data.covid19Stats))
      //   .catch((err) => console.error(err));

      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // United States, United Kingdom, France
            value: country.countryInfo.iso2, // USA, UK, FR
          }));
          setCountries(countries);
          console.log(countries);
        });
    };
    getCountriesData();
  }, []);
  return (
    <div className="App">
      {/* Header */}
      {/* Title + Select input dropdown field */}
      <div className="app_header">
        <h1> Covid 19 Tracker</h1>
        <FormControl className="app_dropdowm">
          <InputLabel id="demo-simple-select-label">
            {" "}
            Select Your Country
          </InputLabel>
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            {
              // Loop through all the countries and show a dropdown list of the options
              countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
      {/* InfoBoxs */}
      <div className="app_stats">
        {/* InfoBoxs title="Coronavirus cases" */}
        {/* InfoBoxs title="Coronavirus cases" */}
        <InfoBoxs title="Coronavirus cases" cases={123} total={2000} />
        <InfoBoxs title="Recovered" cases={100} total={2000} />
        <InfoBoxs title="Death" cases={23} total={2000} />
      </div>
      {/* InfoBoxs */}
      {/*table*/}
      {/*graph*/}
      {/*map*/}
    </div>
  );
}

export default App;
