import { Injectable } from '@angular/core';

export type Status = 'todo' | 'doing' | 'done' | 'late';
export interface Task {
  id: number; title: string; subjectId: number; due: string; status: Status; description?: string;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = [
    { id:1, title:'Lista 01',           subjectId:1, due:'2025-10-12', status:'todo'  },
    { id:2, title:'Revisão capítulo 2', subjectId:1, due:'2025-10-05', status:'late'  },
    { id:3, title:'Implementar fila',   subjectId:2, due:'2025-10-20', status:'todo'  },
    { id:4, title:'Protótipo Front',    subjectId:3, due:'2025-10-08', status:'doing' },
    { id:5, title:'Prova 1',            subjectId:1, due:'2025-10-25', status:'todo'  },
    { id:6, title:'Árvore AVL',         subjectId:2, due:'2025-10-28', status:'done'  },
    { id:7, title:'Relatório',          subjectId:3, due:'2025-10-06', status:'done'  },
    { id:8, title:'Leitura artigos',    subjectId:3, due:'2025-10-22', status:'todo'  },
  ];
  getAll() { return [...this.tasks]; }
  getById(id:number) { return this.tasks.find(t=>t.id===id) || null; }
  add(data: Omit<Task,'id'>) {
    const id = Math.max(...this.tasks.map(x=>x.id), 0)+1;
    const t: Task = { id, ...data }; this.tasks.push(t); return t;
  }
  update(id:number, data: Partial<Task>) {
    const i = this.tasks.findIndex(t=>t.id===id); if(i<0) return null;
    this.tasks[i] = { ...this.tasks[i], ...data }; return this.tasks[i];
  }
  remove(id:number) { this.tasks = this.tasks.filter(t=>t.id!==id); }
  toggleDone(id:number) { const t=this.getById(id); if(!t) return null; t.status = (t.status==='done' ? 'todo' : 'done'); return t; }
}
