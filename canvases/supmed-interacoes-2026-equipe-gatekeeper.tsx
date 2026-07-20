import {
  BarChart,
  Callout,
  Divider,
  Grid,
  H1,
  H2,
  Pill,
  Row,
  Select,
  Stack,
  Stat,
  Table,
  Text,
  useCanvasState,
} from 'cursor/canvas';

const GENERATED_AT = '15/06/2026 09:45';

type Agent = {
  name: string;
  short: string;
  isFormer: boolean;
  leftAt: string | null;
};

const AGENTS: Agent[] = [
  { name: 'Eduardo Bombarda',                 short: 'Eduardo', isFormer: false, leftAt: null },
  { name: 'Maria Vitoria Jarzinski Oliveira', short: 'Maria',   isFormer: false, leftAt: null },
  { name: 'Pedro H Pinheiro',                 short: 'Pedro',   isFormer: false, leftAt: null },
  { name: 'Luis Henrique Gonçalves Angelim',  short: 'Luis',    isFormer: false, leftAt: null },
  { name: 'Kevin da Silva Araujo',            short: 'Kevin',   isFormer: false, leftAt: null },
  { name: 'Yasmin Danielli Sampaio',          short: 'Yasmin',  isFormer: true,  leftAt: '28/02/2026' },
  { name: 'João Gomes',                       short: 'João G.', isFormer: true,  leftAt: '15/05/2026' },
];

type MonthRow = {
  key: string;
  label: string;
  byAgent: Record<string, { tickets: number; comments: number; resNotes: number; total: number; done: number; open: number }>;
};

const MONTHS: MonthRow[] = [
  {
    key: 'jan',
    label: 'Janeiro (1–31/01)',
    byAgent: {
      'Eduardo Bombarda': {
        tickets: 351,
        comments: 606,
        resNotes: 20,
        total: 626,
        done: 285,
        open: 66
      },
      'Maria Vitoria Jarzinski Oliveira': {
        tickets: 0,
        comments: 0,
        resNotes: 0,
        total: 0,
        done: 0,
        open: 0
      },
      'Pedro H Pinheiro': {
        tickets: 0,
        comments: 0,
        resNotes: 0,
        total: 0,
        done: 0,
        open: 0
      },
      'Luis Henrique Gonçalves Angelim': {
        tickets: 134,
        comments: 206,
        resNotes: 3,
        total: 209,
        done: 114,
        open: 20
      },
      'Kevin da Silva Araujo': {
        tickets: 0,
        comments: 0,
        resNotes: 0,
        total: 0,
        done: 0,
        open: 0
      },
      'Yasmin Danielli Sampaio': {
        tickets: 72,
        comments: 154,
        resNotes: 5,
        total: 159,
        done: 67,
        open: 5
      },
      'João Gomes': {
        tickets: 46,
        comments: 97,
        resNotes: 3,
        total: 100,
        done: 36,
        open: 10
      }
    }
  },
  {
    key: 'feb',
    label: 'Fevereiro (1–28/02)',
    byAgent: {
      'Eduardo Bombarda': {
        tickets: 171,
        comments: 399,
        resNotes: 7,
        total: 406,
        done: 122,
        open: 49
      },
      'Maria Vitoria Jarzinski Oliveira': {
        tickets: 91,
        comments: 227,
        resNotes: 6,
        total: 233,
        done: 59,
        open: 32
      },
      'Pedro H Pinheiro': {
        tickets: 36,
        comments: 92,
        resNotes: 6,
        total: 98,
        done: 25,
        open: 11
      },
      'Luis Henrique Gonçalves Angelim': {
        tickets: 68,
        comments: 132,
        resNotes: 5,
        total: 137,
        done: 58,
        open: 10
      },
      'Kevin da Silva Araujo': {
        tickets: 0,
        comments: 0,
        resNotes: 0,
        total: 0,
        done: 0,
        open: 0
      },
      'Yasmin Danielli Sampaio': {
        tickets: 67,
        comments: 127,
        resNotes: 2,
        total: 129,
        done: 46,
        open: 21
      },
      'João Gomes': {
        tickets: 14,
        comments: 30,
        resNotes: 0,
        total: 30,
        done: 13,
        open: 1
      }
    }
  },
  {
    key: 'mar',
    label: 'Março (1–31/03)',
    byAgent: {
      'Eduardo Bombarda': {
        tickets: 153,
        comments: 319,
        resNotes: 22,
        total: 341,
        done: 106,
        open: 47
      },
      'Maria Vitoria Jarzinski Oliveira': {
        tickets: 132,
        comments: 326,
        resNotes: 15,
        total: 341,
        done: 103,
        open: 29
      },
      'Pedro H Pinheiro': {
        tickets: 116,
        comments: 213,
        resNotes: 17,
        total: 230,
        done: 97,
        open: 19
      },
      'Luis Henrique Gonçalves Angelim': {
        tickets: 138,
        comments: 221,
        resNotes: 22,
        total: 243,
        done: 98,
        open: 40
      },
      'Kevin da Silva Araujo': {
        tickets: 0,
        comments: 0,
        resNotes: 0,
        total: 0,
        done: 0,
        open: 0
      },
      'Yasmin Danielli Sampaio': {
        tickets: 0,
        comments: 0,
        resNotes: 0,
        total: 0,
        done: 0,
        open: 0
      },
      'João Gomes': {
        tickets: 65,
        comments: 107,
        resNotes: 11,
        total: 118,
        done: 46,
        open: 19
      }
    }
  },
  {
    key: 'apr',
    label: 'Abril (1–30/04)',
    byAgent: {
      'Eduardo Bombarda': {
        tickets: 135,
        comments: 259,
        resNotes: 35,
        total: 294,
        done: 103,
        open: 32
      },
      'Maria Vitoria Jarzinski Oliveira': {
        tickets: 144,
        comments: 299,
        resNotes: 32,
        total: 331,
        done: 102,
        open: 42
      },
      'Pedro H Pinheiro': {
        tickets: 95,
        comments: 170,
        resNotes: 25,
        total: 195,
        done: 76,
        open: 19
      },
      'Luis Henrique Gonçalves Angelim': {
        tickets: 139,
        comments: 188,
        resNotes: 20,
        total: 208,
        done: 82,
        open: 57
      },
      'Kevin da Silva Araujo': {
        tickets: 24,
        comments: 35,
        resNotes: 6,
        total: 41,
        done: 17,
        open: 7
      },
      'Yasmin Danielli Sampaio': {
        tickets: 0,
        comments: 0,
        resNotes: 0,
        total: 0,
        done: 0,
        open: 0
      },
      'João Gomes': {
        tickets: 15,
        comments: 27,
        resNotes: 1,
        total: 28,
        done: 11,
        open: 4
      }
    }
  },
  {
    key: 'may',
    label: 'Maio (1–31/05)',
    byAgent: {
      'Eduardo Bombarda': {
        tickets: 94,
        comments: 159,
        resNotes: 8,
        total: 167,
        done: 50,
        open: 44
      },
      'Maria Vitoria Jarzinski Oliveira': {
        tickets: 39,
        comments: 62,
        resNotes: 4,
        total: 66,
        done: 24,
        open: 15
      },
      'Pedro H Pinheiro': {
        tickets: 68,
        comments: 141,
        resNotes: 9,
        total: 150,
        done: 41,
        open: 27
      },
      'Luis Henrique Gonçalves Angelim': {
        tickets: 66,
        comments: 103,
        resNotes: 6,
        total: 109,
        done: 41,
        open: 25
      },
      'Kevin da Silva Araujo': {
        tickets: 82,
        comments: 179,
        resNotes: 13,
        total: 192,
        done: 57,
        open: 25
      },
      'Yasmin Danielli Sampaio': {
        tickets: 0,
        comments: 0,
        resNotes: 0,
        total: 0,
        done: 0,
        open: 0
      },
      'João Gomes': {
        tickets: 4,
        comments: 4,
        resNotes: 0,
        total: 4,
        done: 4,
        open: 0
      }
    }
  },
  {
    key: 'jun',
    label: 'Junho (1–15/06)*',
    byAgent: {
      'Eduardo Bombarda': {
        tickets: 29,
        comments: 39,
        resNotes: 2,
        total: 41,
        done: 9,
        open: 20
      },
      'Maria Vitoria Jarzinski Oliveira': {
        tickets: 2,
        comments: 3,
        resNotes: 0,
        total: 3,
        done: 1,
        open: 1
      },
      'Pedro H Pinheiro': {
        tickets: 13,
        comments: 32,
        resNotes: 1,
        total: 33,
        done: 7,
        open: 6
      },
      'Luis Henrique Gonçalves Angelim': {
        tickets: 6,
        comments: 8,
        resNotes: 3,
        total: 11,
        done: 2,
        open: 4
      },
      'Kevin da Silva Araujo': {
        tickets: 45,
        comments: 69,
        resNotes: 4,
        total: 73,
        done: 6,
        open: 39
      },
      'Yasmin Danielli Sampaio': {
        tickets: 0,
        comments: 0,
        resNotes: 0,
        total: 0,
        done: 0,
        open: 0
      },
      'João Gomes': {
        tickets: 0,
        comments: 0,
        resNotes: 0,
        total: 0,
        done: 0,
        open: 0
      }
    }
  }
];

const MONTH_OPTIONS = [{ value: 'all', label: 'Todos os meses' }, ...MONTHS.map(m => ({ value: m.key, label: m.label }))];
const SCOPE_OPTIONS = [
  { value: 'all', label: 'Todos (atual + ex-N2)' },
  { value: 'current', label: 'Somente time atual' },
  { value: 'former', label: 'Somente ex-N2' },
];
const AGENT_OPTIONS = [{ value: 'all', label: 'Todos os agentes' }, ...AGENTS.map(a => ({ value: a.name, label: a.isFormer ? `${a.name} (ex-N2)` : a.name }))];

const SHORT_MONTH_LABEL: Record<string, string> = {
  jan: 'Jan/26',
  feb: 'Fev/26',
  mar: 'Mar/26',
  apr: 'Abr/26',
  may: 'Mai/26',
  jun: 'Jun/26*',
};

export default function SupmedInteracoes2026EquipeGateKeeper() {
  const [selectedMonth, setSelectedMonth] = useCanvasState<string>('month', 'all');
  const [selectedScope, setSelectedScope] = useCanvasState<string>('scope', 'all');
  const [selectedAgent, setSelectedAgent] = useCanvasState<string>('agent', 'all');

  const scopedAgents = AGENTS.filter(a => {
    if (selectedScope === 'current') return !a.isFormer;
    if (selectedScope === 'former') return a.isFormer;
    return true;
  });

  const filteredAgents = selectedAgent === 'all' ? scopedAgents : scopedAgents.filter(a => a.name === selectedAgent);
  const filteredMonths = selectedMonth === 'all' ? MONTHS : MONTHS.filter(m => m.key === selectedMonth);

  const sumForAgent = (a: Agent) => filteredMonths.reduce((acc, m) => {
    const r = m.byAgent[a.name];
    return {
      tickets: acc.tickets + r.tickets,
      comments: acc.comments + r.comments,
      resNotes: acc.resNotes + r.resNotes,
      total: acc.total + r.total,
      done: acc.done + r.done,
      open: acc.open + r.open,
    };
  }, { tickets: 0, comments: 0, resNotes: 0, total: 0, done: 0, open: 0 });

  const perAgent = filteredAgents.map(a => ({ agent: a, ...sumForAgent(a) }));
  const sortedAgents = [...perAgent].sort((a, b) => b.total - a.total);

  const totalInteractions = perAgent.reduce((s, r) => s + r.total, 0);
  const totalTickets = perAgent.reduce((s, r) => s + r.tickets, 0);
  const totalCurrent = perAgent.filter(r => !r.agent.isFormer).reduce((s, r) => s + r.total, 0);
  const totalFormer = perAgent.filter(r => r.agent.isFormer).reduce((s, r) => s + r.total, 0);

  const agentBarCategories = sortedAgents.map(r => r.agent.isFormer ? `${r.agent.short} *` : r.agent.short);
  const agentBarData = sortedAgents.map(r => r.total);
  const monthCategories = filteredMonths.map(m => SHORT_MONTH_LABEL[m.key] ?? m.label);
  const currentMonthData = filteredMonths.map(m => filteredAgents.filter(a => !a.isFormer).reduce((s, a) => s + m.byAgent[a.name].total, 0));
  const formerMonthData = filteredMonths.map(m => filteredAgents.filter(a => a.isFormer).reduce((s, a) => s + m.byAgent[a.name].total, 0));

  const monthSeries = [
    ...(currentMonthData.some(v => v > 0) ? [{ name: 'Time atual', data: currentMonthData, tone: 'info' as const }] : []),
    ...(formerMonthData.some(v => v > 0) ? [{ name: 'ex-N2', data: formerMonthData, tone: 'neutral' as const }] : []),
  ];

  const periodCaption = selectedMonth === 'all' ? '2026 (YTD Jan–Jun)' : `${MONTHS.find(m => m.key === selectedMonth)?.label} 2026`;

  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 1180 }}>
      <Row align="center" justify="space-between">
        <Stack gap={4}>
          <H1>SUPMED · Interações 2026 | Equipe GateKeeper</H1>
          <Text tone="secondary" size="small">Projeto SUPMED · time-ti-n2 (GateKeeper) + ex-N2 · medcof-team.atlassian.net</Text>
        </Stack>
        <Text size="small" tone="tertiary">Gerado em {GENERATED_AT}</Text>
      </Row>

      <Callout tone="warning" title="Escopo anual em evolução">
        Este relatório foi reorganizado para o ciclo anual 2026, mas o dataset atual está em formato YTD
        (Jan–Jun/2026, junho parcial até 15/06). A rotina Seg/Qua seguirá expandindo os meses seguintes no mesmo layout.
      </Callout>

      <Callout tone="neutral" title="Janela de permanência dos ex-N2">
        Yasmin Danielli Sampaio contabilizada até 28/02/2026 e João Gomes até 15/05/2026.
      </Callout>

      <Row gap={16} align="center" wrap>
        <Text weight="medium">Mês:</Text>
        <Select value={selectedMonth} onChange={setSelectedMonth} options={MONTH_OPTIONS} style={{ width: 220 }} />
        <Text weight="medium" style={{ marginLeft: 8 }}>Escopo:</Text>
        <Select value={selectedScope} onChange={setSelectedScope} options={SCOPE_OPTIONS} style={{ width: 220 }} />
        <Text weight="medium" style={{ marginLeft: 8 }}>Agente:</Text>
        <Select value={selectedAgent} onChange={setSelectedAgent} options={AGENT_OPTIONS} style={{ width: 300 }} />
      </Row>

      <Divider />

      <Grid columns={4} gap={16}>
        <Stat value={totalInteractions.toLocaleString('pt-BR')} label="Interações no escopo" tone="info" />
        <Stat value={totalCurrent.toLocaleString('pt-BR')} label="Time atual" />
        <Stat value={totalFormer.toLocaleString('pt-BR')} label="Ex-N2" />
        <Stat value={totalTickets.toLocaleString('pt-BR')} label="Tickets únicos (soma)" />
      </Grid>

      <Divider />

      <Grid columns="3fr 4fr" gap={20}>
        <Stack gap={8}>
          <H2>Interações por agente</H2>
          <Text size="small" tone="secondary">{periodCaption} · ordenado desc · * = ex-N2</Text>
          <BarChart
            categories={agentBarCategories}
            series={[{ name: 'Interações', data: agentBarData }]}
            height={300}
            horizontal
            showValues
          />
        </Stack>
        <Stack gap={8}>
          <H2>Interações por mês — atual vs ex-N2</H2>
          <Text size="small" tone="secondary">Empilhado · janela de permanência aplicada · valores exibidos no topo</Text>
          <BarChart categories={monthCategories} series={monthSeries} height={300} stacked showValues />
        </Stack>
      </Grid>

      <Divider />

      <Stack gap={8}>
        <H2>Resumo por agente</H2>
        <Text size="small" tone="secondary">{periodCaption} · Total = Comentários + Resolution Notes</Text>
        <Table
          headers={['Agente', 'Tickets', 'Comentários', 'Res. Notes', 'Total', 'Resolvidos', 'Em aberto', '% Resolução']}
          columnAlign={['left', 'right', 'right', 'right', 'right', 'right', 'right', 'right']}
          rows={sortedAgents.map(r => [
            <Row gap={8} align="center">
              <Text weight="medium">{r.agent.name}</Text>
              {r.agent.isFormer ? <Pill tone="neutral" size="sm">ex-N2 · até {r.agent.leftAt}</Pill> : null}
            </Row>,
            r.tickets.toLocaleString('pt-BR'),
            r.comments.toLocaleString('pt-BR'),
            r.resNotes.toLocaleString('pt-BR'),
            <Text weight="semibold">{r.total.toLocaleString('pt-BR')}</Text>,
            r.done.toLocaleString('pt-BR'),
            r.open.toLocaleString('pt-BR'),
            r.tickets > 0 ? `${Math.round((r.done / r.tickets) * 100)}%` : '—',
          ])}
          rowTone={sortedAgents.map(r => r.agent.isFormer ? ('neutral' as const) : undefined)}
        />
      </Stack>
    </Stack>
  );
}
