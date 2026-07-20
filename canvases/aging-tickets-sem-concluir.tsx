import {
  BarChart,
  Button,
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
  useCanvasAction,
  useCanvasState,
} from "@/lib/cursor-canvas";

type AgingRange = "all" | "15-30" | "31-60" | "61-90" | "90+";
type SortOrder = "oldest-first" | "recent-first";
type Section = "summary" | "critical";
type TicketBase = {
  key: string;
  summary: string;
  status: string;
  issueType: string;
  assignee: string;
  created: string;
  updated: string;
  daysOpen: number;
};
type TicketView = TicketBase & {
  system: string;
  topic: string;
  queue: string;
  updatedLabel: string;
};

const GENERATED_AT = "13/07/2026 17:54";
const HEALTH_PANEL_PATH = "C:/Users/BernardLadeia/.cursor/projects/d-Medcof-HealthPanel-Project/canvases/operational-governance-center.canvas.tsx";
const JQL_BASE =
  'project = SUPMED AND issuetype != "Sugest�o" AND statusCategory NOT IN ("Done") AND status NOT IN ("Cancelled","Cancelado","Conclu�do","Concluido") AND created <= "-15d" ORDER BY created ASC';

// Extra�do via MCP Jira (searchJiraIssuesUsingJql) e consolidado para facilitar manuten��o.
const RAW_TICKETS: TicketBase[] = [
  { key: "SUPMED-1006", summary: "Qbank - Erro ao contabilizar ofensiva dos flashcards", status: "Feedback Aluno", issueType: "Ticket sendo tratado N3", assignee: "Almir William", created: "2026-01-17T08:13:24.465-0300", updated: "2026-07-09T14:46:52.276-0300", daysOpen: 177 },
  { key: "SUPMED-1330", summary: "QBank - Flashcards - Falha ao Resetar os Flashcards", status: "Em produ��o N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-02-07T15:02:21.258-0300", updated: "2026-07-08T17:27:56.511-0300", daysOpen: 156 },
  { key: "SUPMED-1387", summary: "Flashcards | Ofensiva n�o atualiza", status: "Feedback Aluno", issueType: "Ticket sendo tratado N3", assignee: "Almir William", created: "2026-02-11T14:59:23.032-0300", updated: "2026-07-09T14:46:52.722-0300", daysOpen: 152 },
  { key: "SUPMED-1399", summary: "FlashCards - Ofensiva do aluno n�o est�  sendo contabilizada.", status: "Feedback Aluno", issueType: "Ticket sendo tratado N3", assignee: "Almir William", created: "2026-02-12T07:41:03.383-0300", updated: "2026-07-09T14:46:52.205-0300", daysOpen: 151 },
  { key: "SUPMED-1426", summary: "FlashCards - Erro na contabiliza��o das ofensivas", status: "Feedback Aluno", issueType: "Ticket sendo tratado N3", assignee: "Almir William", created: "2026-02-13T11:41:18.461-0300", updated: "2026-07-09T14:46:52.209-0300", daysOpen: 150 },
  { key: "SUPMED-1433", summary: "Qbank - Dias de ofensiva Flashcard errados.", status: "Feedback Aluno", issueType: "Ticket sendo tratado N3", assignee: "Almir William", created: "2026-02-13T15:06:41.738-0300", updated: "2026-07-09T14:46:52.502-0300", daysOpen: 150 },
  { key: "SUPMED-1455", summary: "Qbank - Revis�o N�cleo - Entrega das Tags", status: "Em desenvolvimento N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-02-15T10:09:53.331-0300", updated: "2026-06-15T09:07:34.267-0300", daysOpen: 148 },
  { key: "SUPMED-1474", summary: "DeckLabs - Flashcards - Cards Marcados Como \"Errados\" N�o Retornam Para Revis�o", status: "Feedback Aluno", issueType: "Enviar uma solicita��o ou incidente", assignee: "Almir William", created: "2026-02-18T11:57:44.874-0300", updated: "2026-07-09T14:46:52.490-0300", daysOpen: 145 },
  { key: "SUPMED-1483", summary: "DeckLabs - Flashcards - Ofensivas Sem Contabiliza��o", status: "Feedback Aluno", issueType: "Enviar uma solicita��o ou incidente", assignee: "Almir William", created: "2026-02-19T09:32:45.624-0300", updated: "2026-07-09T14:46:52.583-0300", daysOpen: 144 },
  { key: "SUPMED-1716", summary: "Feedbank - Revis�es n�cleo", status: "Em produ��o N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-03-11T10:21:35.816-0300", updated: "2026-06-29T12:37:29.877-0300", daysOpen: 124 },
  { key: "SUPMED-1725", summary: "Qbank prime - Problema ao gerar novo teste", status: "Aguardando testes N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-03-11T14:53:49.797-0300", updated: "2026-05-19T09:38:21.888-0300", daysOpen: 124 },
  { key: "SUPMED-1731", summary: "Qbank - Erro ao gerar teste a partir do Guia Estat�stico", status: "Em desenvolvimento N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-03-11T15:54:44.354-0300", updated: "2026-05-19T09:38:48.926-0300", daysOpen: 124 },
  { key: "SUPMED-1741", summary: "Qbank prime - Erro no guia estat�stico", status: "Em desenvolvimento N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-03-12T13:11:06.403-0300", updated: "2026-05-19T09:38:30.535-0300", daysOpen: 123 },
  { key: "SUPMED-1765", summary: "Qbank prime - N�o aparece no ranking do simulado Presencial", status: "Em desenvolvimento N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-03-13T15:33:15.056-0300", updated: "2026-05-19T09:38:25.806-0300", daysOpen: 122 },
  { key: "SUPMED-1775", summary: "DeckLabs - Flashcards - Cards com Listas n�o Exibem Formata��o Correta", status: "Em produ��o N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-03-14T12:39:09.383-0300", updated: "2026-07-08T17:43:06.590-0300", daysOpen: 121 },
  { key: "SUPMED-1788", summary: "Qbank prime - Erro nas Revis�es N�cleo", status: "Feedback Aluno", issueType: "Enviar uma solicita��o ou incidente", assignee: "Almir William", created: "2026-03-16T09:10:17.048-0300", updated: "2026-07-09T14:46:52.512-0300", daysOpen: 119 },
  { key: "SUPMED-1791", summary: "Qbank prime - Quest�es repetidas em novo teste", status: "Em desenvolvimento N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-03-16T13:32:39.148-0300", updated: "2026-05-19T09:38:37.575-0300", daysOpen: 119 },
  { key: "SUPMED-1797", summary: "Qbank prime - Quest�es repetidas em novo teste", status: "Em desenvolvimento N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-03-16T14:31:01.754-0300", updated: "2026-05-19T09:38:48.253-0300", daysOpen: 119 },
  { key: "SUPMED-1813", summary: "Qbank prime - Problema ao riscar alternativas", status: "Em desenvolvimento N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-03-17T15:24:00.537-0300", updated: "2026-05-19T09:38:40.222-0300", daysOpen: 118 },
  { key: "SUPMED-1850", summary: "Intranet - Simulados - Rankings sem Exibi��o", status: "Aguardando desenvolvimento N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-03-19T19:48:52.527-0300", updated: "2026-07-08T16:08:10.845-0300", daysOpen: 115 },
  { key: "SUPMED-1860", summary: "Guia Estat�stico- Erro ao gerar teste", status: "Em desenvolvimento N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-03-20T11:43:34.374-0300", updated: "2026-05-19T09:38:34.407-0300", daysOpen: 115 },
  { key: "SUPMED-1873", summary: "Qbank prime - Problema no reset dos flashcards", status: "Feedback Aluno", issueType: "Ticket sendo tratado N3", assignee: "Almir William", created: "2026-03-21T11:13:29.782-0300", updated: "2026-07-09T14:46:52.458-0300", daysOpen: 114 },
  { key: "SUPMED-1884", summary: "Qbank � N�vel de dom�nio n�o sobe para algumas tags", status: "Aguardando Subida em Produ��o N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-03-21T17:17:00.027-0300", updated: "2026-05-19T09:38:29.780-0300", daysOpen: 114 },
  { key: "SUPMED-1892", summary: "Qbank- Impossibilidade de riscar quest�es com o TocuhPad.", status: "Em desenvolvimento N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-03-22T10:18:07.157-0300", updated: "2026-05-19T09:38:36.850-0300", daysOpen: 113 },
  { key: "SUPMED-1893", summary: "Qbank- Alternativas est�o ficando riscadas sozinhas no IPAD", status: "Em desenvolvimento N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-03-22T10:32:21.248-0300", updated: "2026-05-26T08:25:32.046-0300", daysOpen: 113 },
  { key: "SUPMED-1908", summary: "QBank - Revis�es N�cleo - Inconsist�ncia nos Desafios", status: "Feedback Aluno", issueType: "Enviar uma solicita��o ou incidente", assignee: "Almir William", created: "2026-03-23T13:52:08.240-0300", updated: "2026-07-09T14:46:52.417-0300", daysOpen: 112 },
  { key: "SUPMED-1909", summary: "Qbank prime - Erro no guia estat�stico", status: "Em desenvolvimento N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-03-23T14:04:06.849-0300", updated: "2026-05-19T09:38:38.570-0300", daysOpen: 112 },
  { key: "SUPMED-1925", summary: "Medcof � Erro no Qbank personalizado", status: "Em desenvolvimento N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-03-25T13:29:06.844-0300", updated: "2026-05-19T09:38:21.055-0300", daysOpen: 110 },
  { key: "SUPMED-1926", summary: "QBank - Revis�es N�cleo - Perda de ofensiva", status: "Feedback Aluno", issueType: "Enviar uma solicita��o ou incidente", assignee: "Almir William", created: "2026-03-25T15:05:43.031-0300", updated: "2026-07-09T14:46:52.427-0300", daysOpen: 110 },
  { key: "SUPMED-2143", summary: "Intranet - Simulados - Ranking sem Exibi��o", status: "Aguardando desenvolvimento N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-04-09T13:52:04.809-0300", updated: "2026-07-08T16:06:26.764-0300", daysOpen: 95 },
  { key: "SUPMED-2144", summary: "Qbank prime - Diverg�ncia resultado Simulado Presencial", status: "Em Desenvolvimento", issueType: "Ticket sendo tratado N3", assignee: "�", created: "2026-04-09T13:58:02.008-0300", updated: "2026-06-12T17:04:14.670-0300", daysOpen: 95 },
  { key: "SUPMED-2148", summary: "Qbank prime - N�o aparece resultado do Simulado", status: "Em Desenvolvimento", issueType: "Ticket sendo tratado N3", assignee: "�", created: "2026-04-09T14:57:07.497-0300", updated: "2026-06-01T14:13:25.521-0300", daysOpen: 95 },
  { key: "SUPMED-2162", summary: "Qbank - Simulado Diverg�ncia entre nota da plataforma e corre��o manual", status: "Em Desenvolvimento", issueType: "Ticket sendo tratado N3", assignee: "�", created: "2026-04-09T18:38:39.033-0300", updated: "2026-06-12T17:04:14.665-0300", daysOpen: 94 },
  { key: "SUPMED-2164", summary: "Qbank - Diverg�ncia na pontua��o e corre��o do Simulado Presencial 3.", status: "Em Desenvolvimento", issueType: "Ticket sendo tratado N3", assignee: "�", created: "2026-04-09T19:03:00.198-0300", updated: "2026-06-24T11:09:56.693-0300", daysOpen: 94 },
  { key: "SUPMED-2166", summary: "Qbank � Inconsist�ncia na pontua��o simulado presencial", status: "Em Desenvolvimento", issueType: "Ticket sendo tratado N3", assignee: "�", created: "2026-04-09T19:51:35.609-0300", updated: "2026-06-12T17:04:14.616-0300", daysOpen: 94 },
  { key: "SUPMED-2169", summary: "QBank - Flashcards - Falha na Contagem da Ofensiva", status: "Em produ��o N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-04-09T20:57:08.802-0300", updated: "2026-07-08T17:24:23.153-0300", daysOpen: 94 },
  { key: "SUPMED-2174", summary: "Qbank - Diverg�ncia na pontua��o do ranking Simulado 3", status: "Em Desenvolvimento", issueType: "Ticket sendo tratado N3", assignee: "�", created: "2026-04-09T22:23:14.331-0300", updated: "2026-06-12T17:04:14.682-0300", daysOpen: 94 },
  { key: "SUPMED-2199", summary: "Qbank - Discrep�ncia de nota no ranking Simulado 3", status: "Em Desenvolvimento", issueType: "Ticket sendo tratado N3", assignee: "�", created: "2026-04-10T22:13:40.488-0300", updated: "2026-06-12T17:04:14.657-0300", daysOpen: 93 },
  { key: "SUPMED-2213", summary: "Qbank prime - Problema simulado R+ Endoscopia", status: "Aguardando desenvolvimento N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-04-11T12:51:24.512-0300", updated: "2026-06-25T10:54:19.412-0300", daysOpen: 93 },
  { key: "SUPMED-2221", summary: "Diverg�ncias no simulado", status: "Em Desenvolvimento", issueType: "Ticket sendo tratado N3", assignee: "�", created: "2026-04-12T13:32:24.300-0300", updated: "2026-07-03T16:07:04.636-0300", daysOpen: 92 },
  { key: "SUPMED-2224", summary: "Qbank prime - Inconsistencia resultado simulado 3", status: "Em Desenvolvimento", issueType: "Ticket sendo tratado N3", assignee: "�", created: "2026-04-13T09:00:40.697-0300", updated: "2026-06-12T17:04:14.666-0300", daysOpen: 91 },
  { key: "SUPMED-2225", summary: "Hermes - DailyCof - Falha na Barra de Rolagem", status: "Em an�lise N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "Daniel Lopes", created: "2026-04-13T09:21:28.534-0300", updated: "2026-07-08T17:59:19.765-0300", daysOpen: 91 },
  { key: "SUPMED-2260", summary: "Qbank � Simulados presenciais n�o computados no ranking", status: "Em Desenvolvimento", issueType: "Ticket sendo tratado N3", assignee: "�", created: "2026-04-13T20:42:54.842-0300", updated: "2026-06-01T14:18:09.189-0300", daysOpen: 90 },
  { key: "SUPMED-2272", summary: "Qbank prime - N�o aparece no ranking do simulado Presencial", status: "Em Desenvolvimento", issueType: "Ticket sendo tratado N3", assignee: "�", created: "2026-04-14T08:54:57.414-0300", updated: "2026-06-01T14:20:18.369-0300", daysOpen: 90 },
  { key: "SUPMED-2273", summary: "Qbank prime - N�o aparece no ranking do simulado Presencial", status: "Em Desenvolvimento", issueType: "Ticket sendo tratado N3", assignee: "�", created: "2026-04-14T09:01:28.273-0300", updated: "2026-07-13T11:20:38.880-0300", daysOpen: 90 },
  { key: "SUPMED-2313", summary: "Qbank � Diverg�ncia de nota em simulado presencial (Pinheiros)", status: "Em Desenvolvimento", issueType: "Ticket sendo tratado N3", assignee: "�", created: "2026-04-15T13:19:50.810-0300", updated: "2026-06-12T17:04:14.616-0300", daysOpen: 89 },
  { key: "SUPMED-2347", summary: "Hermes - DailyCof - Perda de Ofensiva das Revis�es N�cleo Pelo DailyCof", status: "Aguardando desenvolvimento N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-04-17T10:10:33.941-0300", updated: "2026-07-08T17:58:14.206-0300", daysOpen: 87 },
  { key: "SUPMED-2356", summary: "Qbank - Revis�es N�cleo - �ndice de Revis�o (IR) Travado em 91%", status: "Em an�lise N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-04-17T14:24:37.493-0300", updated: "2026-07-08T17:19:58.638-0300", daysOpen: 87 },
  { key: "SUPMED-2361", summary: "DeckLabs - Flashcards - Problema no Redimensionamento de Baralhos", status: "Em produ��o N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-04-17T17:02:32.302-0300", updated: "2026-07-08T17:42:05.587-0300", daysOpen: 87 },
  { key: "SUPMED-2440", summary: "QBank - Revis�es N�cleo - Perda de ofensiva", status: "Feedback Aluno", issueType: "Enviar uma solicita��o ou incidente", assignee: "Jo�o Ribeiro", created: "2026-04-27T09:14:48.406-0300", updated: "2026-07-09T14:46:52.466-0300", daysOpen: 77 },
  { key: "SUPMED-2478", summary: "Apollo - V�deo Aula - Erro Tela Cheia", status: "Em desenvolvimento N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "Thiago Gomes", created: "2026-04-29T11:10:59.548-0300", updated: "2026-07-13T09:19:41.628-0300", daysOpen: 75 },
  { key: "SUPMED-2491", summary: "Qbank prime - Problema em Minhas Notas", status: "Feedback Aluno", issueType: "Ticket sendo tratado N3", assignee: "Jo�o Ribeiro", created: "2026-04-30T09:54:00.768-0300", updated: "2026-07-09T14:46:52.495-0300", daysOpen: 74 },
  { key: "SUPMED-2495", summary: "Qbank prime - N�o aparece resultado do Simulado", status: "Em Desenvolvimento", issueType: "Ticket sendo tratado N3", assignee: "�", created: "2026-04-30T14:18:44.613-0300", updated: "2026-06-17T11:12:32.290-0300", daysOpen: 74 },
  { key: "SUPMED-2501", summary: "Qbank � Ranking e desempenho n�o dispon�veis nos simulados 2 e 4", status: "Em Desenvolvimento", issueType: "Ticket sendo tratado N3", assignee: "�", created: "2026-04-30T16:33:19.460-0300", updated: "2026-06-17T11:12:32.261-0300", daysOpen: 74 },
  { key: "SUPMED-2530", summary: "QBank - Revis�es N�cleo - Perda de ofensiva", status: "Feedback Aluno", issueType: "Enviar uma solicita��o ou incidente", assignee: "Jo�o Ribeiro", created: "2026-05-03T14:54:16.474-0300", updated: "2026-07-09T14:46:52.593-0300", daysOpen: 71 },
  { key: "SUPMED-2533", summary: "QBank - Revis�es N�cleo - Perda de ofensiva", status: "Feedback Aluno", issueType: "Enviar uma solicita��o ou incidente", assignee: "Jo�o Ribeiro", created: "2026-05-04T10:47:55.908-0300", updated: "2026-07-09T14:46:52.639-0300", daysOpen: 70 },
  { key: "SUPMED-2626", summary: "DeckLabs - Flashcards - Erro Ap�s Exclus�o", status: "Em produ��o N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-05-07T13:37:23.482-0300", updated: "2026-07-08T17:41:11.909-0300", daysOpen: 67 },
  { key: "SUPMED-2651", summary: "Intranet - Cargo de \"Suporte\" n�o gera sugest�o de revis�o n�cleo", status: "Aguardando desenvolvimento N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-05-08T14:33:44.039-0300", updated: "2026-06-25T10:54:31.256-0300", daysOpen: 66 },
  { key: "SUPMED-2867", summary: "Qbank - Simulado 1 e 4 consta como n�o feito", status: "Em Desenvolvimento", issueType: "Ticket sendo tratado N3", assignee: "�", created: "2026-05-14T15:04:51.353-0300", updated: "2026-05-18T16:15:56.788-0300", daysOpen: 60 },
  { key: "SUPMED-2899", summary: "QBank - Revis�es N�cleo - Perda de ofensiva", status: "Aguardando N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-05-18T11:03:51.133-0300", updated: "2026-07-08T17:15:55.416-0300", daysOpen: 56 },
  { key: "SUPMED-2947", summary: "QBank - Revis�es N�cleo - Perda de ofensiva", status: "Aguardando N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-05-20T10:34:28.464-0300", updated: "2026-07-08T17:15:29.211-0300", daysOpen: 54 },
  { key: "SUPMED-3300", summary: "QBank - Revis�es N�cleo - Perda de ofensiva", status: "Aguardando N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-05-25T11:17:58.928-0300", updated: "2026-07-08T17:15:03.977-0300", daysOpen: 49 },
  { key: "SUPMED-3504", summary: "QBank - Revis�es N�cleo - Perda de ofensiva", status: "Aguardando desenvolvimento N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-05-29T11:54:16.840-0300", updated: "2026-07-08T17:12:58.696-0300", daysOpen: 45 },
  { key: "SUPMED-3592", summary: "QBank - Revis�es N�cleo - Perda de ofensiva", status: "Aguardando N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-06-01T18:37:19.518-0300", updated: "2026-07-08T17:12:29.868-0300", daysOpen: 41 },
  { key: "SUPMED-3601", summary: "QBank - Revis�es N�cleo - Perda de ofensiva", status: "Aguardando N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-06-02T11:31:38.865-0300", updated: "2026-07-08T17:12:03.440-0300", daysOpen: 41 },
  { key: "SUPMED-3613", summary: "Qbank - Atalhos dos Flashcards errados", status: "Feedback Aluno", issueType: "Ticket sendo tratado N3", assignee: "Jo�o Ribeiro", created: "2026-06-02T16:44:49.679-0300", updated: "2026-07-09T14:46:52.573-0300", daysOpen: 41 },
  { key: "SUPMED-3643", summary: "QBank - Revis�es N�cleo - Perda de ofensiva", status: "Em desenvolvimento N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "matheus ricardo", created: "2026-06-02T18:11:16.985-0300", updated: "2026-07-13T10:16:14.697-0300", daysOpen: 40 },
  { key: "SUPMED-3644", summary: "Apollo - AQFM Anticoncep��o (Diamante) n�o marca como conclu�do apesar de requisitos m�nimos cumpridos", status: "Feedback Aluno", issueType: "Ticket sendo tratado N3", assignee: "Jo�o Ribeiro", created: "2026-06-02T18:23:20.127-0300", updated: "2026-07-07T15:29:07.020-0300", daysOpen: 40 },
  { key: "SUPMED-3666", summary: "QBank - Revis�es N�cleo - Perda de ofensiva", status: "Aguardando N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-06-04T16:39:31.835-0300", updated: "2026-07-08T17:10:31.376-0300", daysOpen: 39 },
  { key: "SUPMED-3674", summary: "Apollo - Problemas de exibi��o de progresso", status: "Feedback Aluno", issueType: "Ticket sendo tratado N3", assignee: "Jo�o Ribeiro", created: "2026-06-05T18:13:19.725-0300", updated: "2026-07-09T14:46:52.430-0300", daysOpen: 37 },
  { key: "SUPMED-3681", summary: "Apollo - Progresso e cronograma zerados", status: "Feedback Aluno", issueType: "Ticket sendo tratado N3", assignee: "Jo�o Ribeiro", created: "2026-06-06T19:39:25.449-0300", updated: "2026-07-09T14:46:52.562-0300", daysOpen: 36 },
  { key: "SUPMED-3692", summary: "QBank - Revis�es N�cleo - Perda de ofensiva", status: "Aguardando N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-06-08T12:49:24.954-0300", updated: "2026-07-08T17:09:59.170-0300", daysOpen: 35 },
  { key: "SUPMED-3701", summary: "QBank - Revis�es N�cleo - Perda de ofensiva", status: "Aguardando N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-06-09T08:59:39.819-0300", updated: "2026-07-08T16:49:44.378-0300", daysOpen: 34 },
  { key: "SUPMED-3708", summary: "Intranet - Simulados - Sem Exibi��o", status: "Aguardando N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-06-09T12:29:03.586-0300", updated: "2026-07-08T15:56:13.855-0300", daysOpen: 34 },
  { key: "SUPMED-3737", summary: "QBank - Revis�es N�cleo - Perda de ofensiva", status: "Aguardando N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-06-10T11:35:53.397-0300", updated: "2026-07-08T16:49:18.134-0300", daysOpen: 33 },
  { key: "SUPMED-3740", summary: "Exclus�o de usu�rio.", status: "Ticket Aberto", issueType: "Enviar uma solicita��o ou incidente", assignee: "Vit�ria Gonsalves dos Santos", created: "2026-06-10T14:03:49.482-0300", updated: "2026-06-11T03:01:39.137-0300", daysOpen: 33 },
  { key: "SUPMED-3741", summary: "QBank - Revis�es N�cleo - Perda de ofensiva", status: "Em review N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "Vinicius Assis", created: "2026-06-10T14:51:51.190-0300", updated: "2026-07-13T08:21:35.863-0300", daysOpen: 33 },
  { key: "SUPMED-3751", summary: "Apollo - Progresso do cronograma exibido como 0% at� clicar individualmente em cada bloco", status: "Feedback Aluno", issueType: "Ticket sendo tratado N3", assignee: "Raryane Cavalcante", created: "2026-06-11T11:58:45.621-0300", updated: "2026-07-09T14:46:52.517-0300", daysOpen: 32 },
  { key: "SUPMED-3761", summary: "Apollo - Cronograma/Falha na exibi��o e diverg�ncia de porcentagens", status: "Feedback Aluno", issueType: "Ticket sendo tratado N3", assignee: "Raryane Cavalcante", created: "2026-06-11T15:58:10.202-0300", updated: "2026-07-09T14:46:52.744-0300", daysOpen: 32 },
  { key: "SUPMED-4072", summary: "Apollo - Progresso do cronograma exibido como 0% (bug mapeado)", status: "Feedback Aluno", issueType: "Ticket sendo tratado N3", assignee: "Raryane Cavalcante", created: "2026-06-12T16:48:20.165-0300", updated: "2026-07-09T14:46:52.476-0300", daysOpen: 31 },
  { key: "SUPMED-4236", summary: "DeckLabs - Flashcards - Novos Baralhos N�o Aparecem na Lista de Sele��o", status: "Em produ��o N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-06-13T12:54:41.821-0300", updated: "2026-07-08T17:40:13.720-0300", daysOpen: 30 },
  { key: "SUPMED-4239", summary: "QBank - Revis�es N�cleo - Perda de ofensiva", status: "Aguardando N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-06-15T13:45:05.743-0300", updated: "2026-07-08T16:47:40.830-0300", daysOpen: 28 },
  { key: "SUPMED-4242", summary: "Aluna USMLE - Cria��o de Usu�rio e Libera��o do qBank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "C�ntia Oliveira Rocha dos Santos", created: "2026-06-15T14:27:48.791-0300", updated: "2026-06-16T03:01:21.311-0300", daysOpen: 28 },
  { key: "SUPMED-4244", summary: "Aluna USMLE - Cria��o de Usu�rio e Libera��o do qBank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Uatana Assis", created: "2026-06-15T14:34:08.338-0300", updated: "2026-06-16T12:12:53.628-0300", daysOpen: 28 },
  { key: "SUPMED-4245", summary: "Aluna USMLE - Cria��o de Usu�rio e Libera��o do QBank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Maclaynne Brasilina da Silva Aguiar", created: "2026-06-15T14:34:50.009-0300", updated: "2026-06-16T03:01:21.778-0300", daysOpen: 28 },
  { key: "SUPMED-4246", summary: "Aluno USMLE - Cria��o de Usu�rio e Libera��o do qBank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "C�ntia Oliveira Rocha dos Santos", created: "2026-06-15T14:36:04.225-0300", updated: "2026-06-16T03:01:22.700-0300", daysOpen: 28 },
  { key: "SUPMED-4247", summary: "Aluno USMLE - Cria��o de Usu�rio e Libera��o do qBank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Maclaynne Brasilina da Silva Aguiar", created: "2026-06-15T14:41:48.776-0300", updated: "2026-06-16T03:01:21.224-0300", daysOpen: 28 },
  { key: "SUPMED-4248", summary: "Aluna USMLE - Cria��o de Usu�rio e Libera��o do qBank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "C�ntia Oliveira Rocha dos Santos", created: "2026-06-15T14:44:18.290-0300", updated: "2026-06-16T03:01:21.550-0300", daysOpen: 28 },
  { key: "SUPMED-4249", summary: "Aluno USMLE - Cria��o de Usu�rio e Libera��o do Qbank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Maclaynne Brasilina da Silva Aguiar", created: "2026-06-15T14:49:58.671-0300", updated: "2026-06-16T09:02:35.533-0300", daysOpen: 28 },
  { key: "SUPMED-4250", summary: "Aluno USMLE - Cria��o de Usu�rio e Libera��o do qBank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "C�ntia Oliveira Rocha dos Santos", created: "2026-06-15T14:55:18.569-0300", updated: "2026-06-16T03:01:20.367-0300", daysOpen: 28 },
  { key: "SUPMED-4253", summary: "Aluna USMLE - Cria��o de Usu�rio e Libera��o do Qbank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Maclaynne Brasilina da Silva Aguiar", created: "2026-06-15T15:00:37.380-0300", updated: "2026-06-16T03:01:22.399-0300", daysOpen: 28 },
  { key: "SUPMED-4260", summary: "Aluno USA Infinity - Cria��o de Usu�rio e Libera��o do QBank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Samuel Chamoun Hamdan Bambirra", created: "2026-06-15T15:14:28.576-0300", updated: "2026-06-16T03:01:21.288-0300", daysOpen: 28 },
  { key: "SUPMED-4262", summary: "Aluno USMLE - Cria��o de Usu�rio e Libera��o do qBank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "C�ntia Oliveira Rocha dos Santos", created: "2026-06-15T15:16:09.387-0300", updated: "2026-06-16T03:01:17.947-0300", daysOpen: 28 },
  { key: "SUPMED-4265", summary: "Solicita��o de cria��o de usu�rio e libera��o de curso - USA", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "tayene.silva", created: "2026-06-15T15:23:42.810-0300", updated: "2026-06-16T03:01:19.939-0300", daysOpen: 28 },
  { key: "SUPMED-4268", summary: "Aluno USMLE - Cria��o de Usu�rio e Libera��o do qBank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Maclaynne Brasilina da Silva Aguiar", created: "2026-06-15T15:26:40.561-0300", updated: "2026-06-16T03:01:17.936-0300", daysOpen: 28 },
  { key: "SUPMED-4269", summary: "Sugest�o - Qbank - Aus�ncia de funcionalidade de busca por c�digo de quest�o", status: "Aguardando N2", issueType: "Enviar uma solicita��o ou incidente", assignee: "Eduardo Bombarda", created: "2026-06-15T15:39:36.974-0300", updated: "2026-06-16T03:01:17.938-0300", daysOpen: 28 },
  { key: "SUPMED-4270", summary: "Aluna USMLE - Cria��o de Usu�rio e Libera��o do qBank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "C�ntia Oliveira Rocha dos Santos", created: "2026-06-15T15:57:04.649-0300", updated: "2026-06-16T03:01:18.341-0300", daysOpen: 28 },
  { key: "SUPMED-4272", summary: "Qbank - Setas de dificuldade dos flashcards iguais para \"m�dio\" e \"dif�cil\"", status: "Aguardando Desenvolvimento", issueType: "Ticket sendo tratado N3", assignee: "�", created: "2026-06-15T16:19:20.580-0300", updated: "2026-07-07T15:33:13.971-0300", daysOpen: 28 },
  { key: "SUPMED-4276", summary: "Aluno USA Infinity - Cria��o de Usu�rio e Libera��o do QBank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Samuel Chamoun Hamdan Bambirra", created: "2026-06-15T19:08:09.678-0300", updated: "2026-06-17T12:15:19.275-0300", daysOpen: 27 },
  { key: "SUPMED-4277", summary: "Aluno USA - Cria��o de Usu�rio e Libera��o do QBank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Rafaela Cristina Silva Alves", created: "2026-06-15T19:50:17.289-0300", updated: "2026-06-16T17:24:35.495-0300", daysOpen: 27 },
  { key: "SUPMED-4280", summary: "Aluno USMLE - Cria��o de Usu�rio e Libera��o do qBank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Rafaela Cristina Silva Alves", created: "2026-06-15T21:23:44.527-0300", updated: "2026-06-16T09:10:10.757-0300", daysOpen: 27 },
  { key: "SUPMED-4281", summary: "Aluno USMLE - Cria��o de Usu�rio e Libera��o do qBank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Rafaela Cristina Silva Alves", created: "2026-06-15T21:45:29.769-0300", updated: "2026-06-16T16:48:46.253-0300", daysOpen: 27 },
  { key: "SUPMED-4283", summary: "Flashcards - N�o consegue resetar", status: "Em Desenvolvimento", issueType: "Ticket sendo tratado N3", assignee: "�", created: "2026-06-16T09:48:24.800-0300", updated: "2026-06-16T09:49:27.609-0300", daysOpen: 27 },
  { key: "SUPMED-4284", summary: "Apollo - Aulas e quest�es n�o s�o contabilizadas como conclu�das na plataforma", status: "Feedback Aluno", issueType: "Ticket sendo tratado N3", assignee: "Raryane Cavalcante", created: "2026-06-16T10:16:11.561-0300", updated: "2026-07-07T15:29:06.833-0300", daysOpen: 27 },
  { key: "SUPMED-4303", summary: "Aluno USMLE - Cria��o de Usu�rio e Libera��o do Qbank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Maclaynne Brasilina da Silva Aguiar", created: "2026-06-16T14:06:16.136-0300", updated: "2026-06-17T09:25:59.904-0300", daysOpen: 27 },
  { key: "SUPMED-4306", summary: "Teste.teste@medcof.bernard", status: "Ticket Aberto", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-06-16T16:35:14.237-0300", updated: "2026-06-17T03:01:27.131-0300", daysOpen: 27 },
  { key: "SUPMED-4308", summary: "Aluno USMLE - Cria��o de Usu�rio e Libera��o do Qbank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Maclaynne Brasilina da Silva Aguiar", created: "2026-06-16T18:03:28.885-0300", updated: "2026-06-17T06:10:37.658-0300", daysOpen: 26 },
  { key: "SUPMED-4309", summary: "Apollo - Progresso de aulas exibe 0% de progresso geral", status: "Feedback Aluno", issueType: "Ticket sendo tratado N3", assignee: "Raryane Cavalcante", created: "2026-06-16T18:56:35.994-0300", updated: "2026-07-09T14:46:52.720-0300", daysOpen: 26 },
  { key: "SUPMED-4311", summary: "Apollo - Progresso do cronograma exibido como 0% (bug mapeado)", status: "Feedback Aluno", issueType: "Ticket sendo tratado N3", assignee: "Raryane Cavalcante", created: "2026-06-17T10:02:11.077-0300", updated: "2026-07-09T14:46:52.539-0300", daysOpen: 26 },
  { key: "SUPMED-4312", summary: "Apollo - Cronograma - Progresso exibido como 0%", status: "Feedback Aluno", issueType: "Ticket sendo tratado N3", assignee: "Raryane Cavalcante", created: "2026-06-17T10:16:52.243-0300", updated: "2026-07-09T14:46:52.462-0300", daysOpen: 26 },
  { key: "SUPMED-4313", summary: "Apollo - Cronograma - Progresso n�o exibido corretamente", status: "Feedback Aluno", issueType: "Ticket sendo tratado N3", assignee: "Raryane Cavalcante", created: "2026-06-17T11:10:44.730-0300", updated: "2026-07-09T14:46:52.683-0300", daysOpen: 26 },
  { key: "SUPMED-4317", summary: "Solicita��o de cria��o de usu�rio e libera��o de curso", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "tayene.silva", created: "2026-06-17T17:36:20.832-0300", updated: "2026-06-20T14:58:19.782-0300", daysOpen: 26 },
  { key: "SUPMED-4327", summary: "Aluno R.A - Fazer entrega do curso.", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Maclaynne Brasilina da Silva Aguiar", created: "2026-06-18T17:56:56.403-0300", updated: "2026-06-19T03:01:11.167-0300", daysOpen: 24 },
  { key: "SUPMED-4329", summary: "Aluno USMLE - Cria��o de Usu�rio e Libera��o do qBank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Rafaela Cristina Silva Alves", created: "2026-06-18T21:31:38.024-0300", updated: "2026-06-19T09:33:59.733-0300", daysOpen: 24 },
  { key: "SUPMED-4331", summary: "QBank - Revis�es N�cleo - Perda de ofensiva", status: "Aguardando N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-06-19T10:26:38.308-0300", updated: "2026-07-08T16:44:52.591-0300", daysOpen: 24 },
  { key: "SUPMED-4332", summary: "QBank - Revis�es N�cleo - Perda de ofensiva", status: "Aguardando N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-06-19T11:11:44.430-0300", updated: "2026-07-08T16:44:18.878-0300", daysOpen: 24 },
  { key: "SUPMED-4333", summary: "Aluno USMLE - Cria��o de Usu�rio e Libera��o do Qbank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Maclaynne Brasilina da Silva Aguiar", created: "2026-06-19T14:29:45.374-0300", updated: "2026-06-21T09:25:04.035-0300", daysOpen: 24 },
  { key: "SUPMED-4337", summary: "QBank - Revis�es N�cleo - Perda de ofensiva", status: "Aguardando N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-06-19T18:43:46.020-0300", updated: "2026-07-08T16:43:17.901-0300", daysOpen: 23 },
  { key: "SUPMED-4338", summary: "Qbank � Diverg�ncia na contagem de acertos", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "wilton.junior", created: "2026-06-19T20:15:57.029-0300", updated: "2026-06-22T14:57:29.721-0300", daysOpen: 23 },
  { key: "SUPMED-4339", summary: "Aluna indiciou sumi�o de aulas e de seu cronograma.", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Paulo Cesar Nascimento Magalh�es", created: "2026-06-19T21:04:19.869-0300", updated: "2026-06-20T14:44:18.335-0300", daysOpen: 23 },
  { key: "SUPMED-4342", summary: "Erro na Cria��o de Usu�rio.", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Maclaynne Brasilina da Silva Aguiar", created: "2026-06-20T13:58:51.451-0300", updated: "2026-06-21T03:00:51.827-0300", daysOpen: 23 },
  { key: "SUPMED-4345", summary: "Apollo prime - Aulas n�o rodam no Celular", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "N�taly Fran�a", created: "2026-06-21T11:19:03.063-0300", updated: "2026-06-22T03:01:21.677-0300", daysOpen: 22 },
  { key: "SUPMED-4347", summary: "Aluna USMLE - Cria��o de Usu�rio e Libera��o do Qbank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "C�ntia Oliveira Rocha dos Santos", created: "2026-06-21T18:27:15.618-0300", updated: "2026-06-23T09:06:12.139-0300", daysOpen: 21 },
  { key: "SUPMED-4394", summary: "Sugest�o - Flashcards - Sugest�o de remo��o de baralho da revis�o", status: "Ticket Aberto", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-06-22T17:24:43.333-0300", updated: "2026-06-25T14:00:25.205-0300", daysOpen: 21 },
  { key: "SUPMED-4398", summary: "Aluno USMLE - Cria��o de Usu�rio e Libera��o do qBank", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Rafaela Cristina Silva Alves", created: "2026-06-22T18:34:51.604-0300", updated: "2026-06-24T16:26:05.264-0300", daysOpen: 20 },
  { key: "SUPMED-4401", summary: "Erro no 1� acesso/ aceite de termos", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Fernanda Kawabe", created: "2026-06-22T22:30:01.902-0300", updated: "2026-06-23T09:29:27.358-0300", daysOpen: 20 },
  { key: "SUPMED-4403", summary: "QBank - Revis�es N�cleo - Perda de ofensiva", status: "Aguardando N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-06-23T09:25:39.388-0300", updated: "2026-07-08T16:42:32.360-0300", daysOpen: 20 },
  { key: "SUPMED-4416", summary: "Falha na conclus�o do cadastro inicial e aceite dos Termos de Uso", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Rafaela Cristina Silva Alves", created: "2026-06-23T20:21:47.116-0300", updated: "2026-06-24T03:01:10.078-0300", daysOpen: 19 },
  { key: "SUPMED-4417", summary: "QBank - Revis�es N�cleo - Perda de ofensiva", status: "Aguardando N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "�", created: "2026-06-24T09:12:41.425-0300", updated: "2026-07-08T16:41:50.360-0300", daysOpen: 19 },
  { key: "SUPMED-4418", summary: "Aluno com 2 usu�rios, renovou o curso com e-mail diferente", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Uatana Assis", created: "2026-06-24T11:07:50.033-0300", updated: "2026-07-01T16:05:55.615-0300", daysOpen: 19 },
  { key: "SUPMED-4446", summary: "Sugest�o: Op��o de filtro na aba NOVO TESTE", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "Caroline Silva", created: "2026-06-26T11:19:31.815-0300", updated: "2026-06-27T03:02:25.413-0300", daysOpen: 17 },
  { key: "SUPMED-4449", summary: "Qbank - Simulado - Simulado 6 - 2026 PED encerrado antes do tempo previsto", status: "Feedback Aluno", issueType: "Ticket sendo tratado N3", assignee: "Raryane Cavalcante", created: "2026-06-26T14:33:57.290-0300", updated: "2026-07-08T18:15:37.359-0300", daysOpen: 17 },
  { key: "SUPMED-4557", summary: "Apollo prime - Falha ao resetar cronograma", status: "Em Desenvolvimento", issueType: "Ticket sendo tratado N3", assignee: "�", created: "2026-06-26T16:47:32.389-0300", updated: "2026-07-01T09:16:08.161-0300", daysOpen: 17 },
  { key: "SUPMED-4586", summary: "Checkout", status: "Aguardando Ajustes", issueType: "Checkout", assignee: "Franciele Ricosti", created: "2026-06-26T19:13:26.766-0300", updated: "2026-07-13T16:38:30.925-0300", daysOpen: 16 },
  { key: "SUPMED-4589", summary: "Qbank � Cron�metro de simulado com tempo incorreto", status: "Feedback Aluno", issueType: "Ticket sendo tratado N3", assignee: "Raryane Cavalcante", created: "2026-06-27T09:29:44.829-0300", updated: "2026-07-09T14:46:52.741-0300", daysOpen: 16 },
  { key: "SUPMED-4591", summary: "Simulado 6 encerrado", status: "Feedback Aluno", issueType: "Ticket sendo tratado N3", assignee: "Raryane Cavalcante", created: "2026-06-27T16:11:06.312-0300", updated: "2026-07-09T14:46:52.575-0300", daysOpen: 16 },
  { key: "SUPMED-4592", summary: "Quest�es de aulas da aluna n�o est�o sendo salvas.", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "lucas.rubian", created: "2026-06-27T17:49:03.697-0300", updated: "2026-06-29T11:02:07.169-0300", daysOpen: 16 },
  { key: "SUPMED-4593", summary: "Aulas travando na plataforma da aluna", status: "Em atendimento N1", issueType: "Enviar uma solicita��o ou incidente", assignee: "lucas.rubian", created: "2026-06-27T19:38:13.438-0300", updated: "2026-06-29T11:44:54.025-0300", daysOpen: 15 },
  { key: "SUPMED-4594", summary: "Qbank - Simulados - Sem Exibi��o", status: "Em desenvolvimento N3", issueType: "Enviar uma solicita��o ou incidente", assignee: "matheus ricardo", created: "2026-06-28T14:37:44.790-0300", updated: "2026-07-13T10:15:50.897-0300", daysOpen: 15 },
  { key: "SUPMED-4596", summary: "Apollo� Porcentagem de progresso das aulas n�o atualiza", status: "Em Desenvolvimento", issueType: "Ticket sendo tratado N3", assignee: "�", created: "2026-06-28T16:58:27.630-0300", updated: "2026-07-07T15:48:26.944-0300", daysOpen: 15 },
];

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function normalizeAssignee(value: string): string {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "-") return "�";
  return trimmed;
}

function formatDateLabel(isoDate: string): string {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}/${month}/${year}`;
}

function inferSystem(summary: string): string {
  const text = normalizeText(summary);
  if (text.includes("apollo")) return "Apollo (Aulas)";
  if (text.includes("dailycof")) return "DailyCof";
  if (text.includes("qbank") || text.includes("flashcards") || text.includes("simulado")) return "QBank";
  return "Outros";
}

function inferTopic(summary: string): string {
  const text = normalizeText(summary);
  if (text.includes("flashcard")) return "Flashcards";
  if (text.includes("simulado")) return "Simulado";
  if (text.includes("revis") || text.includes("streak") || text.includes("ofensiva")) return "Revis�es N�cleo";
  if (text.includes("nota")) return "Minhas Notas";
  if (text.includes("cronograma")) return "Cronograma";
  if (text.includes("estat")) return "Estat�sticas";
  if (text.includes("aula")) return "Aulas";
  return "Outros";
}

function inferQueue(status: string): string {
  const text = normalizeText(status);
  if (text.includes("feedback aluno") || text.includes("atendimento n1") || text.includes("ticket aberto")) return "Suporte ao Aluno";
  if (text.includes("validacao n2") || text.includes("producao n3")) return "Suporte Desenvolvimento";
  return "Em Desenvolvimento";
}

function isSuggestionTicket(summary: string): boolean {
  return normalizeText(summary).includes("sugest");
}

function getRisk(daysOpen: number): string {
  if (daysOpen >= 90) return "Risco cr�tico";
  if (daysOpen >= 61) return "Risco alto";
  if (daysOpen >= 31) return "Risco moderado";
  return "Aten��o inicial";
}

function getAction(ticket: TicketView): string {
  const status = normalizeText(ticket.status);
  if (status.includes("feedback aluno")) {
    return "N1: completar evid�ncias e encaminhar para N2/N3 quando reproduz�vel.";
  }
  if (status.includes("aguardando n3") || status.includes("aguardando desenvolvimento n3")) {
    return "N2/N3: definir respons�vel t�cnico e ETA atualizado.";
  }
  if (status.includes("em desenvolvimento")) {
    return "N3: manter progresso t�cnico e pr�ximo marco registrado no ticket.";
  }
  if (status.includes("producao")) {
    return "N2: acompanhar p�s-release e validar retorno com atendimento.";
  }
  return "Atualizar diagn�stico e pr�ximo passo objetivo para evitar aging passivo.";
}

function withinRange(ticket: TicketView, range: AgingRange): boolean {
  if (range === "all") return true;
  if (range === "15-30") return ticket.daysOpen >= 15 && ticket.daysOpen <= 30;
  if (range === "31-60") return ticket.daysOpen >= 31 && ticket.daysOpen <= 60;
  if (range === "61-90") return ticket.daysOpen >= 61 && ticket.daysOpen <= 90;
  return ticket.daysOpen >= 91;
}

function buildBuckets(rows: TicketView[]) {
  return rows.reduce(
    (acc, row) => {
      if (row.daysOpen >= 91) acc.b90 += 1;
      else if (row.daysOpen >= 61) acc.b61 += 1;
      else if (row.daysOpen >= 31) acc.b31 += 1;
      else if (row.daysOpen >= 15) acc.b15 += 1;
      return acc;
    },
    { b15: 0, b31: 0, b61: 0, b90: 0 },
  );
}

function toSummaryRows(rows: TicketView[], pick: (row: TicketView) => string): string[][] {
  const counts = new Map<string, number>();
  rows.forEach((row) => {
    const key = pick(row) || "�";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([label, amount]) => [label, String(amount)]);
}

function toClipboardTsv(headers: string[], rows: string[][]): string {
  return [headers.join("\t"), ...rows.map((row) => row.join("\t"))].join("\n");
}

function toCsv(headers: string[], rows: string[][]): string {
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
  return [headers.map(escape).join(","), ...rows.map((row) => row.map(escape).join(","))].join("\n");
}

const TICKETS: TicketView[] = RAW_TICKETS
  .filter((ticket) => !isSuggestionTicket(ticket.summary))
  .map((ticket) => ({
    ...ticket,
    assignee: normalizeAssignee(ticket.assignee),
    system: inferSystem(ticket.summary),
    topic: inferTopic(ticket.summary),
    queue: inferQueue(ticket.status),
    updatedLabel: formatDateLabel(ticket.updated),
  }));

const QUEUE_OPTIONS = [
  { value: "all", label: "Todas as filas" },
  { value: "Em Desenvolvimento", label: "Em Desenvolvimento" },
  { value: "Suporte Desenvolvimento", label: "Suporte Desenvolvimento" },
  { value: "Suporte ao Aluno", label: "Suporte ao Aluno" },
];

const SYSTEM_OPTIONS = [
  { value: "all", label: "Todos os sistemas" },
  ...Array.from(new Set(TICKETS.map((ticket) => ticket.system)))
    .sort((a, b) => a.localeCompare(b))
    .map((value) => ({ value, label: value })),
];

const STATUS_OPTIONS = [
  { value: "all", label: "Todos os status" },
  ...Array.from(new Set(TICKETS.map((ticket) => ticket.status)))
    .sort((a, b) => a.localeCompare(b))
    .map((value) => ({ value, label: value })),
];

const ASSIGNEE_OPTIONS = [
  { value: "all", label: "Todos os respons�veis" },
  ...Array.from(new Set(TICKETS.map((ticket) => ticket.assignee)))
    .sort((a, b) => a.localeCompare(b))
    .map((value) => ({ value, label: value })),
];

export default function AgingTicketsSemConcluir() {
  const dispatch = useCanvasAction();
  const [queue, setQueue] = useCanvasState<string>("aging-queue", "all");
  const [system, setSystem] = useCanvasState<string>("aging-system", "all");
  const [status, setStatus] = useCanvasState<string>("aging-status", "all");
  const [assignee, setAssignee] = useCanvasState<string>("aging-assignee", "all");
  const [range, setRange] = useCanvasState<AgingRange>("aging-range", "all");
  const [sortOrder, setSortOrder] = useCanvasState<SortOrder>("aging-sort", "oldest-first");
  const [section, setSection] = useCanvasState<Section>("aging-section", "summary");
  const [exportFeedback, setExportFeedback] = useCanvasState<string>("aging-export-feedback", "");

  const filtered = TICKETS
    .filter((ticket) => (queue === "all" ? true : ticket.queue === queue))
    .filter((ticket) => (system === "all" ? true : ticket.system === system))
    .filter((ticket) => (status === "all" ? true : ticket.status === status))
    .filter((ticket) => (assignee === "all" ? true : ticket.assignee === assignee))
    .filter((ticket) => withinRange(ticket, range))
    .sort((a, b) => (sortOrder === "oldest-first" ? b.daysOpen - a.daysOpen : a.daysOpen - b.daysOpen));

  const buckets = buildBuckets(filtered);
  const total = filtered.length;
  const above60 = buckets.b61 + buckets.b90;
  const critical = buckets.b90;
  const unassigned = filtered.filter((ticket) => ticket.assignee === "�").length;
  const average = total ? Math.round(filtered.reduce((sum, ticket) => sum + ticket.daysOpen, 0) / total) : 0;
  const oldest = filtered[0];

  const mainHeaders = [
    "Ticket",
    "Sistema",
    "Tipo",
    "Resumo",
    "Fila",
    "Status",
    "Respons�vel",
    "�ltima atualiza��o",
    "Dias em aberto",
    "Risco",
    "A��o recomendada",
  ];

  const tableRows = filtered.map((ticket) => [
    ticket.key,
    ticket.system,
    ticket.topic,
    ticket.summary,
    ticket.queue,
    ticket.status,
    ticket.assignee === "�" ? "Sem respons�vel" : ticket.assignee,
    ticket.updatedLabel,
    `${ticket.daysOpen}d`,
    getRisk(ticket.daysOpen),
    getAction(ticket),
  ]);

  const criticalRows = filtered
    .filter((ticket, index) => ticket.daysOpen >= 90 || ticket.assignee === "�" || index < 10 || normalizeText(ticket.status).includes("aguardando n3"))
    .map((ticket) => [
      ticket.key,
      ticket.system,
      ticket.topic,
      ticket.summary,
      ticket.queue,
      ticket.status,
      ticket.assignee === "�" ? "Sem respons�vel" : ticket.assignee,
      ticket.updatedLabel,
      `${ticket.daysOpen}d`,
      getRisk(ticket.daysOpen),
      getAction(ticket),
    ]);

  async function handleCopyTable(): Promise<void> {
    if (!navigator?.clipboard?.writeText) {
      setExportFeedback("N�o foi poss�vel copiar automaticamente neste ambiente.");
      return;
    }
    try {
      await navigator.clipboard.writeText(toClipboardTsv(mainHeaders, tableRows));
      setExportFeedback(`Tabela copiada (${tableRows.length} linhas).`);
    } catch {
      setExportFeedback("Falha ao copiar a tabela.");
    }
  }

  function handleExportCsv(): void {
    try {
      const content = "\uFEFF" + toCsv(mainHeaders, tableRows);
      const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `aging-tickets-sem-concluir-${GENERATED_AT.replace(/[/: ]/g, "-")}.csv`;
      anchor.click();
      URL.revokeObjectURL(url);
      setExportFeedback(`CSV exportado (${tableRows.length} linhas).`);
    } catch {
      setExportFeedback("Falha ao exportar CSV.");
    }
  }

  function clearFilters(): void {
    setQueue("all");
    setSystem("all");
    setStatus("all");
    setAssignee("all");
    setRange("all");
    setSortOrder("oldest-first");
    setExportFeedback("");
  }

  return (
    <Stack gap={20} style={{ padding: 24, maxWidth: 1500 }}>
      <Row align="center" justify="space-between">
        <Stack gap={4}>
          <H1>Aging Tickets Sem Concluir</H1>
          <Text size="small" tone="secondary">
            Report de tickets em aberto com aging (extra��o Jira via MCP, tratamento e filtros operacionais).
          </Text>
          <Text size="small" tone="secondary">{`Fonte: medcof-team.atlassian.net � JQL base aplicada � Gerado em ${GENERATED_AT}`}</Text>
        </Stack>
        <Button variant="secondary" onClick={() => dispatch({ type: "openFile", path: HEALTH_PANEL_PATH })}>
          Voltar ao Operational Governance Center
        </Button>
      </Row>

      <Row gap={8} align="center" wrap>
        <Text weight="medium">Faixa de aging:</Text>
        <Pill active={range === "15-30"} onClick={() => setRange("15-30")}>15�30 dias</Pill>
        <Pill active={range === "31-60"} onClick={() => setRange("31-60")}>31�60 dias</Pill>
        <Pill active={range === "61-90"} onClick={() => setRange("61-90")}>61�90 dias</Pill>
        <Pill active={range === "90+"} onClick={() => setRange("90+")}>90+ dias</Pill>
        <Button variant="ghost" onClick={() => setRange("all")}>Todos</Button>
      </Row>

      <Row gap={12} align="center" wrap>
        <Text weight="medium">Fila:</Text>
        <Select value={queue} onChange={setQueue} options={QUEUE_OPTIONS} style={{ width: 230 }} />
        <Text weight="medium">Sistema:</Text>
        <Select value={system} onChange={setSystem} options={SYSTEM_OPTIONS} style={{ width: 220 }} />
        <Text weight="medium">Status:</Text>
        <Select value={status} onChange={setStatus} options={STATUS_OPTIONS} style={{ width: 250 }} />
        <Text weight="medium">Respons�vel:</Text>
        <Select value={assignee} onChange={setAssignee} options={ASSIGNEE_OPTIONS} style={{ width: 260 }} />
        <Text weight="medium">Ordena��o:</Text>
        <Select
          value={sortOrder}
          onChange={(value) => setSortOrder(value as SortOrder)}
          options={[
            { value: "oldest-first", label: "Mais antigos primeiro" },
            { value: "recent-first", label: "Mais recentes primeiro" },
          ]}
          style={{ width: 220 }}
        />
        <Pill>{`${filtered.length} de ${TICKETS.length} tickets`}</Pill>
        <Button onClick={() => void handleCopyTable()}>Copiar tabela</Button>
        <Button variant="secondary" onClick={handleExportCsv}>Exportar CSV</Button>
        <Button variant="secondary" onClick={clearFilters}>Limpar filtros</Button>
      </Row>

      {exportFeedback ? (
        <Text size="small" tone="secondary">{exportFeedback}</Text>
      ) : null}

      <Divider />

      <Row gap={8} wrap>
        <Button variant={section === "summary" ? "primary" : "secondary"} onClick={() => setSection("summary")}>
          Resumo Executivo
        </Button>
        <Button variant={section === "critical" ? "primary" : "secondary"} onClick={() => setSection("critical")}>
          Tickets Cr�ticos
        </Button>
      </Row>

      {section === "summary" ? (
        <Stack gap={12}>
          <H2>Resumo Executivo do Backlog</H2>
          <Grid columns={6} gap={10}>
            <Stat value={String(total)} label="Tickets em aberto" />
            <Stat value={String(above60)} label="Aging acima de 60 dias" tone="warning" />
            <Stat value={String(critical)} label="Aging cr�tico (90+)" tone="danger" />
            <Stat value={String(unassigned)} label="Sem respons�vel" tone="warning" />
            <Stat value={`${average}d`} label="Aging m�dio" />
            <Stat value={oldest ? `${oldest.daysOpen}d` : "0d"} label={oldest ? oldest.key : "Mais antigo"} tone="danger" />
          </Grid>

          <Text size="small" tone="secondary">
            {`Risco geral: ${above60} de ${total} tickets (${total ? ((above60 / total) * 100).toFixed(1) : "0.0"}%) est�o acima de 60 dias.`}
          </Text>

          <BarChart
            categories={["15�30 dias", "31�60 dias", "61�90 dias", "90+ dias"]}
            series={[{ name: "Tickets por faixa de aging", data: [buckets.b15, buckets.b31, buckets.b61, buckets.b90] }]}
            height={220}
            showValues
          />
          <Text size="small" tone="secondary">
            Fonte: Jira SUPMED via MCP � Janela: tickets sem concluir � Faixa m�nima: 15 dias em aberto.
          </Text>

          <Grid columns={3} gap={10}>
            <Stack gap={6}>
              <Text weight="medium">Backlog por Fila</Text>
              <Table headers={["Fila", "Qtd"]} rows={toSummaryRows(filtered, (row) => row.queue)} />
            </Stack>
            <Stack gap={6}>
              <Text weight="medium">Backlog por Status</Text>
              <Table headers={["Status", "Qtd"]} rows={toSummaryRows(filtered, (row) => row.status)} />
            </Stack>
            <Stack gap={6}>
              <Text weight="medium">Backlog por Sistema</Text>
              <Table headers={["Sistema", "Qtd"]} rows={toSummaryRows(filtered, (row) => row.system)} />
            </Stack>
          </Grid>
        </Stack>
      ) : null}

      {section === "critical" ? (
        <Stack gap={8}>
          <H2>Tickets Cr�ticos para Prioriza��o</H2>
          <Text size="small" tone="secondary">
            Crit�rios: aging 90+, sem respons�vel, top 10 mais antigos, ou status aguardando N3.
          </Text>
          <Table headers={mainHeaders} rows={criticalRows} striped stickyHeader style={{ fontSize: 12 }} />
        </Stack>
      ) : null}

      <Divider />
      <Text size="small" tone="secondary">{`JQL base: ${JQL_BASE}`}</Text>
      <Text size="small" tone="secondary">{`Dataset final: ${TICKETS.length} tickets (sem sugest�es por resumo) � 15�30=${buckets.b15} � 31�60=${buckets.b31} � 61�90=${buckets.b61} � 90+=${buckets.b90}`}</Text>
    </Stack>
  );
}