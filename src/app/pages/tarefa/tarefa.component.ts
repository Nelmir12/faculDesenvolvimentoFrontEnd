import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SubjectService } from '../../services/subject.service';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tarefa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error = '';
  taskId!: number;
  subjects: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.buildForm();

    // carrega disciplinas pro select
    this.subjectService.getAll().subscribe({
      next: (list) => (this.subjects = list),
      error: () => (this.error = 'Erro ao carregar disciplinas.')
    });

    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      this.router.navigate(['/tarefas']);
      return;
    }

    this.taskId = Number(idParam);
    this.loadTask(this.taskId);
  }

  buildForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      subjectId: [null, [Validators.required]],
      dueDate: ['', [Validators.required]],
      status: ['pendente', [Validators.required]]
    });
  }

  loadTask(id: number): void {
    this.loading = true;
    this.error = '';

    this.taskService.getById(id).subscribe({
      next: (task: Task) => {
        this.form.patchValue({
          title: task.title,
          description: task.description,
          subjectId: task.subjectId,
          dueDate: task.dueDate,
          status: task.status
        });
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar tarefa.';
        this.loading = false;
      }
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Task = {
      id: this.taskId,
      ...this.form.value
    };

    this.loading = true;
    this.error = '';

    this.taskService.update(this.taskId, payload).subscribe({
      next: () => this.router.navigate(['/tarefas']),
      error: () => {
        this.error = 'Erro ao salvar tarefa.';
        this.loading = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/tarefas']);
  }

  get title() {
    return this.form.get('title');
  }

  get subjectId() {
    return this.form.get('subjectId');
  }

  get dueDate() {
    return this.form.get('dueDate');
  }
}
