import {
  BarChart,
  Callout,
  Card,
  CardBody,
  CardHeader,
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

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'];

const ABERTOS = [607, 289, 379, 468, 782];
const FECHADOS = [394, 183, 332, 293, 1121];
const INTERACOES_N2 = [154, 146, 201, 168, 169];
const TAXA_INTERACAO = [0.25, 0.51, 0.53, 0.36, 0.22];

const CONS_ABERTOS = [607, 289, 379, 453, 554];
const CONS_FECHADOS = [394, 183, 332, 283, 889];

export default function SupmedAbertosFechadosMensalTesteCanvas() {
  const theme = useHostTheme();

  return (
    <Stack gap={24} style={{ padding: 28, maxWidth: 1180, margin: '0 auto' }}>
      <Stack gap={8}>
        <Row gap={12} align="center" wrap>
          <H1>SUPMED · Abertos vs Fechados vs Interações N2 (Teste)</H1>
          <Pill>Jan-Mai/2026</Pill>
        </Row>
        <Text tone="secondary">
          Fonte: Jira REST API (JSM) · Projeto SUPMED · Janela: 01/01/2026 a 26/05/2026.
        </Text>
      </Stack>

      <Grid columns={3} gap={16}>
        <Stat label="Total abertos (base geral)" value="2.525" tone="info" />
        <Stat label="Total fechados (base geral)" value="2.323" tone="success" />
        <Stat label="Saldo (base geral)" value="+202" tone="warning" />
      </Grid>

      <Card>
        <CardHeader>Volume mensal de tickets abertos e fechados</CardHeader>
        <CardBody>
          <BarChart
            categories={MONTHS}
            series={[
              { name: 'Abertos', data: ABERTOS, tone: 'info' },
              { name: 'Fechados', data: FECHADOS, tone: 'success' },
            ]}
            height={320}
            valueSuffix=" tickets"
          />
          <Text tone="tertiary" size="small">
            Eixo X: mês. Eixo Y: quantidade de tickets. Fonte: Jira REST API (JSM), projeto SUPMED, janela Jan-Mai/2026.
          </Text>
        </CardBody>
      </Card>

      <Stack gap={8}>
        <H2>Detalhamento mensal — Abertos vs Fechados</H2>
        <Table
          headers={['Mês', 'Abertos', 'Fechados', 'Saldo', 'Taxa de Resolução']}
          columnAlign={['left', 'right', 'right', 'right', 'right']}
          rows={[
            ['Janeiro/2026', '607', '394', '+213', '64,9%'],
            ['Fevereiro/2026', '289', '183', '+106', '63,3%'],
            ['Março/2026', '379', '332', '+47', '87,6%'],
            ['Abril/2026', '468', '293', '+175', '62,6%'],
            ['Maio/2026 (parcial 01-26/05)', '782', '1.121', '-339', '143,4%'],
          ]}
          rowTone={['warning', undefined, undefined, 'warning', 'success']}
          striped
        />
      </Stack>

      <Divider />

      <Grid columns={3} gap={16}>
        <Stat label="Tickets abertos (Jan-Mai)" value="2.525" tone="info" />
        <Stat label="Interações N2 (Jan-Mai)" value="838" tone="warning" />
        <Stat label="Taxa média (interações/ticket)" value="0,33" tone="success" />
      </Grid>

      <Card>
        <CardHeader>Esforço N2 mensal: tickets abertos, interações e taxa</CardHeader>
        <CardBody>
          <BarChart
            categories={MONTHS}
            series={[
              { name: 'Tickets abertos', data: ABERTOS, tone: 'info' },
              { name: 'Interações N2', data: INTERACOES_N2, tone: 'warning' },
            ]}
            height={320}
            valueSuffix=" eventos"
          />
          <Text tone="tertiary" size="small">
            Eixo X: mês. Eixo Y: quantidade (tickets e interações). Fonte: Jira REST API (JSM), comentários N2 no período Jan-Mai/2026.
          </Text>
          <Table
            headers={['Mês', 'Taxa de interação (int./ticket)']}
            rows={[
              ['Jan', '0,25'],
              ['Fev', '0,51'],
              ['Mar', '0,53'],
              ['Abr', '0,36'],
              ['Mai', '0,22'],
            ]}
            columnAlign={['left', 'right']}
            style={{ marginTop: 12 }}
          />
          <Text tone="tertiary" size="small">
            Métrica transformada: taxa = interações N2 no mês / tickets abertos no mês.
          </Text>
        </CardBody>
      </Card>

      <Divider />

      <Stack gap={8}>
        <Row gap={12} align="center" wrap>
          <H2>Consolidado (com exclusão do creator específico)</H2>
          <Pill>Regra aplicada no consolidado</Pill>
        </Row>
        <Text tone="secondary">
          Neste bloco consolidado, tickets criados por{' '}
          <Text as="span" weight="semibold">
            `creator.accountId = 712020:345c75ed-490e-417c-8996-e42cd290bda5`
          </Text>{' '}
          foram removidos da base de abertos e fechados.
        </Text>
      </Stack>

      <Grid columns={3} gap={16}>
        <Stat label="Abertos (consolidado filtrado)" value="2.282" tone="info" />
        <Stat label="Fechados (consolidado filtrado)" value="2.081" tone="success" />
        <Stat label="Saldo (consolidado filtrado)" value="+201" tone="warning" />
      </Grid>

      <Card>
        <CardHeader>Abertos vs Fechados vs Interações N2 — por mês</CardHeader>
        <CardBody>
          <BarChart
            categories={MONTHS}
            series={[
              { name: 'Tickets abertos (filtrado)', data: CONS_ABERTOS, tone: 'info' },
              { name: 'Tickets fechados (filtrado)', data: CONS_FECHADOS, tone: 'success' },
              { name: 'Interações N2', data: INTERACOES_N2, tone: 'warning' },
            ]}
            height={360}
            valueSuffix=" volume"
          />
          <Text tone="tertiary" size="small">
            Eixo X: mês. Eixo Y: quantidade. Fonte: Jira REST API (JSM), projeto SUPMED, Jan-Mai/2026, com filtro de creator aplicado somente neste consolidado.
          </Text>
        </CardBody>
      </Card>

      <Stack gap={8}>
        <H2>Detalhamento consolidado</H2>
        <Table
          headers={['Mês', 'Abertos', 'Fechados', 'Interações N2', 'Saldo (Ab-Fe)', 'Int./Aberto', 'Int./Fechado']}
          columnAlign={['left', 'right', 'right', 'right', 'right', 'right', 'right']}
          rows={[
            ['Janeiro/2026', '607', '394', '154', '+213', '0,25', '0,39'],
            ['Fevereiro/2026', '289', '183', '146', '+106', '0,51', '0,80'],
            ['Março/2026', '379', '332', '201', '+47', '0,53', '0,61'],
            ['Abril/2026', '453', '283', '168', '+170', '0,37', '0,59'],
            ['Maio/2026 (parcial 01-26/05)', '554', '889', '169', '-335', '0,31', '0,19'],
            ['Total Jan-Mai', '2.282', '2.081', '838', '+201', '0,37', '0,40'],
          ]}
          rowTone={['warning', undefined, 'success', 'warning', 'success', undefined]}
          striped
        />
      </Stack>

      <Callout tone="success" title="Leitura executiva">
        Em maio (parcial ate 26/05), no consolidado filtrado, houve 889 fechados contra 554 abertos (saldo -335),
        mantendo tendencia de reducao de backlog apos a oficina de marco.
      </Callout>

      <Stack gap={8}>
        <H2>JQL aplicada no consolidado</H2>
        <pre
          style={{
            margin: 0,
            padding: 12,
            borderRadius: 8,
            background: theme.fill.tertiary,
            color: theme.text.primary,
            border: `1px solid ${theme.stroke.secondary}`,
            fontSize: 12,
            lineHeight: 1.45,
            overflowX: 'auto',
          }}
        >{`project = SUPMED
AND creator != "712020:345c75ed-490e-417c-8996-e42cd290bda5"
AND created >= "2026-MM-01"
AND created < "2026-MM+1-01"

project = SUPMED
AND creator != "712020:345c75ed-490e-417c-8996-e42cd290bda5"
AND status in ("Concluído", "Cancelado")
AND statusCategoryChangedDate >= "2026-MM-01"
AND statusCategoryChangedDate < "2026-MM+1-01"`}</pre>
      </Stack>
    </Stack>
  );
}
