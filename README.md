# Xô Varal Castelo — Website

Site institucional da unidade Xô Varal Castelo — lavanderia self-service em Belo Horizonte/MG.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Supabase** (preparado para cadastros futuros)

## Estrutura

```
app/
├── page.tsx                   # Home
├── como-funciona/page.tsx     # Como funciona
├── clube-de-vantagens/page.tsx # Clube de Vantagens
├── parceiros/page.tsx         # Área de Parceiros
└── localizacao/page.tsx       # Localização

components/
├── Header.tsx
├── Footer.tsx
├── FloatingButtons.tsx        # WhatsApp + Como chegar fixos
├── Hero.tsx
├── HowItWorks.tsx
├── WhySection.tsx
├── Amenities.tsx
├── Pricing.tsx
├── ClubHighlight.tsx
├── Testimonials.tsx
├── PartnersTeaser.tsx
├── LocationBlock.tsx
├── FAQ.tsx
└── CTABanner.tsx

lib/
└── constants.ts               # Todos os dados do site
```

## Como rodar localmente

```bash
npm install
npm run dev
# Abra http://localhost:3000
```

## Deploy na Vercel

1. Faça push para o GitHub
2. Conecte o repositório na Vercel
3. Configure as variáveis de ambiente (veja `.env.example`)
4. Deploy automático a cada push na `main`

## Configurações pendentes

Substitua os placeholders nos arquivos:

### `app/layout.tsx`
- `G-XXXXXXXXXX` → seu ID do Google Analytics 4
- `XXXXXXXXXXXXXXXX` → seu Meta Pixel ID

### Supabase (quando pronto)
Configure `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` no `.env.local`

### Imagens
Adicione as imagens na pasta `public/images/`:
- `og-image.jpg` — imagem para compartilhamento (1200×630px)
- Fotos da fachada e interior

## Google Search Console
Adicione o arquivo de verificação na pasta `public/` quando solicitado pelo Search Console.

## SEO
O site já está configurado com:
- Metatítulos e metadescrições otimizados para cada página
- Schema.org `LocalBusiness` com dados completos
- Open Graph para compartilhamento social
- URLs amigáveis
- Foco em buscas locais: "lavanderia Castelo", "lavanderia self-service BH", etc.
