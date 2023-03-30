// Define a type for the slice state
export interface authState {
    access: string | null,
    refresh: string | null,
    isAuthenticated: boolean,
    status: string,
    error: string | null | undefined
    user: User | null
  }
  
export type TArgLogin = {
    username: string,
    password: string
  }
export type TArgSignUp = {
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  rePassword: string
}

export type TArgActivate = {
    uid: string,
    token: string
}
export type TArgPassConfirm = {
  uid: string,
  token: string,
  newPassword: string,
  reNewPassword: string
}
export type User = {
    username: string,
    email: string,
    firstName: string,
    lastName: string
}
export type TSignUpFormData = {
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  rePassword: string
}
export type TArgSocialAuthenticate = {
  state: string,
  code: string
}
export type TSocialDetail = {
  state: string,
  code: string;
  [key: string]: any;
}

