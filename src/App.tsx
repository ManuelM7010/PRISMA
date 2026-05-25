import React, { useState, useEffect } from 'react';
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
  Utensils,
  ShoppingBag,
  Shuffle,
  Monitor,
  Heart,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';
import { SOLUTIONS, BENEFITS, FAQ_ITEMS } from './data';
import DashboardShowcase from './components/DashboardShowcase';

export default function App() {
  // Mobile nav state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Active pricing toggle (Monthly / Annual)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');

  // FAQ expanded state dictionary
  const [expandedFaq, setExpandedFaq] = useState<Record<string, boolean>>({});
  
  // Active navigation section/tab for smart screen compartmentalization (makes the web shorter)
  const [activeTab, setActiveTab] = useState<'inicio' | 'solucion' | 'planes'>('inicio');

  const handleTabChange = (tab: 'inicio' | 'solucion' | 'planes', elementId?: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (elementId) {
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Contact/Demo form states
  const [formData, setFormData] = useState({ name: '', email: '', company: '', notes: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // New States for booking identification requested by Owner
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingCompany, setBookingCompany] = useState('');

  // Demo Booking modal states
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookedDate, setBookedDate] = useState('');
  const [bookedTime, setBookedTime] = useState('');
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'llamada' | 'correo'>('whatsapp');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Admin & Owner system control states
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'demo' | 'booking'>('all');
  const [adminSearch, setAdminSearch] = useState('');

  // Check on hash or path changes to trigger owner mode automatically
  useEffect(() => {
    const handleCheckUrl = () => {
      const path = window.location.pathname.toLowerCase();
      if (path === '/admin' || path === '/prisma-admin' || window.location.hash.toLowerCase() === '#admin') {
        setIsAdminMode(true);
      }
    };
    handleCheckUrl();
    window.addEventListener('hashchange', handleCheckUrl);
    return () => window.removeEventListener('hashchange', handleCheckUrl);
  }, []);

  const fetchLeadsData = async () => {
    setLeadsLoading(true);
    try {
      const resp = await fetch('/api/leads');
      if (resp.ok) {
        const data = await resp.json();
        // Sort leads by created date desc
        setLeads(data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
    } catch (err) {
      console.error("Failed to load leads from persistent server database:", err);
    } finally {
      setLeadsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdminMode && adminUnlocked) {
      fetchLeadsData();
    }
  }, [isAdminMode, adminUnlocked]);

  const toggleFaq = (id: string) => {
    setExpandedFaq(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Helper to post leads to backend Express API
  const registerLeadOnServer = async (payload: {
    type: 'demo' | 'booking';
    name: string;
    email: string;
    company?: string;
    notes?: string;
    date?: string;
    time?: string;
    contactMethod?: string;
  }) => {
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error("Error writing leads to server:", err);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Send to backend server file db
    await registerLeadOnServer({
      type: 'demo',
      name: formData.name,
      email: formData.email,
      company: formData.company,
      notes: formData.notes
    });

    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', notes: '' });
    }, 4000);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookedDate || !bookedTime || !bookingName || !bookingEmail) return;

    // Send to backend server database
    await registerLeadOnServer({
      type: 'booking',
      name: bookingName,
      email: bookingEmail,
      company: bookingCompany,
      date: bookedDate,
      time: bookedTime,
      contactMethod: contactMethod,
      notes: `Asesoría agendada. Preferencia de contacto: ${contactMethod}.`
    });

    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingModalOpen(false);
      setBookingSubmitted(false);
      setBookedDate('');
      setBookedTime('');
      setBookingName('');
      setBookingEmail('');
      setBookingCompany('');
    }, 3500);
  };

  const scrollToSection = (id: string) => {
    let targetTab: 'inicio' | 'solucion' | 'planes' = 'inicio';
    
    if (id === 'hero-section' || id === 'showcase-section') {
      targetTab = 'inicio';
    } else if (id === 'digitalize-pyme' || id === 'what-we-do' || id === 'flow-section') {
      targetTab = 'solucion';
    } else if (id === 'pricing-section' || id === 'faq-section' || id === 'contact-section') {
      targetTab = 'planes';
    }
    
    setActiveTab(targetTab);
    setMobileMenuOpen(false);

    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 80);
  };

  if (isAdminMode) {
    if (!adminUnlocked) {
      return (
        <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
          {/* Subtle glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-600/10 rounded-full filter blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full filter blur-[100px] pointer-events-none"></div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl w-full max-w-md p-8 relative z-10 shadow-2xl backdrop-blur-md">
            
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Logo icon */}
              <div className="h-14 w-14 rounded-2xl bg-slate-950 flex items-center justify-center border border-slate-850 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <svg className="h-8 w-8 text-cyan-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 2L20 12L4 22V2Z" fill="url(#adminLockPrismGrad)" />
                  <defs>
                    <linearGradient id="adminLockPrismGrad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div>
                <h2 className="text-lg font-black tracking-widest uppercase font-display text-white">PRISMA SOLUTIONS</h2>
                <p className="text-[10px] font-mono tracking-widest text-[#06b6d4] uppercase font-bold mt-1">SISTEMA COMPARTIDO DE LEADS</p>
              </div>

              <div className="w-full bg-slate-950/60 border border-slate-850 p-4 rounded-xl text-xs text-slate-400 space-y-2 text-left leading-relaxed">
                <span className="font-extrabold text-white block">🔐 Acceso de Propietario</span>
                <span>Usted ingresó al portal protegido de administración de solicitudes de demostración y llamadas recibidas de clientes de El Salvador.</span>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (adminPassword === 'prisma2026') {
                    setAdminUnlocked(true);
                    setAdminError('');
                  } else {
                    setAdminError('Contraseña incorrecta. Pista: prisma2026');
                  }
                }}
                className="w-full space-y-4 pt-2"
              >
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono block text-left mb-1.5">Contraseña Maestra</label>
                  <input
                    type="password"
                    required
                    autoFocus
                    placeholder="Contraseña..."
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-xs text-white outline-none tracking-widest"
                  />
                  {adminError && <span className="text-red-400 text-[10px] block mt-1.5 text-left font-semibold">{adminError}</span>}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdminMode(false);
                      window.location.hash = '';
                    }}
                    className="flex-1 py-3 bg-slate-800 hover:bg-slate-755 text-slate-350 text-xs font-bold rounded-xl transition-all cursor-pointer font-sans"
                  >
                    Volver a la Web
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer font-sans"
                  >
                    Entrar
                  </button>
                </div>
              </form>

            </div>

          </div>
        </div>
      );
    }

    // Unlocked Dashboard view
    // Group leads by calculated weeks
    const filterSearchLeads = leads.filter(lead => {
      const matchSearch = 
        lead.name?.toLowerCase().includes(adminSearch.toLowerCase()) || 
        lead.email?.toLowerCase().includes(adminSearch.toLowerCase()) || 
        lead.company?.toLowerCase().includes(adminSearch.toLowerCase()) ||
        lead.notes?.toLowerCase().includes(adminSearch.toLowerCase());
      
      if (filterType === 'all') return matchSearch;
      return matchSearch && lead.type === filterType;
    });

    const limitCurrentWeek = new Date("2026-05-25T00:00:00Z").getTime();
    const limitLastWeek = new Date("2026-05-18T00:00:00Z").getTime();
    const limitTwoWeeksAgo = new Date("2026-05-11T00:00:00Z").getTime();

    const weekCurrent: any[] = [];
    const weekLast: any[] = [];
    const weekTwoAgo: any[] = [];
    const weekOlder: any[] = [];

    filterSearchLeads.forEach(lead => {
      const time = new Date(lead.date || lead.createdAt).getTime();
      if (time >= limitCurrentWeek) {
        weekCurrent.push(lead);
      } else if (time >= limitLastWeek) {
        weekLast.push(lead);
      } else if (time >= limitTwoWeeksAgo) {
        weekTwoAgo.push(lead);
      } else {
        weekOlder.push(lead);
      }
    });

    const handleDeleteLead = async (id: string) => {
      if (!confirm("¿Está seguro que desea eliminar este lead permanentemente?")) return;
      try {
        const resp = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
        if (resp.ok) {
          fetchLeadsData();
        }
      } catch (err) {
        console.error("Failed to delete lead:", err);
      }
    };

    return (
      <div className="min-h-screen bg-[#070b13] text-slate-100 font-sans antialiased pb-20">
        
        {/* Top admin bar */}
        <header className="border-b border-slate-850 bg-slate-900/90 sticky top-0 z-30 px-6 py-4 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <svg className="h-6 w-6 text-cyan-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 2L20 12L4 22V2Z" fill="url(#adminDashPrismGrad)" />
                  <defs>
                    <linearGradient id="adminDashPrismGrad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="text-left">
                <span className="text-white font-black tracking-wider font-display text-base block leading-none">PRISMA LEAD HUB</span>
                <span className="text-[#06b6d4] font-mono text-[9px] block mt-1 tracking-widest font-bold uppercase leading-none">CONEXIÓN DIGITAL ACTIVA • DUEÑO</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={fetchLeadsData}
                disabled={leadsLoading}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-755 disabled:bg-slate-900 text-slate-350 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 grow sm:grow-0"
              >
                🔄 {leadsLoading ? 'Actualizando...' : 'Refrescar Datos'}
              </button>
              <button
                onClick={() => {
                  setIsAdminMode(false);
                  window.location.hash = '';
                }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer grow sm:grow-0"
              >
                ← Salir y Volver a la Web
              </button>
            </div>

          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 pt-8 space-y-8 animate-fade-in">
          
          {/* Welcome section & indicators */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-slate-850/80 p-6 rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full filter blur-2xl pointer-events-none"></div>
            <div>
              <h1 className="text-xl font-black text-white font-display uppercase tracking-tight">Consola Administrativa de Leads</h1>
              <p className="text-xs text-slate-400 mt-1">Consulte solicitudes de demostración recibidas en el formulario de la landing y llamadas agendadas de consultoría.</p>
            </div>
            <div className="flex items-center gap-2 bg-[#0b1220] border border-slate-800 px-4 py-2.5 rounded-xl text-xs text-slate-300 font-mono shrink-0">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Modo Directo: <strong>leads.json</strong></span>
            </div>
          </div>

          {/* Sizing Widgets metrics stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div className="bg-slate-900 border border-slate-850 p-5 rounded-2xl relative shadow-md">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#06b6d4] font-bold block">Total de Leads</span>
              <span className="text-3xl font-black text-white block mt-2">{leads.length}</span>
              <span className="text-[10px] text-slate-500 block mt-1">Registrados en servidor</span>
            </div>

            <div className="bg-slate-900 border border-slate-850 p-5 rounded-2xl relative shadow-md">
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold block">Demos Solicitadas</span>
              <span className="text-3xl font-black text-white block mt-2">{leads.filter(l => l.type === 'demo').length}</span>
              <span className="text-[10px] text-slate-500 block mt-1">Ingresadas vía formulario</span>
            </div>

            <div className="bg-slate-900 border border-slate-850 p-5 rounded-2xl relative shadow-md">
              <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400 font-bold block">Llamadas Agendadas</span>
              <span className="text-3xl font-black text-white block mt-2">{leads.filter(l => l.type === 'booking').length}</span>
              <span className="text-[10px] text-slate-500 block mt-1">Vía agenda de consultoría</span>
            </div>

            <div className="bg-slate-900 border border-slate-850 p-5 rounded-2xl relative shadow-md">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold block">Leads de la Semana</span>
              <span className="text-3xl font-black text-white block mt-2">
                {leads.filter(l => new Date(l.date || l.createdAt).getTime() >= limitLastWeek).length}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">Leads en los últimos 7 días</span>
            </div>

          </div>

          {/* Filtering controls line */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-850 p-4 rounded-2xl shadow-sm">
            
            {/* Left side: filter tabs */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
              {[
                { value: 'all', label: 'Todos los Leads' },
                { value: 'demo', label: 'Solo Demos' },
                { value: 'booking', label: 'Solo Llamadas' }
              ].map(t => (
                <button
                  key={t.value}
                  onClick={() => setFilterType(t.value as any)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    filterType === t.value
                      ? 'bg-cyan-500 text-slate-950 font-black animate-scale-in'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-850'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Right side: Search Input */}
            <div className="relative w-full sm:w-80 shrink-0">
              <input
                type="text"
                placeholder="Buscar por Nombre, Correo o Empresa..."
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-cyan-500"
              />
              {adminSearch && (
                <button 
                  onClick={() => setAdminSearch('')}
                  className="absolute right-2.5 top-2.5 text-slate-500 hover:text-white font-bold text-xs"
                >
                  ✕
                </button>
              )}
            </div>

          </div>

          {/* Date week layout grids */}
          <div className="space-y-8 pb-10">
            {[
              { title: '📅 SEMANA ACTUAL (25 de Mayo - 31 de Mayo)', list: weekCurrent },
              { title: '🔄 SEMANA ANTERIOR (18 de Mayo - 24 de Mayo)', list: weekLast },
              { title: '📜 HACE 2 SEMANAS (11 de Mayo - 17 de Mayo)', list: weekTwoAgo },
              { title: '🗄️ ANTERIORES', list: weekOlder }
            ].map(sec => {
              if (sec.list.length === 0) return null;

              return (
                <div key={sec.title} className="space-y-4">
                  <h3 className="text-xs font-black tracking-widest text-[#06b6d4] uppercase font-mono flex items-center gap-2">
                    <span>{sec.title}</span>
                    <span className="px-2 py-0.5 bg-slate-850 text-[10px] text-slate-400 rounded-md font-bold">{sec.list.length}</span>
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    {sec.list.map((lead: any) => (
                      <div 
                        key={lead.id} 
                        className="bg-slate-900 border border-slate-850 hover:border-slate-800 p-5 rounded-2xl relative transition-all shadow-md group animate-fade-in"
                      >
                        {/* Glow indicator on type */}
                        <div className={`absolute top-0 bottom-0 left-0 w-1.5 rounded-l-2xl ${lead.type === 'demo' ? 'bg-cyan-500' : 'bg-purple-500'}`}></div>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pl-3">
                          
                          <div className="space-y-2">
                            {/* Metadata date line */}
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">{lead.date || new Date(lead.createdAt).toISOString().split('T')[0]}</span>
                              {lead.time && <span className="text-[10px] font-mono bg-slate-800 text-slate-350 px-1.5 py-0.5 rounded-md font-semibold">{lead.time}</span>}
                              
                              <span className={`px-2 py-0.5 rounded-md font-mono text-[9px] font-black uppercase ${
                                lead.type === 'demo' 
                                  ? 'bg-cyan-950 text-cyan-400 border border-cyan-900' 
                                  : 'bg-purple-950 text-purple-400 border border-purple-900'
                              }`}>
                                {lead.type === 'demo' ? 'Demostración' : `Llamada (${lead.contactMethod || 'whatsapp'})`}
                              </span>
                            </div>

                            {/* Customer Identity */}
                            <div>
                              <h4 className="text-sm font-extrabold text-white">{lead.name}</h4>
                              {lead.company && <p className="text-xs text-[#06b6d4] font-medium block mt-0.5">Empresa / PYME: <strong>{lead.company}</strong></p>}
                              <p className="text-xs text-slate-450 block mt-0.5">Email: <a href={`mailto:${lead.email}`} className="underline text-slate-300 hover:text-white font-medium">{lead.email}</a></p>
                            </div>

                            {/* Notes */}
                            {lead.notes && (
                              <div className="bg-slate-950/70 border border-slate-850 p-3 rounded-xl text-xs text-slate-400 mt-2 max-w-2xl leading-normal">
                                <span className="font-bold text-slate-350 block mb-1">Notas / Requerimiento:</span>
                                {lead.notes}
                              </div>
                            )}

                          </div>

                          {/* Action Items */}
                          <div className="flex items-center gap-3 w-full md:w-auto shrink-0 pt-2 md:pt-0">
                            <button
                              onClick={() => {
                                alert(`Simulación de contacto exitoso. Se ha registrado el envío de detalles del servicio a ${lead.name}.`);
                              }}
                              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 text-[11px] font-semibold rounded-xl transition-all cursor-pointer flex-1 md:flex-none text-center"
                            >
                              📧 Atender Lead
                            </button>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-2 bg-slate-950 hover:bg-red-955 hover:text-red-400 text-slate-500 rounded-xl transition-all border border-slate-850 hover:border-red-900 cursor-pointer flex-1 md:flex-none text-center text-xs"
                              title="Eliminar lead permanentemente"
                            >
                              🗑️ Eliminar
                            </button>
                          </div>

                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {filterSearchLeads.length === 0 && (
              <div className="text-center py-16 bg-slate-900 border border-slate-850 rounded-3xl space-y-4">
                <span className="text-3xl block">📁</span>
                <p className="text-sm text-slate-400">No se encontraron solicitudes ingresadas con los criterios de búsqueda actuales.</p>
                <button onClick={() => { setAdminSearch(''); setFilterType('all'); }} className="text-xs font-bold text-cyan-400 underline">Limpiar filtros</button>
              </div>
            )}

          </div>

        </main>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-cyan-100 selection:text-slate-900 antialiased overflow-x-hidden relative">
      
      {/* Top Premium Banner: Slim compact Headpage */}
      <div className="bg-[#0b0f19] text-white py-3 px-4 md:px-6 border-b border-slate-850 relative z-50 overflow-hidden shadow-lg">
        {/* Ambient background light glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-[60px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-12 w-48 h-48 bg-purple-500/10 rounded-full filter blur-[50px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-4 relative z-10">
          
          {/* Left side: Logo + Slogan in a single compact line */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full xl:w-auto">
            {/* Extremely compact logo badge */}
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 shadow-[0_0_15px_rgba(6,182,212,0.2)] relative overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-purple-400/10 pointer-events-none"></div>
                <svg className="h-6 w-6 text-cyan-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 2L20 12L4 22V2Z" fill="url(#bannerPrismGradTopSlim)" />
                  <path d="M4 2L12 12V2H4Z" fill="white" fillOpacity="0.1" />
                  <path d="M4 2L12 12L4 22V2Z" fill="black" fillOpacity="0.15" />
                  <path d="M7 6.5L15 12L7 17.5V6.5Z" fill="white" fillOpacity="0.2" />
                  <defs>
                    <linearGradient id="bannerPrismGradTopSlim" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="text-left">
                <span className="text-white font-black tracking-wider font-display text-base block leading-none">PRISMA</span>
                <span className="text-slate-400 font-mono text-[8px] block mt-0.5 tracking-widest font-bold uppercase leading-none">BI SOLUTIONS</span>
              </div>
            </div>

            {/* Vertical divider on desktop */}
            <span className="hidden sm:inline-block text-slate-800 font-light text-base">|</span>

            {/* Compact Slogan */}
            <p className="text-xs font-extrabold uppercase tracking-wide leading-none text-slate-200">
              CONVERTIMOS TUS DATOS EN <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)] font-black">SOLUCIONES.</span>
            </p>
          </div>

          {/* Center visual: MASSIVE & PROMINENT connected process flow steps */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-3.5 shrink-0 py-1 bg-slate-900/50 border border-slate-800/80 px-2 sm:px-4 rounded-2xl shadow-inner my-1 sm:my-0 max-w-full overflow-x-auto no-scrollbar">
            {/* Step 1: VISUALIZA */}
            <div className="flex items-center gap-1 sm:gap-2 group cursor-pointer shrink-0" onClick={() => scrollToSection('what-we-do')}>
              <div className="h-7 w-7 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-400 shadow-[0_2px_8px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] shrink-0">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2" />
                  <path d="M6 14L10 10L14 12L18 8" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[8.5px] sm:text-xs font-black tracking-tight sm:tracking-widest text-slate-200 group-hover:text-cyan-400 transition-colors uppercase font-mono">VISUALIZA</span>
            </div>

            <div className="w-1.5 sm:w-4 border-t border-dashed border-slate-800 shrink-0"></div>

            {/* Step 2: ENTIENDE */}
            <div className="flex items-center gap-1 sm:gap-2 group cursor-pointer shrink-0" onClick={() => scrollToSection('digitalize-pyme')}>
              <div className="h-7 w-7 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-400 shadow-[0_2px_8px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] shrink-0">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="5" stroke="currentColor" strokeWidth="2" />
                  <circle cx="11" cy="11" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <span className="text-[8.5px] sm:text-xs font-black tracking-tight sm:tracking-widest text-slate-200 group-hover:text-cyan-400 transition-colors uppercase font-mono">ENTIENDE</span>
            </div>

            <div className="w-1.5 sm:w-4 border-t border-dashed border-slate-800 shrink-0"></div>

            {/* Step 3: DECIDE */}
            <div className="flex items-center gap-1 sm:gap-2 group cursor-pointer shrink-0" onClick={() => scrollToSection('showcase-section')}>
              <div className="h-7 w-7 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-400 shadow-[0_2px_8px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] shrink-0">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <span className="text-[8.5px] sm:text-xs font-black tracking-tight sm:tracking-widest text-slate-200 group-hover:text-cyan-400 transition-colors uppercase font-mono">DECIDE</span>
            </div>

            <div className="w-1.5 sm:w-4 border-t border-dashed border-slate-800 shrink-0"></div>

            {/* Step 4: CRECE */}
            <div className="flex items-center gap-1 sm:gap-2 group cursor-pointer shrink-0" onClick={() => scrollToSection('pricing-section')}>
              <div className="h-7 w-7 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-400 shadow-[0_2px_8px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] shrink-0">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 18L10 12L14 15L20 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[8.5px] sm:text-xs font-black tracking-tight sm:tracking-widest text-slate-200 group-hover:text-cyan-400 transition-colors uppercase font-mono">CRECE</span>
            </div>
          </div>

          {/* Right side: Contact Details - Muted secondary look, cleanly styled */}
          <div className="flex flex-row xl:flex-col items-center xl:items-end gap-3 xl:gap-0.5 text-[10px] font-mono text-slate-400 shrink-0 bg-slate-950/40 p-2 rounded-xl border border-slate-850/60 max-w-full overflow-x-auto no-scrollbar">
            <span className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <Mail className="h-3 w-3 text-slate-500 shrink-0" />
              <span>contacto@prismasolutions.com</span>
            </span>
            <span className="inline xl:hidden text-slate-800">|</span>
            <span className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <Phone className="h-3 w-3 text-slate-500 shrink-0" />
              <span>Soporte: +503 2200-0000</span>
            </span>
          </div>

        </div>

        {/* Glow accent bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/70 to-purple-500/40"></div>
      </div>

      {/* 1. Sticky Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Concept Left */}
          <div 
            onClick={() => scrollToSection('hero-section')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            {/* Geometric Prisma SVG Logo - Proposal 1 Right-Pointing faceted play-like prism */}
            <div className="h-13 w-13 rounded-2xl bg-slate-950 flex items-center justify-center shadow-lg relative overflow-hidden transition-all duration-300 group-hover:scale-105 border border-slate-800">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-purple-400/10 pointer-events-none"></div>
              {/* Prisma Faceted Right-Pointing Play Icon */}
              <svg className="h-8 w-8 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 2L20 12L4 22V2Z" fill="url(#navPrismGrad)" />
                <path d="M4 2L12 12V2H4Z" fill="white" fillOpacity="0.1" />
                <path d="M4 2L12 12L4 22V2Z" fill="black" fillOpacity="0.15" />
                <path d="M7 6.5L15 12L7 17.5V6.5Z" fill="white" fillOpacity="0.2" />
                <defs>
                  <linearGradient id="navPrismGrad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <span className="text-slate-950 font-black tracking-widest font-display text-xl sm:text-2xl block leading-none">PRISMA</span>
              <span className="text-slate-500 font-mono text-[10px] block mt-1 tracking-[0.16em] font-extrabold uppercase">BI Solutions</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-100/90 border border-slate-200/55 p-1 rounded-2xl shadow-inner">
            <button
              onClick={() => handleTabChange('inicio', 'hero-section')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'inicio' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Inicio & Demo
            </button>
            <button
              onClick={() => handleTabChange('solucion', 'digitalize-pyme')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'solucion' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Nuestra Solución
            </button>
            <button
              onClick={() => handleTabChange('planes', 'pricing-section')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'planes' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-605 hover:text-slate-900'
              }`}
            >
              Planes & Contacto
            </button>
          </div>

          {/* Primary Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => setBookingModalOpen(true)}
              className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer active:scale-95 shadow-sm border border-slate-200/40"
            >
              Agenda una Llamada
            </button>
            <button 
              onClick={() => scrollToSection('contact-section')}
              className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-850 rounded-xl transition-all cursor-pointer active:scale-95 shadow-md shadow-slate-100 border border-transparent"
            >
              Solicitar Demo
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="lg:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile slide-down navigation panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 animate-fade-in shadow-lg">
            <div className="flex flex-col gap-4 text-xs font-bold text-slate-500">
              <button 
                onClick={() => handleTabChange('inicio', 'hero-section')} 
                className={`text-left py-2 px-3.5 rounded-xl border transition-all ${activeTab === 'inicio' ? 'bg-slate-900 border-slate-900 text-white font-black' : 'hover:bg-slate-50 border-transparent text-slate-600'}`}
              >
                Inicio & Demo
              </button>
              <button 
                onClick={() => handleTabChange('solucion', 'digitalize-pyme')} 
                className={`text-left py-2 px-3.5 rounded-xl border transition-all ${activeTab === 'solucion' ? 'bg-slate-900 border-slate-900 text-white font-black' : 'hover:bg-slate-50 border-transparent text-slate-600'}`}
              >
                Nuestra Solución
              </button>
              <button 
                onClick={() => handleTabChange('planes', 'pricing-section')} 
                className={`text-left py-2 px-3.5 rounded-xl border transition-all ${activeTab === 'planes' ? 'bg-slate-900 border-slate-900 text-white font-black' : 'hover:bg-slate-50 border-transparent text-slate-600'}`}
              >
                Planes & Contacto
              </button>
            </div>
            <div className="h-px bg-slate-150 my-2"></div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setBookingModalOpen(true);
                }}
                className="w-full text-center py-2.5 text-xs font-bold text-slate-700 bg-slate-100 rounded-xl border border-slate-200"
              >
                Agenda Llamada
              </button>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('contact-section');
                }}
                className="w-full text-center py-2.5 text-xs font-bold text-white bg-slate-900 rounded-xl"
              >
                Solicitar Demo
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 2. Visual Tab Switcher (Very compact & sticky for quick section switching on mobile/desktop) */}
      <div className="bg-slate-50 border-b border-slate-205 py-2.5 px-4 sticky top-20 z-30 shadow-2xs backdrop-blur-md">
        <div className="max-w-2xl mx-auto flex items-center justify-center p-1 bg-white border border-slate-200/80 rounded-2xl shadow-xs gap-1">
          <button
            onClick={() => handleTabChange('inicio', 'hero-section')}
            className={`flex-1 text-center py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'inicio'
                ? 'bg-slate-900 text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Inicio / Demo
          </button>
          <button
            onClick={() => handleTabChange('solucion', 'digitalize-pyme')}
            className={`flex-1 text-center py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'solucion'
                ? 'bg-slate-900 text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Qué Hacemos
          </button>
          <button
            onClick={() => handleTabChange('planes', 'pricing-section')}
            className={`flex-1 text-center py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'planes'
                ? 'bg-slate-900 text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Planes y Precios
          </button>
        </div>
      </div>



      {/* 3. Hero Section (Powerful display of core values) */}
      {activeTab === 'inicio' && (
        <section id="hero-section" className="relative pt-16 pb-20 px-6 animate-fade-in">
          {/* Ambient background spectrum leaks */}
          <div className="absolute top-20 left-1/4 -z-10 w-96 h-96 bg-cyan-300/10 rounded-full filter blur-[120px] pointer-events-none"></div>
          <div className="absolute top-40 right-1/4 -z-10 w-96 h-96 bg-purple-300/10 rounded-full filter blur-[120px] pointer-events-none"></div>

          <div className="max-w-5xl mx-auto text-center space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-100/50 border border-cyan-200/50 text-cyan-800 rounded-full text-[10px] font-mono font-bold tracking-wide uppercase shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-cyan-600 animate-pulse" />
              <span>SOLUCIONES EJECUTIVAS PARA COMERCIOS LOCALES</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight font-display max-w-4xl mx-auto leading-none mt-2">
              Convertimos tus datos en <span className="text-gradient-prisma font-black">soluciones para tu empresa.</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-650 max-w-2.5xl mx-auto leading-relaxed font-sans">
              Olvídate del estrés de las libretas y el desorden de las planillas Excel hechas a mano. Creamos dashboards web simples, hermosos y diseñados a la medida para que visualices tu flujo de caja, cierres diarios de caja y ganes control absoluto de tu negocio.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto">
              <button 
                onClick={() => scrollToSection('contact-section')}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-850 text-white rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all text-xs tracking-wide"
              >
                <span>Solicitar Demo Práctica</span>
                <ArrowRight className="h-4 w-4 text-cyan-400" />
              </button>
              <button 
                onClick={() => handleTabChange('inicio', 'showcase-section')}
                className="w-full sm:w-auto px-6 py-3.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-800 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95 transition-all text-xs tracking-wide"
              >
                <span>Asistente por Rubro (IA)</span>
              </button>
            </div>

          </div>

          {/* Dynamic Interactive Playground Widget Slot */}
          <div className="max-w-6xl mx-auto mt-16 pt-3" id="showcase-section">
            <DashboardShowcase />
          </div>
        </section>
      )}

      {/* 4. PYME Digitalization Value Pillar (Section #2 of user structure) */}
      {activeTab === 'solucion' && (
        <section id="digitalize-pyme" className="py-20 bg-white border-y border-slate-200 px-6 relative animate-fade-in">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Editorial Content (Left Column) */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-mono font-extrabold tracking-widest text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">
                EL RETO DE CRUCE OPERATIVO
              </span>
              <h2 className="text-3xl sm:text-4.5xl font-extrabold text-slate-900 tracking-tight font-display leading-tight">
                ¿Por qué digitalizar tu comercio es el paso más rentable que darás este año?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Muchos empresarios en El Salvador creen que para modernizar sus empresas deben cambiar todo su software, instalar costosos ERPs internacionales o reestructurar su contabilidad habitual.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                La realidad es diferente: <strong className="text-slate-900">el valor está en la simplicidad.</strong> Un SaaS diseñado especialmente para PYMEs toma tus archivos diarios y responde preguntas de forma inmediata: *¿Cuánto dinero neto queda libre los viernes para pagar planillas? ¿Qué bodega tiene mercadería sin rotación? ¿Qué sucursal sostiene la ganancia real?*
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="border border-slate-100 bg-slate-50/50 rounded-xl p-4">
                  <span className="text-xl font-black text-cyan-600 font-display">95%</span>
                  <p className="text-[10px] text-slate-450 uppercase tracking-widest font-mono font-extrabold mt-1">Efectividad de Control</p>
                  <p className="text-[10px] text-slate-500 font-sans mt-1">Eliminamos descuadres imprevistos de caja chica.</p>
                </div>
                <div className="border border-slate-100 bg-slate-50/50 rounded-xl p-4">
                  <span className="text-xl font-black text-purple-600 font-display">3 a 5 Días</span>
                  <p className="text-[10px] text-slate-450 uppercase tracking-widest font-mono font-extrabold mt-1">Transición Completa</p>
                  <p className="text-[10px] text-slate-500 font-sans mt-1">Rápido, guiado y 100% de la mano por WhatsApp.</p>
                </div>
              </div>
            </div>

            {/* Editorial graphical representation of Excel vs PRISMA (Right Column) */}
            <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
              <h4 className="text-xs font-mono font-extrabold uppercase tracking-widest text-slate-400">LA EVOLUCIÓN HISTÓRICA DEL CONTROL</h4>
              
              <div className="space-y-4 font-sans text-xs">
                
                {/* Box 1: The old chaotic manual way */}
                <div className="flex items-start gap-4 p-4 border border-rose-100 bg-rose-50/30 rounded-2xl">
                  <span className="h-8 w-8 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center shrink-0 font-bold">✕</span>
                  <div>
                    <h5 className="font-bold text-rose-900">El Esquema Manual Tradicional (Dolor)</h5>
                    <p className="text-rose-750 text-[11px] leading-relaxed mt-1">
                      Cuentas sumadas a medianoche, notas de WhatsApp borrosas, archivos Excel rotos por error de fórmulas y total incertidumbre sobre márgenes reales de ganancia de la semana.
                    </p>
                  </div>
                </div>

                {/* Box 2: The modern scalable SaaS way */}
                <div className="flex items-start gap-4 p-4 border border-emerald-100 bg-emerald-50/30 rounded-2xl relative overflow-hidden">
                  <div className="absolute right-0 top-0 bg-emerald-500 text-white font-mono text-[7px] font-black uppercase px-2 py-0.5 rounded-bl">RECOMENDADO</div>
                  <span className="h-8 w-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center shrink-0 font-bold">✓</span>
                  <div>
                    <h5 className="font-bold text-emerald-950">El Modelo PRISMA BI (Tranquilidad)</h5>
                    <p className="text-emerald-750 text-[11px] leading-relaxed mt-1">
                      Sigues rellenando tus tablas de siempre. Nosotros las consolidamos en la web de inmediato para que veas tus ingresos, cierres de caja y stock desde tu celular con gráficos limpios y alertas predictivas.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>
      )}

      {/* 5. ¿Qué hacemos? Section (Simple overview of what PRISMA sells - Section #3) */}
      {activeTab === 'solucion' && (
        <section id="what-we-do" className="py-24 bg-slate-50/50 px-6 animate-fade-in">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
            <span className="text-[11px] font-mono text-cyan-600 tracking-widest font-extrabold uppercase bg-cyan-100/60 px-2.5 py-1 rounded-md">CREAMOS RESPUESTAS</span>
            <h2 className="text-3xl sm:text-4.5xl font-extrabold text-slate-950 tracking-tight font-display">Tus reportes convertidos en claridad empresarial</h2>
            <p className="text-xs sm:text-sm text-slate-655 max-w-2xl mx-auto leading-relaxed">
              Eliminamos la fricción administrativa de tu negocio. PRISMA se encarga de tomar tus archivos locales, realizar la lógica y entregarte dashboards interactivos donde visualizas tus ventas, egresos y existencias de stock sin tecnicismos complejos de programación.
            </p>
          </div>

          {/* Three core capabilities we offer */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 hover:border-slate-350 transition-colors shadow-2xs">
              <div className="h-10 w-10 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center font-bold">
                <Monitor className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 font-display">
                Dashboards Web Simples y Privados
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Pantallas limpias e intuitivas a las que accedes de manera privada para mirar el pulso real de tu negocio desde cualquier computadora o celular.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 hover:border-slate-350 transition-colors shadow-2xs">
              <div className="h-10 w-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center font-bold">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 font-display">
                Cuadre de Caja Chica y Ventas
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Control total en tiempo real de tus flujos de efectivo diario. Conciliación automática de entradas contra transacciones digitales.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 hover:border-slate-350 transition-colors shadow-2xs">
              <div className="h-10 w-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center font-bold">
                <Layers className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 font-display">
                Margen de Ganancia Real
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Identifica cuáles productos o servicios sostienen tus ganancias reales de la semana y cuáles bloquean tu capital sin dar rentabilidad.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 6. SOLUCIONES PERSONALIZADAS (Específicos Dashboards sin pricing aburrido - Section #4) */}
      {activeTab === 'planes' && (
        <section id="pricing-section" className="py-24 bg-white px-6 border-b border-slate-200 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <span className="text-[11px] font-mono text-cyan-600 tracking-widest font-extrabold uppercase bg-cyan-100/60 px-2.5 py-1 rounded-md">DISEÑO EXCLUSIVO</span>
          <h2 className="text-3xl sm:text-4.5xl font-extrabold text-slate-950 tracking-tight font-display">Especialidades Dashboard Adaptados a tu Comercio</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Adaptamos cada tablero web interactivo a los retos específicos de tu industria con tarifas claras de implementación y mensualidades lógicas de PYME, ofreciéndote un servicio integral y soporte continuo.
          </p>

          {/* Billing period toggle */}
          <div className="flex items-center justify-center pt-4">
            <div className="inline-flex items-center bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              <button 
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  billingPeriod === 'monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                Mensual
              </button>
              <button 
                onClick={() => setBillingPeriod('annual')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  billingPeriod === 'annual' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-500'
                }`}
              >
                Anual 
                <span className="bg-emerald-500 text-white text-[7px] font-mono uppercase font-black tracking-wider px-1.5 py-0.5 rounded-sm">
                  AHORRA 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Solution Cards Grid */}
        <div className="max-w-6.5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SOLUTIONS.map((sol) => {
            // Price calculation depending on toggle
            const baseSetupStr = sol.setupPrice;
            const numericMonthly = parseInt(sol.monthlyPrice.replace('$', ''));
            const finalMonthly = billingPeriod === 'annual' 
              ? Math.floor(numericMonthly * 0.8) 
              : numericMonthly;

            return (
              <div 
                key={sol.id}
                className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-300 relative group"
              >
                <div className="space-y-5">
                  
                  {/* Top card header */}
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-500 block">
                      Enfoque: {sol.target}
                    </span>
                    <span className="h-10 w-10 bg-white border border-slate-200/60 text-cyan-600 rounded-xl flex items-center justify-center shrink-0 shadow-xs">
                      {sol.icon === 'DollarSign' && <DollarSign className="h-5 w-5" />}
                      {sol.icon === 'TrendingUp' && <TrendingUp className="h-5 w-5" />}
                      {sol.icon === 'Layers' && <Layers className="h-5 w-5" />}
                      {sol.icon === 'Utensils' && <Utensils className="h-5 w-5" />}
                      {sol.icon === 'ShoppingBag' && <ShoppingBag className="h-5 w-5" />}
                    </span>
                  </div>

                  {/* Main Solution Identifiers */}
                  <div>
                    <h4 className="text-lg font-extrabold text-slate-950 font-display group-hover:text-cyan-700 transition-colors">
                      {sol.name}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-sans">
                      {sol.description}
                    </p>
                  </div>

                  {/* Premium customized pricing display */}
                  <div className="bg-white border border-slate-200/60 rounded-2xl p-4 space-y-2 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                      <span className="text-slate-500">Pago único inicial (Setup):</span>
                      <strong className="text-slate-900 font-bold">{baseSetupStr} USD</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Mantenimiento mensual:</span>
                      <div>
                        <strong className="text-base font-extrabold text-slate-950">${finalMonthly} USD</strong>
                        <span className="text-[9px] text-slate-450 uppercase font-bold tracking-wider font-mono"> /mes</span>
                      </div>
                    </div>
                  </div>

                  {/* Benefit checkmarks */}
                  <div className="space-y-2 pt-1 font-sans">
                    <span className="text-[9px] font-mono font-black uppercase text-slate-400 block tracking-wider">BENEFICIOS CLAVE</span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {sol.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="h-3.5 w-3.5 text-cyan-500 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Card footer CTA triggers booking modal with pre-form fields */}
                <div className="pt-6">
                  <button 
                    onClick={() => {
                      setBookingModalOpen(true);
                      setFormData(prev => ({
                        ...prev,
                        notes: `Hola PRISMA. Deseo solicitar una demostración y cotización enfocada en el tablero comercial tipo "${sol.name}" para mi negocio.`
                      }));
                    }}
                    className="w-full text-center py-3 text-xs font-bold text-slate-800 bg-white border border-slate-200 hover:border-slate-300 rounded-xl cursor-pointer active:scale-95 transition-all shadow-2xs"
                  >
                    Implementar {sol.name}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </section>
      )}

      {/* 7. Cómo funciona (Visual conceptual wireframe flow - Section #5) */}
      {activeTab === 'solucion' && (
        <section id="flow-section" className="py-24 bg-slate-50/50 px-6 relative border-b border-slate-100 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <span className="text-[11px] font-mono text-cyan-600 tracking-widest font-extrabold uppercase bg-cyan-100/60 px-2.5 py-1 rounded-md">PROCESO MODERNO</span>
          <h2 className="text-3xl sm:text-4.5xl font-extrabold text-slate-950 tracking-tight font-display">El Camino Hacia la Claridad en 3 Pasos</h2>
          <p className="text-xs sm:text-sm text-slate-655 max-w-2xl mx-auto">
            Hicimos de la puesta en marcha un proceso amigable y libre de estrés. Nosotros nos encargamos de todo el desarrollo contable y técnico.
          </p>
        </div>

        {/* Process Step Columns */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative items-start">
          
          {/* Step 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 relative">
            <div className="absolute -top-4 -left-3 h-10 w-10 bg-slate-900 border border-slate-800 text-white rounded-xl font-mono font-black italic flex items-center justify-center shadow-lg">01</div>
            <div className="h-10 w-10 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center shrink-0">
              <Sheet className="h-5 w-5" />
            </div>
            <h4 className="text-base font-extrabold font-display text-slate-900">Carga ágil y segura</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Una vez contratado el plan, te damos acceso a tu propio espacio web privado para que cargues tus documentos o planillas Excel de forma directa. Si se te dificulta la carga o uso, cuentas con asistencia local para compartirlos vía correo o WhatsApp y nosotros te ayudamos de la mano.
            </p>
            <span className="text-[10px] text-slate-400 font-mono block italic">Flexibilidad total adaptada a tu ritmo.</span>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 relative">
            <div className="absolute -top-4 -left-3 h-10 w-10 bg-slate-900 border border-slate-800 text-white rounded-xl font-mono font-black italic flex items-center justify-center shadow-lg">02</div>
            <div className="h-10 w-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <h4 className="text-base font-extrabold font-display text-slate-900">Creamos tu dashboard</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Nuestro equipo e IA programadora estructuran tus KPIs, limpian duplicados de ventas diarias y codifican un panel web personalizado a tu medida.
            </p>
            <span className="text-[10px] text-slate-400 font-mono block italic">Listo de 3 a 5 días con encriptación.</span>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 relative">
            <div className="absolute -top-4 -left-3 h-10 w-10 bg-slate-900 border border-slate-800 text-white rounded-xl font-mono font-black italic flex items-center justify-center shadow-lg">03</div>
            <div className="h-10 w-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center shrink-0">
              <Monitor className="h-5 w-5" />
            </div>
            <h4 className="text-base font-extrabold font-display text-slate-900">Visualiza & decide</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Accedes mediante un enlace privado desde tu celular o computadora. Miras el estado real de tu negocio con total nitidez contable.
            </p>
            <span className="text-[10px] text-slate-400 font-mono block italic">Cero complicaciones o códigos raros.</span>
          </div>

        </div>


      </section>
      )}





      {/* 10. FAQ SECTION (Preguntas Reales de Negocio - Section #9) */}
      {activeTab === 'planes' && (
        <section id="faq-section" className="py-24 bg-white border-y border-slate-200 px-6 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-mono text-cyan-600 tracking-widest font-extrabold uppercase bg-cyan-100/60 px-2.5 py-1 rounded-md">CENTRO DE RESPUESTAS</span>
            <h2 className="text-3xl sm:text-4.5xl font-extrabold text-slate-950 tracking-tight font-display">Preguntas Frecuentes de la Suite PRISMA</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5">
              Todo lo que necesitas saber sobre la seguridad de tus datos, tus declaraciones de IVA impositivas y nuestra rapidez de entrega.
            </p>
          </div>

          <div className="space-y-4 font-sans max-w-3xl mx-auto">
            {FAQ_ITEMS.map((faq) => {
              const isOpen = !!expandedFaq[faq.id];
              return (
                <div 
                  key={faq.id}
                  className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left px-5 py-4.5 flex items-center justify-between text-slate-800 hover:text-cyan-700 transition-colors cursor-pointer outline-none"
                  >
                    <span className="text-xs sm:text-sm font-extrabold tracking-tight font-display pr-4">{faq.question}</span>
                    <span className="p-1 px-1.5 rounded-lg bg-white border border-slate-205 text-slate-400">
                      {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-200/50 animate-fade-in bg-white/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>
      )}

      {/* 11. CONTACT & CONSULTATIVE FORM (Closing high converting CTA - Section #10) */}
      <section id="contact-section" className="py-24 bg-slate-50 relative px-6 overflow-hidden">
        {/* Glow absolute effect */}
        <div className="absolute bottom-0 right-1/4 -z-10 w-96 h-96 bg-cyan-300/10 rounded-full filter blur-[150px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Informative column (Left) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] font-mono font-black uppercase text-cyan-700 bg-cyan-100/60 px-3 py-1 rounded-md">
              MÁS CONTROL MENOS EXCEL MANUAL
            </span>
            <h2 className="text-3.5xl sm:text-4.5xl font-extrabold text-slate-950 tracking-tight font-display">Toma hoy el control financiero de tu PYME</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              No dejes que los descuadres de dinero en caja estropeen tu tranquilidad. Completa el formulario de al lado para que un analista local prepare una propuesta de dashboard exclusiva a la medida de tu comercio.
            </p>

            <div className="space-y-4 pt-4 text-xs font-mono text-slate-600">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-white border border-slate-200 flex items-center justify-center rounded-xl text-cyan-600 shadow-2xs">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="block text-slate-400 text-[9px] font-extrabold uppercase font-mono tracking-wider">CORREO DIRECTO</span>
                  <span className="text-slate-800 font-bold">contacto@prismasolutions.com</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-white border border-slate-200 flex items-center justify-center rounded-xl text-cyan-600 shadow-2xs">
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="block text-slate-400 text-[9px] font-extrabold uppercase font-mono tracking-wider">WHATSAPP / TELÉFONO</span>
                  <span className="text-slate-800 font-bold">+503 2200-0000</span>
                </div>
              </div>
            </div>
          </div>

          {/* High conversions B2B Form (Right Column) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100 relative">
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16 space-y-4 animate-fade-in">
                  <div className="h-12 w-12 bg-emerald-100 border border-emerald-200 rounded-full text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900 tracking-tight font-display">¡Solicitud recibida correctamente!</h4>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-sm mt-1.5">
                      Un especialista comercial de PRISMA en El Salvador revisará tu rubro y te contactará en un lapso menor de 3 horas hábiles con asesoría personalizada.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <h4 className="text-xs font-mono font-black uppercase text-slate-400 tracking-widest block mb-2">SOLICITUD DE ASESORÍA PRÁCTICA</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono block mb-1.5">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 focus:ring-1 focus:ring-slate-800 rounded-xl p-3 text-xs text-slate-800 outline-none font-sans"
                        placeholder="ej. Juan R. Pérez"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono block mb-1.5">Correo Electrónico *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 focus:ring-1 focus:ring-slate-800 rounded-xl p-3 text-xs text-slate-800 outline-none font-sans"
                        placeholder="ej. juan.perez@gmail.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono block mb-1.5">Nombre de la Empresa o Comercio</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 focus:ring-1 focus:ring-slate-800 rounded-xl p-3 text-xs text-slate-800 outline-none font-sans"
                      placeholder="ej. Distribuidora Morazán / Pupusería Central"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono block mb-1.5">Detalles de lo que vendes o problemas financieros</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={4}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 focus:ring-1 focus:ring-slate-800 rounded-xl p-3 text-xs text-slate-800 resize-none outline-none font-sans"
                      placeholder="ej. Tengo problemas cuadrando la caja chica semanal de mis dos sucursales y mis empleados apuntan en cuadernos..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-850 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 border border-transparent font-sans uppercase tracking-wider"
                  >
                    <span>Enviar Detalles & Agendar Análisis de Datos</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 12. FOOTER (SaaS Premium Editorial style) */}
      <footer className="bg-slate-900 text-slate-350 py-16 px-6 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-slate-950 flex items-center justify-center shadow-lg relative overflow-hidden shrink-0 border border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-transparent"></div>
                <svg className="h-5.5 w-5.5 text-cyan-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 2L20 12L4 22V2Z" fill="url(#footerPrismGrad)" />
                  <path d="M4 2L12 12V2H4Z" fill="white" fillOpacity="0.1" />
                  <path d="M4 2L12 12L4 22V2Z" fill="black" fillOpacity="0.15" />
                  <path d="M7 6.5L15 12L7 17.5V6.5Z" fill="white" fillOpacity="0.2" />
                  <defs>
                    <linearGradient id="footerPrismGrad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <span className="text-white font-black tracking-wider font-display text-base block leading-none">PRISMA</span>
                <span className="text-slate-500 font-mono text-[9px] block mt-0.5 tracking-widest font-extrabold uppercase">BI Solutions</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              SaaS de Inteligencia de Datos y Tableros Web diseñado para dueños de PYMEs de retail, restaurantes, distribución y servicios. Convertimos el desorden en claridad de negocio.
            </p>

            <div className="text-[10px] text-slate-500 font-mono">
              © {new Date().getFullYear()} PRISMA BI Solutions. Todos los derechos reservados.
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h5 className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">Especialidades</h5>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <span className="hover:text-white transition-colors cursor-pointer">Tablero Financiero</span>
              <span className="hover:text-white transition-colors cursor-pointer">Tablero Comercial</span>
              <span className="hover:text-white transition-colors cursor-pointer">Tablero de Restaurantes</span>
              <span className="hover:text-white transition-colors cursor-pointer">Tablero de Retail</span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h5 className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">Compañía</h5>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <span className="hover:text-white transition-colors cursor-pointer">Sobre Nosotros</span>
              <span className="hover:text-white transition-colors cursor-pointer">Metodología Simple</span>
              <span className="hover:text-white transition-colors cursor-pointer">Prensa</span>
              <span className="hover:text-white transition-colors cursor-pointer">Socios Locales</span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h5 className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">Seguridad & IVA</h5>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <span className="hover:text-white transition-colors cursor-pointer">Confidencialidad</span>
              <span className="hover:text-white transition-colors cursor-pointer">Ministerio de Hacienda</span>
              <span className="hover:text-white transition-colors cursor-pointer">Soporte de Contador</span>
              <span className="hover:text-white transition-colors cursor-pointer">Términos de Servicio</span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h5 className="text-[10px] font-bold text-white uppercase tracking-wider font-mono font-bold text-teal-400">Soporte Activo</h5>
            <div className="flex flex-col gap-2 text-[11px] text-slate-450 hover:text-white">
              <span>WhatsApp Live Chat</span>
              <span>Teléfono: +503 2200-0000</span>
              <span className="text-[8px] font-mono text-cyan-400">Lunes a Sábado, 8:00 AM - 5:30 PM (CST)</span>
            </div>
          </div>

        </div>
      </footer>

      {/* 13. High Conversion Private Consultant Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md p-6 relative overflow-hidden shadow-2xl">
            
            {/* Background glowing absolute bubble */}
            <div className="absolute right-0 top-0 -z-10 w-32 h-32 bg-cyan-100 rounded-full filter blur-2xl"></div>
            
            <button 
              onClick={() => {
                setBookingModalOpen(false);
                setBookingSubmitted(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            {bookingSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center py-8 space-y-4 animate-fade-in">
                <div className="h-12 w-12 bg-emerald-100 border border-emerald-200 rounded-full text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 font-display">¡Sesión Agendada con Éxito!</h4>
                  <p className="text-[11px] text-slate-650 leading-relaxed max-w-xs mt-2 font-sans">
                    Confirmado para el día <span className="text-slate-900 font-bold">{bookedDate}</span> a las <span className="text-slate-900 font-bold">{bookedTime}</span> (Hora de El Salvador).
                  </p>
                  <p className="text-[11px] text-slate-500 leading-normal max-w-xs mt-2">
                    Te enviaremos los detalles del enlace web y recordatorios prioritarios vía <span className="text-cyan-600 font-extrabold uppercase">{contactMethod}</span> y por correo electrónico. ¡Tu PYME está a un paso de ganar orden total!
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-3.5 font-sans text-slate-600">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4.5 w-4.5 text-cyan-600" />
                  <h4 className="text-sm font-bold text-slate-900 font-display uppercase tracking-wider">Agendar Asesoría de Datos</h4>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Reserva una llamada o contacto por chat de 15 minutos con un consultor de PRISMA para evaluar tus planillas Excel.
                </p>

                {/* Identification Inputs requested by owner */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono block mb-1">Tu Nombre *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Juan Pérez"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 focus:ring-1 focus:ring-slate-800 rounded-xl p-2 text-xs text-slate-830 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono block mb-1">Tu Correo *</label>
                    <input
                      type="email"
                      required
                      placeholder="Ej. juan@correo.com"
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 focus:ring-1 focus:ring-slate-800 rounded-xl p-2 text-xs text-slate-830 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono block mb-1">Empresa / Negocio (Opcional)</label>
                  <input
                    type="text"
                    placeholder="Ej. Distribuidora El Sol"
                    value={bookingCompany}
                    onChange={(e) => setBookingCompany(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 focus:ring-1 focus:ring-slate-800 rounded-xl p-2 text-xs text-slate-800 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono block mb-1">Elige una Fecha *</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={bookedDate}
                    onChange={(e) => setBookedDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 focus:ring-1 focus:ring-slate-800 rounded-xl p-2 text-xs text-slate-830 uppercase font-mono cursor-pointer outline-none"
                  />
                </div>

                <div>
                  <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono block mb-1">Selecciona un Horario *</label>
                  <select
                    required
                    value={bookedTime}
                    onChange={(e) => setBookedTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 focus:ring-1 focus:ring-slate-800 rounded-xl p-2 text-xs text-slate-830 font-mono cursor-pointer outline-none"
                  >
                    <option value="">Seleccionar horario disponible...</option>
                    <option value="09:00 AM">09:00 AM (Mañana)</option>
                    <option value="11:00 AM">11:00 AM (Recomendado)</option>
                    <option value="02:30 PM">02:30 PM (Tarde)</option>
                    <option value="04:30 PM">04:30 PM (Último turno)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono block mb-1.5">3. Canal de Comunicación de Preferencia</label>
                  <div className="grid grid-cols-3 gap-2 font-sans font-semibold">
                    {[
                      { value: 'whatsapp', label: 'WhatsApp' },
                      { value: 'llamada', label: 'Llamada' },
                      { value: 'correo', label: 'Correo' }
                    ].map((m) => (
                      <button
                        key={m.value}
                        type="button"
                        onClick={() => setContactMethod(m.value as any)}
                        className={`py-2 px-1 text-[11px] rounded-xl border transition-all cursor-pointer text-center ${
                          contactMethod === m.value
                            ? 'bg-slate-900 border-slate-900 text-white font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-350'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 hover:bg-slate-850 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer border border-transparent font-sans uppercase tracking-wider"
                  >
                    Confirmar Reserva de Asesoría
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Persistent floating indicator / Prompt for Recommender (AI) */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xs opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-250 animate-pulse"></div>
          <button
            onClick={() => {
              scrollToSection('showcase-section');
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent('switch-tab-recommender'));
              }, 120);
            }}
            className="relative flex items-center gap-2 px-4.5 py-3 bg-slate-950 border border-slate-800 rounded-full text-xs text-white font-semibold cursor-pointer shadow-2xl hover:scale-103 transition-all font-sans"
          >
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>¿Saber qué planilla o dashboard necesitas? No adivines</span>
            <span className="px-2 py-0.5 bg-cyan-600 text-[8.5px] font-black uppercase text-white rounded-md tracking-wider">PROBAR IA</span>
          </button>
        </div>
      </div>

    </div>
  );
}
