import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Subject {
  id: number;
  name: string;
  teacher?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private API = 'http://localhost:3001/subjects';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.API);
  }

  getById(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.API}/${id}`);
  }

  create(data: Omit<Subject, 'id'>): Observable<Subject> {
    return this.http.post<Subject>(this.API, data);
  }

  update(id: number, data: Partial<Subject>): Observable<Subject> {
    return this.http.patch<Subject>(`${this.API}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
