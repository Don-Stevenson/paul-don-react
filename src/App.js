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

const getBreeds = () => {
  return fetch("https://api.thecatapi.com/v1/breeds").then ((response)=> {
    if(response.status === 200) {
      return response.json()
    } else {
      console.log('error')
    }
  }).then((res)=> {
    res.forEach(element => {
      console.log(element.name)
    });
  })
}
 getBreeds()

 
// https://api.thecatapi.com/v1/breeds
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
        const resultsJSON = await results.json()
        setCat(prevState => {
          return {
            ...prevState,
            results: resultsJSON[0].description
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
      
      <Search handleInput={handleInput} search={search} />
      <Results
        results={cat.results}
      />
   
    </div>
  )
}

export default App
