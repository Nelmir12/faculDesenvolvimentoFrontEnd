import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-nova-disciplina',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nova-disciplina.component.html',
  styleUrls: ['./nova-disciplina.component.css']
})
export class NovaDisciplinaComponent implements OnInit {

  form!: FormGroup;
  error = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private subjects: SubjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      teacher: ['']
    });
  }

  get nameControl() {
    return this.form.get('name');
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Preencha corretamente os campos obrigatórios.';
      return;
    }

    this.loading = true;
    this.error = '';

    const payload: Omit<Subject, 'id'> = this.form.value;

    this.subjects.create(payload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/disciplinas']);
      },
      error: () => {
        this.error = 'Erro ao criar disciplina.';
        this.loading = false;
      }
    });
  }

  cancelar(): void {
    if (this.loading) {
      return;
    }
    this.router.navigate(['/disciplinas']);
  }
}
