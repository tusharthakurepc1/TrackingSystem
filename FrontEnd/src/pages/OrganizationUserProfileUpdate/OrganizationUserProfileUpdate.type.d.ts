interface UserStructure {
  email: string;
  firstName: string;
  lastName: string;
}

interface SystemUserStructure {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  dob: string,

}

export type { UserStructure, SystemUserStructure };
