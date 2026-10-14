# Prompt para o Vitor: alinhar a LP de Medicina com a versão que está rodando em medicina-lp

Vitor, hoje rodamos Meta só na sua LP (`inscricaomedicina.fsantoantonio.com.br`). Ela é a mesma página que a minha (`medicina-lp.fsantoantonio.edu.br`), com três diferenças que estão custando conversão. Preciso que você alinhe as três. O código que uso está nesta pasta; foi copiado do que está publicado, então bate com o que você vê no ar.

Se for usar o Claude Code, cole este arquivo inteiro como prompt e deixe a pasta `handoff-vitor/` acessível.

## Regras gerais

- Altere só o que está descrito aqui. Não mexa em campos, validações, ordem das etapas, API de inscrição, edital, nem nos eventos de rastreamento que já existem.
- Os números de bolsa vêm da API, nunca digitados no HTML ou no JS da página.
- Desconto total é **24%** (20% e depois 5% sobre o valor com bolsa). Nunca escreva "25%".
- Não altere os textos jurídicos que estão nos trechos (primeira parcela sem desconto, aviso do Fundacred, "sujeito à análise de crédito").
- Mobile primeiro: 98% do tráfego é celular. Teste em 390 px, 768 px e 1440 px.

## Tarefa 1: Bolsa

**Situação:** seu HTML já tem a faixa `#bolsa` e o selo `[data-bolsa-chip]` no hero, e seu `landing.js` já faz `fetch('/api/oferta')` e preenche tudo. Eles ficam ocultos porque seu `/api/oferta` devolve `"bolsa": null`.

**Fazer:**
1. Fazer o `/api/oferta` devolver o objeto `bolsa` no formato de `01-bolsa/oferta-contrato.json`, calculado a partir da oferta (cadastre percentual da bolsa e da pontualidade na sua base e derive o resto):
   - `percentual` 20, `pontualidadePercentual` 5, `pontualidadeTexto` "até o 5º dia útil"
   - `valorCheio` 12500, `valorComBolsa` 10000, `valorPontual` 9500
   - `descontoTotal` 24, `economiaMensal` 3000, `economiaSemestre` 15000
   - Manter também `beneficios` e `condicoes` como no arquivo (a frase "A primeira parcela é paga sem desconto e sua quitação condiciona a matrícula" é obrigatória).
2. Na etapa 3 do `/inscricao` (Confirmação), mostrar o cartão de bolsa acima do resumo, usando `bolsaCard(oferta)` de `01-bolsa/cadastro-bolsa-fundacred.js` e o CSS de `01-bolsa/cadastro-bolsa-fundacred.css`. Se `bolsa` vier nulo, não renderiza nada.

**Resultado esperado:** a faixa "20% de bolsa + 5% pagando em dia, de R$ 12.500 por R$ 9.500", o selo no hero e o cartão na confirmação aparecem sozinhos quando a API devolve a bolsa.

## Tarefa 2: Financiamento (Fundacred)

**Situação:** sua página não tem a seção de financiamento, o link no hero, o item no FAQ nem o evento de clique.

**Fazer:**
1. HTML: aplicar `02-financiamento/index-financiamento.html` (3 trechos, com a posição de cada um nos comentários).
2. CSS: acrescentar `02-financiamento/landing-financiamento.css` ao fim do `landing.css`.
3. Rastreamento: aplicar `02-financiamento/funnel-financiamento.js` (inclui `'bolsa'` nas posições de CTA e o evento `MED_FUNDACRED_CLICK`).
4. Na etapa 3 do `/inscricao`, abaixo do resumo, mostrar `fundacredBox('cadastro_confirmacao')` (está em `01-bolsa/cadastro-bolsa-fundacred.js`).

O simulador abre em nova aba (`https://fundacred.org.br/frame-simulador?ie=1245`, com `target="_blank" rel="noopener noreferrer"`). O Fundacred não permite embutir.

## Tarefa 3: Alinhar o visual do /inscricao

**Situação:** a LP é escura (azul-marinho), mas o `/inscricao` muda para um layout azul-claro, com outro cabeçalho e outro título de aba. Para o candidato parece que trocou de site. Veja `03-visual/atual-inscricao-1.png` contra `03-visual/referencia-cadastro-1.png`.

**Fazer:** aplicar o visual do `03-visual/referencia-cadastro.html` (é o CSS e a estrutura que está no ar) ao seu `/inscricao`, mantendo o fluxo de 3 etapas e os campos do jeito que estão:
- Fundo azul-marinho `#0b192b`; texto e cabeçalho claros.
- Cabeçalho com o logo FSA monocromático (`assets/logo-fsa.png`) à esquerda e o link "← Voltar ao curso" à direita.
- Título da página em `Georgia, serif`, peso 400, `letter-spacing: -.035em`, `clamp(40px, 4.5vw, 68px)`, com a segunda linha em ciano.
- Formulário num cartão branco de cantos bem arredondados sobre o fundo escuro.
- Barra de progresso segmentada (uma barra de 4 px por etapa, a feita em `#087aab`, as demais `#e5eaf0`), no lugar dos círculos numerados.
- Botão principal dourado `#edab36`, texto escuro, foco visível (`outline: 3px solid #0789b9`).
- Variáveis: `--navy:#0b192b; --ink:#172c45; --blue:#087aab; --gold:#edab36; --line:#d4dce5; --muted:#536479; --surface:#f3f6fa`.
- `<title>`: "Inscrição · Medicina FSA".

## Como validar (envie junto no PR)

1. `curl -s https://inscricaomedicina.fsantoantonio.com.br/api/oferta` devolve `"bolsa": {"percentual":20, ...}`.
2. No celular a 390 px: faixa de bolsa e selo no hero visíveis, seção de financiamento com 3 passos, sem rolagem horizontal.
3. Clicar em "Simular meu financiamento" abre o Fundacred em nova aba e dispara `MED_FUNDACRED_CLICK` no `dataLayer`.
4. Clicar em "Quero minha bolsa" registra `placement: bolsa` (não `other`).
5. `/inscricao` nas 3 etapas com o visual escuro, sem mudar campos, validação ou envio. Testar uma inscrição de teste até o fim.
6. Console do navegador sem erro novo.
7. Prints antes e depois (390, 768, 1440) no PR.

## Entrega

Abra um PR no repositório da LP com as três tarefas em commits separados (`bolsa`, `financiamento`, `visual`) e os prints. Me avise antes de publicar em produção, porque a campanha está rodando e quero conferir primeiro.
