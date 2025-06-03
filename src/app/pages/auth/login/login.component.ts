import { ChangeDetectionStrategy, Component, DestroyRef, inject, NgZone, OnDestroy, Signal, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { catchError, map, of, Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { LoaderDirective } from '../../../directives/loader.directive';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, MatIconModule, LoaderDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy{
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>();
  private router = inject(Router);
  private ngZone = inject(NgZone);

  isLoggged = signal(false);
  currentForm : 'Login' | 'Signup' = 'Signup';
  isError = signal(false);
  isLoading = signal(false);

  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

   onSubmit(){
    if(!this.form.valid){
      return;
    }

    const username = this.form.value.username;
    const password = this.form.value.password;

    this.isLoading.set(true);

    this.ngZone.runOutsideAngular(() => 
      setTimeout(() => {
        this.authService.login(username, password).pipe(
          takeUntil(this.destroy$),
        ).subscribe({
          next: (res)=> {
            console.log('Login response:', res);
            this.isLoggged.set(true);
            this.isLoading.set(false);
            this.router.navigateByUrl('/');
          },
          error: (err: HttpErrorResponse) => {
            if(err.status === 400){
              this.isError.set(true);
              console.error('invalid credentials');
              this.isLoading.set(false);
            }
          }
        });
      }, 3000)
    )
  }

  ngOnDestroy(): void {
     this.destroy$.next();
    this.destroy$.complete();
  }
}
