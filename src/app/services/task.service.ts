import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pendente' | 'concluida';
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
    return this.http.post<Task>(this.apiUrl, task);
  }

  update(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(term: string): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      map((tasks) =>
        tasks.filter((t) =>
          t.title.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }

  toggleDone(task: Task): Observable<Task> {
    const updated = {
      ...task,
      status: task.status === 'pendente' ? 'concluida' : 'pendente',
    };

    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, updated);
  }
}
