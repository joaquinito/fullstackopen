
/*
Type aliases and interfaces are very similar, and in many cases you can choose between them freely.
Almost all features of an interface are available in type, the key distinction is that a type 
cannot be re-opened to add new properties vs an interface which is always extendable.
*/
interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Input {
  dailyExerciseHours: number[],
  target: number,
}

const parseArgumentsExerciseCalculator = (args: string[]): Input => {
  if (args.length < 4){
    throw new Error('Not enough arguments.');
  }  
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      target: Number(args[2]),
      dailyExerciseHours: args.slice(3).map(arg => Number(arg))
    };
  } 
  else {
    throw new Error('Provided values are not numbers.');
  }
};

const calculateExercises = (dailyExerciseHours: number[], target: number) => {

  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(element => element !== 0).length;

  const exerciseHoursSum = dailyExerciseHours.reduce(
    (accumulator: number, elementValue: number) => accumulator + elementValue, 0);

  const averageExerciseHoursPerDay = exerciseHoursSum / periodLength;

  let success: boolean;
  let rating: number;
  let ratingDescrition: string;

  if(averageExerciseHoursPerDay < target){
    success = false;
    if(averageExerciseHoursPerDay < target - 1){
      rating = 1;
      ratingDescrition = "You need to dedicate more time to exercise";
    }
    else{
      rating = 2;
      ratingDescrition = "Not too bad but could be better";
    }
  }
  else{
    success = true;
    rating = 3;
    ratingDescrition = "Good job, you are meeting your target";
  }

  const response: Result = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescrition,
    target: target,
    average: averageExerciseHoursPerDay
  };

  return response;
};

try {
  const {dailyExerciseHours, target} = parseArgumentsExerciseCalculator(process.argv);
  console.log(calculateExercises(dailyExerciseHours, target));
} 
catch (error: unknown) {
  let errorMessage = 'Error: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  else {
    errorMessage += "something went wrong.";
  }
  console.log(errorMessage);
}


export { Input, calculateExercises };