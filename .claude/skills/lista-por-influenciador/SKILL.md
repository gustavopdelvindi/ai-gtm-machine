---
name: lista-por-influenciador
description: Monta uma lista de leads a partir da audiência de influenciadores da sua área no LinkedIn. Acha 5 influenciadores ativos, pega os posts com mais comentários de cada um, raspa comentários e reações na Apify, aplica os filtros de filtros.md e junta o resultado com outras listas. Gatilhos - "lista por influenciador", "leads de quem comenta nos posts de", "audiência de influenciadores", "quem engaja com influenciadores da minha área", "raspar comentários do LinkedIn".
---

# Lista por influenciador

Entrada: a área do aluno (ICP) e o arquivo `filtros.md` da campanha. Saída: `lista-influenciador.csv` com as pessoas que engajaram e passaram no filtro, mais a junção com outras listas.

Regras do repo valem aqui: o aluno confirma cada passo antes do seguinte; raspagem respeita o limite pedido (o Apify cobra por item); CSVs e `signals/` ficam fora do git (dados de pessoas); nunca digitar tokens ou chaves, nem pedir que sejam coladas no chat.

Pasta de trabalho: `campaigns/<publico>/signals/`.

## Pré-requisitos

- `filtros.md` e `icp.md` da campanha.
- Apify pela CLI logada. Instalar com `npm install -g apify-cli` e rodar `apify login`, escolhendo o login pelo navegador. Se o app não achar o comando `apify`, usar o caminho completo (no Windows, `<pasta global do npm>\apify.cmd`; descobrir com `npm prefix -g`). Se o login pelo navegador travar, usar "Enter API token manually" e colar o token só no terminal. Conferir com `apify info`.
- Se a empresa do aluno bloqueia o Apify, pare e peça confirmação de que o uso está liberado. Não contornar o bloqueio.

## Os 4 passos (confirmar cada um com o aluno)

### 1. Achar 5 influenciadores ativos
- Buscar na web (WebSearch) por vozes do tema no LinkedIn e preencher `signals/influenciadores.md`: nome, empresa e foco, URL do perfil, evidência. A busca não abre o LinkedIn, então "ativo" só se confirma no passo 2.
- Marcar quem pode ser concorrente (desqualificador DE04). A audiência de concorrente tende a ser funcionário de concorrente.
- O aluno pode trocar nomes. Esperar a lista final dele antes de seguir.

### 2. Os 3 posts com mais comentários de cada um
- Ator: `harvestapi/linkedin-company-posts` (aceita perfis de pessoa e páginas de empresa, sem cookies). Preço: cerca de US$ 0,002 por post.
- Input: `targetUrls` (os 5 perfis), `maxPosts` 20, `includeReposts` false, `includeQuotePosts` true, `scrapeReactions` false, `scrapeComments` false.
- Ordenar por `engagement.comments` e ficar com 3 por pessoa. Salvar em `signals/posts-influenciadores.md`.
- Medir atividade pela janela de datas dos 20 posts. Quem tem 20 posts em 4 ou 5 anos não é ativo: propor trocar ou rodar só nos ativos.

### 3. Comentários e curtidas dos posts
- Atores (harvestapi, sem cookies): `harvestapi/linkedin-post-comments` e `harvestapi/linkedin-post-reactions`. Preço: US$ 0,002 por item.
- Input dos dois: `posts` (URLs dos posts do passo 2), `maxItems` 20 por post, `profileScraperMode` "short" (o modo "main" cobra US$ 0,002 por perfil).
- Mostrar o input e o custo máximo antes de rodar. Exemplo: 9 posts x 20 itens x 2 atores = no máximo cerca de US$ 0,72.
- Salvar em `signals/engajamento.csv`: `origem` (influenciador), `tipo` (comentario ou reacao), `post_url`, `nome`, `cargo`, `linkedin_url`, `linkedin_identifier`, `texto_comentario`, `tipo_reacao`, `data`.
- Ao mostrar ao aluno, listar as pessoas com o texto do comentário, por influenciador.

### 4. Filtro e lista final
- Aplicar a pessoa só o que os dados permitem: P01 a P05 (cargo e senioridade por palavra-chave), DP01 (trabalha em concorrente, por palavra-chave no cargo). P11 a P15, DP02 e DP03 não dá para checar e ficam como "não verificado".
- Regra usada: passa quem não é DP01 e (é C-level, sócio ou fundador, OU é gestão com termo de pagamentos, financeiro ou e-commerce). A empresa da pessoa não é verificada, então o aluno deve saber que qualquer CEO passa.
- Páginas de empresa que comentaram (cargo do tipo "N followers") entram como empresa, não como pessoa.
- Salvar `signals/lista-influenciador.csv` com `origem`, `tipo`, `nome`, `cargo`, `linkedin_url`, `linkedin_identifier`, `site`, `motivo`. Mostrar quantas pessoas únicas entraram, quantas sobraram e o percentual.

## Junção com outras listas (opcional)

Juntar `bruto.csv` (CNPJs), `clientes-concorrente.csv` e `lista-influenciador.csv` em `lista-bruta.csv`, deduplicando por `linkedin_identifier` ou `site`. Aplicar os critérios verificáveis de `filtros.md` e salvar em `lista-refinada.csv`, com `origem` e `motivo`. O script de apoio está em `scripts/filtrar-e-juntar.js`. Rodar com `node scripts/filtrar-e-juntar.js <pasta com comments.json e reactions.json> <pasta signals>`.

Critérios verificáveis hoje: para empresa com CNPJ, E04 (ativa), E05 (não é MEI), E09, E11 (UF) e E18 (12 meses ou mais). O resto depende de site, checkout e tráfego, e fica "não verificado".

## Armadilhas aprendidas

- "Passa" significa "não foi reprovado nos critérios verificáveis". Dizer isso ao aluno, com a contagem de quantos ficaram "não verificado".
- O `linkedin_identifier` vem em formatos diferentes em comentário (nome de usuário) e em reação (código ACo...). Deduplicar pessoas por nome mais o início do cargo, não só pelo identificador.
- "Product Owner" casa com "owner" na regra de sócio. Excluir.
- `bruto.csv` e `clientes-concorrente.csv` não têm `linkedin_identifier` nem `site`. Sem chave, a deduplicação entre fontes é zero. Resolver o `site` dos clientes de concorrentes é um passo à parte.
- Clientes de concorrente: páginas de cases mostram nomes, quase nunca o site. Nunca inventar domínio.
- O WebFetch resume a página com um modelo pequeno e é inconsistente. Para listas de clientes, preferir Firecrawl (MCP, login por OAuth, ativo só em sessão nova) ou um ator de leitura de sites.
- Atores do Apify mudam. Antes de rodar, buscar na Store (`https://api.apify.com/v2/store?search=...&sortBy=popularity`), ler preço e input schema, e confirmar com o aluno.
- Concorrentes do aluno que aparecem entre os influenciadores contaminam a audiência. Avisar logo no passo 1.

## Formato da resposta

Tabelas enxutas por passo, com contagens. Sem travessão. Parar em cada passo e perguntar só o que bloqueia.
