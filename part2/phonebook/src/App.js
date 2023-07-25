import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterText, setNewFilterText] = useState('')
    const [filteredPersons, setNewFilteredPersons] = useState([])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterTextChange = (event) => {
        setNewFilterText(event.target.value)
        
        // Case insensity is achieved by putting both strings in lower case.
        // Because of the asynchronous nature of the React state set function,
        // we cannot use the filterText variable yet.
        let filteredArray = persons.filter(
            person => person.name.toLowerCase().includes(
                      event.target.value.toLowerCase()))

        setNewFilteredPersons(filteredArray)
        console.log(filteredArray)   
    }

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.find(person => person.name === newName)){
            alert(`${newName} is already added to phonebook`)
        }
        else {
            setPersons(persons.concat({name: newName, number: newNumber, 
                                    id: persons.length+1}))                          
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter text={filterText} handlerFunction={handleFilterTextChange}/>
            <h2>add a new</h2>
            <PersonForm nameInput={newName} nameHandlerFunction={handleNameChange}
                        numberInput={newNumber} numberHandlerFunction={handleNumberChange}
                        submitEventHandler={addPerson}/>
            <h2>Numbers</h2>
            <Persons personList={filterText? filteredPersons: persons}/>
        </div>
    )
}

export default App