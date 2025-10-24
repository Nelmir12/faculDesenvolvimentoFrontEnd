import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html'
})
export class PerfilComponent {
  name='Aluno TrackStudy'; email='aluno@fumec.br'; pass='';
  save(){ alert('Perfil (simulado) salvo.'); }
}
