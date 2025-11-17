import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css'],
})
export class TarefasComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchTerm: string = '';
  statusFilter: 'todas' | 'pendente' | 'concluida' = 'todas';

  loading = false;
  error = '';

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.error = '';

    this.taskService.getAll().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.applyFilter();
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar tarefas.';
        this.loading = false;
      },
    });
  }

  applyFilter(): void {
    let list = [...this.tasks];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(term) ||
          t.description.toLowerCase().includes(term)
      );
    }

    if (this.statusFilter !== 'todas') {
      list = list.filter((t) => t.status === this.statusFilter);
    }

    this.filteredTasks = list;
  }

  onSearchChange(): void {
    this.applyFilter();
  }

  onStatusFilterChange(): void {
    this.applyFilter();
  }

  novaTarefa(): void {
    this.router.navigate(['/tarefa', 'nova']);
  }

  editar(task: Task): void {
    this.router.navigate(['/tarefa', task.id]);
  }

  excluir(task: Task): void {
    if (!confirm(`Deseja realmente excluir a tarefa "${task.title}"?`)) {
      return;
    }

    this.taskService.delete(task.id).subscribe({
      next: () => this.loadTasks(),
      error: () => {
        this.error = 'Erro ao excluir tarefa.';
      },
    });
  }

  alternarStatus(task: Task): void {
    this.taskService.toggleStatus(task).subscribe({
      next: () => this.loadTasks(),
      error: () => {
        this.error = 'Erro ao atualizar status da tarefa.';
      },
    });
  }
}
