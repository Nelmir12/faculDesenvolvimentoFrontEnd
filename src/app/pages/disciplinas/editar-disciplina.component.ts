import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-editar-disciplina',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-disciplina.component.html',
  styleUrls: ['./editar-disciplina.component.css']
})
export class EditarDisciplinaComponent {

  form!: FormGroup;
  id!: number;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private subjects: SubjectService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      name: ['', Validators.required]
    });

    this.subjects.getById(this.id).subscribe({
      next: subject => {
        if (!subject) {
          this.error = 'Disciplina não encontrada.';
          this.loading = false;
          return;
        }

        this.form.patchValue({
          name: subject.name
        });

        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar disciplina.';
        this.loading = false;
      }
    });
  }

  salvar() {
    if (this.form.invalid) return;

    this.subjects.update(this.id, this.form.value).subscribe(() => {
      this.router.navigate(['/disciplinas']);
    });
  }

  cancelar() {
    this.router.navigate(['/disciplinas']);
  }
}
