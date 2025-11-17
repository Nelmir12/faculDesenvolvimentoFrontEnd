// src/app/pages/dashboard/dashboard.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SubjectService } from '../../services/subject.service';
import { Task } from '../../services/task.model';
import { TaskService } from '../../services/task.service';

interface KpiInfo {
  total: number;
  pendentes: number;
  concluidas: number;
  proximas: Task[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading = false;
  error = '';

  tasks: Task[] = [];
  subjectsCache: { id: number; name: string }[] = [];

  kpi: KpiInfo = {
    total: 0,
    pendentes: 0,
    concluidas: 0,
    proximas: []
  };

  constructor(
    private tasksService: TaskService,
    private subjectsService: SubjectService
  ) {}

  ngOnInit(): void {
    this.loadSubjects();
    this.loadTasks();
  }

  private loadSubjects(): void {
    this.subjectsService.getAll().subscribe({
      next: list => {
        this.subjectsCache = list.map(s => ({
          id: s.id,
          name: s.name
        }));
      },
      error: () => {
        // dashboard continua funcionando mesmo sem nomes de disciplinas
        this.subjectsCache = [];
      }
    });
  }

  private loadTasks(): void {
    this.loading = true;
    this.error = '';

    this.tasksService.getAll().subscribe({
      next: list => {
        this.tasks = list;
        this.buildKpis();
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar tarefas.';
        this.loading = false;
      }
    });
  }

  private buildKpis(): void {
    const list = this.tasks;

    this.kpi.total = list.length;
    this.kpi.pendentes = list.filter(t => t.status === 'pendente').length;
    this.kpi.concluidas = list.filter(t => t.status === 'concluida').length;

    // próximas tarefas ordenadas por data (campo "due")
    this.kpi.proximas = [...list]
      .filter(t => t.status === 'pendente' && !!t.due)
      .sort((a, b) => a.due.localeCompare(b.due))
      .slice(0, 5);
  }

  getSubjectName(subjectId: number): string {
    return (
      this.subjectsCache.find(s => s.id === subjectId)?.name ?? '-'
    );
  }

  refresh(): void {
    this.loadTasks();
  }
}
