# Etapa 1: Construção
FROM node:20.17.0 AS build

# Define o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copia os arquivos de dependências (package.json e package-lock.json)
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia todos os arquivos do projeto para o contêiner
COPY . .

# Compila o projeto (caso use um processo de build, como TypeScript)
RUN npm run build

# Etapa 2: Execução
FROM node:20.17.0

# Define o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copia os arquivos do build da etapa anterior
COPY --from=build /usr/src/app .

# Expõe a porta da aplicação
EXPOSE 3001

# Comando para rodar a aplicação
CMD ["npm", "run", "start"]
