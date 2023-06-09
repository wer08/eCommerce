import { TItem } from "../items/types"

// Define a type for the slice state
export interface authState {
    access: string | null,
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
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password:string
}
export enum ROLE {
  USER,
  ADMIN
}

export type TArgActivate = {
    key: string
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
    id: number,
    firstName: string,
    lastName: string,
    password: string,
    items: TItem[],
    role: ROLE,
    enabled: boolean,
    accountNonExpired: boolean,
    credentialsNonExpired: boolean
    accountNonLocked: boolean,
}
export type TSignUpFormData = {
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  rePassword: string
}
export type TGoogleArg = {
  jwt: string,
  password: string
}
export type GoogleUser = {
  aud: string,
  azp: string,
  email: string,
  email_verified: boolean,
  exp: number,
  family_name: string,
  given_name: string,
  iat: number,
  iss: string,
  jti: string,
  name: string,
  nbf: number,
  picture: string,
  sub: string
}
export type TArgSocialAuthenticate = {
  code: string
}
export type TSocialDetail = {
  state: string,
  code: string;
  [key: string]: any;
}
export type TResponseFacebook = {
  access_token: string,
  user: User
}
export type TProfile = {
  username: string | undefined,
  email: string | undefined,
  firstName: string | undefined,
  lastName: string | undefined,
  password: string | undefined
}
