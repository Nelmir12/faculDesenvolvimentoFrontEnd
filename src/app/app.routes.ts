import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

import { DisciplinaComponent } from './pages/disciplina/disciplina.component';
import { DisciplinasComponent } from './pages/disciplinas/disciplinas.component';
import { EditarDisciplinaComponent } from './pages/disciplinas/editar-disciplina.component';
import { NovaDisciplinaComponent } from './pages/disciplinas/nova-disciplina.component';


import { TarefaComponent } from './pages/tarefa/tarefa.component';
import { TarefasComponent } from './pages/tarefas/tarefas.component';

import { PerfilComponent } from './pages/perfil/perfil.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },


{ path: 'disciplinas', component: DisciplinasComponent },

// Criar disciplina
{ path: 'disciplina/nova', component: NovaDisciplinaComponent },

// Editar disciplina
{ path: 'disciplina/:id', component: DisciplinaComponent },

{ path: 'disciplina/:id', component: EditarDisciplinaComponent },




{ path: 'tarefas', component: TarefasComponent },
{ path: 'tarefa/nova', component: TarefaComponent },
{ path: 'tarefa/:id', component: TarefaComponent },

  { path: 'perfil', component: PerfilComponent },

  { path: '**', redirectTo: 'login' },
];
