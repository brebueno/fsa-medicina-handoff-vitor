// Dois ajustes no funnel.js (rastreamento). Nada mais muda nos eventos existentes.

// 1) Incluir 'bolsa' na lista de posições de CTA aceitas (linha 18). Sem isso o botão "Quero minha bolsa" é registrado como 'other'.
const PLACEMENTS = new Set(['header', 'hero', 'admission', 'closing', 'mobile_fixed', 'como_ingressar', 'video', 'bolsa']);

// 2) Evento do clique no simulador do Fundacred. Colar junto aos outros listeners de click, dentro da IIFE do funnel.js.
//    Usa a função track() que já existe no arquivo. O simulador abre em nova aba (o Fundacred não permite embutir).
document.addEventListener('click', event => {
  const link = event.target instanceof Element ? event.target.closest('a[data-fundacred]') : null;
  if (link) track('MED_FUNDACRED_CLICK', { placement: String(link.dataset.fundacred).slice(0, 30) });
});
