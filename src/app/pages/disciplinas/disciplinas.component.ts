import { Component, OnInit } from '@angular/core';
import { Subject, SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-disciplinas',
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.css'],
})
export class DisciplinasComponent implements OnInit {
  subjects: Subject[] = [];
  filteredSubjects: Subject[] = [];
  searchTerm: string = '';
  loading = false;
  error = '';

  constructor(private subjectService: SubjectService) {}

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

  onSearchChange(): void {
    this.applyFilter();
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

  deleteSubject(subject: Subject): void {
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
