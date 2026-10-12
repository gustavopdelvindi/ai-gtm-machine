# Filtros: mapeamento dos critérios do ICP

Cada critério de `icp.md` vira uma coluna booleana (`true` = sim, `false` = não) em snake_case.
**(!)** = critério sem fonte pública confiável. Nesses, a coluna "Fonte pública" traz o proxy possível ou o dado que só existe internamente (CRM, entrevista, dados dos clientes atuais).

## Empresa

| Critério | Campo | Fonte pública |
|---|---|---|
| E01 Vende online como atividade principal | `vende_online_principal` | Site da empresa (inspeção manual ou scraping); Google |
| E02 CNAE na lista-alvo | `cnae_alvo` | Receita Federal (consulta CNPJ); BrasilAPI; CNPJ.ws |
| E03 Vende serviço ou produto digital | `vende_produto_digital` | Site da empresa; páginas de planos e preços |
| E04 CNPJ ativo | `cnpj_ativo` | Receita Federal (consulta CNPJ) |
| E05 Porte diferente de MEI | `porte_nao_mei` | Receita Federal; Portal do Simples Nacional |
| E06 (!) Faturamento online ≥ R$ 200 mil/mês | `faturamento_online_min_200k` | Sem fonte pública. Proxies: capital social (Receita), tráfego (SimilarWeb), headcount (LinkedIn) |
| E07 (!) Faturamento online ≤ R$ 30 mi/mês | `faturamento_online_max_30mi` | Sem fonte pública. Mesmos proxies de E06 |
| E08 5 a 300 funcionários | `headcount_5_a_300` | LinkedIn (página da empresa) |
| E09 Sede no Brasil | `sede_brasil` | Receita Federal (endereço do CNPJ) |
| E10 (!) Cobra a maior parte em BRL | `cobra_majoritario_brl` | Sem fonte pública para a receita. Proxy: site em português com preços em R$ |
| E11 Sede no Sudeste ou Sul | `sede_sudeste_sul` | Receita Federal (UF do CNPJ) |
| E12 Vende B2C ou B2B2C | `modelo_b2c_b2b2c` | Site da empresa (público-alvo e páginas de produto) |
| E13 Checkout transacional próprio | `checkout_proprio` | Site (inspeção do fluxo de compra); BuiltWith |
| E14 Aceita cartão e Pix | `aceita_cartao_e_pix` | Site (checkout e rodapé de meios de pagamento) |
| E15 Ticket médio entre R$ 50 e R$ 1.500 | `ticket_50_a_1500` | Site (preços listados; média dos principais produtos ou planos) |
| E16 Cobrança recorrente ou recompra | `tem_recorrencia` | Site (planos, assinatura, clube) |
| E17 Vende parcelado | `vende_parcelado` | Site (checkout e página de produto) |
| E18 CNPJ com 12 meses ou mais | `cnpj_12m_mais` | Receita Federal (data de abertura) |
| E19 Tráfego +20% em 12 meses | `trafego_cresce_20pct` | SimilarWeb (versão gratuita); Semrush |
| E20 Vaga aberta nos últimos 90 dias | `vaga_aberta_90d` | LinkedIn Vagas; Gupy; Vagas.com |
| E21 Sinal de dor com meio de pagamento | `sinal_dor_pagamento` | Reclame Aqui; Google Reviews; Procon |
| E22 Captou ou lançou algo em 12 meses | `evento_captacao_lancamento_12m` | Distrito; Crunchbase; Valor Econômico; blog e redes da empresa |
| E23 Plataforma de e-commerce integrável | `plataforma_integravel` | BuiltWith; Wappalyzer |
| E24 Usa gateway ou adquirente concorrente | `usa_gateway_concorrente` | Inspeção do checkout; BuiltWith; Wappalyzer |
| E25 Tem time ou fornecedor de tecnologia | `tem_time_tecnologia` | LinkedIn (cargos de tecnologia); vagas de dev; GitHub |
| E26 Usa ferramenta de assinaturas | `usa_gestao_assinaturas` | BuiltWith; Wappalyzer; inspeção do checkout |

## Desqualificadores da empresa

| Critério | Campo | Fonte pública |
|---|---|---|
| DE01 Atividade em lista restrita | `atividade_restrita` | Receita Federal (CNAE); site da empresa |
| DE02 Falência ou recuperação judicial | `falencia_recuperacao_judicial` | Tribunais de Justiça (consulta processual); Diário Oficial; Jusbrasil |
| DE03 Vende só presencialmente | `somente_presencial` | Site da empresa (ausência de loja ou checkout online) |
| DE04 É concorrente direto | `e_concorrente_direto` | Receita Federal (CNAE 6619-3/05 e afins); Banco Central (lista de instituições de pagamento) |
| DE05 Site fora do ar ou sem oferta | `site_inativo` | Verificação HTTP do domínio |
| DE06 (!) Chargeback acima de 1% | `chargeback_acima_1pct` | Sem fonte pública. Dado interno ou levantado na conversa comercial. Proxy: reclamações de cobrança indevida no Reclame Aqui |

## Pessoa

| Critério | Campo | Fonte pública |
|---|---|---|
| P01 Título em lista-alvo | `cargo_alvo` | LinkedIn |
| P02 Título com termo de pagamentos, financeiro ou e-commerce | `cargo_termo_pagamentos` | LinkedIn |
| P03 C-level, sócio ou fundador | `senioridade_clevel_socio` | LinkedIn; Receita Federal (quadro societário, QSA) |
| P04 Diretor, VP, head ou gerente | `senioridade_diretor_gerente` | LinkedIn |
| P05 Acima de analista | `senioridade_acima_analista` | LinkedIn |
| P06 Área-alvo | `area_alvo` | LinkedIn |
| P07 Marketing ou Growth com conversão de checkout | `area_growth_conversao` | LinkedIn (título e descrição do cargo) |
| P08 (!) Tem alçada para aprovar contrato | `decisor_economico` | Sem fonte pública. Alçada só se confirma na conversa. Proxy: título + QSA da Receita Federal |
| P09 (!) Influencia como champion | `champion_influenciador` | Sem fonte pública. Só se confirma na conversa. Proxy: título em finanças, tecnologia ou e-commerce |
| P10 (!) Comitê com decisor e champion mapeados | `comite_mapeado` | Sem fonte pública. Dado interno do CRM |
| P11 Trabalha hoje na empresa-alvo | `cargo_atual_confirmado` | LinkedIn |
| P12 Perfil ativo em 90 dias | `linkedin_ativo_90d` | LinkedIn (posts e interações públicas) |
| P13 No cargo há menos de 12 meses | `cargo_menos_12m` | LinkedIn (data de início da experiência) |
| P14 Publicou sobre pagamentos ou checkout | `publicou_tema_pagamentos_12m` | LinkedIn (posts); eventos e podcasts |
| P15 Canal público de contato | `canal_contato_publico` | LinkedIn; site da empresa; Hunter.io |

## Desqualificadores da pessoa

| Critério | Campo | Fonte pública |
|---|---|---|
| DP01 Trabalha em concorrente | `trabalha_em_concorrente` | LinkedIn |
| DP02 Perfil desatualizado há mais de 24 meses | `perfil_desatualizado_24m` | LinkedIn (última atividade e experiência) |
| DP03 (!) Pediu para não ser contatado | `optout_bloqueio` | Sem fonte pública. Dado interno (CRM, lista de supressão) |

## Resumo dos critérios marcados com (!)

| Campo | O que fazer |
|---|---|
| `faturamento_online_min_200k` | Estimar por proxy e validar na primeira conversa |
| `faturamento_online_max_30mi` | Idem |
| `cobra_majoritario_brl` | Assumir sim quando o site é em PT-BR com preços em R$ |
| `chargeback_acima_1pct` | Perguntar na qualificação (SDR) |
| `decisor_economico` | Confirmar na qualificação |
| `champion_influenciador` | Confirmar na qualificação |
| `comite_mapeado` | Preencher no CRM |
| `optout_bloqueio` | Manter lista de supressão interna |
