export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface createUserData {
  email: string;
  password: string;
}
