
interface BodyMeasurements {
  height: number;
  weight: number;
}

const parseArgumentsBmiCalculator = (args: string[]): BodyMeasurements => {
  if (args.length < 4){
    throw new Error('Not enough arguments.');
  } 
  if (args.length > 4) {
    throw new Error('Too many arguments.');
  } 
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } 
  else {
    throw new Error('Provided values are not numbers.');
  }
};

const calculateBmi = (height: number, weight: number): string => {

  // Formula for Body Mass Index can be found online
  const bmi = (weight / (height / 100) ** 2);

  if(bmi < 18.5){
    return "Underweight (unhealthy weight)"; 
  }
  if(bmi >= 18.5 && bmi < 25)
  {
    return "Normal range (healthy weight)";
  }
  if(bmi >= 25 && bmi < 30)
  {
    return "Overweight (unealthy weight)";
  }
  else
  {
    return "Obese (unealthy weight)";
  }
};

try {
  const { height, weight } = parseArgumentsBmiCalculator(process.argv);
  console.log(calculateBmi(height, weight));
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

export { calculateBmi };