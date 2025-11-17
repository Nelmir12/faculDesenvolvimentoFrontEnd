import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API = 'http://localhost:3001/users';

  constructor(private http: HttpClient) {}

  /** Listar todos os usuários (se precisar) */
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.API);
  }

  /** Buscar por ID (se precisar em Perfil futuramente) */
  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.API}/${id}`);
  }

  /**
   * "Login" simples usando JSON Server
   * Faz GET /users?email=...&password=...
   * Se achar, retorna o usuário, senão retorna null.
   */
  login(email: string, password: string): Observable<User | null> {
    const query =
      `?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    return this.http.get<User[]>(this.API + query).pipe(
      map(users => (users.length > 0 ? users[0] : null))
    );
  }
}
