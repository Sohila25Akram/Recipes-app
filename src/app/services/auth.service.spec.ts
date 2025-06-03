import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { of } from 'rxjs';
import { HttpSignupResponse, User } from '../models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    mockApiService = jasmine.createSpyObj('ApiService', ['request']);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApiService,
          useValue: mockApiService
        }
      ]
    });

    // mockApiService.request.and.returnValue(of());

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should login with the newUser data', () => {
    const mockUser = {
      username: 'JohnDuo',
      password: '12345678'
    };

    const storedNewUser = {
      id: 1,
      username: 'JohnDuo',
      email: 'duo@example.com',
      firstName: 'John',
      lastName: 'Duo',
      gender: 'male',
      image: 'https://example.com/avatar.jpg',
      password: '12345678'
    } as HttpSignupResponse;


    localStorage.setItem('newUser', JSON.stringify(storedNewUser));

    spyOn(service, 'createToken');


    service.login(mockUser.username, mockUser.password);

    expect(service.createToken).toHaveBeenCalledWith(storedNewUser);
  })
  it('should add new value to user subject when create a token', () => {
     const storedNewUser = {
      id: 1,
      username: 'JohnDuo',
      email: 'duo@example.com',
      firstName: 'John',
      lastName: 'Duo',
      gender: 'male',
      image: 'https://example.com/avatar.jpg',
      password: '12345678'
    } as HttpSignupResponse;

    const loggedUser: User = {
      id: 1,
      username: 'JohnDuo',
      email: 'duo@example.com',
      firstName: 'John',
      lastName: 'Duo',
      gender: 'male',
      image: 'https://example.com/avatar.jpg',
      accessToken: 'kkkkkkkk',
      refreshToken: 'kkkuyuyuuuu'
    };

    service.createToken(storedNewUser);

    service.user.subscribe((res) => {
      expect(res).toEqual(loggedUser);
    })
  })
  it('should login through apiService', () => {
    const mockUser = {
      username: 'JohnDuo',
      password: '12345678'
    };

    const expectedUser: User = {
      id: 1,
      username: 'JohnDuo',
      email: 'duo@example.com',
      firstName: 'John',
      lastName: 'Duo',
      gender: 'male',
      image: 'https://example.com/avatar.jpg',
      accessToken: 'kkkkkkkk',
      refreshToken: 'kkkuyuyuuuu'
    };

    mockApiService.request.and.returnValue(of(expectedUser));

    service.login(mockUser.username, mockUser.password).subscribe(() => {
      service.user.subscribe( user => {
        expect(user).toEqual(expectedUser);
      })
    })

    // const expectedUrl = 'https://dummyjson.com/user/login';

    // expect(mockApiService.request).toHaveBeenCalledWith(
    //   'POST',
    //   expectedUrl,{
    //     body: {
    //       username: mockUser.username,
    //       password: mockUser.password,
    //       expiresInMins: 30
    //     }
    //   }
    // )
  });
  it('should load user from localStorage and set user subject if accessToken exists', () => {
        const mockUserData = {
      id: 1,
      username: 'JohnDuo',
      email: 'duo@example.com',
      firstName: 'John',
      lastName: 'Duo',
      gender: 'male',
      image: 'https://example.com/avatar.jpg',
      accessToken: 'testAccessToken',
      refreshToken: 'testRefreshToken'
    };

    localStorage.setItem('userData', JSON.stringify(mockUserData));

    service.autoLogin();

    service.user.subscribe(user => {
      expect(user).toBeTruthy();
      expect(user?.username).toBe(mockUserData.username);
      expect(user?.accessToken).toBe(mockUserData.accessToken);
    });
  })
  it('should signup through apiService', () => {
    const mockUser = {
      username: 'JohnDuo',
      email: 'duo@example.com',
      firstName: 'John',
      lastName: 'Duo',
      age: 12,
      gender: 'male',
      image: 'https://example.com/avatar.jpg',
      password: '12345678',
      confirmPassword: '12345678'
    };

    const expectedUser: User = {
      id: 1,
      username: 'JohnDuo',
      email: 'duo@example.com',
      firstName: 'John',
      lastName: 'Duo',
      gender: 'male',
      image: 'https://example.com/avatar.jpg',
      accessToken: 'kkkkkkkk',
      refreshToken: 'kkkuyuyuuuu'
    };

    mockApiService.request.and.returnValue(of(expectedUser));

    service.signup(mockUser.firstName, mockUser.lastName, mockUser.age, mockUser.username, mockUser.email, mockUser.gender, mockUser.password, mockUser.image).subscribe((res) => {
      expect(res).toEqual(expectedUser)
    })

    const expectedUrl = 'https://dummyjson.com/user/add';

    expect(mockApiService.request).toHaveBeenCalledWith(
      'POST',
      expectedUrl,{
        body: {
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          age: mockUser.age,
          username: mockUser.username,
          email: mockUser.email,
          gender: mockUser.gender,
          password: mockUser.password,
          image: mockUser.image
        }
      }
    )
  });
});
