import './App.css'
import React, { useState } from "react"
import Results from './components/Results'
import Search from './components/Search'

const catFetch = async () => {
  try {
    const cat = await fetch(
      "https://api.thecatapi.com/v1/breeds/search?q=maine%20coon"
    )
    const catJSON = await cat.json()
    console.log(catJSON[0].description)
    return catJSON
  } catch (error) {
    console.error(error)
  }
}

catFetch() // calls and logs to console below

function App() {

  const [cat, setCat] = useState({
    search: "",
    results: ""
  })
  console.log("setcat =>", setCat)
  console.log("cat =>", cat)

  const handleInput = (e) => {
    const value = e.target.value
    setCat((prevState) => {
      return {
        ...prevState,
        search: value
      }
    })
  }

  async function search(e) {
    try {
      if (e.key === 'Enter') {
        const results = await fetch("https://api.thecatapi.com/v1/breeds/search?q=" + cat.search)
        const resultsJSON = await JSON.parse(results)
        setCat(prevState => {
          return {
            ...prevState,
            results: resultsJSON.data["0"].description
          }
        }

        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="App">
      <h1> Cat app </h1>
      <h2>-------------</h2>
      <Search handleInput={handleInput} search={search} />
      <Results
        results={cat.results}
      />
      <h2> ------------</h2>
    </div>
  )
}

export default App
