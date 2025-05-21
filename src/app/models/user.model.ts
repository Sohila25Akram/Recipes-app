export interface User {
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    gender: 'male' | 'female',
    image: string,
    accessToken: string,
    refreshToken: string
}

export interface HttpSignupResponse{
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    gender: 'male' | 'female',
    image?: string,
    password: string,
    age?: number
}

export class User {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public gender: 'male' | 'female',
    public image: string,
    public accessToken: string,
    public refreshToken: string
  ) {}
}

export interface Token{
  accessToken: string,
  refreshToken: string
}

export interface httpLoginResponse{
  accessToken: string,
  email: string,
  firstName: string,
  gender: 'male' | 'female',
  id: number,
  image: string,
  lastName: string,
  refreshToken: string,
  username: string 
}

// export interface LogedUser extends NewUser{
//     registered: boolean
// }

// export interface NewUser{
//     idToken: string,
//     email: string,
//     refreshToken: string,
//     expiresIn: string,
//     localId: string
// }