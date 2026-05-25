export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string; // Name of Lucide icon
  details: string[];
}

export interface BenefitItem {
  id: string;
  label: string;
  value: string;
  description: string;
  metricLabel: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  logoType: 'stripe' | 'notion' | 'retool' | 'vercel' | 'scale';
  content: string;
  avatarUrl?: string;
  rating: number;
}

export interface ChartDataPoint {
  period: string;
  value: number;
  projection?: number;
  secondary?: number;
}

export interface ScenarioDataset {
  id: string;
  name: string;
  industry: string;
  metrics: {
    mrr: string;
    cac: string;
    churn: string;
    ltv: string;
    totalAssets?: string;
    growthMoM: string;
  };
  chartData: ChartDataPoint[];
  rawDataSummary: string; // Formatted summary to send to AI
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  tier: 'starter' | 'business' | 'enterprise';
}
