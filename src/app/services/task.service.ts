import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private API = 'http://localhost:3001/tasks';

  constructor(private http: HttpClient) {}

  /** Listar todas as tarefas */
  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API);
  }

  /** Buscar tarefa por ID */
  getById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.API}/${id}`);
  }

  /** Criar tarefa */
  create(data: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.API, data);
  }

  /** Atualizar tarefa */
  update(id: number, data: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.API}/${id}`, data);
  }

  /** Alternar status pendente <-> concluída */
  toggleDone(id: number): Observable<Task> {
    return this.getById(id).pipe(
      switchMap(task => {
        const newStatus: TaskStatus =
          task.status === 'pendente' ? 'concluida' : 'pendente';

        // aqui o tipo bate com Partial<Task> (status: TaskStatus)
        return this.update(id, { status: newStatus });
      })
    );
  }

  /** Remover tarefa */
  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
