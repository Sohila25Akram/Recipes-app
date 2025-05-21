import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnDestroy, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { catchError, map, of, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy{
  private authService = inject(AuthService);
  // private destroyRef = inject(DestroyRef);
  private destroy$ = new Subject<void>();

  isLoggged = signal(false);
  currentForm : 'Login' | 'Signup' = 'Signup';

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
        // localStorage.setItem('userData', JSON.stringify(res));
        this.isLoggged.set(true);
        return res;
      }),
      catchError((err) => {
        console.log('Login error:', err);
        return of([]);
      })
    ).subscribe();

    // this.destroyRef.onDestroy(() => sup.unsubscribe())
  }

  ngOnDestroy(): void {
     this.destroy$.next();
    this.destroy$.complete();
  }
}
