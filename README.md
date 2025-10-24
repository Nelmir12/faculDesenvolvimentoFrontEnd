# TrackStudy â€” Trabalho 02 (Angular)

**Membros:** Nelmir Junior e Lucas Bagno

## 1. DescriÃ§Ã£o
AplicaÃ§Ã£o web para organizar disciplinas e tarefas acadÃªmicas. O usuÃ¡rio cadastra disciplinas, gerencia tarefas (criar, editar, concluir/reabrir, excluir), filtra e acompanha status.

## 2. Tecnologias e estrutura
- Angular (standalone, rotas em `app.routes.ts`, providers em `app.config.ts`).
- Template prÃ³prio (CSS do protÃ³tipo).
- Services com **mock** em memÃ³ria:
  - `SubjectService` (disciplinas)
  - `TaskService` (tarefas)

## 3. PÃ¡ginas e funcionalidades
### Login (`/login`)
- FormulÃ¡rio com `[(ngModel)]`.
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
- FormulÃ¡rio com `[(ngModel)]`; salva e volta Ã  lista.

### Perfil (`/perfil`)
- FormulÃ¡rio demonstrativo.

## 4. PadrÃµes de cÃ³digo (exemplos)
- **Data-binding:** `[(ngModel)]`, `{{ }}`, `(click)`, `[ngClass]`.
- **Diretivas:** `*ngFor`, `*ngIf`.
- **Rotas:** `app.routes.ts` (+ `app-routing.module.ts` para conformidade).
- **Services:** arrays estÃ¡ticos e mÃ©todos `get/add/update/remove/toggleDone`.

## 5. Como rodar
```bash
npm i
npx ng serve -o

