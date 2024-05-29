enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

type PublicPatient = Omit<Patient, "ssn">;

type NewPatient = Omit<Patient, "id">;

export { 
  Gender,
  Diagnosis, 
  Patient, 
  PublicPatient, 
  NewPatient
};

