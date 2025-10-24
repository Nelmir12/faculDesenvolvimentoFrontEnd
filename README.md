# TrackStudy — Trabalho 02 (Angular)

**Membros:** Nelmir Junior e Lucas Bagno

## 1. Descrição
Aplicação web para organizar disciplinas e tarefas acadêmicas. O usuário cadastra disciplinas, gerencia tarefas (criar, editar, concluir/reabrir, excluir), filtra e acompanha status.

## 2. Tecnologias e estrutura
- Angular (standalone, rotas em `app.routes.ts`, providers em `app.config.ts`).
- Template próprio (CSS do protótipo).
- Services com **mock** em memória:
  - `SubjectService` (disciplinas)
  - `TaskService` (tarefas)

## 3. Páginas e funcionalidades
### Login (`/login`)
- Formulário com `[(ngModel)]`.
- Navega para `/dashboard` ao entrar.

### Dashboard (`/dashboard`)
- KPIs (totais, concluídas, em andamento, vencidas).
- Lista “Próximas tarefas”.

### Disciplinas (`/disciplinas`)
- Busca por nome.
- **Criar**, **Editar**, **Excluir** disciplina.
- Link para detalhe.

### Disciplina (`/disciplina/:id`)
- Professor e tarefas da disciplina.
- Link para criar nova tarefa.

### Tarefas (`/tarefas`)
- Listagem com filtro por **status** e **busca**.
- **Concluir/Reabrir**, **Excluir**.
- Link para detalhe.

### Tarefa (`/tarefa/:id`)
- Detalhe da tarefa, **Editar** via prompts.

### Nova Tarefa (`/nova-tarefa`)
- Formulário com `[(ngModel)]`; salva e volta à lista.

### Perfil (`/perfil`)
- Formulário demonstrativo.

## 4. Padrões de código (exemplos)
- **Data-binding:** `[(ngModel)]`, `{{ }}`, `(click)`, `[ngClass]`.
- **Diretivas:** `*ngFor`, `*ngIf`.
- **Rotas:** `app.routes.ts` (+ `app-routing.module.ts` para conformidade).
- **Services:** arrays estáticos e métodos `get/add/update/remove/toggleDone`.

## 5. Como rodar
```bash
npm i
npx ng serve -o
