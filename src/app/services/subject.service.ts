import { Injectable } from '@angular/core';

export interface Subject {
  id: number; name: string; teacher?: string; tasks: number[];
}

@Injectable({ providedIn: 'root' })
export class SubjectService {
  private subjects: Subject[] = [];

  getAll() { return [...this.subjects]; }
  getById(id:number) { return this.subjects.find(s=>s.id===id) || null; }

  add(s: Omit<Subject,'id'>) {
    const id = Math.max(...this.subjects.map(x=>x.id), 0) + 1; // funciona com lista vazia
    const subj: Subject = { id, ...s };
    this.subjects.push(subj);
    return subj;
  }

  update(id:number, data: Partial<Subject>) {
    const i = this.subjects.findIndex(s=>s.id===id);
    if (i < 0) return null;
    this.subjects[i] = { ...this.subjects[i], ...data };
    return this.subjects[i];
  }

  remove(id:number) {
    this.subjects = this.subjects.filter(s=>s.id!==id);
  }
}
