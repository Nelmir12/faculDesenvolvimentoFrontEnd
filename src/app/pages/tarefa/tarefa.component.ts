import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, SubjectService } from '../../services/subject.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tarefa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {
  form!: FormGroup;
  id!: number;

  loading = true;
  saving = false;
  error = '';
  subjectsCache: Subject[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private tasks: TaskService,
    private subjects: SubjectService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const parsedId = Number(idParam);

    if (!idParam || Number.isNaN(parsedId)) {
      this.error = 'ID de tarefa inválido.';
      this.loading = false;
      return;
    }

    this.id = parsedId;

    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      due: ['', Validators.required],
      subjectId: [null, Validators.required],
      status: ['pendente', Validators.required]
    });

    this.subjects.getAll().subscribe({
      next: s => (this.subjectsCache = s),
      error: () => {
        this.error = 'Erro ao carregar disciplinas para seleção.';
      }
    });

    this.tasks.getById(this.id).subscribe({
      next: task => {
        if (!task) {
          this.error = 'Tarefa não encontrada.';
          this.loading = false;
          return;
        }

        this.form.patchValue({
          title: task.title,
          description: task.description,
          due: task.due,
          subjectId: task.subjectId,
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

    this.saving = true;
    this.error = '';

    this.tasks.update(this.id, this.form.value).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/tarefas']);
      },
      error: () => {
        this.error = 'Erro ao salvar tarefa.';
        this.saving = false;
      }
    });
  }

  alternarStatus(): void {
    const atual = this.form.get('status')?.value;
    const novo = atual === 'pendente' ? 'concluida' : 'pendente';
    this.form.patchValue({ status: novo });
  }

  cancelar(): void {
    if (this.saving) {
      return;
    }
    this.router.navigate(['/tarefas']);
  }

  getSubjectName(id: number): string {
    return this.subjectsCache.find(s => s.id === id)?.name ?? '-';
  }
}
