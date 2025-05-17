import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form: FormGroup;
  errorLogin = false;
  showPassword = false;
  

  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);

  constructor() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // login() {
  //   if (this.form.invalid) {
  //     this.form.markAllAsTouched();
  //     return;
  //   }

  //   const { username, password } = this.form.value;

  //   this.auth.login(username, password).subscribe((user) => {
  //     if (user) {
  //       this.errorLogin = false;
  //       if (user.role === 'gestore') {
  //         this.router.navigate(['/manager']);
  //       } else if (user.role === 'operatore') {
  //         this.router.navigate(['/operator']);
  //       }
  //     }
  //   });
  // }

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, password } = this.form.value;

    this.auth.login(username, password).subscribe({
      next: (user) => {
        if (user) {
          this.errorLogin = false; // resetta errore se login valido

          // Controlla il ruolo e redirige
          if (user.role === 'gestore') {
            this.router.navigate(['/manager']);
          } else if (user.role === 'operatore') {
            this.router.navigate(['/operator']);
          }
        }
      },
      error: (err) => {
        // Mostra l'errore se le credenziali sono scorrette
        this.errorLogin = true;
        console.error('Errore di login:', err.message);
      },
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePassword() {
    this.showPassword = !this.showPassword
  }
}
