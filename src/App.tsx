import React, { useState } from 'react';
import { 
  TrendingUp, 
  FileText, 
  BarChart3, 
  Sheet, 
  Gauge, 
  Cpu, 
  Layers, 
  Lock, 
  Shield, 
  Workflow, 
  Clock, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Mail, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  Calendar, 
  Building, 
  CheckCircle2, 
  Sparkles,
  Award,
  DollarSign,
  Globe,
  Bell,
  Fingerprint
} from 'lucide-react';
import { SERVICES, BENEFITS, FAQ_ITEMS, TESTIMONIALS, PRICING_PLANS } from './data';
import DashboardShowcase from './components/DashboardShowcase';

export default function App() {
  // Mobile nav state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Active pricing toggle (Monthly / Annual)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');
  // FAQ expanded state dictionary
  const [expandedFaq, setExpandedFaq] = useState<Record<string, boolean>>({});
  // Contact/Demo form states
  const [formData, setFormData] = useState({ name: '', email: '', company: '', notes: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  // Demo Booking modal states
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookedDate, setBookedDate] = useState('');
  const [bookedTime, setBookedTime] = useState('');
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'llamada' | 'correo'>('whatsapp');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Helper mapping string to Lucide icon
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp': return <TrendingUp className="h-5 w-5 text-emerald-400" />;
      case 'FileText': return <FileText className="h-5 w-5 text-emerald-400" />;
      case 'BarChart3': return <BarChart3 className="h-5 w-5 text-emerald-400" />;
      case 'Sheet': return <Sheet className="h-5 w-5 text-emerald-400" />;
      case 'Gauge': return <Gauge className="h-5 w-5 text-emerald-400" />;
      case 'Cpu': return <Cpu className="h-5 w-5 text-emerald-400" />;
      default: return <Cpu className="h-5 w-5 text-emerald-400" />;
    }
  };

  const toggleFaq = (id: string) => {
    setExpandedFaq(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', notes: '' });
    }, 4000);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookedDate || !bookedTime) return;
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingModalOpen(false);
      setBookingSubmitted(false);
      setBookedDate('');
      setBookedTime('');
    }, 3000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Convert monthly pricing to annual with 20% savings
  const getDisplayPrice = (monthlyPriceStr: string) => {
    if (monthlyPriceStr === 'Custom') return 'Custom';
    const amount = parseInt(monthlyPriceStr.replace('$', ''));
    if (billingPeriod === 'annual') {
      const discountedMonth = Math.floor(amount * 0.8);
      return `$${discountedMonth}`;
    }
    return monthlyPriceStr;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-600/30 selection:text-white antialiased overflow-x-hidden relative">
      
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-emerald-950/20 via-zinc-950 to-teal-950/20 border-b border-white/5 text-[10px] sm:text-xs text-zinc-400 py-2.5 px-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 relative z-50">
        <div className="flex items-center gap-1.5 text-white font-medium text-[11px]">
          <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span>Soporte Contable y Técnico Activo en El Salvador</span>
        </div>
        <div className="flex items-center justify-center gap-4 flex-wrap text-[10px] font-mono">
          <span className="flex items-center gap-1.5">
            <Mail className="h-3 w-3 text-emerald-400" /> 
            <span>Correo: <strong className="text-white hover:text-emerald-300 transition-colors">contacto@prismasolutions.com</strong></span>
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="h-3 w-3 text-emerald-400" /> 
            <span>WhatsApp/Tel: <strong className="text-white hover:text-emerald-300 transition-colors">+503 2200-0000</strong></span>
          </span>
        </div>
      </div>

      {/* Dynamic light leaks from the header to simulate the premium design style of Vercel and Stripe */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-30 w-full max-w-7xl h-[450px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-zinc-950/20 to-transparent pointer-events-none"></div>

      {/* 1. Navbar Sticky */}
      <nav className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            onClick={() => scrollToSection('hero-section')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="h-10 w-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center shadow-lg group-hover:border-zinc-700 hover:scale-105 transition-all relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/15 to-transparent"></div>
              <svg className="h-5.5 w-5.5 text-emerald-400 group-hover:text-cyan-400 transition-colors" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L3 19.5H21L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 4V19.5" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
                <path d="M12 10L19.5 19.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7"/>
                <path d="M12 10L4.5 19.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7"/>
              </svg>
            </div>
            <div>
              <span className="text-white font-black tracking-wider font-display text-base block leading-none">PRISMA</span>
              <span className="text-zinc-500 font-mono text-[9px] block mt-0.5 tracking-widest font-extrabold uppercase">Premium AI Solutions</span>
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wide text-zinc-400">
            <button onClick={() => scrollToSection('services-section')} className="hover:text-white transition-colors cursor-pointer">Servicios</button>
            <button onClick={() => scrollToSection('showcase-section')} className="hover:text-white transition-colors cursor-pointer">Plataforma</button>
            <button onClick={() => scrollToSection('benefits-section')} className="hover:text-white transition-colors cursor-pointer">Beneficios</button>
            <button onClick={() => scrollToSection('flow-section')} className="hover:text-white transition-colors cursor-pointer">Cómo Funciona</button>
            <button onClick={() => scrollToSection('pricing-section')} className="hover:text-white transition-colors cursor-pointer">Precios</button>
            <button onClick={() => scrollToSection('faq-section')} className="hover:text-white transition-colors cursor-pointer">FAQ</button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => {
                setBookingModalOpen(true);
              }}
              className="px-3.5 py-1.5 text-xs font-bold text-zinc-300 bg-zinc-900 border border-white/8 hover:border-white/15 rounded-lg transition-colors cursor-pointer active:scale-95 shadow-sm"
            >
              Agendar Demo
            </button>
            <button 
              onClick={() => scrollToSection('showcase-section')}
              className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-lg transition-all cursor-pointer active:scale-95 shadow-lg shadow-emerald-500/10 border border-white/10"
            >
              Probar Plataforma
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 border border-white/5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-zinc-950 border-b border-white/5 px-6 py-6 space-y-4 animate-fade-in">
            <div className="flex flex-col gap-3.5 text-xs font-semibold tracking-wide text-zinc-400">
              <button onClick={() => scrollToSection('services-section')} className="text-left py-1 hover:text-white transition-colors">Servicios</button>
              <button onClick={() => scrollToSection('showcase-section')} className="text-left py-1 hover:text-white transition-colors">Plataforma</button>
              <button onClick={() => scrollToSection('benefits-section')} className="text-left py-1 hover:text-white transition-colors">Beneficios</button>
              <button onClick={() => scrollToSection('flow-section')} className="text-left py-1 hover:text-white transition-colors">Cómo Funciona</button>
              <button onClick={() => scrollToSection('pricing-section')} className="text-left py-1 hover:text-white transition-colors">Precios</button>
              <button onClick={() => scrollToSection('faq-section')} className="text-left py-1 hover:text-white transition-colors">FAQ</button>
            </div>
            <div className="h-px bg-white/5 my-2"></div>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setBookingModalOpen(true);
                }}
                className="w-full text-center py-2.5 text-xs font-bold text-zinc-300 bg-zinc-900 border border-white/8 rounded-lg"
              >
                Agendar Demo
              </button>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('showcase-section');
                }}
                className="w-full text-center py-2.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg"
              >
                Probar Plataforma
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 2. Hero Section */}
      <section id="hero-section" className="relative pt-16 pb-12 overflow-hidden px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-full text-[11px] font-mono font-bold tracking-wide uppercase shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            <span>NUEVO: LANZAMIENTO INTEGRAL V3.0 FINPILOT</span>
          </div>

          <h1 className="text-4xl sm:text-6.5xl font-extrabold text-white tracking-tight font-display max-w-2xl mx-auto leading-none mt-2">
            Transformamos datos de tu PYME en <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">decisiones inteligentes</span> con IA.
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 max-w-2.5xl mx-auto leading-relaxed font-sans">
            Deja atrás las cuadernos a mano y las planillas complicadas. Nuestra inteligencia artificial B2B ordena tu flujo de caja, cuadra tu efectivo diario de inmediato y simplifica tu contabilidad.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => setBookingModalOpen(true)}
              className="w-full sm:w-auto px-6  py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border border-white/10 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-emerald-500/15 active:scale-95 transition-all text-xs tracking-wide"
            >
              Agendar Demo con Especialista
              <ArrowRight className="h-4 w-4" />
            </button>
            <button 
              onClick={() => scrollToSection('showcase-section')}
              className="w-full sm:w-auto px-6 py-3 bg-zinc-900 border border-white/8 hover:border-white/12 text-white rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 transition-all text-xs tracking-wide"
            >
              Probar Demo del Dashboard
            </button>
          </div>
          
          {/* Subtle client logos */}
          <div className="pt-10">
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-mono">INTEGRADO CON EL ECOSISTEMA CORPORATIVO LEADER</p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mt-4 opacity-50 text-zinc-400 font-semibold font-display tracking-tight text-xs">
              <span className="flex items-center gap-1.5">Stripe</span>
              <span className="flex items-center gap-1.5">Notion</span>
              <span className="text-sm">Retool</span>
              <span>Vercel</span>
              <span className="text-sm">Scale AI</span>
              <span>Palantir</span>
            </div>
          </div>
        </div>

        {/* Inline interactive showcase panel */}
        <div className="max-w-6xl mx-auto mt-16">
          <DashboardShowcase />
        </div>
      </section>

      {/* 3. Servicios Section */}
      <section id="services-section" className="py-24 border-t border-white/5 bg-zinc-950/60 relative px-6">
        <div className="absolute top-1/2 left-0 -z-30 w-72 h-72 bg-emerald-500/5 rounded-full filter blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="text-xs text-emerald-400 font-bold tracking-widest uppercase font-mono">SOLUCIONES PARA PYMES EN EL SALVADOR</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2 font-display">Control Contable y Planillas Adaptados a tu Comercio</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-2.5">
              Hicimos un análisis riguroso de lo que necesitan las PYMES en El Salvador. Te brindamos plantillas, cuadres y reportes simplificados para que gestiones tu dinero, manejes tu bodega física y proyectes tus declaraciones de IVA y planillas sin complicar tu día a día.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((srv) => (
              <div 
                key={srv.id}
                className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between group relative"
              >
                {/* Micro glow effect */}
                <div className="absolute inset-0 bg-radial-at-t from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

                <div>
                  <div className="h-10 w-10 bg-zinc-900 border border-white/8 rounded-xl flex items-center justify-center text-emerald-400 mb-5 relative group-hover:border-emerald-500/30 transition-colors">
                    {getServiceIcon(srv.icon)}
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors font-display">{srv.title}</h3>
                  <p className="text-xs text-zinc-400 leading-normal mt-2.5">{srv.description}</p>
                  
                  <ul className="mt-5 space-y-2">
                    {srv.details.map((detail, index) => (
                      <li key={index} className="flex items-center gap-2 text-[11px] text-zinc-500 font-medium">
                        <Check className="h-3 w-3 text-emerald-400 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5">
                  <button 
                    onClick={() => {
                      setBookingModalOpen(true);
                      setFormData(prev => ({ ...prev, notes: `Me interesa el servicio: ${srv.title}` }));
                    }}
                    className="text-xs text-zinc-300 hover:text-white font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    Consultar servicio
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Beneficios Section */}
      <section id="benefits-section" className="py-24 border-t border-white/5 bg-zinc-950 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs text-emerald-400 font-bold tracking-widest uppercase font-mono">CRECIMIENTO CONTROLADO</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2 font-display">Métricas Sencillas para Controlar tu Margen</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-2.5">
              Olvídate de cálculos financieros abstractos. Medimos el éxito con resultados directos: más tiempo libre para ti, cero descuadres de efectivo en tus sucursales y reportes impecables listos para tu contador externo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((bnf) => (
              <div 
                key={bnf.id}
                className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/20 hover:scale-102 transition-all duration-300 font-sans relative overflow-hidden group shadow-lg"
              >
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-600/5 rounded-full filter blur-[40px] pointer-events-none"></div>

                <div>
                  <span className="text-xs text-emerald-400 font-bold tracking-wider font-mono block mb-1">
                    {bnf.label}
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-white font-display tracking-tight mt-1.5 flex items-baseline">
                    {bnf.value}
                  </div>
                  <span className="text-[10px] text-zinc-500 block uppercase font-mono font-bold tracking-wider mt-1">
                    {bnf.metricLabel}
                  </span>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-4">
                    {bnf.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Cómo funciona Section */}
      <section id="flow-section" className="py-24 border-t border-white/5 bg-zinc-950/60 relative px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs text-emerald-400 font-bold tracking-widest uppercase font-mono">AUTOMATIZACIÓN EN 4 PASOS</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2 font-display">El Canal Automático de PRISMA Solutions</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-2.5">
              Sin programar, sin integraciones complejas de meses. El camino óptimo hacia el control absoluto de tus variables financieras institucionales.
            </p>
          </div>

          {/* Flows timeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            
            {/* 1. Paso */}
            <div className="relative space-y-3">
              <span className="text-5xl font-black text-zinc-900 font-display">01</span>
              <div className="h-2 w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
              <h4 className="text-sm font-bold text-white font-display">Subes tus archivos</h4>
              <p className="text-xs text-zinc-400 leading-normal">
                Carga de manera segura tus balances de pérdidas y ganancias, historiales de publicidad digital o reportes de ERP en CSV/Excel.
              </p>
            </div>

            {/* 2. Paso */}
            <div className="relative space-y-3">
              <span className="text-5xl font-black text-zinc-900 font-display">02</span>
              <div className="h-2 w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
              <h4 className="text-sm font-bold text-white font-display">La IA analiza datos</h4>
              <p className="text-xs text-zinc-400 leading-normal">
                Nuestros modelos especializados analizan la estacionalidad, segmentan cohortes de retención y mapean anomalías internas.
              </p>
            </div>

            {/* 3. Paso */}
            <div className="relative space-y-3">
              <span className="text-5xl font-black text-zinc-900 font-display">03</span>
              <div className="h-2 w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
              <h4 className="text-sm font-bold text-white font-display">Genera insights</h4>
              <p className="text-xs text-zinc-400 leading-normal">
                FinPilot redacta de manera concisa resúmenes ejecutivos detallando riesgos fiscales, oportunidades de margen y alertas operativas.
              </p>
            </div>

            {/* 4. Paso */}
            <div className="relative space-y-3">
              <span className="text-5xl font-black text-zinc-900 font-display">04</span>
              <div className="h-2 w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
              <h4 className="text-sm font-bold text-white font-display">Obtienes reportes</h4>
              <p className="text-xs text-zinc-400 leading-normal">
                Exporta instantáneamente PDFs corporativos listos para presentar, dashboards interactivos limpios y flujos predictivos listos para el CFO.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Pricing Section */}
      <section id="pricing-section" className="py-24 border-t border-white/5 bg-zinc-950/60 relative px-6">
        <div className="absolute bottom-0 right-1/2 translate-x-1/2 -z-30 w-full max-w-5xl h-[350px] bg-emerald-950/5 rounded-full filter blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs text-emerald-400 font-bold tracking-widest uppercase font-mono">SELECCIÓN DE PLANES</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2 font-display">Planes Flexibles y Sencillos hechos para PYMES</h2>
            
            {/* Dynamic Billing Toggle */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <span className={`text-xs ${billingPeriod === 'monthly' ? 'text-white font-bold' : 'text-zinc-500'}`}>Mensual</span>
              <button
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
                className="h-6 w-11 bg-zinc-800 rounded-full p-0.5 transition-colors relative flex items-center focus:outline-none"
              >
                <div className={`h-5 w-5 bg-emerald-500 rounded-full shadow-md transform transition-transform ${billingPeriod === 'annual' ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </button>
              <span className={`text-xs flex items-center gap-1.5 ${billingPeriod === 'annual' ? 'text-white font-bold' : 'text-zinc-500'}`}>
                Anual
                <span className="text-[9px] bg-green-500/15 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded-full font-mono">
                  -20% Ahorro
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRICING_PLANS.map((plan) => (
              <div 
                key={plan.id}
                className={`rounded-2xl p-5 flex flex-col justify-between relative transition-all duration-300 ${
                  plan.popular 
                    ? 'bg-zinc-900 border-2 border-emerald-500 shadow-xl shadow-emerald-500/15 lg:scale-105Scale' 
                    : 'bg-zinc-900/40 border border-white/5 hover:border-emerald-500/25'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow">
                    MÁS POPULAR
                  </span>
                )}

                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight font-display">{plan.name}</h4>
                  <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed min-h-12">{plan.description}</p>
                  
                  <div className="my-5 flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
                      {getDisplayPrice(plan.price)}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {plan.period}{billingPeriod === 'annual' && plan.price !== 'Custom' ? '/mes (facturado anual)' : ''}
                    </span>
                  </div>

                  <div className="h-px bg-white/5 my-4"></div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feat, index) => (
                      <li key={index} className="flex items-start gap-2 text-[11px] text-zinc-300">
                        <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => {
                    setBookingModalOpen(true);
                    setFormData(prev => ({ ...prev, notes: `Deseo activar la prueba para el plan ${plan.name}.` }));
                  }}
                  className={`w-full py-2.5 text-xs font-bold rounded-xl transition-all tracking-wide active:scale-95 text-center cursor-pointer ${
                    plan.popular
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg border border-white/10'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section id="faq-section" className="py-24 border-t border-white/5 bg-zinc-950 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs text-emerald-400 font-bold tracking-widest uppercase font-mono">CENTRO DE RESPUESTAS</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2 font-display">Preguntas Frecuentes de la Suite PRISMA</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-2.5">
              Todo lo que necesitas saber sobre la seguridad de tus datos, integraciones ERP prioritarias y la puesta en marcha.
            </p>
          </div>

          <div className="space-y-4 font-sans">
            {FAQ_ITEMS.map((faq) => {
              const isOpen = !!expandedFaq[faq.id];
              return (
                <div 
                  key={faq.id}
                  className="bg-zinc-900/40 border border-white/5 rounded-xl transition-colors overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between text-white hover:text-emerald-300 transition-colors cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-semibold tracking-tight">{faq.question}</span>
                    <span className="p-1 rounded-sm bg-zinc-800 text-zinc-400">
                      {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-zinc-400 leading-relaxed border-t border-white/5 animate-fade-in bg-zinc-900/10">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Contact Section with consultative Form */}
      <section id="contact-section" className="py-24 border-t border-white/5 bg-zinc-950/60 relative px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600/10 border border-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-mono font-bold tracking-wide uppercase">
              <Mail className="h-3.5 w-3.5" />
              <span>CONSULTORÍA CONTABLE SIN COMPROMISO</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">Toma el control absoluto de tus números hoy mismo</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Completa el formulario para que un especialista local de PRISMA evalúe la situación de tu negocio, plantillas y diseñe una ruta de orden a tu medida.
            </p>

            <div className="space-y-4 pt-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-zinc-900 border border-white/5 text-emerald-400 flex items-center justify-center rounded-lg">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Correo Electrónico</span>
                  <span className="text-white">contacto@prismasolutions.com</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-zinc-900 border border-white/5 text-emerald-400 flex items-center justify-center rounded-lg">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Teléfono / WhatsApp</span>
                  <span className="text-white">+503 2200-0000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass-effect rounded-2xl border border-white/8 p-6 sm:p-8 bg-zinc-950/40 relative">
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12 space-y-4 animate-fade-in">
                  <div className="h-12 w-12 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white tracking-tight font-display">Solicitud Recibida con Éxito</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mt-1.5">
                      Un asesor de soluciones para PYMEs de PRISMA revisará tus detalles y te contactará en un plazo menor a 4 horas laborables.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-1">Solicitar una Asesoría de Negocio</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                      <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider font-mono block mb-1.5">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-zinc-900/80 border border-white/5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg p-2.5 text-xs text-white"
                        placeholder="ej. Juan Pérez"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider font-mono block mb-1.5">Correo Electrónico *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-zinc-900/80 border border-white/5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg p-2.5 text-xs text-white"
                        placeholder="ej. juan.perez@gmail.com o empresa"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider font-mono block mb-1.5">Nombre de la Empresa / Comercio</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full bg-zinc-900/80 border border-white/5 focus:border-emerald-500/20 rounded-lg p-2.5 text-xs text-white"
                      placeholder="ej. Distribuidora El Sol / Pupusería Central"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider font-mono block mb-1.5">Comentarios / Necesidad del negocio</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={4}
                      className="w-full bg-zinc-900/80 border border-white/5 focus:border-emerald-500/25 rounded-lg p-2.5 text-xs text-white resize-none"
                      placeholder="Cuéntanos brevemente qué vendes o qué problemas tienes con tu flujo de caja o planillas..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer border border-white/10"
                  >
                    Confirmar Envío y Reservar Análisis
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 10. Footer Section */}
      <footer className="border-t border-white/5 bg-zinc-950 py-16 px-6 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="h-10 w-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center shadow-lg relative overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/15 to-transparent"></div>
                <svg className="h-5.5 w-5.5 text-emerald-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4L3 19.5H21L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 4V19.5" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
                  <path d="M12 10L19.5 19.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7"/>
                  <path d="M12 10L4.5 19.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7"/>
                </svg>
              </div>
              <div>
                <span className="text-white font-black tracking-wider font-display text-base block leading-none">PRISMA</span>
                <span className="text-zinc-500 font-mono text-[9px] block mt-0.5 tracking-widest font-extrabold uppercase">Premium AI Solutions</span>
              </div>
            </div>
            
            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
              SaaS y Soluciones Premium de Automatización de Datos Financieros y Operacionales mediante Modelos Avanzados de Inteligencia Artificial.
            </p>

            <div className="text-[10px] text-zinc-600 font-mono">
              © {new Date().getFullYear()} PRISMA AI Solutions S.A. Todos los derechos reservados.
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Soluciones</h5>
            <div className="flex flex-col gap-2 text-xs text-zinc-500">
              <button onClick={() => scrollToSection('showcase-section')} className="text-left hover:text-white transition-colors">FinPilot Dashboard</button>
              <button onClick={() => scrollToSection('services-section')} className="text-left hover:text-white transition-colors">Excel AI AI Assistant</button>
              <button onClick={() => scrollToSection('services-section')} className="text-left hover:text-white transition-colors">Smart Forecasting</button>
              <button onClick={() => scrollToSection('services-section')} className="text-left hover:text-white transition-colors">Automated Reports</button>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Compañía</h5>
            <div className="flex flex-col gap-2 text-xs text-zinc-500">
              <span className="cursor-pointer hover:text-white transition-colors">Sobre Nosotros</span>
              <span className="cursor-pointer hover:text-white transition-colors">Sostenibilidad</span>
              <span className="cursor-pointer hover:text-white transition-colors">Prensa & Medios</span>
              <span className="cursor-pointer hover:text-white transition-colors">Carreras (We are hiring!)</span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Seguridad & Legal</h5>
            <div className="flex flex-col gap-2 text-xs text-zinc-500">
              <span className="cursor-pointer hover:text-white transition-colors">Certificación SOC-2</span>
              <span className="cursor-pointer hover:text-white transition-colors">Términos del Servicio</span>
              <span className="cursor-pointer hover:text-white transition-colors">Política de Privacidad</span>
              <span className="cursor-pointer hover:text-white transition-colors">GDPR Compliance</span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Soporte</h5>
            <div className="flex flex-col gap-2 text-xs text-zinc-500">
              <button onClick={() => scrollToSection('faq-section')} className="text-left hover:text-white transition-colors">FAQ</button>
              <span className="cursor-pointer hover:text-white transition-colors">Centro de Ayuda</span>
              <span className="cursor-pointer hover:text-white transition-colors">API Docs</span>
              <span className="cursor-pointer hover:text-white transition-colors">Requisitos del Sistema</span>
            </div>
          </div>

        </div>
      </footer>

      {/* 11. Custom Interactive Calendar Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in">
          <div className="bg-zinc-950 border border-white/10 rounded-2xl w-full max-w-md p-6 relative overflow-hidden shadow-2xl">
            {/* Background absolute accent */}
            <div className="absolute right-0 top-0 -z-10 w-32 h-32 bg-emerald-500/5 rounded-full filter blur-xl"></div>
            
            <button 
              onClick={() => {
                setBookingModalOpen(false);
                setBookingSubmitted(false);
              }}
              className="absolute top-4 right-4 p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

             {bookingSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center py-8 space-y-4 animate-fade-in animate-duration-300">
                <div className="h-12 w-12 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display">¡Sesión Agendada con Éxito!</h4>
                  <p className="text-[11px] text-zinc-400 leading-relaxed max-w-xs mt-2 font-sans">
                    Confirmado para el día <span className="text-white font-semibold">{bookedDate}</span> a las <span className="text-white font-semibold">{bookedTime}</span>. 
                    Te enviaremos los detalles y recordatorios prioritarios vía <span className="text-emerald-400 font-bold uppercase">{contactMethod}</span> y por correo electrónico. ¡Tu negocio está a un paso de dar un gran salto!
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 font-sans">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-emerald-500" />
                  <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider">Agendar Asesoría Privada</h4>
                </div>
                <p className="text-xs text-zinc-400 leading-normal">
                  Reserva una llamada o contacto de 20 minutos con uno de nuestros especialistas locales en El Salvador para evaluar tu negocio.
                </p>

                <div>
                  <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider font-mono block mb-1">Paso 1: Selecciona Fecha</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={bookedDate}
                    onChange={(e) => setBookedDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg p-2.5 text-xs text-white uppercase font-mono cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider font-mono block mb-1">Paso 2: Selecciona Hora (Horario El Salvador)</label>
                  <select
                    required
                    value={bookedTime}
                    onChange={(e) => setBookedTime(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg p-2.5 text-xs text-white font-mono cursor-pointer"
                  >
                    <option value="">Seleccionar horario disponible...</option>
                    <option value="08:30 AM">08:30 AM (Mañana)</option>
                    <option value="10:00 AM">10:00 AM (Ideal)</option>
                    <option value="02:00 PM">02:00 PM (Recomendado)</option>
                    <option value="04:00 PM">04:00 PM (Tarde)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider font-mono block mb-1.5">Paso 3: Método de Contacto Preferido</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'whatsapp', label: 'WhatsApp' },
                      { value: 'llamada', label: 'Llamada' },
                      { value: 'correo', label: 'Correo' }
                    ].map((method) => (
                      <button
                        key={method.value}
                        type="button"
                        onClick={() => setContactMethod(method.value as any)}
                        className={`py-2 px-1 text-[11px] font-semibold rounded-lg border transition-all cursor-pointer text-center ${
                          contactMethod === method.value
                            ? 'bg-emerald-600/10 border-emerald-500/40 text-emerald-400 font-bold'
                            : 'bg-zinc-900 border-white/5 text-zinc-400 hover:border-white/10'
                        }`}
                      >
                        {method.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer border border-white/10"
                  >
                    Confirmar Reserva de Asesoría
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating AI Recommender Guide */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full blur-xs opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <button
            onClick={() => {
              scrollToSection('showcase-section');
              // Let the showcase know it should switch to recommender tab
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent('switch-tab-recommender'));
              }, 100);
            }}
            className="relative flex items-center gap-2.5 px-4.5 py-3 bg-zinc-950 border border-white/10 rounded-full text-xs text-white font-semibold cursor-pointer shadow-2xl hover:border-emerald-500/30 transition-all font-sans"
          >
            <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse animate-duration-3000" />
            <span>💡 ¿Saber qué plan necesita tu PYME?</span>
            <span className="px-2 py-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-[8px] font-black uppercase text-white rounded-md tracking-wider">PROBAR IA</span>
          </button>
        </div>
      </div>

    </div>
  );
}
