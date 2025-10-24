import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SubjectService } from '../../services/subject.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-nova-tarefa',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './nova-tarefa.component.html'
})
export class NovaTarefaComponent implements OnInit {
  title = '';
  subjectId: number | null = null;   // ✅ começa sem disciplina
  due = '';
  description = '';
  status: 'todo'|'doing'|'done'|'late' = 'todo';

  constructor(
    private tasks: TaskService,
    public subjects: SubjectService,
    private router: Router
  ){}

  ngOnInit() {
    const list = this.subjects.getAll();
    // se houver disciplinas, seleciona a primeira; se não houver, avisa e redireciona
    if (list.length > 0) {
      this.subjectId = list[0].id;
    } else {
      window.alert('Cadastre uma disciplina antes de criar tarefas.');
      this.router.navigate(['/disciplinas']);
    }
  }

  save(){
    // proteção extra
    const list = this.subjects.getAll();
    if (list.length === 0 || this.subjectId === null) {
      window.alert('Cadastre uma disciplina antes de criar tarefas.');
      this.router.navigate(['/disciplinas']);
      return;
    }

    const t = this.tasks.add({
      title: this.title,
      subjectId: this.subjectId,
      due: this.due,
      status: this.status,
      description: this.description
    });

    const s = this.subjects.getById(this.subjectId);
    if (s) s.tasks.push(t.id);

    this.router.navigate(['/tarefas']);
  }
}
