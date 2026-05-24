import Image from 'next/image'

const fotos = [
  {
    src: '/images/hero-maquinas-frente.jpg',
    alt: 'Máquinas SpeedQueen — 3 lavadoras e 3 secadoras',
    span: 'md:col-span-2',
  },
  {
    src: '/images/ambiente-bistro.jpg',
    alt: 'Área de bistrô com mesas e cadeiras',
    span: '',
  },
  {
    src: '/images/fachada-externa.jpg',
    alt: 'Fachada externa da Xô Varal Castelo',
    span: '',
  },
  {
    src: '/images/ambiente-mesa-dobrar.jpg',
    alt: 'Mesa de dobrar roupas e ambiente interno',
    span: '',
  },
  {
    src: '/images/fachada-criancas.jpg',
    alt: 'Crianças na frente da loja',
    span: '',
  },
]

export default function GaleriaFotos() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge bg-orange/10 text-orange mb-4">
            <span className="w-1.5 h-1.5 bg-orange rounded-full" />
            Conheça a loja
          </span>
          <h2 className="section-title text-primary mb-4">
            Um ambiente feito pra você
          </h2>
          <p className="section-subtitle mx-auto text-center text-gray-500">
            Moderno, climatizado e aconchegante. Venha lavar roupa num lugar onde dá prazer esperar.
          </p>
        </div>

        {/* Grade de fotos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {fotos.map((foto) => (
            <div
              key={foto.src}
              className={`relative rounded-3xl overflow-hidden shadow-card group ${foto.span} h-64 md:h-72`}
            >
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
