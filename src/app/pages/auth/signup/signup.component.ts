import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';
import { catchError, debounceTime, map, of, Subject, take, takeUntil } from 'rxjs';


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
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnDestroy{
   private authService = inject(AuthService);
   private destroy$ = new Subject<void>();

  isLoggged = signal(false);
  currentForm : 'Login' | 'Signup' = 'Signup';

  dummyEmail = 'emily.johnson@x.dummyjson.com'

  form = new FormGroup({
    firstName: new FormControl('', {validators: [Validators.required, notContainsNumber ],  updateOn: "blur"}),
    lastName: new FormControl('', {validators: [Validators.required, notContainsNumber ],  updateOn: "blur"}),
    age: new FormControl(null, {validators: [notbeNegativeNumberOrZero], updateOn: "blur"}),
    username: new FormControl(),
    email: new FormControl('', {validators: [Validators.required, Validators.email], updateOn: "blur"}),
    gender: new FormControl(),
    password: new FormControl('', {validators: [Validators.required,Validators.minLength(8)], updateOn: "blur"}),
    confirmPassword: new FormControl('', {validators: [Validators.required], updateOn: "blur"})
  }, { validators: shouldMatchPassword, updateOn: "blur" })

  
    
  
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
    
    this.authService.signup(firstName, lastName, age, username, email, gender, password!, confirmPassword).pipe(
      debounceTime(2000), takeUntil(this.destroy$)).subscribe((res) => console.log(res));
    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  matcher = new MyErrorStateMatcher();
}
