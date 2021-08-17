import React, { useEffect, useState } from 'react'
import personsService from './services/persons'

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

const Persons = ({displayList, handleDeleteClick}) => {
  const Person = (person) => (
    <li key={person.name}>{person.name}, {person.number}
    <button key={person.name} onClick={() => handleDeleteClick(person.id)}>Delete</button></li>
  )

  return (
    <ul>
      {displayList.map(person => <Person key={person.name} {...person} />)}
    </ul>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchFilter, setSearchFilter ] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(result => setPersons(result))
  }, [])

  const handleAddClick = (e) => {
    e.preventDefault()
    if (!newName || !newNumber) return

    const exists = persons.find(p => p.name.toLocaleLowerCase() === newName.trim().toLocaleLowerCase())

    if (exists) {
      let message = `${newName} is already added to phonebook.`

      if (newNumber.replace(/\D/g, '') === exists.number.replace(/\D/g, '')) {
        alert(message)
        return
      }
      else {
        if (window.confirm(message + ' Do you want to replace the number with the new one?')) {
          personsService
            .update(exists.id, {'name': exists.name, 'number': newNumber.trim()})
            .then(result => setPersons(persons.map(p => p.id === exists.id ? result : p)))
            .catch(error => alert(error))

          setNewName('')
          setNewNumber('')
        }
      }
    }
    else {
      personsService
      .create({'name': newName.trim(), 'number': newNumber.trim()})
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => alert(error))
    }
  }

  const handleDeleteClick = (id) => {
    const name = persons.find(p => p.id === id).name
    if (window.confirm(`Are you sure to delete ${name}?`)) {
      personsService
      .remove(id)
      .then(result => setPersons(persons.filter(curr => curr.id !== id)))
      .catch(error => alert(error))
    }
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
      <Persons displayList={displayList} handleDeleteClick={handleDeleteClick} />
    </div>
  )
}

export default App
