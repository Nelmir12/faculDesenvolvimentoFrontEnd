import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SubjectService } from '../../services/subject.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-disciplinas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './disciplinas.component.html'
})
export class DisciplinasComponent {
  q = '';
  constructor(public svc: SubjectService, private tasks: TaskService) {}

  list() {
    return this.svc.getAll().filter(s =>
      s.name.toLowerCase().includes(this.q.toLowerCase())
    );
  }

  // NOVA DISCIPLINA
  newSubject() {
    const name = (window.prompt('Nome da disciplina:') || '').trim();
    if (!name) return;
    const teacher = (window.prompt('Professor(a):') || '').trim();
    this.svc.add({ name, teacher, tasks: [] });
  }

  // EDITAR
  editSubject(id: number) {
    const s = this.svc.getById(id);
    if (!s) return;
    const name = window.prompt('Nome da disciplina:', s.name);
    if (name === null) return;
    const teacher = window.prompt('Professor(a):', s.teacher || '') ?? '';
    this.svc.update(id, { name: name.trim(), teacher: teacher.trim() });
  }

  // EXCLUIR (remove também as tarefas vinculadas)
  deleteSubject(id: number) {
    const s = this.svc.getById(id);
    if (!s) return;
    if (!window.confirm(`Excluir "${s.name}" e todas as suas tarefas?`)) return;

    // remove tarefas daquela disciplina
    this.tasks.getAll().filter(t => t.subjectId === id)
      .forEach(t => this.tasks.remove(t.id));

    // remove a disciplina
    this.svc.remove(id);
  }
}
