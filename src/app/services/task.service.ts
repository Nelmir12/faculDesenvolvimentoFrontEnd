import { Injectable } from '@angular/core';

export type Status = 'todo' | 'doing' | 'done' | 'late';
export interface Task {
  id: number; title: string; subjectId: number; due: string; status: Status; description?: string;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  // ✅ sem dados iniciais (app "zerado")
  private tasks: Task[] = [];

  getAll() { return [...this.tasks]; }
  getById(id:number) { return this.tasks.find(t=>t.id===id) || null; }

  add(data: Omit<Task,'id'>) {
    const id = Math.max(...this.tasks.map(x=>x.id), 0) + 1; // funciona com lista vazia
    const t: Task = { id, ...data };
    this.tasks.push(t);
    return t;
  }

  update(id:number, data: Partial<Task>) {
    const i = this.tasks.findIndex(t=>t.id===id);
    if (i < 0) return null;
    this.tasks[i] = { ...this.tasks[i], ...data };
    return this.tasks[i];
  }

  remove(id:number) { this.tasks = this.tasks.filter(t=>t.id!==id); }

  toggleDone(id:number) {
    const t = this.getById(id);
    if (!t) return null;
    t.status = (t.status === 'done' ? 'todo' : 'done');
    return t;
  }
}
