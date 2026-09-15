# Barbearia Imperial — Landing Page

Landing page estática (HTML + CSS + JS puro, sem build, sem backend, sem banco de dados)
feita para converter visitantes em agendamentos pelo WhatsApp.

## Estrutura do projeto

```
barbearia-imperial/
├── index.html    → toda a estrutura e o conteúdo da página
├── style.css     → todo o estilo visual
├── main.js       → configurações (WhatsApp, Instagram, endereço) e interações
└── README.md
```

Todos os arquivos ficam juntos, na raiz do projeto — não há subpastas.

## 1. Antes de publicar: edite os dados reais

Abra o arquivo **`main.js`** e edite apenas o bloco `CONFIG` no topo do arquivo:

```js
const CONFIG = {
  whatsappNumber: "5547999999999",   // seu número, só números, com 55 + DDD
  whatsappMessage: "Olá! Vim pelo site e quero agendar um horário na Barbearia Imperial.",
  instagramUrl: "https://instagram.com/barbeariaimperial",
  address: "Av. das Palmeiras, 482, Centro, Balneário Camboriú - SC",
};
```

- **whatsappNumber**: todos os botões de WhatsApp da página (topo, hero, cada serviço,
  CTA final, rodapé e o botão flutuante no celular) usam esse único número — troque em
  um lugar só e atualiza a página inteira.
- **address**: é usado tanto no mapa incorporado quanto no botão "Abrir no Google Maps".
  Pode ser um endereço em texto (como está) ou um link de coordenadas.

Outros textos (endereço e horário exibidos na seção "Onde estamos" e no rodapé, preços,
depoimentos) estão escritos diretamente no `index.html` — edite com Ctrl+F pelo texto
que quiser trocar.

### Fotos da galeria

A seção "Galeria" está com blocos ilustrados (sem fotos reais), para o projeto funcionar
sem depender de imagens externas. Para usar fotos reais da barbearia:

1. Coloque os arquivos de imagem em uma pasta `assets/` (crie-a dentro do projeto).
2. No `index.html`, dentro de `<section id="galeria">`, troque cada `<figure class="gallery__item">`
   por uma versão com `<img src="assets/sua-foto.jpg" alt="Descrição da foto">` no lugar do ícone SVG.

## 2. Rodar localmente

Não é obrigatório instalar nada — como é um site estático, você pode simplesmente
abrir o `index.html` duas vezes no navegador. Mas para o carregamento de fontes e
do mapa funcionar de forma mais parecida com produção, rode um servidor local simples:

**Opção A — com Python (já vem instalado na maioria dos computadores):**
```bash
cd barbearia-imperial
python3 -m http.server 3000
```
Depois abra **http://localhost:3000** no navegador.

**Opção B — com Node.js:**
```bash
cd barbearia-imperial
npx serve .
```

## 3. Publicar na Vercel

### Opção A — pelo site da Vercel (sem usar terminal)

1. Crie uma conta gratuita em [vercel.com](https://vercel.com).
2. Suba a pasta `barbearia-imperial` para um repositório no GitHub (ou GitLab/Bitbucket).
3. Na Vercel, clique em **Add New → Project** e selecione esse repositório.
4. Em **Framework Preset**, deixe como **Other** (é um site estático, não precisa de build).
5. Clique em **Deploy**. Em cerca de 1 minuto o site estará no ar com uma URL `.vercel.app`.

### Opção B — pela CLI da Vercel (mais rápido)

```bash
npm install -g vercel
cd barbearia-imperial
vercel
```
Siga as perguntas no terminal (aceite as opções padrão). Ao final, a Vercel entrega uma
URL de produção. Para atualizar o site depois de uma alteração, rode `vercel --prod`
novamente dentro da pasta.

Não é necessário nenhum arquivo de configuração (`vercel.json`) — a Vercel detecta
automaticamente que é um projeto estático e publica o `index.html` como página inicial.

## 4. Domínio próprio (opcional)

No painel do projeto na Vercel, vá em **Settings → Domains** e adicione seu domínio
(ex.: `barbeariaimperial.com.br`). A Vercel mostra os registros de DNS que você precisa
apontar no seu provedor de domínio.

## Observações técnicas

- Sem frameworks, sem dependências de build — carregamento rápido.
- Totalmente responsivo (celular, tablet e desktop).
- SEO básico incluído: `title`, `meta description`, `meta keywords`, tags Open Graph e
  `lang="pt-BR"`. Para melhorar ainda mais, adicione uma imagem real em
  `assets/og-image.jpg` e ajuste a tag `og:image` no `<head>` do `index.html`.
- O mapa usa o embed público do Google Maps (`google.com/maps?...&output=embed`), que
  **não exige chave de API** — funciona direto a partir do endereço configurado.
- Testado com foco em acessibilidade: navegação por teclado com foco visível, textos
  alternativos em ícones decorativos ocultos, e respeito a `prefers-reduced-motion`
  para quem desativa animações no sistema.
