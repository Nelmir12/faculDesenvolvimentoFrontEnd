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

  getAll(): Observable<Subject[]> {
    return this.subjects$.asObservable();
  }

  getById(id: number): Observable<Subject | undefined> {
    return new Observable(sub => {
      const result = this.subjects$.value.find(s => s.id === id);
      sub.next(result);
      sub.complete();
    });
  }

  create(data: Omit<Subject, 'id'>): Observable<Subject> {
    const current = this.subjects$.value;
    const newSubject: Subject = {
      ...data,
      id: current.length > 0 ? Math.max(...current.map(s => s.id)) + 1 : 1
    };

    this.subjects$.next([...current, newSubject]);

    return new BehaviorSubject(newSubject).asObservable();
  }
}
