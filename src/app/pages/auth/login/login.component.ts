import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnDestroy, Signal, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { catchError, map, of, Subject, takeUntil } from 'rxjs';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy{
  private authService = inject(AuthService);
  // private destroyRef = inject(DestroyRef);
  private destroy$ = new Subject<void>();
  private router = inject(Router)

  isLoggged = signal(false);
  currentForm : 'Login' | 'Signup' = 'Signup';
  isError = signal(false);

  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

   onSubmit(){
    if(!this.form.valid){
      return;
    }
    // const email = this.form.value.email;
    const username = this.form.value.username;
    const password = this.form.value.password;

    this.authService.login(username, password).pipe(
      takeUntil(this.destroy$),
      map((res) => {
        console.log('Login response:', res);
        this.isLoggged.set(true);
      }),
    ).subscribe({
      next: ()=> this.router.navigateByUrl('/'),
      error: (err: HttpErrorResponse) => {
        if(err.status === 400){
          this.isError.set(true);
          console.error('invalid credentials')
        }
      }
    });

    // this.destroyRef.onDestroy(() => sup.unsubscribe())
  }

  ngOnDestroy(): void {
     this.destroy$.next();
    this.destroy$.complete();
  }
}
