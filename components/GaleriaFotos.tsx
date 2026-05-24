import Image from 'next/image'

const fotos = [
  { src: '/images/hero-maquinas-frente.jpg',     alt: '3 máquinas SpeedQueen — Xô Varal Castelo',      span: 'md:col-span-2 md:row-span-2' },
  { src: '/images/ambiente-bistro.jpg',           alt: 'Área de bistrô com mesas e cadeiras',            span: '' },
  { src: '/images/fachada-externa.jpg',           alt: 'Fachada externa da Xô Varal Castelo',            span: '' },
  { src: '/images/ambiente-geral.jpg',            alt: 'Ambiente interno geral',                         span: '' },
  { src: '/images/ambiente-mesa-dobrar.jpg',      alt: 'Mesa de dobrar roupas',                          span: '' },
  { src: '/images/fachada-criancas.jpg',          alt: 'Espaço kids com crianças',                       span: 'md:col-span-2' },
]

export default function GaleriaFotos() {
  return (
    <section className="section-pad bg-xv-gray-50" id="galeria">
      <div className="container-xl">
        <div className="text-center mb-12">
          <div className="badge-cyan mb-5 inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-xv-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-xv-cyan" />
            </span>
            Conheça a loja
          </div>
          <h2 className="section-title text-xv-navy mb-4">
            Um ambiente feito{' '}
            <span className="amber-text">pra você</span>
          </h2>
          <p className="section-body mx-auto text-center">
            Moderno, climatizado e aconchegante. Venha lavar roupa num lugar onde dá prazer esperar.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[220px]">
          {fotos.map((foto) => (
            <div
              key={foto.src}
              className={`relative rounded-[2rem] overflow-hidden shadow-card group ${foto.span}`}
            >
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-xv-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-xs font-bold">{foto.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
