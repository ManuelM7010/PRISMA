import { ServiceItem, BenefitItem, FAQItem, ScenarioDataset } from './types';

export const SLOGANS = [
  "Convertimos el caos de tus planillas en claridad para tu negocio.",
  "La perspectiva que necesitas para tomar el control de tus ventas.",
  "De tablas confusas de Excel a decisiones inteligentes e inmediatas.",
  "Miramos a través de tus datos para revelar el futuro de tu empresa.",
  "Visualiza tus ingresos, controla tus gastos, expande tus márgenes.",
  "Claridad empresarial diseñada para dueños, no para programadores.",
  "Transformamos reportes manuales en tu mejor aliado de crecimiento.",
  "Tus ventas, inventario y caja chica bajo control en un solo lugar.",
  "El prisma que descompone lo complejo en respuestas sencillas.",
  "Menos hojas de cálculo interminables. Más control real de tu PYME.",
  "Haz que tus números trabajen para ti, no en contra de tu tiempo.",
  "Toma decisiones con la seguridad de quien conoce sus números reales.",
  "Control financiero ágil y transparente para la empresa del mañana.",
  "Una sola pantalla para entender el pulso y la salud de tu negocio.",
  "Simplificamos tu información para que te concentres en vender."
];

export interface PrismaSolution {
  id: string;
  name: string;
  description: string;
  setupPrice: string;
  monthlyPrice: string;
  icon: string;
  target: string;
  benefits: string[];
  examples: string[];
}

export const SOLUTIONS: PrismaSolution[] = [
  {
    id: 'dashboard-financiero',
    name: 'Dashboard Financiero',
    description: 'Control absoluto de tus ingresos, gastos fijos, flujo de caja semanal y previsión automatizada de egresos imprevistos.',
    setupPrice: '$150',
    monthlyPrice: '$20',
    icon: 'DollarSign',
    target: 'Finanzas, Caja y Bancos',
    benefits: [
      'Visualiza tu saldo real consolidado en tiempo real',
      'Alertas tempranas de riesgo de liquidez para planillas o IVA',
      'Categorización automática de egresos y gastos hormiga'
    ],
    examples: ['Flujo de caja proyectado', 'Balance mensual simplificado']
  },
  {
    id: 'dashboard-comercial',
    name: 'Dashboard Comercial',
    description: 'Analiza el movimiento de tus ventas diarias, comportamiento de clientes frecuentes y rentabilidad neta por línea de producto.',
    setupPrice: '$150',
    monthlyPrice: '$20',
    icon: 'TrendingUp',
    target: 'Ventas y Clientes',
    benefits: [
      'Identifica al instante tus productos estrella y los más rezagados',
      'Control correlativo de facturación y cobros de sucursales',
      'Márgenes de ganancia calculados de forma automática'
    ],
    examples: ['Ranking de productos más vendidos', 'Evolución de ventas diarias']
  },
  {
    id: 'dashboard-ejecutivo',
    name: 'Dashboard Ejecutivo',
    description: 'La vista panorámica perfecta para directores. Consolida múltiples fuentes, sucursales y KPIs clave en una sola pantalla.',
    setupPrice: '$200',
    monthlyPrice: '$25',
    icon: 'Layers',
    target: 'Dirección General y Socios',
    benefits: [
      'Consolidación ágil sin requerir llamadas o auditar Excel uno a uno',
      'Estado general de salud financiera del consorcio',
      'Metas mensuales con barra de progreso interactiva'
    ],
    examples: ['Panel de KPIs globales', 'Comparativa inter-sucursal']
  },
  {
    id: 'dashboard-restaurantes',
    name: 'Dashboard de Restaurantes',
    description: 'Optimizado para alimentos y bebidas. Cruza cuentas de POS local con envíos a domicilio (WhatsApp, Hugo, PedidosYa) y controla la merma.',
    setupPrice: '$150',
    monthlyPrice: '$20',
    icon: 'Utensils',
    target: 'Pupuserías, Cafés, Restaurantes',
    benefits: [
      'Cuadre de caja diario contrastando POS, efectivo e IVA',
      'Costeo de platillos dinámico vs precio de venta',
      'Seguimiento al rendimiento por turno y meseros'
    ],
    examples: ['Venta por canal (Mesa vs Delivery)', 'Control diario de caja chica']
  }
];

export const BENEFITS: BenefitItem[] = [
  {
    id: 'b-time',
    label: 'Tiempo Liberado del Propietario',
    value: '18 horas',
    metricLabel: 'Semanales ahorradas en reportes',
    description: 'Sustituye horas de cálculo nocturno y cuadres manuales en cuadernos por un proceso que se automatiza en un clic.'
  },
  {
    id: 'b-descuadre',
    label: 'Control de Caja y Fugas',
    value: '94% menos',
    metricLabel: 'Errores y descuadres diarios',
    description: 'Detecta de forma inmediata discrepancias físicas en caja chica, compras no autorizadas y cuentas por cobrar demoradas.'
  },
  {
    id: 'b-margen',
    label: 'Crecimiento de Rendimiento',
    value: '+22% margen',
    metricLabel: 'Mayor lucro identificando estrellas',
    description: 'Sabrás exactamente qué productos sostienen la rentabilidad del negocio y cuáles estancan tu flujo de caja en bodega.'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'f-1',
    question: '¿Qué es exactamente PRISMA BI Solutions?',
    answer: 'Somos un servicio híbrido especializado en PYMEs de Centroamérica y LATAM. No te vendemos un software gigante y complejo que nadie sabrá usar. En su lugar, tomamos la información que ya registras (como planillas de Excel, archivos de tu POS o registros bancarios) y creamos para ti un dashboard web privado, moderno y visualmente intuitivo que te da claridad absoluta sobre tu negocio.'
  },
  {
    id: 'f-2',
    question: '¿PRISMA requiere que dejemos de usar Excel?',
    answer: '¡Para nada! Sabemos que Excel es el alma del control de muchas empresas. Sigue utilizándolo para tus registros habituales. Lo que hacemos es conectarnos a esas planillas (por básicas que sean) para convertirlas automáticamente en gráficos modernos de nivel corporativo premium, eliminando la necesidad de que calcules fórmulas complejas.'
  },
  {
    id: 'f-3',
    question: '¿Necesito conocimientos técnicos avanzados o un programador con nosotros?',
    answer: 'Absolutamente no. PRISMA está diseñado específicamente para dueños de negocios, gerentes y administradores que quieren ver respuestas claras en español sencillo, sin código, datos crudos incomprensibles o jerga informática.'
  },
  {
    id: 'f-4',
    question: '¿Cuánto tiempo toma tener funcionando mi primer Dashboard?',
    answer: 'Nuestra implementación estrella para PYMEs toma entre 3 y 5 días hábiles desde que nos compartes tu estructura de datos inicial. Es rápido, guiado y te acompañamos paso a paso vía WhatsApp.'
  },
  {
    id: 'f-5',
    question: '¿Mi información de ventas y costos estará segura?',
    answer: 'Por supuesto. La confidencialidad es nuestro pilar fundamental. Tus planillas financieras se cargan en un entorno web encriptado propiedad exclusiva de tu negocio, y firmamos acuerdos legales de confidencialidad estricta.'
  },
  {
    id: 'f-6',
    question: '¿Funciona desde mi teléfono celular o tablet?',
    answer: 'Sí. Todos nuestros dashboards son totalmente amigables con dispositivos móviles. Podrás verificar tus ventas diarias, cuadre de caja o stock de bodegas directamente en tu celular mientras estás fuera del local o de viaje.'
  }
];

// Interactive mock data for real industry scenarios
export const INDUSTRY_SCENARIOS = [
  {
    id: 'restaurante-pyme',
    industry: 'Alimentos & Bebidas',
    businessExample: 'Pupusería & Bistro Loreto (Antiguo Cuscatlán)',
    description: 'Manejan cobros físicos, transferencias y pedidos por apps de delivery desorganizados en cuadernos.',
    metrics: {
      leftLabel: 'Caja Promedio Semanal',
      leftValue: '$4,800',
      rightLabel: 'Margen Neto Real',
      rightValue: '34.2%',
      extraLabel: 'Canal Principal',
      extraValue: 'WhatsApp Delivery'
    },
    chartPoints: [
      { category: 'Lunes', value: 350, cost: 230 },
      { category: 'Martes', value: 410, cost: 240 },
      { category: 'Miércoles', value: 480, cost: 260 },
      { category: 'Jueves', value: 620, cost: 310 },
      { category: 'Viernes', value: 920, cost: 440 },
      { category: 'Sábado', value: 1250, cost: 580 },
      { category: 'Domingo', value: 1100, cost: 520 }
    ],
    insightText: 'Análisis PRISMA: El 42% de tus ingresos ingresa el fin de semana por WhatsApp. Sin embargo, el egreso en verduras y carnes compradas a diario en el mercado sin factura está mermando un 8% tu rentabilidad real. Recomendación: Compras programadas los miércoles.'
  },
  {
    id: 'retail-pyme',
    industry: 'Ferreterías & Comercial',
    businessExample: 'Ferretería El Progreso (San Miguel)',
    description: 'Enorme inventario de repuestos con alta rotación de marcas. Pérdidas por falta de stock oportuno en temporadas altas.',
    metrics: {
      leftLabel: 'Código de Artículos',
      leftValue: '1,420 SKU',
      rightLabel: 'Artículos sin Rotar',
      rightValue: '18%',
      extraLabel: 'Alerta Crítica',
      extraValue: 'Merma en Aceros'
    },
    chartPoints: [
      { category: 'Herramientas', value: 1800, cost: 1100 },
      { category: 'Pinturas', value: 2400, cost: 1450 },
      { category: 'Tuberías', value: 1500, cost: 950 },
      { category: 'Eléctricos', value: 3200, cost: 2200 },
      { category: 'Cemento/Varilla', value: 5000, cost: 4100 }
    ],
    insightText: 'Análisis PRISMA: El departamento de "Cemento/Varilla" aporta el mayor volumen de ventas ($5,000) pero con apenas 18% de margen. En contraste, "Pinturas" aporta $2,400 con un margen del 39.5%. Sugerimos reasignar el 15% del capital de trabajo a stock de pinturas.'
  },
  {
    id: 'distribuidora-pyme',
    industry: 'Distribución & Logística',
    businessExample: 'Importaciones y Distribuidora Cuscatlán',
    description: 'Ventas al por mayor a pequeñas tiendas del país. Dolores de cabeza cobrando créditos vencidos.',
    metrics: {
      leftLabel: 'Cuentas por Cobrar',
      leftValue: '$12,450',
      rightLabel: 'Cartera Vencida >30d',
      rightValue: '28.4%',
      extraLabel: 'Cobro Promedio',
      extraValue: '41 días'
    },
    chartPoints: [
      { category: 'Clientes A', value: 5400, cost: 3200 },
      { category: 'Clientes B', value: 3100, cost: 2000 },
      { category: 'Clientes C', value: 2200, cost: 1600 },
      { category: 'Nuevos', value: 1750, cost: 1200 }
    ],
    insightText: 'Análisis PRISMA: Los clientes tipo "B" y "C" representan el 74% de las facturas retrasadas a más de 30 días, bloqueando tu liquidez operativa. Alerta: El costo de financiar este crédito está absorbiendo $450 mensuales de tu cuenta bancaria.'
  },
  {
    id: 'servicios-pyme',
    industry: 'Servicios Profesionales',
    businessExample: 'Clínica & Consultoría de Oriente (San Vicente)',
    description: 'Servicios médicos y venta paralela de medicamentos. Dificultad para saber si ganan por consultas o por recetas.',
    metrics: {
      leftLabel: 'Consultas / Mes',
      leftValue: '340 citas',
      rightLabel: 'Ingreso Promedio',
      rightValue: '$32 / cita',
      extraLabel: 'Margen Farmacia',
      extraValue: '48%'
    },
    chartPoints: [
      { category: 'Consultas', value: 4500, cost: 1800 },
      { category: 'Procedimientos', value: 3200, cost: 1200 },
      { category: 'Medicamentos', value: 6800, cost: 3500 },
      { category: 'Estética', value: 1500, cost: 900 }
    ],
    insightText: 'Análisis PRISMA: La venta de Medicamentos representa el 52% de tus ingresos netos. Los procedimientos clínicos son altamente rentables en margen bruto (más del 60%), lo que indica que capacitar a tu personal para recomendar más procedimientos aumentará tu margen global.'
  }
];
