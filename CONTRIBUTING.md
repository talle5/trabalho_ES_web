# 🤝 Guia de Contribuição e Padrões Git - Trabalho ES

Este guia define as convenções de versionamento e trabalho em equipe para manter o repositório organizado, legível e padronizado.

---

## 🌿 1. Nomenclatura de Branches

Sempre crie uma nova branch a partir da `main` atualizada para desenvolver qualquer tarefa:

| Tipo | Padrão | Exemplo |
| :--- | :--- | :--- |
| **Nova funcionalidade** | `feat/SCRUM-XXX-descricao-curta` | `feat/SCRUM-003-lista-consultas` |
| **Correção de bug/estilo** | `fix/SCRUM-XXX-descricao-curta` | `fix/SCRUM-004-alinhamento-navbar` |
| **Documentação/Config** | `chore/SCRUM-XXX-descricao-curta` | `chore/SCRUM-005-devcontainer` |

---

## 💬 2. Padrão de Mensagens de Commit (Conventional Commits)

Escreva mensagens claras, em português, iniciando com verbo no presente ou indicativo do que a mudança faz:

### Formato:
```text
tipo(escopo-opcional): descrição clara do que foi feito
```

### Exemplos recomendados:
* `feat(SCRUM-003): adiciona tela de consultas com abas de status`
* `feat: cria componente de busca na fila de atendimento`
* `fix: ajusta overflow da barra lateral no MainLayout`
* `style: padroniza cores dos botoes com Tailwind`
* `docs: atualiza README com guia de rotas`
* `refactor: reorganiza pastas de layouts e componentes`

---

## 🔄 3. Fluxo de Trabalho Passo a Passo

### 1. Iniciar nova tarefa:
```bash
git checkout main
git pull
git checkout -b feat/SCRUM-003-minha-tarefa
```

### 2. Commitar suas alterações:
```bash
git add .
git commit -m "feat(SCRUM-003): implementa formulario de triagem"
```

### 3. Subir para o GitHub:
```bash
git push -u origin feat/SCRUM-003-minha-tarefa
```

### 4. Após o Merge na `main`:
Para manter o repositório limpo, delete a branch local que já foi incorporada:
```bash
git checkout main
git pull
git branch -d feat/SCRUM-003-minha-tarefa
```

---

## ⚙️ 4. Configuração Recomendada do Git

Para evitar mensagens de aviso sobre branches divergentes:

```bash
git config pull.rebase false
```
