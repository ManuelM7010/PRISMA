import { ServiceItem, BenefitItem, FAQItem, Testimonial, ScenarioDataset, PricingPlan } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'conciliacion-cajas',
    title: 'Control de Facturación y Caja Diaria',
    description: 'Registra tus cobros diarios, ventas en efectivo y transferencias locales de forma ordenada para evitar cualquier descuadre de dinero al final de la jornada.',
    icon: 'TrendingUp',
    details: [
      'Cuadre automático entre caja física y POS o cuentas bancarias',
      'Registro rápido de cuentas por cobrar pendientes de clientes locales',
      'Desglose simple por método de pago (Efectivo, Chivo, Tarjetas, Remesas)',
      'Alertas inmediatas de diferencias sospechosas en caja diaria'
    ]
  },
  {
    id: 'reportes-ventas',
    title: 'Generador de Reportes para tu Contador',
    description: 'Sustituye cuadernos a mano y archivos borrosos por resúmenes mensuales limpios y estructurados que facilitarán las declaraciones de IVA y balances.',
    icon: 'FileText',
    details: [
      'Exportación rápida a formatos estándar de contabilidad',
      'Gráficos visuales sencillos del rendimiento del mes o trimestre',
      'Separación clara de gastos deducibles e ingresos brutos',
      'Historial de rendimiento limpio guardado en la nube'
    ]
  },
  {
    id: 'control-inventarios',
    title: 'Planillas de Inventario y Proveedores',
    description: 'Controla de manera intuitiva las entradas y salidas de producto de tus bodegas o sucursales para evitar quedarte sin stock en temporadas clave.',
    icon: 'BarChart3',
    details: [
      'Alertas de stock mínimo para reposición de mercadería',
      'Mapeo agrupado por categorías de productos y marcas',
      'Control simple de costos de adquisición de distribuidores',
      'Seguimiento a mermas o pérdidas de producto'
    ]
  },
  {
    id: 'flujo-caja',
    title: 'Previsión de Pagos e IVA Semanal',
    description: 'Anticipa tus obligaciones financieras recurrentes de fin de mes como alquileres, planillas, pago de IVA y facturas de distribuidores.',
    icon: 'Sheet',
    details: [
      'Proyección simple de saldo disponible según historial promedio',
      'Recordatorio de plazos de pago y compromisos pendientes',
      'Simulador de gastos imprevistos de operaciones o mantenimiento',
      'Sugerencias prácticas para evitar quedarte sin efectivo operativo'
    ]
  },
  {
    id: 'analisis-excel',
    title: 'Lector Automatizado de Planillas Excel',
    description: 'Sube las planillas desordenadas creadas por tus empleados o extraídas de tu POS y obtén de inmediato un resumen ordenado y limpio de prioridades.',
    icon: 'Gauge',
    details: [
      'Limpieza de registros duplicados o faltantes en segundos',
      'Clasificación automática de clientes que compran con mayor frecuencia',
      'Resumen de márgenes reales descontando costos variables',
      'Mapeo veloz sin requerir conocimientos de fórmulas complejas de Excel'
    ]
  },
  {
    id: 'asistente-cajachica',
    title: 'Asistente de Prespuestos y Caja Chica',
    description: 'Lleva el registro de cada compra de emergencia, papelería, combustible o viáticos para asegurar el control absoluto de tus recursos.',
    icon: 'Cpu',
    details: [
      'Registro ultra rápido e intuitivo optimizado para móviles',
      'Mapeo de fugas hormiga de presupuesto en reparaciones menores',
      'Asignación ágil de límites máximos de compra por sucursal',
      'Validación de facturas locales o tickets informales'
    ]
  }
];

export const BENEFITS: BenefitItem[] = [
  {
    id: 'time-saved',
    label: 'Ahorro de Tiempo de Cierre',
    value: 'Hasta 20h',
    metricLabel: 'Semanales recuperadas por dueño',
    description: 'Libérate del trabajo administrativo de ordenar facturas o calcular cuentas a mano al final de cada jornada diaria de operaciones.'
  },
  {
    id: 'errors-eliminated',
    label: 'Control de Descuadres',
    value: '95%',
    metricLabel: 'Menos errores en caja',
    description: 'Visualiza rápidamente dónde se pierde efectivo, qué sucursal tiene excesos de inventarios invisibles o cobros retrasados.'
  },
  {
    id: 'fast-decisions',
    label: 'Crecimiento de Ventas',
    value: 'Clara Visión',
    metricLabel: 'Productos más rentables',
    description: 'Sabe con precisión matemática qué mercadería genera margen real y cuál tiene estancado tu capital de trabajo en bodega.'
  },
  {
    id: 'accounting-peace',
    label: 'Tranquilidad con el Contador',
    value: '100% Listo',
    metricLabel: 'Reportes en segundos',
    description: 'Genera las tablas claras de ventas mensuales requeridas para el cierre e IVA, evitando multas y retrasos con el Ministerio de Hacienda.'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: '¿PRISMA se conecta directamente con ERPs avanzados como SAP, Holded o NetSuite?',
    answer: 'Actualmente, no contamos con conexiones directas automáticas con ERPs robustos o internacionales de forma directa. No obstante, nuestro sistema está optimizado para leer y ordenar cualquier archivo Excel, CSV, o planilla contable que exportes de tus bancos locales de El Salvador (Banco Agrícola, BAC Credomatic, Cuscatlán, Dávivienda, etc.) o de tu sistema POS local.'
  },
  {
    id: 'faq-2',
    question: 'Si soy una PYME pequeña en El Salvador, ¿cómo me ayuda la plataforma con un ejemplo?',
    answer: 'Imagina que tienes una distribuidora, tienda o farmacia con sucursales. Al final de la semana, subes tu planilla Excel con las ventas diarias desordenadas. PRISMA analiza los datos al instante, elimina duplicados, calcula qué sucursal es más rentable del mes, proyecta el efectivo disponible para el pago de tu IVA o planilla a fin de mes, y te sugiere las mejores decisiones basadas en tus números.'
  },
  {
    id: 'faq-3',
    question: '¿Cómo funciona la recomendación automática de soluciones recomendadas?',
    answer: 'En el panel interactivo, puedes describir de forma sencilla a qué se dedica tu negocio (ej. "Tengo una ferretería en San Miguel con 2 sucursales y manejo planillas a mano"). Nuestra IA analizará tus retos y te recomendará de forma personalizada qué soluciones, precios y planillas Excel necesitas implementar primero.'
  },
  {
    id: 'faq-4',
    question: '¿Qué seguridad tienen mis planillas financieras en esta plataforma?',
    answer: 'Tus planillas y datos son completamente privados. No compartimos tu información con terceros, ni los usamos para entrenar modelos públicos. Operamos con servidores seguros con cifrado de alto nivel para resguardar la confidencialidad de tu balance de negocios.'
  },
  {
    id: 'faq-5',
    question: '¿Se requiere tener un programador o experto en tecnología para usar PRISMA?',
    answer: 'Para nada. PRISMA está diseñada precisamente para el dueño de PYME que prefiere la simplicidad. Todas las pantallas están en español claro con explicaciones sencillas, sin tecnicismos complejos o códigos.'
  }
];

export const TESTIMONIALS: Testimonial[] = []; // Testimonials removed based on requirements

export const PRESET_SCENARIOS: ScenarioDataset[] = [
  {
    id: 'scen-saas',
    name: 'Distribuidora San Salvador S.L.',
    industry: 'Distribución y Comercialización Local',
    metrics: {
      mrr: '$24,500 (Ventas)',
      cac: '$180 (Prov)',
      churn: '2.4%',
      ltv: '$8,500',
      growthMoM: '+14.2% Ventas'
    },
    chartData: [
      { period: 'Ene', value: 15000, projection: 15000 },
      { period: 'Feb', value: 17200, projection: 17200 },
      { period: 'Mar', value: 19100, projection: 19100 },
      { period: 'Abr', value: 21500, projection: 21500 },
      { period: 'May', value: 24500, projection: 24500 },
      { period: 'Jun', value: 26000, projection: 28200 },
      { period: 'Jul', value: 28000, projection: 31000 },
      { period: 'Ago', value: 29500, projection: 33500 }
    ],
    rawDataSummary: `
      Distribuidora San Salvador S.L. - Reporte de Ventas Trimestral.
      Ventas Totales del Mes: $24,500
      Cuentas pendientes por cobrar de clientes habituales: $3,200
      Gastos operativos clave (Alquiler, sueldos, energía): $12,000
      Costo aproximado de mercadería comprada en aduana: $8,500
      Margen Bruto estimado: 35.4%
      Efectivo disponible en caja chica para emergencias: $850
      Problema detectado: Hay más de $3,200 de saldo atorado en crédito a clientes de más de 30 días, lo que pone bajo estrés la caja antes de pagar planillas la próxima semana.
    `
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basico',
    name: 'Plan Emprendedor',
    price: '$19',
    period: '/mes',
    description: 'Para pequeños comercios independientes que desean digitalizar su primer control de caja y ventas sin complicaciones.',
    features: [
      'Hasta 2 usuarios concurrentes de tu equipo',
      'Visualizador interactivo de ventas diarias',
      'Carga guiada de 1 planilla Excel de ejemplo al mes',
      'Alertas sencillas de descuadres de caja chica',
      'Soporte directo prioritario por WhatsApp en El Salvador',
      'Exportación segura de reportes para tu contador local'
    ],
    cta: 'Iniciar como Emprendedor',
    popular: false,
    tier: 'starter'
  },
  {
    id: 'crecimiento',
    name: 'Plan Crecimiento',
    price: '$44',
    period: '/mes',
    description: 'Para negocios en expansión con un local físico y ventas por canales digitales que necesitan proyecciones de caja claras.',
    features: [
      'Hasta 5 usuarios de tu personal',
      'Dashboard completo con alertas de inventario mínimo',
      'Análisis de hasta 4 planillas de ventas al mes',
      'Previsiones sencillas de cuotas de IVA a fin de mes',
      'Recomendador Inteligente de Soluciones para tu rubro',
      'Soporte prioritario 24/7 por chat y WhatsApp'
    ],
    cta: 'Impulsar mi Negocio',
    popular: true,
    tier: 'business'
  },
  {
    id: 'multisucursal',
    name: 'Plan Multi-Sucursal',
    price: '$79',
    period: '/mes',
    description: 'Para PYMES consolidadas que manejan múltiples sucursales, bodegas o equipos de distribución con alto inventario.',
    features: [
      'Usuarios de equipo ilimitados en el panel',
      'Control consolidado de hasta 4 sucursales o bodegas locales',
      'Cargas ilimitadas de planillas de ventas diarias y gastos',
      'Análisis predictivo de flujo de caja para planillas y aguinaldos',
      'Asesor de recomendaciones personalizado ilimitado',
      'Soporte prioritario premium en videollamada'
    ],
    cta: 'Consolidar Sucursales',
    popular: false,
    tier: 'business'
  },
  {
    id: 'acompaniado',
    name: 'Plan Premium Plus',
    price: '$129',
    period: '/mes',
    description: 'Para empresas familiares o comercios medianos que buscan soporte e implementación a la medida de sus planillas.',
    features: [
      'Usuarios del sistema ilimitados con perfiles diferentes',
      'Adaptación completa de tus planillas locales de Excel por nuestro equipo',
      'Sucursales y bodegas ilimitadas registradas',
      'Sesión semanal de 1 hora con un consultor de datos asignado',
      'Monitoreo exclusivo de cuentas por cobrar y alertas de riesgo',
      'Línea VIP telefónica de soporte directo inmediato'
    ],
    cta: 'Elegir Plan Premium Plus',
    popular: false,
    tier: 'business'
  }
];
