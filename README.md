# apl-pagamento-back

Repositório do micro-serviço de pagamento.

## Rodando Localmente

Para rodar a aplicação localmente siga as etapas abaixo:

Clone o projeto

```bash
  git clone https://github.com/FIAP-25/apl-pagamento-back.git
```

Instale a versão do Node:

```bash
  Node 18.17.1
```

Instale as dependências:

```bash
  npm install --legacy-peer-deps
```

Criar um arquivo .env a partir do .env-example (no arquivo .env-example estão as configurações padrões do projeto)

```bash
  Criar arquivo .env
```

Rodar o comando para inicialização

```bash
  npm run start
```

O swagger da aplicação pode ser visualizado pelo endereço:

```bash
  http://localhost:5001/api
```

## Rodando com o docker

Para subir os containers do docker executar o comando

```bash
  npm run docker
```

## Padrão do projeto SAGA - Coreografia

O padrão de coreografia se destaca como a escolha ideal para nosso sistema por diversas razões. Primeiramente, dispensa a necessidade de um orquestrador central, simplificando significativamente a arquitetura. Ao contrário de sistemas que exigem rollback em caso de falhas, cada funcionalidade é autônoma e assume a responsabilidade por sua própria execução. Isso significa que cada parte do processo segue seu curso naturalmente, sem depender de uma entidade central para coordenar as ações. Em vez disso, cada funcionalidade simplesmente executa sua tarefa e comunica de forma direta com o próximo executor na sequência. Essa abordagem descentralizada não só reduz a complexidade do sistema, mas também melhora a resiliência, desacoplamento e a escalabilidade, tornando-o mais flexível e adaptável às demandas em constante evolução.

Resiliência a Falhas: Se algo der errado em uma parte do processo, não é preciso interromper tudo. Por exemplo, se o pagamento falhar, não precisamos cancelar o pedido inteiro. Podemos apenas reprocessar o pagamento e continuar de onde paramos, mantendo tudo o mais intacto possível.

Desacoplamento: Com esse padrão, cada serviço sabe o que precisa fazer e não precisa ser responsável pelos outros. Facilitando o desenvolvimento e manutenção do serviço.

Escalabilidade: Como os serviços não dependem uns dos outros, podemos aumentar o tamanho de cada um deles conforme necessário, sem que isso afete o restante do sistema. 

![download (1)](https://github.com/FIAP-25/apl-pagamento-back/assets/63364180/612eb111-c6ab-40ab-b011-4adf20cf9e6d)

## Autores

-   Eduardo Vinicius Rodrigues Lima - RM430119
-   Leonardo Covelo da Paz - RM350311
-   Luik de Castro da Silva - RM348546
-   Ricardo Souza Reis - RM348610
