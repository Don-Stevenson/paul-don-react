import "./App.css";
import React, { useState } from "react";
import Results from "./components/Results";
import Search from "./components/Search";

const getBreeds = () => {
  return fetch("https://api.thecatapi.com/v1/breeds")
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("whoops");
      }
    })
    .then((res) => {
      res.forEach((element) => {
        console.log(element.name);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
getBreeds();

function App() {
  const [cat, setCat] = useState({
    search: "",
    results: "",
  });

  const handleInput = (e) => {
    const value = e.target.value;
    setCat((prevState) => {
      return {
        ...prevState,
        search: value,
      };
    });
  };

  async function search(e) {
    try {
      if (e.key === "Enter") {
        const results = await fetch(
          "https://api.thecatapi.com/v1/breeds/search?q=" + cat.search
        );
        const resultsJSON = await results.json();
        if (!resultsJSON.length) {
          setCat((prevState) => {
            return {
              ...prevState,
              results: "No cat found",
            };
          });
        } else {
          setCat((prevState) => {
            return {
              ...prevState,
              results: resultsJSON[0].description,
            };
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <h1> Cat app </h1>

      <Search handleInput={handleInput} search={search} />
      <Results results={cat.results} />
    </div>
  );
}

export default App;
