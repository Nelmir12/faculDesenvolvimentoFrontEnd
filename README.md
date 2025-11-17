TrackStudy — Trabalho Final (Angular)
Membros do grupo:

Nelmir Junior
Lucas Bagno

1. Descrição da aplicação
O TrackStudy é uma aplicação web simples para organizar disciplinas e tarefas acadêmicas. A ideia é que o aluno consiga:

Cadastrar disciplinas;
Cadastrar tarefas ligadas a uma disciplina;
Marcar tarefas como pendentes ou concluídas;
Editar e excluir tanto disciplinas quanto tarefas;
Fazer um login básico para acessar o sistema.
O foco deste trabalho é atender aos requisitos da disciplina:

Uso de Angular com rotas, componentes standalone e diretivas;
Uso de Services para regras de negócio;
Consumo de dados via HttpClient a partir de um JSON Server;
Uso de formulários reativos (Reactive Forms) com Validators.

2. Tecnologias e estrutura
Angular (standalone components)
Rotas configuradas em src/app/app.routes.ts
Providers em src/app/app.config.ts
JSON Server como “backend fake”
Arquivo backend/db.json com as coleções:
/tasks
/subjects
/users
Services com HttpClient:
TaskService – CRUD de tarefas em /tasks
SubjectService – CRUD de disciplinas em /subjects
UserService – login simples usando /users
Formulários reativos:
Login
Cadastro/Edição de Disciplina
Cadastro/Edição de Tarefa
Com FormBuilder, FormGroup, FormControl e Validators

3. Páginas e funcionalidades
Login (/login)
Formulário reativo de e-mail e senha.
Validações (campos obrigatórios, formato de e-mail, etc.).
Consulta /users no JSON Server para simular autenticação.
Se usuário existe, redireciona para o Dashboard.
Dashboard (/dashboard)
Tela inicial após o login.
Mostra um resumo das disciplinas/tarefas.
Atalho para Disciplinas, Tarefas e Perfil via menu lateral.
Disciplinas (/disciplinas)
Lista todas as disciplinas vindas de /subjects.
Campo de busca por nome.
Botão “Nova disciplina”.
Ações:
Editar disciplina (/disciplina/:id)
Excluir disciplina (DELETE em /subjects/:id)
Disciplina (nova / edição)
/disciplina/nova — cria disciplina nova.
/disciplina/:id — edita disciplina existente.
Formulário reativo com validações:
Nome obrigatório, tamanho mínimo;
Descrição obrigatória, tamanho mínimo.
Usa POST /subjects para criar e PATCH /subjects/:id para atualizar.
Tarefas (/tarefas)
Lista todas as tarefas vindas de /tasks.
Mostra também o nome da disciplina (via subjectId → /subjects).
Filtro por:
Texto (título/descrição)
Status: todas, pendentes ou concluídas.
Botão “Nova tarefa” (/tarefa/nova).
Ações:
Concluir/Reabrir (alterna status com toggleDone → PATCH /tasks/:id)
Editar (/tarefa/:id)
Excluir (DELETE /tasks/:id)
Nova Tarefa (/tarefa/nova)
Formulário reativo com campos:
Título (obrigatório, minLength)
Descrição (opcional)
Data de entrega (obrigatória)
Disciplina (obrigatória, select vindo de /subjects)
Ao salvar, faz POST /tasks com status = 'pendente'.
Botão de cancelar volta para /tarefas.
Editar Tarefa (/tarefa/:id)
Carrega dados da tarefa via GET /tasks/:id.
Preenche o formulário reativo.
Permite alterar título, descrição, data, disciplina e status.
Ao salvar, envia PATCH /tasks/:id.
Perfil (/perfil)
Tela simples mostrando dados básicos do usuário logado (nome, e-mail).
Completa o fluxo de login.

4. Git, GitHub e Commits Semânticos
O projeto foi versionado com Git e publicado em um repositório no GitHub.

As mensagens de commit seguiram o padrão de Commits Semânticos (Conventional Commits), por exemplo:

feat: implementar login reativo com JSON Server
feat: criar SubjectService com HttpClient
refactor: migrar formulario de tarefa para reactive forms
fix: ajustar validacao de disciplina
Isso ajuda a manter o histórico mais organizado e facilita entender o que foi feito em cada etapa.

5. Como rodar o projeto
npm i npx ng serve -o

Em outro terminal (Rodar o JSON)

cd backend npx json-server --watch db.json --port 3001
