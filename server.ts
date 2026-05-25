import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const currentDirname = typeof __dirname !== 'undefined'
  ? __dirname
  : path.dirname(fileURLToPath(import.meta.url));

// Initialize Gemini SDK securely using backend-only environment variable
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  // Middleware
  app.use(express.json());

  // API Endpoints: Core AI Services

  // 1. Chat Copilot
  app.post('/api/chat-copilot', async (req, res) => {
    try {
      const { message, history, context } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      if (!ai) {
        // Safe fallback description if API key is not yet set
        return res.json({
          text: `[Demo Mode] PRISMA FinPilot has received your prompt: "${message}". Connect your GEMINI_API_KEY in Settings > Secrets to enable live high-fidelity responses. \n\nHere is a simulated response:\nBased on the analysis of the current financial datasets for PRISMA, we project a 15.4% expansion in operational efficiency and a decrease in customer acquisition costs by optimizing key advertising spend over the next quarter. We recommend focusing resources on high-yield software automation.`,
          simulated: true
        });
      }

      const systemInstruction = `
        You are "FinPilot AI", an elite executive-class financial and business intelligent copilot created by PRISMA Solutions.
        The user is consulting you on business automation, productivity, or financial data.
        You speak in a highly professional, sharp, corporate advisory tone (like an enterprise strategic consultant or a senior Quant from Palantir/Stripe).
        Address technical metrics, suggest strategic action points, and format your output beautifully inside Clean Markdown with bullet points or subtle tables where relevant.
        Focus context:
        ${JSON.stringify(context || {})}
      `;

      // Build chat or generate contents directly. Let's use ai.models.generateContent for simplicity and high reliability.
      const promptCombined = `
        History: ${JSON.stringify(history || [])}
        Current User Query: ${message}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: promptCombined,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({
        text: response.text,
        simulated: false
      });
    } catch (error: any) {
      console.error('Error in chat-copilot API:', error);
      res.status(500).json({ error: 'Failed to process copilot query: ' + error.message });
    }
  });

  // 2. Excel/Financial Data Analyzer
  app.post('/api/analyze-data', async (req, res) => {
    try {
      const { datasetName, rawData, query } = req.body;

      if (!ai) {
        return res.json({
          summary: `[Demo Mode] AI analysis for ${datasetName || 'uploaded data'}. To activate live, state-of-the-art AI summaries, please provide a valid GEMINI_API_KEY in AI Studio's Secrets panel. \n\nMocked Insights:\n- Customer churn reduced by 4.2% based on retention strategies.\n- Monthly Recurring Revenue (MRR) demonstrates strong seasonal growth (+12% MoM).\n- Recommendation: Standardize accounting integrations across subsidiary endpoints.`,
          metrics: {
            confidence: "98.4%",
            anomaliesDetected: 0,
            recommendedLevers: ["Optimizar CAC", "Automatizar conciliación"]
          },
          simulated: true
        });
      }

      const prompt = `
        Analyze the following financial spreadsheet/product telemetry dataset called "${datasetName || 'Executive Insights'}". 
        Dataset metrics/content:
        ${JSON.stringify(rawData || {})}

        Specific business question to answer:
        "${query || 'Give me a comprehensive executive summary of this data, highlight key trends, anomalies, and structural forecasts.'}"

        Respond with content that includes structured sections:
        - Executive Summary (Brief, impactful)
        - Key Performance Indicators (analyzed or derived)
        - Crucial anomalies or patterns detected
        - Strategic recommendation list (with estimated ROI)
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          systemInstruction: "You are the head of AI Analytics at PRISMA Solutions. You write highly analytical, concise executive notes on complex CSV and Excel business summaries. Avoid empty introductory boilerplate.",
          temperature: 0.4
        }
      });

      res.json({
        summary: response.text,
        simulated: false
      });
    } catch (error: any) {
      console.error('Error in analyze-data API:', error);
      res.status(500).json({ error: 'Failed to analyze: ' + error.message });
    }
  });

  // 3. SMB Solutions Recommender
  app.post('/api/recommend-solutions', async (req, res) => {
    try {
      const { businessDescription } = req.body;

      if (!businessDescription || businessDescription.trim().length === 0) {
        return res.status(400).json({ error: 'Business description is required' });
      }

      const lowerDesc = businessDescription.toLowerCase();

      // Premium static fallback database for Salvadoran SMBs to ensure flawless speed and accuracy if no key is present or on API failure
      const generateLocalFallback = () => {
        if (lowerDesc.includes('pupu') || lowerDesc.includes('comida') || lowerDesc.includes('restaurante') || lowerDesc.includes('pupuseria')) {
          return {
            title: 'Solución de Control Diario para Alimentos & Bebidas',
            plan: 'Plan Crecimiento ($44/mes) - Ideal para ventas locales y envíos',
            excelStructure: [
              { col: 'Fecha', desc: 'Día del registro (ej. 25/May/2026)' },
              { col: 'Mesa / Canal', desc: 'Canal de venta: Mesa, Domicilio, WhatsApp, Hugo/PedidosYa' },
              { col: 'Ingreso total', desc: 'Monto cobrado (efectivo, tarjeta, Chivo)' },
              { col: 'Caja Chica', desc: 'Compras menores del día: verduras, gas, ingredientes rápidos' },
              { col: 'Proveedor mayor', desc: 'Facturas de carne, lácteos, harinas' }
            ],
            recommandedActions: [
              'Registra diariamente las compras de emergencia para controlar tus costos reales de platillo.',
              'Separa estrictamente el dinero en caja del comercio del dinero de tus gastos personales.',
              'Monitorea el porcentaje real de costos de ingredientes para cuidar tu margen ideal de comida.'
            ],
            taxTip: 'Esta estructura te ayudará a declarar tus impuestos de IVA local con tu contador sin retrasos, separando las ventas exentas de las gravadas.'
          };
        } else if (lowerDesc.includes('ferre') || lowerDesc.includes('material') || lowerDesc.includes('sucursal') || lowerDesc.includes('al por mayor')) {
          return {
            title: 'Control de Inventarios y Cuentas por Cobrar de Ferretería',
            plan: 'Plan Multi-Sucursal ($79/mes) - Control de bodegas y sucursales',
            excelStructure: [
              { col: 'Fecha', desc: 'Días de operación local' },
              { col: 'Nº Factura', desc: 'Control correlativo de facturas entregadas a clientes' },
              { col: 'Cliente / Crédito', desc: 'Nombre del contratista o cliente para saldos pendientes' },
              { col: 'Ingreso', desc: 'Abonos recibidos de créditos antiguos o ventas de contado' },
              { col: 'Egreso / Flete', desc: 'Pagos de transporte o compras de mayoreo al distribuidor' }
            ],
            recommandedActions: [
              'Implementa una alerta de stock minimo en tus planillas para no perder ventas en productos de alta rotación.',
              'Lleva un registro estricto de saldos de clientes con crédito activo a más de 15 días.',
              'Programa un cuadre de inventario físico mensual en cada una de tus bodegas locales.'
            ],
            taxTip: 'Conserva cada comprobante de crédito fiscal emitido por distribuidores nacionales para reducir tus impuestos declarados ante Hacienda.'
          };
        } else {
          return {
            title: 'Solución Personalizada de Optimización Operativa',
            plan: 'Plan Emprendedor ($19/mes) - Sencillez absoluta de arranque',
            excelStructure: [
              { col: 'Fecha', desc: 'Día del registro (ej. 25/Mayo)' },
              { col: 'Concepto', desc: 'Explicación del ingreso o gasto de la jornada' },
              { col: 'Ingreso', desc: 'Ventas brutas del día' },
              { col: 'Egreso', desc: 'Pagos corrientes de alquiler, planillas, servicios' },
              { col: 'Saldo Disponible', desc: 'Calcular neta sobrante en caja' }
            ],
            recommandedActions: [
              'Dedica 10 minutos al finalizar la jornada a rellenar tu planilla de caja.',
              'Centraliza tus ingresos por transferencias electrónicas antes de fin de semana.',
              'Establece un límite de caja chica mensual para gastos operativos menores.'
            ],
            taxTip: 'Ideal para entregar un consolidado ordenado a un contador independiente salvadoreño al final de cada mes fiscal.'
          };
        }
      };

      if (!ai) {
        return res.json(generateLocalFallback());
      }

      const prompt = `
        El usuario nos describe su pequeña o mediana empresa (PYME) en El Salvador:
        "${businessDescription}"

        Teniendo en cuenta los retos de las PYMES locales (facturación, control de caja diario, cuentas por cobrar, cuadre de caja chica, declaración de IVA con contadores externos, stock en bodegas locales), necesitamos recomendarle una solución simple, estructurada y en español humilde y directo, libre de tecnicismos excesivos o términos exagerados de Inteligencia Artificial ("AI slop").

        Recomienda:
        1. "title": Un título corto de la solución adaptada a su negocio (máximo 60 caracteres).
        2. "plan": Cuál plan de PRISMA es el ideal para arrancar. Los planes son:
           - Plan Emprendedor ($19/mes)
           - Plan Crecimiento ($44/mes)
           - Plan Multi-Sucursal ($79/mes)
           - Plan Premium Plus ($129/mes)
        3. "excelStructure": Una lista de 4 a 5 columnas recomendadas para su planilla de Excel/Google Sheets, descritas en formato breve.
        4. "recommandedActions": Una lista de 3 consejos o acciones sencillas y prácticas que el dueño del negocio puede hacer de inmediato para poner orden.
        5. "taxTip": Una recomendación fiscal relevante para El Salvador (por ejemplo, cómo ayuda para el balance, IVA, Hacienda o el contador).

        Deberás responder ÚNICAMENTE con un objeto JSON válido con la siguiente estructura exacta:
        {
          "title": "...",
          "plan": "Nombre del Plan e indicación breve",
          "excelStructure": [
            { "col": "NombreColumna1", "desc": "Descripción corta" },
            { "col": "NombreColumna2", "desc": "Descripción corta" }
          ],
          "recommandedActions": [
            "...",
            "...",
            "..."
          ],
          "taxTip": "..."
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          systemInstruction: "You are an elite, practical B2B business consultant specializing in salvadoran small and medium businesses (PYMES). You speak in humble, high-fidelity business Spanish and return strictly pure JSON conforming to the requested schema. Do not output any Markdown block markers like ```json or any introductory text.",
          temperature: 0.3,
          responseMimeType: "application/json"
        }
      });

      const responseText = response.text || '';
      // Sanitize potential markdown wrappers if the model generated them despite instructions
      const cleanJsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJsonStr);

      res.json(parsed);

    } catch (error: any) {
      console.error('Error in recommend-solutions API:', error);
      // Fallback in case of parsing or generation failure
      res.status(500).json({
        title: 'Solución Práctica de Control de Caja',
        plan: 'Plan Crecimiento ($44/mes)',
        excelStructure: [
          { col: 'Fecha', desc: 'Día del registro de datos' },
          { col: 'Ingreso', desc: 'Ingresos diarios del comercio' },
          { col: 'Egreso', desc: 'Gastos de proveedores o caja chica' },
          { col: 'Sucursal', desc: 'Ubicación que generó el movimiento' }
        ],
        recommandedActions: [
          'Mantén tus registros al día dedicando 10 minutos al final de cada jornada.',
          'Usa una cuenta separada para transacciones personales y las del negocio.'
        ],
        taxTip: 'Ayuda a que tu contador presente el IVA a tiempo con Hacienda.'
      });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PRISMA Corporate Server launched securely at http://localhost:${PORT}`);
  });
}

startServer();
