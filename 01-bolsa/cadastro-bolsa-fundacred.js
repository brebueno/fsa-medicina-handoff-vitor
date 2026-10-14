// Funções do cadastro da LP do Breno. Dependências: brl (Intl.NumberFormat pt-BR BRL, maximumFractionDigits 0) e escapeHTML.
// Usar na etapa 3 (Confirmação) do /inscricao: bolsaCard(oferta) acima do resumo e fundacredBox('cadastro_confirmacao') abaixo.
const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  const FUNDACRED_URL = 'https://fundacred.org.br/frame-simulador?ie=1245';
  function fundacredBox(placement) {
    return `<div class="fundacred-box"><div><strong>Financie até 50% e pague depois de formado</strong><p>Simule um crédito educacional no Fundacred: você paga parte da mensalidade durante o curso e deixa até 50% para depois. Abre em nova aba, e seu cadastro continua salvo aqui. Sujeito à análise de crédito.</p></div><a class="fundacred-link" href="${FUNDACRED_URL}" target="_blank" rel="noopener noreferrer" data-fundacred="${placement}">Simular com o Fundacred <span aria-hidden="true">↗</span></a></div>`;
  }

  function bolsaCard(o) {
    const b = o && o.bolsa;
    if (!b) return '';
    return `<aside class="bolsa" aria-label="Bolsa FSA"><p class="bolsa-selo">Bolsa FSA para quem entra neste processo seletivo</p>`
      + `<h3><span class="bolsa-pct">${b.percentual}%</span> de bolsa <span class="bolsa-mais">+ ${b.pontualidadePercentual}%</span> pagando em dia</h3>`
      + `<div class="bolsa-precos"><div class="bolsa-de"><small>Mensalidade</small><s>${brl.format(b.valorCheio)}</s></div>`
      + `<div class="bolsa-por"><small>Pagando ${escapeHTML(b.pontualidadeTexto)}</small><strong>${brl.format(b.valorPontual)}<span>/mês</span></strong></div></div>`
      + `<ul class="bolsa-lista"><li>Com a bolsa de ${b.percentual}%: <strong>${brl.format(b.valorComBolsa)}</strong> por mês</li>`
      + `<li>Mais ${b.pontualidadePercentual}% pagando ${escapeHTML(b.pontualidadeTexto)}: <strong>${brl.format(b.valorPontual)}</strong> por mês (${b.descontoTotal}% de desconto no total)</li>`
      + `<li>Economia de <strong>${brl.format(b.economiaSemestre)}</strong> por semestre pagando em dia</li></ul>`
      + `<p class="bolsa-nota">A primeira parcela é paga sem desconto, conforme o edital. Os ${b.pontualidadePercentual}% de pontualidade valem para cada parcela paga ${escapeHTML(b.pontualidadeTexto)}.</p></aside>`;
  }

