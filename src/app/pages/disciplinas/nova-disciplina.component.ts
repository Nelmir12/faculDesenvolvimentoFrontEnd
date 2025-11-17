import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-nova-disciplina',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nova-disciplina.component.html',
  styleUrls: ['./nova-disciplina.component.css']
})
export class NovaDisciplinaComponent {

  form!: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private subjects: SubjectService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      teacher: ['']
    });
  }

  salvar() {
    if (this.form.invalid) {
      this.error = 'Preencha o nome da disciplina.';
      return;
    }

    this.subjects.create(this.form.value).subscribe(() => {
      this.router.navigate(['/disciplinas']);
    });
  }

  cancelar() {
    this.router.navigate(['/disciplinas']);
  }
}
