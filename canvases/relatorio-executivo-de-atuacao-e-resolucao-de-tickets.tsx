import {
  Button,
  BarChart,
  Divider,
  Grid,
  H1,
  H2,
  Row,
  Select,
  Stack,
  Stat,
  Table,
  Text,
  useCanvasAction,
  useCanvasState,
} from '@/lib/cursor-canvas';

const GENERATED_AT = "13/07/2026 17:54";
const SOURCE_PATH = "D:\\Medcof\\HealthPanel Project\\data\\refresh-jul2026\\executivo-all.json";
const RESOLUTION_PATH = "D:\\Medcof\\HealthPanel Project\\data\\supmed-extract\\resolution.json";
const PERIOD_LABEL = "2025-11 a 2026-07 parcial";
const RULE_NOTES: string[] = [
  "Metrica de tickets (por mes) = issues DISTINTAS onde o agente foi assignee atual OU fez pelo menos 1 comentario no mes (union assignee + comment authorship).",
  "Metrica de comments = contagem de comentarios feitos pelo agente no mes.",
  "Metrica de resolution notes usa campo customfield_11799 (assignee atual no mes de updated).",
  "Taxa de Resolucao = tickets distintos (assignee OU comentarista no periodo todo) com status done / total de tickets distintos. Deduplica por issueKey. Script: data/refresh-jul2026/process-executivo.js.",
  "Extracao via MCP Jira com paginacao por nextPageToken (maxResults=100). Base historica fechada + incrementos preservados ate 13/07/2026 mesclados por issueKey (issue mais nova sobrescreve): 4.062 issues distintas / 14.550 comentarios processados.",
  "LIMITACAO: sem changelog — proxy 'passou pelo time' = assignee atual ou comentou. Tickets reassignados para fora do time antes de fechar podem nao ser contabilizados."
];

type ResolutionEntry = { tickets: number; done: number; open: number; taxaResolucao: number };

const RESOLUTION_DATA: {
  computedAt: string;
  team: ResolutionEntry;
  byAgent: Record<string, ResolutionEntry>;
} = {
  computedAt: "13/07/2026 17:54",
  team: { tickets: 2420, done: 2148, open: 272, taxaResolucao: 88.8 },
  byAgent: {
    "Eduardo Bombarda": { tickets: 1048, done: 961, open: 87, taxaResolucao: 91.7 },
    "Maria Vitoria Jarzinski Oliveira": { tickets: 396, done: 351, open: 45, taxaResolucao: 88.6 },
    "Pedro H Pinheiro": { tickets: 403, done: 320, open: 83, taxaResolucao: 79.4 },
    "Luis Henrique Gonçalves Angelim": { tickets: 604, done: 531, open: 73, taxaResolucao: 87.9 },
    "Kevin da Silva Araujo": { tickets: 262, done: 209, open: 53, taxaResolucao: 79.8 },
    "Yasmin Danielli Sampaio": { tickets: 184, done: 181, open: 3, taxaResolucao: 98.4 },
    "João Gomes": { tickets: 154, done: 149, open: 5, taxaResolucao: 96.8 },
  },
};
const HEALTH_PANEL_PATH = 'C:/Users/BernardLadeia/.cursor/projects/d-Medcof-HealthPanel-Project/canvases/operational-governance-center.canvas.tsx';

type Agent = {
  name: string;
  isFormer: boolean;
};

type MetricRow = {
  tickets: number;
  comments: number;
  resNotes: number;
  done: number;
  open: number;
};

type MonthRow = {
  key: string;
  label: string;
  byAgent: Record<string, MetricRow>;
};

const RULE_BLOCKS: Array<{ id?: string; name: string; description: string; source: string }> = [
  {
    "id": "population",
    "name": "Bloco 1 - Populacao de tickets",
    "description": "Define a base de tickets SUPMED por janela anual.",
    "source": "project = SUPMED AND updated >= \"2025-11-01\" AND updated <= \"2026-07-13 23:59\" ORDER BY updated ASC"
  },
  {
    "id": "fields",
    "name": "Bloco 2 - Extracao de campos",
    "description": "Extrai status, assignee, comments e Resolution Notes de cada issue.",
    "source": "summary,status,assignee,updated,comment,customfield_11799"
  },
  {
    "id": "aggregation",
    "name": "Bloco 3 - Regras de agregacao",
    "description": "Consolida tickets/comments/resolution notes por mes e por agente.",
    "source": "MCP user-atlassian + consolidacao em data/executive-n2-paginated.json"
  },
  {
    "id": "scope",
    "name": "Bloco 4 - Escopo de agentes",
    "description": "Considera time-ti-n2 e ex-time-suporte.",
    "source": "config/agents-map.json"
  },
  {
    "id": "resolution",
    "name": "Bloco 5 - Taxa de Resolucao",
    "description": "Tickets distintos (assignee OU comentarista no periodo) com status done / total. Script: process4.ps1. Resultado: data/supmed-extract/resolution.json.",
    "source": "data/refresh-jul2026/process-executivo.js (merge incremental) → resolution atualizado 13/07/2026"
  }
];

const AGENTS: Agent[] = [
  {
    "name": "Eduardo Bombarda",
    "isFormer": false
  },
  {
    "name": "Maria Vitoria Jarzinski Oliveira",
    "isFormer": false
  },
  {
    "name": "Pedro H Pinheiro",
    "isFormer": false
  },
  {
    "name": "Luis Henrique Gonçalves Angelim",
    "isFormer": false
  },
  {
    "name": "Kevin da Silva Araujo",
    "isFormer": false
  },
  {
    "name": "Yasmin Danielli Sampaio",
    "isFormer": true
  },
  {
    "name": "João Gomes",
    "isFormer": true
  }
];
const MONTHS: MonthRow[] = [
  {
    "key": "2025-11",
    "label": "nov",
    "byAgent": {
      "Eduardo Bombarda": { "tickets": 34, "comments": 65, "resNotes": 0, "done": 0, "open": 0 },
      "Maria Vitoria Jarzinski Oliveira": { "tickets": 0, "comments": 0, "resNotes": 0, "done": 0, "open": 0 },
      "Pedro H Pinheiro": { "tickets": 0, "comments": 0, "resNotes": 0, "done": 0, "open": 0 },
      "Luis Henrique Gonçalves Angelim": { "tickets": 12, "comments": 18, "resNotes": 0, "done": 1, "open": 0 },
      "Kevin da Silva Araujo": { "tickets": 0, "comments": 0, "resNotes": 0, "done": 0, "open": 0 },
      "Yasmin Danielli Sampaio": { "tickets": 3, "comments": 6, "resNotes": 0, "done": 0, "open": 0 },
      "João Gomes": { "tickets": 0, "comments": 0, "resNotes": 0, "done": 0, "open": 0 }
    }
  },
  {
    "key": "2025-12",
    "label": "dez",
    "byAgent": {
      "Eduardo Bombarda": { "tickets": 118, "comments": 242, "resNotes": 3, "done": 3, "open": 0 },
      "Maria Vitoria Jarzinski Oliveira": { "tickets": 0, "comments": 0, "resNotes": 0, "done": 0, "open": 0 },
      "Pedro H Pinheiro": { "tickets": 0, "comments": 0, "resNotes": 0, "done": 0, "open": 0 },
      "Luis Henrique Gonçalves Angelim": { "tickets": 27, "comments": 46, "resNotes": 2, "done": 2, "open": 0 },
      "Kevin da Silva Araujo": { "tickets": 0, "comments": 0, "resNotes": 0, "done": 0, "open": 0 },
      "Yasmin Danielli Sampaio": { "tickets": 23, "comments": 41, "resNotes": 0, "done": 0, "open": 0 },
      "João Gomes": { "tickets": 0, "comments": 0, "resNotes": 0, "done": 0, "open": 0 }
    }
  },
  {
    "key": "2026-01",
    "label": "jan",
    "byAgent": {
      "Eduardo Bombarda": { "tickets": 366, "comments": 619, "resNotes": 4, "done": 4, "open": 0 },
      "Maria Vitoria Jarzinski Oliveira": { "tickets": 0, "comments": 0, "resNotes": 0, "done": 0, "open": 0 },
      "Pedro H Pinheiro": { "tickets": 0, "comments": 0, "resNotes": 0, "done": 0, "open": 0 },
      "Luis Henrique Gonçalves Angelim": { "tickets": 137, "comments": 210, "resNotes": 2, "done": 2, "open": 0 },
      "Kevin da Silva Araujo": { "tickets": 0, "comments": 0, "resNotes": 0, "done": 0, "open": 0 },
      "Yasmin Danielli Sampaio": { "tickets": 82, "comments": 166, "resNotes": 1, "done": 1, "open": 0 },
      "João Gomes": { "tickets": 66, "comments": 133, "resNotes": 0, "done": 0, "open": 0 }
    }
  },
  {
    "key": "2026-02",
    "label": "fev",
    "byAgent": {
      "Eduardo Bombarda": { "tickets": 171, "comments": 399, "resNotes": 1, "done": 1, "open": 0 },
      "Maria Vitoria Jarzinski Oliveira": { "tickets": 91, "comments": 227, "resNotes": 0, "done": 0, "open": 0 },
      "Pedro H Pinheiro": { "tickets": 36, "comments": 92, "resNotes": 0, "done": 0, "open": 0 },
      "Luis Henrique Gonçalves Angelim": { "tickets": 68, "comments": 132, "resNotes": 0, "done": 0, "open": 0 },
      "Kevin da Silva Araujo": { "tickets": 0, "comments": 0, "resNotes": 0, "done": 0, "open": 0 },
      "Yasmin Danielli Sampaio": { "tickets": 67, "comments": 127, "resNotes": 0, "done": 0, "open": 0 },
      "João Gomes": { "tickets": 14, "comments": 30, "resNotes": 0, "done": 0, "open": 0 }
    }
  },
  {
    "key": "2026-03",
    "label": "mar",
    "byAgent": {
      "Eduardo Bombarda": { "tickets": 217, "comments": 317, "resNotes": 58, "done": 65, "open": 0 },
      "Maria Vitoria Jarzinski Oliveira": { "tickets": 131, "comments": 320, "resNotes": 1, "done": 1, "open": 0 },
      "Pedro H Pinheiro": { "tickets": 112, "comments": 204, "resNotes": 1, "done": 1, "open": 0 },
      "Luis Henrique Gonçalves Angelim": { "tickets": 178, "comments": 221, "resNotes": 40, "done": 41, "open": 0 },
      "Kevin da Silva Araujo": { "tickets": 0, "comments": 0, "resNotes": 0, "done": 0, "open": 0 },
      "Yasmin Danielli Sampaio": { "tickets": 20, "comments": 0, "resNotes": 19, "done": 20, "open": 0 },
      "João Gomes": { "tickets": 73, "comments": 107, "resNotes": 9, "done": 9, "open": 0 }
    }
  },
  {
    "key": "2026-04",
    "label": "abr",
    "byAgent": {
      "Eduardo Bombarda": { "tickets": 134, "comments": 252, "resNotes": 1, "done": 1, "open": 0 },
      "Maria Vitoria Jarzinski Oliveira": { "tickets": 140, "comments": 289, "resNotes": 0, "done": 8, "open": 0 },
      "Pedro H Pinheiro": { "tickets": 93, "comments": 167, "resNotes": 0, "done": 0, "open": 0 },
      "Luis Henrique Gonçalves Angelim": { "tickets": 137, "comments": 184, "resNotes": 0, "done": 0, "open": 0 },
      "Kevin da Silva Araujo": { "tickets": 23, "comments": 34, "resNotes": 0, "done": 0, "open": 0 },
      "Yasmin Danielli Sampaio": { "tickets": 0, "comments": 0, "resNotes": 0, "done": 0, "open": 0 },
      "João Gomes": { "tickets": 14, "comments": 24, "resNotes": 0, "done": 1, "open": 0 }
    }
  },
  {
    "key": "2026-05",
    "label": "mai",
    "byAgent": {
      "Eduardo Bombarda": { "tickets": 137, "comments": 168, "resNotes": 41, "done": 45, "open": 0 },
      "Maria Vitoria Jarzinski Oliveira": { "tickets": 84, "comments": 62, "resNotes": 28, "done": 48, "open": 0 },
      "Pedro H Pinheiro": { "tickets": 119, "comments": 145, "resNotes": 62, "done": 63, "open": 0 },
      "Luis Henrique Gonçalves Angelim": { "tickets": 113, "comments": 103, "resNotes": 55, "done": 55, "open": 0 },
      "Kevin da Silva Araujo": { "tickets": 90, "comments": 182, "resNotes": 25, "done": 26, "open": 0 },
      "Yasmin Danielli Sampaio": { "tickets": 3, "comments": 3, "resNotes": 0, "done": 0, "open": 0 },
      "João Gomes": { "tickets": 16, "comments": 4, "resNotes": 14, "done": 15, "open": 0 }
    }
  },
  {
    "key": "2026-06",
    "label": "jun",
    "byAgent": {
      "Eduardo Bombarda": { "tickets": 115, "comments": 150, "resNotes": 39, "done": 51, "open": 4 },
      "Maria Vitoria Jarzinski Oliveira": { "tickets": 40, "comments": 89, "resNotes": 0, "done": 32, "open": 1 },
      "Pedro H Pinheiro": { "tickets": 94, "comments": 149, "resNotes": 40, "done": 41, "open": 0 },
      "Luis Henrique Gonçalves Angelim": { "tickets": 81, "comments": 61, "resNotes": 47, "done": 47, "open": 0 },
      "Kevin da Silva Araujo": { "tickets": 125, "comments": 201, "resNotes": 37, "done": 37, "open": 1 },
      "Yasmin Danielli Sampaio": { "tickets": 4, "comments": 3, "resNotes": 1, "done": 1, "open": 0 },
      "João Gomes": { "tickets": 0, "comments": 0, "resNotes": 0, "done": 0, "open": 0 }
    }
  },
  {
    "key": "2026-07",
    "label": "jul",
    "byAgent": {
      "Eduardo Bombarda": { "tickets": 31, "comments": 54, "resNotes": 1, "done": 1, "open": 7 },
      "Maria Vitoria Jarzinski Oliveira": { "tickets": 11, "comments": 31, "resNotes": 0, "done": 10, "open": 1 },
      "Pedro H Pinheiro": { "tickets": 41, "comments": 109, "resNotes": 2, "done": 2, "open": 1 },
      "Luis Henrique Gonçalves Angelim": { "tickets": 22, "comments": 42, "resNotes": 3, "done": 3, "open": 0 },
      "Kevin da Silva Araujo": { "tickets": 48, "comments": 76, "resNotes": 19, "done": 23, "open": 1 },
      "Yasmin Danielli Sampaio": { "tickets": 0, "comments": 0, "resNotes": 0, "done": 0, "open": 0 },
      "João Gomes": { "tickets": 0, "comments": 0, "resNotes": 0, "done": 0, "open": 0 }
    }
  }
];

const MONTH_OPTIONS = [{ value: 'all', label: 'Todos os meses' }, ...MONTHS.map((m) => ({ value: m.key, label: m.label }))];
const SCOPE_OPTIONS = [
  { value: 'all', label: 'Todos (atual + ex-N2)' },
  { value: 'current', label: 'Somente time atual' },
  { value: 'former', label: 'Somente ex-N2' },
];
const AGENT_OPTIONS = [{ value: 'all', label: 'Todos os agentes' }, ...AGENTS.map((a) => ({ value: a.name, label: a.name }))];
const PAGE_OPTIONS = [
  { value: 'resumo', label: 'Página 1 · Resumo Executivo' },
  { value: 'metadados', label: 'Página 2 · Metadados' },
  { value: 'regras', label: 'Página 3 · Regras e Notas Técnicas' },
  { value: 'agentes', label: 'Página 4 · Escopo de Agentes' },
  { value: 'base', label: 'Página 5 · Base Numérica por Agente' },
  { value: 'totais', label: 'Página 6 · Totais por Escopo' },
];

/**
 * Soma metricas de um conjunto de meses/agentes.
 * @param {MonthRow[]} months
 * @param {Agent[]} agents
 * @returns {MetricRow}
 */
function calculateTotals(months: MonthRow[], agents: Agent[]): MetricRow {
  return months.reduce(
    (monthAcc, month) => {
      const monthTotals = agents.reduce(
        (agentAcc, agent) => {
          const row = month.byAgent[agent.name] || { tickets: 0, comments: 0, resNotes: 0, done: 0, open: 0 };
          return {
            tickets: agentAcc.tickets + row.tickets,
            comments: agentAcc.comments + row.comments,
            resNotes: agentAcc.resNotes + row.resNotes,
            done: agentAcc.done + row.done,
            open: agentAcc.open + row.open,
          };
        },
        { tickets: 0, comments: 0, resNotes: 0, done: 0, open: 0 },
      );

      return {
        tickets: monthAcc.tickets + monthTotals.tickets,
        comments: monthAcc.comments + monthTotals.comments,
        resNotes: monthAcc.resNotes + monthTotals.resNotes,
        done: monthAcc.done + monthTotals.done,
        open: monthAcc.open + monthTotals.open,
      };
    },
    { tickets: 0, comments: 0, resNotes: 0, done: 0, open: 0 },
  );
}

export default function RelatorioExecutivoDeAtuacaoEResolucaoDeTickets() {
  const dispatch = useCanvasAction();
  const [selectedMonth, setSelectedMonth] = useCanvasState<string>('month', 'all');
  const [selectedScope, setSelectedScope] = useCanvasState<string>('scope', 'all');
  const [selectedAgent, setSelectedAgent] = useCanvasState<string>('agent', 'all');
  const [selectedPage, setSelectedPage] = useCanvasState<string>('page', 'resumo');

  const filteredMonths = selectedMonth === 'all' ? MONTHS : MONTHS.filter((month) => month.key === selectedMonth);
  const scopedAgents = AGENTS.filter((agent) => {
    if (selectedScope === 'current') return !agent.isFormer;
    if (selectedScope === 'former') return agent.isFormer;
    return true;
  });
  const filteredAgents = selectedAgent === 'all' ? scopedAgents : scopedAgents.filter((agent) => agent.name === selectedAgent);
  const totals = calculateTotals(filteredMonths, filteredAgents);
  const totalInteractions = totals.comments + totals.resNotes;

  // Taxa de Resolucao: usa RESOLUTION_DATA (process4.ps1) — tickets distintos no periodo todo
  // com assignee ou comentarista sendo membro do time, deduplica por issueKey.
  const resolutionScope: ResolutionEntry =
    selectedAgent !== 'all' && RESOLUTION_DATA.byAgent[selectedAgent]
      ? RESOLUTION_DATA.byAgent[selectedAgent]
      : RESOLUTION_DATA.team;
  const solvedPct = resolutionScope.taxaResolucao;
  const openPct = resolutionScope.tickets > 0
    ? (resolutionScope.open / resolutionScope.tickets) * 100
    : 0;
  const allTotals = calculateTotals(MONTHS, AGENTS);
  const currentTotals = calculateTotals(
    MONTHS,
    AGENTS.filter((agent) => !agent.isFormer),
  );
  const formerTotals = calculateTotals(
    MONTHS,
    AGENTS.filter((agent) => agent.isFormer),
  );

  const byAgentInteractions = filteredAgents
    .map((agent) => {
      const interactions = filteredMonths.reduce((acc, month) => {
        const row = month.byAgent[agent.name] || { comments: 0, resNotes: 0 };
        return acc + row.comments + row.resNotes;
      }, 0);
      return { name: agent.name, interactions };
    })
    .sort((a, b) => b.interactions - a.interactions);

  const showMonthlyBySelectedAgent = selectedAgent !== 'all' && selectedMonth === 'all';
  const selectedAgentMonthlyInteractions = showMonthlyBySelectedAgent
    ? MONTHS.map((month) => {
        const row = month.byAgent[selectedAgent] || { comments: 0, resNotes: 0 };
        return {
          month: month.label,
          interactions: row.comments + row.resNotes,
        };
      })
    : [];
  const currentMonthBase = selectedMonth === 'all' ? MONTHS[MONTHS.length - 1] : filteredMonths[0];

  const scopeRows = [
    {
      scope: 'Todos (atual + ex-N2)',
      tickets: allTotals.tickets,
      interactions: allTotals.comments + allTotals.resNotes,
      done: allTotals.done,
      open: allTotals.open,
    },
    {
      scope: 'Somente time atual',
      tickets: currentTotals.tickets,
      interactions: currentTotals.comments + currentTotals.resNotes,
      done: currentTotals.done,
      open: currentTotals.open,
    },
    {
      scope: 'Somente ex-N2',
      tickets: formerTotals.tickets,
      interactions: formerTotals.comments + formerTotals.resNotes,
      done: formerTotals.done,
      open: formerTotals.open,
    },
  ];

  return (
    <Stack gap={20} style={{ padding: 24, maxWidth: 1180 }}>
      <Row align="center" justify="space-between">
        <Stack gap={4}>
          <H1>Relatório Executivo de Atuação e Resolução de Tickets</H1>
          <Text tone="secondary" size="small">
            Fonte: SUPMED / medcof-team.atlassian.net · Período: {PERIOD_LABEL}
          </Text>
        </Stack>
        <Stack gap={8} style={{ alignItems: 'flex-end' }}>
          <Button
            variant="secondary"
            onClick={() => dispatch({ type: 'openFile', path: HEALTH_PANEL_PATH })}
          >
            Voltar ao Operational Governance Center
          </Button>
          <Text tone="tertiary" size="small">Gerado em {GENERATED_AT}</Text>
        </Stack>
      </Row>

      <Row gap={16} align="center" wrap>
        <Text weight="medium">Navegação:</Text>
        <Select value={selectedPage} onChange={setSelectedPage} options={PAGE_OPTIONS} style={{ width: 360 }} />
      </Row>

      <Row gap={16} align="center" wrap>
        <Text weight="medium">Período:</Text>
        <Select value={selectedMonth} onChange={setSelectedMonth} options={MONTH_OPTIONS} style={{ width: 240 }} />
        <Text weight="medium">Escopo:</Text>
        <Select value={selectedScope} onChange={setSelectedScope} options={SCOPE_OPTIONS} style={{ width: 240 }} />
        <Text weight="medium">Agente:</Text>
        <Select value={selectedAgent} onChange={setSelectedAgent} options={AGENT_OPTIONS} style={{ width: 320 }} />
      </Row>

      <Divider />

      {selectedPage === 'resumo' ? (
        <Stack gap={12}>
          <H2>Resumo Executivo dos Indicadores</H2>
          <Grid columns={4} gap={12}>
            <Stat value={totalInteractions.toLocaleString('pt-BR')} label="Interações Registradas" tone="info" />
            <Stat value={resolutionScope.tickets.toLocaleString('pt-BR')} label="Tickets Distintos no Período" />
            <Stat value={`${solvedPct.toFixed(1).replace('.', ',')}%`} label="Taxa de Resolução" tone="success" />
            <Stat value={resolutionScope.open.toLocaleString('pt-BR')} label="Tickets em Aberto" tone="warning" />
          </Grid>
          <Text size="small" tone="secondary">
            {selectedAgent !== 'all' ? `${selectedAgent}: ` : 'Time N2: '}
            {resolutionScope.tickets.toLocaleString('pt-BR')} tickets distintos trabalhados no período,
            {` ${resolutionScope.done.toLocaleString('pt-BR')} resolvidos`} ({`${solvedPct.toFixed(1).replace('.', ',')}%`}),
            {` ${resolutionScope.open.toLocaleString('pt-BR')}`} em aberto.
            Calculado via process-executivo.js · {RESOLUTION_DATA.computedAt}.
          </Text>
          <Divider />
          <Stack gap={8}>
            <H2>{showMonthlyBySelectedAgent ? `Interações Mensais — ${selectedAgent}` : 'Distribuição de Interações por Agente — N2'}</H2>
            <BarChart
              categories={
                showMonthlyBySelectedAgent
                  ? selectedAgentMonthlyInteractions.map((item) => item.month)
                  : byAgentInteractions.map((item) => item.name)
              }
              series={[
                {
                  name: 'Interações',
                  data: showMonthlyBySelectedAgent
                    ? selectedAgentMonthlyInteractions.map((item) => item.interactions)
                    : byAgentInteractions.map((item) => item.interactions),
                },
              ]}
              height={320}
              showValues
            />
            <Text size="small" tone="tertiary">Fonte: SUPMED / medcof-team.atlassian.net · Período: {PERIOD_LABEL}</Text>
          </Stack>
        </Stack>
      ) : null}

      {selectedPage === 'metadados' ? (
        <Stack gap={8}>
          <H2>Metadados do Relatório</H2>
          <Table
            headers={['Campo', 'Valor']}
            rows={[
              ['Título', 'Relatório Executivo de Atuação e Resolução de Tickets'],
              ['Gerado em', GENERATED_AT],
              ['Período base', PERIOD_LABEL],
              ['Fonte exibida na UI', 'SUPMED / medcof-team.atlassian.net'],
              ['Snapshot de origem', SOURCE_PATH],
              ['Resolução (process4)', RESOLUTION_PATH],
              ['Canvas de navegação', HEALTH_PANEL_PATH],
            ]}
            columnAlign={['left', 'left']}
          />
        </Stack>
      ) : null}

      {selectedPage === 'regras' ? (
        <Stack gap={8}>
          <H2>Blocos de Regras e Extração</H2>
          <Table
            headers={['Bloco', 'Descrição', 'Origem']}
            rows={RULE_BLOCKS.map((block) => [block.name, block.description, block.source])}
            columnAlign={['left', 'left', 'left']}
          />
          {RULE_NOTES.length > 0 ? (
            <Table
              headers={['Notas técnicas do cálculo']}
              rows={RULE_NOTES.map((note) => [note])}
            />
          ) : null}
        </Stack>
      ) : null}

      {selectedPage === 'agentes' ? (
        <Stack gap={8}>
          <H2>Escopo de Agentes</H2>
          <Table
            headers={['Agente', 'Tipo de vínculo']}
            rows={AGENTS.map((agent) => [agent.name, agent.isFormer ? 'Ex-N2' : 'Time atual'])}
            columnAlign={['left', 'left']}
          />
        </Stack>
      ) : null}

      {selectedPage === 'base' ? (
        <Stack gap={8}>
          <H2>Base Numérica por Agente</H2>
          <Table
            headers={['Mês', 'Agente', 'Tickets', 'Comments', 'Resolution Notes', 'Done', 'Open']}
            rows={AGENTS.map((agent) => {
              const row = currentMonthBase.byAgent[agent.name] || { tickets: 0, comments: 0, resNotes: 0, done: 0, open: 0 };
              return [
                currentMonthBase.label,
                agent.name,
                row.tickets.toLocaleString('pt-BR'),
                row.comments.toLocaleString('pt-BR'),
                row.resNotes.toLocaleString('pt-BR'),
                row.done.toLocaleString('pt-BR'),
                row.open.toLocaleString('pt-BR'),
              ];
            })}
            columnAlign={['left', 'left', 'right', 'right', 'right', 'right', 'right']}
          />
        </Stack>
      ) : null}

      {selectedPage === 'totais' ? (
        <Stack gap={8}>
          <H2>Totais Consolidados por Escopo</H2>
          <Text size="small" tone="secondary">
            Taxa de Resolução calculada via process-executivo.js: tickets distintos (assignee + comentarista) no período todo, deduplica por issueKey. Gerado em {RESOLUTION_DATA.computedAt}.
          </Text>
          <Table
            headers={['Escopo / Agente', 'Tickets Distintos', 'Done', 'Open', 'Taxa de Resolução']}
            rows={[
              ['Time N2 (todos)',
                RESOLUTION_DATA.team.tickets.toLocaleString('pt-BR'),
                RESOLUTION_DATA.team.done.toLocaleString('pt-BR'),
                RESOLUTION_DATA.team.open.toLocaleString('pt-BR'),
                `${RESOLUTION_DATA.team.taxaResolucao.toFixed(1).replace('.', ',')}%`,
              ],
              ...Object.entries(RESOLUTION_DATA.byAgent).map(([name, r]) => [
                name,
                r.tickets.toLocaleString('pt-BR'),
                r.done.toLocaleString('pt-BR'),
                r.open.toLocaleString('pt-BR'),
                `${r.taxaResolucao.toFixed(1).replace('.', ',')}%`,
              ]),
            ]}
            columnAlign={['left', 'right', 'right', 'right', 'right']}
          />
        </Stack>
      ) : null}
    </Stack>
  );
}
