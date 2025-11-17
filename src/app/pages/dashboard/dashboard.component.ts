import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { SubjectService } from '../../services/subject.service';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {

  tasks: Task[] = [];
  total = 0;
  pendentes = 0;
  concluidas = 0;
  proximas: Task[] = [];

  constructor(
    private tasksService: TaskService,
    private subjects: SubjectService
  ) {}

  ngOnInit() {
    this.tasksService.getAll().subscribe(list => {
      this.tasks = list;
      this.calculateStats();
    });
  }

  calculateStats() {
    this.total = this.tasks.length;
    this.pendentes = this.tasks.filter(t => t.status === 'pendente').length;
    this.concluidas = this.tasks.filter(t => t.status === 'concluida').length;

    this.proximas = [...this.tasks]
      .filter(t => t.status === 'pendente')
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
      .slice(0, 5);
  }

 getSubjectName(id: number) {
  let name = '-';
  this.subjects.getById(id).subscribe(s => {
    if (s) name = s.name;
  });
  return name;
}
}
