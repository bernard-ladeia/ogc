'use client';

import Link from 'next/link';

const CANVASES = [
  {
    slug: 'operational-governance-center',
    title: 'Operational Governance Center',
    description: 'Painel principal de navegação — atalhos para todos os relatórios N2.',
    category: 'Home',
  },
  {
    slug: 'acompanhamento-operacao',
    title: 'Acompanhamento de Operação',
    description: 'Performance por agente, FCR, tickets resolvidos e interações por período.',
    category: 'Operações',
  },
  {
    slug: 'relatorio-executivo-de-atuacao-e-resolucao-de-tickets',
    title: 'Relatório Executivo — Atuação e Resolução',
    description: 'Visão executiva de atuação e resolução de tickets por equipe.',
    category: 'Executivo',
  },
  {
    slug: 'aging-tickets-sem-concluir',
    title: 'Aging — Tickets Sem Concluir',
    description: 'Tickets em aberto sem conclusão com análise de aging.',
    category: 'Operações',
  },
  {
    slug: 'tickets-pai-filhos',
    title: 'Major Incident Analysis',
    description: 'Análise de tickets pai/filho para incidents de alta severidade.',
    category: 'Incidents',
  },
  {
    slug: 'checkout-tickets-criados-por-mes',
    title: 'Checkout Operational Performance',
    description: 'Tickets criados e resolvidos mensalmente na fila de Checkout.',
    category: 'Checkout',
  },
  {
    slug: 'supmed-b2b-tratados',
    title: 'B2B Operations Health',
    description: 'Saúde operacional da fila B2B com histórico de tratamento.',
    category: 'B2B',
  },
  {
    slug: 'supmed-supervisao-agentes',
    title: 'Supervisão de Agentes SUPMED',
    description: 'Dashboard de supervisão dos agentes com tickets ativos por agente.',
    category: 'Supervisão',
  },
  {
    slug: 'supmed-abertos-fechados-mensal',
    title: 'SUPMED — Abertos e Fechados Mensal',
    description: 'Volume mensal de tickets abertos e fechados no SUPMED.',
    category: 'SUPMED',
  },
  {
    slug: 'supmed-abertos-fechados-mensal-teste',
    title: 'SUPMED — Abertos e Fechados (Teste)',
    description: 'Versão em teste do relatório mensal SUPMED.',
    category: 'SUPMED',
  },
  {
    slug: 'supmed-interacoes-2026-equipe-gatekeeper',
    title: 'SUPMED — Interações 2026 Gatekeeper',
    description: 'Interações da equipe Gatekeeper em 2026.',
    category: 'SUPMED',
  },
  {
    slug: 'supmed-filas-semanais',
    title: 'SUPMED — Filas Semanais',
    description: 'Volume semanal por fila no SUPMED.',
    category: 'SUPMED',
  },
  {
    slug: 'tickets-parados-72h',
    title: 'Tickets Parados +72h',
    description: 'Tickets sem atualização há mais de 72 horas.',
    category: 'Operações',
  },
  {
    slug: 'alunos-R1-inativos-15d',
    title: 'Alunos R1 Inativos +15d',
    description: 'Alunos R1 sem atividade nos últimos 15 dias.',
    category: 'Educação',
  },
  {
    slug: 'suporte-faq-completo',
    title: 'Suporte — FAQ Completo',
    description: 'Base de conhecimento e FAQ do time de suporte.',
    category: 'Suporte',
  },
  {
    slug: 'ecg-animated-banner-preview',
    title: 'ECG Animated Banner',
    description: 'Preview do banner animado ECG.',
    category: 'Design',
  },
];

const categories = Array.from(new Set(CANVASES.map((c) => c.category)));

const CATEGORY_COLORS: Record<string, string> = {
  Home: '#599CE7',
  Operações: '#3FA266',
  Executivo: '#9386F2',
  Incidents: '#E05C6E',
  Checkout: '#F1B467',
  B2B: '#81A1C1',
  Supervisão: '#D08770',
  SUPMED: '#7BAFE9',
  Educação: '#B48EAD',
  Suporte: '#7DCAB0E0',
  Design: '#8888A8',
};

export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#141414' }}>
      <header style={{
        padding: '24px 32px 16px',
        borderBottom: '1px solid #E4E4E433',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2 L18 6 L18 14 L10 18 L2 14 L2 6 Z" stroke="#599CE7" strokeWidth="1.5" fill="none" />
          <path d="M4 10 L7 8.5 L9 11.5 L11.5 7.5 L14 10.5 L16 10" stroke="#599CE7" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div>
          <h1 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: '#E4E4E4EB' }}>
            Operational Governance Center
          </h1>
          <p style={{ margin: 0, fontSize: 12, color: '#E4E4E48D' }}>
            {CANVASES.length} dashboards disponíveis
          </p>
        </div>
      </header>

      <div style={{ padding: '24px 32px' }}>
        {categories.map((category) => {
          const items = CANVASES.filter((c) => c.category === category);
          return (
            <section key={category} style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: CATEGORY_COLORS[category] ?? '#599CE7',
                  flexShrink: 0,
                }} />
                <h2 style={{ margin: 0, fontSize: 13, fontWeight: 500, color: '#E4E4E48D', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {category}
                </h2>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 12,
              }}>
                {items.map((canvas) => (
                  <Link
                    key={canvas.slug}
                    href={`/canvas/${canvas.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div style={{
                      border: '1px solid #E4E4E433',
                      borderRadius: 6,
                      padding: '12px 16px',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s, background 0.15s',
                      background: '#181818',
                    }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = '#E4E4E44D';
                        (e.currentTarget as HTMLDivElement).style.background = '#1E1E1E';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = '#E4E4E433';
                        (e.currentTarget as HTMLDivElement).style.background = '#181818';
                      }}
                    >
                      <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 500, color: '#E4E4E4EB' }}>
                        {canvas.title}
                      </p>
                      <p style={{ margin: 0, fontSize: 12, color: '#E4E4E48D', lineHeight: 1.4 }}>
                        {canvas.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
