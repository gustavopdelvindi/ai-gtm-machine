# ICP: soluções de pagamentos digitais (Vindi)

Cada critério é uma pergunta de sim ou não. Lead entra no ICP quando passa nos critérios obrigatórios de empresa e de pessoa e em nenhum desqualificador. O que ainda não foi definido está como "A definir", sem inventar valor.

## Oferta e mercado

- **Oferta:** solução de pagamentos digitais com cobrança recorrente (cartão, Pix e boleto).
- **Quem compra:** comércios online, e-commerces e empresas que cobram com recorrência.
- **Clientes de referência (informados):** Minimal Club, DLK, Cafeiny Army e Sul América. Você chamou de "2 melhores" mas listou 4. Não tenho os dados de cada um (porte, faturamento, ticket), então os limites abaixo vêm do que você descreveu do mercado e precisam ser validados contra eles. Sul América é uma seguradora de grande porte e provavelmente fica fora do corte de 5 a 300 funcionários. Se ela é cliente de referência, o ICP tem um segundo perfil (grande empresa com recorrência) que merece um ICP próprio.
- **Modelo de crescimento que o ICP favorece:** SLG com outbound, apoiado por conteúdo (MLG). Ticket e ciclo de venda para SMB e mid-market pedem prospecção ativa com gatilho de momento (vaga, captação, dor com pagamento).

## ICP Empresa

### Setor
| ID | Critério (sim ou não) |
|---|---|
| E01 | Vende online como atividade principal? |
| E02 | O CNAE principal está na lista-alvo? (lista: A definir, partir da divisão 47 do varejo e de serviços por assinatura) |
| E03 | Vende serviço ou produto digital? |
| E04 | O CNPJ está ativo? |

### Tamanho
| ID | Critério (sim ou não) |
|---|---|
| E05 | O porte é diferente de MEI? |
| E06 | O faturamento online é de pelo menos R$ 200 mil por mês? |
| E07 | O faturamento online é de no máximo R$ 30 milhões por mês? |
| E08 | Tem de 5 a 300 funcionários? |

### Geografia
| ID | Critério (sim ou não) |
|---|---|
| E09 | A sede é no Brasil? |
| E10 | Cobra a maior parte da receita em reais? |
| E11 | A sede é no Sudeste ou no Sul? |

### Modelo
| ID | Critério (sim ou não) |
|---|---|
| E12 | Vende para pessoa física (B2C) ou por intermediários (B2B2C)? |
| E13 | Tem checkout transacional próprio? |
| E14 | Aceita cartão e Pix? |
| E15 | O ticket médio fica entre R$ 50 e R$ 1.500? |
| E16 | Tem cobrança recorrente ou recompra? |
| E17 | Vende parcelado? |

### Momento
| ID | Critério (sim ou não) |
|---|---|
| E18 | O CNPJ tem 12 meses ou mais? |
| E19 | O tráfego do site cresceu mais de 20% em 12 meses? |
| E20 | Abriu vaga nos últimos 90 dias? |
| E21 | Há sinal público de dor com meio de pagamento (reclamação, queda de aprovação, atraso de repasse)? |
| E22 | Captou investimento ou lançou algo relevante em 12 meses? |

### Tecnologia
| ID | Critério (sim ou não) |
|---|---|
| E23 | Usa plataforma de e-commerce integrável? |
| E24 | Usa gateway ou adquirente concorrente hoje? |
| E25 | Tem time ou fornecedor de tecnologia? |
| E26 | Usa ferramenta de gestão de assinaturas? |

### Desqualificadores da empresa (qualquer "sim" tira o lead)
| ID | Critério (sim ou não) |
|---|---|
| DE01 | A atividade está em lista restrita? (lista: A definir, com compliance) |
| DE02 | Está em falência ou recuperação judicial? |
| DE03 | Vende só presencialmente? |
| DE04 | É concorrente direto (instituição de pagamento ou adquirente)? |
| DE05 | O site está fora do ar ou sem oferta? |
| DE06 | O chargeback está acima de 1%? |

## ICP Pessoa

### Cargo
| ID | Critério (sim ou não) |
|---|---|
| P01 | O título está na lista-alvo? (sócio, fundador, CEO, CFO, diretor financeiro, head de e-commerce, head de growth, gerente de pagamentos; lista final: A definir) |
| P02 | O título tem termo de pagamentos, financeiro ou e-commerce? |

### Senioridade
| ID | Critério (sim ou não) |
|---|---|
| P03 | É C-level, sócio ou fundador? |
| P04 | É diretor, VP, head ou gerente? |
| P05 | Está acima do nível de analista? |

### Área
| ID | Critério (sim ou não) |
|---|---|
| P06 | A área é uma das áreas-alvo (financeiro, e-commerce, operações, tecnologia)? |
| P07 | É de marketing ou growth com responsabilidade sobre conversão de checkout? |

### Papel na compra
| ID | Critério (sim ou não) |
|---|---|
| P08 | Tem alçada para aprovar o contrato (decisor econômico)? |
| P09 | Influencia a decisão como champion? |
| P10 | O comitê de compra tem decisor e champion mapeados? |

### Atividade
| ID | Critério (sim ou não) |
|---|---|
| P11 | Trabalha hoje na empresa-alvo? |
| P12 | O perfil teve atividade nos últimos 90 dias? |
| P13 | Está no cargo há menos de 12 meses? |
| P14 | Publicou sobre pagamentos ou checkout nos últimos 12 meses? |
| P15 | Tem canal público de contato (LinkedIn aberto, e-mail ou site)? |

### Desqualificadores da pessoa (qualquer "sim" tira o lead)
| ID | Critério (sim ou não) |
|---|---|
| DP01 | Trabalha em concorrente? |
| DP02 | O perfil está desatualizado há mais de 24 meses? |
| DP03 | Pediu para não ser contatado? |

## Regra de decisão

- **Passa (proposta minha, ajuste se discordar):** todos os desqualificadores em "não" e ao menos os critérios de empresa E01, E04, E05, E09, E13 e E16, mais P01 ou P03.
- **Pontuação:** acima desse mínimo, cada "sim" soma ponto. Pesos: A definir depois de validar contra os clientes de referência.
- **Triagem:** todo lead passa por `automations/leads/triagem_icp.py`. Não classifique ICP de cabeça.

## A validar com os clientes de referência

- Faturamento e ticket reais de Minimal Club, DLK, Cafeiny Army e Sul América, para confirmar E06, E07 e E15.
- Se Sul América é do mesmo perfil, ou um segundo ICP de grande empresa.
- CAC e LTV estimados: A definir.
