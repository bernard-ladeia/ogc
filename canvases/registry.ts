import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

const registry: Record<string, ComponentType> = {
  'operational-governance-center': dynamic(() => import('./operational-governance-center')),
  'acompanhamento-operacao': dynamic(() => import('./acompanhamento-operacao')),
  'relatorio-executivo-de-atuacao-e-resolucao-de-tickets': dynamic(() => import('./relatorio-executivo-de-atuacao-e-resolucao-de-tickets')),
  'aging-tickets-sem-concluir': dynamic(() => import('./aging-tickets-sem-concluir')),
  'tickets-pai-filhos': dynamic(() => import('./tickets-pai-filhos')),
  'checkout-tickets-criados-por-mes': dynamic(() => import('./checkout-tickets-criados-por-mes')),
  'supmed-b2b-tratados': dynamic(() => import('./supmed-b2b-tratados')),
  'supmed-supervisao-agentes': dynamic(() => import('./supmed-supervisao-agentes')),
  'supmed-abertos-fechados-mensal': dynamic(() => import('./supmed-abertos-fechados-mensal')),
  'supmed-abertos-fechados-mensal-teste': dynamic(() => import('./supmed-abertos-fechados-mensal-teste')),
  'supmed-interacoes-2026-equipe-gatekeeper': dynamic(() => import('./supmed-interacoes-2026-equipe-gatekeeper')),
  'supmed-filas-semanais': dynamic(() => import('./supmed-filas-semanais')),
  'tickets-parados-72h': dynamic(() => import('./tickets-parados-72h')),
  'alunos-R1-inativos-15d': dynamic(() => import('./alunos-R1-inativos-15d')),
  'suporte-faq-completo': dynamic(() => import('./suporte-faq-completo')),
  'ecg-animated-banner-preview': dynamic(() => import('./ecg-animated-banner-preview')),
};

export default registry;
