# Encurtador de URL — turma Valfenda

Projeto 1 da turma. O produto está desenhado no [`overview.excalidraw`](overview.excalidraw)
que vimos em aula: encurtar uma URL (com alias opcional), acessar pelo link curto,
acompanhar o histórico de acessos e ter conta para chamar as URLs de suas.

> **O desenho é a fonte da verdade do produto.** Ele tem as histórias, o modelo de
> dados, a lista de endpoints e os rascunhos de tela. Abra em <https://excalidraw.com>
> (menu → *Open* → escolha o arquivo) ou direto no VS Code com a extensão
> *Excalidraw*. Antes de começar uma fatia, volte nele.

Este repositório já vem com o esqueleto de pé. A dificuldade do projeto é
modelagem, regra de negócio e trabalho em time — não `tsconfig`.

---

## Rodando na sua máquina

Precisa de **Node 22+** e **Docker**.

```bash
# 1. banco
docker compose up -d

# 2. API
cd api
cp .env.example .env
npm install
npm run banco:migrar     # cria as tabelas
npm run dev              # http://localhost:3333

# 3. front (em outro terminal)
cd web
npm install
npm run dev              # http://localhost:5173
```

Abra <http://localhost:5173>. Se aparecer **"API ok · banco ok"** em verde, está tudo
conectado e você pode começar.

> O Postgres é publicado na porta **5433** (e não 5432) para não brigar com um
> Postgres que você já tenha instalado.

Comandos úteis:

| Comando | O que faz |
| --- | --- |
| `npm run checar` (api ou web) | Erros de tipo, sem compilar |
| `npm run banco:studio` | Abre o Prisma Studio para ver os dados |
| `npm run banco:migrar` | Aplica mudanças do `schema.prisma` no banco |
| `docker compose down -v` | Apaga o banco e recomeça do zero |

---

## Como o código está organizado

```
api/src/
├── routes/          só diz qual URL chama qual controlador
├── controllers/     entrada e saída de HTTP. Sem regra de negócio.
├── services/        ← a regra de negócio mora aqui
├── repositories/    único lugar que fala com o Prisma
├── schemas/         contratos de entrada em Zod
├── middlewares/     tratamento de erro
└── errors/          ErroDeDominio: erro esperado, não é bug

web/src/
├── services/        chamadas à API (nada de fetch espalhado nas telas)
├── pages/           uma tela
└── components/      pedaços reaproveitáveis de tela
```

A rota `GET /api/saude` é o **exemplo completo** desse caminho: rota →
controlador → serviço → repositório → banco, e a tela consumindo. Ela existe
para ser copiada. Leia esses cinco arquivos antes de escrever o seu primeiro.

Três regras que valem em review:

1. **Controlador não decide nada.** Se tem `if` de regra de negócio no
   controlador, o lugar dele é o serviço.
2. **Serviço não conhece `req` nem `res`.** Ele recebe dado e devolve dado.
3. **Só repositório importa `prisma`.** É isso que deixa o serviço testável sem
   subir banco.

Erro esperado (alias já usado, senha errada) é `throw new ErroDeDominio("...", 409)`
— o `tratadorDeErros` transforma em resposta HTTP. Não precisa de `try/catch` no
controlador.

---

## O modelo de dados

Está em `api/prisma/schema.prisma`, do jeito que combinamos no desenho:

- `usuario` — id (uuid), nome, email (único), senha, dt_criacao, dt_atualizacao
- `url_encurtada` — **codigo (PK)**, url_original, usuario_id (FK, opcional),
  dt_criacao, qtd_acessos

> **Decisão em aberto para a turma:** `usuario_id` está opcional, ou seja,
> hoje dá para encurtar sem estar logado. Se vocês decidirem exigir conta,
> mudem o schema e gerem uma migração — e escrevam o porquê na issue.

---

## Como trabalhamos

```
issue no quadro
   ↓
feat/12-encurtar-url          branch curta, a partir da dev
   ↓  Pull Request
dev                           branch padrão do repositório
   ↓  PR de release
main                          só recebe release
```

- **Sem card, o trabalho não existe.** Mova para `Em progresso` ao começar.
- Branch a partir da `dev`, nomeada `feat/`, `fix/` ou `refactor/` + número da issue.
- PR pequeno: acima de ~400 linhas alteradas, volta sem review.
- **Duas aprovações**: um colega e o mentor. Push direto na `dev` ou na `main` é recusado pelo repositório.
- A descrição do PR responde três perguntas: o que muda, por quê, como testei.
- Commits convencionais: `feat:`, `fix:`, `refactor:`, `test:`, `chore:`.

### Definição de Pronto

- [ ] Rota funcionando, com entrada validada por Zod
- [ ] Regra de negócio no serviço (não no controlador, não na tela)
- [ ] Tela consumindo a rota de verdade — nada de dado mockado
- [ ] PR aprovado por um colega e pelo mentor, e mergeado na `dev`
- [ ] `dev` continua de pé depois do merge
- [ ] Card em `Concluído`

---

## As fatias

Cada dupla pega uma **fatia vertical completa** — modelo, serviço, rota e tela.
Ninguém é "o do backend". É assim que duas duplas quase nunca encostam no mesmo
arquivo e o merge para de doer.

| Fatia | O que entrega |
| --- | --- |
| **A — Conta** | `POST /api/usuarios`, `POST /api/auth`, telas de cadastro e login |
| **B — Encurtar** | `POST /api/urls-encurtadas` + modal de encurtar |
| **C — Acessar** | `GET /:codigo` com redirecionamento e contagem de acesso |
| **D — Histórico** | `GET /api/urls-encurtadas` + lista com os dados de cada URL |

O quadro da turma: <https://github.com/orgs/mentoria-mithril/projects/4>
