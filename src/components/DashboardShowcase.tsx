import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Palette, 
  RefreshCw, 
  Send, 
  Sheet, 
  BookOpen, 
  Layers, 
  Lightbulb, 
  Users, 
  Check, 
  AlertCircle, 
  TrendingUp, 
  DollarSign,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export default function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState<'excel-example' | 'recommender'>('excel-example');

  React.useEffect(() => {
    const handleSwitch = () => {
      setActiveTab('recommender');
    };
    window.addEventListener('switch-tab-recommender', handleSwitch);
    return () => window.removeEventListener('switch-tab-recommender', handleSwitch);
  }, []);
  
  // Recommender input
  const [businessDescription, setBusinessDescription] = useState('Tengo una pupusería en Antiguo Cuscatlán con servicio a domicilio y cobros en efectivo');
  const [isRecommending, setIsRecommending] = useState(false);
  const [recommendationResult, setRecommendationResult] = useState<any>(null);

  // Custom presets for Salvadoran SMBs
  const businessPresets = [
    {
      label: 'Pupusería / Restaurante',
      desc: 'Tengo una pupusería en Antiguo Cuscatlán con servicio a domicilio y cobros en efectivo por WhatsApp.'
    },
    {
      label: 'Ferretería / Distribuidora',
      desc: 'Manejo una ferretería en San Salvador con 2 sucursales y vendo repuestos de plomería y construcción.'
    },
    {
      label: 'Clínica / Servicios Médicos',
      desc: 'Clínica médica privada en Santa Ana con 3 doctores, cobramos por consulta clínica y vendemos medicina básica.'
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
      // High fidelity client-side fallback in case of errors
      setRecommendationResult({
        title: 'Solución Integral de Control de Caja y Ventas',
        plan: 'Plan Crecimiento ($44/mes)',
        excelStructure: [
          { col: 'Fecha', desc: 'Día del registro (ej. 25/May/2026)' },
          { col: 'Ingreso', desc: 'Monto real cobrado (Efectivo, Tarjeta, Remesas)' },
          { col: 'Egreso', desc: 'Pago a proveedores o compras rápidas' },
          { col: 'Detalle', desc: 'Nombre del cliente o gasto específico' },
          { col: 'Sucursal/Canal', desc: 'Para ver ventas físicas vs. domicilio' }
        ],
        recommandedActions: [
          'Digitalizar de inmediato la planilla de caja chica diaria para evitar fugas ocultas.',
          'Consolidar de manera semanal los ingresos recibidos por transferencias locales.',
          'Separar el dinero personal de la cuenta del restaurante para ver el rendimiento real.'
        ],
        taxTip: 'Esta estructura te permitirá entregarle al final del mes una tabla perfectamente resumida a tu contador externo para facilitar tu declaración mensual de IVA en El Salvador.'
      });
    } finally {
      setIsRecommending(false);
    }
  };

  // Mock excel data columns
  const mockExcelRows = [
    { fecha: '24/05/2026', categoria: 'Ventas', concepto: 'Venta de mercadería local', ingreso: '$345.00', egreso: '$0.00', sucursal: 'Sucursal Central (San Salvador)' },
    { fecha: '24/05/2026', categoria: 'Caja Chica', concepto: 'Compra de papelería y tintas', ingreso: '$0.00', egreso: '$18.50', sucursal: 'Administración' },
    { fecha: '25/05/2026', categoria: 'Ventas', concepto: 'Pedido de fin de semana (Domicilio)', ingreso: '$120.00', egreso: '$0.00', sucursal: 'Sucursal Antiguo Cuscatlán' },
    { fecha: '25/05/2026', categoria: 'Proveedor', concepto: 'Adquisición de bolsas & empaques', ingreso: '$0.00', egreso: '$150.00', sucursal: 'Bodega Principal' },
    { fecha: '25/05/2026', categoria: 'Impuestos', concepto: 'Retención local de cuenta bancaria', ingreso: '$0.00', egreso: '$4.50', sucursal: 'Administración' }
  ];

  return (
    <div className="w-full" id="showcase-section">
      <div className="rounded-2xl border border-white/8 overflow-hidden bg-zinc-950 shadow-2xl transition-all">
        {/* Top bar with beautiful design */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/8 px-6 py-4 gap-4 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide flex items-center gap-1.5 font-display">
                <Sheet className="h-4 w-4 text-emerald-400" />
                PRISMA Interactive Showcase para PYMES
              </h4>
              <p className="text-[10px] text-zinc-400 font-mono">Simulaciones Reales | Sin Complicaciones Técnicas</p>
            </div>
          </div>
          
  // Main Navigation tabs
          <div className="flex bg-zinc-950 p-1 rounded-xl border border-white/5 flex-wrap gap-1.5">
            <button
              onClick={() => setActiveTab('excel-example')}
              className={`px-4 py-2 text-[11.5px] font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'excel-example' 
                  ? 'bg-zinc-900 text-white border border-white/10 shadow-lg' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/30'
              }`}
            >
              📊 Ver Ejemplo de Planilla Simple
            </button>
            <button
              onClick={() => setActiveTab('recommender')}
              className={`px-4 py-2 text-[11.5px] font-bold rounded-lg transition-all cursor-pointer relative overflow-hidden ${
                activeTab === 'recommender' 
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/20' 
                  : 'bg-emerald-950/30 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-900/45 shadow-inner'
              }`}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald-300 animate-pulse" />
                💡 Recomendar mi Solución (IA en Vivo)
              </span>
              {activeTab !== 'recommender' && (
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 animate-pulse pointer-events-none"></span>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Display area */}
        <div className="p-6 md:p-8">
          {activeTab === 'excel-example' && (
            <div className="space-y-6">
              <div className="max-w-3xl">
                <span className="text-[10px] text-emerald-400 font-bold tracking-wider uppercase font-mono bg-emerald-400/10 px-2 py-0.5 rounded-sm">
                  LA SENCILLÉZ DE TU LADO
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight mt-2 font-display">
                  Ejemplo de la Planilla Simple que Subirías a PRISMA
                </h3>
                <p className="text-xs text-zinc-400 leading-normal mt-1">
                  No necesitas sistemas ERP complicados. Puedes rellenar una planilla de Excel o Google Sheets básica con el control de tus ingresos, egresos y gastos cotidianos de caja. PRISMA se encargará de ordenarlo todo por ti.
                </p>
              </div>

              {/* SpreadSheet Graphic mockup */}
              <div className="bg-zinc-900/50 rounded-xl border border-white/8 overflow-hidden">
                <div className="bg-zinc-900 border-b border-white/8 px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block"></span>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono">planilla_control_diario.xlsx</span>
                  </div>
                  <span className="text-[10px] text-green-400 font-mono bg-green-500/10 px-2.5 py-0.5 rounded-full border border-green-500/10">Microsoft Excel Standard View</span>
                </div>

                {/* Table structure */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs font-mono">
                    <thead>
                      <tr className="bg-zinc-950/85 text-zinc-300 border-b border-white/5 uppercase text-[9px] tracking-wider">
                        <th className="px-4 py-3">Fecha</th>
                        <th className="px-4 py-3">Categoría</th>
                        <th className="px-4 py-3">Concepto / Detalle</th>
                        <th className="px-4 py-3 text-right">Ingreso</th>
                        <th className="px-4 py-3 text-right">Egreso</th>
                        <th className="px-4 py-3">Ubicación / Sucursal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-zinc-400">
                      {mockExcelRows.map((row, i) => (
                        <tr key={i} className="hover:bg-white/2 transition-colors">
                          <td className="px-4 py-3 text-white">{row.fecha}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              row.categoria === 'Ventas' ? 'bg-green-500/10 text-green-400 border border-green-500/10' :
                              row.categoria === 'Caja Chica' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/10' :
                              row.categoria === 'Proveedor' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' :
                              'bg-teal-500/10 text-teal-400 border border-teal-500/10'
                            }`}>
                              {row.categoria}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-sans truncate max-w-xs">{row.concepto}</td>
                          <td className="px-4 py-3 text-right text-green-400 font-bold">{row.ingreso}</td>
                          <td className="px-4 py-3 text-right text-zinc-300">{row.egreso}</td>
                          <td className="px-4 py-3 font-sans truncate">{row.sucursal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Simulated conversion in high-fidelity */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-zinc-900/30 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-mono">Caja Consolidada</span>
                    <h5 className="text-lg font-bold text-white tracking-tight mt-1 font-display">$465.00</h5>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-2">Diferencia neta positiva entre ingresos y egresos registrados.</p>
                </div>
                
                <div className="bg-zinc-900/30 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-mono">Proyección Cierre Semana</span>
                    <h5 className="text-lg font-bold text-emerald-400 tracking-tight mt-1 font-display">$1,250.00</h5>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-2">Nuestra IA proyecta estabilidad de caja basándose en la tendencia actual.</p>
                </div>

                <div className="bg-zinc-900/30 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-mono">Optimización de Cobros KPI</span>
                    <h5 className="text-lg font-bold text-amber-400 tracking-tight mt-1 font-display">Alerta de Caja Chica</h5>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-2">Se detectó egreso recurrente por material de papelería. Evalúa comprar por mayor.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'recommender' && (
            <div className="space-y-6">
              <div className="max-w-3xl">
                <span className="text-[10px] text-emerald-400 font-bold tracking-wider uppercase font-mono bg-emerald-400/10 px-2 py-0.5 rounded-sm">
                  ASESOR DE SOLUCIONES INMEDIATO
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight mt-2 font-display">
                  Describe tu negocio y te recomendaremos el plan e implementación ideales
                </h3>
                <p className="text-xs text-zinc-400 leading-normal mt-1">
                  Escribe de forma sencilla a qué se dedica tu negocio (ej. "Tengo una pupusería en Antiguo Cuscatlán con servicio a domicilio y cobros en efectivo"). Nuestra Inteligencia Artificial te dirá exactamente el tipo de solución que necesitas y qué columnas deberías registrar en tu Excel.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5 space-y-4">
                  {/* Business presets selector */}
                  <div>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-mono">Seleccionar un ejemplo de rubro:</span>
                    <div className="flex flex-col gap-1.5 mt-2">
                      {businessPresets.map((preset, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectPreset(preset.desc)}
                          className="w-full text-left px-3.5 py-2 hover:bg-zinc-900 border border-white/5 text-xs text-zinc-300 rounded-lg transition-colors bg-zinc-950 hover:border-white/10"
                        >
                          📌 {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input area */}
                  <div>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-mono block mb-1.5">Describe tu negocio o comercio:</span>
                    <textarea
                      value={businessDescription}
                      onChange={(e) => setBusinessDescription(e.target.value)}
                      placeholder="Escribe rubro, ubicación o problemas que tienes hoy (ej: No me cuadran las cajas diarias, pierdo el control de qué productos vendo por sucursal)..."
                      className="w-full h-32 bg-zinc-900 border border-white/5 hover:border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl p-3 text-xs text-white placeholder-zinc-500 resize-none"
                    />
                  </div>

                  <button
                    onClick={getRecommendations}
                    disabled={isRecommending || !businessDescription.trim()}
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 border border-white/10"
                  >
                    {isRecommending ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        Analizando tu Rubro...
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        Obtener Soluciones Recomendadas
                      </>
                    )}
                  </button>
                </div>

                <div className="lg:col-span-7 bg-zinc-900/40 border border-white/5 rounded-xl p-6 min-h-72 flex flex-col justify-between">
                  {recommendationResult ? (
                    <div className="space-y-4 animate-fade-in text-xs">
                      <div>
                        <span className="text-[10px] text-green-400 font-bold tracking-wider uppercase font-mono bg-green-500/10 px-2 py-0.5 rounded-sm">
                          RECOMENDACIÓN COMPLETADA
                        </span>
                        <h4 className="text-base font-bold text-white tracking-tight mt-2.5 font-display">
                          {recommendationResult.title}
                        </h4>
                        <p className="text-zinc-300 mt-1">
                          Plan ideal para arrancar: <strong className="text-emerald-400">{recommendationResult.plan}</strong>
                        </p>
                      </div>

                      <div className="border-t border-white/5 pt-3">
                        <strong className="text-white text-[10px] uppercase tracking-wider font-mono block mb-1.5">📋 Estructura de Planilla Excel Sugerida:</strong>
                        <div className="bg-zinc-950 p-2.5 rounded-lg border border-white/5 space-y-1.5 font-mono text-[10px] text-zinc-400">
                          {recommendationResult.excelStructure?.map((item: any, i: number) => (
                            <div key={i} className="flex justify-between border-b border-white/2 pb-1 last:border-0 last:pb-0">
                              <span className="text-emerald-400 font-bold font-mono">{item.col}</span>
                              <span className="text-right">{item.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <strong className="text-white text-[10px] uppercase tracking-wider font-mono block mb-1">💡 Acciones Prácticas de Control Inmediatas:</strong>
                        <ul className="space-y-1.5 text-zinc-400 leading-normal pl-3">
                          {recommendationResult.recommandedActions?.map((act: string, i: number) => (
                            <li key={i} className="list-disc">
                              {act}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {recommendationResult.taxTip && (
                        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-2.5 text-emerald-300 flex items-start gap-2 leading-relaxed">
                          <Lightbulb className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <p className="text-[10px]">{recommendationResult.taxTip}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-12 text-zinc-500">
                      <BookOpen className="h-10 w-10 text-zinc-700 mb-3" />
                      <h4 className="text-xs font-semibold text-white">Consola de Recomendación en Espera</h4>
                      <p className="text-[11px] text-zinc-400 max-w-sm mt-1 leading-normal">
                        Escribe la descripción de tu negocio al lado izquierdo o selecciona un ejemplo rápido para obtener de inmediato propuestas de valor exclusivas.
                      </p>
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
