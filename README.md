# CRUD de Pessoas - Angular

Aplicação frontend desenvolvida em Angular para gerenciamento de pessoas e seus respectivos endereços.

O sistema permite realizar operações completas de cadastro, edição, consulta e remoção de pessoas, além do gerenciamento independente dos endereços vinculados a cada pessoa.

---

# Funcionalidades

## Pessoas

O sistema permite:

- Listar pessoas cadastradas;
- Pesquisar pessoas por nome ou CPF;
- Criar uma nova pessoa;
- Editar dados de uma pessoa;
- Remover uma pessoa;
- Gerenciar os endereços vinculados.

---

## Endereços

Cada pessoa possui um gerenciamento próprio de endereços, permitindo:

- Listar endereços da pessoa;
- Criar novos endereços;
- Editar endereços existentes;
- Remover endereços.

Também existe integração com consulta automática de CEP para preenchimento dos dados de endereço.

---

# Regras de negócio

## Pessoa deve possuir endereço

Uma pessoa obrigatoriamente precisa possuir pelo menos um endereço cadastrado.

A regra é validada em dois níveis:

### Frontend

Antes de remover um endereço, o sistema verifica a quantidade atual de endereços cadastrados.

Caso a pessoa possua somente um endereço, a remoção é bloqueada e uma mensagem é exibida ao usuário.

Exemplo:

> A pessoa deve possuir pelo menos um endereço cadastrado.

Essa validação evita ações inválidas e melhora a experiência do usuário.

---

### Backend

A regra também deve ser garantida pelo backend, evitando que chamadas externas (Postman, scripts ou outros clientes) quebrem a integridade dos dados.

---

# Validação dos formulários

Os formulários utilizam Angular Reactive Forms para controle de estado e validação.

A validação é feita utilizando:

- `FormGroup`
- `FormControl`
- Validators nativos do Angular

---

## Cadastro de pessoa

Campos obrigatórios:

- CPF
- Nome
- Email
- Data de nascimento
- Telefone

Exemplo:

```typescript
this.form = this.fb.group({

  cpf: [
    '',
    Validators.required
  ],

  nome: [
    '',
    Validators.required
  ],

  email: [
    '',
    [
      Validators.required,
      Validators.email
    ]
  ]

});
```

---

## Cadastro de endereço

Campos obrigatórios:

- Tipo do endereço;
- CEP;
- Logradouro;
- Número;
- Bairro;
- Município;
- Estado.

O formulário possui o mesmo componente para:

- criação;
- edição.

A diferenciação ocorre através dos dados recebidos pelo dialog.

Exemplo:

```typescript
editando = !!this.data.endereco;
```

Quando existe um endereço recebido:

- o formulário é preenchido automaticamente;
- o título muda para "Editar endereço".

Caso contrário:

- o formulário inicia vazio;
- o fluxo é de criação.

---

## Validação antes do envio

Antes de salvar qualquer formulário:

```typescript
if(this.form.invalid){

  this.form.markAllAsTouched();

  return;

}
```

Isso garante que:

- campos inválidos sejam destacados;
- mensagens de erro sejam exibidas;
- requisições desnecessárias não sejam enviadas.

---

# Consulta automática de CEP

O formulário de endereço possui integração com a API ViaCEP.

Fluxo:

```
Usuário informa CEP

        ↓

Sistema remove máscara

        ↓

Consulta ViaCEP

        ↓

Preenche automaticamente:

- Logradouro
- Bairro
- Município
- Estado
```

Exemplo:

CEP:

```
86000-000
```

Resultado:

```
Rua preenchida automaticamente
Bairro preenchido automaticamente
Cidade preenchida automaticamente
Estado preenchido automaticamente
```

Os campos continuam editáveis para permitir ajustes manuais.

---

# Integração com Backend

A comunicação com a API é feita através de serviços Angular.

Exemplo:

```
PessoaListComponent

        ↓

PessoaService

        ↓

HTTP Client

        ↓

API Spring Boot
```

Responsabilidades:

## Components

Responsáveis pela interação com o usuário.

Exemplo:

- abrir dialogs;
- exibir mensagens;
- controlar telas.

---

## Services

Responsáveis pela comunicação HTTP.

Exemplo:

```typescript
this.pessoaService.findAll()
```

ou

```typescript
this.enderecoService.create()
```

Essa separação evita regras de negócio e chamadas HTTP diretamente nos componentes.

---

# Proxy Angular para evitar CORS

Durante o desenvolvimento, o frontend Angular roda em uma porta diferente do backend.

Exemplo:

Frontend:

```
http://localhost:4200
```

Backend:

```
http://localhost:8080
```

Essa diferença de origem gera problemas de CORS.

Para evitar isso, foi configurado um proxy no Angular.

---

## Configuração

Arquivo:

```
proxy.conf.json
```

Exemplo:

```json
{
  "/api": {

    "target": "http://localhost:8080",

    "secure": false,

    "changeOrigin": true

  }
}
```

---

No Angular:

```
angular.json
```

foi adicionado:

```json
"proxyConfig": "proxy.conf.json"
```

---

Com isso, chamadas feitas pelo frontend:

```
GET /api/pessoas
```

são redirecionadas internamente para:

```
http://localhost:8080/api/pessoas
```

O navegador entende que a requisição foi feita para a mesma origem, evitando bloqueios de CORS.

---

# Componentes principais

Estrutura simplificada:

```
src/app

├── core

│   ├── models

│   └── services


├── features

│   └── pessoa

│       ├── pessoa-list

│       ├── pessoa-form

│       ├── endereco-management-dialog

│       └── endereco-form-dialog


└── shared

    ├── components

    │   └── confirm-dialog

    │

    └── services

        └── snackbar.service
```

---

# Experiência de uso

## Listagem

A tela inicial apresenta todas as pessoas cadastradas.

Funcionalidades disponíveis:

- pesquisa por nome;
- pesquisa por CPF;
- edição;
- exclusão;
- gerenciamento de endereços.

---

## Confirmações

Operações destrutivas utilizam dialogs de confirmação.

Exemplo:

Excluir pessoa:

```
Deseja realmente excluir "João Silva"?

Esta ação não poderá ser desfeita.

Cancelar | Excluir
```

---

## Feedback ao usuário

Operações realizadas apresentam mensagens utilizando Snackbar.

Exemplos:

```
Pessoa criada com sucesso.
```

```
Endereço removido com sucesso.
```

```
Erro ao processar solicitação.
```

---

# Tecnologias utilizadas

- Angular
- TypeScript
- Angular Material
- Reactive Forms
- RxJS
- HTTP Client
- Spring Boot (API Backend)

---

# Executando o projeto

Instalar dependências:

```bash
npm install
```

Executar aplicação:

```bash
ng serve
```

Aplicação disponível em:

```
http://localhost:4200
```

---

# Considerações finais

O projeto foi desenvolvido buscando separar responsabilidades entre componentes, serviços e regras de negócio.

A utilização de dialogs para gerenciamento de endereços permite manter a pessoa como entidade principal, enquanto possibilita operações independentes sobre seus endereços.

As validações foram implementadas visando garantir uma boa experiência do usuário sem abrir mão da integridade das regras de negócio.