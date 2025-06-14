import { ChangeDetectionStrategy, Component, inject, NgZone, OnDestroy, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';
import { catchError, debounceTime, map, of, Subject, take, takeUntil } from 'rxjs';
import { LoaderDirective } from '../../../directives/loader.directive';
import { Router } from '@angular/router';


function notContainsNumber(control: AbstractControl) {
  const value = control.value as string;
  if (value && /\d/.test(value)) {
    // Contains any digit (0-9)
    return { containNumber: true };
  }
  return null;
}
function notbeNegativeNumberOrZero(control: AbstractControl) {
  const val = control.value;
  if (val === null || val === undefined || val === '') {
    return null;
  }
  if(val && val > 0){
    return null;
  }
  return { lessThanOne : true}
}

// function shouldMatchPassword(formGroup: AbstractControl){
//   const password = formGroup.get('password')?.value;
//   const confirmPassword = formGroup.get('confirmPassword')?.value;

//   if (password === confirmPassword) {
//     return null; // valid
//   }

//   return {notMatchPassword: true}
// }

function shouldMatchPassword(formGroup: AbstractControl) {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;

  if (password && confirmPassword && password !== confirmPassword) {
    formGroup.get('confirmPassword')?.setErrors({ passwordNotEqual: true });
  }
  return null;
}


export class MyErrorStateMatcher implements MyErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, LoaderDirective],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnDestroy{
   private authService = inject(AuthService);
   private router = inject(Router);
   private destroy$ = new Subject<void>();
   private ngZone = inject(NgZone);


  isLoggged = signal(false);
  currentForm : 'Login' | 'Signup' = 'Signup';
  isLoading = signal<boolean>(false);

  dummyEmail = 'emily.johnson@x.dummyjson.com'

  form = new FormGroup({
    firstName: new FormControl('', {validators: [Validators.required, notContainsNumber]}),
    lastName: new FormControl('', {validators: [Validators.required, notContainsNumber]}),
    age: new FormControl(null, {validators: [notbeNegativeNumberOrZero]}),
    username: new FormControl(),
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    gender: new FormControl(),
    password: new FormControl('', {validators: [Validators.required,Validators.minLength(8)]}),
    confirmPassword: new FormControl('', {validators: [Validators.required]})
  }, { validators: shouldMatchPassword })

  
  onSubmit(){
    if(!this.form.valid){
      return;
    }


    const firstName = this.form.value.firstName!;
    const lastName = this.form.value.lastName!;
    const age = Number(this.form.value.age)!;
    const username = this.form.value.username;
    const email = this.form.value.email!;
    const gender = this.form.value.gender;
    const password = this.form.value.password;
    const confirmPassword = this.form.value.confirmPassword!;

    console.log(firstName, lastName, age, username, email ,gender,password, confirmPassword)
    
    this.isLoading.set(true);

    this.ngZone.runOutsideAngular(() => 
      setTimeout(() => {
        this.authService.signup(firstName, lastName, age, username, email, gender, password!, confirmPassword).pipe(
        takeUntil(this.destroy$)).subscribe(
          (res) => {
            console.log(res);
            this.isLoading.set(false);
            this.router.navigateByUrl('/auth');
          });
      }, 3000)
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  matcher = new MyErrorStateMatcher();
}
