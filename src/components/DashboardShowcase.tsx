import React, { useState } from 'react';
import { 
  Sparkles, 
  Sheet, 
  BookOpen, 
  Lightbulb, 
  Send, 
  RefreshCw, 
  ArrowRight,
  TrendingUp,
  DollarSign,
  Briefcase,
  Layers,
  ChevronRight,
  Database,
  BarChart3,
  CheckCircle,
  FileCheck
} from 'lucide-react';

export default function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState<'excel-to-dashboard' | 'recommender'>('excel-to-dashboard');
  
  // Recommender states
  const [businessDescription, setBusinessDescription] = useState('Tengo una pupusería en Antiguo Cuscatlán con servicio de entrega a domicilio y cobros en efectivo por WhatsApp, quiero saber cómo ordenar mis números.');
  const [isRecommending, setIsRecommending] = useState(false);
  const [recommendationResult, setRecommendationResult] = useState<any>(null);

  // Quick preset suggestions for Latin American SME users
  const businessPresets = [
    {
      label: 'Pupusería & Comida Básica',
      desc: 'Tengo un restaurante familiar en Antiguo Cuscatlán con servicio a domicilio y cobro en efectivo. No me cuadran las cajas diarias.'
    },
    {
      label: 'Ferretería / Distribuidora',
      desc: 'Manejo una ferretería en San Salvador con 2 sucursales y vendo materiales de construcción. Quiero ver rotación de inventario.'
    },
    {
      label: 'Clínica o Servicios',
      desc: 'Clínica odontológica privada en Santa Ana con 3 doctores. Cobramos por procedimientos médicos y vendemos medicina básica.'
    },
    {
      label: 'Tienda de Ropa / Retail',
      desc: 'Tengo dos tiendas de calzado y ropa en San Miguel. Todo lo manejamos en libretas manuales de ventas, no sabemos qué mercancía deja más ganancia.'
    }
  ];

  const handleSelectPreset = (desc: string) => {
    setBusinessDescription(desc);
    setRecommendationResult(null);
  };

  const getRecommendations = async () => {
    setIsRecommending(true);
    setRecommendationResult(null);
    try {
      const response = await fetch('/api/recommend-solutions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessDescription })
      });
      const data = await response.json();
      setRecommendationResult(data);
    } catch (err) {
      // Elegant local fallback representation if Gemini key is missing
      setRecommendationResult({
        title: 'Solución Personalizada de Gestión Financiera',
        plan: 'Plan Crecimiento ($44/mes) - Óptimo para comenzar',
        excelStructure: [
          { col: 'Fecha', desc: 'Día del registro (ej. 25/Mayo/2026)' },
          { col: 'Concepto', desc: 'Explicación corta (Venta mesas, pago gas, etc.)' },
          { col: 'Ingreso Bruto', desc: 'Monto ingresado real (Efectivo o Transferencia)' },
          { col: 'Caja Chica', desc: 'Egresos menores e imprevistos diarios' },
          { col: 'Método Pago', desc: 'Efectivo, WhatsApp enlace o Tarjeta' }
        ],
        recommandedActions: [
          'Digitalizar de inmediato la planilla de caja chica diaria para erradicar pérdidas invisibles.',
          'Consolidar de manera semanal los ingresos recibidos por transferencias locales antes de pagar proveedores.',
          'Separar el efectivo del comercio de tu cuenta personal para ver la salud real de tu negocio.'
        ],
        taxTip: 'Esta estructura limpia te permitirá entregarle al final de cada mes un reporte unificado a tu contador de confianza para agilizar la declaración de IVA ante el Ministerio de Hacienda.'
      });
    } finally {
      setIsRecommending(false);
    }
  };

  React.useEffect(() => {
    const handleSwitch = () => {
      setActiveTab('recommender');
    };
    window.addEventListener('switch-tab-recommender', handleSwitch);
    return () => window.removeEventListener('switch-tab-recommender', handleSwitch);
  }, []);

  return (
    <div className="w-full" id="showcase-section">
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-100 transition-all">
        
        {/* Superior Panel with Tab Selectors */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between border-b border-slate-100 bg-slate-50/50 p-5 gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <div>
              <h4 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-2 font-display">
                <Sheet className="h-4.5 w-4.5 text-cyan-600" />
                PRISMA Interactive Playground
              </h4>
              <p className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-semibold">Tecnología de Datos | Pensada para PYMEs</p>
            </div>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
            <button
              onClick={() => setActiveTab('excel-to-dashboard')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'excel-to-dashboard'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              De Excel a Dashboard
            </button>
            <button
              onClick={() => setActiveTab('recommender')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'recommender'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-cyan-600 hover:text-cyan-700 font-semibold'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
              Obtener Mi Planilla (IA)
            </button>
          </div>
        </div>

        {/* Inner Content Area */}
        <div className="p-6 md:p-8">
          
          {/* Tab 1: Interactive Excel to Dashboard representation */}
          {activeTab === 'excel-to-dashboard' && (
            <div className="space-y-8 animate-fade-in">
              <div className="max-w-2xl">
                <span className="text-[10px] text-cyan-600 font-extrabold tracking-widest uppercase font-mono bg-cyan-50 px-2.5 py-1 rounded-md">
                  Simplicidad Absoluta
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mt-3 font-display">
                  Sube tu reporte elemental. Nosotros ordenamos la visión.
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  No necesitas adquirir software de contabilidad masivo ni contratar ingenieros. Sigue registrando tus ventas y gastos en planillas sencillas de Excel. PRISMA se conecta a ellas y las transforma de inmediato en respuestas visuales estructuradas.
                </p>
              </div>

              {/* Graphical simulation container */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Visual Left component: The Mock Excel Spreadsheet */}
                <div className="lg:col-span-5 bg-[#F8FAFC] border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between">
                  <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 font-bold">cuadre_ventas_diario.xlsx</span>
                  </div>

                  <div className="p-4 overflow-x-auto">
                    <table className="w-full text-left font-mono text-[10px] text-slate-500">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-700 bg-slate-200/50">
                          <th className="p-2">Fecha</th>
                          <th className="p-2">Concepto</th>
                          <th className="p-2 text-right">Monto</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="bg-white">
                          <td className="p-2 font-semibold">24/May</td>
                          <td className="p-2 font-sans truncate max-w-[120px]">Menu Almuerzos - Efectivo</td>
                          <td className="p-2 text-right text-emerald-600 font-bold">$340.00</td>
                        </tr>
                        <tr className="bg-slate-50/50">
                          <td className="p-2 font-semibold">24/May</td>
                          <td className="p-2 font-sans truncate max-w-[120px]">Pago proveedor de gas</td>
                          <td className="p-2 text-right text-rose-500 font-bold">-$45.00</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="p-2 font-semibold">25/May</td>
                          <td className="p-2 font-sans truncate max-w-[120px]">WhatsApp Domicilio (Enlace)</td>
                          <td className="p-2 text-right text-emerald-600 font-bold">$185.00</td>
                        </tr>
                        <tr className="bg-slate-50/50">
                          <td className="p-2 font-semibold">25/May</td>
                          <td className="p-2 font-sans truncate max-w-[120px]">Compra papelería sucursal</td>
                          <td className="p-2 text-right text-rose-500">-$12.00</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="p-2 font-semibold">25/May</td>
                          <td className="p-2 font-sans truncate max-w-[120px]">Venta express tarjeta POS</td>
                          <td className="p-2 text-right text-emerald-600 font-bold">$220.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-slate-50 border-t border-slate-200 p-3.5 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5 font-mono">
                    <Database className="h-3.5 w-3.5 text-slate-400" />
                    <span>5 filas importadas sin estructura pesada</span>
                  </div>
                </div>

                {/* Arrow indicator in desktop */}
                <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 shadow-sm animate-pulse">
                    <ArrowRight className="h-5 w-5 text-slate-600" />
                  </div>
                </div>

                {/* Visual Right component: The Pristine transformed Dashboard view */}
                <div className="lg:col-span-6 border border-slate-200 rounded-2xl p-6 bg-slate-900 text-white relative overflow-hidden flex flex-col justify-between shadow-lg">
                  {/* Glowing background elements for prisma light spectrum */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full filter blur-xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full filter blur-xl"></div>

                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div>
                        <span className="text-[9px] font-mono tracking-widest text-cyan-400 font-black uppercase">VISTA WEB EXCLUSIVA</span>
                        <h4 className="text-sm font-bold text-white tracking-tight font-display">PRISMA Control Panel V3</h4>
                      </div>
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">Actualizado</span>
                    </div>

                    {/* Metric Cards inside Mockup */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 border border-white/5 rounded-xl p-3.5">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide block">Caja Neta Real</span>
                        <span className="text-xl font-extrabold text-white font-display mt-1 block">$688.00</span>
                        <span className="text-[9px] font-mono text-emerald-400 mt-1 block">✔ Cuadrado al 100%</span>
                      </div>
                      <div className="bg-white/5 border border-white/5 rounded-xl p-3.5">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide block">Gasto Operativo</span>
                        <span className="text-xl font-extrabold text-slate-100 font-display mt-1 block">$57.00</span>
                        <span className="text-[9px] font-mono text-slate-400 mt-1 block">8.2% de tus ventas</span>
                      </div>
                    </div>

                    {/* Chart preview */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>Frecuencia Ventas (Efectivo vs Tarjetas)</span>
                        <span className="text-cyan-400 font-bold">65% Electrónico</span>
                      </div>
                      {/* Interactive CSS bars */}
                      <div className="bg-white/5 border border-white/5 rounded-lg p-2.5 space-y-2 font-mono">
                        <div className="flex items-center justify-between text-[9px]">
                          <span>Efectivo ($340)</span>
                          <div className="w-1/2 bg-slate-800 h-2 rounded-full overflow-hidden ml-2 relative">
                            <div className="bg-cyan-500 h-full rounded-full" style={{ width: '45%' }}></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-[9px]">
                          <span>Digital ($405)</span>
                          <div className="w-1/2 bg-slate-800 h-2 rounded-full overflow-hidden ml-2 relative">
                            <div className="bg-purple-500 h-full rounded-full" style={{ width: '55%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Automation text statement */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs leading-relaxed text-slate-300">
                      <strong className="text-white">Alerta de Liquidez:</strong> Caja chica excelente. Puedes programar anticipadamente el pago de tu cuota de IVA mensual sin comprometer las planillas.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Tab 2: The SME Solutions AI Recommender widget */}
          {activeTab === 'recommender' && (
            <div className="space-y-6 animate-fade-in">
              <div className="max-w-2xl">
                <span className="text-[10px] text-cyan-600 font-extrabold tracking-widest uppercase font-mono bg-cyan-50 px-2.5 py-1 rounded-md">
                  Recomendador Inteligente por Rubro
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mt-3 font-display">
                  Descubre qué registrar en tu planilla según la naturaleza de tu negocio
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Escribe libremente los dolores de cabeza de tu negocio o selecciona uno de nuestros ejemplos. Nuestro motor inteligente mapeará las columnas que deberías rastrear en Excel y estructurará tu plan de implementación PRISMA ideal.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Form controls (Left column) */}
                <div className="lg:col-span-5 space-y-4 font-sans">
                  
                  {/* Preset Buttons */}
                  <div>
                    <span className="text-[10px] text-slate-500 font-extrabold font-mono uppercase tracking-wider block mb-2">Selecciona un rubro de demostración:</span>
                    <div className="grid grid-cols-2 gap-2">
                      {businessPresets.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectPreset(p.desc)}
                          className="text-left p-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 rounded-xl text-[11px] font-semibold text-slate-700 transition-colors cursor-pointer"
                        >
                          📍 {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Textarea description */}
                  <div>
                    <label className="text-[10px] text-slate-500 font-extrabold font-mono uppercase tracking-wider block mb-1.5">Describe la situación de tu negocio:</label>
                    <textarea
                      value={businessDescription}
                      onChange={(e) => setBusinessDescription(e.target.value)}
                      rows={4}
                      className="w-full text-xs p-3 bg-white border border-slate-200 hover:border-slate-300 focus:border-slate-950 focus:ring-1 focus:ring-slate-950 rounded-xl placeholder-slate-400 text-slate-800 resize-none outline-none font-sans"
                      placeholder="Escribe el rubro, ubicaciones, qué vendes o qué dolores de cabeza tienes con tus cierres..."
                    />
                  </div>

                  {/* Launch analysis button */}
                  <button
                    onClick={getRecommendations}
                    disabled={isRecommending || !businessDescription.trim()}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isRecommending ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        <span>Analizando tu negocio local...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5 text-cyan-400" />
                        <span>Obtener Mi Estructura & Plan de Control</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Display Output console (Right column) */}
                <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 min-h-[300px] flex flex-col justify-between">
                  {recommendationResult ? (
                    <div className="space-y-4 animate-fade-in text-xs text-slate-600">
                      
                      {/* Result Headings */}
                      <div className="border-b border-slate-200 pb-3">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          ANÁLISIS ESTABLECIDO
                        </span>
                        <h4 className="text-base font-extrabold text-slate-900 tracking-tight font-display mt-2">
                          {recommendationResult.title}
                        </h4>
                        <p className="text-slate-500 text-[11px] mt-0.5">
                          Solución sugerida: <strong className="text-slate-800 font-bold">{recommendationResult.plan}</strong>
                        </p>
                      </div>

                      {/* Spreadsheet layout recommended */}
                      <div>
                        <strong className="text-[10px] font-mono uppercase text-slate-700 tracking-wider block mb-1.5">Columnas sugeridas para tu Excel:</strong>
                        <div className="bg-white border border-slate-200/60 rounded-xl overflow-hidden divide-y divide-slate-100 font-mono text-[10px]">
                          {recommendationResult.excelStructure?.map((item: any, i: number) => (
                            <div key={i} className="flex justify-between p-2">
                              <span className="text-cyan-600 font-bold">{item.col}</span>
                              <span className="text-slate-500 font-sans">{item.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Strategic Actions */}
                      <div>
                        <strong className="text-[10px] font-mono uppercase text-slate-700 tracking-wider block mb-1">Acciones de orden inmediata:</strong>
                        <ul className="space-y-1.5 pl-4 text-slate-600 leading-relaxed font-sans">
                          {recommendationResult.recommandedActions?.map((act: string, i: number) => (
                            <li key={i} className="list-disc">
                              {act}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tax Advice for LATAM */}
                      {recommendationResult.taxTip && (
                        <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-3 text-cyan-900 flex items-start gap-2.5 leading-relaxed font-sans mt-3">
                          <Lightbulb className="h-4.5 w-4.5 text-cyan-600 shrink-0 mt-0.5" />
                          <div className="text-[10px]">
                            <strong className="block text-cyan-950 font-bold">Consejo Fiscal & Contabilidad Local:</strong>
                            <p className="mt-0.5">{recommendationResult.taxTip}</p>
                          </div>
                        </div>
                      )}

                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-12 text-slate-400 h-full my-auto space-y-3">
                      <BookOpen className="h-10 w-10 text-slate-300" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-700">Consola de Resultados Lista</h4>
                        <p className="text-[11px] text-slate-500 max-w-xs mt-1 leading-normal font-sans">
                          Describe tu comercio a la izquierda o selecciona alguno de los ejemplos rápidos para obtener tu plan de estructura hoy.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
