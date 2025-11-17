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

@Component({
  selector: 'app-disciplina',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './disciplina.component.html',
  styleUrls: ['./disciplina.component.css'],
})
export class DisciplinaComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error = '';
  isNew = false;
  disciplinaId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.buildForm();

    const idParam = this.route.snapshot.paramMap.get('id');

    // Cenário 1: rota antiga /disciplina/nova usando param 'nova'
    // Cenário 2: rota nova /disciplina/nova (sem param 'id')
    // Cenário 3: edição /disciplina/:id (id numérico)
    if (!idParam || idParam === 'nova') {
      this.isNew = true;
      return;
    }

    const id = Number(idParam);

    if (Number.isNaN(id)) {
      this.router.navigate(['/disciplinas']);
      return;
    }

    this.isNew = false;
    this.disciplinaId = id;
    this.loadDisciplina(id);
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get nameControl() {
    return this.form.get('name');
  }

  get descriptionControl() {
    return this.form.get('description');
  }

  loadDisciplina(id: number): void {
    this.loading = true;
    this.error = '';

    this.subjectService.getById(id).subscribe({
      next: (disciplina) => {
        if (!disciplina) {
          this.error = 'Disciplina não encontrada.';
          this.loading = false;
          return;
        }

        this.form.patchValue({
          name: disciplina.name,
          description: disciplina.description ?? '',
        });
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar a disciplina.';
        this.loading = false;
      },
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, description } = this.form.value as {
      name: string;
      description: string;
    };

    this.loading = true;
    this.error = '';

    if (this.isNew) {
      const payload: Omit<Subject, 'id'> = {
        name,
        description,
      };

      this.subjectService.create(payload).subscribe({
        next: () => this.router.navigate(['/disciplinas']),
        error: () => {
          this.error = 'Erro ao criar disciplina.';
          this.loading = false;
        },
      });
    } else {
      const payload: Partial<Subject> = {
        name,
        description,
      };

      this.subjectService.update(this.disciplinaId, payload).subscribe({
        next: () => this.router.navigate(['/disciplinas']),
        error: () => {
          this.error = 'Erro ao atualizar disciplina.';
          this.loading = false;
        },
      });
    }
  }

  cancelar(): void {
    if (this.loading) {
      return;
    }
    this.router.navigate(['/disciplinas']);
  }
}
