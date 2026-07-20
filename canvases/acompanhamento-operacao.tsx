import { Button, Card, CardBody, CardHeader, Code, Grid, H1, H2, Row, Select, Stack, Stat, Table, Text, useCanvasState } from "cursor/canvas";

type AgentRow = {
  agent: string;
  workedTickets: number;
  interactions: number;
  resolvedTickets: number;
  resolutionRate: number;
  createdTickets: number;
  fcrTickets: number;
  fcrRate: number;
  sampleTickets?: string[];
};

type PeriodData = {
  id: string;
  label: string;
  start: string;
  end: string;
  sourceIssues: number;
  createdInPeriod: number;
  createdB2BTickets: number;
  createdCheckoutTickets: number;
  resolvedInSource: number;
  resolvedB2BTickets: number;
  resolvedCheckoutTickets: number;
  complete: boolean;
  n2CxRows: AgentRow[];
  n15Rows: AgentRow[];
  notes: string[];
};

const ALL_PERIOD_ID = "all";

const CX_AGENTS = new Set(["Jadder Reis"]);

const periods: PeriodData[] = [
  {
    id: "2026-01",
    label: "Janeiro/2026",
    start: "2026-01-01",
    end: "2026-01-31",
    sourceIssues: 480,
    createdInPeriod: 3,
    createdB2BTickets: 0,
    createdCheckoutTickets: 0,
    resolvedInSource: 477,
    resolvedB2BTickets: 0,
    resolvedCheckoutTickets: 0,
    complete: true,
    n2CxRows: [
      { agent: "Eduardo Bombarda", workedTickets: 366, interactions: 989, resolvedTickets: 4, resolutionRate: 1.1, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-691", "SUPMED-629", "SUPMED-788"] },
      { agent: "Luis Henrique Gonçalves Angelim", workedTickets: 137, interactions: 349, resolvedTickets: 2, resolutionRate: 1.5, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-636", "SUPMED-691", "SUPMED-656"] },
    ],
    n15Rows: [],
    notes: ["Recalculado pela base completa N2/CX: comentários no mês, assignee atual em tickets atualizados no mês e Resolution Notes."],
  },
  {
    id: "2026-02",
    label: "Fevereiro/2026",
    start: "2026-02-01",
    end: "2026-02-28",
    sourceIssues: 297,
    createdInPeriod: 0,
    createdB2BTickets: 0,
    createdCheckoutTickets: 0,
    resolvedInSource: 288,
    resolvedB2BTickets: 0,
    resolvedCheckoutTickets: 0,
    complete: true,
    n2CxRows: [
      { agent: "Eduardo Bombarda", workedTickets: 171, interactions: 571, resolvedTickets: 1, resolutionRate: 0.6, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-945", "SUPMED-1131"] },
      { agent: "Maria Vitoria Jarzinski Oliveira", workedTickets: 91, interactions: 318, resolvedTickets: 0, resolutionRate: 0, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-1475", "SUPMED-1480"] },
      { agent: "Luis Henrique Gonçalves Angelim", workedTickets: 68, interactions: 200, resolvedTickets: 0, resolutionRate: 0, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-1456", "SUPMED-1451"] },
      { agent: "Pedro H Pinheiro", workedTickets: 36, interactions: 128, resolvedTickets: 0, resolutionRate: 0, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-1486", "SUPMED-1482", "SUPMED-1457"] },
    ],
    n15Rows: [],
    notes: ["Amostra validada no Jira MCP: SUPMED-1475 tem comentários da Maria, SUPMED-1456 tem comentários/assignee do Luis e SUPMED-1486 tem comentários do Pedro em fevereiro."],
  },
  {
    id: "2026-03",
    label: "Março/2026",
    start: "2026-03-01",
    end: "2026-03-31",
    sourceIssues: 511,
    createdInPeriod: 0,
    createdB2BTickets: 0,
    createdCheckoutTickets: 0,
    resolvedInSource: 485,
    resolvedB2BTickets: 0,
    resolvedCheckoutTickets: 0,
    complete: true,
    n2CxRows: [
      { agent: "Eduardo Bombarda", workedTickets: 217, interactions: 592, resolvedTickets: 65, resolutionRate: 30, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-1338", "SUPMED-1270", "SUPMED-1268"] },
      { agent: "Luis Henrique Gonçalves Angelim", workedTickets: 178, interactions: 439, resolvedTickets: 41, resolutionRate: 23, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-1456", "SUPMED-1441", "SUPMED-1444"] },
      { agent: "Maria Vitoria Jarzinski Oliveira", workedTickets: 131, interactions: 452, resolvedTickets: 1, resolutionRate: 0.8, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-1480", "SUPMED-1329", "SUPMED-1489"] },
      { agent: "Pedro H Pinheiro", workedTickets: 112, interactions: 317, resolvedTickets: 1, resolutionRate: 0.9, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-1482", "SUPMED-1430"] },
    ],
    n15Rows: [],
    notes: ["Recalculado pela base completa N2/CX; agentes com comentários aparecem mesmo quando não possuem Resolution Notes no mês."],
  },
  {
    id: "2026-04",
    label: "Abril/2026",
    start: "2026-04-01",
    end: "2026-04-30",
    sourceIssues: 505,
    createdInPeriod: 12,
    createdB2BTickets: 11,
    createdCheckoutTickets: 0,
    resolvedInSource: 440,
    resolvedB2BTickets: 11,
    resolvedCheckoutTickets: 0,
    complete: true,
    n2CxRows: [
      { agent: "Maria Vitoria Jarzinski Oliveira", workedTickets: 140, interactions: 429, resolvedTickets: 8, resolutionRate: 5.7, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-2238", "SUPMED-2303"] },
      { agent: "Luis Henrique Gonçalves Angelim", workedTickets: 137, interactions: 321, resolvedTickets: 0, resolutionRate: 0, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-1091", "SUPMED-1171", "SUPMED-1227"] },
      { agent: "Eduardo Bombarda", workedTickets: 134, interactions: 386, resolvedTickets: 1, resolutionRate: 0.7, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-1062", "SUPMED-2262", "SUPMED-1405"] },
      { agent: "Pedro H Pinheiro", workedTickets: 93, interactions: 260, resolvedTickets: 0, resolutionRate: 0, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-2310", "SUPMED-2426", "SUPMED-2309"] },
      { agent: "Kevin da Silva Araujo", workedTickets: 23, interactions: 57, resolvedTickets: 0, resolutionRate: 0, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-2457", "SUPMED-2393", "SUPMED-2498"] },
      { agent: "Jadder Reis", workedTickets: 12, interactions: 43, resolvedTickets: 0, resolutionRate: 0, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-2429", "SUPMED-2360"] },
    ],
    n15Rows: [{ agent: "Raryane Cavalcante", workedTickets: 3, interactions: 8, resolvedTickets: 3, resolutionRate: 100, createdTickets: 0, fcrTickets: 0, fcrRate: 0 }],
    notes: ["Recalculado pela base completa N2/CX; a linha N1.5 foi preservada da coleta original do Canvas."],
  },
  {
    id: "2026-05",
    label: "Maio/2026",
    start: "2026-05-01",
    end: "2026-05-31",
    sourceIssues: 1261,
    createdInPeriod: 849,
    createdB2BTickets: 752,
    createdCheckoutTickets: 1,
    resolvedInSource: 1229,
    resolvedB2BTickets: 752,
    resolvedCheckoutTickets: 2,
    complete: true,
    n2CxRows: [
      { agent: "Jadder Reis", workedTickets: 761, interactions: 1560, resolvedTickets: 758, resolutionRate: 99.6, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-2718", "SUPMED-2572"] },
      { agent: "Eduardo Bombarda", workedTickets: 137, interactions: 347, resolvedTickets: 46, resolutionRate: 33.6, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-1405", "SUPMED-1371", "SUPMED-1327"] },
      { agent: "Pedro H Pinheiro", workedTickets: 120, interactions: 328, resolvedTickets: 64, resolutionRate: 53.3, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-1488", "SUPMED-2663", "SUPMED-2617"] },
      { agent: "Luis Henrique Gonçalves Angelim", workedTickets: 113, interactions: 272, resolvedTickets: 56, resolutionRate: 49.6, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-1469", "SUPMED-1454", "SUPMED-1453"] },
      { agent: "Kevin da Silva Araujo", workedTickets: 90, interactions: 297, resolvedTickets: 26, resolutionRate: 28.9, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-2633", "SUPMED-2645"] },
      { agent: "Maria Vitoria Jarzinski Oliveira", workedTickets: 84, interactions: 174, resolvedTickets: 48, resolutionRate: 57.1, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-1405", "SUPMED-1371", "SUPMED-2279"] },
    ],
    n15Rows: [
      { agent: "Jadder Reis", workedTickets: 761, interactions: 1038, resolvedTickets: 761, resolutionRate: 100, createdTickets: 227, fcrTickets: 226, fcrRate: 99.6 },
      { agent: "Almir William", workedTickets: 302, interactions: 342, resolvedTickets: 301, resolutionRate: 99.7, createdTickets: 300, fcrTickets: 294, fcrRate: 98 },
      { agent: "Raryane Cavalcante", workedTickets: 118, interactions: 158, resolvedTickets: 118, resolutionRate: 100, createdTickets: 113, fcrTickets: 104, fcrRate: 92 },
    ],
    notes: ["N2/CX recalculado pela base completa; N1.5 preservado da coleta original para manter FCR e criados."],
  },
  {
    id: "2026-06",
    label: "Junho/2026",
    start: "2026-06-01",
    end: "2026-06-30",
    sourceIssues: 1172,
    createdInPeriod: 855,
    createdB2BTickets: 689,
    createdCheckoutTickets: 67,
    resolvedInSource: 1044,
    resolvedB2BTickets: 689,
    resolvedCheckoutTickets: 63,
    complete: true,
    n2CxRows: [
      { agent: "Jadder Reis", workedTickets: 693, interactions: 1412, resolvedTickets: 692, resolutionRate: 99.9, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-3598", "SUPMED-3599"] },
      { agent: "Kevin da Silva Araujo", workedTickets: 132, interactions: 387, resolvedTickets: 40, resolutionRate: 30.3, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-2879", "SUPMED-3308", "SUPMED-1292"] },
      { agent: "Eduardo Bombarda", workedTickets: 124, interactions: 329, resolvedTickets: 53, resolutionRate: 42.7, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-1265", "SUPMED-1261", "SUPMED-2493"] },
      { agent: "Pedro H Pinheiro", workedTickets: 103, interactions: 311, resolvedTickets: 41, resolutionRate: 39.8, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-3581", "SUPMED-1383", "SUPMED-1374"] },
      { agent: "Luis Henrique Gonçalves Angelim", workedTickets: 84, interactions: 198, resolvedTickets: 47, resolutionRate: 56, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-3572", "SUPMED-1323", "SUPMED-1322"] },
      { agent: "Maria Vitoria Jarzinski Oliveira", workedTickets: 55, interactions: 199, resolvedTickets: 46, resolutionRate: 83.6, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-3728"] },
    ],
    n15Rows: [
      { agent: "Jadder Reis", workedTickets: 692, interactions: 1408, resolvedTickets: 692, resolutionRate: 100, createdTickets: 690, fcrTickets: 690, fcrRate: 100 },
      { agent: "Almir William", workedTickets: 55, interactions: 122, resolvedTickets: 49, resolutionRate: 89.1, createdTickets: 31, fcrTickets: 17, fcrRate: 54.8 },
      { agent: "Raryane Cavalcante", workedTickets: 40, interactions: 111, resolvedTickets: 37, resolutionRate: 92.5, createdTickets: 22, fcrTickets: 5, fcrRate: 22.7 },
    ],
    notes: ["N2/CX recalculado pela base completa; N1.5 preservado da coleta original para manter FCR e criados."],
  },
  {
    id: "2026-07",
    label: "Julho/2026",
    start: "2026-07-01",
    end: "2026-07-07",
    sourceIssues: 180,
    createdInPeriod: 208,
    createdB2BTickets: 137,
    createdCheckoutTickets: 7,
    resolvedInSource: 128,
    resolvedB2BTickets: 137,
    resolvedCheckoutTickets: 8,
    complete: true,
    n2CxRows: [
      { agent: "Jadder Reis", workedTickets: 110, interactions: 222, resolvedTickets: 110, resolutionRate: 100, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-4612", "SUPMED-4613"] },
      { agent: "Kevin da Silva Araujo", workedTickets: 25, interactions: 58, resolvedTickets: 3, resolutionRate: 12, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-3674", "SUPMED-3604", "SUPMED-3668"] },
      { agent: "Eduardo Bombarda", workedTickets: 14, interactions: 34, resolvedTickets: 0, resolutionRate: 0, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-3707", "SUPMED-4588", "SUPMED-4603"] },
      { agent: "Pedro H Pinheiro", workedTickets: 14, interactions: 39, resolvedTickets: 0, resolutionRate: 0, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-2273", "SUPMED-3509", "SUPMED-4605"] },
      { agent: "Luis Henrique Gonçalves Angelim", workedTickets: 12, interactions: 33, resolvedTickets: 1, resolutionRate: 8.3, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-3602", "SUPMED-3589", "SUPMED-4622"] },
      { agent: "Maria Vitoria Jarzinski Oliveira", workedTickets: 8, interactions: 28, resolvedTickets: 8, resolutionRate: 100, createdTickets: 0, fcrTickets: 0, fcrRate: 0, sampleTickets: ["SUPMED-4241"] },
    ],
    n15Rows: [
      { agent: "Jadder Reis", workedTickets: 143, interactions: 288, resolvedTickets: 143, resolutionRate: 100, createdTickets: 142, fcrTickets: 142, fcrRate: 100 },
      { agent: "João Ribeiro", workedTickets: 26, interactions: 64, resolvedTickets: 9, resolutionRate: 34.6, createdTickets: 17, fcrTickets: 0, fcrRate: 0 },
      { agent: "Almir William", workedTickets: 16, interactions: 37, resolvedTickets: 8, resolutionRate: 50, createdTickets: 11, fcrTickets: 4, fcrRate: 36.4 },
      { agent: "Raryane Cavalcante", workedTickets: 15, interactions: 37, resolvedTickets: 9, resolutionRate: 60, createdTickets: 11, fcrTickets: 8, fcrRate: 72.7 },
    ],
    notes: ["N2/CX recalculado pela base completa. Julho considera dados até 07/07/2026; N1.5 foi preservado da coleta original."],
  },
];

const percent = (value: number) => `${value.toFixed(value % 1 === 0 ? 0 : 1)}%`;

const sum = (rows: AgentRow[], key: keyof Pick<AgentRow, "workedTickets" | "interactions" | "resolvedTickets" | "createdTickets" | "fcrTickets">) =>
  rows.reduce((total, row) => total + row[key], 0);

const weightedRate = (numerator: number, denominator: number) => (denominator > 0 ? percent((numerator / denominator) * 100) : "0%");

type ClipboardCell = string | number;

function toClipboardTsv(headers: string[], rows: ClipboardCell[][]): string {
  const lines = [
    headers.join("\t"),
    ...rows.map((row) => row.map((cell) => String(cell)).join("\t")),
  ];

  return lines.join("\n");
}

const aggregateRows = (rows: AgentRow[]) => {
  const byAgent = new Map<string, AgentRow>();

  rows.forEach((row) => {
    const current = byAgent.get(row.agent);

    if (!current) {
      byAgent.set(row.agent, { ...row, sampleTickets: row.sampleTickets ? [...row.sampleTickets] : undefined });
      return;
    }

    const workedTickets = current.workedTickets + row.workedTickets;
    const resolvedTickets = current.resolvedTickets + row.resolvedTickets;
    const createdTickets = current.createdTickets + row.createdTickets;
    const fcrTickets = current.fcrTickets + row.fcrTickets;
    const sampleTickets = [...(current.sampleTickets ?? []), ...(row.sampleTickets ?? [])];

    byAgent.set(row.agent, {
      ...current,
      workedTickets,
      interactions: current.interactions + row.interactions,
      resolvedTickets,
      resolutionRate: workedTickets > 0 ? (resolvedTickets / workedTickets) * 100 : 0,
      createdTickets,
      fcrTickets,
      fcrRate: createdTickets > 0 ? (fcrTickets / createdTickets) * 100 : 0,
      sampleTickets: [...new Set(sampleTickets)],
    });
  });

  return [...byAgent.values()];
};

const allPeriod: PeriodData = {
  id: ALL_PERIOD_ID,
  label: "Todos",
  start: periods[0].start,
  end: periods[periods.length - 1].end,
  sourceIssues: periods.reduce((total, period) => total + period.sourceIssues, 0),
  createdInPeriod: periods.reduce((total, period) => total + period.createdInPeriod, 0),
  createdB2BTickets: periods.reduce((total, period) => total + period.createdB2BTickets, 0),
  createdCheckoutTickets: periods.reduce((total, period) => total + period.createdCheckoutTickets, 0),
  resolvedInSource: periods.reduce((total, period) => total + period.resolvedInSource, 0),
  resolvedB2BTickets: periods.reduce((total, period) => total + period.resolvedB2BTickets, 0),
  resolvedCheckoutTickets: periods.reduce((total, period) => total + period.resolvedCheckoutTickets, 0),
  complete: true,
  n2CxRows: aggregateRows(periods.flatMap((period) => period.n2CxRows)),
  n15Rows: aggregateRows(periods.flatMap((period) => period.n15Rows)),
  notes: ["Visão consolidada de todos os meses disponíveis no canvas. Tickets trabalhados são somados por mês, portanto um mesmo ticket pode aparecer em mais de um período quando houve atuação recorrente."],
};

const periodOptions = [allPeriod, ...periods];

const n2RowsOf = (period: PeriodData) => period.n2CxRows.filter((row) => !CX_AGENTS.has(row.agent));

const n15RowsOf = (period: PeriodData) => period.n15Rows.filter((row) => !CX_AGENTS.has(row.agent));

const cxRowsOf = (period: PeriodData) => {
  const rows = [...period.n2CxRows, ...period.n15Rows].filter((row) => CX_AGENTS.has(row.agent));
  const byAgent = new Map<string, AgentRow>();

  rows.forEach((row) => {
    const current = byAgent.get(row.agent);

    if (!current) {
      byAgent.set(row.agent, { ...row });
      return;
    }

    const workedTickets = Math.max(current.workedTickets, row.workedTickets);
    const resolvedTickets = Math.max(current.resolvedTickets, row.resolvedTickets);
    const createdTickets = Math.max(current.createdTickets, row.createdTickets);
    const fcrTickets = Math.max(current.fcrTickets, row.fcrTickets);

    byAgent.set(row.agent, {
      ...current,
      workedTickets,
      interactions: Math.max(current.interactions, row.interactions),
      resolvedTickets,
      resolutionRate: workedTickets > 0 ? (resolvedTickets / workedTickets) * 100 : 0,
      createdTickets,
      fcrTickets,
      fcrRate: createdTickets > 0 ? (fcrTickets / createdTickets) * 100 : 0,
      sampleTickets: current.sampleTickets ?? row.sampleTickets,
    });
  });

  return [...byAgent.values()];
};

function AcompanhamentoOperacao() {
  const [selectedPeriodId, setSelectedPeriodId] = useCanvasState("selectedPeriodId", ALL_PERIOD_ID);
  const [showMonthlyTable, setShowMonthlyTable] = useCanvasState("showMonthlyTable", true);
  const [showN2Table, setShowN2Table] = useCanvasState("showN2Table", true);
  const [showN15Table, setShowN15Table] = useCanvasState("showN15Table", true);
  const [showCxTable, setShowCxTable] = useCanvasState("showCxTable", true);
  const [copyFeedback, setCopyFeedback] = useCanvasState("copyFeedback", "");
  const period = periodOptions.find((item) => item.id === selectedPeriodId) ?? allPeriod;
  const n2Rows = n2RowsOf(period);
  const cxRows = cxRowsOf(period);
  const n15Rows = n15RowsOf(period);
  const regularResolvedTickets = Math.max(
    period.resolvedInSource - period.resolvedB2BTickets - period.resolvedCheckoutTickets,
    0,
  );
  const monthlyHeaders = ["Mês", "Status coleta", "Total tickets", "Criados", "Criados B2B", "Criados Checkout", "Concluídos", "Concluídos B2B", "Concluídos Checkout", "N2 trabalhados", "CX trabalhados", "N1.5 trabalhados", "N1.5 FCR"];
  const monthlyRows = periods.map((item) => {
    const itemN2Rows = n2RowsOf(item);
    const itemCxRows = cxRowsOf(item);
    const itemN2Worked = sum(itemN2Rows, "workedTickets");
    const itemCxWorked = sum(itemCxRows, "workedTickets");
    const itemN15Rows = n15RowsOf(item);
    const itemN15Worked = sum(itemN15Rows, "workedTickets");
    const itemN15Created = sum(itemN15Rows, "createdTickets");
    const itemN15Fcr = sum(itemN15Rows, "fcrTickets");

    return [
      item.label,
      item.complete ? "Completa" : "Parcial",
      item.sourceIssues,
      item.createdInPeriod,
      item.createdB2BTickets,
      item.createdCheckoutTickets,
      item.resolvedInSource,
      item.resolvedB2BTickets,
      item.resolvedCheckoutTickets,
      itemN2Worked,
      itemCxWorked,
      itemN15Worked,
      weightedRate(itemN15Fcr, itemN15Created),
    ];
  });
  const n2Headers = ["Agente", "Interações", "Tickets trabalhados", "Tickets solucionados", "Taxa de resolução"];
  const n2TableRows = n2Rows.map((row) => [
    row.agent,
    row.interactions,
    row.workedTickets,
    row.resolvedTickets,
    percent(row.resolutionRate),
  ]);
  const n15Headers = ["Agente", "Tickets trabalhados", "Tickets solucionados", "Taxa resolução interagidos", "Criados", "FCR", "Taxa FCR"];
  const n15TableRows = n15Rows.map((row) => [
    row.agent,
    row.workedTickets,
    row.resolvedTickets,
    percent(row.resolutionRate),
    row.createdTickets,
    row.fcrTickets,
    percent(row.fcrRate),
  ]);
  const cxHeaders = ["Agente", "Interações", "Tickets trabalhados", "Tickets solucionados", "Taxa de resolução", "Criados", "FCR", "Taxa FCR"];
  const cxTableRows = cxRows.map((row) => [
    row.agent,
    row.interactions,
    row.workedTickets,
    row.resolvedTickets,
    percent(row.resolutionRate),
    row.createdTickets,
    row.fcrTickets,
    percent(row.fcrRate),
  ]);

  async function handleCopyTable(label: string, headers: string[], rows: ClipboardCell[][]): Promise<void> {
    if (!navigator?.clipboard?.writeText) {
      setCopyFeedback("Não foi possível copiar automaticamente neste ambiente.");
      return;
    }

    try {
      await navigator.clipboard.writeText(toClipboardTsv(headers, rows));
      setCopyFeedback(`${label} copiada (${rows.length} linhas).`);
    } catch {
      setCopyFeedback(`Falha ao copiar ${label}.`);
    }
  }

  return (
    <Stack gap={20} style={{ padding: 24 }}>
      <Row justify="space-between" align="start" gap={16} wrap>
        <Stack gap={6}>
          <H1>Acompanhamento Operação</H1>
          <Text tone="secondary">
            Report mensal de atuação dos times <Code>time-ti-n2</Code>, <Code>time-ti-cx</Code> e <Code>time-ti-n1.5</Code> no Jira, com CX separado da leitura técnica N2.
          </Text>
        </Stack>
        <Row gap={8} align="center" wrap>
          <Select
            aria-label="Mês"
            value={period.id}
            options={periodOptions.map((item) => ({ label: item.label, value: item.id }))}
            onChange={setSelectedPeriodId}
          />
        </Row>
      </Row>

      <Grid columns={4} gap={12}>
        <Stat value={period.sourceIssues} label="Número total de tickets" />
        <Stat value={period.createdInPeriod} label="Tickets criados no mês" />
        <Stat value={period.createdB2BTickets} label="Tickets criados B2B" />
        <Stat value={period.createdCheckoutTickets} label="Tickets criados Checkout" />
        <Stat value={regularResolvedTickets} label="Tickets concluídos" tone="success" />
        <Stat value={period.resolvedB2BTickets} label="Tickets concluídos B2B" tone="success" />
        <Stat value={period.resolvedCheckoutTickets} label="Tickets concluídos Checkout" tone="success" />
        <Stat value={period.resolvedInSource} label="Total de tickets concluídos" tone="success" />
      </Grid>

      {copyFeedback ? (
        <Text tone="secondary" size="small">{copyFeedback}</Text>
      ) : null}

      <Stack gap={8}>
        <Row justify="space-between" align="center" gap={8} wrap>
          <H2>Comparativo mensal</H2>
          <Row gap={8} align="center" wrap>
            <Button variant="secondary" onClick={() => void handleCopyTable("Comparativo mensal", monthlyHeaders, monthlyRows)}>
              Copiar tabela
            </Button>
            <Button variant="secondary" onClick={() => setShowMonthlyTable(!showMonthlyTable)}>
              {showMonthlyTable ? "Retrair tabela" : "Expandir tabela"}
            </Button>
          </Row>
        </Row>
        <Text tone="secondary" size="small">
          Visão de janeiro/2026 até agora. Os volumes separam tickets gerais, B2B e Checkout; N2 exclui CX.
        </Text>
        {showMonthlyTable ? (
          <Table
            headers={monthlyHeaders}
            rows={monthlyRows}
            columnAlign={["left", "left", "right", "right", "right", "right", "right", "right", "right", "right", "right", "right", "right"]}
            striped
          />
        ) : null}
      </Stack>

      <Stack gap={8}>
        <Row justify="space-between" align="center" gap={8} wrap>
          <H2>Time TI N2</H2>
          <Row gap={8} align="center" wrap>
            <Button variant="secondary" onClick={() => void handleCopyTable("Tabela Time TI N2", n2Headers, n2TableRows)}>
              Copiar tabela
            </Button>
            <Button variant="secondary" onClick={() => setShowN2Table(!showN2Table)}>
              {showN2Table ? "Retrair tabela" : "Expandir tabela"}
            </Button>
          </Row>
        </Row>
        <Text tone="secondary" size="small">
          Tickets trabalhados contam tickets únicos com comentário no mês ou responsabilidade atual em ticket atualizado no mês. CX foi retirado desta tabela para manter a comparação entre agentes técnicos do N2.
        </Text>
        {showN2Table ? (
          <Table
            headers={n2Headers}
            rows={n2TableRows}
            columnAlign={["left", "right", "right", "right", "right"]}
            striped
          />
        ) : null}
      </Stack>

      <Stack gap={8}>
        <Row justify="space-between" align="center" gap={8} wrap>
          <H2>Time TI N1.5</H2>
          <Row gap={8} align="center" wrap>
            <Button variant="secondary" onClick={() => void handleCopyTable("Tabela Time TI N1.5", n15Headers, n15TableRows)}>
              Copiar tabela
            </Button>
            <Button variant="secondary" onClick={() => setShowN15Table(!showN15Table)}>
              {showN15Table ? "Retrair tabela" : "Expandir tabela"}
            </Button>
          </Row>
        </Row>
        <Text tone="secondary" size="small">
          A taxa de resolução considera tickets interagidos. O primeiro contato considera tickets criados e solucionados sem evidência de envio para N2/desenvolvimento nos campos coletados.
        </Text>
        {showN15Table ? (
          <Table
            headers={n15Headers}
            rows={n15TableRows}
            columnAlign={["left", "right", "right", "right", "right", "right", "right"]}
            striped
          />
        ) : null}
      </Stack>

      {cxRows.length > 0 ? (
        <Stack gap={8}>
          <Row justify="space-between" align="center" gap={8} wrap>
            <H2>Time TI CX</H2>
            <Row gap={8} align="center" wrap>
              <Button variant="secondary" onClick={() => void handleCopyTable("Tabela Time TI CX", cxHeaders, cxTableRows)}>
                Copiar tabela
              </Button>
              <Button variant="secondary" onClick={() => setShowCxTable(!showCxTable)}>
                {showCxTable ? "Retrair tabela" : "Expandir tabela"}
              </Button>
            </Row>
          </Row>
          <Text tone="secondary" size="small">
            Tabela separada para entrada, qualificação e encaminhamento de tickets. Esses dados não entram mais na taxa nem no ranking do N2.
          </Text>
          {showCxTable ? (
            <Table
              headers={cxHeaders}
              rows={cxTableRows}
              columnAlign={["left", "right", "right", "right", "right", "right", "right", "right"]}
              striped
            />
          ) : null}
        </Stack>
      ) : null}

      <Card>
        <CardHeader trailing={`${period.start} a ${period.end}`}>Critérios e limitações</CardHeader>
        <CardBody>
          <Stack gap={8}>
            {period.notes.map((note) => (
              <Text size="small" tone="secondary">
                {note}
              </Text>
            ))}
            <Text size="small" tone="secondary">
              Campo identificado para Resolution Notes: <Code>customfield_11799</Code>. A correção evita descartar agentes com comentários quando <Code>done</Code> ou Resolution Notes são zero no mês e separa CX das leituras de N2.
            </Text>
            <Text size="small" tone="secondary">
              Validação Jira MCP de fevereiro: <Code>SUPMED-1475</Code> confirmou comentários da Maria, <Code>SUPMED-1456</Code> confirmou comentários/assignee do Luis e <Code>SUPMED-1486</Code> confirmou comentários do Pedro.
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
}

export default AcompanhamentoOperacao;
