/*
 * OpenBox VR — Base de dados da enciclopédia "VRs"
 * Criador: DhaaankMK | https://github.com/DhaaankMK | https://www.youtube.com/@DhaaankMK
 * Licença: DUMP-L v1.0 (ver LICENSE.txt). Proibida a remoção dos créditos (Cláusula 3.2).
 *
 * COMO ADICIONAR UM VR: copie um bloco abaixo, mude o "id" (único, minúsculo, sem acentos) e preencha.
 * Regra do projeto: só escreva um dado se houver fonte; o que não for confirmado fica como null
 * (o site mostra "—"). Cada ficha deve listar as fontes consultadas em "fontes" (somente https://).
 * "foto" é um caminho dentro de assets/ (ou null).
 *
 * Preços e status mudam com o tempo: o site avisa o visitante para confirmar no site do fabricante.
 * Dados lidos em outubro de 2026.
 */
window.OPENBOX_VRS = [
  {
    id: "google-cardboard-v1",
    nome: "Google Cardboard (versão 1)",
    fabricante: "Google",
    categoria: "Celular",
    lancamento: "2014-06",
    status: "Descontinuado",
    plataforma: "Smartphone (precisa de bússola/magnetômetro para o botão)",
    graus_de_liberdade: "3DoF",
    tela: "A do próprio celular (até 5,7 pol. ou 140 mm)",
    campo_de_visao: null,
    taxa_de_atualizacao: null,
    rastreamento: "Sensores do celular; botão por ímãs lidos pela bússola",
    preco_lancamento: null,
    peso: null,
    resumo: "Visor de papelão apresentado no Google I/O 2014 que transforma um smartphone em um headset de VR básico, com lentes e um botão magnético.",
    destaques: [
      "Montagem em 12 passos (reduzida a 3 no modelo de 2015)",
      "Kits montados de terceiros custavam menos de US$ 5",
      "O visor oficial do Google parou de ser vendido em 3 mar 2021"
    ],
    foto: "assets/img/vrs/google-cardboardv1.jpg",
    foto_alt: "Visor Google Cardboard versão 1, feito de papelão",
    fontes: [
      "https://en.wikipedia.org/wiki/Google_Cardboard",
      "https://roadtovr.com/google-announces-new-larger-cardboard-vr-viewer-with-universal-input-button/"
    ]
  },
  {
    id: "google-cardboard-v2",
    nome: "Google Cardboard (versão 2)",
    fabricante: "Google",
    categoria: "Celular",
    lancamento: "2015-05",
    status: "Descontinuado",
    plataforma: "Smartphone (Android e iOS)",
    graus_de_liberdade: "3DoF",
    tela: "A do próprio celular (até 6 pol. ou 150 mm)",
    campo_de_visao: null,
    taxa_de_atualizacao: null,
    rastreamento: "Sensores do celular; botão condutivo que toca a tela",
    preco_lancamento: null,
    peso: null,
    resumo: "Segunda geração do visor de papelão, apresentada no Google I/O 2015: aceita telas maiores e troca o ímã por um botão que funciona em qualquer celular.",
    destaques: [
      "Montagem reduzida de 12 para 3 passos",
      "O botão condutivo libera a bússola para corrigir o desvio (drift)",
      "Foi entregue a todos os participantes do Google I/O 2015"
    ],
    foto: "assets/img/vrs/google-cardboardv2.jpg",
    foto_alt: "Visor Google Cardboard versão 2, feito de papelão",
    fontes: [
      "https://en.wikipedia.org/wiki/Google_Cardboard",
      "https://roadtovr.com/google-announces-new-larger-cardboard-vr-viewer-with-universal-input-button/",
      "https://support.google.com/cardboard/manufacturers/answer/6323398"
    ]
  },
  {
    id: "vr-box-2",
    nome: "VR Box 2.0",
    fabricante: "Genérico (vários fabricantes)",
    categoria: "Celular",
    lancamento: null,
    status: null,
    plataforma: "Smartphone",
    graus_de_liberdade: "3DoF",
    tela: "A do próprio celular (faixa de tamanho varia conforme o fabricante)",
    campo_de_visao: null,
    taxa_de_atualizacao: null,
    rastreamento: "Sensores do celular",
    preco_lancamento: null,
    peso: null,
    resumo: "Visor plástico genérico para smartphones, com tira de cabeça e lentes ajustáveis, vendido por muitas marcas com o mesmo nome. Não há ficha técnica oficial confirmada.",
    destaques: [
      "Muitos kits incluem um controle Bluetooth (como na foto)",
      "As especificações variam de uma marca para outra"
    ],
    foto: "assets/img/vrs/vrbox-2-0.jpg",
    foto_alt: "Visor genérico VR Box 2.0 com controle Bluetooth",
    fontes: []
  },
  {
    id: "playstation-vr",
    nome: "PlayStation VR (PS4)",
    fabricante: "Sony Interactive Entertainment",
    categoria: "Console",
    lancamento: "2016-10",
    status: null,
    plataforma: "PlayStation 4 (também usado no PlayStation 5)",
    graus_de_liberdade: null,
    tela: "OLED de 5,7 pol.; 960 × 1080 por olho",
    campo_de_visao: "≈ 100°",
    taxa_de_atualizacao: "90–120 Hz",
    rastreamento: "Posicional, por câmera (PlayStation Camera) e 9 LEDs no headset",
    preco_lancamento: "US$ 399 (só o headset; anúncio de 2016)",
    peso: "≈ 600 g",
    resumo: "Primeiro headset de VR para consoles de grande alcance, lançado em 13 out 2016 para o PlayStation 4.",
    destaques: [
      "5 milhões de unidades vendidas até 31 dez 2019",
      "Exige a PlayStation Camera para o rastreamento"
    ],
    foto: "assets/img/vrs/playstation-vr-ps4.jpg",
    foto_alt: "Headset PlayStation VR para PlayStation 4",
    fontes: [
      "https://wikiwand.com/en/PlayStation_VR",
      "https://www.tomshardware.com/news/sony-psvr-playstation-vr-399,31420.html"
    ]
  },
  {
    id: "oculus-quest-2",
    nome: "Meta Quest 2",
    fabricante: "Meta (marca Oculus no lançamento)",
    categoria: "Standalone",
    lancamento: "2020-10",
    status: "Descontinuado",
    plataforma: "Standalone (Android)",
    graus_de_liberdade: "6DoF",
    tela: "1832 × 1920 por olho; LCD",
    campo_de_visao: null,
    taxa_de_atualizacao: "72 Hz no lançamento; até 120 Hz depois",
    rastreamento: "Inside-out com 4 câmeras no headset; controles com acelerômetro e giroscópio",
    preco_lancamento: "US$ 299 (64 GB) · US$ 399 (256 GB)",
    peso: "503 g",
    resumo: "Headset autônomo que popularizou a VR doméstica, por funcionar sem PC, sem cabos e com preço baixo.",
    destaques: [
      "Chip Qualcomm Snapdragon XR2",
      "Descontinuado em 25 set 2024, com a chegada do Quest 3S (saiu do varejo desde julho de 2024)"
    ],
    foto: "assets/img/vrs/meta-quest-2.jpg",
    foto_alt: "Headset Meta Quest 2 com controles",
    fontes: ["https://en.wikipedia.org/wiki/Quest_2"]
  },
  {
    id: "meta-quest-3",
    nome: "Meta Quest 3",
    fabricante: "Meta",
    categoria: "Standalone",
    lancamento: "2023-10",
    status: "À venda",
    plataforma: "Standalone (Android / Meta Horizon OS)",
    graus_de_liberdade: "6DoF",
    tela: "2064 × 2208 por olho; LCD",
    campo_de_visao: null,
    taxa_de_atualizacao: "90–120 Hz",
    rastreamento: "Inside-out com câmeras monocromáticas/IR e sensor de profundidade; controles rastreados por IR",
    preco_lancamento: "US$ 499,99 (128 GB) · US$ 649,99 (512 GB)",
    peso: "515 g",
    resumo: "Headset autônomo com realidade mista por passthrough colorido, lançado em 10 out 2023.",
    destaques: [
      "Chip Qualcomm Snapdragon XR2 Gen 2; passthrough colorido por câmeras RGB de 4 MP",
      "Em 25 set 2024, o modelo de 128 GB saiu de linha (US$ 429,99 enquanto durou o estoque) e o de 512 GB caiu para US$ 499,99"
    ],
    foto: "assets/img/vrs/meta-quest-3.jpg",
    foto_alt: "Headset Meta Quest 3",
    fontes: ["https://en.wikipedia.org/wiki/Meta_Quest_3"]
  },
  {
    id: "meta-quest-3s",
    nome: "Meta Quest 3S",
    fabricante: "Meta",
    categoria: "Standalone",
    lancamento: "2024-10",
    status: "À venda",
    plataforma: "Standalone (Android / Meta Horizon OS)",
    graus_de_liberdade: "6DoF",
    tela: "1832 × 1920 por olho; LCD",
    campo_de_visao: "96° na horizontal",
    taxa_de_atualizacao: "90–120 Hz",
    rastreamento: "2 câmeras RGB de 4 MP e 4 câmeras IR; sem sensor de profundidade; controles Touch Plus",
    preco_lancamento: "US$ 299,99 (128 GB) · US$ 399,99 (256 GB)",
    peso: "514 g",
    resumo: "Versão de entrada da linha Quest 3, lançada em 15 out 2024, com lentes Fresnel e mesmo chip do Quest 3.",
    destaques: [
      "Chip Qualcomm Snapdragon XR2 Gen 2; lentes Fresnel (não pancake)",
      "Uma edição limitada Xbox foi anunciada em junho de 2025"
    ],
    foto: "assets/img/vrs/meta-quest-3s.jpg",
    foto_alt: "Headset Meta Quest 3S",
    fontes: ["https://en.wikipedia.org/wiki/Meta_Quest_3S"]
  },
  {
    id: "pico-4",
    nome: "Pico 4",
    fabricante: "Pico (ByteDance)",
    categoria: "Standalone",
    lancamento: "2022-10",
    status: null,
    plataforma: "Standalone (Android)",
    graus_de_liberdade: "6DoF",
    tela: "2160 × 2160 por olho; LCD",
    campo_de_visao: "≈ 105°",
    taxa_de_atualizacao: "Até 90 Hz (padrão de 72 Hz)",
    rastreamento: "Inside-out 6DoF por câmeras do próprio headset; rastreamento de mãos; controles com anéis infravermelhos",
    preco_lancamento: "€ 429 (128 GB) · € 499 (256 GB), preços de introdução",
    peso: "586 g",
    resumo: "Headset autônomo da Pico lançado em 18 out 2022, vendido na Europa e no Leste Asiático, mas não nos Estados Unidos.",
    destaques: [
      "Chip Qualcomm Snapdragon XR2",
      "O sucessor, Pico 4 Ultra, foi lançado em 2 set 2024 por € 549"
    ],
    foto: "assets/img/vrs/pico-4-vr.jpg",
    foto_alt: "Headset Pico 4",
    fontes: ["https://en.wikipedia.org/wiki/PICO_4"]
  },
  {
    id: "playstation-vr2",
    nome: "PlayStation VR2 (PS5)",
    fabricante: "Sony Interactive Entertainment",
    categoria: "Console",
    lancamento: "2023-02",
    status: null,
    plataforma: "PlayStation 5; PC (com adaptador, desde 7 ago 2024)",
    graus_de_liberdade: "6DoF",
    tela: "OLED com HDR; 2000 × 2040 por olho",
    campo_de_visao: "≈ 110°",
    taxa_de_atualizacao: "90 Hz ou 120 Hz",
    rastreamento: "4 câmeras externas rastreiam headset e controles; 2 câmeras IR internas rastreiam os olhos",
    preco_lancamento: "US$ 549,99 · € 599,99 · £ 529,99",
    peso: "≈ 560 g",
    resumo: "Segunda geração de VR da Sony, lançada em 22 fev 2023, com rastreamento dos olhos, renderização foveada e vibração no headset.",
    destaques: [
      "Controles Sense com detecção de toque dos dedos e cabo único USB-C",
      "Relatos não oficiais dizem que a Sony pausou a fabricação em março de 2024, após mais de 2 milhões de unidades"
    ],
    foto: "assets/img/vrs/playstation-vr2-ps5.jpg",
    foto_alt: "Headset PlayStation VR2",
    fontes: ["https://en.wikipedia.org/wiki/PlayStation_VR2"]
  },
  {
    id: "apple-vision-pro",
    nome: "Apple Vision Pro",
    fabricante: "Apple",
    categoria: "Realidade mista",
    lancamento: "2024-02",
    status: "À venda",
    plataforma: "visionOS",
    graus_de_liberdade: "6DoF",
    tela: "Micro-OLED de 1,41 pol.; 3660 × 3200 por olho (23 milhões de pixels no total)",
    campo_de_visao: null,
    taxa_de_atualizacao: "90 Hz (M2; ajusta a 96 ou 100 Hz) · até 120 Hz (M5)",
    rastreamento: "Controle por olhos, gestos das mãos e voz; autenticação por íris (Optic ID)",
    preco_lancamento: "A partir de US$ 3.499 (256 GB)",
    peso: "600–650 g (M2) · 750–800 g (M5), sem a bateria de 353 g",
    resumo: "Computador espacial de realidade mista da Apple, lançado nos EUA em 2 fev 2024, sem controles físicos obrigatórios.",
    destaques: [
      "Chips M2 e R1; versão com chip M5 anunciada em 15 out 2025 pelo mesmo preço inicial",
      "Chegou a outros países ao longo de 2024 (Japão, China e Singapura em junho; Reino Unido e outros em julho)"
    ],
    foto: "assets/img/vrs/apple-vision-pro.jpg",
    foto_alt: "Headset Apple Vision Pro",
    fontes: ["https://www.wikiwand.com/en/Apple_Vision_Pro"]
  }
];
