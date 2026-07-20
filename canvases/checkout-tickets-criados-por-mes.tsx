import { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Grid, H1, Row, Select, Stack, Stat, Text, useCanvasAction, useCanvasState } from '@/lib/cursor-canvas';

type MonthlyCount = {
  monthLabel: string;
  total: number;
};

type SlaTopTicket = {
  key: string;
  monthLabel: string;
  hours: number;
};

const SNAPSHOT_AT = '13/07/2026 17:54 (UTC-3)';
const SOURCE_LABEL = 'Jira via MCP';
const OGC_PATH = 'C:/Users/BernardLadeia/.cursor/projects/d-Medcof-HealthPanel-Project/canvases/operational-governance-center.canvas.tsx';

const MONTHLY_COUNTS: MonthlyCount[] = [
  { monthLabel: 'Maio / 26', total: 1 },
  { monthLabel: 'Junho / 26', total: 67 },
  { monthLabel: 'Julho / 26', total: 17 },
];

const CHECKOUT_TICKETS: SlaTopTicket[] = [
  { key: 'SUPMED-3278', monthLabel: 'Maio / 26', hours: 113.12 },
  { key: 'SUPMED-3620', monthLabel: 'Junho / 26', hours: 135.63 },
  { key: 'SUPMED-3646', monthLabel: 'Junho / 26', hours: 123.98 },
  { key: 'SUPMED-3652', monthLabel: 'Junho / 26', hours: 188.12 },
  { key: 'SUPMED-3653', monthLabel: 'Junho / 26', hours: 117.78 },
  { key: 'SUPMED-3654', monthLabel: 'Junho / 26', hours: 187.92 },
  { key: 'SUPMED-3659', monthLabel: 'Junho / 26', hours: 117.12 },
  { key: 'SUPMED-3660', monthLabel: 'Junho / 26', hours: 117.04 },
  { key: 'SUPMED-3661', monthLabel: 'Junho / 26', hours: 116.99 },
  { key: 'SUPMED-3662', monthLabel: 'Junho / 26', hours: 117.24 },
  { key: 'SUPMED-3719', monthLabel: 'Junho / 26', hours: 8.64 },
  { key: 'SUPMED-3720', monthLabel: 'Junho / 26', hours: 8.09 },
  { key: 'SUPMED-3721', monthLabel: 'Junho / 26', hours: 7.77 },
  { key: 'SUPMED-3722', monthLabel: 'Junho / 26', hours: 7.71 },
  { key: 'SUPMED-3723', monthLabel: 'Junho / 26', hours: 7.65 },
  { key: 'SUPMED-3724', monthLabel: 'Junho / 26', hours: 7.59 },
  { key: 'SUPMED-3725', monthLabel: 'Junho / 26', hours: 7.50 },
  { key: 'SUPMED-3726', monthLabel: 'Junho / 26', hours: 7.46 },
  { key: 'SUPMED-3727', monthLabel: 'Junho / 26', hours: 7.38 },
  { key: 'SUPMED-3728', monthLabel: 'Junho / 26', hours: 7.33 },
  { key: 'SUPMED-3729', monthLabel: 'Junho / 26', hours: 6.22 },
  { key: 'SUPMED-3730', monthLabel: 'Junho / 26', hours: 6.17 },
  { key: 'SUPMED-3731', monthLabel: 'Junho / 26', hours: 6.09 },
  { key: 'SUPMED-3732', monthLabel: 'Junho / 26', hours: 6.03 },
  { key: 'SUPMED-3734', monthLabel: 'Junho / 26', hours: 5.95 },
  { key: 'SUPMED-3735', monthLabel: 'Junho / 26', hours: 5.90 },
  { key: 'SUPMED-3748', monthLabel: 'Junho / 26', hours: 3.50 },
  { key: 'SUPMED-3749', monthLabel: 'Junho / 26', hours: 4.28 },
  { key: 'SUPMED-3750', monthLabel: 'Junho / 26', hours: 4.88 },
  { key: 'SUPMED-3763', monthLabel: 'Junho / 26', hours: 3.60 },
  { key: 'SUPMED-3764', monthLabel: 'Junho / 26', hours: 3.93 },
  { key: 'SUPMED-4241', monthLabel: 'Junho / 26', hours: 434.75 },
  { key: 'SUPMED-4243', monthLabel: 'Junho / 26', hours: 385.27 },
  { key: 'SUPMED-4252', monthLabel: 'Junho / 26', hours: 674.79 },
  { key: 'SUPMED-4254', monthLabel: 'Junho / 26', hours: 674.65 },
  { key: 'SUPMED-4255', monthLabel: 'Junho / 26', hours: 674.56 },
  { key: 'SUPMED-4256', monthLabel: 'Junho / 26', hours: 674.46 },
  { key: 'SUPMED-4257', monthLabel: 'Junho / 26', hours: 673.74 },
  { key: 'SUPMED-4258', monthLabel: 'Junho / 26', hours: 673.66 },
  { key: 'SUPMED-4259', monthLabel: 'Junho / 26', hours: 673.61 },
  { key: 'SUPMED-4261', monthLabel: 'Junho / 26', hours: 673.54 },
  { key: 'SUPMED-4263', monthLabel: 'Junho / 26', hours: 673.49 },
  { key: 'SUPMED-4264', monthLabel: 'Junho / 26', hours: 673.44 },
  { key: 'SUPMED-4266', monthLabel: 'Junho / 26', hours: 1.49 },
  { key: 'SUPMED-4273', monthLabel: 'Junho / 26', hours: 1.43 },
  { key: 'SUPMED-4274', monthLabel: 'Junho / 26', hours: 17.34 },
  { key: 'SUPMED-4395', monthLabel: 'Junho / 26', hours: 2.76 },
  { key: 'SUPMED-4411', monthLabel: 'Junho / 26', hours: 483.06 },
  { key: 'SUPMED-4412', monthLabel: 'Junho / 26', hours: 482.98 },
  { key: 'SUPMED-4413', monthLabel: 'Junho / 26', hours: 9.79 },
  { key: 'SUPMED-4423', monthLabel: 'Junho / 26', hours: 7.87 },
  { key: 'SUPMED-4426', monthLabel: 'Junho / 26', hours: 75.09 },
  { key: 'SUPMED-4427', monthLabel: 'Junho / 26', hours: 3.47 },
  { key: 'SUPMED-4428', monthLabel: 'Junho / 26', hours: 3.43 },
  { key: 'SUPMED-4429', monthLabel: 'Junho / 26', hours: 3.40 },
  { key: 'SUPMED-4430', monthLabel: 'Junho / 26', hours: 3.27 },
  { key: 'SUPMED-4431', monthLabel: 'Junho / 26', hours: 3.24 },
  { key: 'SUPMED-4432', monthLabel: 'Junho / 26', hours: 3.21 },
  { key: 'SUPMED-4433', monthLabel: 'Junho / 26', hours: 0.92 },
  { key: 'SUPMED-4437', monthLabel: 'Junho / 26', hours: 432.69 },
  { key: 'SUPMED-4439', monthLabel: 'Junho / 26', hours: 87.63 },
  { key: 'SUPMED-4440', monthLabel: 'Junho / 26', hours: 87.61 },
  { key: 'SUPMED-4441', monthLabel: 'Junho / 26', hours: 247.47 },
  { key: 'SUPMED-4513', monthLabel: 'Junho / 26', hours: 66.55 },
  { key: 'SUPMED-4514', monthLabel: 'Junho / 26', hours: 72.48 },
  { key: 'SUPMED-4585', monthLabel: 'Junho / 26', hours: 8.06 },
  { key: 'SUPMED-4586', monthLabel: 'Junho / 26', hours: 362.49 },
  { key: 'SUPMED-4600', monthLabel: 'Junho / 26', hours: 50.56 },
  { key: 'SUPMED-4772', monthLabel: 'Julho / 26', hours: 3.28 },
  { key: 'SUPMED-4773', monthLabel: 'Julho / 26', hours: 3.23 },
  { key: 'SUPMED-4774', monthLabel: 'Julho / 26', hours: 3.92 },
  { key: 'SUPMED-4775', monthLabel: 'Julho / 26', hours: 3.44 },
  { key: 'SUPMED-4776', monthLabel: 'Julho / 26', hours: 3.61 },
  { key: 'SUPMED-4777', monthLabel: 'Julho / 26', hours: 4.02 },
  { key: 'SUPMED-4790', monthLabel: 'Julho / 26', hours: 1.36 },
  { key: 'SUPMED-4820', monthLabel: 'Julho / 26', hours: 3.59 },
  { key: 'SUPMED-4823', monthLabel: 'Julho / 26', hours: 2.62 },
  { key: 'SUPMED-4841', monthLabel: 'Julho / 26', hours: 0.94 },
  { key: 'SUPMED-4844', monthLabel: 'Julho / 26', hours: 7.84 },
  { key: 'SUPMED-4859', monthLabel: 'Julho / 26', hours: 2.20 },
  { key: 'SUPMED-4860', monthLabel: 'Julho / 26', hours: 3.26 },
  { key: 'SUPMED-4862', monthLabel: 'Julho / 26', hours: 3.64 },
  { key: 'SUPMED-4875', monthLabel: 'Julho / 26', hours: 5.39 },
  { key: 'SUPMED-4888', monthLabel: 'Julho / 26', hours: 103.25 },
  { key: 'SUPMED-4971', monthLabel: 'Julho / 26', hours: 2.94 },
];

const SLA_STATUS_INCLUDED = [
  'Validação Gatekeeper',
  'Configuração Mercury (Gatekeeper)',
  'Validação Fiscal/Financeiro/SAP',
  'Conferência Final (Gatekeeper)',
];

const SLA_STATUS_STOP = ['Produto Pronto para Comercialização', 'Cancelado'];

const MONTH_OPTIONS = [
  { value: 'all', label: 'Todos os meses' },
  ...MONTHLY_COUNTS.map((item) => ({ value: item.monthLabel, label: item.monthLabel })),
];

/**
 * Calcula a média de SLA para um conjunto de tickets.
 * @param {SlaTopTicket[]} tickets
 * @returns {number}
 */
function calculateAverageHours(tickets: SlaTopTicket[]): number {
  if (!tickets.length) return 0;
  return tickets.reduce((sum, ticket) => sum + ticket.hours, 0) / tickets.length;
}

/**
 * Calcula a mediana de SLA para um conjunto de tickets.
 * @param {SlaTopTicket[]} tickets
 * @returns {number}
 */
function calculateMedianHours(tickets: SlaTopTicket[]): number {
  if (!tickets.length) return 0;
  const sorted = tickets.map((ticket) => ticket.hours).sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

/**
 * Agrupa tickets por mês para exibir o SLA médio na seção mensal.
 * @param {SlaTopTicket[]} tickets
 * @returns {Array<{ monthLabel: string; totalTickets: number; averageHours: number }>}
 */
function buildSlaMonthly(tickets: SlaTopTicket[]): Array<{ monthLabel: string; totalTickets: number; averageHours: number }> {
  return MONTHLY_COUNTS
    .map((month) => {
      const monthTickets = tickets.filter((ticket) => ticket.monthLabel === month.monthLabel);
      return {
        monthLabel: month.monthLabel,
        totalTickets: monthTickets.length,
        averageHours: calculateAverageHours(monthTickets),
      };
    })
    .filter((month) => month.totalTickets > 0);
}

/**
 * Renderiza o report mensal de tickets Checkout criados.
 * @returns Visão consolidada com totais e distribuição por mês.
 */
export default function CheckoutTicketsCriadosPorMesCanvas() {
  const [showTop10, setShowTop10] = useState(false);
  const [selectedMonth, setSelectedMonth] = useCanvasState<string>('checkout-month', 'all');
  const dispatch = useCanvasAction();
  const selectedMonthlyCounts = selectedMonth === 'all'
    ? MONTHLY_COUNTS
    : MONTHLY_COUNTS.filter((item) => item.monthLabel === selectedMonth);
  const selectedTickets = selectedMonth === 'all'
    ? CHECKOUT_TICKETS
    : CHECKOUT_TICKETS.filter((ticket) => ticket.monthLabel === selectedMonth);
  const totalTickets = selectedTickets.length;
  const peakMonth = selectedMonthlyCounts.reduce((max, item) => (item.total > max.total ? item : max), selectedMonthlyCounts[0]);
  const averagePerMonth = Math.round(totalTickets / selectedMonthlyCounts.length);
  const maxValue = Math.max(...selectedMonthlyCounts.map((item) => item.total));
  const ticketsWithTime = selectedTickets.filter((ticket) => ticket.hours > 0);
  const averageSlaHours = calculateAverageHours(ticketsWithTime);
  const medianSlaHours = calculateMedianHours(ticketsWithTime);
  const topTickets = [...ticketsWithTime].sort((a, b) => b.hours - a.hours).slice(0, 10);
  const highestSla = topTickets[0];
  const slaMonthly = buildSlaMonthly(selectedTickets);
  const selectedMonthLabel = selectedMonth === 'all' ? 'Todos os meses' : selectedMonth;

  return (
    <Stack gap={16} style={{ padding: 24, maxWidth: 1100 }}>
      <Row align="center" justify="space-between">
        <Stack gap={4}>
          <H1>Checkout Operational Performance</H1>
          <Text tone="secondary" size="small">
            Fonte: {SOURCE_LABEL} | Snapshot: {SNAPSHOT_AT}
          </Text>
        </Stack>
        <Button variant="secondary" onClick={() => dispatch({ type: 'openFile', path: OGC_PATH })}>
          Voltar ao Operational Governance Center
        </Button>
      </Row>

      <Row gap={12} align="center" wrap>
        <Text weight="medium">Filtro de mês:</Text>
        <Select value={selectedMonth} onChange={setSelectedMonth} options={MONTH_OPTIONS} style={{ width: 240 }} />
        <Text tone="secondary" size="small">
          Exibindo: {selectedMonthLabel}
        </Text>
      </Row>

      <Grid columns={3} gap={12}>
        <Stat value={String(totalTickets)} label="Total de tickets" tone="info" />
        <Stat value={peakMonth.monthLabel} label="Mês com maior volume" tone="success" />
        <Stat value={String(averagePerMonth)} label="Média mensal" tone="warning" />
      </Grid>

      <Card>
        <CardHeader>Distribuição mensal</CardHeader>
        <CardBody>
          <Stack gap={10}>
            {selectedMonthlyCounts.map((item) => {
              const widthPercent = Math.max(6, Math.round((item.total / maxValue) * 100));
              return (
                <div key={item.monthLabel}>
                  <Stack gap={4}>
                    <Row align="center" justify="space-between">
                      <Text>{item.monthLabel}</Text>
                      <Text tone="secondary" size="small">
                        {item.total} ticket(s)
                      </Text>
                    </Row>
                    <div
                      style={{
                        width: `${widthPercent}%`,
                        height: 8,
                        borderRadius: 6,
                        background: 'var(--color-primary)',
                      }}
                    />
                  </Stack>
                </div>
              );
            })}
          </Stack>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>SLA GateKeeper</CardHeader>
        <CardBody>
          <Stack gap={10}>
            <Text tone="secondary" size="small">
              Soma do tempo somente nestes status: {SLA_STATUS_INCLUDED.join(' | ')}
            </Text>
            <Text tone="secondary" size="small">
              A contagem para quando o ticket entra em: {SLA_STATUS_STOP.join(' | ')}
            </Text>
            <Grid columns={4} gap={12}>
              <Stat value={String(totalTickets)} label="Tickets analisados" tone="info" />
              <Stat value={`${averageSlaHours.toFixed(2)} h`} label="Média SLA/ticket" tone="success" />
              <Stat value={`${medianSlaHours.toFixed(2)} h`} label="Mediana SLA/ticket" tone="success" />
              <Stat value={`${highestSla.hours.toFixed(2)} h`} label={`Maior SLA · ${highestSla.key}`} tone="danger" />
            </Grid>
            <Text tone="secondary" size="small">
              {ticketsWithTime.length} de {totalTickets} tickets tiveram tempo nesses status | {totalTickets - ticketsWithTime.length} sem SLA (nunca chegaram ao fluxo GateKeeper)
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>SLA médio por mês</CardHeader>
        <CardBody>
          <Stack gap={8}>
            {slaMonthly.map((item) => (
              <div key={item.monthLabel}>
                <Row align="center" justify="space-between">
                  <Text>{item.monthLabel}</Text>
                  <Text tone="secondary" size="small">
                    {item.totalTickets} ticket(s) | {item.averageHours.toFixed(2)} h média
                  </Text>
                </Row>
              </div>
            ))}
          </Stack>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Row align="center" justify="space-between">
            <Text>Top 10 maiores SLA · {selectedMonthLabel}</Text>
            <button
              onClick={() => setShowTop10((v) => !v)}
              style={{
                padding: '4px 14px',
                borderRadius: 6,
                border: '1px solid var(--color-border)',
                background: showTop10 ? 'var(--color-primary)' : 'transparent',
                color: showTop10 ? '#fff' : 'var(--color-text)',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              {showTop10 ? 'Ocultar' : 'Ver Top 10'}
            </button>
          </Row>
        </CardHeader>
        {showTop10 && (
          <CardBody>
            <Stack gap={8}>
              {topTickets.map((ticket) => (
                <div key={ticket.key}>
                  <Row align="center" justify="space-between">
                    <Text>{ticket.key}</Text>
                    <Text tone="secondary" size="small">
                      {ticket.hours.toFixed(2)} h
                    </Text>
                  </Row>
                </div>
              ))}
            </Stack>
          </CardBody>
        )}
      </Card>
    </Stack>
  );
}
