import { Injectable } from '@angular/core';

export interface Subject {
  id: number; name: string; teacher?: string; tasks: number[];
}

@Injectable({ providedIn: 'root' })
export class SubjectService {
  private subjects: Subject[] = [
    { id:1, name:'Cálculo I',            teacher:'Prof. A', tasks:[1,2,5] },
    { id:2, name:'Estruturas de Dados',  teacher:'Prof. B', tasks:[3,6]   },
    { id:3, name:'Desenvolvimento Web',  teacher:'Dângelo', tasks:[4,7,8] },
    { id:4, name:'Banco de Dados',       teacher:'Prof. C', tasks:[]      },
  ];
  getAll() { return [...this.subjects]; }
  getById(id:number) { return this.subjects.find(s=>s.id===id) || null; }
  add(s: Omit<Subject,'id'>) {
    const id = Math.max(...this.subjects.map(x=>x.id), 0)+1;
    const subj: Subject = { id, ...s }; this.subjects.push(subj); return subj;
  }
  update(id:number, data: Partial<Subject>) {
    const i = this.subjects.findIndex(s=>s.id===id); if(i<0) return null;
    this.subjects[i] = { ...this.subjects[i], ...data }; return this.subjects[i];
  }
  remove(id:number) { this.subjects = this.subjects.filter(s=>s.id!==id); }
}
