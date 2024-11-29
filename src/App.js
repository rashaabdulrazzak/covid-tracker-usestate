import { Card, CardContent, FormControl } from "@mui/material";
import "./App.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import InfoBoxs from "./components/InfoBoxs";
import Map from "./components/Map";
import LineGraph from "./components/LineGraph";
import Table from "./components/Table";
import { sortData, prettyPrintStat } from "./util/utils";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState(["USA", "UK", "INDIA"]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        // All of the data...
        // from the country response
        setCountryInfo(data);
        console.log("cp", countryInfo);
        console.log([data.countryInfo.lat, data.countryInfo.long]);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);
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
          const sortedData = sortData(data);
          setCountries(countries);
          setTableData(sortedData);
          setMapCountries(data);
          console.log(countries);
        });
    };
    getCountriesData();
  }, []);
  return (
    <div className="app">
      <div className="app_left">
        {/* Header */}
        {/* Title + Select input dropdown field */}
        <div className="app_header">
          <h1> Covid 19 Tracker</h1>
          <FormControl className="app_dropdowm">
            <InputLabel id="demo-simple-select-label">
              {" "}
              Select Your Country
            </InputLabel>
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
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
          <InfoBoxs
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <InfoBoxs
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <InfoBoxs
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Death"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>
        {/* InfoBoxs */}
        {/*table*/}
        {/*graph*/}
        {/*map*/}
        <Map
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
          casesType={casesType}
        />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
        </CardContent>
        {/* Table */}
        <Table countries={tableData} />
        <h3 className="app_graphTitle">Worldwide new {casesType}</h3>
        {/* Graph */}
        {/* <LineGraph casesType={casesType}/> */}
      </Card>
    </div>
  );
}

export default App;
