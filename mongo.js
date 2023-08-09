
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Error: You must give password as argument')
    process.exit(1)
}

const password = encodeURIComponent(process.argv[2])

const url =
    `mongodb+srv://rjoaquinito:${password}@cluster0.1nncgcq.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

else if(process.argv.length === 4){
    console.log('Error: You must give name and number as arguments - only name given')
    process.exit(1)
}

else if(process.argv.length > 4){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(result => {
        console.log('Person saved!')
        mongoose.connection.close()
    })
}
