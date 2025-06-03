import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpSignupResponse, User } from '../models/user.model';
import { BehaviorSubject, map, Observable, of, take } from 'rxjs';
// import { LogedUser } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]'
  private url = 'https://dummyjson.com/user';

  private apiService = inject(ApiService);

  user = new BehaviorSubject<User | null>(null);

  login(username: string, password: string) {
    const newUserString = localStorage.getItem('newUser');

    if (newUserString) {
    const newUser = JSON.parse(newUserString);


      if (newUser?.username === username && newUser?.password === password) {
        this.createToken(newUser);
      }
      return of();
    }else{
      return this.apiService.request<User>('POST', `${this.url}/login`, {
        body : {
          username: username,
          password: password,
          expiresInMins: 30
        },
      }).pipe(
        map(userData => {
          this.user.next(userData);
          localStorage.setItem('userData', JSON.stringify(userData));
        })
      )
    }  
  }

  createToken(currentSignupUser: HttpSignupResponse){
    const loginUser: User = {
      id: currentSignupUser.id,
      username : currentSignupUser.username,
      email: currentSignupUser.email,
      firstName: currentSignupUser.firstName,
      lastName: currentSignupUser.lastName,
      gender: currentSignupUser.gender,
      image: currentSignupUser.image!,
      accessToken: 'kkkkkkkk',
      refreshToken: 'kkkuyuyuuuu'
    } 

    this.user.next(loginUser);
    localStorage.setItem('userData', JSON.stringify(loginUser));
  }

  autoLogin(){
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      return;
    }
    const userData = JSON.parse(userDataString);

    const loadedUser = new User(
      userData.id,
      userData.username,
      userData.email,
      userData.firstName,
      userData.lastName,
      userData.gender,
      userData.image,
      userData.accessToken,
      userData.refreshToken
    );

    if(loadedUser.accessToken){
      this.user.next(loadedUser)
    }


  }

  signup(firstName: string, lastName: string, age:number, username: string, email: string, gender: string, password: string, image?: string){
     return this.apiService.request<User>('POST', `${this.url}/add`, {
      body : {
        firstName,
        lastName,
        age,
        username,
        email,
        gender,
        password,
        image,
      },
    })
    .pipe(
      map(res => {
        localStorage.setItem('newUser', JSON.stringify(res))
        return res;
      })
    )
  }

  // login(email: string, password: string){
  //   this.apiService.request<LogedUser>('POST', `${this.url}/...`, {
  //     body : {
  //       email: email,
  //       password: password,
  //       returnSecureToken: true
  //     },
  //   })
  // }
}
