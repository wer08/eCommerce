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
}

