import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subject, SubjectService } from '../../services/subject.service';
import { Task, TaskStatus } from '../../services/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule, RouterModule],
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  subjectsCache: Subject[] = [];

  searchTerm = '';
  statusFilter: 'todas' | TaskStatus = 'todas';

  loading = false;
  error = '';

  constructor(
    private taskService: TaskService,
    private subjectService: SubjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSubjects();
    this.loadTasks();
  }

  loadSubjects(): void {
    this.subjectService.getAll().subscribe({
      next: subjects => (this.subjectsCache = subjects),
      error: () => {
        // não bloqueia a tela, só impede exibir o nome da disciplina
      }
    });
  }

  loadTasks(): void {
    this.loading = true;
    this.error = '';

    this.taskService.getAll().subscribe({
      next: tasks => {
        this.tasks = tasks;
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
    let result = [...this.tasks];

    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      result = result.filter(t =>
        t.title.toLowerCase().includes(term) ||
        (t.description ?? '').toLowerCase().includes(term)
      );
    }

    if (this.statusFilter !== 'todas') {
      result = result.filter(t => t.status === this.statusFilter);
    }

    this.filteredTasks = result;
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

  editarTarefa(task: Task): void {
    this.router.navigate(['/tarefa', task.id]);
  }

  toggleStatus(task: Task): void {
    this.taskService.toggleDone(task.id).subscribe({
      next: updated => {
        const idx = this.tasks.findIndex(t => t.id === updated.id);
        if (idx !== -1) {
          this.tasks[idx] = updated;
        }
        this.applyFilter();
      },
      error: () => {
        this.error = 'Erro ao atualizar status da tarefa.';
      }
    });
  }

  excluir(task: Task): void {
    if (!confirm(`Deseja realmente excluir a tarefa "${task.title}"?`)) {
      return;
    }

    this.taskService.remove(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
        this.applyFilter();
      },
      error: () => {
        this.error = 'Erro ao excluir tarefa.';
      }
    });
  }

  getSubjectName(subjectId: number): string {
    return this.subjectsCache.find(s => s.id === subjectId)?.name ?? '-';
  }
}
