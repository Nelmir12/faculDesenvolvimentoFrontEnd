import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, TaskStatus } from './task.model';

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

  /** Retorna todas as tarefas */
  getAll(): Observable<Task[]> {
    return this.tasks$.asObservable();
  }

  /** Busca tarefa por ID */
  getById(id: number): Observable<Task | undefined> {
    return new Observable(sub => {
      const result = this.tasks$.value.find(t => t.id === id);
      sub.next(result);
      sub.complete();
    });
  }

  /** Criar nova tarefa */
  create(data: Partial<Task>): Observable<Task> {
    const current = this.tasks$.value;

    const newTask: Task = {
      id: current.length > 0 ? Math.max(...current.map(t => t.id)) + 1 : 1,
      title: data.title ?? '',
      description: data.description ?? '',
      due: data.due ?? '',
      subjectId: data.subjectId ?? 0,
      status: (data.status as TaskStatus) ?? 'pendente'
    };

    this.tasks$.next([...current, newTask]);

    return new BehaviorSubject(newTask).asObservable();
  }

  /** Atualiza uma tarefa existente */
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

  /** Alternar status pendente <-> concluida */
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

  /** Remove uma tarefa */
  remove(id: number): Observable<void> {
    const updated = this.tasks$.value.filter(t => t.id !== id);
    this.tasks$.next(updated);
    return new BehaviorSubject<void>(undefined).asObservable();
  }
}
