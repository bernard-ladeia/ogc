import {
  Button,
  Card,
  CardBody,
  CardHeader,
  H1,
  Stack,
  Text,
  useCanvasAction,
} from 'cursor/canvas';

const SNAPSHOT_AT = '13/07/2026 17:54';

const REPORT_CANVASES = [
  {
    label: 'Relatório Executivo de Atuação e Resolução de Tickets',
    path: 'C:/Users/BernardLadeia/.cursor/projects/d-Medcof-HealthPanel-Project/canvases/relatorio-executivo-de-atuacao-e-resolucao-de-tickets.canvas.tsx',
  },
  {
    label: 'Relatório Executivo de Aging de Tickets em Aberto',
    path: 'C:/Users/BernardLadeia/.cursor/projects/d-Medcof-HealthPanel-Project/canvases/aging-tickets-sem-concluir.canvas.tsx',
  },
  {
    label: 'Major Incident Analysis',
    path: 'C:/Users/BernardLadeia/.cursor/projects/d-Medcof-HealthPanel-Project/canvases/tickets-pai-filhos.canvas.tsx',
  },
  {
    label: 'Checkout Operational Performance',
    path: 'C:/Users/BernardLadeia/.cursor/projects/d-Medcof-HealthPanel-Project/canvases/checkout-tickets-criados-por-mes.canvas.tsx',
  },
  {
    label: 'B2B Operations Health',
    path: 'C:/Users/BernardLadeia/.cursor/projects/d-Medcof-HealthPanel-Project/canvases/supmed-b2b-tratados.canvas.tsx',
  },
];

const ECG_PATH =
  'M0 92 L68 92 L86 84 L105 100 L126 92 L150 92 L164 46 L181 132 L199 92 L238 92 L260 92 L281 80 L302 101 L326 92 L360 92 L392 92 L410 74 L426 124 L444 92 L508 92 L560 92 L578 84 L596 99 L620 92 L650 92 L666 46 L682 132 L700 92 L742 92 L762 92 L783 80 L804 101 L828 92 L862 92 L895 92 L912 72 L928 126 L946 92 L1000 92';

const MOVING_ECG_PATH =
  'M0 92 L68 92 L86 84 L105 100 L126 92 L150 92 L164 46 L181 132 L199 92 L238 92 L260 92 L281 80 L302 101 L326 92 L360 92 L392 92 L410 74 L426 124 L444 92 L508 92 L560 92 L578 84 L596 99 L620 92 L650 92 L666 46 L682 132 L700 92 L742 92 L762 92 L783 80 L804 101 L828 92 L862 92 L895 92 L912 72 L928 126 L946 92 L1000 92 L1068 92 L1086 84 L1105 100 L1126 92 L1150 92 L1164 46 L1181 132 L1199 92 L1238 92 L1260 92 L1281 80 L1302 101 L1326 92 L1360 92 L1392 92 L1410 74 L1426 124 L1444 92 L1508 92 L1560 92 L1578 84 L1596 99 L1620 92 L1650 92 L1666 46 L1682 132 L1700 92 L1742 92 L1762 92 L1783 80 L1804 101 L1828 92 L1862 92 L1895 92 L1912 72 L1928 126 L1946 92 L2000 92';

const ECG_BLUE = 'rgb(95, 220, 238)';
const ECG_BLUE_SOFT = 'rgb(17, 95, 128)';
const BACKGROUND_BLUE = 'rgb(4, 22, 31)';

/**
 * Renderiza o painel inicial com atalhos dos relatórios N2.
 * @returns layout de navegação principal.
 */
export default function OperationalGovernanceCenter() {
  const dispatch = useCanvasAction();

  return (
    <Stack gap={16} style={{ padding: 24, maxWidth: 980 }}>
      <Stack gap={4} style={{ alignItems: 'center' }}>
        <H1>Operational Governance Center</H1>
        <Text tone="secondary" size="small">
          Snapshot local atualizado em {SNAPSHOT_AT}
        </Text>
      </Stack>

      <Card>
        <CardBody>
          <div
            style={{
              height: 96,
              borderRadius: 8,
              overflow: 'hidden',
              background: BACKGROUND_BLUE,
            }}
          >
            <svg viewBox="0 0 1000 180" width="100%" height="100%" preserveAspectRatio="none">
              <style>
                {`
                  .ecgTrack {
                    animation: ecgSlide 12s linear infinite;
                  }

                  @keyframes ecgSlide {
                    from { transform: translateX(0); }
                    to { transform: translateX(-1000px); }
                  }
                `}
              </style>

              <defs>
                <pattern id="ecg-grid" width="50" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 30" fill="none" stroke={ECG_BLUE} strokeWidth="1" opacity="0.16" />
                </pattern>
              </defs>

              <rect x="0" y="0" width="1000" height="180" fill={BACKGROUND_BLUE} />
              <rect x="0" y="0" width="1000" height="180" fill={ECG_BLUE_SOFT} opacity="0.28" />
              <rect x="0" y="0" width="1000" height="180" fill="url(#ecg-grid)" />
              <rect x="0" y="0" width="1000" height="48" fill="rgb(3, 15, 22)" opacity="0.32" />
              <rect x="0" y="62" width="1000" height="58" fill={ECG_BLUE} opacity="0.08" />
              <rect x="0" y="132" width="1000" height="48" fill="rgb(3, 15, 22)" opacity="0.32" />

              <g className="ecgTrack">
                <path
                  d={MOVING_ECG_PATH}
                  fill="none"
                  stroke={ECG_BLUE}
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.24"
                />
                <path
                  d={MOVING_ECG_PATH}
                  fill="none"
                  stroke={ECG_BLUE}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
        </CardBody>
      </Card>

      <Card>
        <CardHeader>Support N2 Reports & Insights</CardHeader>
        <CardBody>
          <Stack gap={10}>
            <Text tone="secondary" size="small">
              Escolha o relatório que você quer abrir.
            </Text>
            {REPORT_CANVASES.map((report) => (
              <div key={report.path}>
                <Button
                  variant="secondary"
                  onClick={() => dispatch({ type: 'openFile', path: report.path })}
                >
                  {report.label}
                </Button>
              </div>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
}
