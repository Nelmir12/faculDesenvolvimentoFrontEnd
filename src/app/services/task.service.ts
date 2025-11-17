import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  subjectId: number;
  dueDate: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private api = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.api);
  }

  getById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.api}/${id}`);
  }

  add(task: Task): Observable<Task> {
    return this.http.post<Task>(this.api, task);
  }

  update(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.api}/${id}`, task);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
