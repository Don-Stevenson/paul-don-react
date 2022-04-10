import "./App.css"
import React, { useState, useEffect } from "react"
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
  const [searchCat, setSearchCat] = useState("")
  const [descriptionResults, setDescrptionResults] = useState("")
  const [imageResults, setImageResults] = useState("")

  const fetchImage = async () => {
    const res = await fetch(setImageResults)
    const imageBlob = await res.blob()
    const imageObjectURL = URL.createObjectURL(imageBlob)
    setImageResults(imageObjectURL)
  }

  useEffect(() => {
    fetchImage()
  }, [])

  const handleInput = e => {
    const value = e.target.value
    setSearchCat(value)

    // [...prevState, resultsJSON[0].description]
  }

  const search = async e => {
    try {
      if (e.key === "Enter") {
        const results = await fetch(
          "https://api.thecatapi.com/v1/breeds/search?q=" + searchCat
        )
        const resultsJSON = await results.json()
        console.log({ resultsJSON })
        if (!resultsJSON.length) {
          const breedList = await listBreeds()
          setDescrptionResults(prevState => {
            return [
              ...prevState,
              `No cat found, here is a list of the possible cats: ${breedList}`,
            ]
          })
        } else {
          setDescrptionResults(prevState => {
            return [...prevState, resultsJSON[0].description]
          })
          setSearchCat("")
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="App">
      <h1> Cat App </h1>
      <Search handleInput={handleInput} search={search} />
      <Results results={[descriptionResults, imageResults]} />
    </div>
  )
}

export default App
