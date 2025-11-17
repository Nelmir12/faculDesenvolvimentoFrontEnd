// src/app/services/task.model.ts
export type TaskStatus = 'pendente' | 'concluida';

export interface Task {
  id: number;
  title: string;
  description: string;
  /** Data de entrega em string ISO (yyyy-MM-dd) */
  due: string;
  /** 'pendente' ou 'concluida' */
  status: TaskStatus;
  /** ID da disciplina associada */
  subjectId: number;
}
