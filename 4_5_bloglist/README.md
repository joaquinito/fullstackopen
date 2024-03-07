# bloglist

Solution for exercises 4.1-4.23 (server) and 5.1-5.23 (server) of the Full Stack Open course.

Links:

* https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing#exercises-4-1-4-2
* https://fullstackopen.com/en/part4/legacy_testing_with_jest#exercises-4-3-4-7
* https://fullstackopen.com/en/part4/legacy_testing_with_jest#exercises-4-8-4-12
* https://fullstackopen.com/en/part4/legacy_testing_with_jest#exercises-4-13-4-14
* https://fullstackopen.com/en/part4/token_authentication#exercises-4-15-4-23
* https://fullstackopen.com/en/part5/login_in_frontend#exercises-5-1-5-4
* https://fullstackopen.com/en/part5/props_children_and_proptypes#exercises-5-5-5-11
* https://fullstackopen.com/en/part5/props_children_and_proptypes#exercise-5-12
* https://fullstackopen.com/en/part5/testing_react_apps#exercises-5-13-5-16
* https://fullstackopen.com/en/part5/end_to_end_testing_cypress#exercises-5-17-5-23

The server was set up with [create-react-app](https://github.com/facebook/create-react-app) (CRA).

The client was set up with [Vite](https://github.com/vitejs/vite).

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

## Requirements

* Install npm.

* Install JS package dependencies in the *client* and *server*:

  ```bash
  npm install
  ```

* Create a file named *.env* in the *server* folder and add the following:

  ```
  MONGODB_URI=<URI>
  PORT=<port>
  ```

  The MongoDB URI can be obtained in the MongoDB Atlas database dashboard.

## Run the tests

In *server*, run:
```
npm test
```

In *client*, to run Jest unit tests:
```
npm test
```

In *client*, to open the Cypress end-to-end test suite:
```
npm run cypress:open
```



## Run the app

In *server*, run:
```
npm start
```

In *client*, run:
```
npm run dev
```
