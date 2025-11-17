import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';

export interface Subject {
  id: number;
  name: string;
  /** descrição da disciplina (opcional no dado cru, mas obrigatória no formulário) */
  description?: string;
  teacher?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  /** Endpoint do JSON Server para disciplinas */
  private API = 'http://localhost:3001/subjects';

  constructor(private http: HttpClient) {}

  /** Listar todas as disciplinas */
  getAll(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.API);
  }

  /**
   * Buscar disciplina por ID
   *
   * Mantemos Observable<Subject | undefined> para ficar compatível
   * com a assinatura antiga baseada em BehaviorSubject.
   * Se o JSON Server devolver 404, retornamos `undefined`.
   */
  getById(id: number): Observable<Subject | undefined> {
    return this.http.get<Subject>(`${this.API}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          return of(undefined);
        }
        return throwError(() => error);
      })
    );
  }

  /** Criar disciplina */
  create(data: Omit<Subject, 'id'>): Observable<Subject> {
    return this.http.post<Subject>(this.API, data);
  }

  /** Atualizar disciplina */
  update(id: number, data: Partial<Subject>): Observable<Subject> {
    return this.http.patch<Subject>(`${this.API}/${id}`, data);
  }

  /** Remover disciplina */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
