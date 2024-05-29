import { NewPatient, Gender } from './types';

/*
This kind of function is called a type guard. A type guard is a function that returns a boolean 
and has a type predicate ("text is string") as the return type.

The general form of a type predicate is "parameterName is Type", where the 'parameterName' is the
name of the function parameter and 'Type' is the targeted type.
*/
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(gender)
}; 

const isDate = (date: string): boolean => {
  //return Boolean(Date.parse(date));
  console.log(date)
  return true;
}

const isSocialSecurityNumber = (ssn: string): boolean => {
  //Must contain 6 digits, an hyphen, 3 digits, and a letter
  return /^\d{6}-\d{3}[a-zA-Z]$/.test(ssn);
};

/* 
We would like to have the assurance that the object in a POST request has the correct type. 
For that we define a function toNewPatient that receives the request body as a parameter and 
returns a properly-typed NewPatient object.

Since the idea of this function is to map fields of unknown type to fields of the correct type and
check whether they are defined as expected, this might be the rare case in which we want to allow 
the any type. Here we use the 'unknown' type, which is ideal type for our kind of situation of input 
validation since we don't yet need to define the type to match any type, but can first verify the 
type and then confirm that is the expected type.
*/
const toNewPatient = (object: unknown): NewPatient => {

  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing object');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 
      'gender' in object && 'occupation' in object) {

    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSocialSecurityNumber(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    };

    return newPatient;
  };

  throw new Error('Incorrect data: some fields are missing');
}

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth');
  }
  return dateOfBirth;
}

const parseSocialSecurityNumber = (ssn: unknown): string => {
  if (!isString(ssn) || !isSocialSecurityNumber(ssn)) {
    throw new Error('Incorrect or missing social security number');
  }
  return ssn;
}

const parseGender = (gender: unknown): string => {
  if(!isString(gender) || !isGender(gender)){
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if(!isString(occupation)){
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
}

export { toNewPatient };