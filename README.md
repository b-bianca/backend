# Hubla Challenge

## Sumário
- [Sobre](#sobre)
- [Requisitos](#requisitos)
- [O que esse projeto faz e possui](#o-que-esse-projeto-faz-e-possui)
- [O que esse projeto não faz e débitos técnicos](#o-que-esse-projeto-não-faz-e-débitos-técnicos)
- [Como Executar o Projeto](#como-executar-o-projeto)
  - [Criar Variáveis de Ambiente](#criar-variáveis-de-ambiente)
  - [Executar o projeto](#como-executar-o-projeto)
  - [Executar o Docker](#executar-o-docker)
  - [Utilizar Aplicaçção & Documentação API](#utilizar-aplicação--documentação-api)


## Sobre
Este projeto visa simular uma plataforma que trabalha com o modelo criador-afiliado. É necessário construir uma interface web que possibilite o upload de um arquivo de transações de produtos vendidos, normalizar os dados e armazená-los em um
banco de dados relacional.

## Requisitos

|Recurso|Versão|Obrigatório|Nota|
|-|-|-|-|
|Docker Desktop| 4.21 ou mais atual|Sim|Necessário para rodar containers das APIs e banco de dados|
|Node| 18.18.0|Não|Necessário apenas no caso de rodar localmente sem container|

## O que esse projeto faz e possui
### O que esse projeto faz
Através da API é possível fazer o upload de um arquivo. Este arquivo é normalizado e seus dados enviados para o banco de dados.
Com as informações salvas no banco de dados pode-se verificar os ultimos dados enviados através de um query-param, ou retornar todos os dados registrados. Além disso, é possível verificar o número de vendas realizadas e os saldos finais tanto do produtor quanto do afiliado.

#### O que esse projeto possui
 - [x] Dockerfile e DockerCompose
 - [x] Documentação para Consumo da API
 - [x] Testes Unitários
 - [x] Componentes
   - [x] API
   - [x] Banco de dados

## O que esse projeto não faz e débitos técnicos
#### O que esse projeto não faz
- Não envia propriamente as notificações, apenas simula o envio agendado e registra no banco de dados para evidencia do funcionamento da rotina;

#### Débitos técnicos
- [ ] Remoção paramêtros *hard coded*, como portas das aplicações.
- [ ] Estabelecer um intervalo mínimo entre o momento de criação da notificação e o agendamento dessa mesma notificação.
- [ ] Teste do scheduller

## Como executar o projeto
### Criar Variáveis de Ambiente
Criar um arquivo nomedo como `.env` na raiz do projeto contendo os seguintes valores.
~~~bash
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"
POSTGRES_DB="hubladb"
POSTGRES_HOST="db"
~~~
Notas: dada a natureza desse projeto há valores ***hard coded*** no código.

### Executar o projeto
É possivel executar o projeto através do Makefile, a partir da linha de comando. Mas caso queira, abaixo segue como executar o docker manualmente, e depois rode make run-scheduler.
~~~bash
make run-project
~~~
Notas: o comando deve ser efetuado na pasta raiz do projeto

### Executar o projeto
Para executar o projeto, é necessário ter o `Docker Desktop` instalado. Com isso será possível criar as instancias usando o comando `docker compose` via IDE ou linha de comando conforme a seguir:
~~~bash
docker compose -f "docker-compose.yml" up -d --build
~~~
Notas: o comando deve ser efetuado na pasta raiz do projeto, dentro da pasta de backend

### Utilizar Aplicação & Documentação API
A documentação está disponível via Postman com os casos de consumo. É possivel rodar pelo link abaixo, ou copiando a coleção que esta dentro da pasta `docs`. É possivel verificar a documentação da API através do Swagger: http://localhost:8080/api.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/13244098-10a3752d-4fe2-49f4-bf7d-2c397c24f7cd?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D13244098-10a3752d-4fe2-49f4-bf7d-2c397c24f7cd%26entityType%3Dcollection%26workspaceId%3D5e98eea6-1218-49b0-abb5-3b3c919df553)