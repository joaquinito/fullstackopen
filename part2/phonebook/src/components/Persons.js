import personsDatabase from "../services/personsDatabase"

const Persons = ({personList, deletePerson}) => {

    console.log("the personList: ", personList)
    return (
        (personList.map(person => 
            <div key={person.name}>{person.name} {person.number} &nbsp;
            <button onClick={() => deletePerson(person.id)}>delete</button></div>))
    )
}

export default Persons