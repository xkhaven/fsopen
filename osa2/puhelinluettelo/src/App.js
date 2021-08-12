import React, { useState } from 'react'

const Filter = ({value, handleChange}) => (
  <div>
    Filter names: <input name="filter" value={value} onChange={handleChange()} />
  </div>
)

const PersonForm = ({handleNewNameChange, handleNewNumberChange, newName, newNumber, handleAddClick}) => (
  <form>
    <div>
      Name: <input name="name" value={newName} onChange={handleNewNameChange()}/> <br/>
      Number: <input name="number" value={newNumber} onChange={handleNewNumberChange()}/>
    </div>
    <div>
      <button onClick={handleAddClick()} type="submit">add</button>
    </div>
  </form>
)

const Persons = ({displayList}) => {
  const Person = (person) => (
    <li key={person.name}>{person.name}, {person.number}</li>
  )

  return (
    <ul>
      {displayList.map(person => <Person key={person.name} {...person} />)}
    </ul>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchFilter, setSearchFilter ] = useState('')

  const handleAddClick = (e) => {
    e.preventDefault()
    if (!newName || !newNumber) return
    if (persons.find(current => current.name.toLocaleLowerCase() === newName.toLocaleLowerCase())) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({'name': newName, 'number': newNumber}))
    setNewName('')
    setNewNumber('')
  }

  const handleNewNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setSearchFilter(e.target.value)
  }

  const displayList = searchFilter
      ? persons.filter((person) => person.name.toLocaleLowerCase().match(searchFilter.toLocaleLowerCase()))
      : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchFilter} handleChange={() => handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        handleNewNameChange={() => handleNewNameChange}
        handleNewNumberChange={() => handleNewNumberChange}
        newName={newName}
        newNumber={newNumber}
        handleAddClick={() => handleAddClick}
      />

      <h3>Numbers</h3>
      <Persons displayList={displayList} />
    </div>
  )
}

export default App