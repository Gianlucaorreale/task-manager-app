import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;
  readonly http = inject(HttpClient);

  login(username: string, password: string): Observable<User | null> {
    return this.http
      .get<User[]>(
        `http://localhost:3000/users?username=${username}&password=${password}`
      )
      .pipe(
        map((users) => {
          if (users.length > 0) {
            // Utente trovato, login valido
            this.user = users[0];
            localStorage.setItem('user', JSON.stringify(this.user));
            return this.user;
          } else {
            // Se l'array è vuoto, credenziali scorrette
            throw new Error('Credenziali scorrette');
          }
        }),
        catchError((err) => {
          // Gestisci l'errore generico
          return throwError(() => new Error(err));
        })
      );
  }

  getUser() {
    return this.user || JSON.parse(localStorage.getItem('user') || 'null');
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }
}
