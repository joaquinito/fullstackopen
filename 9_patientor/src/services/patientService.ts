import { v4 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { Patient, PublicPatient, NewPatient } from '../types';

const patients: Array<PublicPatient> = patientData;

/* TypeScript only checks whether we have all of the required fields or not, but excess fields are not prohibited.
We need to exclude the "id" and "ssn" fields ourselves, and that's why the map function is used here.
*/
const getPatients = (): Array<PublicPatient> => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient) : Patient => {

  const id = uuid();

  const newPatient = {
    id,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};


export default {
  getPatients,
  addPatient
};