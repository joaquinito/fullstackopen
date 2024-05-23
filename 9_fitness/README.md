# "First steps with TypeScript"

Solution for exercises 9.1-9.7 of the Full Stack Open course.


## Body Mass Index calculator

Run the Body Mass Index (BMI) calculator with the following command:

```
npm run calculateBmi <weight> <height>
```

The output will indicate if the subject is underweight, normal weight, overweight or obese.


## Exercise calculator

The exercise calculator will tell you if you are meeting your target of daily exercise hours.
Run the exercise calculator with the following command:

```
npm run calculateExercises <target> [<daily_exercise_hours>] 
```
The daily exercise hours are given as an array that contains the number of exercise hours for each day in the training period.
The output is an object that includes the following values:

* the number of days
* the number of training days
* the original target value
* the calculated average time
* boolean value describing if the target was reached
* a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
* a text value explaining the rating, you can come up with the explanations


## REST API

Start the REST API with the following command:

```
npm run start
```

The server will run on port 3003. The following endpoints are available:

* GET /hello
* GET /bmi?weight=\<weight\>&height=\<height\>
* POST /exercises