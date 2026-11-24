/**
 * Configuración editable para datos logísticos e integraciones de pago/WhatsApp.
 */
export const WORKSHOP_LOGISTICS = {
  fecha: '3, 4 y 5 de diciembre',
  horario: '6:00 p. m.',
  modalidad: 'Virtual',
  cupos: 'Solo 30 participantes',
  /** Cambia `cuposOcupados` (de 0 a 30) para actualizar la barra animada de cupos disponibles */
  cuposTotales: 30,
  cuposOcupados: 3,
  /** Número de WhatsApp organizador (+57 3102183451). */
  organizerWhatsappNumber: '573102183451',
  /** Si tienes un enlace externo de pasarela (Wompi, MercadoPago, PayU, Bold, Stripe), colócalo aquí. */
  externalPaymentUrl: '',
};

export interface ProblemPoint {
  number: string;
  title: string;
  detail: string;
}

export const PROBLEM_POINTS: ProblemPoint[] = [
  {
    number: '01',
    title: 'Tienes ideas, pero no sabes cómo convertirlas en videos',
    detail:
      'Te sientas frente a la cámara o con el celular en la mano, pero no sabes cómo empezar, qué decir ni cómo ordenar tus planos.',
  },
  {
    number: '02',
    title: 'Grabas contenido, pero no sabes cómo editarlo',
    detail:
      'Tienes decenas de clips guardados en la galería que nunca terminan publicados porque el editor te parece confuso.',
  },
  {
    number: '03',
    title: 'Tardas demasiado tiempo editando',
    detail:
      'Pasas horas moviendo cortes, ajustando textos o buscando música sin un flujo claro que te permita avanzar rápido.',
  },
  {
    number: '04',
    title: 'Publicas, pero sientes que tu contenido no comunica lo que quieres',
    detail:
      'El video sale al aire, pero le falta ritmo, claridad en el mensaje y esa intención visual que conecta con quien lo ve.',
  },
];

export interface ModuleItem {
  id: 'crea' | 'edita' | 'conecta';
  number: string;
  label: string;
  title: string;
  subtitle: string;
  topics: string[];
  outcome: string;
}

export const MODULES: ModuleItem[] = [
  {
    id: 'crea',
    number: 'Módulo 1',
    label: 'CREA',
    title: 'Planificación, intención y grabación con celular',
    subtitle: 'De la idea en borrador a tomas limpias y listas para editar',
    topics: [
      'Cómo encontrar ideas para crear contenido.',
      'Cómo planificar videos para redes sociales.',
      'Cómo estructurar un video con intención.',
      'Técnicas básicas para grabar con el celular.',
      'Encuadres, iluminación y composición.',
    ],
    outcome: 'Sales con criterio claro para grabar sin improvisar ni depender de equipos costosos.',
  },
  {
    id: 'edita',
    number: 'Módulo 2',
    label: 'EDITA',
    title: 'Ritmo visual, cortes y narrativa dinámica',
    subtitle: 'Domina la línea de tiempo con fluidez y sin bloqueos técnicos',
    topics: [
      'Introducción a la edición de video.',
      'Cómo organizar y seleccionar tus clips.',
      'Cortes y transiciones.',
      'Incorporación de textos, música y efectos.',
      'Ritmo visual y narrativa.',
      'Cómo lograr videos más dinámicos y atractivos.',
    ],
    outcome: 'Conviertes horas de prueba y error en un proceso ordenado, ágil y repetible.',
  },
  {
    id: 'conecta',
    number: 'Módulo 3',
    label: 'CONECTA',
    title: 'Storytelling, atención y adaptación a redes',
    subtitle: 'Haz que tus ideas se entiendan y generen vínculo real',
    topics: [
      'Cómo contar historias mediante videos.',
      'Cómo captar la atención desde los primeros segundos.',
      'Cómo transmitir un mensaje claro.',
      'Cómo crear contenido que genere conexión.',
      'Cómo adaptar tus videos a las redes sociales.',
    ],
    outcome: 'Publicas piezas verticales y digitales con un mensaje que representa tu marca.',
  },
];

export interface TargetProfile {
  number: string;
  title: string;
  description: string;
}

export const TARGET_PROFILES: TargetProfile[] = [
  {
    number: '01',
    title: 'Emprendedores que quieren mejorar sus redes sociales',
    description: 'Necesitan mostrar sus productos o servicios con videos claros que generen confianza.',
  },
  {
    number: '02',
    title: 'Personas que desean comenzar a crear contenido',
    description: 'Quieren dar el primer paso con una guía práctica y perder el miedo a grabar.',
  },
  {
    number: '03',
    title: 'Creadores que necesitan mejorar la calidad de sus videos',
    description: 'Ya publican, pero buscan mejor encuadre, iluminación, ritmo y acabado visual.',
  },
  {
    number: '04',
    title: 'Personas que tardan demasiado editando sus contenidos',
    description: 'Quieren aprender un flujo ágil para organizar clips, cortar y publicar sin desgaste.',
  },
  {
    number: '05',
    title: 'Marcas personales que quieren comunicar mejor sus ideas',
    description: 'Buscan traducir su conocimiento en mensajes directos, humanos y memorables.',
  },
  {
    number: '06',
    title: 'Personas sin experiencia previa en edición de video',
    description: 'Partimos desde las bases para que entiendas cada paso sin tecnicismos innecesarios.',
  },
];

export interface TimelineInteractiveClip {
  id: string;
  track: 1 | 2 | 3;
  label: string;
  startPct: number;
  widthPct: number;
  tone: 'coral' | 'graphite' | 'sand';
  timecode: string;
  stage: 'CREA' | 'EDITA' | 'CONECTA';
  reelTitle: string;
  reelCaption: string;
  lessonNote: string;
}

export const TIMELINE_PREVIEW_CLIPS: TimelineInteractiveClip[] = [
  {
    id: 'tl-idea',
    track: 1,
    label: 'Idea y guion',
    startPct: 0,
    widthPct: 28,
    tone: 'sand',
    timecode: '00:00:02:00',
    stage: 'CREA',
    reelTitle: '01 · Gancho e intención',
    reelCaption: 'Define en una frase qué problema resuelves en los primeros 3 segundos.',
    lessonNote: 'Planificas el objetivo del video antes de presionar grabar.',
  },
  {
    id: 'tl-rec',
    track: 1,
    label: 'Grabación móvil',
    startPct: 30,
    widthPct: 32,
    tone: 'graphite',
    timecode: '00:00:08:14',
    stage: 'CREA',
    reelTitle: '02 · Encuadre y luz',
    reelCaption: 'Aplica regla de tercios, limpia el lente y aprovecha luz natural lateral.',
    lessonNote: 'Grabas tomas estables y bien iluminadas directamente con tu celular.',
  },
  {
    id: 'tl-cut',
    track: 1,
    label: 'Cortes limpios',
    startPct: 64,
    widthPct: 36,
    tone: 'coral',
    timecode: '00:00:16:04',
    stage: 'EDITA',
    reelTitle: '03 · Selección y corte',
    reelCaption: 'Elimina pausas largas para mantener ritmo ágil sin perder naturalidad.',
    lessonNote: 'Organizas tus clips y ejecutas cortes precisos en minutos.',
  },
  {
    id: 'tl-text',
    track: 2,
    label: 'Textos en zona segura',
    startPct: 12,
    widthPct: 40,
    tone: 'coral',
    timecode: '00:00:11:10',
    stage: 'EDITA',
    reelTitle: '04 · Textos legibles',
    reelCaption: 'Destaca ideas clave respetando márgenes de Reels y TikTok.',
    lessonNote: 'Integras títulos y subtítulos que apoyan la lectura sin tapar la imagen.',
  },
  {
    id: 'tl-sfx',
    track: 2,
    label: 'Música y ritmo',
    startPct: 54,
    widthPct: 46,
    tone: 'sand',
    timecode: '00:00:21:08',
    stage: 'EDITA',
    reelTitle: '05 · Sonido y atmósfera',
    reelCaption: 'Equilibra música de fondo y efectos sutiles sin opacar tu voz.',
    lessonNote: 'Construyes ritmo visual y sonoro que sostiene la atención.',
  },
  {
    id: 'tl-story',
    track: 3,
    label: 'Mensaje y publicación vertical',
    startPct: 0,
    widthPct: 100,
    tone: 'graphite',
    timecode: '00:00:28:18',
    stage: 'CONECTA',
    reelTitle: '06 · Historia que conecta',
    reelCaption: 'Adapta formato 9:16 y cierra con una invitación clara para tu audiencia.',
    lessonNote: 'Comunicas tu idea con claridad y listas tu video para redes sociales.',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: '¿Necesito experiencia previa grabando o editando video?',
    answer:
      'No. El workshop está diseñado para que cualquier persona —incluso sin experiencia previa— pueda seguir el paso a paso desde cómo planificar una idea y grabar con su celular hasta editar y adaptar sus videos para redes sociales.',
  },
  {
    question: '¿Qué herramientas necesito tener para participar?',
    answer:
      'Tu celular con espacio disponible para grabar clips de práctica y la aplicación o programa de edición que prefieras utilizar. El enfoque del taller te permite aplicar los principios de ritmo, cortes y narrativa sin depender de equipos costosos.',
  },
  {
    question: '¿Qué voy a aprender exactamente durante el workshop?',
    answer:
      'Recorrerás tres módulos prácticos: CREA (ideas, planificación, guion con intención, encuadre e iluminación con celular), EDITA (selección de clips, cortes, transiciones, textos, música y ritmo visual) y CONECTA (storytelling, primeros segundos de atención, claridad del mensaje y adaptación a redes).',
  },
  {
    question: '¿Cómo funciona la inscripción y la promoción de Black Friday?',
    answer:
      'El workshop se realizará en modalidad virtual los días 3, 4 y 5 de diciembre a las 6:00 p. m. y cuenta con cupos limitados para solo 30 participantes. Del sábado 21 al sábado 28 de noviembre tienes tarifa especial de Black Friday por $100.000 COP (precio regular: $180.000 COP). Puedes registrarte directamente en esta página para generar tu reserva y recibir tu enlace de pago por WhatsApp.',
  },
];

export interface InstructorProfile {
  id: string;
  orderLabel: string;
  name: string;
  roles: string;
  age: string;
  experienceSummary: string;
  focusSummary: string;
  photoUrl: string;
  photoAlt: string;
  paragraphs: string[];
  objective: string;
  specializations: string[];
}

export const INSTRUCTORS: InstructorProfile[] = [
  {
    id: 'luis-infante',
    orderLabel: 'Profesor 01',
    name: 'LUIS INFANTE',
    roles: 'Productor Audiovisual | Diseñador Gráfico | Creador de Contenido Digital',
    age: '34 años',
    experienceSummary: '+10 años en diseño gráfico · +5 años en producción audiovisual',
    focusSummary: 'Videopodcasts, contenido para redes sociales y soluciones audiovisuales',
    photoUrl: '/assets/aistudio/Retrato_cinematogr_fico_en_tonos_oscuros_596efea1.png',
    photoAlt: 'Retrato profesional de Luis Infante, productor audiovisual y diseñador gráfico',
    paragraphs: [
      'Profesional creativo de 34 años, especializado en producción audiovisual, diseño gráfico y comunicación digital, con más de 10 años de experiencia en diseño gráfico y más de 5 años en producción y realización audiovisual.',
      'A lo largo de mi trayectoria he desarrollado habilidades en conceptualización, dirección creativa, producción y edición de contenidos visuales, combinando creatividad, criterio estético y conocimientos técnicos para transformar ideas en piezas de comunicación atractivas y efectivas.',
      'Mi trabajo se enfoca especialmente en la producción de videopodcasts, creación de contenido para redes sociales y desarrollo de soluciones audiovisuales para marcas, empresas y creadores de contenido.',
      'Cuento con experiencia en planificación y ejecución de proyectos audiovisuales, manejo de cámaras, iluminación, captura de audio, edición de video, diseño de identidad visual y desarrollo de piezas gráficas para medios digitales.',
      'Me caracterizo por ser una persona creativa, proactiva, versátil y orientada a resultados, con capacidad para adaptarme a diferentes estilos de comunicación, trabajar en equipo y asumir proyectos desde la conceptualización hasta la entrega final.',
    ],
    objective:
      'Desarrollar contenidos y experiencias visuales que comuniquen, conecten con las audiencias y aporten valor a las marcas, combinando estrategia, creatividad y tecnología.',
    specializations: [
      'Producción y realización audiovisual.',
      'Producción y edición de videopodcasts.',
      'Creación de contenido para redes sociales.',
      'Dirección y conceptualización creativa.',
      'Diseño gráfico y comunicación visual.',
      'Edición y postproducción de video.',
      'Fotografía y manejo de cámaras.',
      'Iluminación y producción de sets.',
      'Identidad visual y branding.',
      'Desarrollo de contenido digital para marcas y empresas.',
    ],
  },
];

