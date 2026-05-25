import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Maximize2, 
  Terminal, 
  X, 
  CornerDownLeft, 
  Volume2, 
  HelpCircle,
  HelpCircle as QuestionIcon
} from 'lucide-react';
import { Message } from '../types';

export default function InteractiveCopilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Saludos. Soy FinPilot AI, tu analista y consultor estratégico residente. Estoy configurado con la base de conocimientos empresariales de PRISMA. ¿En qué vector de tu planificación de negocio quieres profundizar hoy? Puedo evaluar tu CAC, proyectar retornos o estructurar planes de automatización.',
      timestamp: 'Ahora'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeContext, setActiveContext] = useState<string>('B2B SaaS / General');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll inside box
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      // Direct post to Express API route proxying Gemini
      const response = await fetch('/api/chat-copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          history: messages.map(m => ({ role: m.sender === 'ai' ? 'model' : 'user', text: m.text })),
          context: { businessSector: activeContext, platformName: "PRISMA AI Solutions Suite" }
        })
      });

      const data = await response.json();
      
      const aiReply: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.text || 'Sin respuesta',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiReply]);
    } catch (err) {
      const errorReply: Message = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: 'Error en la conexión con la red neuronal de PRISMA Solutions. Reconectando...',
        timestamp: 'Ahora'
      };
      setMessages(prev => [...prev, errorReply]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestClick = (prompt: string) => {
    setInputText(prompt);
  };

  return (
    <div className="w-full" id="copilot-playground">
      <div className="glass-effect rounded-2xl border border-white/8 overflow-hidden bg-zinc-950 flex flex-col h-[520px] shadow-2xl relative">
        {/* Header bar */}
        <div className="px-5 py-4 border-b border-white/8 bg-zinc-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-blue-600/10 border border-blue-500/30 rounded-lg flex items-center justify-center text-blue-400">
              <Cpu className="h-4 w-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-semibold text-white tracking-wide font-display">FinPilot AI Assistant</h4>
                <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded-full font-mono">
                  v2.8-Core
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-mono">Contexto activo: {activeContext}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 hidden sm:inline-block font-mono">Modo:</span>
            <select
              value={activeContext}
              onChange={(e) => setActiveContext(e.target.value)}
              className="bg-zinc-900 border border-white/5 rounded-md px-2 py-1 text-[10px] text-white focus:outline-none focus:border-blue-500 font-mono"
            >
              <option value="B2B SaaS / General">B2B SaaS / General</option>
              <option value="Retail e-Commerce">Retail e-Commerce</option>
              <option value="Industrial Supply Chain">Industrial Supply Chain</option>
              <option value="Biotech R&D Operations">Biotech R&D Operations</option>
            </select>
          </div>
        </div>

        {/* Central chat messaging area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3.5 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 border ${
                msg.sender === 'user'
                  ? 'bg-zinc-900 border-white/10 text-zinc-300'
                  : 'bg-blue-600/15 border-blue-500/25 text-blue-400'
              }`}>
                {msg.sender === 'user' ? (
                  <User className="h-3.5 w-3.5" />
                ) : (
                  <Bot className="h-3.5 w-3.5" />
                )}
              </div>

              <div className="space-y-1">
                <div className={`rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-zinc-900/50 border border-white/5 text-zinc-200 rounded-tl-none font-sans'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>
                <div className={`text-[9px] text-zinc-500 font-mono px-1 ${
                  msg.sender === 'user' ? 'text-right' : 'text-left'
                }`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3.5 max-w-[85%] mr-auto">
              <div className="h-8 w-8 rounded-full bg-blue-600/15 border border-blue-500/25 text-blue-400 flex items-center justify-center shrink-0">
                <Bot className="h-3.5 w-3.5" />
              </div>
              <div className="bg-zinc-900/50 border border-white/5 rounded-2xl rounded-tl-none p-4 text-xs text-zinc-400 flex items-center gap-1">
                <span className="animate-pulse">FinPilot está computando la respuesta ideal</span>
                <span className="inline-flex gap-0.5">
                  <span className="h-1 w-1 bg-blue-400 rounded-full animate-bounce delay-100"></span>
                  <span className="h-1 w-1 bg-blue-400 rounded-full animate-bounce delay-200"></span>
                  <span className="h-1 w-1 bg-blue-400 rounded-full animate-bounce delay-300"></span>
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggest Actions */}
        <div className="px-5 py-2.5 bg-zinc-950 border-t border-white/5 flex flex-wrap items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider font-mono mr-1">Preguntar:</span>
          {[
            '¿Cómo estructuramos un reporte contable MoM?',
            'Dime cómo mejorar nuestro ratio LTV:CAC',
            'Sugerencias para automatizar facturación'
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSuggestClick(prompt)}
              className="px-2.5 py-1 text-[10px] bg-zinc-900 border border-white/5 hover:border-white/10 text-zinc-400 hover:text-white rounded-md transition-colors whitespace-nowrap"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Floating background glowing orb for luxury tech look */}
        <div className="absolute right-0 top-1/3 -z-10 w-44 h-44 bg-blue-500/5 rounded-full filter blur-[60px] pointer-events-none"></div>

        {/* Chat input box form */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/8 bg-zinc-900/40 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Introduce tu consulta ejecutiva, p.ej. 'Evalúa planes de contingencia para costes de servidor...'"
            className="flex-1 bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 font-sans focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg active:scale-95 shrink-0"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
