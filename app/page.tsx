'use client';

import Link from 'next/link';

const MOVING_ECG_PATH =
  'M0 92 L68 92 L86 84 L105 100 L126 92 L150 92 L164 46 L181 132 L199 92 L238 92 L260 92 L281 80 L302 101 L326 92 L360 92 L392 92 L410 74 L426 124 L444 92 L508 92 L560 92 L578 84 L596 99 L620 92 L650 92 L666 46 L682 132 L700 92 L742 92 L762 92 L783 80 L804 101 L828 92 L862 92 L895 92 L912 72 L928 126 L946 92 L1000 92 L1068 92 L1086 84 L1105 100 L1126 92 L1150 92 L1164 46 L1181 132 L1199 92 L1238 92 L1260 92 L1281 80 L1302 101 L1326 92 L1360 92 L1392 92 L1410 74 L1426 124 L1444 92 L1508 92 L1560 92 L1578 84 L1596 99 L1620 92 L1650 92 L1666 46 L1682 132 L1700 92 L1742 92 L1762 92 L1783 80 L1804 101 L1828 92 L1862 92 L1895 92 L1912 72 L1928 126 L1946 92 L2000 92';

const ECG_BLUE = 'rgb(95, 220, 238)';
const ECG_BLUE_SOFT = 'rgb(17, 95, 128)';
const BACKGROUND_BLUE = 'rgb(4, 22, 31)';

const REPORTS = [
  {
    slug: 'relatorio-executivo-de-atuacao-e-resolucao-de-tickets',
    label: 'Relatório Executivo de Atuação e Resolução de Tickets',
    description: 'Visão executiva de atuação e taxa de resolução por agente N2 — nov/25 a jul/26.',
  },
  {
    slug: 'aging-tickets-sem-concluir',
    label: 'Relatório Executivo de Aging de Tickets em Aberto',
    description: 'Tickets SUPMED em aberto com análise de faixas de aging e priorização.',
  },
  {
    slug: 'tickets-pai-filhos',
    label: 'Major Incident Analysis',
    description: 'Tickets pai com seus filhos agrupados — visão de incidents ativos e concluídos.',
  },
  {
    slug: 'checkout-tickets-criados-por-mes',
    label: 'Checkout Operational Performance',
    description: 'Volume mensal de tickets Checkout e SLA do fluxo GateKeeper.',
  },
  {
    slug: 'supmed-b2b-tratados',
    label: 'B2B Operations Health',
    description: 'Saúde operacional da fila B2B — tickets criados, resolvidos e escalados N3.',
  },
];

export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#0D1117', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ padding: '32px 40px 24px' }}>
        <div style={{
          height: 100,
          borderRadius: 10,
          overflow: 'hidden',
          background: BACKGROUND_BLUE,
          marginBottom: 32,
        }}>
          <svg viewBox="0 0 1000 180" width="100%" height="100%" preserveAspectRatio="none">
            <style>{`
              .ecgTrack { animation: ecgSlide 12s linear infinite; }
              @keyframes ecgSlide { from { transform: translateX(0); } to { transform: translateX(-1000px); } }
            `}</style>
            <defs>
              <pattern id="ecg-grid" width="50" height="30" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 30" fill="none" stroke={ECG_BLUE} strokeWidth="1" opacity="0.16" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="1000" height="180" fill={BACKGROUND_BLUE} />
            <rect x="0" y="0" width="1000" height="180" fill={ECG_BLUE_SOFT} opacity="0.28" />
            <rect x="0" y="0" width="1000" height="180" fill="url(#ecg-grid)" />
            <g className="ecgTrack">
              <path d={MOVING_ECG_PATH} fill="none" stroke={ECG_BLUE} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" opacity="0.24" />
              <path d={MOVING_ECG_PATH} fill="none" stroke={ECG_BLUE} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <circle r="13" fill={ECG_BLUE} opacity="0.18">
                <animateMotion dur="12s" repeatCount="indefinite" path={MOVING_ECG_PATH} />
                <animate attributeName="r" values="10;24;10" dur="0.85s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.1;0.35;0.1" dur="0.85s" repeatCount="indefinite" />
              </circle>
              <circle r="5" fill={ECG_BLUE}>
                <animateMotion dur="12s" repeatCount="indefinite" path={MOVING_ECG_PATH} />
                <animate attributeName="r" values="4;7;4" dur="0.85s" repeatCount="indefinite" />
              </circle>
            </g>
          </svg>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h1 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 700, color: '#E4E4E4EB' }}>
            Operational Governance Center
          </h1>
          <p style={{ margin: 0, fontSize: 13, color: '#E4E4E48D' }}>
            Support N2 Reports &amp; Insights — Escolha o relatório que você quer abrir.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {REPORTS.map((report) => (
            <Link
              key={report.slug}
              href={`/canvas/${report.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                border: '1px solid #30363D',
                borderRadius: 8,
                padding: '14px 18px',
                background: '#161B22',
                cursor: 'pointer',
                transition: 'border-color 0.15s, background 0.15s',
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#58A6FF55';
                  (e.currentTarget as HTMLDivElement).style.background = '#1C2128';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#30363D';
                  (e.currentTarget as HTMLDivElement).style.background = '#161B22';
                }}
              >
                <p style={{ margin: '0 0 3px', fontSize: 14, fontWeight: 500, color: '#E4E4E4EB' }}>
                  {report.label}
                </p>
                <p style={{ margin: 0, fontSize: 12, color: '#E4E4E48D', lineHeight: 1.4 }}>
                  {report.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
