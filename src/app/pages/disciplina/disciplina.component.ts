import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
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

    if (idParam === 'nova') {
      this.isNew = true;
    } else if (idParam) {
      this.isNew = false;
      this.disciplinaId = Number(idParam);
      this.loadDisciplina(this.disciplinaId);
    } else {
      this.router.navigate(['/disciplinas']);
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  loadDisciplina(id: number): void {
    this.loading = true;
    this.error = '';

    this.subjectService.getById(id).subscribe({
      next: (disciplina: Subject) => {
        this.form.patchValue({
          name: disciplina.name,
          description: disciplina.description,
        });
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar disciplina.';
        this.loading = false;
      },
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Subject = {
      id: this.isNew ? 0 : this.disciplinaId,
      ...this.form.value,
    };

    this.loading = true;
    this.error = '';

    if (this.isNew) {
      this.subjectService.create(payload).subscribe({
        next: () => this.router.navigate(['/disciplinas']),
        error: () => {
          this.error = 'Erro ao criar disciplina.';
          this.loading = false;
        },
      });
    } else {
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
    this.router.navigate(['/disciplinas']);
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }
}
