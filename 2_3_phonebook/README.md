# phonebook

Solution for exercises 2.6-2.17 (client) and 3.1-3.22 (server) of the Full Stack Open course.

Links:
* https://fullstackopen.com/en/part2/forms#exercises-2-6-2-10
* https://fullstackopen.com/en/part2/getting_data_from_server#exercise-2-11
* https://fullstackopen.com/en/part2/altering_data_in_server#exercises-2-12-2-15
* https://fullstackopen.com/en/part2/adding_styles_to_react_app#exercises-2-16-2-17
* https://fullstackopen.com/en/part2/adding_styles_to_react_app#exercises-2-18-2-20
* https://fullstackopen.com/en/part3/node_js_and_express#exercises-3-1-3-6
* https://fullstackopen.com/en/part3/node_js_and_express#exercises-3-7-3-8
* https://fullstackopen.com/en/part3/deploying_app_to_internet#exercises-3-9-3-11
* https://fullstackopen.com/en/part3/saving_data_to_mongo_db#exercise-3-12
* https://fullstackopen.com/en/part3/saving_data_to_mongo_db#exercises-3-13-3-14
* https://fullstackopen.com/en/part3/saving_data_to_mongo_db#exercises-3-15-3-18
* https://fullstackopen.com/en/part3/validation_and_es_lint#exercises-3-19-3-21
* https://fullstackopen.com/en/part3/validation_and_es_lint#exercise-3-22


The deployed phonebook application is hosted in the [Fly](https://fly.io/) platform. 

The MongoDB database is hosted in [MongoDB Atlas](https://www.mongodb.com/atlas/database).

## Deployed app

Deployed web app URL: https://phonebook-joaquinito.fly.dev/

## Environment variables

The URI used to connect to MongoDB Atlas in defined in a .env file in the project root directory. The same applies for the port used by the app.

Create a .env file in the root directory and add the following variables:

```
MONGODB_URI=<URI>
PORT=<port>
```
The MongoDB URI can be obtained in the MongoDB Atlas database dashboard.


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

## Run the app

Run in *client* and *server*:
```
npm start
```