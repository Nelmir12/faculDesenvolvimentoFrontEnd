import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, SubjectService } from '../../services/subject.service';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tarefa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css'],
})
export class TarefaComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error = '';
  isNew = false;
  tarefaId!: number;

  subjects: Subject[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadSubjects();

    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam === 'nova') {
      this.isNew = true;
    } else if (idParam) {
      this.isNew = false;
      this.tarefaId = Number(idParam);
      this.loadTarefa(this.tarefaId);
    } else {
      this.router.navigate(['/tarefas']);
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      status: ['pendente', [Validators.required]],
      dueDate: ['', [Validators.required]],
      subjectId: [null, [Validators.required]],
    });
  }

  loadSubjects(): void {
    this.subjectService.getAll().subscribe({
      next: (subjects) => {
        this.subjects = subjects;
      },
      error: () => {
        this.error = 'Erro ao carregar disciplinas para seleção.';
      },
    });
  }

  loadTarefa(id: number): void {
    this.loading = true;
    this.error = '';

    this.taskService.getById(id).subscribe({
      next: (task: Task) => {
        this.form.patchValue({
          title: task.title,
          description: task.description,
          status: task.status,
          dueDate: task.dueDate,
          subjectId: task.subjectId,
        });
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar tarefa.';
        this.loading = false;
      },
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    const payload: Task = {
      id: this.isNew ? 0 : this.tarefaId,
      title: formValue.title,
      description: formValue.description,
      status: formValue.status,
      dueDate: formValue.dueDate,
      subjectId: Number(formValue.subjectId),
    };

    this.loading = true;
    this.error = '';

    if (this.isNew) {
      this.taskService.create(payload).subscribe({
        next: () => this.router.navigate(['/tarefas']),
        error: () => {
          this.error = 'Erro ao criar tarefa.';
          this.loading = false;
        },
      });
    } else {
      this.taskService.update(this.tarefaId, payload).subscribe({
        next: () => this.router.navigate(['/tarefas']),
        error: () => {
          this.error = 'Erro ao atualizar tarefa.';
          this.loading = false;
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/tarefas']);
  }

  get title() {
    return this.form.get('title');
  }

  get description() {
    return this.form.get('description');
  }

  get statusCtrl() {
    return this.form.get('status');
  }

  get dueDate() {
    return this.form.get('dueDate');
  }

  get subjectIdCtrl() {
    return this.form.get('subjectId');
  }
}
