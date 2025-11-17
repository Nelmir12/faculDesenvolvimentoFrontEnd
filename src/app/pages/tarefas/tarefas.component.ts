import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { SubjectService } from '../../services/subject.service';
import { Task } from '../../services/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {
  loading = false;
  error = '';

  tasks: Task[] = [];
  filtered: Task[] = [];

  search = ''; // ALINHADO COM O HTML
  statusFilter: 'todas' | 'pendente' | 'concluida' = 'todas';

  subjectsCache: { id: number; name: string }[] = [];

  constructor(
    private tasksService: TaskService,
    private subjectsService: SubjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSubjects();
    this.loadTasks();
  }

  private loadSubjects(): void {
    this.subjectsService.getAll().subscribe({
      next: list =>
        (this.subjectsCache = list.map(s => ({ id: s.id, name: s.name }))),
      error: () => (this.subjectsCache = [])
    });
  }

  private loadTasks(): void {
    this.loading = true;
    this.tasksService.getAll().subscribe({
      next: list => {
        this.tasks = list;
        this.applyFilter();
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar tarefas.';
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    const termo = this.search.trim().toLowerCase();

    this.filtered = this.tasks.filter(t => {
      const matchesText =
        !termo ||
        t.title.toLowerCase().includes(termo) ||
        t.description.toLowerCase().includes(termo);

      const matchesStatus =
        this.statusFilter === 'todas' || t.status === this.statusFilter;

      return matchesText && matchesStatus;
    });
  }

  onSearchChange(): void {
    this.applyFilter();
  }

  onStatusChange(): void {
    this.applyFilter();
  }

  novaTarefa(): void {
    this.router.navigate(['/tarefa/nova']);
  }

 toggleDone(id: number): void {
  this.tasksService.toggleDone(id).subscribe(() => {
    this.loadTasks();
  });
}

  remove(id: number): void {
    if (!confirm('Tem certeza?')) return;

    this.tasksService.remove(id).subscribe(() => {
      this.loadTasks();
    });
  }

  getSubjectName(id: number): string {
    return this.subjectsCache.find(s => s.id === id)?.name ?? '-';
  }
}
