import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Directive, Input } from '@angular/core';


@Directive({
  selector: '[appLoader]'
})
class MockLoaderDirective {
  @Input('appLoader') appLoader: boolean = false;
  @Input() isButton: boolean = false;
}


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
    mockAuthService.login.and.returnValue(of());

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of([]),
            queryParams: of({}),
            snapshot: { paramMap: new Map() },
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should onSubmit Called when click submit btn', () => {
  //   const btnEl = fixture.debugElement.query(By.css('button')).nativeElement;

  //   spyOn(component, 'onSubmit');

  //   btnEl.click;
  //   fixture.detectChanges();

  //   expect(component.onSubmit).toHaveBeenCalled()
  // });
  it('should render error container when isError set to true', () => {
    component.isError.set(true);
    fixture.detectChanges()

    const errorEl = fixture.debugElement.query(By.css('.error'));

    expect(errorEl).toBeTruthy();
  });
  describe('testing inputs', () => {
    const mockData = {username: 'username test', password: 'password test'};

    it('should input value with empty initial value', () => {
      const inputUsernameEl = fixture.debugElement.query(By.css('#username')).nativeElement;
      const inputPasswordEl = fixture.debugElement.query(By.css('#password')).nativeElement;

      expect(inputUsernameEl.value).toBe('');
      expect(inputPasswordEl.value).toBe('');
    });
     it('should placeholder be correct', () => {
      const inputUsernameEl = fixture.debugElement.query(By.css('#username')).nativeElement;
      const inputPasswordEl = fixture.debugElement.query(By.css('#password')).nativeElement;

      expect(inputUsernameEl.placeholder).toBe('username');
      expect(inputPasswordEl.placeholder).toBe('password');


    })
    it('should bind input value to username control', () => {
      const inputUsernameEl = fixture.debugElement.query(By.css('#username')).nativeElement;
      const inputPasswordEl = fixture.debugElement.query(By.css('#password')).nativeElement;


      inputUsernameEl.value  = mockData.username;
      inputUsernameEl.dispatchEvent(new Event('input'));

      inputPasswordEl.value  = mockData.password;
      inputPasswordEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.form.controls['username'].value).toBe(mockData.username);
      expect(component.form.controls['password'].value).toBe(mockData.password);

    });
    it('should reflect username control value to the input value', fakeAsync(() => {
      component.form.controls['username'].setValue(mockData.username);
      component.form.controls['password'].setValue(mockData.password);

      fixture.detectChanges();
      tick();

      const inputUsernameEl = fixture.debugElement.query(By.css('#username')).nativeElement;
      const inputPasswordEl = fixture.debugElement.query(By.css('#password')).nativeElement;

      expect(inputUsernameEl.value).toBe(mockData.username)
      expect(inputPasswordEl.value).toBe(mockData.password)

    }))
  })
  it('should desabled button when form not valid', () => {
    component.form.controls['username'].setValue('');
    component.form.controls['password'].setValue('1234');
    fixture.detectChanges()

    expect(component.form.invalid).toBeTrue();

    const btnEl = fixture.debugElement.query(By.css('button')).nativeElement;

    expect(btnEl.disabled).toBeTrue();
 
  })
  //  it('should pass isLoading value to appLoader directive', () => {
  //   component.isLoading.set(false);
  //   fixture.detectChanges();

  //   component.form.controls['username'].setValue('ioooiooioioi');
  //   component.form.controls['password'].setValue('12344444444444');

  //   fixture.detectChanges();

  //   const loaderDirective = fixture.debugElement.query(By.directive(MockLoaderDirective)).injector.get(MockLoaderDirective);
  //   expect(loaderDirective.appLoader).toBeTrue();
  // });
  it('should login text disappear when isLoading set to true', () => {
    const loginTextEl = fixture.debugElement.query(By.css('button .text')).nativeElement;
    expect(loginTextEl.style.display).not.toBe('none'); 
    
    component.isLoading.set(true);
    fixture.detectChanges();

    expect(loginTextEl.style.display).toBe('none'); 
  })

  //------isolated - testing -------
  it('should do nothing when form not valid', () => {
    const mockData = {username: '', password: ''};

    component.form.controls['username'].setValue(mockData.username);
    component.form.controls['password'].setValue(mockData.password);
    fixture.detectChanges();


    expect(component.form.invalid).toBeTrue();

    component.onSubmit();
    expect(mockAuthService.login).not.toHaveBeenCalled();
  });
  it('should call login on valid input values', fakeAsync(() => {
    callLogin();
  }));

  it('should navigate to home and set isloading with false when login on success', fakeAsync(() => {
    callLogin();

    expect(component.isLoading()).toBe(false);
    expect(component.isLoggged()).toBe(true);

  }));
  it('should isError set with true and set isloading with false when login on fail', () => {
    
  })

  function callLogin(){
    const mockData = {username: 'username test', password: '12345678'};

    component.form.controls['username'].setValue(mockData.username);
    component.form.controls['password'].setValue(mockData.password);
    fixture.detectChanges();

    expect(component.form.invalid).toBeFalse();

    component.onSubmit();

    tick(3000);

    expect(mockAuthService.login).toHaveBeenCalledWith(mockData.username, mockData.password);
  }
});
