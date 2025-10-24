import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SubjectService } from '../../services/subject.service';
import { Status, Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tarefas.component.html'
})
export class TarefasComponent {
  q=''; status: 'all'|Status = 'all';
  constructor(private tasks:TaskService, private subjects:SubjectService){}

  list(): Task[] {
    return this.tasks.getAll()
      .filter(t => this.status === 'all' || t.status === this.status)
      .filter(t =>
        t.title.toLowerCase().includes(this.q.toLowerCase()) ||
        (this.subjects.getById(t.subjectId)?.name.toLowerCase().includes(this.q.toLowerCase()) || false)
      );
  }

  subjectName(id:number){ return this.subjects.getById(id)?.name || '-'; }
  toggleDone(id:number){ this.tasks.toggleDone(id); }

  remove(id:number){
    const t = this.tasks.getById(id);
    if (!t) return;
    if (!window.confirm(`Excluir a tarefa "${t.title}"?`)) return;

    // tira o id da lista de tasks da disciplina
    const subj = this.subjects.getById(t.subjectId);
    if (subj) subj.tasks = subj.tasks.filter(x => x !== t.id);

    // remove a tarefa
    this.tasks.remove(id);
  }
}
