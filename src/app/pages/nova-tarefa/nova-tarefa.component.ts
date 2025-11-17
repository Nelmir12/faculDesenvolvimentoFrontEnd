import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectService } from '../../services/subject.service';
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'app-nova-tarefa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nova-tarefa.component.html',
  styleUrls: ['./nova-tarefa.component.css']
})
export class NovaTarefaComponent implements OnInit {

  form!: FormGroup;
  subjects: any[] = [];
  error = '';

  constructor(
    private fb: FormBuilder,
    private tasks: TaskService,
    private subj: SubjectService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      subjectId: [null, Validators.required],
      dueDate: ['', Validators.required],
      status: ['pendente', Validators.required]
    });

    this.subj.getAll().subscribe(list => {
      this.subjects = list;
    });
  }

  submit() {
    if (this.form.invalid) {
      this.error = 'Preencha todos os campos obrigatórios.';
      return;
    }

    this.tasks.add(this.form.value).subscribe(() => {
      this.router.navigate(['/tarefas']);
    });
  }
}
