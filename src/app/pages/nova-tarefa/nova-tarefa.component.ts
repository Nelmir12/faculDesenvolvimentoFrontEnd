import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, SubjectService } from '../../services/subject.service';
import { TaskStatus } from '../../services/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-nova-tarefa',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './nova-tarefa.component.html',
  styleUrls: ['./nova-tarefa.component.css']
})
export class NovaTarefaComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error = '';
  subjectsCache: Subject[] = [];

  constructor(
    private fb: FormBuilder,
    private tasks: TaskService,
    private subjects: SubjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      due: ['', Validators.required],
      subjectId: [null, Validators.required],
    });

    this.subjects.getAll().subscribe({
      next: s => (this.subjectsCache = s),
      error: () => {
        this.error = 'Erro ao carregar disciplinas.';
      }
    });
  }

  get titleControl() {
    return this.form.get('title');
  }

  get dueControl() {
    return this.form.get('due');
  }

  get subjectIdControl() {
    return this.form.get('subjectId');
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    const { title, description, due, subjectId } = this.form.value;

    const payload = {
      title,
      description,
      due,
      subjectId,
      status: 'pendente' as TaskStatus,
    };

    this.tasks.create(payload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/tarefas']);
      },
      error: () => {
        this.error = 'Erro ao criar tarefa.';
        this.loading = false;
      }
    });
  }

  cancelar(): void {
    if (this.loading) return;
    this.router.navigate(['/tarefas']);
  }
}
