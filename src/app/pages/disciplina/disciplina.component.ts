import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SubjectService } from '../../services/subject.service';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-disciplina',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './disciplina.component.html'
})
export class DisciplinaComponent implements OnInit {
  title = '';
  teacher = '';
  tasks: Task[] = [];

  constructor(
    private route: ActivatedRoute,
    private subj: SubjectService,
    private tsk: TaskService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const s = this.subj.getById(id);
    if (!s) return;
    this.title = s.name;
    this.teacher = s.teacher || '-';
    this.tasks = s.tasks.map(tid => this.tsk.getById(tid)!).filter(Boolean);
  }

  // ✅ usado no template (click)="alert('...')"
  alert(msg: string) {
    window.alert(msg);
  }
}
