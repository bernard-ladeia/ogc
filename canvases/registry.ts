import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

const registry: Record<string, ComponentType> = {
  'operational-governance-center': dynamic(() => import('./operational-governance-center'), { ssr: false }),
  'acompanhamento-operacao': dynamic(() => import('./acompanhamento-operacao'), { ssr: false }),
  'relatorio-executivo-de-atuacao-e-resolucao-de-tickets': dynamic(() => import('./relatorio-executivo-de-atuacao-e-resolucao-de-tickets'), { ssr: false }),
  'aging-tickets-sem-concluir': dynamic(() => import('./aging-tickets-sem-concluir'), { ssr: false }),
  'tickets-pai-filhos': dynamic(() => import('./tickets-pai-filhos'), { ssr: false }),
  'checkout-tickets-criados-por-mes': dynamic(() => import('./checkout-tickets-criados-por-mes'), { ssr: false }),
  'supmed-b2b-tratados': dynamic(() => import('./supmed-b2b-tratados'), { ssr: false }),
  'supmed-supervisao-agentes': dynamic(() => import('./supmed-supervisao-agentes'), { ssr: false }),
  'supmed-abertos-fechados-mensal': dynamic(() => import('./supmed-abertos-fechados-mensal'), { ssr: false }),
  'supmed-abertos-fechados-mensal-teste': dynamic(() => import('./supmed-abertos-fechados-mensal-teste'), { ssr: false }),
  'supmed-interacoes-2026-equipe-gatekeeper': dynamic(() => import('./supmed-interacoes-2026-equipe-gatekeeper'), { ssr: false }),
  'supmed-filas-semanais': dynamic(() => import('./supmed-filas-semanais'), { ssr: false }),
  'tickets-parados-72h': dynamic(() => import('./tickets-parados-72h'), { ssr: false }),
  'alunos-R1-inativos-15d': dynamic(() => import('./alunos-R1-inativos-15d'), { ssr: false }),
  'suporte-faq-completo': dynamic(() => import('./suporte-faq-completo'), { ssr: false }),
  'ecg-animated-banner-preview': dynamic(() => import('./ecg-animated-banner-preview'), { ssr: false }),
};

export default registry;
