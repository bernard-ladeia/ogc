import {
  Stack,
  Row,
  Grid,
  H1,
  H2,
  Text,
  Card,
  CardHeader,
  CardBody,
  Table,
  Stat,
  Pill,
  Button,
  Select,
  Link,
  Callout,
  Swatch,
  BarChart,
  useCanvasState,
} from "cursor/canvas";
import type { Color } from "cursor/canvas";

const SNAPSHOT = "16/07/2026";
const ALL = "Todos";
const BROWSE = "https://medcof-team.atlassian.net/browse/";

// k=key, s=summary, a=assignee, g=group, st=status, f=fila
type Ticket = { k: string; s: string; a: string; g: string; st: string; f: string };

const N2 = "time-ti-n2";
const N15 = "time-ti-n1.5";

const GROUP_COLOR: Record<string, Color> = { [N2]: "blue", [N15]: "green" };

// Snapshot via Jira MCP — projeto SUPMED, grupos time-ti-n2 e time-ti-n1.5,
// tickets com statusCategory != Concluído.
const TICKETS: Ticket[] = [
  // Eduardo Bombarda (time-ti-n2)
  { k: "SUPMED-5073", s: "Checkout", a: "Eduardo Bombarda", g: N2, st: "Configuração Mercury (Gatekeeper)", f: "Checkout" },
  { k: "SUPMED-5072", s: "Checkout", a: "Eduardo Bombarda", g: N2, st: "Configuração Mercury (Gatekeeper)", f: "Checkout" },
  { k: "SUPMED-5071", s: "Checkout", a: "Eduardo Bombarda", g: N2, st: "Configuração Mercury (Gatekeeper)", f: "Checkout" },
  { k: "SUPMED-5070", s: "Checkout", a: "Eduardo Bombarda", g: N2, st: "Configuração Mercury (Gatekeeper)", f: "Checkout" },
  { k: "SUPMED-5068", s: "Checkout", a: "Eduardo Bombarda", g: N2, st: "Configuração Mercury (Gatekeeper)", f: "Checkout" },
  { k: "SUPMED-5067", s: "Checkout", a: "Eduardo Bombarda", g: N2, st: "Configuração Mercury (Gatekeeper)", f: "Checkout" },
  { k: "SUPMED-5066", s: "Checkout", a: "Eduardo Bombarda", g: N2, st: "Configuração Mercury (Gatekeeper)", f: "Checkout" },
  { k: "SUPMED-5042", s: "Checkout", a: "Eduardo Bombarda", g: N2, st: "Configuração Mercury (Gatekeeper)", f: "Checkout" },
  { k: "SUPMED-5041", s: "Checkout", a: "Eduardo Bombarda", g: N2, st: "Configuração Mercury (Gatekeeper)", f: "Checkout" },
  { k: "SUPMED-4801", s: "Qbank – Ausência de estatísticas e ranking nos simulados", a: "Eduardo Bombarda", g: N2, st: "Aguardando Retorno", f: "Suporte Desenvolvimento" },
  { k: "SUPMED-4791", s: "qBank - Simulados - Nota divergente", a: "Eduardo Bombarda", g: N2, st: "Aguardando Retorno", f: "Suporte Desenvolvimento" },
  { k: "SUPMED-5153", s: "QBank - Simulado - Falha ao Clonar", a: "Eduardo Bombarda", g: N2, st: "Em análise N2", f: "Suporte Desenvolvimento" },
  { k: "SUPMED-5148", s: "QBank - Simulados - Falha ao Clonar", a: "Eduardo Bombarda", g: N2, st: "Em análise N2", f: "Suporte Desenvolvimento" },
  { k: "SUPMED-5131", s: "QBank - Permitir seleção múltipla no filtro de dificuldade", a: "Eduardo Bombarda", g: N2, st: "Em análise N2", f: "Suporte Desenvolvimento" },
  { k: "SUPMED-5158", s: "QBank - Simulado - Falha ao Clonar", a: "Eduardo Bombarda", g: N2, st: "Aguardando N2", f: "Suporte Desenvolvimento" },
  { k: "SUPMED-4269", s: "Sugestão - Qbank - Ausência de funcionalidade de busca por código de questão", a: "Eduardo Bombarda", g: N2, st: "Aguardando N2", f: "Sugestoes" },

  // Kevin da Silva Araujo (time-ti-n2)
  { k: "SUPMED-5138", s: "Comprou o curso, mas está sem entrega", a: "Kevin da Silva Araujo", g: N2, st: "Em análise N2", f: "Suporte Desenvolvimento" },
  { k: "SUPMED-5159", s: "QBank - Simulados - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5152", s: "QBank - Simulado - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5149", s: "Qbank - Simulados - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5144", s: "QBank - Simulado - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5143", s: "QBank - Revisões Núcleo - Ofensiva Divergente do Dashboard", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5142", s: "QBank - Simulado - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5135", s: "QBank - Revisões Núcleo - Ofensiva Divergente do Dashboard", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5134", s: "QBank - Revisões Núcleo - Ofensiva Divergente do Dashboard", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5130", s: "QBank - Simulado - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5126", s: "QBank - Revisão Núcleo - Ofensiva Divergente do Dashboard", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5122", s: "QBank - Simulado - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5119", s: "Qbank - Simulados - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5114", s: "QBank - Simulado - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5113", s: "QBank - Simulado - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5110", s: "QBank - Simulado - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5109", s: "QBank - Revisões Núcleo - Ofensiva Divergente do Dashboard", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5106", s: "QBank - Simulado - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5102", s: "QBank - Simulado - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5098", s: "Qbank - Simulados - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5093", s: "QBank - Revisões Núcleo - Ofensiva Divergente do Dashboard", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5087", s: "QBank - Simulado - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5086", s: "QBank - Simulado - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5083", s: "QBank - Simulado - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5079", s: "QBank - Simulado - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5077", s: "QBank - Revisões Núcleo - Ofensiva Divergente do Dashboard", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5064", s: "Qbank - Simulados - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5063", s: "QBank - Revisão Núcleo - Ofensiva Divergente do Dashboard", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5057", s: "QBank - Simulado - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5055", s: "QBank - Simulado - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5053", s: "QBank - Simulados - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5052", s: "QBank - Novo Teste - Dicas não aparecem", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5039", s: "Qbank - Simulados - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5024", s: "QBank - Simulado - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5021", s: "Apollo - Progresso Divergente na Tela Home", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5019", s: "QBank - Simulado - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5016", s: "QBank - Simulados - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5013", s: "QBank - Simulado - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5011", s: "QBank - Novo Teste - Dicas Não Aparecem", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5004", s: "QBank - Simulados - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-5002", s: "QBank - Simulado - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-4998", s: "QBank - Simulados - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-4995", s: "QBank - Simulado - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },
  { k: "SUPMED-4992", s: "QBank - Simulado - Falha ao Clonar", a: "Kevin da Silva Araujo", g: N2, st: "Em Desenvolvimento", f: "Em Desenvolvimento" },

  // luis henrique gonçalves angelim (time-ti-n2)
  { k: "SUPMED-5160", s: "Qbank - Simulados - Falha ao Clonar", a: "luis henrique gonçalves angelim", g: N2, st: "Aguardando N2", f: "Suporte Desenvolvimento" },
  { k: "SUPMED-5156", s: "QBank - Simulados - Falha ao Clonar", a: "luis henrique gonçalves angelim", g: N2, st: "Aguardando N2", f: "Suporte Desenvolvimento" },
  { k: "SUPMED-5146", s: "QBank - Novo Teste - Dicas Não Aparecem", a: "luis henrique gonçalves angelim", g: N2, st: "Aguardando N2", f: "Suporte Desenvolvimento" },
  { k: "SUPMED-5140", s: "QBank - Simulado - Falha ao Clonar", a: "luis henrique gonçalves angelim", g: N2, st: "Aguardando N2", f: "Suporte Desenvolvimento" },
  { k: "SUPMED-5139", s: "Solicitação de retorno da ferramenta de criação de fluxograma", a: "luis henrique gonçalves angelim", g: N2, st: "Aguardando N2", f: "Suporte Desenvolvimento" },
  { k: "SUPMED-5136", s: "QBank - Simulados - Falha ao Clonar", a: "luis henrique gonçalves angelim", g: N2, st: "Aguardando N2", f: "Suporte Desenvolvimento" },

  // Maria Vitoria Jarzinski Oliveira (time-ti-n2)
  { k: "SUPMED-4888", s: "Checkout", a: "Maria Vitoria Jarzinski Oliveira", g: N2, st: "Alinhamento Marketing", f: "Checkout" },

  // Pedro H Pinheiro (time-ti-n2)
  { k: "SUPMED-5157", s: "QBank - Novo Teste - Dicas Não Aparecem", a: "Pedro H Pinheiro", g: N2, st: "Aguardando N2", f: "Suporte Desenvolvimento" },
  { k: "SUPMED-5151", s: "QBank - Simulados - Falha ao Clonar", a: "Pedro H Pinheiro", g: N2, st: "Aguardando N2", f: "Suporte Desenvolvimento" },
  { k: "SUPMED-5145", s: "qBank - Falha no Resumo ao Finalizar Testes em Modo Foco", a: "Pedro H Pinheiro", g: N2, st: "Aguardando N2", f: "Suporte Desenvolvimento" },

  // Almir William (time-ti-n1.5)
  { k: "SUPMED-5007", s: "qBank - Provas Comentadas - Teste reiniciado prematuramente", a: "Almir William", g: N15, st: "Em atendimento N1", f: "Suporte ao Aluno" },
  { k: "SUPMED-4970", s: "Produto - Aluno sem entrega de curso", a: "Almir William", g: N15, st: "Em atendimento N1", f: "Suporte ao Aluno" },
  { k: "SUPMED-4852", s: "qBank - Revisões Núcleo - Perda de ofensiva", a: "Almir William", g: N15, st: "Em atendimento N1", f: "Suporte ao Aluno" },
  { k: "SUPMED-4810", s: "Qbank - Não aparece no ranking do simulado", a: "Almir William", g: N15, st: "Em atendimento N1", f: "Suporte ao Aluno" },
  { k: "SUPMED-1926", s: "QBank - Revisões Núcleo - Perda de ofensiva", a: "Almir William", g: N15, st: "Feedback Aluno", f: "Suporte ao Aluno" },
  { k: "SUPMED-1908", s: "QBank - Revisões Núcleo - Inconsistência nos Desafios", a: "Almir William", g: N15, st: "Feedback Aluno", f: "Suporte ao Aluno" },
  { k: "SUPMED-1873", s: "Qbank prime - Problema no reset dos flashcards", a: "Almir William", g: N15, st: "Feedback Aluno", f: "Suporte ao Aluno" },
  { k: "SUPMED-1788", s: "Qbank prime - Erro nas Revisões Núcleo", a: "Almir William", g: N15, st: "Feedback Aluno", f: "Suporte ao Aluno" },
  { k: "SUPMED-1483", s: "DeckLabs - Flashcards - Ofensivas Sem Contabilização", a: "Almir William", g: N15, st: "Feedback Aluno", f: "Suporte ao Aluno" },
  { k: "SUPMED-1474", s: 'DeckLabs - Flashcards - Cards Marcados Como "Errados" Não Retornam Para Revisão', a: "Almir William", g: N15, st: "Feedback Aluno", f: "Suporte ao Aluno" },
  { k: "SUPMED-1433", s: "Qbank - Dias de ofensiva Flashcard errados.", a: "Almir William", g: N15, st: "Feedback Aluno", f: "Suporte ao Aluno" },
  { k: "SUPMED-1426", s: "FlashCards - Erro na contabilização das ofensivas", a: "Almir William", g: N15, st: "Feedback Aluno", f: "Suporte ao Aluno" },
  { k: "SUPMED-1399", s: "FlashCards - Ofensiva do aluno não está sendo contabilizada.", a: "Almir William", g: N15, st: "Feedback Aluno", f: "Suporte ao Aluno" },
  { k: "SUPMED-1387", s: "Flashcards | Ofensiva não atualiza", a: "Almir William", g: N15, st: "Feedback Aluno", f: "Suporte ao Aluno" },
  { k: "SUPMED-1006", s: "Qbank - Erro ao contabilizar ofensiva dos flashcards", a: "Almir William", g: N15, st: "Feedback Aluno", f: "Suporte ao Aluno" },

  // João Ribeiro (time-ti-n1.5)
  { k: "SUPMED-4899", s: "QBank - Flashcards - Falha ao Resetar os Flashcards", a: "João Ribeiro", g: N15, st: "Em atendimento N1", f: "Suporte ao Aluno" },
  { k: "SUPMED-4849", s: "qBank - Testes - Divergência na Soma das Porcentagens", a: "João Ribeiro", g: N15, st: "Em atendimento N1", f: "Suporte ao Aluno" },
  { k: "SUPMED-2530", s: "QBank - Revisões Núcleo - Perda de ofensiva", a: "João Ribeiro", g: N15, st: "Feedback Aluno", f: "Suporte ao Aluno" },

  // Raryane Cavalcante (time-ti-n1.5)
  { k: "SUPMED-5012", s: "DeckLabs - Flashcard - Card suspenso volta a aparecer", a: "Raryane Cavalcante", g: N15, st: "Em atendimento N1", f: "Suporte ao Aluno" },
  { k: "SUPMED-4978", s: "Apollo - Aulas - Player de aulas travado", a: "Raryane Cavalcante", g: N15, st: "Em atendimento N1", f: "Suporte ao Aluno" },
  { k: "SUPMED-4591", s: "Simulado 6 encerrado", a: "Raryane Cavalcante", g: N15, st: "Feedback Aluno", f: "Suporte ao Aluno" },
  { k: "SUPMED-4449", s: "Qbank - Simulado - Simulado 6 - 2026 PED encerrado antes do tempo previsto", a: "Raryane Cavalcante", g: N15, st: "Feedback Aluno", f: "Suporte ao Aluno" },
  { k: "SUPMED-4312", s: "Apollo - Cronograma - Progresso exibido como 0%", a: "Raryane Cavalcante", g: N15, st: "Feedback Aluno", f: "Suporte ao Aluno" },
  { k: "SUPMED-4309", s: "Apollo - Progresso de aulas exibe 0% de progresso geral", a: "Raryane Cavalcante", g: N15, st: "Feedback Aluno", f: "Suporte ao Aluno" },
  { k: "SUPMED-4072", s: "Apollo - Progresso do cronograma exibido como 0% (bug mapeado)", a: "Raryane Cavalcante", g: N15, st: "Feedback Aluno", f: "Suporte ao Aluno" },
  { k: "SUPMED-3761", s: "Apollo - Cronograma/Falha na exibição e divergência de porcentagens", a: "Raryane Cavalcante", g: N15, st: "Feedback Aluno", f: "Suporte ao Aluno" },
  { k: "SUPMED-3751", s: "Apollo - Progresso do cronograma exibido como 0% até clicar individualmente em cada bloco", a: "Raryane Cavalcante", g: N15, st: "Feedback Aluno", f: "Suporte ao Aluno" },
];

type AgentSummary = { name: string; group: string; total: number };

const AGENTS: AgentSummary[] = (() => {
  const map = new Map<string, AgentSummary>();
  for (const t of TICKETS) {
    const e = map.get(t.a) ?? { name: t.a, group: t.g, total: 0 };
    e.total += 1;
    map.set(t.a, e);
  }
  return [...map.values()].sort((a, b) => b.total - a.total);
})();

function countBy(items: Ticket[], field: "st" | "f") {
  const map = new Map<string, number>();
  for (const t of items) map.set(t[field], (map.get(t[field]) ?? 0) + 1);
  return [...map.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count);
}

function ticketLink(k: string) {
  return <Link href={`${BROWSE}${k}`}>{k}</Link>;
}

function toTsv(headers: string[], rows: string[][]) {
  return [headers, ...rows].map((r) => r.join("\t")).join("\n");
}

function CopyButton({ id, text }: { id: string; text: string }) {
  const [copied, setCopied] = useCanvasState<string | null>("copiedTable", null);
  return (
    <Button
      variant="secondary"
      onClick={() => {
        try {
          navigator.clipboard?.writeText(text);
        } catch {
          /* clipboard indisponível */
        }
        setCopied(id);
        setTimeout(() => setCopied(null), 1500);
      }}
    >
      {copied === id ? "Copiado ✓" : "Copiar tabela"}
    </Button>
  );
}

function DrillCard({
  title,
  field,
  tickets,
  selected,
  onSelect,
}: {
  title: string;
  field: "st" | "f";
  tickets: Ticket[];
  selected: string | null;
  onSelect: (label: string | null) => void;
}) {
  const dist = countBy(tickets, field);
  const rows = selected ? tickets.filter((t) => t[field] === selected) : [];
  return (
    <Card>
      <CardHeader trailing={selected ? `${rows.length} ticket(s)` : undefined}>{title}</CardHeader>
      <CardBody>
        <Stack gap={10}>
          <BarChart
            horizontal
            showValues
            categories={dist.map((d) => d.label)}
            series={[{ name: "Tickets em aberto", data: dist.map((d) => d.count) }]}
            height={Math.max(120, dist.length * 42)}
          />
          <Text size="small" tone="tertiary">
            Clique numa categoria para listar os tickets:
          </Text>
          <Row gap={6} wrap>
            {dist.map((d) => (
              <span key={d.label}>
                <Pill
                  active={selected === d.label}
                  onClick={() => onSelect(selected === d.label ? null : d.label)}
                >
                  {d.label} ({d.count})
                </Pill>
              </span>
            ))}
          </Row>
          {selected && rows.length > 0 && (
            <Stack gap={8}>
              <Row justify="end">
                <CopyButton
                  id={`${field}:${selected}`}
                  text={toTsv(
                    ["Ticket", "Responsável", "Resumo"],
                    rows.map((t) => [t.k, t.a, t.s]),
                  )}
                />
              </Row>
              <Table
                headers={["Ticket", "Responsável", "Resumo"]}
                columnAlign={["left", "left", "left"]}
                striped
                rows={rows.map((t) => [ticketLink(t.k), t.a, t.s])}
              />
            </Stack>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}

export default function SupmedSupervisao() {
  const [selected, setSelected] = useCanvasState<string>("agenteFiltro", ALL);
  const [statusSel, setStatusSel] = useCanvasState<string | null>("statusSel", null);
  const [filaSel, setFilaSel] = useCanvasState<string | null>("filaSel", null);
  const [statusF, setStatusF] = useCanvasState<string>("agentesStatusFiltro", ALL);
  const [filaF, setFilaF] = useCanvasState<string>("agentesFilaFiltro", ALL);

  const visible = selected === ALL ? TICKETS : TICKETS.filter((t) => t.a === selected);
  const totalOpen = visible.length;
  const visibleAgents = AGENTS.filter((a) => selected === ALL || a.name === selected);

  const agentOptions = [
    { value: ALL, label: "Todos os agentes" },
    ...AGENTS.map((a) => ({ value: a.name, label: `${a.name} (${a.total})` })),
  ];

  // Cascata: agente -> status -> fila
  const statusOptions = [
    { value: ALL, label: "Todos os status" },
    ...countBy(visible, "st").map((d) => ({ value: d.label, label: `${d.label} (${d.count})` })),
  ];
  const statusEff = statusOptions.some((o) => o.value === statusF) ? statusF : ALL;

  const afterStatus = visible.filter((t) => statusEff === ALL || t.st === statusEff);
  const filaOptions = [
    { value: ALL, label: "Todas as filas" },
    ...countBy(afterStatus, "f").map((d) => ({ value: d.label, label: `${d.label} (${d.count})` })),
  ];
  const filaEff = filaOptions.some((o) => o.value === filaF) ? filaF : ALL;

  const sectionTickets = afterStatus.filter((t) => filaEff === ALL || t.f === filaEff);
  const sectionAgents = visibleAgents.filter((a) => sectionTickets.some((t) => t.a === a.name));
  const filtersActive = statusEff !== ALL || filaEff !== ALL;

  return (
    <Stack gap={20} style={{ padding: 24, maxWidth: 1040 }}>
      <Stack gap={4}>
        <H1>Supervisão SUPMED — Tickets em aberto por agente</H1>
        <Text tone="secondary" size="small">
          Fonte: Jira · projeto SUPMED (Suporte MedCof) · grupos time-ti-n2 e time-ti-n1.5 · Em
          aberto = status fora da categoria "Concluído" · Snapshot {SNAPSHOT}
        </Text>
      </Stack>

      <Stack gap={8}>
        <Text weight="semibold" size="small">
          Filtrar por agente
        </Text>
        <Row gap={8} wrap>
          <Pill active={selected === ALL} onClick={() => setSelected(ALL)}>
            {ALL}
          </Pill>
          {AGENTS.map((a) => (
            <span key={a.name}>
              <Pill
                active={selected === a.name}
                leadingContent={<Swatch color={GROUP_COLOR[a.group] ?? "blue"} />}
                onClick={() => setSelected(a.name)}
              >
                {a.name} ({a.total})
              </Pill>
            </span>
          ))}
        </Row>
      </Stack>

      <Grid columns={2} gap={16}>
        <Stat value={totalOpen} label="Tickets em aberto" />
        <Stat value={visibleAgents.length} label="Agentes selecionados" />
      </Grid>

      <Stack gap={12}>
        <H2>{selected === ALL ? "Distribuição geral" : `Distribuição — ${selected}`}</H2>
        <Grid columns={2} gap={16}>
          <DrillCard
            title="Tickets em aberto por status"
            field="st"
            tickets={visible}
            selected={statusSel}
            onSelect={setStatusSel}
          />
          <DrillCard
            title="Tickets em aberto por fila"
            field="f"
            tickets={visible}
            selected={filaSel}
            onSelect={setFilaSel}
          />
        </Grid>
      </Stack>

      <Stack gap={8}>
        <H2>Tickets por agente</H2>
        <Text tone="secondary" size="small">
          Filtre por agente, depois status e fila (nessa ordem) para ver os tickets numa tabela
          única. As opções se ajustam conforme a seleção.
        </Text>
        <Row gap={10} align="center" wrap>
          <Text size="small" weight="semibold">
            Filtrar por
          </Text>
          <Select
            value={selected}
            onChange={(v) => {
              setSelected(v);
              setStatusF(ALL);
              setFilaF(ALL);
            }}
            options={agentOptions}
            style={{ minWidth: 250 }}
          />
          <Select
            value={statusEff}
            onChange={(v) => {
              setStatusF(v);
              setFilaF(ALL);
            }}
            options={statusOptions}
            style={{ minWidth: 210 }}
          />
          <Select
            value={filaEff}
            onChange={setFilaF}
            options={filaOptions}
            style={{ minWidth: 210 }}
          />
          {(selected !== ALL || filtersActive) && (
            <Button
              variant="ghost"
              onClick={() => {
                setSelected(ALL);
                setStatusF(ALL);
                setFilaF(ALL);
              }}
            >
              Limpar filtros
            </Button>
          )}
        </Row>
        <Row gap={12} align="center" wrap>
          <Text size="small" tone="tertiary">
            {sectionTickets.length} ticket(s) · {sectionAgents.length} agente(s)
          </Text>
          {sectionTickets.length > 0 && (
            <CopyButton
              id="tabela-agentes"
              text={toTsv(
                ["Responsável", "Ticket", "Status", "Fila", "Resumo"],
                sectionTickets.map((t) => [t.a, t.k, t.st, t.f, t.s]),
              )}
            />
          )}
        </Row>
        {sectionTickets.length > 0 ? (
          <Table
            headers={["Responsável", "Ticket", "Status", "Fila", "Resumo"]}
            columnAlign={["left", "left", "left", "left", "left"]}
            striped
            rows={sectionTickets.map((t) => [t.a, ticketLink(t.k), t.st, t.f, t.s])}
          />
        ) : (
          <Callout tone="neutral" title="Nenhum ticket para o filtro selecionado">
            <Text size="small">Ajuste os filtros acima.</Text>
          </Callout>
        )}
      </Stack>

      <Callout tone="neutral" title="Notas de supervisão">
        <Stack gap={4}>
          <Text size="small">
            Kevin (time-ti-n2) concentra a maior carga individual — avaliar redistribuição.
          </Text>
          <Text size="small">
            No time-ti-n1.5 toda a fila é "Suporte ao Aluno", com predominância de "Feedback Aluno".
          </Text>
          <Text size="small">
            Clique numa chave para abrir o ticket no Jira. Dados são um snapshot ({SNAPSHOT}); para
            atualizar, peça a regeração do report.
          </Text>
        </Stack>
      </Callout>
    </Stack>
  );
}
