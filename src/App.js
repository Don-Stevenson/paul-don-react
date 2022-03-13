import "./App.css"
import React, { useState } from "react"
import Results from "./components/Results"
import Search from "./components/Search"

const listBreeds = async () => {
  try {
    const breeds = await fetch("https://api.thecatapi.com/v1/breeds")
    const breedsJson = await breeds.json()
    return breedsJson.map(e => e.name)
  } catch (error) {
    console.error(error)
  }
}

function App() {
  const [cat, setCat] = useState({
    search: "",
    results: "",
  })
  const handleInput = e => {
    const value = e.target.value
    setCat(prevState => {
      return {
        ...prevState,
        search: value,
      }
    })
  }

  const search = async e => {
    try {
      if (e.key === "Enter") {
        const results = await fetch(
          "https://api.thecatapi.com/v1/breeds/search?q=" + cat.search
        )
        const resultsJSON = await results.json()
        if (!resultsJSON.length) {
          const breedList = await listBreeds()
          setCat(prevState => {
            return {
              ...prevState,
              results: `No cat found, here is a list of the possible cats: ${breedList}`,
            }
          })
        } else {
          setCat(prevState => {
            return {
              ...prevState,
              results: resultsJSON[0].description,
            }
          })
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="App">
      <h1> Cat app </h1>
      <Search handleInput={handleInput} search={search} />
      <Results results={cat.results} />
    </div>
  )
}

export default App
