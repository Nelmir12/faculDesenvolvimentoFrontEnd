import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SubjectService } from '../../services/subject.service';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tarefa',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tarefa.component.html'
})
export class TarefaComponent implements OnInit {
  t: Task | null = null;

  constructor(
    private route: ActivatedRoute,
    private tasks: TaskService,
    private subjects: SubjectService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.t = this.tasks.getById(id);
  }

  subjectName(id: number) {
    return this.subjects.getById(id)?.name || '-';
  }

  edit() {
    if (!this.t) return;

    const title = window.prompt('Título', this.t.title);
    if (title === null) return;

    const due = window.prompt('Data (YYYY-MM-DD)', this.t.due) ?? this.t.due;
    const status = (window.prompt("Status (todo|doing|done|late)", this.t.status) ?? this.t.status) as Task['status'];
    const description = window.prompt('Descrição', this.t.description || '') ?? (this.t.description || '');

    this.tasks.update(this.t.id, {
      title: title.trim() || this.t.title,
      due: due.trim() || this.t.due,
      status,
      description
    });

    // recarrega o objeto atualizado
    this.t = this.tasks.getById(this.t.id);
  }

  alert(msg: string) { window.alert(msg); } // se quiser manter para reuso
}
