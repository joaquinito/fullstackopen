import { useState, useEffect } from 'react'
import personsDatabase from './services/personsDatabase'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterText, setFilterText] = useState('')
    const [filteredPersons, setFilteredPersons] = useState([])
    const [notificationMessage, setNotificationMessage] = useState({type: '', text: ''})

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterTextChange = (event) => {
        setFilterText(event.target.value)
        
        // Case insensivity is achieved by putting both strings in lower case.
        // Because of the asynchronous nature of the React state set function,
        // we cannot use the filterText variable yet.
        let filteredArray = persons.filter(
            person => person.name.toLowerCase().includes(
                      event.target.value.toLowerCase()))

        setFilteredPersons(filteredArray)
        console.log(filteredArray)   
    }

    const addPerson = (event) => {
        event.preventDefault()
        const targetPerson = persons.find(person => person.name === newName)

        if (targetPerson){
            if(window.confirm(`${newName} is already added to phonebook, 
                               replace the old number with a new one?`)){
                personsDatabase.replace(targetPerson.id, {...targetPerson, number: newNumber})
                    .then(() => personsDatabase.getAll())
                    .then(response => updateAllPersonsStateVariables(response.data))
                    .then(() => {setNotificationMessage({type: 'info', 
                                                         text: `${newName}'s number changed`})
                                 setTimeout(() => setNotificationMessage({type: '', text: ''}), 
                                            5000)
                                })
            }
        }
        else {
            personsDatabase.create({name: newName, number: newNumber})
                .then(() => personsDatabase.getAll())
                .then(response => updateAllPersonsStateVariables(response.data))
                .then(() => {setNotificationMessage({type: 'info', text: `Added ${newName}`})
                             setTimeout(()=> setNotificationMessage({type: '', text: ''}), 5000)
                            })  
        }
    }

    const updateAllPersonsStateVariables = (dbPersons) => {
        // Update both state variables 'persons' and 'filteredPersons'
        setPersons(dbPersons)
        let filteredArray = dbPersons.filter(
            person => person.name.toLowerCase().includes(
                      filterText.toLowerCase()))
        setFilteredPersons(filteredArray)
    }

    /* When deleting a person, make the user confirm this action first. 
       If confirmed, remove the person with this ID in the db, wait for action conclusion. 
       Then get the whole db content again, wait for action conclusion. 
       Then update our state variable persons with the db content, which will trigger the page
       re-render.
    */
    const deletePerson = (id) => {
        const targetPerson = persons.find(person => person.id === id)
        if(window.confirm(`Delete ${targetPerson.name}?`)){
            personsDatabase.remove(id).then(
                response => {personsDatabase.getAll().then(
                    response => updateAllPersonsStateVariables(response.data))}) 
        }
    }

    useEffect(() => {personsDatabase.getAll()
                                    .then(response => {setPersons(response.data)})}, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage}/>
            <Filter text={filterText} handlerFunction={handleFilterTextChange}/>
            <h2>add a new</h2>
            <PersonForm nameInput={newName} nameHandlerFunction={handleNameChange}
                        numberInput={newNumber} numberHandlerFunction={handleNumberChange}
                        submitEventHandler={addPerson}/>
            <h2>Numbers</h2>
            <Persons personList={filterText? filteredPersons : persons} 
                     deletePerson={deletePerson}/>
        </div>
    )
}

export default App