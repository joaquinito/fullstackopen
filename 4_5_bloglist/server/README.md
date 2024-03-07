# fullstackopen3
My submissions for the Full Stack Open course.

Third repository, started for [Part 4 - Testing Express servers, user administration](https://fullstackopen.com/en/part4).

## Environment variables

The URI used to connect to MongoDB Atlas in defined in a .env file in the project root directory. The same applies for the port used by the app and the secret string used to create the JsonWebToken.

Create a .env file in the root directory and add the following variables:

```
PORT=<port>
MONGODB_URI=<DB_URI>
TEST_MONGODB_URI=<TEST_DB_URI>
SECRET=<>
```

The MongoDB URIs can be obtained in the MongoDB Atlas database dashboard.