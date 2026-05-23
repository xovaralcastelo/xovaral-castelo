import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://buritis.xovaral.com.br'),
  title: {
    default: 'Xô Varal Buritis | Lavanderia Self-Service no Buritis — BH',
    template: '%s | Xô Varal Buritis',
  },
  description:
    'Lavanderia self-service moderna no Buritis, Belo Horizonte. Lave e seque suas roupas em até 1 hora com máquinas SpeedQueen profissionais. Funcionamos todos os dias das 6h às 23h.',
  keywords: [
    'lavanderia Buritis',
    'lavanderia self-service Buritis',
    'lavanderia automática Buritis',
    'lavar roupa Buritis',
    'secar roupa Buritis',
    'lavanderia perto de mim',
    'lavanderia autosserviço BH',
    'lavanderia para apartamento',
    'lavanderia para edredom',
    'lavanderia rápida Belo Horizonte',
    'Xô Varal Buritis',
    'lavanderia Belo Horizonte',
  ],
  authors: [{ name: 'Xô Varal Buritis' }],
  creator: 'Xô Varal Buritis',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://buritis.xovaral.com.br',
    title: 'Xô Varal Buritis | Lavanderia Self-Service no Buritis — BH',
    description:
      'Lave e seque suas roupas em até 1 hora no Buritis. Ambiente moderno, espaço kids, bistrô, Wi-Fi e Clube de Vantagens.',
    siteName: 'Xô Varal Buritis',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Xô Varal Buritis — Lavanderia Self-Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xô Varal Buritis | Lavanderia Self-Service',
    description: 'Lave e seque em até 1h no Buritis. Todos os dias das 6h às 23h.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://buritis.xovaral.com.br',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={nunito.variable}>
      <head>
        {/* Google Analytics 4 — substituir GA_ID pelo ID real (ex: G-XXXXXXXXXX) */}
        {process.env.NEXT_PUBLIC_GA_ID && process.env.NEXT_PUBLIC_GA_ID !== 'G-XXXXXXXXXX' && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
        {/* Meta Pixel — configurar NEXT_PUBLIC_META_PIXEL_ID no .env.local */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
        {/* Schema.org LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LaundryOrDryCleaning',
              name: 'Xô Varal Buritis',
              description:
                'Lavanderia self-service moderna no Buritis, Belo Horizonte. Máquinas SpeedQueen profissionais, espaço kids, bistrô e Wi-Fi.',
              url: 'https://buritis.xovaral.com.br',
              telephone: '+55-31-99332-8775',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Rua Maria Heilbuth Surette, 207',
                addressLocality: 'Belo Horizonte',
                addressRegion: 'MG',
                postalCode: '30575-100',
                addressCountry: 'BR',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -19.972,
                longitude: -43.964,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday','Tuesday','Wednesday','Thursday',
                    'Friday','Saturday','Sunday',
                  ],
                  opens: '06:00',
                  closes: '23:00',
                },
              ],
              priceRange: 'R$ 17–34',
              currenciesAccepted: 'BRL',
              paymentAccepted: 'Cash, Credit Card, Debit Card, Pix',
              image: 'https://buritis.xovaral.com.br/images/og-image.jpg',
            }),
          }}
        />
      </head>
      <body className="overflow-x-hidden">
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  )
}
