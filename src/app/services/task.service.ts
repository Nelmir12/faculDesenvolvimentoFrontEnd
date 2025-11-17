import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks$ = new BehaviorSubject<Task[]>([
    {
      id: 1,
      title: 'Exemplo',
      description: 'Tarefa inicial',
      due: '2024-12-01',
      subjectId: 1,
      status: 'pendente'
    }
  ]);

  getAll(): Observable<Task[]> {
    return this.tasks$.asObservable();
  }

  getById(id: number): Observable<Task | undefined> {
    return new Observable(sub => {
      const result = this.tasks$.value.find(t => t.id === id);
      sub.next(result);
      sub.complete();
    });
  }

  add(data: Omit<Task, 'id'>): Observable<Task> {
    const current = this.tasks$.value;

    const newTask: Task = {
      ...data,
      id: current.length > 0 ? Math.max(...current.map(t => t.id)) + 1 : 1
    };

    this.tasks$.next([...current, newTask]);

    return new BehaviorSubject(newTask).asObservable();
  }

  /** Atualizar tarefa */
  update(id: number, data: Partial<Task>): Observable<Task> {
    const current = this.tasks$.value;
    const index = current.findIndex(t => t.id === id);

    if (index === -1) throw new Error('Tarefa não encontrada');

    const updated: Task = {
      ...current[index],
      ...data
    };

    current[index] = updated;

    this.tasks$.next([...current]);

    return new BehaviorSubject(updated).asObservable();
  }

  /** Alternar status */
  toggleDone(id: number): Observable<Task> {
    const current = this.tasks$.value;
    const index = current.findIndex(t => t.id === id);

    if (index === -1) throw new Error('Tarefa não encontrada');

    const updated: Task = {
      ...current[index],
      status: current[index].status === 'pendente'
        ? 'concluida'
        : 'pendente'
    };

    current[index] = updated;
    this.tasks$.next([...current]);

    return new BehaviorSubject(updated).asObservable();
  }

  remove(id: number): Observable<void> {
    const current = this.tasks$.value.filter(t => t.id !== id);
    this.tasks$.next(current);
    return new BehaviorSubject<void>(undefined).asObservable();
  }
}
