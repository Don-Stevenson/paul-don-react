import "./App.css";
import React, { useState } from "react";
import Results from "./components/Results";
import Search from "./components/Search";

// TODO
// Make an array of the cat breeds and then list that to the results
// convert listBreeds to async await syntax

const listBreeds = async () => {
  return fetch("https://api.thecatapi.com/v1/breeds")
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("whoops");
      }
    })
    .then((res) => {
     return res.forEach((element) => {
        return element.name;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// listBreeds();


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

  const search = async (e) => {
    try {
      if (e.key === "Enter") {
        const results = await fetch(
          "https://api.thecatapi.com/v1/breeds/search?q=" + cat.search
        );
        const resultsJSON = await results.json();
        if (!resultsJSON.length) {
          const breedList = await listBreeds()
          setCat((prevState) => {
            return {
              ...prevState,
              results: `No cat found, here are possible cats ${breedList}`,
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
