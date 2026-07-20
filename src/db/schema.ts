import {
  boolean,
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const ticketStatusEnum = pgEnum('ticket_status', [
  'open',
  'in_progress',
  'pending_client',
  'resolved',
  'closed',
]);

export const ticketPriorityEnum = pgEnum('ticket_priority', [
  'low',
  'medium',
  'high',
  'critical',
]);

export const teamEnum = pgEnum('team', [
  'n2',
  'checkout',
  'b2b',
  'platform',
  'other',
]);

/** Membros do time de suporte */
export const teamMembers = pgTable('team_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  team: teamEnum('team').notNull().default('n2'),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/** Tabela principal de tickets de suporte */
export const tickets = pgTable('tickets', {
  id: uuid('id').defaultRandom().primaryKey(),
  externalId: text('external_id').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  status: ticketStatusEnum('status').notNull().default('open'),
  priority: ticketPriorityEnum('priority').notNull().default('medium'),
  team: teamEnum('team').notNull().default('n2'),
  assigneeId: uuid('assignee_id').references(() => teamMembers.id),
  category: text('category'),
  isMajorIncident: boolean('is_major_incident').notNull().default(false),
  parentId: uuid('parent_id'),
  slaDeadline: timestamp('sla_deadline'),
  createdAt: timestamp('created_at').notNull(),
  resolvedAt: timestamp('resolved_at'),
  closedAt: timestamp('closed_at'),
  importedAt: timestamp('imported_at').defaultNow().notNull(),
});

/** Snapshots diários de métricas operacionais por time */
export const metricsSnapshots = pgTable('metrics_snapshots', {
  id: uuid('id').defaultRandom().primaryKey(),
  snapshotDate: timestamp('snapshot_date').notNull(),
  team: teamEnum('team').notNull(),
  totalTickets: integer('total_tickets').notNull().default(0),
  openTickets: integer('open_tickets').notNull().default(0),
  resolvedTickets: integer('resolved_tickets').notNull().default(0),
  avgResolutionHours: numeric('avg_resolution_hours', { precision: 10, scale: 2 }),
  slaComplianceRate: numeric('sla_compliance_rate', { precision: 5, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/** Importações de dados (controle de ETL) */
export const dataImports = pgTable('data_imports', {
  id: uuid('id').defaultRandom().primaryKey(),
  source: text('source').notNull(),
  totalRows: integer('total_rows').notNull().default(0),
  importedRows: integer('imported_rows').notNull().default(0),
  status: text('status').notNull().default('pending'),
  errorMessage: text('error_message'),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  finishedAt: timestamp('finished_at'),
});
