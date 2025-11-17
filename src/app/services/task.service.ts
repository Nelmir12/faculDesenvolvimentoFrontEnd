import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pendente' | 'concluida';
  dueDate: string; // formato 'YYYY-MM-DD'
  subjectId: number;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  getBySubject(subjectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?subjectId=${subjectId}`);
  }

  create(task: Task): Observable<Task> {
    // JSON Server ignora o id e cria um novo
    const payload = { ...task };
    delete (payload as any).id;
    return this.http.post<Task>(this.apiUrl, payload);
  }

  update(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(term: string): Observable<Task[]> {
    const lower = term.toLowerCase();
    return this.http.get<Task[]>(this.apiUrl).pipe(
      map(tasks =>
        tasks.filter(t =>
          t.title.toLowerCase().includes(lower) ||
          t.description.toLowerCase().includes(lower)
        )
      )
    );
  }

  filterByStatus(status: 'pendente' | 'concluida'): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?status=${status}`);
  }

  toggleStatus(task: Task): Observable<Task> {
    const updated: Task = {
      ...task,
      status: task.status === 'pendente' ? 'concluida' : 'pendente',
    };

    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, updated);
  }
}
