export interface WcImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface WcCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  image: WcImage | null;
  count: number;
}

export interface WcReview {
  id: number;
  reviewer: string;
  reviewer_email: string;
  review: string;
  rating: number;
  date_created: string;
}

export interface WcAttribute {
  id: number;
  name: string;
  options: string[];
}

export interface WcPost {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  featured_image: { src: string; alt: string } | null;
  categories: { id: number; name: string; slug: string }[];
  author: string;
}

export interface WcProduct {
  id: number;
  name: string;
  slug: string;
  type: 'simple' | 'variable';
  status: 'publish' | 'draft';
  featured: boolean;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  stock_quantity: number | null;
  images: WcImage[];
  categories: { id: number; name: string; slug: string }[];
  attributes: WcAttribute[];
  average_rating: string;
  rating_count: number;
  reviews?: WcReview[];
  related_ids: number[];
}

export const formatPrice = (priceStr: string) => {
  const price = parseFloat(priceStr);
  if (isNaN(price)) return priceStr;
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
};

export const mockCategories: WcCategory[] = [
  {
    id: 10,
    name: "Cuidado Facial",
    slug: "cuidado-facial",
    parent: 0,
    description: "Productos para el cuidado del rostro",
    image: { id: 101, src: "/images/product-serum.png", name: "cuidado-facial", alt: "Cuidado Facial" },
    count: 12
  },
  {
    id: 11,
    name: "Maquillaje",
    slug: "maquillaje",
    parent: 0,
    description: "Cosméticos de alta pigmentación",
    image: { id: 102, src: "/images/product-serum.png", name: "maquillaje", alt: "Maquillaje" },
    count: 8
  },
  {
    id: 12,
    name: "Herramientas",
    slug: "herramientas",
    parent: 0,
    description: "Herramientas profesionales de estética",
    image: { id: 103, src: "/images/product-tools.png", name: "herramientas", alt: "Herramientas" },
    count: 5
  }
];

export const mockProducts: WcProduct[] = [
  {
    id: 1,
    name: "Serum Renovador Nocturno",
    slug: "serum-renovador-nocturno",
    type: "simple",
    status: "publish",
    featured: true,
    description: "<p>Sérum facial de alta gama con ácido hialurónico y extractos botánicos para una piel radiante. Formulado para trabajar durante la noche mientras la piel se regenera naturalmente.</p>",
    short_description: "<p>Sérum facial de alta gama con ácido hialurónico.</p>",
    price: "2450.00",
    regular_price: "2450.00",
    sale_price: "",
    on_sale: false,
    stock_status: "instock",
    stock_quantity: 15,
    images: [
      { id: 201, src: "/images/product-serum.png", name: "serum", alt: "Serum Renovador" }
    ],
    categories: [{ id: 10, name: "Cuidado Facial", slug: "cuidado-facial" }],
    attributes: [
      { id: 1, name: "Volumen", options: ["30ml", "50ml"] }
    ],
    average_rating: "4.8",
    rating_count: 24,
    reviews: [
      {
        id: 301,
        reviewer: "María Gómez",
        reviewer_email: "maria@example.com",
        review: "Me encantó este serum, noto mi piel mucho más hidratada desde la primera semana de uso.",
        rating: 5,
        date_created: "2026-03-15T10:00:00Z"
      },
      {
        id: 302,
        reviewer: "Luciana F.",
        reviewer_email: "luciana@example.com",
        review: "Buen producto, aunque el aroma es un poco fuerte al principio.",
        rating: 4,
        date_created: "2026-04-02T14:30:00Z"
      }
    ],
    related_ids: [2, 3]
  },
  {
    id: 2,
    name: "Kit Profesional de Peinado",
    slug: "kit-profesional-peinado",
    type: "variable",
    status: "publish",
    featured: true,
    description: "<p>Secador y plancha de pelo de grado profesional con tecnología iónica y detalles en fucsia neón. Ideal para salones y uso personal avanzado.</p>",
    short_description: "<p>Secador y plancha de pelo con tecnología iónica.</p>",
    price: "12999.00",
    regular_price: "15999.00",
    sale_price: "12999.00",
    on_sale: true,
    stock_status: "instock",
    stock_quantity: 5,
    images: [
      { id: 202, src: "/images/product-tools.png", name: "kit-peinado", alt: "Kit Profesional" }
    ],
    categories: [{ id: 12, name: "Herramientas", slug: "herramientas" }],
    attributes: [
      { id: 2, name: "Color", options: ["Fucsia Neón", "Negro Mate"] }
    ],
    average_rating: "5.0",
    rating_count: 12,
    reviews: [
      {
        id: 303,
        reviewer: "Estética Glamour",
        reviewer_email: "glamour@example.com",
        review: "Lo usamos en el salón todos los días. Las clientas quedan fascinadas y el color fucsia neón es hermoso.",
        rating: 5,
        date_created: "2026-05-01T09:15:00Z"
      }
    ],
    related_ids: [1]
  },
  {
    id: 3,
    name: "Paleta de Sombras Neón",
    slug: "paleta-sombras-neon",
    type: "simple",
    status: "publish",
    featured: false,
    description: "<p>Paleta de sombras con alta pigmentación y colores vibrantes ideales para looks de vanguardia y maquillaje editorial.</p>",
    short_description: "<p>Paleta de sombras con alta pigmentación y colores vibrantes.</p>",
    price: "3200.00",
    regular_price: "3200.00",
    sale_price: "",
    on_sale: false,
    stock_status: "outofstock",
    stock_quantity: 0,
    images: [
      { id: 203, src: "/images/product-serum.png", name: "paleta", alt: "Paleta de sombras" }
    ],
    categories: [{ id: 11, name: "Maquillaje", slug: "maquillaje" }],
    attributes: [],
    average_rating: "4.2",
    rating_count: 8,
    reviews: [],
    related_ids: [1]
  }
];

const mockPosts: WcPost[] = [
  {
    id: 1001,
    title: "Tendencias de Maquillaje Neón para 2026",
    slug: "tendencias-maquillaje-neon-2026",
    date: "2026-05-10T10:00:00Z",
    excerpt: "Descubre cómo los tonos vibrantes están revolucionando las pasarelas y cómo puedes incorporarlos en tu look diario.",
    content: "<h2>El regreso del Neón</h2><p>Este año, el maquillaje profesional ha dado un giro audaz hacia los tonos vibrantes y eléctricos. Los delineados fucsia, las sombras verde neón y los labios de impacto se han convertido en la norma para quienes buscan destacar.</p><h3>¿Cómo aplicarlo sin exagerar?</h3><p>La clave está en el equilibrio. Si optas por un delineado neón, mantén el resto de tu rostro en tonos neutros o *nude*. En Juli Cosmética recomendamos nuestra <strong>Paleta de Sombras Neón</strong>, diseñada con alta pigmentación para lograr looks de revista con un solo trazo.</p>",
    featured_image: { src: "/images/hero-massive.png", alt: "Maquillaje Neón" },
    categories: [{ id: 101, name: "Tendencias", slug: "tendencias" }],
    author: "Juli Cosmética"
  },
  {
    id: 1002,
    title: "Guía Definitiva: Cómo usar un Serum Nocturno",
    slug: "guia-como-usar-serum-nocturno",
    date: "2026-04-25T14:30:00Z",
    excerpt: "Maximiza los beneficios de tu rutina de cuidado facial nocturna con estos sencillos pero efectivos pasos.",
    content: "<h2>La importancia de la noche</h2><p>Mientras duermes, tu piel entra en un proceso natural de regeneración celular. Aplicar los productos correctos antes de ir a la cama puede potenciar este proceso exponencialmente.</p><h3>Paso a paso</h3><ol><li><strong>Limpieza:</strong> Nunca apliques un serum sin antes haber limpiado tu rostro profundamente.</li><li><strong>Tónico:</strong> Prepara la piel para absorber mejor los nutrientes.</li><li><strong>El Serum:</strong> Aplica 3 a 4 gotas de nuestro <em>Serum Renovador Nocturno</em> en las palmas de tus manos, frótalas levemente para calentar el producto y presiónalas suavemente contra tu rostro y cuello.</li><li><strong>Crema selladora:</strong> Finaliza con una crema hidratante para \"sellar\" el serum.</li></ol>",
    featured_image: { src: "/images/product-serum.png", alt: "Serum Nocturno" },
    categories: [{ id: 102, name: "Cuidado de la Piel", slug: "cuidado-piel" }],
    author: "Dra. Belleza"
  },
  {
    id: 1003,
    title: "Anunciamos nuestros nuevos Cursos Profesionales",
    slug: "nuevos-cursos-profesionales-estetica",
    date: "2026-04-10T09:00:00Z",
    excerpt: "Lleva tu pasión al siguiente nivel con nuestras formaciones certificadas en estética avanzada.",
    content: "<h2>Fórmate con los mejores</h2><p>En Juli Cosmética no solo nos apasiona crear productos excepcionales, sino también compartir nuestro conocimiento. Es por eso que lanzamos nuestra nueva academia de estética.</p><p>Nuestros cursos están diseñados tanto para principiantes como para profesionales que buscan actualizar sus técnicas. ¡Las inscripciones ya están abiertas!</p>",
    featured_image: { src: "/images/product-tools.png", alt: "Cursos de Estética" },
    categories: [{ id: 103, name: "Novedades", slug: "novedades" }],
    author: "Equipo Juli"
  }
];

export async function getPosts(): Promise<WcPost[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPosts), 500);
  });
}

export async function getPostBySlug(slug: string): Promise<WcPost | undefined> {
  const posts = await getPosts();
  return posts.find(p => p.slug === slug);
}

export async function getProducts(): Promise<WcProduct[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProducts), 800);
  });
}

export async function getProductBySlug(slug: string): Promise<WcProduct | undefined> {
  const products = await getProducts();
  return products.find(p => p.slug === slug);
}

export async function getCategories(): Promise<WcCategory[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCategories), 500);
  });
}

// Keep Course interface so we don't break other parts of the app for now
export interface Course {
  id: string;
  title: string;
  slug: string;
  duration: string;
  level: string;
  description: string;
  price: string;
  imageUrl: string;
  modality: string;
  instructor: string;
  syllabus: string[];
}

export const mockCourses: Course[] = [
  {
    id: "course_1",
    title: "Masterclass de Maquillaje Social",
    slug: "maquillaje-social",
    duration: "4 semanas",
    level: "Principiante a Intermedio",
    description: "Aprende las técnicas fundamentales del maquillaje social y de novia con las últimas tendencias. Ideal para quienes buscan iniciar su carrera o perfeccionar sus habilidades para eventos.",
    price: "25000.00",
    imageUrl: "/images/product-serum.png", 
    modality: "Presencial (Cupos limitados)",
    instructor: "Julieta Romero",
    syllabus: [
      "Preparación de la piel y tipos de cutis",
      "Colorimetría aplicada al maquillaje",
      "Técnicas de contouring y strobing",
      "Maquillaje de ojos: ahumados, delineados y pestañas postizas",
      "Maquillaje para novias: duración y fijación",
      "Marketing básico para maquilladores"
    ]
  },
  {
    id: "course_2",
    title: "Lifting de Pestañas y Perfilado de Cejas",
    slug: "lifting-pestanas-cejas",
    duration: "2 semanas",
    level: "Principiante",
    description: "Domina las técnicas más demandadas en el mundo de la estética facial. Curso intensivo práctico.",
    price: "18000.00",
    imageUrl: "/images/product-tools.png", 
    modality: "Online (Clases en vivo)",
    instructor: "Mariana Silva",
    syllabus: [
      "Anatomía y ciclo de crecimiento del vello",
      "Química de los productos de lifting",
      "Paso a paso del lifting de pestañas",
      "Tinte de pestañas y nutrición",
      "Visagismo y diseño de cejas",
      "Técnica de perfilado con hilo y pinza"
    ]
  },
  {
    id: "course_3",
    title: "Colorimetría Avanzada Capilar",
    slug: "colorimetria-avanzada",
    duration: "6 semanas",
    level: "Avanzado",
    description: "Lleva tus habilidades de colorista al máximo nivel. Aprende a crear rubios perfectos, neutralizar tonos indeseados y dominar los colores fantasía.",
    price: "35000.00",
    imageUrl: "/images/hero-side.png", 
    modality: "Híbrido (Teoría online, práctica presencial)",
    instructor: "Carlos G.",
    syllabus: [
      "Estudio profundo de la estrella de color",
      "Fondos de decoloración y su correcta neutralización",
      "Técnicas de balayage y babylights",
      "Formulación exacta para correcciones de color",
      "Colores fantasía y pasteles",
      "Cuidado capilar post-coloración"
    ]
  }
];

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  return mockCourses.find(c => c.slug === slug);
}

export async function getCourses(): Promise<Course[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCourses), 600);
  });
}
