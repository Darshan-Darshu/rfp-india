export interface User {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface Error {
  err: string;
}
