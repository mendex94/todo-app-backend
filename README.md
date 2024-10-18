# API ToDo App com Fastify

---

Esta é uma API simples de aplicativo ToDo construída com Fastify e PostgreSQL como banco de dados e Redis para cache. A API aplica princípios de arquitetura limpa e é construída com TypeScript.

## Funcionalidades

1. **Gerenciamento de Usuários**

   - Registro de usuário com e-mail, senha e nome
   - Autenticação de usuário (login)
   - Autenticação baseada em JWT
   - Funcionalidade de logout

2. **Gerenciamento de Tarefas**

   - Criar novas tarefas
   - Listar tarefas para usuários autenticados
   - Editar tarefas existentes
   - Excluir tarefas
   - Marcar tarefas como concluídas

3. **Cache**

   - Cache Redis para melhor desempenho
   - Invalidação de cache nas atualizações de tarefas

4. **Segurança da API**

   - Hashing de senha usando bcrypt
   - Autenticação baseada em token JWT
   - Cookies seguros HTTP-only para armazenamento de token

5. **Integração Frontend**

   - Frontend simples em Vue.js para interagir com a API
   - Design responsivo para mobile e desktop

6. **Banco de Dados**

   - Banco de dados PostgreSQL usando Prisma ORM
   - Esquema de banco de dados para usuários e tarefas

7. **Implantação**

   - Configuração Docker e Docker Compose para fácil implantação
   - Traefik como proxy reverso para HTTPS e gerenciamento automático de certificados SSL

8. **Ferramentas de Desenvolvimento**
   - TypeScript para desenvolvimento com segurança de tipos
   - ESLint para linting de código
   - Vitest para testes unitários
   - tsup para processo de build TypeScript

## Stack Tecnológica

- [Fastify](https://www.fastify.io/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [Vitest](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://github.com/colinhacks/zod)
- [Vue.js](https://vuejs.org/)
- [Docker](https://www.docker.com/)
- [Traefik](https://traefik.io/)

## Notas

Meu objetivo com essa API foi criar uma API RESTful que atenda aos requisitos do projeto, utilizando a arquitetura limpa e os princípios do SOLID. Além disso, foi utilizado o Prisma como ORM para interação com o banco de dados e o Redis como cache.

O grande obstáculo foi a falta de conhecimento sobre o Docker, porém foi uma ótima experiência para aprimorar meus conhecimentos, utilizando ferramentas como o Traefik para o gerenciamento de certificados SSL, o Docker para containerização e o Docker Compose para orquestração de containers.

## Endpoints da API

- POST `/api/users` - Registrar um novo usuário
- POST `/api/auth` - Autenticar um usuário
- DELETE `/api/logout` - Fazer logout de um usuário
- GET `/api/todos` - Listar tarefas para o usuário autenticado
- POST `/api/todos` - Criar uma nova tarefa
- PUT `/api/todos/:todoId` - Atualizar uma tarefa existente
- DELETE `/api/todos/:todoId` - Excluir uma tarefa

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter detalhes.
