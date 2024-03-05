# fullstackopen2

My submissions for the [Full Stack Open course](https://fullstackopen.com/en/).

Second repository, started for [Part 3 - Programming a server with NodeJS and Express](https://fullstackopen.com/en/part3).

### Phonebook app

The phonebook application is hosted in the [Fly](https://fly.io/) platform. 

It is accessible in this URL: https://phonebook-joaquinito.fly.dev/

### Database

The database is hosted in [MongoDB Atlas](https://www.mongodb.com/atlas/database).

### Environment variables

The URI used to connect to MongoDB Atlas in defined in a .env file in the project root directory. The same applies for the port used by the app.

Create a .env file in the root directory and add the following variables:

```
MONGODB_URI=<URI>
PORT=<port>
```
The MongoDB URI can be obtained in the MongoDB Atlas database dashboard.