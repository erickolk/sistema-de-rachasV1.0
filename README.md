# Sistema de Rachas

## Sobre o Projeto

O Sistema de Rachas é uma aplicação completa para gerenciamento de partidas de futebol recreativo ("rachas" ou "peladas"). A plataforma permite aos usuários criar e gerenciar partidas, organizar times, registrar horários e locais, além de controlar pagamentos.

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

### Backend (sistema-de-rachas)
- **Tecnologias**: Node.js, TypeScript, Fastify, MongoDB
- **Arquitetura**: Baseada em princípios de Clean Architecture e Domain-Driven Design (DDD)
- **Estrutura de diretórios**:
  - `/src/application`: Casos de uso da aplicação
  - `/src/domain`: Entidades, repositórios e regras de negócio
  - `/src/infra`: Implementações de infraestrutura (banco de dados, servidor, etc.)
  - `/src/types`: Definições de tipos TypeScript
  - `/src/utils`: Utilitários diversos
  - `/database`: Scripts e configurações do banco de dados

### Frontend (frontend_sistema_de_rachas)
- **Tecnologias**: Vue.js 3, Nuxt 3, TypeScript, TailwindCSS, PrimeVue
- **Estrutura de diretórios**:
  - `/components`: Componentes Vue reutilizáveis
  - `/pages`: Páginas da aplicação (rotas)
  - `/layouts`: Layouts para as páginas
  - `/composables`: Funções e hooks reutilizáveis
  - `/services`: Serviços para comunicação com a API
  - `/types`: Definições de tipos TypeScript
  - `/utils`: Utilitários diversos

## Funcionalidades Principais

1. **Gerenciamento de Partidas**
   - Criação, edição e exclusão de partidas
   - Definição de horários e locais
   - Visualização de partidas agendadas

2. **Gerenciamento de Campos**
   - Cadastro de campos de futebol
   - Detalhes de localização e disponibilidade

3. **Sistema de Pagamentos**
   - Geração de QR Code para pagamento PIX
   - Registro de pagamentos realizados
   - Integração com WhatsApp para envio de comprovantes

4. **Sorteio de Times**
   - Funcionalidade para sorteio automático de equipes
   - Balanceamento de times baseado em habilidades

5. **Autenticação e Gestão de Usuários**
   - Login e registro de usuários
   - Perfis de usuários (admin, cliente)
   - Dashboards específicos para cada tipo de usuário

## Requisitos

### Backend
- Node.js 18+
- MongoDB 6+
- Yarn ou NPM

### Frontend
- Node.js 18+
- Yarn ou NPM

## Instalação e Execução

### Configuração do Backend

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre no diretório backend
cd sistema-de-rachas

# Instale as dependências
npm install

# Configure as variáveis de ambiente (copie .env.example para .env e ajuste conforme necessário)
cp .env.example .env

# Inicie o servidor de desenvolvimento
npm run dev
```

### Configuração do Frontend

```bash
# Entre no diretório frontend
cd frontend_sistema_de_rachas

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Utilizando Docker (opcional)

O projeto inclui configurações Docker para facilitar o desenvolvimento:

```bash
# Inicie todos os serviços usando docker-compose
docker-compose up -d
```

## Acesso ao Sistema

Após a instalação e execução do projeto:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3002
- **Swagger API Documentation**: http://localhost:3002/docs

## Estrutura do Banco de Dados

O sistema utiliza MongoDB com as seguintes coleções principais:

- **users**: Usuários do sistema
- **matches**: Partidas agendadas
- **soccerFields**: Campos de futebol
- **payments**: Registros de pagamentos
- **players**: Jogadores cadastrados

## Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`)
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request 