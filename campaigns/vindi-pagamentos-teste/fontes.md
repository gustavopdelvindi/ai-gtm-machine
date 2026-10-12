# Fontes e concorrentes: Vindi Soluções de Pagamento

Status (2026-10-07): fontes por critério prontas (50 critérios de `filtros.md`). Concorrentes prontos, com a página de clientes verificada só em parte e nenhum post de maior engajamento verificado.

Aviso de método: o catálogo de fontes abaixo vem de conhecimento geral, não de teste de cada fonte. Esforço é estimativa: Baixo (consulta direta ou API gratuita), Médio (login, limite de uso, scraping simples ou plano pago), Alto (captcha, anti-bot, risco de termos de uso ou processamento pesado). Antes de automatizar LinkedIn e Reclame Aqui, confira os termos de uso de cada um.

## Catálogo de fontes

| Cód. | Fonte | O que entrega | Esforço de extração |
|---|---|---|---|
| F01 | Receita Federal: consulta CNPJ | Situação, CNAE, porte, data de abertura, UF e endereço, capital social, quadro societário (QSA) | Médio: captcha na consulta manual |
| F02 | APIs de CNPJ (BrasilAPI, CNPJ.ws) | Os mesmos dados da Receita, em JSON | Baixo: há limite de requisições |
| F03 | Dados abertos de CNPJ (base completa da Receita) | Todas as empresas do país, filtráveis por CNAE, UF e data | Alto: arquivos grandes e processamento próprio, mas serve para lista em massa |
| F04 | Portal do Simples Nacional | Opção pelo Simples e enquadramento MEI | Médio: consulta por CNPJ com captcha |
| F05 | Site da empresa, inspeção manual | Oferta, público, rodapé, termos, página de carreiras, blog | Médio: leitura caso a caso |
| F06 | Site da empresa, scraping (Firecrawl, Apify) | O mesmo conteúdo do F05, em escala e estruturado | Médio |
| F07 | Páginas de planos, preços e checkout | Preços, parcelamento, assinatura, meios de pagamento | Médio: o checkout muitas vezes exige simular uma compra |
| F08 | Google (operadores de busca, Trends) | Páginas, menções, interesse de busca ao longo do tempo, perfis via `site:linkedin.com/in` | Baixo |
| F09 | Google Maps e avaliações | Existência de loja física, nota e texto de avaliações | Baixo a médio |
| F10 | BuiltWith | Plataforma de e-commerce, gateway, ferramentas, histórico de adoção | Baixo: lista completa é paga |
| F11 | Wappalyzer | Tecnologias do site (plataforma, pagamento, assinatura) | Baixo: extensão ou API |
| F12 | SimilarWeb (gratuito) | Estimativa de tráfego e tendência | Baixo: sites pequenos podem não ter dado |
| F13 | Semrush | Tráfego orgânico, palavras-chave, tendência | Médio: plano pago |
| F14 | LinkedIn: página da empresa | Faixa de funcionários, setor, vagas, posts, pessoas por cargo | Médio: exige login |
| F15 | LinkedIn: perfil da pessoa | Cargo, área, senioridade, datas de início, atividade e posts | Alto em escala: login, limites e risco de bloqueio |
| F16 | LinkedIn Sales Navigator | Filtros por cargo, senioridade, função, tempo no cargo, atividade | Médio: plano pago |
| F17 | LinkedIn Vagas | Vagas abertas por empresa e data | Baixo a médio |
| F18 | Gupy, Vagas.com, Indeed | Vagas abertas e área | Baixo |
| F19 | Reclame Aqui | Reclamações por tema (cobrança indevida, pagamento), nota, volume | Alto: anti-bot, volume exige scraping |
| F20 | Consumidor.gov.br e Procon | Reclamações de consumo, por empresa | Médio |
| F21 | Reddit (subreddits de empreendedorismo, e-commerce e programação em português) | Menções espontâneas de dor com gateway e adquirente | Médio: volume baixo, busca manual. Subreddits a confirmar |
| F22 | Instagram, X e YouTube da empresa e do executivo | Lançamentos, promoções, parcelamento, posts sobre pagamentos | Médio |
| F23 | Distrito, Crunchbase, ABStartups | Rodadas, investidores, lançamentos | Médio: dado completo costuma ser pago |
| F24 | Imprensa de negócios (Valor, Exame, Pipeline) | Captações, aquisições, falências, lançamentos | Médio |
| F25 | Tribunais de Justiça, Diário Oficial, Jusbrasil | Falência, recuperação judicial, processos | Alto: cada tribunal tem seu sistema, com captcha |
| F26 | Banco Central: instituições autorizadas | Lista de instituições de pagamento e financeiras | Baixo: arquivo público |
| F27 | GitHub | Repositórios da empresa e de seus devs | Baixo: API gratuita |
| F28 | Hunter.io | E-mails públicos por domínio e padrão de e-mail | Baixo: plano gratuito limitado |
| F29 | Verificação HTTP do domínio | Site no ar, redirecionamento, certificado | Baixo: um script simples |
| F30 | Podcasts e eventos (Spotify, YouTube, sites de evento) | Participação da pessoa em painéis e entrevistas | Alto: busca manual por nome |
| F31 | Meta Ad Library (biblioteca de anúncios) | Anúncios ativos, tempo de veiculação, ofertas e preços | Baixo: pública |
| F32 | Glassdoor | Faixa de funcionários, vagas, avaliações | Médio |
| F33 | Diretórios de e-commerce (ABComm, selos como Ebit) | Lojas associadas e selos | Médio: a confirmar disponibilidade |
| F34 | CRM interno (Nuvia) e lista de supressão | Opt-out, comitê, histórico de contato | Baixo, mas interno (não é fonte pública) |
| F35 | Conversa de qualificação (SDR) | Chargeback, alçada, champion, faturamento | Baixo, mas só depois do primeiro contato |
| F36 | Apify (scrapers de LinkedIn, Reclame Aqui) | Automatiza F15 e F19 | Médio: custo por item, confira termos de uso |
| F37 | Escavador | Perfil de empresa e de sócio, processos | Médio: parte é paga |
| F38 | Diretórios de CNPJ (cnpj.biz, Casa dos Dados) | CNAE, sócios, data de abertura, com filtro por atividade | Baixo |
| F40 | Ahrefs | Tráfego orgânico e tendência | Médio: plano pago |

## Fontes por critério (as 5 melhores, em ordem)

(!) = sem fonte pública confiável. Nesses casos as fontes são proxies e o dado real vem de F34 ou F35.

### Empresa

| Critério | Top 5 fontes |
|---|---|
| E01 Vende online como principal | F05, F08, F07, F10, F31 |
| E02 CNAE na lista-alvo | F01, F02, F03, F38, F37 |
| E03 Vende serviço ou produto digital | F07, F05, F10, F08, F31 |
| E04 CNPJ ativo | F01, F02, F03, F38, F37 |
| E05 Porte diferente de MEI | F01, F04, F02, F03, F38 |
| E06 (!) Faturamento online ≥ R$ 200 mil/mês | F01 (capital social), F12, F14 (headcount), F31 (volume de anúncios), F19 (volume de reclamações) |
| E07 (!) Faturamento online ≤ R$ 30 mi/mês | Mesmas de E06 |
| E08 5 a 300 funcionários | F14, F16, F32, F18, F15 |
| E09 Sede no Brasil | F01, F02, F38, F05, F14 |
| E10 (!) Cobra a maior parte em BRL | F05, F07, F08, F10, F35 |
| E11 Sede no Sudeste ou Sul | F01, F02, F38, F03, F14 |
| E12 Vende B2C ou B2B2C | F05, F08, F22, F31, F07 |
| E13 Checkout transacional próprio | F07, F10, F11, F05, F06 |
| E14 Aceita cartão e Pix | F07, F05, F06, F10, F11 |
| E15 Ticket médio entre R$ 50 e R$ 1.500 | F07, F05, F06, F31, F22 |
| E16 Cobrança recorrente ou recompra | F07, F05, F06, F10, F22 |
| E17 Vende parcelado | F07, F05, F06, F31, F22 |
| E18 CNPJ com 12 meses ou mais | F01, F02, F03, F38, F37 |
| E19 Tráfego +20% em 12 meses | F12, F13, F40, F31, F08 |
| E20 Vaga aberta nos últimos 90 dias | F17, F18, F14, F32, F05 |
| E21 Sinal de dor com meio de pagamento | F19, F09, F20, F21, F08 |
| E22 Captou ou lançou algo em 12 meses | F23, F24, F22, F14, F05 |
| E23 Plataforma de e-commerce integrável | F10, F11, F05, F06, F08 |
| E24 Usa gateway ou adquirente concorrente | F07, F10, F11, F06, F21 |
| E25 Tem time ou fornecedor de tecnologia | F14, F15, F17, F27, F18 |
| E26 Usa ferramenta de assinaturas | F10, F11, F07, F06, F05 |

### Desqualificadores da empresa

| Critério | Top 5 fontes |
|---|---|
| DE01 Atividade em lista restrita | F01, F02, F03, F05, F08 |
| DE02 Falência ou recuperação judicial | F25, F08, F24, F37, F19 |
| DE03 Vende só presencialmente | F05, F08, F09, F07, F22 |
| DE04 É concorrente direto | F01, F26, F02, F05, F14 |
| DE05 Site fora do ar ou sem oferta | F29, F05, F06, F08, F12 |
| DE06 (!) Chargeback acima de 1% | F19, F20, F09 (proxies); dado real em F35 e F34 |

### Pessoa

| Critério | Top 5 fontes |
|---|---|
| P01 Título em lista-alvo | F15, F16, F36, F08, F05 (página do time) |
| P02 Título com termo de pagamentos, financeiro ou e-commerce | F15, F16, F36, F08, F14 |
| P03 C-level, sócio ou fundador | F15, F01 (QSA), F16, F05, F37 |
| P04 Diretor, VP, head ou gerente | F15, F16, F36, F08, F14 |
| P05 Acima de analista | F15, F16, F36, F08, F14 |
| P06 Área-alvo | F15, F16, F36, F14, F08 |
| P07 Marketing ou Growth com conversão de checkout | F15, F16, F36, F17, F08 |
| P08 (!) Alçada para aprovar contrato | F01 (QSA), F15, F37 (proxies); dado real em F35 e F34 |
| P09 (!) Champion influenciador | F15, F16, F14 (proxies); dado real em F35 e F34 |
| P10 (!) Comitê mapeado | F34, F35, F16, F15, F14 |
| P11 Trabalha hoje na empresa-alvo | F15, F16, F14, F05, F22 |
| P12 Perfil ativo em 90 dias | F15, F16, F36, F22, F08 |
| P13 No cargo há menos de 12 meses | F15, F16, F36, F14, F08 |
| P14 Publicou sobre pagamentos ou checkout | F15, F22, F30, F08, F36 |
| P15 Canal público de contato | F15, F28, F05, F22, F08 |

### Desqualificadores da pessoa

| Critério | Top 5 fontes |
|---|---|
| DP01 Trabalha em concorrente | F15, F16, F14, F36, F08 |
| DP02 Perfil desatualizado há mais de 24 meses | F15, F16, F36, F22, F08 |
| DP03 (!) Pediu para não ser contatado | Só F34 (lista de supressão interna). Não existe fonte pública, nem proxy |

### Leitura rápida
- **Receita Federal (F01 a F03, F38)** resolve 6 critérios de empresa (E02, E04, E05, E09, E11, E18) e ajuda em DE01, DE04 e P03. Comece pela base completa (F03) para montar a lista e as APIs (F02) para checar um CNPJ.
- **Site e checkout (F05 a F07, F10, F11)** resolvem cerca de 12 critérios de empresa (E01, E03, E12 a E17, E23, E24, E26). O Wappalyzer ou o BuiltWith automatiza a parte de tecnologia.
- **LinkedIn (F14 a F17)** carrega quase todos os critérios de pessoa, e é a fonte de maior risco de bloqueio.
- Os critérios (!) E06, E07, E10, DE06 e P08 a P10 não fecham sem a conversa de qualificação.

## Concorrentes

Os 3 maiores (informados): Asaas, Pagar.me, Cielo. Os 7 adicionados por mim (pagamentos e cobrança recorrente no Brasil): Iugu, Mercado Pago, Stone, PagSeguro (PagBank), Efí (ex-Gerencianet), Getnet, Rede.

Pesquisa feita em 07/10/2026 por busca web. O LinkedIn exige login, então nenhum post de maior engajamento foi verificado. Instagram e X não foram tentados.

| # | Concorrente | Página de clientes | Status | Post de maior engajamento |
|---|---|---|---|---|
| 1 | Asaas | https://blog.asaas.com/case/ (hub de cases no blog; casos: Tiflux, Multipedidos, OSTEC, Projuris, CEAB) | Só por busca, acesso direto deu 403. `asaas.com/clientes` leva ao login, não é página de clientes | Não verificado. Perfil: https://www.linkedin.com/company/asaasbrasil |
| 2 | Pagar.me | https://www.pagar.me/clientes | Verificada. Só faixa de logos (Usaflex, Leroy Merlin, Casa Vídeo, Polishop, Alipay), sem cases. O site diz que Pagar.me agora é Stone | Não verificado. O perfil oficial pode ser o da Stone |
| 3 | Cielo | https://blog.cielo.com.br/historias-de-clientes/ (cases: Lojas MM, Buzz Editora, Postos Tulio) | Verificada. Não há página de clientes no site institucional | Não verificado |
| 4 | Iugu | https://www.iugu.com/cases (Clinicorp, Ballroom, Suprijá by Suzano, Ingresso Prime, PEBMED) | Verificada. Melhor prova social do grupo, com métricas dos próprios cases. `/clientes` dá 404 | Não verificado |
| 5 | Mercado Pago | Não encontrada | Só um case isolado e antigo (Eros Espaço Psicoterapêutico), não confirmado. `empresas.mercadopago.com.br` deu 403 | Não verificado |
| 6 | Stone | Não encontrada | `stone.com.br/cases/` devolve a home, sem cases | Não verificado. Perfil: https://www.linkedin.com/company/stone-pagamentos/ |
| 7 | PagSeguro (PagBank) | Não encontrada | Home sem link para cases. Páginas por segmento em `especiais.pagbank.com.br` não foram abertas | Não verificado |
| 8 | Efí (ex-Gerencianet) | Não encontrada | `sejaefi.com.br/cases` deu 404. A home só tem "na mídia" | Não verificado |
| 9 | Getnet | Não encontrada | A home tem seção de depoimentos sem links, sem página de clientes | Não verificado |
| 10 | Rede (Itaú) | Não encontrada | `userede.com.br` deu 403 (bloqueio), nada foi visto | Não verificado |

Indício não confirmado: um snippet de busca sugeriu ~425 reações em um post da Asaas ("Asaas for Startups"). Tratar como dica, não como dado.

### Como fechar o que falta
- Posts: abrir a aba "Posts" de cada perfil no LinkedIn com a sua sessão logada e ordenar por reações. Dá para fazer pelo Claude in Chrome, se você autorizar.
- Páginas de clientes não encontradas (Mercado Pago, Stone, PagBank, Efí, Getnet, Rede): conferir no navegador, porque alguns sites bloqueiam leitura automática (403).
