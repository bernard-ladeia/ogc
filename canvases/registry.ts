import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

const registry: Record<string, ComponentType> = {
  'operational-governance-center': dynamic(() => import('./operational-governance-center'), { ssr: false }),
  'relatorio-executivo-de-atuacao-e-resolucao-de-tickets': dynamic(() => import('./relatorio-executivo-de-atuacao-e-resolucao-de-tickets'), { ssr: false }),
  'aging-tickets-sem-concluir': dynamic(() => import('./aging-tickets-sem-concluir'), { ssr: false }),
  'tickets-pai-filhos': dynamic(() => import('./tickets-pai-filhos'), { ssr: false }),
  'checkout-tickets-criados-por-mes': dynamic(() => import('./checkout-tickets-criados-por-mes'), { ssr: false }),
  'supmed-b2b-tratados': dynamic(() => import('./supmed-b2b-tratados'), { ssr: false }),
};

export default registry;
