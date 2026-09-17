# 🌐 API Roadmap

Objetivo: estudar diferentes estilos de API, entender seus casos de uso e aplicar cada um em situações onde faça sentido.

## 1. REST

**Onde aplicar:**
API principal do sistema, CRUD, autenticação, filtros e paginação.

* [ ] Padronizar endpoints
* [ ] Estudar HTTP e status codes
* [ ] Paginação e filtros
* [ ] Autenticação e autorização
* [ ] Rate limiting
* [ ] Idempotência

## 2. GraphQL

**Onde aplicar:**
Aplicação pública do menu, quando houver necessidade de buscar dados relacionados em uma única consulta.

* [ ] Criar schema
* [ ] Queries
* [ ] Mutations
* [ ] Resolvers
* [ ] Resolver N+1
* [ ] Autenticação

## 3. WebSocket

**Onde aplicar:**
Atualizações em tempo real entre o painel administrativo e o menu público.

Exemplo:

> Produto fica indisponível no painel → menu público recebe a alteração sem atualizar a página.

* [ ] Conexão persistente
* [ ] Eventos
* [ ] Broadcast
* [ ] Rooms
* [ ] Reconexão
* [ ] Heartbeat

## 4. Webhooks

**Onde aplicar:**
Comunicação com sistemas externos baseada em eventos.

Exemplo:

> Produto criado → sistema envia um evento para outro sistema.

* [ ] Criar eventos
* [ ] Retry
* [ ] Timeout
* [ ] Idempotência
* [ ] Assinatura dos eventos
* [ ] Dead Letter

## 5. SOAP

**Onde aplicar:**
Simular integração com um sistema legado.

Exemplo:

> Menu Service consulta estoque através de um sistema legado SOAP.

* [ ] XML
* [ ] WSDL
* [ ] Criar serviço SOAP simulado
* [ ] Implementar Adapter
* [ ] Trabalhar com timeout e erros

## 6. gRPC

**Onde aplicar:**
Comunicação interna entre serviços.

Exemplo:

> Menu Service → Recommendation Service

* [ ] Protocol Buffers
* [ ] Definir contratos
* [ ] Comunicação entre serviços
* [ ] Streaming
* [ ] Tratamento de erros
