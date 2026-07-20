import {
  Stack,
  Grid,
  Row,
  Spacer,
  H1,
  H2,
  H3,
  Text,
  Code,
  Stat,
  Card,
  CardHeader,
  CardBody,
  Callout,
  Divider,
  Table,
  Pill,
  BarChart,
  PieChart,
  useHostTheme,
} from "cursor/canvas";

const TOTAL_R1 = 10482;
const INATIVOS = 9237;
const ATIVOS_15D = 1245;
const NUNCA = 2666;
const COM_ACESSO_ANTIGO = 6571;
const SO_TRIAL = 1052;
const COM_PAGO = 8185;

const PCT_INATIVOS = ((INATIVOS / TOTAL_R1) * 100).toFixed(1);
const PCT_ATIVOS = ((ATIVOS_15D / TOTAL_R1) * 100).toFixed(1);

const buckets: { label: string; value: number }[] = [
  { label: "15–30 dias", value: 755 },
  { label: "31–60 dias", value: 1000 },
  { label: "61–90 dias", value: 785 },
  { label: "91–180 dias", value: 2270 },
  { label: "181–365 dias", value: 1058 },
  { label: "> 365 dias", value: 703 },
  { label: "Nunca acessou", value: NUNCA },
];

const topProdutos: { nome: string; qtd: number; trial: boolean }[] = [
  { nome: "Extensivo 2.0 — R1 Acesso Direto 2026", qtd: 1791, trial: false },
  { nome: "Extensivo R1 Acesso Direto", qtd: 1751, trial: false },
  { nome: "(2026) Extensivo R1 Acesso Direto — Regular", qtd: 1063, trial: false },
  { nome: "(2026) Extensivo R1 Acesso Direto — Elite", qtd: 1051, trial: false },
  { nome: "Internato Extensivo R1 Acesso Direto", qtd: 1003, trial: false },
  { nome: "Extensivo 2.0 — R1 A.D. 2026 — Reembolso Aprovação", qtd: 979, trial: false },
  { nome: "(2026) Extensivo R1 Acesso Direto — Teste Grátis", qtd: 759, trial: true },
  { nome: "Teste Grátis Extensivo R1 Acesso Direto 2025", qtd: 594, trial: true },
  { nome: "[2025] Extensivo R1 Acesso Direto", qtd: 198, trial: false },
  { nome: "(2026) Semi Extensivo Maio — R1 A.D. — Regular", qtd: 128, trial: false },
  { nome: "Semiextensivo R1 Acesso Direto", qtd: 124, trial: false },
  { nome: "(2026) Ext. Turma Março — R1 A.D. — Teste Grátis", qtd: 124, trial: true },
  { nome: "[2024 Parc. Inteligente] Extensivo R1 A.D. Elite", qtd: 116, trial: false },
  { nome: "(2025) HIIT — R1 Acesso Direto", qtd: 109, trial: false },
  { nome: "(2026) Ext. Turma Março — R1 A.D. — Regular", qtd: 94, trial: false },
];

function Header() {
  return (
    <Stack gap={4}>
      <Row align="center">
        <H1>Alunos R1 inativos há mais de 15 dias</H1>
        <Spacer />
        <Pill active>Corte: 10/06/2026</Pill>
      </Row>
      <Text tone="secondary">
        Alunos com produto <Text weight="semibold">R1 (Acesso Direto)</Text> ativo
        que não registraram <Text weight="semibold">nenhum acesso à plataforma</Text>{" "}
        nos últimos 15 dias.
      </Text>
      <Text tone="tertiary" size="small">
        Fontes: <Code>qbank.wiser_shuri_user_subscription_cache_v2</Code> (assinaturas) ×{" "}
        <Code>qbank.user_access_history</Code> (acessos) · Gerado em 25/06/2026
      </Text>
    </Stack>
  );
}

function Resumo() {
  return (
    <Grid columns={4} gap={12}>
      <Stat value={TOTAL_R1.toLocaleString("pt-BR")} label="R1 com assinatura ativa" />
      <Stat
        value={INATIVOS.toLocaleString("pt-BR")}
        label={`Inativos +15 dias (${PCT_INATIVOS}%)`}
        tone="danger"
      />
      <Stat
        value={ATIVOS_15D.toLocaleString("pt-BR")}
        label={`Ativos nos últimos 15 dias (${PCT_ATIVOS}%)`}
        tone="success"
      />
      <Stat
        value={NUNCA.toLocaleString("pt-BR")}
        label="Nunca acessaram a plataforma"
        tone="warning"
      />
    </Grid>
  );
}

function Engajamento() {
  return (
    <Stack gap={12}>
      <H2>Engajamento da base R1</H2>
      <Grid columns="320px 1fr" gap={20} align="center">
        <Stack gap={8}>
          <PieChart
            donut
            size={220}
            data={[
              { label: "Inativos +15d", value: INATIVOS, tone: "danger" },
              { label: "Ativos ≤15d", value: ATIVOS_15D, tone: "success" },
            ]}
          />
          <Text tone="tertiary" size="small">
            Base: {TOTAL_R1.toLocaleString("pt-BR")} assinaturas R1 ativas
          </Text>
        </Stack>
        <Stack gap={10}>
          <Callout tone="danger" title="9 em cada 10 alunos R1 estão sem acessar">
            Dos {TOTAL_R1.toLocaleString("pt-BR")} alunos com produto R1 ativo,{" "}
            {INATIVOS.toLocaleString("pt-BR")} ({PCT_INATIVOS}%) não acessam a
            plataforma há mais de 15 dias — forte oportunidade (e risco de churn)
            para reengajamento.
          </Callout>
          <Grid columns={2} gap={12}>
            <Stat
              value={COM_ACESSO_ANTIGO.toLocaleString("pt-BR")}
              label="Já acessaram, mas o último acesso foi há +15 dias"
            />
            <Stat
              value={NUNCA.toLocaleString("pt-BR")}
              label="Sem nenhum registro de acesso desde dez/2022"
            />
          </Grid>
        </Stack>
      </Grid>
    </Stack>
  );
}

function DistribuicaoTempo() {
  return (
    <Stack gap={8}>
      <H2>Há quanto tempo cada aluno parou</H2>
      <Text tone="secondary" size="small">
        Distribuição dos {INATIVOS.toLocaleString("pt-BR")} alunos inativos por
        tempo desde o último acesso registrado.
      </Text>
      <BarChart
        height={260}
        categories={buckets.map((b) => b.label)}
        series={[{ name: "Alunos", data: buckets.map((b) => b.value) }]}
        showValues
      />
      <Text tone="tertiary" size="small">
        Eixo X: faixa de inatividade · Eixo Y: nº de alunos · Fonte:
        user_access_history (último acesso por userId)
      </Text>
    </Stack>
  );
}

function TrialVsPago() {
  const theme = useHostTheme();
  return (
    <Card>
      <CardHeader trailing={<Pill size="sm">de {INATIVOS.toLocaleString("pt-BR")}</Pill>}>
        Composição: pago vs. teste grátis
      </CardHeader>
      <CardBody>
        <Grid columns={2} gap={16}>
          <Stack gap={4}>
            <Text style={{ fontSize: 22, color: theme.text.primary }} weight="bold">
              {COM_PAGO.toLocaleString("pt-BR")}
            </Text>
            <Text tone="secondary" size="small">
              Têm ao menos um produto R1 pago — prioridade máxima de reativação.
            </Text>
          </Stack>
          <Stack gap={4}>
            <Text style={{ fontSize: 22, color: theme.text.primary }} weight="bold">
              {SO_TRIAL.toLocaleString("pt-BR")}
            </Text>
            <Text tone="secondary" size="small">
              Estão apenas em produtos de teste grátis — perfil de conversão, não
              de churn.
            </Text>
          </Stack>
        </Grid>
      </CardBody>
    </Card>
  );
}

function TopProdutos() {
  return (
    <Stack gap={8}>
      <H2>Produtos R1 com mais alunos inativos</H2>
      <Table
        striped
        headers={["#", "Produto R1", "Tipo", "Alunos inativos"]}
        columnAlign={["right", "left", "left", "right"]}
        rowTone={topProdutos.map((p) => (p.trial ? "warning" : "danger"))}
        rows={topProdutos.map((p, i) => [
          String(i + 1),
          p.nome,
          p.trial ? "Teste grátis" : "Pago",
          p.qtd.toLocaleString("pt-BR"),
        ])}
      />
      <Text tone="tertiary" size="small">
        Top 15 produtos · um aluno pode ter mais de um produto R1, então a soma
        excede o total de alunos.
      </Text>
    </Stack>
  );
}

function Metodologia() {
  return (
    <Stack gap={10}>
      <H2>Metodologia e definições</H2>
      <Grid columns={2} gap={16}>
        <Stack gap={6}>
          <H3>Quem é "aluno R1"</H3>
          <Text tone="secondary" size="small">
            Usuário com pelo menos uma assinatura <Code>isActive: true</Code> cujo{" "}
            <Code>productName</Code> contém "R1" (variações de "R1 Acesso Direto"),
            em <Code>wiser_shuri_user_subscription_cache_v2</Code>.
          </Text>
          <H3>O que é "interação"</H3>
          <Text tone="secondary" size="small">
            Qualquer registro de acesso à plataforma em{" "}
            <Code>user_access_history</Code>. Inativo = último{" "}
            <Code>createdAt</Code> anterior a 10/06/2026 (ou inexistente).
          </Text>
        </Stack>
        <Stack gap={6}>
          <H3>Observações</H3>
          <Text tone="secondary" size="small">
            • O log cobre desde 07/12/2022, então "nunca acessou" é confiável.
          </Text>
          <Text tone="secondary" size="small">
            • Nomes/e-mails não estão neste relatório (ficam em{" "}
            <Code>community.users</Code>, outro banco). Posso gerar a planilha
            nominal dos {INATIVOS.toLocaleString("pt-BR")} alunos sob demanda.
          </Text>
          <Text tone="secondary" size="small">
            • O campo <Code>lastAccess</Code> de <Code>community.users</Code>{" "}
            <Text weight="semibold" as="span">não</Text> foi usado: reflete só a
            área de comunidade, não a plataforma inteira.
          </Text>
        </Stack>
      </Grid>
    </Stack>
  );
}

export default function Relatorio() {
  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 980 }}>
      <Header />
      <Resumo />
      <Divider />
      <Engajamento />
      <Divider />
      <DistribuicaoTempo />
      <TrialVsPago />
      <Divider />
      <TopProdutos />
      <Divider />
      <Metodologia />
    </Stack>
  );
}
