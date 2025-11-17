import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from '../../services/subject.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tarefa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent {
  form!: FormGroup;
  id!: number;

  loading = true;
  error = '';
  subjectsCache: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private tasks: TaskService,
    private subjects: SubjectService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      due: ['', Validators.required],
      subjectId: ['', Validators.required],
      status: ['pendente', Validators.required]
    });

    // CORRIGIDO: getAll()
    this.subjects.getAll().subscribe(s => (this.subjectsCache = s));

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

  salvar() {
    if (this.form.invalid) return;

    this.tasks.update(this.id, this.form.value).subscribe(() => {
      this.router.navigate(['/tarefas']);
    });
  }

  alternarStatus() {
    const atual = this.form.get('status')?.value;
    const novo = atual === 'pendente' ? 'concluida' : 'pendente';
    this.form.patchValue({ status: novo });
  }

  cancelar() {
    this.router.navigate(['/tarefas']);
  }

  getSubjectName(id: number) {
    return this.subjectsCache.find(s => s.id === id)?.name ?? '-';
  }
}
