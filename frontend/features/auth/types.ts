// Define a type for the slice state
export interface authState {
    access: string | null,
    refresh: string | null,
    isAuthenticated: boolean,
    status: string,
    error: string | null | undefined
    user: User | null
  }
  
export type TPayloadLogin = {
    username: string,
    password: string
  }

export type TPayloadActivate = {
    uid: string,
    token: string
}
export type User = {
    username: string,
    email: string,
}

