import {
  BarChart,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  useCanvasState,
} from "cursor/canvas";

type WeeklyPoint = {
  weekStart: string;
  weekEndExclusive: string;
  opened: number;
  openedStillOpen: number;
};

const WEEKLY_DATA: WeeklyPoint[] = [
  { weekStart: "2026-04-27", weekEndExclusive: "2026-05-04", opened: 87, openedStillOpen: 11 },
  { weekStart: "2026-05-04", weekEndExclusive: "2026-05-11", opened: 124, openedStillOpen: 8 },
  { weekStart: "2026-05-11", weekEndExclusive: "2026-05-18", opened: 232, openedStillOpen: 6 },
  { weekStart: "2026-05-18", weekEndExclusive: "2026-05-25", opened: 379, openedStillOpen: 10 },
  { weekStart: "2026-05-25", weekEndExclusive: "2026-06-01", opened: 289, openedStillOpen: 11 },
  { weekStart: "2026-06-01", weekEndExclusive: "2026-06-08", opened: 102, openedStillOpen: 31 },
  { weekStart: "2026-06-08", weekEndExclusive: "2026-06-15", opened: 551, openedStillOpen: 369 },
  { weekStart: "2026-06-15", weekEndExclusive: "2026-06-22", opened: 0, openedStillOpen: 0 },
];

const QUEUES_NOW = {
  n3DevelopmentQueue: 203,
  n1WaitingReturn: 21,
  n2DelayWaitingReturn: 0,
};

const TABLE_HEADERS = [
  "Semana (inicio)",
  "Semana (fim exclusivo)",
  "Tickets abertos",
  "Abertos e ainda em aberto",
];

function toClipboardTsv(headers: string[], rows: string[][]): string {
  return [headers.join("\t"), ...rows.map((row) => row.join("\t"))].join("\n");
}

function formatNow(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export default function SupmedFilasSemanaisCanvas() {
  const [copyFeedback, setCopyFeedback] = useCanvasState("weekly-copy-feedback", "");
  const categories = WEEKLY_DATA.map((point) => point.weekStart);
  const openedSeries = WEEKLY_DATA.map((point) => point.opened);
  const openedStillOpenSeries = WEEKLY_DATA.map((point) => point.openedStillOpen);

  const tableRows = WEEKLY_DATA.map((point) => [
    point.weekStart,
    point.weekEndExclusive,
    String(point.opened),
    String(point.openedStillOpen),
  ]);

  async function handleCopyTable(): Promise<void> {
    if (!navigator?.clipboard?.writeText) {
      setCopyFeedback("Nao foi possivel copiar automaticamente neste ambiente.");
      return;
    }

    try {
      const tsv = toClipboardTsv(TABLE_HEADERS, tableRows);
      await navigator.clipboard.writeText(tsv);
      setCopyFeedback(`Tabela semanal copiada (${tableRows.length} linhas).`);
    } catch {
      setCopyFeedback("Falha ao copiar a tabela para a area de transferencia.");
    }
  }

  const totalOpened = WEEKLY_DATA.reduce((sum, point) => sum + point.opened, 0);
  const totalOpenedStillOpen = WEEKLY_DATA.reduce((sum, point) => sum + point.openedStillOpen, 0);
  const snapshot = formatNow(new Date());

  return (
    <Stack gap={20} style={{ padding: 24 }}>
      <Text tone="secondary" size="small">{`Gerado em ${snapshot}`}</Text>
      <Stack gap={4}>
        <H1>SUPMED - Tickets Semanais e Filas Atuais</H1>
        <Text tone="secondary" size="small">
          Fonte: Jira (MCP) - Projeto SUPMED - Ultimas 8 semanas (segunda a segunda, fim exclusivo)
        </Text>
      </Stack>

      <Grid columns={5} gap={12}>
        <Stat value={String(totalOpened)} label="Total abertos (8 semanas)" />
        <Stat value={String(totalOpenedStillOpen)} label="Ainda em aberto (8 semanas)" tone="warning" />
        <Stat value={String(QUEUES_NOW.n3DevelopmentQueue)} label="Fila Desenvolvimento N3" tone="info" />
        <Stat value={String(QUEUES_NOW.n1WaitingReturn)} label="Fila N1 aguardando retorno" tone="warning" />
        <Stat value={String(QUEUES_NOW.n2DelayWaitingReturn)} label="Fila N2 aguardando retorno (delay)" tone="danger" />
      </Grid>

      <Divider />

      <Stack gap={8}>
        <H2>Serie semanal de tickets</H2>
        <Text tone="secondary" size="small">
          Eixo X: semana (data de inicio) - Eixo Y: quantidade de tickets
        </Text>
        <Text tone="secondary" size="small">
          Legenda: "Tickets abertos" e "Abertos e ainda em aberto"
        </Text>
        <BarChart
          categories={categories}
          series={[
            { name: "Tickets abertos", data: openedSeries, tone: "info" },
            { name: "Abertos e ainda em aberto", data: openedStillOpenSeries, tone: "warning" },
          ]}
          height={300}
        />
        <Text tone="secondary" size="small">
          Fonte: Jira SUPMED - Janela: 2026-04-27 a 2026-06-22 (fim exclusivo)
        </Text>
      </Stack>

      <Divider />

      <Card>
        <CardHeader trailing={<Button onClick={() => void handleCopyTable()}>Copiar tabela</Button>}>
          Tabela semanal
        </CardHeader>
        <CardBody>
          <Text tone="secondary" size="small">Clique para copiar e colar em planilha.</Text>
          {copyFeedback ? <Text tone="secondary" size="small">{copyFeedback}</Text> : null}
          <Row>
            <Table headers={TABLE_HEADERS} rows={tableRows} />
          </Row>
        </CardBody>
      </Card>

      <Divider />

      <Stack gap={6}>
        <H2>Definicoes usadas</H2>
        <Text tone="secondary" size="small">
          Tickets em aberto por semana: tickets criados na semana e que hoje nao estao em statusCategory Done.
        </Text>
        <Text tone="secondary" size="small">
          Fila Desenvolvimento N3: customfield_11520 = "Em Desenvolvimento".
        </Text>
        <Text tone="secondary" size="small">
          Fila N1 aguardando retorno: status = "Feedback Aluno". Fila N2 delay aguardando retorno: status = "Aguardando Retorno".
        </Text>
      </Stack>
    </Stack>
  );
}
