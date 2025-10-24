import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DisciplinaComponent } from './pages/disciplina/disciplina.component';
import { DisciplinasComponent } from './pages/disciplinas/disciplinas.component';
import { LoginComponent } from './pages/login/login.component';
import { NovaTarefaComponent } from './pages/nova-tarefa/nova-tarefa.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { TarefaComponent } from './pages/tarefa/tarefa.component';
import { TarefasComponent } from './pages/tarefas/tarefas.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'disciplinas', component: DisciplinasComponent },
  { path: 'disciplina/:id', component: DisciplinaComponent },
  { path: 'tarefas', component: TarefasComponent },
  { path: 'tarefa/:id', component: TarefaComponent },
  { path: 'nova-tarefa', component: NovaTarefaComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: '**', redirectTo: 'login' }
];
