import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { Input, calculateExercises } from './exerciseCalculator';
const app = express();

const PORT = 3003;


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

// Endpoint for the BMI calculator. 
// For example, to get the BMI of a person with a height of 180 and a weight of 72, 
// the URL is http://localhost:3003/bmi?height=180&weight=72.
app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters"});
    return;
  }

  const bmi = calculateBmi(height, weight);
  res.json({
    height,
    weight,
    bmi
  });
});

/*  Endpoint for the exercise calculator.
  For example, for a target of 2 hours per day, with 1-hour workout on Monday, 2 hours on Wednesday,
  3 hours on Friday, and 2.5 hours on Sunday, the request body is:
   {
     "target": 2,
     "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5]
   } */
app.post('/exercises', express.json(), (req, res) => {
  const { dailyExerciseHours, target } = req.body as Input;

  if (!dailyExerciseHours || !target) {
    res.status(400).json({ error: "parameters missing"});
    return;
  }

  if (!Array.isArray(dailyExerciseHours) || 
      !dailyExerciseHours.every(element => typeof element === 'number') || 
      typeof target !== 'number') {
    res.status(400).json({ error: "malformatted parameters"});
    return;
  }

  const result = calculateExercises(dailyExerciseHours, target);
  res.json(result);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});