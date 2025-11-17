import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Subject {
  id: number;
  name: string;
  teacher?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private subjects$ = new BehaviorSubject<Subject[]>([
    { id: 1, name: 'Matemática', teacher: 'Carlos' }
  ]);

  /** Listar todas */
  getAll(): Observable<Subject[]> {
    return this.subjects$.asObservable();
  }

  /** Buscar por ID */
  getById(id: number): Observable<Subject | undefined> {
    return new Observable(sub => {
      const result = this.subjects$.value.find(s => s.id === id);
      sub.next(result);
      sub.complete();
    });
  }

  /** Criar disciplina */
  create(data: Omit<Subject, 'id'>): Observable<Subject> {
    const current = this.subjects$.value;

    const newSubject: Subject = {
      ...data,
      id: current.length > 0 ? Math.max(...current.map(s => s.id)) + 1 : 1
    };

    this.subjects$.next([...current, newSubject]);

    return new BehaviorSubject(newSubject).asObservable();
  }

  /** Atualizar disciplina */
  update(id: number, data: Partial<Subject>): Observable<Subject> {
    const current = this.subjects$.value;
    const index = current.findIndex(s => s.id === id);

    if (index === -1) throw new Error('Disciplina não encontrada.');

    const updated: Subject = {
      ...current[index],
      ...data
    };

    current[index] = updated;

    this.subjects$.next([...current]);

    return new BehaviorSubject(updated).asObservable();
  }

  /** Remover disciplina */
  delete(id: number): Observable<void> {
    const updated = this.subjects$.value.filter(s => s.id !== id);
    this.subjects$.next(updated);

    return new BehaviorSubject<void>(undefined).asObservable();
  }
}
