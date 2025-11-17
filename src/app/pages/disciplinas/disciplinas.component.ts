import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subject, SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-disciplinas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.css'],
})
export class DisciplinasComponent implements OnInit {
  subjects: Subject[] = [];
  filteredSubjects: Subject[] = [];
  searchTerm: string = '';
  loading = false;
  error = '';

  constructor(
    private subjectService: SubjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.loading = true;
    this.error = '';

    this.subjectService.getAll().subscribe({
      next: (subjects) => {
        this.subjects = subjects;
        this.applyFilter();
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar disciplinas.';
        this.loading = false;
      },
    });
  }

  applyFilter(): void {
    if (!this.searchTerm) {
      this.filteredSubjects = this.subjects;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredSubjects = this.subjects.filter((s) =>
      s.name.toLowerCase().includes(term)
    );
  }

  onSearchChange(): void {
    this.applyFilter();
  }

  novaDisciplina(): void {
    this.router.navigate(['/disciplina', 'nova']);
  }

  verDetalhe(subject: Subject): void {
    this.router.navigate(['/disciplina', subject.id]);
  }

  excluir(subject: Subject): void {
    if (!confirm(`Deseja realmente excluir a disciplina "${subject.name}"?`)) {
      return;
    }

    this.subjectService.delete(subject.id).subscribe({
      next: () => {
        this.loadSubjects();
      },
      error: () => {
        this.error = 'Erro ao excluir disciplina.';
      },
    });
  }
}
