import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const Results = () => {
    const filterResults = () => {
      return countries.filter((current) => current.name.toLowerCase().match(searchValue.toLowerCase()))
    }

    const results = filterResults()
    if (!searchValue || (results.length > 10)) return <p>Too many results. Refine filter.</p>

    const List = () => (
    <>
      <h2>Search results ({results.length})</h2>
      <ul>
        {results.map(country => (
            <li key={country.name}>
              {country.name}&nbsp;
              <button onClick={() => setSearchValue(country.name)}>show</button>
            </li>
          )
        )}
      </ul>
    </>
    )

    const Details = () => (
      <>
      <h1>{results[0].name}</h1>
      <img alt={`the flag of ${results[0].name}`} src={results[0].flag} width="150" />
      <p>
        <strong>Capital:</strong> {results[0].capital}<br />
        <strong>Population:</strong> {results[0].population}
      </p>
      <h2>Languages</h2>
      <ul>
        {results[0].languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
      </ul>
      </>

    )

    return (
      <>
      {results.length === 1 ? <Details /> : <List />}
      </>
    )
  }

  return (
    <div>
      Find countries <br/>
      <input onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />

      <Results />
    </div>
  )
}

export default App
