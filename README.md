# OpenBox VR

Realidade Virtual acessível, aberta e 100% gratuita: guias, moldes de Google Cardboard, lentes alternativas e PCVR.

**Criador:** DhaaankMK · [GitHub](https://github.com/DhaaankMK) · [YouTube](https://www.youtube.com/@DhaaankMK)
**Licença do site:** DHAAANKMK PROPRIETARY LICENSE (DUMP-L) v1.0, ver `LICENSE.txt`.
Proibidas a remoção de créditos, a revenda e a reivindicação de autoria. Trabalhos derivados não são cobertos por esta licença.

## Estrutura

```
openbox-vr/
├── index.html               Página única (4 abas: Início, VRs, Construir, Guias)
├── LICENSE.txt              Licença DUMP-L
├── Info.txt                 Dados do criador
└── assets/
    ├── css/style.css        Estilos (tema dark/cyber, versões PC e celular)
    ├── js/config.js         Logo, lista de moldes em PDF e endereço dos assets
    ├── js/vrs-data.js       Base de dados da enciclopédia "VRs" (uma ficha por headset)
    ├── js/app.js            Abas, PC/celular, catálogo, simulador, calculadora, checklist, sons
    ├── img/logo.png         Logo do projeto (usada automaticamente quando existe)
    ├── img/logo.svg         Logo provisória (reserva) e ícone da aba
    ├── img/vrs/             Fotos dos headsets do catálogo
    ├── audio/               Sons de interface (clique, sucesso, erro, aviso)
    └── moldes/              PDFs dos moldes (Cardboard 1.0 e 2.0)
```

O `index.html` apenas carrega os arquivos de `assets/`. Não há dependências externas.

## Como testar localmente

Abra o `index.html` direto no navegador, ou, na pasta do projeto, execute `python3 -m http.server 8000` e acesse `http://localhost:8000`.

## Versões PC e celular

O site detecta o dispositivo automaticamente. O visitante pode trocar de versão no seletor do topo, e a escolha fica salva no navegador.

- **PC:** menu horizontal, índice lateral "Nesta aba", simulador controlado por mouse/teclado e tutorial que não exige o celular (as medidas vêm da calculadora).
- **Celular:** menu fixo na parte inferior, botões grandes e simulador que usa os sensores do aparelho.

## Como adicionar um VR ao catálogo

Abra `assets/js/vrs-data.js`, copie uma ficha existente, mude o `id` e preencha os campos. Regra do projeto: só escreva um dado se houver fonte; o que não foi confirmado fica `null` (aparece como "—") e cada ficha lista as fontes consultadas em `fontes` (somente `https://`). Preços e status mudam: confirme sempre.

## Como adicionar moldes

1. Coloque o PDF em `assets/moldes/` (por exemplo, `cardboard-classico.pdf`).
2. Em `assets/js/config.js`, preencha o campo `arquivo` do molde correspondente.

## Como publicar (assets na nuvem)

Mantenha a pasta inteira junta e envie-a para uma hospedagem estática gratuita (GitHub Pages, Cloudflare Pages ou Netlify). Nenhuma alteração de código é necessária.

Para hospedar os assets em outro endereço, defina `assetBase` em `assets/js/config.js` (somente `https://`) e inclua esse endereço na diretiva `img-src` da tag `Content-Security-Policy` do `index.html`. Para HTTPS, os sensores do celular exigem conexão segura.

## Segurança

- Content Security Policy restritiva (`script-src 'self'`, `style-src 'self'`, `media-src 'self'`), sem scripts ou estilos inline.
- Nenhum uso de `innerHTML` ou `eval`; textos dinâmicos entram por `textContent`.
- Caminhos de assets validados (somente relativos ou `https://`).
- Links externos com `rel="noopener noreferrer"`.

## Créditos

OpenBox VR · criado e mantido por **DhaaankMK**. A remoção destes créditos é vedada pela Cláusula 3.2 da DUMP-L.
