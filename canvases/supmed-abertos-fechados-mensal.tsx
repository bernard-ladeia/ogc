import {
  BarChart,
  Callout,
  Card,
  CardBody,
  CardHeader,
  colorPalette,
  Divider,
  Grid,
  H1,
  H2,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  useHostTheme,
} from 'cursor/canvas';

type MonthRow = {
  key: string;
  label: string;
  shortLabel: string;
  abertos: number;
  concluido: number;
  cancelado: number;
  interacoesN2: number;
};

type LabeledBarSeries = { name: string; data: number[]; color: string };

function LabeledGroupedBarChart({
  categories,
  series,
  height = 360,
}: {
  categories: string[];
  series: LabeledBarSeries[];
  height?: number;
}) {
  const theme = useHostTheme();

  const PAD_L = 32;
  const PAD_R = 24;
  const PAD_T = 36;
  const PAD_B = 56;
  const BAR_W = 30;
  const BAR_GAP = 6;
  const GROUP_GAP = 36;

  const groupCount = categories.length;
  const seriesCount = series.length;
  const groupW = seriesCount * BAR_W + (seriesCount - 1) * BAR_GAP;
  const innerW = groupCount * groupW + (groupCount - 1) * GROUP_GAP;
  const width = PAD_L + PAD_R + innerW;
  const chartH = height - PAD_T - PAD_B;
  const max = Math.max(...series.flatMap((s) => s.data));
  const niceMax = Math.ceil(max / 100) * 100;

  return (
    <Stack gap={12}>
      <Row gap={20} wrap>
        {series.map((s) => (
          <div key={s.name}>
            <Row gap={6} align="center">
              <div style={{ width: 12, height: 12, background: s.color, borderRadius: 2 }} />
              <Text size="small">{s.name}</Text>
            </Row>
          </div>
        ))}
      </Row>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block' }}
      >
        <line
          x1={PAD_L}
          y1={PAD_T + chartH}
          x2={width - PAD_R}
          y2={PAD_T + chartH}
          stroke={theme.stroke.secondary}
          strokeWidth={1}
        />
        {categories.map((cat, gi) => {
          const groupX = PAD_L + gi * (groupW + GROUP_GAP);
          return (
            <g key={cat}>
              {series.map((s, si) => {
                const v = s.data[gi];
                const barH = niceMax > 0 ? (v / niceMax) * chartH : 0;
                const x = groupX + si * (BAR_W + BAR_GAP);
                const y = PAD_T + (chartH - barH);
                return (
                  <g key={s.name}>
                    <rect x={x} y={y} width={BAR_W} height={barH} fill={s.color} rx={2} />
                    <text
                      x={x + BAR_W / 2}
                      y={y - 6}
                      textAnchor="middle"
                      fontSize={11}
                      fontWeight={600}
                      fill={theme.text.primary}
                    >
                      {v.toLocaleString('pt-BR')}
                    </text>
                  </g>
                );
              })}
              <text
                x={groupX + groupW / 2}
                y={height - 32}
                textAnchor="middle"
                fontSize={12}
                fill={theme.text.secondary}
              >
                {cat}
              </text>
            </g>
          );
        })}
      </svg>
    </Stack>
  );
}

const DATA: MonthRow[] = [
  { key: 'out25', label: 'Outubro/2025', shortLabel: 'Out/25', abertos: 19, concluido: 12, cancelado: 0, interacoesN2: 0 },
  { key: 'nov25', label: 'Novembro/2025', shortLabel: 'Nov/25', abertos: 66, concluido: 26, cancelado: 0, interacoesN2: 0 },
  { key: 'dez25', label: 'Dezembro/2025', shortLabel: 'Dez/25', abertos: 154, concluido: 108, cancelado: 0, interacoesN2: 0 },
  { key: 'jan26', label: 'Janeiro/2026', shortLabel: 'Jan/26', abertos: 607, concluido: 394, cancelado: 0, interacoesN2: 835 },
  { key: 'fev26', label: 'Fevereiro/2026', shortLabel: 'Fev/26', abertos: 289, concluido: 182, cancelado: 1, interacoesN2: 874 },
  { key: 'mar26', label: 'Março/2026', shortLabel: 'Mar/26', abertos: 379, concluido: 330, cancelado: 2, interacoesN2: 1155 },
  { key: 'abr26', label: 'Abril/2026', shortLabel: 'Abr/26', abertos: 468, concluido: 279, cancelado: 14, interacoesN2: 1069 },
  { key: 'mai26', label: 'Maio/2026', shortLabel: 'Mai/26', abertos: 879, concluido: 1216, cancelado: 13, interacoesN2: 684 },
  { key: 'jun26', label: 'Junho/2026 (parcial 01–15/06)', shortLabel: 'Jun/26', abertos: 653, concluido: 326, cancelado: 8, interacoesN2: 161 },
];

const fechadosOf = (m: MonthRow) => m.concluido + m.cancelado;

const TOTAL_ABERTOS = DATA.reduce((s, m) => s + m.abertos, 0);
const TOTAL_FECHADOS = DATA.reduce((s, m) => s + fechadosOf(m), 0);
const TOTAL_CONCLUIDO = DATA.reduce((s, m) => s + m.concluido, 0);
const TOTAL_CANCELADO = DATA.reduce((s, m) => s + m.cancelado, 0);
const TOTAL_INTERACOES = DATA.reduce((s, m) => s + m.interacoesN2, 0);
const NET = TOTAL_ABERTOS - TOTAL_FECHADOS;

const CATEGORIES = DATA.map((m) => m.shortLabel);

export default function SupmedAbertosFechadosMensal() {
  const theme = useHostTheme();

  return (
    <Stack gap={24} style={{ padding: 32, maxWidth: 1180, margin: '0 auto' }}>
      <Stack gap={8}>
        <Row gap={12} align="center">
          <H1>SUPMED · Tickets Abertos vs Fechados</H1>
          <Pill tone="neutral">Out/2025 → Hoje</Pill>
        </Row>
        <Text tone="secondary">
          Fonte: Jira REST API (JSM) · Projeto SUPMED · Janela: 16/10/2025 → 15/06/2026.
          <br />
          <Text weight="semibold">Fechado</Text> = status final <Text>`Concluído`</Text> + <Text>`Cancelado`</Text>,
          janela mensal via <Text>`statusCategoryChangedDate`</Text>. <Text weight="semibold">Aberto</Text> = <Text>`created`</Text> no mês.
        </Text>
      </Stack>

      <Grid columns={3} gap={16}>
        <Stat label="Total abertos" value={TOTAL_ABERTOS.toLocaleString('pt-BR')} tone="info" />
        <Stat
          label="Total fechados"
          value={TOTAL_FECHADOS.toLocaleString('pt-BR')}
          tone="success"
        />
        <Stat
          label={NET > 0 ? 'Saldo (backlog cresceu)' : 'Saldo (backlog reduziu)'}
          value={NET >= 0 ? `+${NET.toLocaleString('pt-BR')}` : NET.toLocaleString('pt-BR')}
          tone={NET > 0 ? 'warning' : 'success'}
        />
      </Grid>

      <Card>
        <CardHeader>Volume mensal — abertos vs fechados</CardHeader>
        <CardBody>
          <BarChart
            categories={CATEGORIES}
            series={[
              { name: 'Abertos', data: DATA.map((m) => m.abertos), tone: 'info' },
              { name: 'Fechados', data: DATA.map(fechadosOf), tone: 'success' },
            ]}
            height={320}
          />
          <Text tone="tertiary" size="small">
            Eixo X: mês · Eixo Y: quantidade de tickets · Junho é parcial até 15/06.
          </Text>
        </CardBody>
      </Card>

      <Stack gap={8}>
        <H2>Detalhamento mensal</H2>
        <Table
          headers={['Mês', 'Abertos', 'Fechados', 'Saldo', 'Taxa de Resolução']}
          columnAlign={['left', 'right', 'right', 'right', 'right']}
          rows={DATA.map((m) => {
            const fechados = fechadosOf(m);
            const saldo = m.abertos - fechados;
            const taxa = m.abertos > 0 ? (fechados / m.abertos) * 100 : 0;
            return [
              m.label,
              m.abertos.toLocaleString('pt-BR'),
              fechados.toLocaleString('pt-BR'),
              saldo >= 0 ? `+${saldo}` : `${saldo}`,
              `${taxa.toFixed(1)}%`,
            ];
          })}
          rowTone={DATA.map((m) => {
            const saldo = m.abertos - fechadosOf(m);
            if (saldo < 0) return 'success';
            if (saldo > 150) return 'warning';
            return undefined;
          })}
          striped
        />
      </Stack>

      <Callout tone="success" title="Resultados pós-oficina de Março">
        Desde a <Text weight="semibold">oficina realizada em Março/2026</Text> estamos colhendo os frutos:
        melhora consistente na taxa de resolução e redução do backlog mês a mês.
        Em Maio (parcial até 28/05) foram fechados <Text weight="semibold">1.229 tickets</Text> contra
        <Text weight="semibold"> 879</Text> abertos — saldo de <Text weight="semibold">−350</Text>,
        consolidando o esforço de desmonte de backlog iniciado após a oficina.
      </Callout>

      <Divider />

      <Stack gap={8}>
        <Row gap={12} align="center">
          <H2>Visão consolidada — Abertos, Fechados e Interações N2</H2>
          <Pill tone="neutral">Mensal · Out/2025 → Hoje</Pill>
        </Row>
        <Text tone="secondary">
          Painel único com as três séries lado a lado: <Text weight="semibold">entrada</Text> (abertos),
          <Text weight="semibold"> vazão</Text> (fechados) e <Text weight="semibold">esforço</Text> (interações N2).
          Regra aplicada neste report: <Text weight="semibold">Interações N2 = comentários do `time-ti-n2` (pode ter mais de 1 por ticket) + resolution note do ticket (se tiver)</Text>.
          Cada <Text>`Comment`</Text> nativo do Jira (público + interno) feito pelo <Text>`time-ti-n2`</Text>
          conta como 1 interação; e cada <Text>`customfield_11799`</Text> preenchido conta +1 para o ticket no mês.
          Mesma métrica <Text>`totalInteractions`</Text> do canvas
          <Text>`supmed-interacoes-2026-equipe-gatekeeper`</Text>, coletada via paginação completa do MCP
          <Text>`user-jira-medcof`</Text> sobre toda a base SUPMED.
        </Text>
      </Stack>

      <Grid columns={3} gap={16}>
        <Stat label="Tickets abertos (período)" value={TOTAL_ABERTOS.toLocaleString('pt-BR')} tone="info" />
        <Stat label="Tickets fechados (período)" value={TOTAL_FECHADOS.toLocaleString('pt-BR')} tone="success" />
        <Stat label="Interações N2 (período)" value={TOTAL_INTERACOES.toLocaleString('pt-BR')} tone="warning" />
      </Grid>

      <Card>
        <CardHeader>Abertos vs Fechados vs Interações N2 — por mês</CardHeader>
        <CardBody>
          <LabeledGroupedBarChart
            categories={CATEGORIES}
            series={[
              { name: 'Tickets abertos', data: DATA.map((m) => m.abertos), color: colorPalette.blue },
              { name: 'Tickets fechados', data: DATA.map(fechadosOf), color: colorPalette.green },
              { name: 'Interações N2', data: DATA.map((m) => m.interacoesN2), color: colorPalette.orange },
            ]}
            height={360}
          />
          <Text tone="tertiary" size="small">
            Barras agrupadas por mês · Valor exibido no topo de cada barra · Junho é parcial até 15/06.
            Outubro–Dezembro/2025 não possuem série
            histórica de interações N2 neste canvas.
          </Text>
        </CardBody>
      </Card>

      <Stack gap={8}>
        <H2>Detalhamento consolidado</H2>
        <Table
          headers={['Mês', 'Abertos', 'Fechados', 'Interações N2', 'Saldo']}
          columnAlign={['left', 'right', 'right', 'right', 'right']}
          rows={DATA.map((m) => {
            const fechados = fechadosOf(m);
            const saldo = m.abertos - fechados;
            return [
              m.label,
              m.abertos.toLocaleString('pt-BR'),
              fechados.toLocaleString('pt-BR'),
              m.interacoesN2.toLocaleString('pt-BR'),
              saldo >= 0 ? `+${saldo}` : `${saldo}`,
            ];
          })}
          rowTone={DATA.map((m) => {
            const saldo = m.abertos - fechadosOf(m);
            if (saldo < 0) return 'success';
            if (saldo > 150) return 'warning';
            return undefined;
          })}
          striped
        />
      </Stack>

      <Callout tone="info" title="Leitura executiva">
        Esforço alto e consistente do N2 em 2026: entre <Text weight="semibold">161 e 1.155 interações</Text>.
        <Text weight="semibold">Março lidera em volume absoluto</Text> (1.155),
        refletindo pico operacional após a oficina. Em <Text weight="semibold">Maio (parcial até 28/05)</Text>,
        o esforço registrado fica em <Text weight="semibold">684 interações</Text>, com foco maior em vazão de
        fechamento. Mesmo assim, seguimos com forte
        vazão: <Text weight="semibold">1.229 tickets fechados</Text> contra 879 abertos — backlog em redução de
        ~350 tickets no mês.
      </Callout>

      <Divider />

      <Stack gap={8}>
        <H2>Queries JQL utilizadas</H2>
        <Text tone="tertiary" size="small">
          Executadas via Atlassian REST API (endpoint `/rest/api/3/search/jql`), paginadas em blocos de 100 até esgotar (`isLast = true`).
        </Text>
        <Stack gap={4}>
          <Text weight="semibold" size="small">Abertos por mês:</Text>
          <pre style={{ margin: 0, padding: 12, fontFamily: 'monospace', fontSize: 12, color: theme.text.primary, background: theme.fill.tertiary, borderRadius: 6 }}>
{`project = SUPMED AND created >= "2026-MM-01" AND created < "2026-MM+1-01"`}
          </pre>
          <Text weight="semibold" size="small">Fechados por mês (Concluído + Cancelado):</Text>
          <pre style={{ margin: 0, padding: 12, fontFamily: 'monospace', fontSize: 12, color: theme.text.primary, background: theme.fill.tertiary, borderRadius: 6 }}>
{`project = SUPMED
  AND status in ("Concluído", "Cancelado")
  AND statusCategoryChangedDate >= "2026-MM-01"
  AND statusCategoryChangedDate <  "2026-MM+1-01"`}
          </pre>
        </Stack>
      </Stack>
    </Stack>
  );
}
