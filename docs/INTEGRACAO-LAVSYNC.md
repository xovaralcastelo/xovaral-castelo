# Integração LavSync → Site Xô Varal Castelo

O site espelha automaticamente classificação (Bronze/Prata/Ouro/Diamante),
pontos acumulados e progresso para o próximo nível. O LavSync é a **fonte da
verdade**: a cada pagamento confirmado, ele dispara um webhook e o site
credita os ciclos/pontos na conta do cliente.

## O que o LavSync precisa implementar

Disparar um `POST` HTTP a cada **pagamento confirmado** (momento em que o
LavSync já classificou o cliente e atribuiu a pontuação).

### Endpoint

```
POST https://castelo.xovaral.com/api/lavsync/webhook
```

### Headers

```
Content-Type: application/json
Authorization: Bearer <LAVSYNC_WEBHOOK_SECRET>
```

O secret é compartilhado fora de banda (não commitar no código do LavSync —
usar variável de ambiente).

### Payload

```json
{
  "event_id": "pay_8f3a2c91",
  "type": "payment.confirmed",
  "cpf": "12345678909",
  "cycles": 2,
  "points": 20,
  "amount_cents": 6798,
  "occurred_at": "2026-06-11T14:23:00-03:00"
}
```

| Campo          | Tipo    | Obrigatório | Descrição                                                                 |
|----------------|---------|-------------|---------------------------------------------------------------------------|
| `event_id`     | string  | sim         | ID único do evento no LavSync (ex.: ID do pagamento). Garante idempotência. |
| `cpf`          | string  | sim         | CPF do cliente (com ou sem máscara — o site normaliza).                    |
| `cycles`       | int ≥ 0 | sim*        | Ciclos de lavagem/secagem creditados pela compra (definem o nível do mês). |
| `amount_cents` | int ≥ 0 | sim*        | **Valor pago em centavos.** O site credita **1 ponto por real** na carteira do cliente (`floor(amount_cents/100)`). É a fonte da pontuação. |
| `points`       | int ≥ 0 | não         | Legado/fallback. Só é usado se `amount_cents` **não** vier. Se mandar `amount_cents`, este campo é ignorado para crédito. |
| `occurred_at`  | ISO 8601| não         | Data/hora do pagamento. Padrão: momento do recebimento.                    |
| `type`         | string  | não         | Livre (ex.: `payment.confirmed`). Guardado no log.                         |

\* O evento precisa ter efeito: envie `cycles > 0` (para nível) e/ou
`amount_cents > 0` (para pontos da carteira). **Recomendado enviar sempre
`amount_cents`** — é assim que o cliente acumula pontos (1 ponto = R$1) para
trocar por produtos na Store.

### Regra de pontos (carteira)

A carteira de pontos do cliente reflete o **total gasto**: cada R$1,00 pago
vira 1 ponto. Ex.: `amount_cents: 6798` (R$ 67,98) credita **67 pontos**.
Centavos são truncados. Os ciclos (`cycles`) são uma coisa separada — eles
definem o **nível** do mês (Bronze/Prata/Ouro/Diamante), que zera todo mês;
os pontos são vitalícios e gastáveis na Store.

### Respostas

| HTTP | Body                                  | Significado                                                        |
|------|---------------------------------------|--------------------------------------------------------------------|
| 200  | `{"status":"applied","linked":true}`  | Creditado na conta do cliente.                                      |
| 200  | `{"status":"stored","linked":false}`  | CPF ainda sem conta no site — guardado; aplica quando ele vincular. |
| 200  | `{"status":"duplicate"}`              | `event_id` repetido — já processado antes (retry seguro).           |
| 400  | `{"error":"..."}`                     | Payload inválido — corrigir e reenviar.                             |
| 401  | `{"error":"unauthorized"}`            | Secret errado/ausente.                                              |
| 5xx  | `{"error":"..."}`                     | Falha temporária — **reenviar com retry**.                          |

### Política de retry recomendada

Em caso de timeout ou 5xx: reenviar com backoff exponencial
(ex.: 1 min, 5 min, 30 min, 2 h, até 24 h). O endpoint é **idempotente por
`event_id`** — reenviar o mesmo evento nunca duplica pontos.

### Teste rápido (curl)

```bash
curl -X POST https://castelo.xovaral.com/api/lavsync/webhook \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $LAVSYNC_WEBHOOK_SECRET" \
  -d '{
    "event_id": "teste-001",
    "cpf": "111.444.777-35",
    "cycles": 1,
    "amount_cents": 3399
  }'
```

## Como funciona o vínculo do cliente (lado do site)

1. Cliente entra no site com Google (`/minha-conta`).
2. Na primeira visita, um cartão pede o **CPF usado nas compras** — ele
   informa uma única vez (validação de dígitos verificadores).
3. Tudo que o LavSync já tiver enviado para aquele CPF **antes do vínculo**
   é creditado retroativamente na hora.
4. Dali em diante, cada webhook credita na conta em tempo real: nível do
   mês, pontos vitalícios e "faltam X ciclos para o próximo nível" se
   atualizam sozinhos (o desconto do nível vale no mês seguinte, regra já
   existente do clube).

## Estornos / correções

A v1 não trata estorno automático (evento com ciclos/pontos negativos).
Se um pagamento for estornado, ajustar manualmente no admin do site
(Clientes → Ajustar pontos) ou me pedir que adiciono o evento
`payment.refunded` na API.
