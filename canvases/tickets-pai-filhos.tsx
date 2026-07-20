import { Button, Divider, Grid, H1, H2, Pill, Row, Select, Stack, Stat, Table, Text, useCanvasAction, useCanvasState, useHostTheme } from '@/lib/cursor-canvas';

const CHART_COLORS = [
  '#1F8A65E8', '#70B0D8E0', '#5A6CC0F0', '#F0A040E0',
  '#C06028E0', '#E8C030E0', '#C85898E0', '#F0A088E0',
  '#7B64B8F0', '#7DCAB0E0', '#8888A8E0', '#2A9A8AE0',
];

// "filhosConcluidos" considera APENAS subtasks com status em ("Concluído", "Concluido", "Cancelado").
// "Desenvolvido N3" tem statusCategory=done no Jira, mas operacionalmente ainda
// requer testes N3 + subida em produção + validação N2 antes de ser entregue.
const ISSUES = [
  { key: "SUPMED-4987", summary: "QBank - Simulado - Falha ao Clonar", status: "Teste em Produção", created: "14/07/2026", updated: "17/07/2026", filhos: 87, filhosConcluidos: 4, sistema: "QBank", tipoProblema: "Simulado" },
  { key: "SUPMED-5065", summary: "QBank - Revisões Núcleo - Ofensiva Divergente do Dashboard", status: "Aguardando N3", created: "15/07/2026", updated: "17/07/2026", filhos: 30, filhosConcluidos: 0, sistema: "QBank", tipoProblema: "Revisões Núcleo" },
  { key: "SUPMED-5006", summary: "QBank - Novo Teste - Dicas não aparecem", status: "Aguardando N3", created: "14/07/2026", updated: "17/07/2026", filhos: 17, filhosConcluidos: 0, sistema: "QBank", tipoProblema: "Novo Teste" },
  { key: "SUPMED-1330", summary: "QBank - Flashcards - Falha ao Resetar os Flashcards", status: "Em produção N3", created: "07/02/2026", updated: "08/07/2026", filhos: 13, filhosConcluidos: 2, sistema: "QBank", tipoProblema: "Flashcards" },
  { key: "SUPMED-2143", summary: "Intranet - Simulados - Ranking sem Exibição", status: "Aguardando desenvolvimento N3", created: "09/04/2026", updated: "08/07/2026", filhos: 9, filhosConcluidos: 3, sistema: "QBank", tipoProblema: "Simulados Presenciais" },
  { key: "SUPMED-1483", summary: "DeckLabs - Flashcards - Ofensivas Sem Contabilização", status: "Feedback Aluno", created: "19/02/2026", updated: "09/07/2026", filhos: 5, filhosConcluidos: 0, sistema: "QBank", tipoProblema: "Flashcards" },
  { key: "SUPMED-4594", summary: "Qbank - Simulados - Sem Exibição", status: "Em desenvolvimento N3", created: "28/06/2026", updated: "14/07/2026", filhos: 4, filhosConcluidos: 0, sistema: "QBank", tipoProblema: "Simulado" },
  { key: "SUPMED-4793", summary: "Hermes - Progresso - Divergência na Exibição das TM's em Relação ao Apollo", status: "Aguardando N3", created: "03/07/2026", updated: "05/07/2026", filhos: 2, filhosConcluidos: 0, sistema: "Hermes (Login|Dashboard)", tipoProblema: "Progresso" },
  { key: "SUPMED-4846", summary: "DeckLabs - Flashcards - Controle de Fonte Inativo em Cards Personalizados", status: "Em produção N3", created: "06/07/2026", updated: "13/07/2026", filhos: 2, filhosConcluidos: 0, sistema: "QBank", tipoProblema: "Flashcards" },
  { key: "SUPMED-2347", summary: "Hermes - DailyCof - Perda de Ofensiva das Revisões Núcleo Pelo DailyCof", status: "Aguardando desenvolvimento N3", created: "17/04/2026", updated: "08/07/2026", filhos: 1, filhosConcluidos: 0, sistema: "QBank", tipoProblema: "Revisões Núcleo" },
  { key: "SUPMED-4794", summary: "QBank - Meus Testes - Tarefas Mínimas e Bônus Concluídas Reaparecem como Pendentes", status: "Em análise N3", created: "03/07/2026", updated: "16/07/2026", filhos: 1, filhosConcluidos: 0, sistema: "Apollo (Aulas)", tipoProblema: "Cronograma" },
  { key: "SUPMED-4954", summary: "qBank - Falha no Resumo ao Finalizar Testes em Modo Foco", status: "Aguardando N3", created: "09/07/2026", updated: "15/07/2026", filhos: 1, filhosConcluidos: 0, sistema: "QBank", tipoProblema: "Novo Teste" },
  { key: "SUPMED-4979", summary: "Apollo - Progresso Divergente na Tela Home", status: "Em desenvolvimento N3", created: "13/07/2026", updated: "17/07/2026", filhos: 1, filhosConcluidos: 0, sistema: "Apollo (Aulas)", tipoProblema: "Progresso" },
  { key: "SUPMED-2146", summary: "Qbank prime - Divergência resultado Simulado Presencial", status: "Concluído", created: "09/04/2026", updated: "12/06/2026", filhos: 10, filhosConcluidos: 2, sistema: "QBank", tipoProblema: "Simulados Presenciais" },
  { key: "SUPMED-3602", summary: "Apollo - Porcentagem do cronograma zerada e não condizente com o progresso real da aluna", status: "Concluído", created: "02/06/2026", updated: "07/07/2026", filhos: 9, filhosConcluidos: 3, sistema: "Apollo (Aulas)", tipoProblema: "Cronograma" },
  { key: "SUPMED-3584", summary: "qBank -  Seta de atalho de seleção dos Flashcards (Médio) apontando para o lado errado ", status: "Concluído", created: "01/06/2026", updated: "07/07/2026", filhos: 4, filhosConcluidos: 1, sistema: "QBank", tipoProblema: "Flashcards" },
  { key: "SUPMED-2070", summary: "Qbank prime - Problema ao gerar novo teste ", status: "Concluído", created: "06/04/2026", updated: "15/05/2026", filhos: 3, filhosConcluidos: 0, sistema: "QBank", tipoProblema: "Filtro de questões" },
  { key: "SUPMED-4419", summary: "QBank - Simulados - Encerramento Prematuro", status: "Concluído", created: "24/06/2026", updated: "08/07/2026", filhos: 6, filhosConcluidos: 4, sistema: "QBank", tipoProblema: "Simulado" },
  { key: "SUPMED-2386", summary: "Qbank-  Aluna não está no ranking  do Simulado 3", status: "Concluído", created: "21/04/2026", updated: "17/06/2026", filhos: 4, filhosConcluidos: 2, sistema: "QBank", tipoProblema: "Simulado" },
  { key: "SUPMED-2040", summary: "Qbank – Erro na busca de provas comentadas", status: "Concluído", created: "02/04/2026", updated: "25/05/2026", filhos: 2, filhosConcluidos: 0, sistema: "QBank", tipoProblema: "Provas Comentadas" },
  { key: "SUPMED-1963", summary: "Qbank prime - Problema no Qbank personalizado", status: "Concluído", created: "30/03/2026", updated: "15/05/2026", filhos: 51, filhosConcluidos: 51, sistema: "QBank", tipoProblema: "Qbank Personalizado" },
  { key: "SUPMED-2042", summary: "Qbank – Falha ao favoritar questões no sistema", status: "Concluído", created: "02/04/2026", updated: "12/05/2026", filhos: 37, filhosConcluidos: 37, sistema: "QBank", tipoProblema: "QBank" },
  { key: "SUPMED-2321", summary: "Apollo prime - Problema no modo Sniper", status: "Concluído", created: "15/04/2026", updated: "30/06/2026", filhos: 32, filhosConcluidos: 32, sistema: "Apollo (Aulas)", tipoProblema: "Modo Sniper" },
  { key: "SUPMED-2077", summary: "Qbank prime - Perdeu a ofensiva das Revsões Núcleo", status: "Concluído", created: "06/04/2026", updated: "25/06/2026", filhos: 18, filhosConcluidos: 18, sistema: "QBank", tipoProblema: "Revisões Núcleo" },
  { key: "SUPMED-3509", summary: "Apollo - Aulas assistidas sendo desmarcadas e progresso não salvo", status: "Concluído", created: "29/05/2026", updated: "07/07/2026", filhos: 15, filhosConcluidos: 15, sistema: "Apollo (Aulas)", tipoProblema: "AQFM (Aulas - Questões - Flashcards - Material de Apoio" },
  { key: "SUPMED-3282", summary: "CofBot - Palavra \"Arterite\" não pesquisa", status: "Concluído", created: "22/05/2026", updated: "25/05/2026", filhos: 13, filhosConcluidos: 13, sistema: "DailyCof", tipoProblema: "DailyCof" },
  { key: "SUPMED-2088", summary: "Qbank prime - Não aparece Central de Questões", status: "Concluído", created: "07/04/2026", updated: "21/05/2026", filhos: 11, filhosConcluidos: 11, sistema: "QBank", tipoProblema: "Meus Testes" },
  { key: "SUPMED-2348", summary: "Qbank - Falha na paginação da tela \"Minhas Notas\"", status: "Concluído", created: "17/04/2026", updated: "23/06/2026", filhos: 5, filhosConcluidos: 5, sistema: "QBank", tipoProblema: "Outros" },
  { key: "SUPMED-2184", summary: "Qbank – Falha na atualização do ícone de marcar", status: "Concluído", created: "10/04/2026", updated: "12/05/2026", filhos: 4, filhosConcluidos: 4, sistema: "QBank", tipoProblema: "Novo Teste" },
  { key: "SUPMED-2342", summary: "Apollo – Erro na conclusão mínima de aulas", status: "Concluído", created: "16/04/2026", updated: "12/05/2026", filhos: 4, filhosConcluidos: 4, sistema: "Apollo (Aulas)", tipoProblema: "Progresso" },
  { key: "SUPMED-2200", summary: "Apollo - Modo Sniper - Divergência entre Home e Cronograma", status: "Concluído", created: "10/04/2026", updated: "13/07/2026", filhos: 3, filhosConcluidos: 3, sistema: "QBank", tipoProblema: "Novo Teste" },
  { key: "SUPMED-2326", summary: "Apollo - Vídeo Aula - Tela cheia Gera Recarregamento", status: "Concluído", created: "16/04/2026", updated: "13/07/2026", filhos: 3, filhosConcluidos: 3, sistema: "Apollo (Aulas)", tipoProblema: "Aulas" },
  { key: "SUPMED-2069", summary: "[Apollo] Desmacação de tarefas feitas ", status: "Concluído", created: "06/04/2026", updated: "02/06/2026", filhos: 2, filhosConcluidos: 2, sistema: "Apollo (Aulas)", tipoProblema: "AQFM (Aulas - Questões - Flashcards - Material de Apoio" },
  { key: "SUPMED-2334", summary: "QBank - Simulados - Erro na Exibição da Posição no Ranking Online", status: "Concluído", created: "16/04/2026", updated: "13/07/2026", filhos: 2, filhosConcluidos: 2, sistema: "QBank", tipoProblema: "Simulado" },
  { key: "SUPMED-2369", summary: "Qbank - Flashcards - Botão de \"Reportar\" ausente", status: "Concluído", created: "19/04/2026", updated: "06/06/2026", filhos: 2, filhosConcluidos: 2, sistema: "QBank", tipoProblema: "Flashcards" },
  { key: "SUPMED-2397", summary: "Apollo – Missões de Clínica Médica não marcam como concluídas", status: "Concluído", created: "22/04/2026", updated: "25/05/2026", filhos: 2, filhosConcluidos: 2, sistema: "Apollo (Aulas)", tipoProblema: "Outros" },
  { key: "SUPMED-2430", summary: "[Apollo]  [Internato] Ícones de progresso incorretos na missão", status: "Concluído", created: "24/04/2026", updated: "04/06/2026", filhos: 2, filhosConcluidos: 2, sistema: "Apollo (Aulas)", tipoProblema: "Cronograma de Missões" },
  { key: "SUPMED-2634", summary: "QBank – Inconsistência no Filtro de Questões Anuladas", status: "Concluído", created: "07/05/2026", updated: "30/06/2026", filhos: 2, filhosConcluidos: 2, sistema: "QBank", tipoProblema: "Filtro de questões" },
  { key: "SUPMED-3707", summary: "Apollo – Plataforma de Aulas não carrega (tela branca) para perfil da aluna", status: "Concluído", created: "09/06/2026", updated: "07/07/2026", filhos: 2, filhosConcluidos: 2, sistema: "Apollo (Aulas)", tipoProblema: "Outros" },
  { key: "SUPMED-1114", summary: "Dados não estão sendo salvos", status: "Concluído", created: "22/01/2026", updated: "01/06/2026", filhos: 1, filhosConcluidos: 1, sistema: "Apollo (Aulas)", tipoProblema: "AQFM (Aulas - Questões - Flashcards - Material de Apoio" },
  { key: "SUPMED-1312", summary: "Apollo- Aulas  não estão retornando para a minutagem pausada quando a  página é atualizada. ", status: "Concluído", created: "06/02/2026", updated: "20/05/2026", filhos: 1, filhosConcluidos: 1, sistema: "Apollo (Aulas)", tipoProblema: "Progresso" },
  { key: "SUPMED-1379", summary: "Apollo- Quando  a página é atualizada, precisa reconfigurar velocidade da aula", status: "Concluído", created: "11/02/2026", updated: "13/05/2026", filhos: 1, filhosConcluidos: 1, sistema: "Apollo (Aulas)", tipoProblema: "Aulas" },
  { key: "SUPMED-1695", summary: "[Apollo] Sem acesso no ipad", status: "Concluído", created: "10/03/2026", updated: "21/05/2026", filhos: 1, filhosConcluidos: 1, sistema: "Apollo (Aulas)", tipoProblema: "Outros" },
  { key: "SUPMED-1802", summary: "Apollo - Erro ao acessar tela cheia das aulas ", status: "Concluído", created: "16/03/2026", updated: "16/06/2026", filhos: 1, filhosConcluidos: 1, sistema: "Apollo (Aulas)", tipoProblema: "Aulas" },
  { key: "SUPMED-1855", summary: "Qbank prime - Erro ao duplicar teste", status: "Concluído", created: "20/03/2026", updated: "02/06/2026", filhos: 1, filhosConcluidos: 1, sistema: "QBank", tipoProblema: "Outros" },
  { key: "SUPMED-1905", summary: "Qbank prime - Perdeu a ofensiva das Revsões Núcleo", status: "Concluído", created: "23/03/2026", updated: "12/05/2026", filhos: 1, filhosConcluidos: 1, sistema: "QBank", tipoProblema: "Revisões Núcleo" },
  { key: "SUPMED-1912", summary: "Qbank prime - Informações divergentes no teste", status: "Concluído", created: "24/03/2026", updated: "21/05/2026", filhos: 1, filhosConcluidos: 1, sistema: "QBank", tipoProblema: "Meus Testes" },
  { key: "SUPMED-2028", summary: "Flashcards - Não consegue alterar a cor do texto", status: "Concluído", created: "02/04/2026", updated: "02/06/2026", filhos: 1, filhosConcluidos: 1, sistema: "QBank", tipoProblema: "Flashcards" },
  { key: "SUPMED-2129", summary: "Apollo - Aulas - Erro ao baixar material de apoio", status: "Concluído", created: "08/04/2026", updated: "02/06/2026", filhos: 1, filhosConcluidos: 1, sistema: "Apollo (Aulas)", tipoProblema: "Material de Apoio" },
  { key: "SUPMED-2217", summary: "Qbank – Questões já aparecem como respondidas", status: "Concluído", created: "11/04/2026", updated: "25/05/2026", filhos: 1, filhosConcluidos: 1, sistema: "QBank", tipoProblema: "Novo Teste" },
  { key: "SUPMED-2413", summary: "[Apollo] Não consegue Marcar aula Assistida", status: "Concluído", created: "23/04/2026", updated: "21/05/2026", filhos: 1, filhosConcluidos: 1, sistema: "Apollo (Aulas)", tipoProblema: "Aulas" },
  { key: "SUPMED-2455", summary: "QBank – Erro no link do gabarito Simulado 4", status: "Concluído", created: "27/04/2026", updated: "25/05/2026", filhos: 1, filhosConcluidos: 1, sistema: "QBank", tipoProblema: "Simulado" },
  { key: "SUPMED-2584", summary: "Apollo - DailyCof - AQFM ignora respostas vindas da DailyCof", status: "Concluído", created: "06/05/2026", updated: "28/05/2026", filhos: 1, filhosConcluidos: 1, sistema: "QBank", tipoProblema: "Outros" },
  { key: "SUPMED-2624", summary: "Qbank - Divergência nas estatísticas e Filtro de Busca", status: "Concluído", created: "07/05/2026", updated: "05/06/2026", filhos: 1, filhosConcluidos: 1, sistema: "QBank", tipoProblema: "Estatísticas" },
  { key: "SUPMED-2642", summary: "Flashcards - Não consegue adicionar Flashcard no baralho ", status: "Concluído", created: "08/05/2026", updated: "05/06/2026", filhos: 1, filhosConcluidos: 1, sistema: "Apollo (Aulas)", tipoProblema: "AQFM (Aulas - Questões - Flashcards - Material de Apoio" },
  { key: "SUPMED-2876", summary: "Qbank – Revisão Núcleo apresentando temas repetitivos", status: "Concluído", created: "14/05/2026", updated: "19/05/2026", filhos: 1, filhosConcluidos: 1, sistema: "QBank", tipoProblema: "Revisões Núcleo" },
  { key: "SUPMED-3605", summary: "qBank - Divergência na soma das porcentagens de respostas por alternativa", status: "Concluído", created: "02/06/2026", updated: "07/07/2026", filhos: 1, filhosConcluidos: 1, sistema: "QBank", tipoProblema: "Outros" },
];

function isIssueConcluida(status: string): boolean {
  return status === 'Concluído' || status === 'Concluido';
}

function sortByFilhosEmAberto<T extends { filhos: number; filhosConcluidos: number }>(issues: T[]): T[] {
  return [...issues].sort((a, b) => {
    const abertosA = a.filhos - a.filhosConcluidos;
    const abertosB = b.filhos - b.filhosConcluidos;
    if (abertosB !== abertosA) return abertosB - abertosA;
    return b.filhos - a.filhos;
  });
}

const ISSUES_ATIVOS = ISSUES.filter(i => !isIssueConcluida(i.status));
const ISSUES_CONCLUIDOS = sortByFilhosEmAberto(ISSUES.filter(i => isIssueConcluida(i.status)));
const CHILD_ISSUE_KEYS_BY_PARENT: Record<string, string[]> = {
  "SUPMED-1114": ["SUPMED-2399"],
  "SUPMED-1312": ["SUPMED-2254"],
  "SUPMED-1330": ["SUPMED-1630", "SUPMED-1873", "SUPMED-1930", "SUPMED-2082", "SUPMED-2302", "SUPMED-2485", "SUPMED-2575", "SUPMED-2643", "SUPMED-2691", "SUPMED-2830", "SUPMED-3590", "SUPMED-3650", "SUPMED-4283"],
  "SUPMED-1379": ["SUPMED-2403"],
  "SUPMED-1483": ["SUPMED-1006", "SUPMED-1387", "SUPMED-1399", "SUPMED-1426", "SUPMED-1433"],
  "SUPMED-1695": ["SUPMED-1762"],
  "SUPMED-1802": ["SUPMED-1798"],
  "SUPMED-1855": ["SUPMED-2387"],
  "SUPMED-1905": ["SUPMED-1965"],
  "SUPMED-1912": ["SUPMED-2537"],
  "SUPMED-1963": ["SUPMED-1934", "SUPMED-1964", "SUPMED-1966", "SUPMED-1968", "SUPMED-1982", "SUPMED-1987", "SUPMED-1989", "SUPMED-1996", "SUPMED-2085", "SUPMED-2094", "SUPMED-2098", "SUPMED-2106", "SUPMED-2180", "SUPMED-2195", "SUPMED-2197", "SUPMED-2202", "SUPMED-2219", "SUPMED-2220", "SUPMED-2222", "SUPMED-2228", "SUPMED-2229", "SUPMED-2231", "SUPMED-2240", "SUPMED-2245", "SUPMED-2248", "SUPMED-2252", "SUPMED-2255", "SUPMED-2256", "SUPMED-2258", "SUPMED-2259", "SUPMED-2267", "SUPMED-2268", "SUPMED-2269", "SUPMED-2270", "SUPMED-2274", "SUPMED-2275", "SUPMED-2276", "SUPMED-2277", "SUPMED-2278", "SUPMED-2279", "SUPMED-2281", "SUPMED-2282", "SUPMED-2284", "SUPMED-2285", "SUPMED-2286", "SUPMED-2287", "SUPMED-2289", "SUPMED-2293", "SUPMED-2294", "SUPMED-2295", "SUPMED-2878"],
  "SUPMED-2028": ["SUPMED-3344"],
  "SUPMED-2040": ["SUPMED-2068", "SUPMED-2449"],
  "SUPMED-2042": ["SUPMED-2037", "SUPMED-2044", "SUPMED-2045", "SUPMED-2046", "SUPMED-2050", "SUPMED-2052", "SUPMED-2053", "SUPMED-2054", "SUPMED-2055", "SUPMED-2057", "SUPMED-2058", "SUPMED-2059", "SUPMED-2063", "SUPMED-2064", "SUPMED-2065", "SUPMED-2081", "SUPMED-2084", "SUPMED-2090", "SUPMED-2110", "SUPMED-2128", "SUPMED-2135", "SUPMED-2150", "SUPMED-2151", "SUPMED-2163", "SUPMED-2189", "SUPMED-2190", "SUPMED-2191", "SUPMED-2201", "SUPMED-2204", "SUPMED-2206", "SUPMED-2208", "SUPMED-2262", "SUPMED-2283", "SUPMED-2296", "SUPMED-2303", "SUPMED-2304", "SUPMED-2314"],
  "SUPMED-2069": ["SUPMED-1939", "SUPMED-2372"],
  "SUPMED-2070": ["SUPMED-2203", "SUPMED-2223", "SUPMED-2535"],
  "SUPMED-2077": ["SUPMED-2086", "SUPMED-2092", "SUPMED-2311", "SUPMED-2340", "SUPMED-2346", "SUPMED-2446", "SUPMED-2452", "SUPMED-2456", "SUPMED-2499", "SUPMED-2524", "SUPMED-2536", "SUPMED-2580", "SUPMED-2620", "SUPMED-2623", "SUPMED-2662", "SUPMED-2771", "SUPMED-2828", "SUPMED-2880"],
  "SUPMED-2088": ["SUPMED-2095", "SUPMED-2118", "SUPMED-2149", "SUPMED-2161", "SUPMED-2177", "SUPMED-2188", "SUPMED-2307", "SUPMED-2315", "SUPMED-2378", "SUPMED-2408", "SUPMED-2471"],
  "SUPMED-2129": ["SUPMED-2316"],
  "SUPMED-2143": ["SUPMED-2148", "SUPMED-2194", "SUPMED-2218", "SUPMED-2221", "SUPMED-2236", "SUPMED-2260", "SUPMED-2272", "SUPMED-2273", "SUPMED-2867"],
  "SUPMED-2146": ["SUPMED-2144", "SUPMED-2157", "SUPMED-2162", "SUPMED-2164", "SUPMED-2166", "SUPMED-2174", "SUPMED-2199", "SUPMED-2224", "SUPMED-2313", "SUPMED-2768"],
  "SUPMED-2184": ["SUPMED-2237", "SUPMED-2238", "SUPMED-2298", "SUPMED-2308"],
  "SUPMED-2200": ["SUPMED-2029", "SUPMED-2280", "SUPMED-3320"],
  "SUPMED-2217": ["SUPMED-2165"],
  "SUPMED-2321": ["SUPMED-2026", "SUPMED-2033", "SUPMED-2038", "SUPMED-2041", "SUPMED-2048", "SUPMED-2051", "SUPMED-2078", "SUPMED-2119", "SUPMED-2145", "SUPMED-2170", "SUPMED-2175", "SUPMED-2196", "SUPMED-2214", "SUPMED-2226", "SUPMED-2230", "SUPMED-2243", "SUPMED-2257", "SUPMED-2265", "SUPMED-2291", "SUPMED-2309", "SUPMED-2310", "SUPMED-2371", "SUPMED-2373", "SUPMED-2392", "SUPMED-2393", "SUPMED-2400", "SUPMED-2426", "SUPMED-2431", "SUPMED-2435", "SUPMED-2442", "SUPMED-2445", "SUPMED-2457"],
  "SUPMED-2326": ["SUPMED-2366", "SUPMED-2391", "SUPMED-2436"],
  "SUPMED-2334": ["SUPMED-1611", "SUPMED-2552"],
  "SUPMED-2342": ["SUPMED-1883", "SUPMED-2300", "SUPMED-2443", "SUPMED-2657"],
  "SUPMED-2347": ["SUPMED-2388"],
  "SUPMED-2348": ["SUPMED-2491", "SUPMED-2554", "SUPMED-2859", "SUPMED-2872", "SUPMED-3679"],
  "SUPMED-2369": ["SUPMED-2412", "SUPMED-2416"],
  "SUPMED-2386": ["SUPMED-2490", "SUPMED-2495", "SUPMED-2501", "SUPMED-2679"],
  "SUPMED-2397": ["SUPMED-2415", "SUPMED-2483"],
  "SUPMED-2413": ["SUPMED-2494"],
  "SUPMED-2430": ["SUPMED-2577", "SUPMED-3155"],
  "SUPMED-2455": ["SUPMED-2469"],
  "SUPMED-2584": ["SUPMED-3341"],
  "SUPMED-2624": ["SUPMED-2871"],
  "SUPMED-2634": ["SUPMED-3317", "SUPMED-3712"],
  "SUPMED-2642": ["SUPMED-3345"],
  "SUPMED-2876": ["SUPMED-1920"],
  "SUPMED-3282": ["SUPMED-3285", "SUPMED-3286", "SUPMED-3287", "SUPMED-3288", "SUPMED-3289", "SUPMED-3290", "SUPMED-3291", "SUPMED-3292", "SUPMED-3293", "SUPMED-3295", "SUPMED-3296", "SUPMED-3298", "SUPMED-3301"],
  "SUPMED-3509": ["SUPMED-3576", "SUPMED-3577", "SUPMED-3589", "SUPMED-3604", "SUPMED-3644", "SUPMED-3651", "SUPMED-3668", "SUPMED-3681", "SUPMED-3687", "SUPMED-3738", "SUPMED-3742", "SUPMED-3745", "SUPMED-3752", "SUPMED-4284", "SUPMED-4319"],
  "SUPMED-3584": ["SUPMED-3613", "SUPMED-4272", "SUPMED-4659", "SUPMED-4798"],
  "SUPMED-3602": ["SUPMED-3674", "SUPMED-3751", "SUPMED-3761", "SUPMED-4072", "SUPMED-4309", "SUPMED-4311", "SUPMED-4312", "SUPMED-4313", "SUPMED-4596"],
  "SUPMED-3605": ["SUPMED-3669"],
  "SUPMED-3707": ["SUPMED-3713", "SUPMED-3714"],
  "SUPMED-4419": ["SUPMED-4422", "SUPMED-4438", "SUPMED-4449", "SUPMED-4589", "SUPMED-4591", "SUPMED-4601"],
  "SUPMED-4594": ["SUPMED-4597", "SUPMED-4598", "SUPMED-4604", "SUPMED-4605"],
  "SUPMED-4793": ["SUPMED-4808", "SUPMED-4819"],
  "SUPMED-4794": ["SUPMED-4786"],
  "SUPMED-4846": ["SUPMED-4955", "SUPMED-4956"],
  "SUPMED-4954": ["SUPMED-5145"],
  "SUPMED-4979": ["SUPMED-5021"],
  "SUPMED-4987": ["SUPMED-4990", "SUPMED-4992", "SUPMED-4993", "SUPMED-4994", "SUPMED-4995", "SUPMED-4996", "SUPMED-4997", "SUPMED-4998", "SUPMED-4999", "SUPMED-5001", "SUPMED-5002", "SUPMED-5003", "SUPMED-5004", "SUPMED-5009", "SUPMED-5013", "SUPMED-5014", "SUPMED-5015", "SUPMED-5016", "SUPMED-5018", "SUPMED-5019", "SUPMED-5024", "SUPMED-5031", "SUPMED-5033", "SUPMED-5039", "SUPMED-5044", "SUPMED-5047", "SUPMED-5050", "SUPMED-5053", "SUPMED-5055", "SUPMED-5056", "SUPMED-5057", "SUPMED-5058", "SUPMED-5059", "SUPMED-5061", "SUPMED-5064", "SUPMED-5078", "SUPMED-5079", "SUPMED-5081", "SUPMED-5082", "SUPMED-5083", "SUPMED-5084", "SUPMED-5085", "SUPMED-5086", "SUPMED-5087", "SUPMED-5090", "SUPMED-5095", "SUPMED-5098", "SUPMED-5100", "SUPMED-5102", "SUPMED-5104", "SUPMED-5106", "SUPMED-5108", "SUPMED-5110", "SUPMED-5112", "SUPMED-5113", "SUPMED-5114", "SUPMED-5116", "SUPMED-5118", "SUPMED-5119", "SUPMED-5120", "SUPMED-5121", "SUPMED-5122", "SUPMED-5123", "SUPMED-5124", "SUPMED-5127", "SUPMED-5128", "SUPMED-5129", "SUPMED-5130", "SUPMED-5132", "SUPMED-5133", "SUPMED-5136", "SUPMED-5140", "SUPMED-5142", "SUPMED-5144", "SUPMED-5148", "SUPMED-5149", "SUPMED-5151", "SUPMED-5152", "SUPMED-5153", "SUPMED-5156", "SUPMED-5158", "SUPMED-5159", "SUPMED-5160", "SUPMED-5162", "SUPMED-5163", "SUPMED-5165", "SUPMED-5168"],
  "SUPMED-5006": ["SUPMED-5005", "SUPMED-5011", "SUPMED-5017", "SUPMED-5023", "SUPMED-5049", "SUPMED-5052", "SUPMED-5075", "SUPMED-5080", "SUPMED-5089", "SUPMED-5099", "SUPMED-5103", "SUPMED-5111", "SUPMED-5146", "SUPMED-5154", "SUPMED-5157", "SUPMED-5161", "SUPMED-5172"],
  "SUPMED-5065": ["SUPMED-4985", "SUPMED-5000", "SUPMED-5020", "SUPMED-5022", "SUPMED-5034", "SUPMED-5043", "SUPMED-5045", "SUPMED-5046", "SUPMED-5048", "SUPMED-5051", "SUPMED-5054", "SUPMED-5060", "SUPMED-5063", "SUPMED-5069", "SUPMED-5074", "SUPMED-5076", "SUPMED-5077", "SUPMED-5093", "SUPMED-5105", "SUPMED-5107", "SUPMED-5109", "SUPMED-5117", "SUPMED-5125", "SUPMED-5126", "SUPMED-5134", "SUPMED-5135", "SUPMED-5137", "SUPMED-5141", "SUPMED-5143", "SUPMED-5164"],
};

const totalPaisAtivos = ISSUES_ATIVOS.length;
const totalPaisConcluidos = ISSUES_CONCLUIDOS.length;
const totalFilhosAtivos = ISSUES_ATIVOS.reduce((s, i) => s + i.filhos, 0);
const totalFilhosAtivosConcluidos = ISSUES_ATIVOS.reduce((s, i) => s + i.filhosConcluidos, 0);
const totalFilhosAtivosEmAberto = totalFilhosAtivos - totalFilhosAtivosConcluidos;
const mediaFilhosAtivos = (totalFilhosAtivos / totalPaisAtivos).toFixed(1);

const grupoMap: Record<string, number> = {};
for (const issue of ISSUES_ATIVOS) {
  const key = `${issue.sistema} — ${issue.tipoProblema}`;
  grupoMap[key] = (grupoMap[key] ?? 0) + issue.filhos;
}
const gruposOrdenados = Object.entries(grupoMap).sort((a, b) => b[1] - a[1]);

function statusTone(status: string): 'success' | 'warning' | 'danger' | 'neutral' {
  if (status.includes('produção') || status.includes('Desenvolvido')) return 'success';
  if (status.includes('Feedback') || status.includes('Retorno') || status.includes('atendimento')) return 'warning';
  if (status.includes('Subida') || status.includes('aprovação')) return 'warning';
  return 'neutral';
}

const sistemaOptions = [
  { value: 'all', label: 'Todos os sistemas' },
  ...Array.from(new Set(ISSUES_ATIVOS.map(i => i.sistema))).sort().map(s => ({ value: s, label: s })),
];

const statusOptions = [
  { value: 'all', label: 'Todos os status ativos' },
  ...Array.from(new Set(ISSUES_ATIVOS.map(i => i.status))).sort().map(s => ({ value: s, label: s })),
];

const tipoOptions = [
  { value: 'all', label: 'Todos os tipos' },
  ...Array.from(new Set(ISSUES_ATIVOS.map(i => i.tipoProblema))).sort().map(t => ({ value: t, label: t })),
];

const BAR_AREA_HEIGHT = 160;
const BAR_WIDTH = 60;
const REPORT_DATE = '17/07/2026';
const ACTIVE_TABLE_HEADERS = ['Ticket', 'Sistema', 'Tipo de Problema', 'Status', 'Nº Filhos', 'Criado em', 'Atualizado em', 'Dias em aberto'];
const COMPLETED_TABLE_HEADERS = ['Ticket', 'Status', 'Criado em', 'Atualizado em', 'Nº Filhos', 'Nº Filhos Concluído', 'Sistema', 'Tipo de Problema', 'Tempo até conclusão (estimado)'];
const HEALTH_PANEL_PATH = 'C:/Users/BernardLadeia/.cursor/projects/d-Medcof-HealthPanel-Project/canvases/operational-governance-center.canvas.tsx';

function toClipboardTsv(headers: string[], rows: string[][]): string {
  const lines = [
    headers.join('\t'),
    ...rows.map(row => row.map(cell => String(cell)).join('\t')),
  ];
  return lines.join('\n');
}

function toTableRows(issues: typeof ISSUES): string[][] {
  return issues.map(i => [
    i.key,
    i.sistema,
    i.tipoProblema,
    i.status,
    String(i.filhos),
    i.created,
    i.updated,
    getElapsedDaysLabel(i.created, REPORT_DATE),
  ]);
}

function renderParentKey(
  issueKey: string,
  selectedParentKey: string,
  onSelectParent: (key: string) => void,
) {
  if (!CHILD_ISSUE_KEYS_BY_PARENT[issueKey]) return issueKey;

  return (
    <Pill
      active={selectedParentKey === issueKey}
      onClick={() => onSelectParent(selectedParentKey === issueKey ? '' : issueKey)}
      title="Clique para ver os tickets filhos"
    >
      {issueKey}
    </Pill>
  );
}

function toInteractiveTableRows(
  issues: typeof ISSUES,
  selectedParentKey: string,
  onSelectParent: (key: string) => void,
) {
  return issues.map(i => [
    renderParentKey(i.key, selectedParentKey, onSelectParent),
    i.sistema,
    i.tipoProblema,
    i.status,
    String(i.filhos),
    i.created,
    i.updated,
    getElapsedDaysLabel(i.created, REPORT_DATE),
  ]);
}

/** Converte datas no formato dd/mm/yyyy para Date local. */
function parseBrazilianDate(date: string): Date | null {
  const [day, month, year] = date.split('/').map(Number);
  if (!day || !month || !year) return null;
  return new Date(year, month - 1, day);
}

/** Calcula o tempo estimado aberto usando updated como proxy de conclusão. */
function getEstimatedTimeToClose(created: string, updated: string): string {
  return getElapsedDaysLabel(created, updated);
}

function getElapsedDaysLabel(start: string, end: string): string {
  const startAt = parseBrazilianDate(start);
  const endAt = parseBrazilianDate(end);
  if (!startAt || !endAt) return '-';

  const elapsedDays = Math.max(0, Math.round((endAt.getTime() - startAt.getTime()) / 86400000));
  if (elapsedDays === 0) return 'menos de 1 dia';
  if (elapsedDays === 1) return '1 dia';
  return `${elapsedDays} dias`;
}

function toCompletedTableRows(
  issues: typeof ISSUES,
  selectedParentKey: string,
  onSelectParent: (key: string) => void,
) {
  return issues.map(i => [
    renderParentKey(i.key, selectedParentKey, onSelectParent),
    i.status,
    i.created,
    i.updated,
    String(i.filhos),
    `${i.filhosConcluidos} / ${i.filhos}`,
    i.sistema,
    i.tipoProblema,
    getEstimatedTimeToClose(i.created, i.updated),
  ]);
}

function CategoryBarChart({
  data,
  selectedCategory,
  onSelect,
}: {
  data: [string, number][];
  selectedCategory: string;
  onSelect: (cat: string) => void;
}) {
  const theme = useHostTheme();
  const maxVal = Math.max(...data.map(([, v]) => v));
  const hasSelection = selectedCategory !== '';

  return (
    <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, minWidth: 'max-content' }}>
        {data.map(([cat, val], idx) => {
          const isSelected = selectedCategory === cat;
          const barH = Math.max(6, Math.round((val / maxVal) * BAR_AREA_HEIGHT));
          const [sistema, tipo] = cat.split(' — ');
          const color = CHART_COLORS[idx % CHART_COLORS.length];

          return (
            <div
              key={cat}
              onClick={() => onSelect(isSelected ? '' : cat)}
              title={`${cat}: ${val} filhos`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                width: BAR_WIDTH,
                userSelect: 'none',
                opacity: hasSelection && !isSelected ? 0.3 : 1,
                transition: 'opacity 0.15s',
              }}
            >
              <span style={{
                fontSize: 11,
                color: isSelected ? color : theme.text.secondary,
                fontWeight: isSelected ? 590 : 400,
                marginBottom: 4,
              }}>
                {val}
              </span>

              <div style={{
                width: '100%',
                height: barH,
                background: color,
                borderRadius: '3px 3px 0 0',
              }} />

              <div style={{
                width: '100%',
                height: 1,
                background: theme.stroke.secondary,
              }} />

              <div style={{
                width: BAR_WIDTH,
                paddingTop: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}>
                <span style={{
                  fontSize: 10,
                  fontWeight: isSelected ? 590 : 400,
                  color: isSelected ? color : theme.text.primary,
                  textAlign: 'center',
                  lineHeight: '13px',
                  wordBreak: 'break-word',
                }}>
                  {tipo}
                </span>
                <span style={{
                  fontSize: 9,
                  color: theme.text.tertiary,
                  textAlign: 'center',
                  lineHeight: '12px',
                }}>
                  {sistema}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TicketsPaiFilhos() {
  const dispatch = useCanvasAction();
  const [filtroSistema, setFiltroSistema] = useCanvasState('filtroSistema', 'all');
  const [filtroStatus, setFiltroStatus] = useCanvasState('filtroStatus', 'all');
  const [filtroTipo, setFiltroTipo] = useCanvasState('filtroTipo', 'all');
  const [filtroCategoria, setFiltroCategoria] = useCanvasState('filtroCategoria', '');
  const [copyFeedback, setCopyFeedback] = useCanvasState('copyFeedback', '');
  const [showCompletedTickets, setShowCompletedTickets] = useCanvasState('showCompletedTickets', false);
  const [selectedParent, setSelectedParent] = useCanvasState('selectedParent', '');

  const theme = useHostTheme();

  const issuesFiltrados = sortByFilhosEmAberto(ISSUES_ATIVOS
    .filter(i => filtroSistema === 'all' || i.sistema === filtroSistema)
    .filter(i => filtroStatus === 'all' || i.status === filtroStatus)
    .filter(i => filtroTipo === 'all' || i.tipoProblema === filtroTipo)
    .filter(i => !filtroCategoria || `${i.sistema} — ${i.tipoProblema}` === filtroCategoria));

  const categoriaAtiva = filtroCategoria
    ? gruposOrdenados.find(([k]) => k === filtroCategoria)
    : null;

  const tableRows = toTableRows(issuesFiltrados);
  const interactiveTableRows = toInteractiveTableRows(issuesFiltrados, selectedParent, setSelectedParent);
  const completedTableRows = toCompletedTableRows(ISSUES_CONCLUIDOS, selectedParent, setSelectedParent);
  const selectedActiveIssue = selectedParent
    ? issuesFiltrados.find(i => i.key === selectedParent)
    : null;
  const selectedCompletedIssue = selectedParent
    ? ISSUES_CONCLUIDOS.find(i => i.key === selectedParent)
    : null;
  const selectedChildKeys = selectedParent
    ? CHILD_ISSUE_KEYS_BY_PARENT[selectedParent] ?? []
    : [];

  async function handleCopyTable() {
    if (!navigator?.clipboard?.writeText) {
      setCopyFeedback('Não foi possível copiar automaticamente neste ambiente.');
      return;
    }
    try {
      const tsv = toClipboardTsv(ACTIVE_TABLE_HEADERS, tableRows);
      await navigator.clipboard.writeText(tsv);
      setCopyFeedback(`Tabela copiada (${tableRows.length} linhas).`);
    } catch {
      setCopyFeedback('Falha ao copiar a tabela para a área de transferência.');
    }
  }

  async function handleCopyChildTickets(parentKey: string, childKeys: string[]) {
    if (!navigator?.clipboard?.writeText) {
      setCopyFeedback('Não foi possível copiar automaticamente neste ambiente.');
      return;
    }
    try {
      await navigator.clipboard.writeText([parentKey, ...childKeys].join('\n'));
      setCopyFeedback(`Ticket pai e filhos de ${parentKey} copiados (${childKeys.length + 1}).`);
    } catch {
      setCopyFeedback('Falha ao copiar os tickets filhos para a área de transferência.');
    }
  }

  return (
    <Stack gap={20} style={{ padding: '20px 24px', maxWidth: 1100 }}>
      <Text tone="secondary" size="small">Gerado em 17/07/2026 10:26</Text>
      <Row gap={16} align="center">
        <Stack gap={2} style={{ flex: 1 }}>
          <H1>Major Incident Analysis</H1>
          <Text tone="secondary" size="small">Projeto SUPMED · Tickets pai agrupados pelo parent dos filhos · Gerado em 17/07/2026 10:26</Text>
        </Stack>
        <Button
          variant="secondary"
          onClick={() => dispatch({ type: 'openFile', path: HEALTH_PANEL_PATH })}
        >
          Voltar ao Operational Governance Center
        </Button>
      </Row>

      <Grid columns={4} gap={12}>
        <Stat value={String(totalPaisAtivos)} label="Tickets Pai Ativos" />
        <Stat value={String(totalFilhosAtivos)} label="Filhos de Pais Ativos" />
        <Stat value={String(totalFilhosAtivosEmAberto)} label="Filhos em Aberto" tone="warning" />
        <Stat value={String(totalPaisConcluidos)} label="Tickets Pai Concluídos" tone="success" />
      </Grid>
      <Text tone="secondary" size="small">Média de {mediaFilhosAtivos} filhos por pai ativo · Visão principal sem status Concluído/Concluido · Fonte: Jira JQL project = SUPMED AND parent is not EMPTY · Snapshot 17/07/2026 10:26</Text>

      <Divider />

      <Stack gap={10}>
        <Stack gap={2}>
          <H2>Maior Ofensor por Categoria</H2>
          <Text tone="secondary" size="small">
            Volume de filhos de tickets ativos por Sistema — Tipo de Problema · Clique em uma coluna para filtrar a tabela abaixo
          </Text>
        </Stack>
        <CategoryBarChart
          data={gruposOrdenados}
          selectedCategory={filtroCategoria}
          onSelect={setFiltroCategoria}
        />
      </Stack>

      <Divider />

      <Stack gap={10}>
        <Row gap={10} align="center">
          <Stack gap={2}>
            <H2>Tabela Detalhada de Tickets Ativos</H2>
            {categoriaAtiva && (
              <Row gap={6} align="center">
                <Pill tone="info">{categoriaAtiva[0]}</Pill>
                <Pill>{categoriaAtiva[1]} filhos</Pill>
              </Row>
            )}
          </Stack>
          <div style={{ flex: 1 }} />
          {filtroCategoria && (
            <Button onClick={() => setFiltroCategoria('')}>
              Limpar categoria
            </Button>
          )}
          <Select
            value={filtroStatus}
            onChange={setFiltroStatus}
            options={statusOptions}
            style={{ minWidth: 220 }}
          />
          <Select
            value={filtroSistema}
            onChange={setFiltroSistema}
            options={sistemaOptions}
            style={{ minWidth: 180 }}
          />
          <Select
            value={filtroTipo}
            onChange={setFiltroTipo}
            options={tipoOptions}
            style={{ minWidth: 190 }}
          />
          <Button onClick={() => void handleCopyTable()}>
            Copiar tabela
          </Button>
        </Row>
        {copyFeedback ? (
          <Text tone="secondary" size="small">{copyFeedback}</Text>
        ) : null}
        <Text tone="secondary" size="small">Clique no código do ticket para ver os filhos abaixo.</Text>
        {issuesFiltrados.length === 0 ? (
          <Text tone="secondary">Nenhum ticket ativo encontrado para os filtros selecionados.</Text>
        ) : (
          <Table
            headers={ACTIVE_TABLE_HEADERS}
            rows={interactiveTableRows}
            rowTone={issuesFiltrados.map(i => {
              const t = statusTone(i.status);
              return t === 'neutral' ? undefined : t;
            })}
          />
        )}
        {selectedActiveIssue && selectedChildKeys.length > 0 && (
          <Stack gap={8} style={{ padding: 12, border: `1px solid ${theme.stroke.secondary}`, borderRadius: 8 }}>
            <Row gap={8} align="center">
              <Text weight="semibold">{selectedActiveIssue.key}</Text>
              <Text tone="secondary" size="small">{selectedChildKeys.length} tickets filhos</Text>
              <div style={{ flex: 1 }} />
              <Button onClick={() => void handleCopyChildTickets(selectedActiveIssue.key, selectedChildKeys)}>
                Copiar filhos
              </Button>
            </Row>
            <Row gap={6} wrap>
              {selectedChildKeys.map(childKey => (
                <span key={childKey}>
                  <Pill size="sm">{childKey}</Pill>
                </span>
              ))}
            </Row>
          </Stack>
        )}
        {issuesFiltrados.length > 0 && (
          <Text tone="secondary" size="small">
            {issuesFiltrados.length} ticket{issuesFiltrados.length !== 1 ? 's' : ''} · {issuesFiltrados.reduce((s, i) => s + i.filhos, 0)} filhos vinculados · {issuesFiltrados.reduce((s, i) => s + (i.filhos - i.filhosConcluidos), 0)} em aberto · {issuesFiltrados.reduce((s, i) => s + i.filhosConcluidos, 0)} concluídos
          </Text>
        )}
      </Stack>

      <Divider />

      <Stack gap={10}>
        <Row gap={10} align="center">
          <Stack gap={2}>
            <H2>Tickets Concluídos</H2>
            <Text tone="secondary" size="small">
              Status Concluído/Concluido separados da visão operacional ativa
            </Text>
          </Stack>
          <div style={{ flex: 1 }} />
          <Button onClick={() => setShowCompletedTickets(!showCompletedTickets)}>
            {showCompletedTickets ? 'Recolher tickets concluídos' : 'Expandir tickets concluídos'}
          </Button>
        </Row>
        <Grid columns={3} gap={12}>
          <Stat value={String(totalPaisConcluidos)} label="Pais Concluídos" tone="success" />
          <Stat value={String(ISSUES_CONCLUIDOS.reduce((s, i) => s + i.filhos, 0))} label="Filhos Vinculados" />
          <Stat value={String(ISSUES_CONCLUIDOS.reduce((s, i) => s + i.filhosConcluidos, 0))} label="Filhos Concluídos" tone="success" />
        </Grid>
        {showCompletedTickets && (
          <Stack gap={10}>
            <Table
              headers={COMPLETED_TABLE_HEADERS}
              rows={completedTableRows}
              rowTone={ISSUES_CONCLUIDOS.map(() => 'success')}
            />
            {selectedCompletedIssue && selectedChildKeys.length > 0 && (
              <Stack gap={8} style={{ padding: 12, border: `1px solid ${theme.stroke.secondary}`, borderRadius: 8 }}>
                <Row gap={8} align="center">
                  <Text weight="semibold">{selectedCompletedIssue.key}</Text>
                  <Text tone="secondary" size="small">{selectedChildKeys.length} tickets filhos</Text>
                  <div style={{ flex: 1 }} />
                  <Button onClick={() => void handleCopyChildTickets(selectedCompletedIssue.key, selectedChildKeys)}>
                    Copiar filhos
                  </Button>
                </Row>
                <Row gap={6} wrap>
                  {selectedChildKeys.map(childKey => (
                    <span key={childKey}>
                      <Pill size="sm">{childKey}</Pill>
                    </span>
                  ))}
                </Row>
              </Stack>
            )}
          </Stack>
        )}
        <Text tone="secondary" size="small">
          {ISSUES_CONCLUIDOS.length} ticket{ISSUES_CONCLUIDOS.length !== 1 ? 's' : ''} concluído{ISSUES_CONCLUIDOS.length !== 1 ? 's' : ''} fora dos filtros da tabela principal · tempo estimado com base em Criado em até Atualizado em{showCompletedTickets ? '.' : ' · use o botão para ver a lista completa.'}
        </Text>
      </Stack>
    </Stack>
  );
}
