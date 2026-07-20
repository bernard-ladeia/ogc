import {
  BarChart,
  Button,
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
  useCanvasAction,
  useCanvasState,
} from '@/lib/cursor-canvas';

const TOTAL_B2B_CRIADOS = 1650;
const TOTAL_B2B_RESOLVIDOS = 1650;
const TOTAL_B2B_PASSOU_OUTRA_EQUIPE = 0;
const TOTAL_B2B_RESOLVIDOS_NO_PROPRIO_B2B = 1650;

const PERIODO_INICIO = '16/04/2026';
const PERIODO_FIM = '13/07/2026';
const MES_TODOS = 'todos';
const HEALTH_PANEL_PATH = 'C:/Users/BernardLadeia/.cursor/projects/d-Medcof-HealthPanel-Project/canvases/operational-governance-center.canvas.tsx';

const MENSAL_B2B = [
  { mes: 'Abr/2026', total: 10, resolvidos: 10 },
  { mes: 'Mai/2026', total: 752, resolvidos: 752 },
  { mes: 'Jun/2026', total: 691, resolvidos: 691 },
  { mes: 'Jul/2026', total: 197, resolvidos: 197 },
];

const FLUXO_RESOLUCAO_B2B_MENSAL = [
  { mes: 'Abr/2026', resolvidos_no_b2b: 10, passou_outra_equipe: 0 },
  { mes: 'Mai/2026', resolvidos_no_b2b: 752, passou_outra_equipe: 0 },
  { mes: 'Jun/2026', resolvidos_no_b2b: 691, passou_outra_equipe: 0 },
  { mes: 'Jul/2026', resolvidos_no_b2b: 197, passou_outra_equipe: 0 },
];

const TICKETS_ENVIADOS_N3: Array<{ key: string; created: string; status: string; summary: string }> = [

];
const TICKETS_NAO_RESOLVIDOS_B2B: Array<{ key: string; created: string; status: string; summary: string }> = [

];

function fmt(n: number): string {
  return n.toLocaleString('pt-BR');
}

function pct(n: number, total: number): string {
  if (total === 0) return '0,0%';
  return `${((n / total) * 100).toFixed(1).replace('.', ',')}%`;
}

export default function SupmedB2BTratadosCanvas() {
  const dispatch = useCanvasAction();
  const [mostrarTicketsN3, setMostrarTicketsN3] = useCanvasState('mostrar-tickets-n3', false);
  const [mostrarTicketsNaoResolvidos, setMostrarTicketsNaoResolvidos] = useCanvasState('mostrar-tickets-nao-resolvidos-b2b', false);
  const [mesSelecionado, setMesSelecionado] = useCanvasState('mes-b2b-selecionado', MES_TODOS);
  const mensalFiltrado = mesSelecionado === MES_TODOS ? MENSAL_B2B : MENSAL_B2B.filter((d) => d.mes === mesSelecionado);
  const fluxoResolucaoFiltrado =
    mesSelecionado === MES_TODOS ? FLUXO_RESOLUCAO_B2B_MENSAL : FLUXO_RESOLUCAO_B2B_MENSAL.filter((d) => d.mes === mesSelecionado);
  const totalB2bCriados = mensalFiltrado.reduce((total, item) => total + item.total, 0);
  const totalB2bResolvidos = mensalFiltrado.reduce((total, item) => total + item.resolvidos, 0);
  const totalB2bPassouOutraEquipe = fluxoResolucaoFiltrado.reduce((total, item) => total + item.passou_outra_equipe, 0);
  const totalB2bResolvidosNoProprioB2b = fluxoResolucaoFiltrado.reduce((total, item) => total + item.resolvidos_no_b2b, 0);
  const periodoSelecionado = mesSelecionado === MES_TODOS ? `${PERIODO_INICIO} a ${PERIODO_FIM}` : mesSelecionado;

  return (
    <Stack gap={16}>
      <Stack gap={6}>
        <Row gap={10} align="center">
          <Stack gap={4} style={{ flex: 1 }}>
            <H1>B2B Operations Health</H1>
          </Stack>
          <Pill tone="info" size="sm">{periodoSelecionado}</Pill>
          <Button
            variant="secondary"
            onClick={() => dispatch({ type: 'openFile', path: HEALTH_PANEL_PATH })}
          >
            Voltar ao Operational Governance Center
          </Button>
        </Row>
        <Text tone="secondary" size="small">
          Base B2B = união (sem duplicar ticket): `issuetype` B2B OU `Fila de Atendimento - SD =
          B2B Premium`.
        </Text>
      </Stack>

      <Row gap={8} align="center">
        <Text weight="medium">Filtrar mês</Text>
        <Select
          value={mesSelecionado}
          onChange={setMesSelecionado}
          options={[
            { value: MES_TODOS, label: 'Todos os meses' },
            ...MENSAL_B2B.map((d) => ({ value: d.mes, label: d.mes })),
          ]}
          style={{ width: 180 }}
        />
      </Row>

      <Grid columns={3} gap={16}>
        <Stat value={fmt(totalB2bCriados)} label="Total de tickets B2B criados (base unificada)" tone="info" />
        <div
          onClick={() => setMostrarTicketsNaoResolvidos((prev) => !prev)}
          role="button"
          tabIndex={0}
          style={{ cursor: 'pointer' }}
        >
          <Stat value={pct(totalB2bResolvidos, totalB2bCriados)} label="% de tickets resolvidos" tone="success" />
        </div>
        <div
          onClick={() => setMostrarTicketsN3((prev) => !prev)}
          role="button"
          tabIndex={0}
          style={{ cursor: 'pointer' }}
        >
          <Stat
            value={pct(totalB2bPassouOutraEquipe, totalB2bCriados)}
            label='% de tickets enviados para N3'
            tone="warning"
          />
        </div>
      </Grid>

      {mostrarTicketsNaoResolvidos && TICKETS_NAO_RESOLVIDOS_B2B.length > 0 && (
        <Stack gap={8}>
          <H2>Tickets B2B não concluídos</H2>
          <Table
            headers={['Ticket', 'Criado em', 'Status atual', 'Resumo']}
            columnAlign={['left', 'left', 'left', 'left']}
            rows={TICKETS_NAO_RESOLVIDOS_B2B.map((ticket) => [ticket.key, ticket.created, ticket.status, ticket.summary])}
          />
        </Stack>
      )}

      {mostrarTicketsN3 && TICKETS_ENVIADOS_N3.length > 0 && (
        <Stack gap={8}>
          <H2>Tickets B2B enviados para N3</H2>
          <Table
            headers={['Ticket', 'Criado em', 'Status atual', 'Resumo']}
            columnAlign={['left', 'left', 'left', 'left']}
            rows={TICKETS_ENVIADOS_N3.map((ticket) => [ticket.key, ticket.created, ticket.status, ticket.summary])}
          />
        </Stack>
      )}

      <Stack gap={8}>
        <H2>Tickets B2B criados por mês</H2>
        <Text tone="secondary" size="small">
          Eixo X: mês de criação · Eixo Y: quantidade de tickets criados (unidade: tickets) ·
          Critério B2B: `issuetype` B2B OU `Fila de Atendimento - SD = B2B Premium` · Resolvidos
          = status na categoria `done`.
        </Text>
        <BarChart
          categories={mensalFiltrado.map((d) => d.mes)}
          series={[
            { name: 'Tickets Criados', data: mensalFiltrado.map((d) => d.total), tone: 'warning' },
            { name: 'Tickets Resolvidos', data: mensalFiltrado.map((d) => d.resolvidos), tone: 'success' },
          ]}
          showValues
          height={300}
        />
      </Stack>

      <Stack gap={10}>
        <H2>Detalhamento Mensal</H2>
        <Table
          headers={['Mês', 'Tickets B2B criados', 'Resolvidos']}
          columnAlign={['left', 'right', 'right']}
          rows={mensalFiltrado.map((d) => [d.mes, fmt(d.total), fmt(d.resolvidos)])}
        />
      </Stack>

      <Stack gap={8}>
        <H2>Resolução B2B</H2>
        <Text tone="secondary" size="small">
          Eixo X: mês de criação · Eixo Y: quantidade de tickets (unidade: tickets) · Base:
          tickets B2B da base unificada no SUPMED. Critério "outra equipe": passagem por status
          `Em desenvolvimento N3`.
        </Text>
        <BarChart
          categories={fluxoResolucaoFiltrado.map((d) => d.mes)}
          series={[
            { name: 'Resolvidos no próprio B2B', data: fluxoResolucaoFiltrado.map((d) => d.resolvidos_no_b2b), tone: 'success' },
            { name: 'Passaram por outra equipe (N3)', data: fluxoResolucaoFiltrado.map((d) => d.passou_outra_equipe), tone: 'danger' },
          ]}
          showValues
          height={300}
        />
        <Text tone="secondary" size="small">
          Total B2B resolvidos: {fmt(totalB2bResolvidos)} · Resolvidos no próprio B2B: {fmt(totalB2bResolvidosNoProprioB2b)}.
        </Text>
      </Stack>
    </Stack>
  );
}
