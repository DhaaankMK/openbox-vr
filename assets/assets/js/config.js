/*
 * OpenBox VR — Configuração dos assets
 * Criador: DhaaankMK | https://github.com/DhaaankMK | https://www.youtube.com/@DhaaankMK
 * Licença: DUMP-L v1.0 (ver LICENSE.txt). Proibida a remoção dos créditos (Cláusula 3.2).
 *
 * Este é o arquivo de configuração para trocar logo, moldes ou o endereço onde os assets estão hospedados.
 * Os dados da enciclopédia de VRs ficam em assets/js/vrs-data.js.
 */
window.OPENBOX_CONFIG = {
  /*
   * assetBase: prefixo aplicado a TODOS os caminhos de assets.
   *   ""                                  -> usa a pasta local (padrão)
   *   "https://meu-site.exemplo/openbox/" -> usa um servidor/CDN externo (apenas https)
   * Se usar um endereço externo, libere-o também no <meta http-equiv="Content-Security-Policy">
   * do index.html (diretivas img-src e media-src).
   */
  assetBase: "",

  /* Logo principal (caixa de papelão com headset brilhando). Se não existir, o SVG provisório é mantido. */
  logo: "assets/img/logo.png",

  /* Lista de moldes em PDF exibida na aba "Construir". Enquanto "arquivo" for null, aparece "EM BREVE". */
  moldes: [
    {
      titulo: "Molde Google Cardboard 1.0 (v1.2) — papel carta",
      descricao: "Template oficial do Google, 3 páginas, em inglês. Para celulares de até 5,7 pol. Usa botão por ímãs.",
      arquivo: "assets/moldes/cardboard-v1.pdf"
    },
    {
      titulo: "Molde Google Cardboard 2.0 — 5 páginas",
      descricao: "Template da comunidade (Instructables), em inglês. Para celulares de até 6 pol. Usa botão condutivo.",
      arquivo: "assets/moldes/cardboard-v2.pdf"
    }
  ]
};
