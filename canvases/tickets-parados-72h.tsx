import {
  BarChart,
  Button,
  Divider,
  Grid,
  H1,
  H2,
  PieChart,
  Pill,
  Row,
  Select,
  Spacer,
  Stack,
  Stat,
  Table,
  Text,
  useCanvasAction,
  useCanvasState,
} from "cursor/canvas";

// [key, summary, status, fluxo, assignee, horas, sistema, tipoProblema, fila]
type Issue = [string, string, string, string, string, number, string, string, string];

const ISSUES: Issue[] = [
["SUPMED-2566","Qbank prime - Sugestão de Melhoria Flashcards","Aguardando N3","N3","—",1192,"QBank","Reclamação Ou Sugestão","Em Desenvolvimento"],
["SUPMED-2497","Qbank prime - Sugestão de melhoria","Aguardando N3","N3","—",1192,"QBank","Reclamação Ou Sugestão","Em Desenvolvimento"],
["SUPMED-2481","Sugestão - Qbank divergência no prazo de exibição do ranking","Aguardando N3","N3","—",1192,"QBank","Reclamação Ou Sugestão","Em Desenvolvimento"],
["SUPMED-2459","Qbank prime - Não aparece no ranking do simulado","Aguardando N3","N3","—",1192,"QBank","Simulado","Em Desenvolvimento"],
["SUPMED-2411","Sugestão Qbank - Imprimir PDF na Final Week","Aguardando N3","N3","—",1192,"QBank","Final Week","Em Desenvolvimento"],
["SUPMED-2404","Sugestão – Qbank/Implementação de tradução para questões e respostas","Aguardando N3","N3","—",1192,"QBank","Outros","Em Desenvolvimento"],
["SUPMED-2333","Sugestão – Arquivo Anki grande gera poucos Flashcards","Aguardando N3","N3","—",1192,"QBank","Flashcards","Em Desenvolvimento"],
["SUPMED-2329","Registro de feedback nova plataforma","Ticket Aberto","N1","maria.luana",1192,"QBank","Outros","Feedback Aluno"],
["SUPMED-2288","Qbank prime - Feedback Central de Questões","Aguardando N3","N3","—",1192,"QBank","Reclamação Ou Sugestão","Em Desenvolvimento"],
["SUPMED-2225","Dailycof - Problema barra de rolagem","Aguardando N3","N3","—",1192,"DailyCof","Outros","Em Desenvolvimento"],
["SUPMED-2209","Sugestão","Aguardando N3","N3","—",1192,"QBank","Reclamação Ou Sugestão","Em Desenvolvimento"],
["SUPMED-2192","Feedback/Sugestão - Implementação de filtro por TAGS e migração de progresso","Aguardando N3","N3","—",1192,"QBank","Flashcards","Em Desenvolvimento"],
["SUPMED-1833","Feedback/Sugestão qBank","Aguardando N3","N3","—",1192,"QBank","Reclamação Ou Sugestão","Em Desenvolvimento"],
["SUPMED-1812","Sugestão: Flashcards","Aguardando N3","N3","—",1192,"QBank","Reclamação Ou Sugestão","Em Desenvolvimento"],
["SUPMED-1735","Plataforma – Feedback sobre flashcards","Aguardando N3","N3","—",1192,"QBank","Flashcards","Em Desenvolvimento"],
["SUPMED-1581","Flashcards/Editar cards/Feedback/sugestão","Aguardando N3","N3","—",1192,"QBank","Flashcards","Em Desenvolvimento"],
["SUPMED-1375","Notificação do aplicativo","Aguardando N3","N3","—",1192,"QBank","Outros","Em Desenvolvimento"],
["SUPMED-1243","Qbank prime - Sugestão de melhoria Revisões Núcleo","Aguardando N3","N3","—",1192,"QBank","Revisões Núcleo","Em Desenvolvimento"],
["SUPMED-1242","Qbank prime - Sugestão de melhoria Revisões núcleo","Aguardando N3","N3","—",1192,"QBank","Revisões Núcleo","Em Desenvolvimento"],
["SUPMED-1237","Manter visualização da ofensiva na nova plataforma","Aguardando N3","N3","—",1192,"QBank","Revisões Núcleo","Em Desenvolvimento"],
["SUPMED-391","Crítica Construtiva via Instagram Direct","Aguardando N3","N3","—",1192,"QBank","Flashcards","Em Desenvolvimento"],
["SUPMED-2857","Qbank - Sugestões de melhoria para Flashcards","Aguardando N3","N3","—",1151,"QBank","Flashcards","Em Desenvolvimento"],
["SUPMED-2370","[Apollo] Compilador de anotações (Caderno)","Em análise N3","N3","—",1127,"Apollo (Aulas)","Reclamação Ou Sugestão","Em Desenvolvimento"],
["SUPMED-1822","[Apollo] (Mobile) Ouvir Aula em Segundo Plano","Em análise N3","N3","—",1127,"Apollo (Aulas)","Reclamação Ou Sugestão","Em Desenvolvimento"],
["SUPMED-1819","[Apollo] Remoção de \"questões da semana\" para produtos sem qBank","Em análise N3","N3","—",1127,"Apollo (Aulas)","Questões da Semana","Em Desenvolvimento"],
["SUPMED-452","[Apollo] Filtro por subespecialidade","Em análise N3","N3","—",1127,"Apollo (Aulas)","Reclamação Ou Sugestão","Em Desenvolvimento"],
["SUPMED-2867","Qbank - Simulado 1 e 4 consta como não feito","Em Desenvolvimento","N3","—",1050,"QBank","Simulado","Em Desenvolvimento"],
["SUPMED-1925","Medcof – Erro no Qbank personalizado","Em desenvolvimento N3","N3","—",1032,"QBank","Qbank Personalizado","Em Desenvolvimento"],
["SUPMED-1725","Qbank prime - Problema ao gerar novo teste","Aguardando testes N3","N3","—",1032,"QBank","Novo Teste","Em Desenvolvimento"],
["SUPMED-1765","Qbank prime - Não aparece no ranking do simulado Presencial","Em desenvolvimento N3","N3","—",1032,"QBank","Simulado","Em Desenvolvimento"],
["SUPMED-1884","Qbank – Nível de domínio não sobe para algumas tags","Aguardando Subida em Produção N3","N3","—",1032,"QBank","Outros","Em Desenvolvimento"],
["SUPMED-1741","Qbank prime - Erro no guia estatístico","Em desenvolvimento N3","N3","—",1032,"QBank","Guia Estatístico","Em Desenvolvimento"],
["SUPMED-1860","Guia Estatístico- Erro ao gerar teste","Em desenvolvimento N3","N3","—",1032,"QBank","Guia Estatístico","Em Desenvolvimento"],
["SUPMED-1892","Qbank- Impossibilidade de riscar questões com o TocuhPad.","Em desenvolvimento N3","N3","—",1032,"QBank","Novo Teste","Em Desenvolvimento"],
["SUPMED-1791","Qbank prime - Questões repetidas em novo teste","Em desenvolvimento N3","N3","—",1032,"QBank","Novo Teste","Em Desenvolvimento"],
["SUPMED-1909","Qbank prime - Erro no guia estatístico","Em desenvolvimento N3","N3","—",1032,"QBank","Guia Estatístico","Em Desenvolvimento"],
["SUPMED-1813","Qbank prime - Problema ao riscar alternativas","Em desenvolvimento N3","N3","—",1032,"QBank","Outros","Em Desenvolvimento"],
["SUPMED-1797","Qbank prime - Questões repetidas em novo teste","Em desenvolvimento N3","N3","—",1032,"QBank","Novo Teste","Em Desenvolvimento"],
["SUPMED-1731","Qbank - Erro ao gerar teste a partir do Guia Estatístico","Em desenvolvimento N3","N3","—",1032,"QBank","Guia Estatístico","Em Desenvolvimento"],
["SUPMED-3176","Melhoria no Cofbot","Aguardando N3","N3","—",967,"QBank","Cofbot","Em Desenvolvimento"],
["SUPMED-3283","QBank – Erro nos contadores e sumiço de questões","Aguardando N3","N3","—",934,"QBank","Novo Teste","Em Desenvolvimento"],
["SUPMED-2183","Sugestão sobre a Exclusão de Flashcards","Aguardando N3","N3","—",887,"QBank","Flashcards","Em Desenvolvimento"],
["SUPMED-3178","Feedback sobre questões","Aguardando N3","N3","—",883,"QBank","Novo Teste","Sugestoes"],
["SUPMED-1893","Qbank- Alternativas estão ficando riscadas sozinhas no IPAD","Em desenvolvimento N3","N3","—",866,"QBank","Meus Testes","Em Desenvolvimento"],
["SUPMED-2154","Qbank - Flashcard - Flashcard do aluno não é processado","Feedback Aluno","N1","Gabriel Campato Soares",863,"QBank","Flashcards","Suporte ao Aluno"],
["SUPMED-3331","Qbank - Simulado - Sugestão sobre relatório de erros","Aguardando N3","N3","—",840,"QBank","Reclamação Ou Sugestão","Em Desenvolvimento"],
["SUPMED-3473","Qbank – Sugestão de seleção individual de flashcards","Aguardando N3","N3","—",786,"QBank","Reclamação Ou Sugestão","Em Desenvolvimento"],
["SUPMED-1292","Sugestão do aluno","Aguardando N3","N3","—",717,"QBank","Reclamação Ou Sugestão","Em Desenvolvimento"],
["SUPMED-2120","[Hermes] Sugestão - Personalizar Conclusão do Bloco por Pacote de Produto","Aguardando N3","N3","—",716,"Hermes (Login|Dashboard)","Progresso","Em Desenvolvimento"],
["SUPMED-2148","Qbank prime - Não aparece resultado do Simulado","Em Desenvolvimento","N3","—",716,"QBank","Simulados Presenciais","Em Desenvolvimento"],
["SUPMED-2260","Qbank – Simulados presenciais não computados no ranking","Em Desenvolvimento","N3","—",716,"QBank","Simulados Presenciais","Em Desenvolvimento"],
["SUPMED-2272","Qbank prime - Não aparece no ranking do simulado Presencial","Em Desenvolvimento","N3","—",716,"QBank","Simulados Presenciais","Em Desenvolvimento"],
["SUPMED-2354","Sugestão - melhoria nos filtros de Flashcards","Aguardando N3","N3","—",716,"QBank","Flashcards","Em Desenvolvimento"],
["SUPMED-2347","Qbank prime - Perdeu a ofensiva das Revsões Núcleo pelo Dailycof","Aguardando desenvolvimento N3","N3","—",716,"QBank","Revisões Núcleo","Em Desenvolvimento"],
["SUPMED-2427","[qBank] Sugestão - Exclusão Questões Discursivas","Aguardando N3","N3","—",716,"QBank","Novo Teste","Em Desenvolvimento"],
["SUPMED-802","Sugestão - Flashcards","Aguardando N3","N3","—",696,"QBank","Flashcards","Em Desenvolvimento"],
["SUPMED-1397","Feedback flashcards","Aguardando N3","N3","—",696,"QBank","Reclamação Ou Sugestão","Em Desenvolvimento"],
["SUPMED-1414","Qbank: Flashcard ter a possibilidade de escolher o intervalo entre os cards","Aguardando N3","N3","—",696,"QBank","Flashcards","Em Desenvolvimento"],
["SUPMED-1565","Sugestão - Compartilhar Flashcard entre alunos","Aguardando N3","N3","—",695,"—","Outros","Em Desenvolvimento"],
["SUPMED-1385","Sugestão - Filtro de quantidade de questões em Novo Teste","Aguardando N3","N3","—",695,"QBank","Revisões Núcleo","Em Desenvolvimento"],
["SUPMED-853","Sugestão - Filtro de quantidade de questões em Novo Teste","Aguardando N3","N3","—",695,"QBank","Reclamação Ou Sugestão","Em Desenvolvimento"],
["SUPMED-1740","Flashcards: Opção de Sub Pasta e Transferir Flascard para outra pasta","Aguardando N3","N3","—",690,"QBank","Flashcards","Em Desenvolvimento"],
["SUPMED-1858","Sugestão Flashcards","Aguardando N3","N3","—",690,"QBank","Reclamação Ou Sugestão","Em Desenvolvimento"],
["SUPMED-2200","[Apollo] [Modo Sniper] Divergência entre Home e Cronograma","Feedback Aluno","N1","wilton.junior",672,"QBank","Novo Teste","Suporte ao Aluno"],
["SUPMED-3606","Sugestão questões do Qbank","Aguardando N3","N3","—",646,"QBank","Revisões Núcleo","Em Desenvolvimento"],
["SUPMED-3665","Qbank- Sugestão","Aguardando N3","N3","—",631,"QBank","Novo Teste","Em Desenvolvimento"],
["SUPMED-2412","Flashcards - Botão de Report e Bug de imagem","Feedback Aluno","N1","—",594,"QBank","Flashcards","Suporte ao Aluno"],
["SUPMED-3671","Feedback sobre flashcards","Aguardando N3","N3","—",553,"—","Outros","Em Desenvolvimento"],
["SUPMED-3676","Sugestão: Permitir conversação contínua nas dúvidas de questões","Aguardando N3","N3","—",552,"—","Outros","Em Desenvolvimento"],
["SUPMED-3677","Melhorias na localização de questões - Busca por código e link funcional em \"Minhas Dúvidas\"","Aguardando N3","N3","—",552,"—","Outros","Em Desenvolvimento"],
["SUPMED-1926","Qbank prime - Perdeu a ofensiva das Revsões Núcleo","Feedback Aluno","N1","Gabriel Campato Soares",549,"QBank","Revisões Núcleo","Suporte ao Aluno"],
["SUPMED-2530","Qbank prime - Perdeu a ofensiva das Revsões Núcleo","Feedback Aluno","N1","Helena Maria Barbosa",546,"QBank","Revisões Núcleo","Suporte ao Aluno"],
["SUPMED-2533","Qbank prime - Perdeu a ofensiva das Revsões Núcleo","Feedback Aluno","N1","Gabriel Campato Soares",545,"QBank","Revisões Núcleo","Suporte ao Aluno"],
["SUPMED-3645","Qbank– Simulado encerrado sozinho e inacessível","Em atendimento N1","N1","wilton.junior",544,"QBank","Simulado","Suporte ao Aluno"],
["SUPMED-3692","Qbank - Perda de ofensiva Revisões Núcleo","Aguardando N3","N3","—",535,"QBank","Revisões Núcleo","Em Desenvolvimento"],
["SUPMED-3691","QBank - Sujestão para salvar Artigos","Aguardando N3","N3","—",535,"QBank","Provas Comentadas","Em Desenvolvimento"],
["SUPMED-2930","Sugestão - Atalho de ajuda dentro do player","Em análise N3","N3","—",529,"Apollo (Aulas)","Reclamação Ou Sugestão","Em Desenvolvimento"],
["SUPMED-2868","Sugestão - Aba com todas as anotações feitas nas aulas","Em análise N3","N3","—",529,"Apollo (Aulas)","Reclamação Ou Sugestão","Em Desenvolvimento"],
["SUPMED-2516","Incluir flashcards da semana no espaço \"Questões da Semana\"","Em análise N3","N3","—",529,"—","Outros","Em Desenvolvimento"],
["SUPMED-2181","Widget - Estatística horas líquidas estudadas","Em análise N3","N3","—",529,"Apollo (Aulas)","Progresso","Em Desenvolvimento"],
["SUPMED-2440","Qbank prime - Perdeu a ofensiva das Revsões Núcleo","Feedback Aluno","N1","Gabriel Campato Soares",529,"QBank","Revisões Núcleo","Suporte ao Aluno"],
["SUPMED-1998","Sugestão - Atalho no teclado para acelerar e desacelerar o vídeo.","Em análise N3","N3","—",529,"Apollo (Aulas)","Reclamação Ou Sugestão","Em Desenvolvimento"],
["SUPMED-2327","Qbank prime - Perdeu a ofensiva das Revsões Núcleo","Feedback Aluno","N1","Gabriel Campato Soares",523,"QBank","Revisões Núcleo","Suporte ao Aluno"],
["SUPMED-2367","Qbank prime - Perdeu a ofensiva das Revsões Núcleo","Feedback Aluno","N1","Gabriel Campato Soares",523,"QBank","Revisões Núcleo","Suporte ao Aluno"],
["SUPMED-3701","Qbank - Perda de ofensiva Revisões Núcleo","Aguardando N3","N3","—",511,"QBank","Revisões Núcleo","Em Desenvolvimento"],
["SUPMED-2292","Qbank prime - Perdeu a ofensiva das Revsões Núcleo","Feedback Aluno","N1","Gabriel Campato Soares",505,"QBank","Revisões Núcleo","Suporte ao Aluno"],
["SUPMED-1696","Cronograma internato","Feedback Aluno","N1","Gabriel Campato Soares",505,"Apollo (Aulas)","Internato","Suporte ao Aluno"],
["SUPMED-3708","Qbank - Simulado 3 e 4 não aparece","Aguardando N3","N3","—",502,"QBank","Simulado","Em Desenvolvimento"],
["SUPMED-2631","[Apollo] [Admin] Sugestão: Funcionalidade de Duplicação de AQFMs","Em análise N3","N3","—",496,"Apollo (Aulas)","Outros","Em Desenvolvimento"],
["SUPMED-3740","Exclusão de usuário.","Ticket Aberto","N1","Vitória Gonsalves dos Santos",487,"—","Outros","Suporte ao Aluno"],
["SUPMED-3737","qBank - Perdeu a Streak Revisões Núcleo","Aguardando N3","N3","—",472,"QBank","Revisões Núcleo","Em Desenvolvimento"],
["SUPMED-3766","Plataforma – Melhorias na busca e edição de Flashcards","Aguardando N3","N3","—",452,"QBank","Flashcards","Em Desenvolvimento"],
["SUPMED-3707","Apollo – Plataforma de Aulas não carrega (tela branca) para perfil da aluna","Em produção N3","N2","—",450,"Apollo (Aulas)","Outros","Suporte Desenvolvimento"],
["SUPMED-2313","Qbank – Divergência de nota em simulado presencial (Pinheiros)","Em Desenvolvimento","N3","—",449,"QBank","Simulado","Em Desenvolvimento"],
["SUPMED-2166","Qbank – Inconsistência na pontuação simulado presencial","Em Desenvolvimento","N3","—",449,"QBank","Simulado","Em Desenvolvimento"],
["SUPMED-2199","Qbank - Discrepância de nota no ranking Simulado 3","Em Desenvolvimento","N3","—",449,"QBank","Simulado","Em Desenvolvimento"],
["SUPMED-2162","Qbank - Simulado Divergência entre nota da plataforma e correção manual","Em Desenvolvimento","N3","—",449,"QBank","Simulado","Em Desenvolvimento"],
["SUPMED-2224","Qbank prime - Inconsistencia resultado simulado 3","Em Desenvolvimento","N3","—",449,"QBank","Simulados Presenciais","Em Desenvolvimento"],
["SUPMED-2144","Qbank prime - Divergência resultado Simulado Presencial","Em Desenvolvimento","N3","—",449,"QBank","Simulados Presenciais","Em Desenvolvimento"],
["SUPMED-2174","Qbank - Divergência na pontuação do ranking Simulado 3","Em Desenvolvimento","N3","—",449,"QBank","Simulado","Em Desenvolvimento"],
["SUPMED-2221","Divergências no simulado","Em Desenvolvimento","N3","—",427,"QBank","Simulado","Em Desenvolvimento"],
["SUPMED-1455","Qbank - Revisão Núcleo - Entrega das Tags","Em desenvolvimento N3","N3","—",385,"QBank","Revisões Núcleo","Em Desenvolvimento"],
["SUPMED-3658","Qbank - Sugestão de Melhoria na funcionalidade de anotações inline","Aguardando N3","N3","—",384,"QBank","Reclamação Ou Sugestão","Em Desenvolvimento"],
["SUPMED-2366","Apollo prime - Não consegue deixar Aula em tela cheia","Feedback Aluno","N1","—",384,"Apollo (Aulas)","Aulas","Suporte ao Aluno"],
["SUPMED-2391","Apollo prime - Problema ao deixar a aula em tela cheia","Feedback Aluno","N1","—",384,"Apollo (Aulas)","Aulas","Suporte ao Aluno"],
["SUPMED-2436","Apollo- Aluna não consegue usar tela dividida.","Feedback Aluno","N1","—",384,"Apollo (Aulas)","Aulas","Suporte ao Aluno"],
["SUPMED-2326","[Apollo] Refresh automático e quebra de Fullscreen ao redimensionar janela","Feedback Aluno","N1","Gabriel Campato Soares",384,"Apollo (Aulas)","Aulas","Suporte ao Aluno"],
["SUPMED-1908","Qbank prime - Problema nos Desafios de Revisão Núcleo","Feedback Aluno","N1","Gabriel Campato Soares",383,"QBank","Revisões Núcleo","Suporte ao Aluno"],
["SUPMED-1845","Sugestão em Novo teste","Aguardando N3","N3","Helaine Holanda",381,"—","Outros","Sugestoes"],
["SUPMED-1930","Flashcards - Não consegue fazer o reset","Validação N2","N2","—",379,"QBank","Flashcards","Em Desenvolvimento"],
["SUPMED-4268","Aluno USMLE - Criação de Usuário e Liberação do qBank","Em atendimento N1","N1","Maclaynne Brasilina da Silva Aguiar",367,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-4267","Aluna USMLE - Criação de Usuário e Liberação do qBank","Em atendimento N1","N1","Uatana Assis",367,"Conta (Cadastro - Configuração)","Pacote","Suporte ao Aluno"],
["SUPMED-4269","Sugestão - Qbank - Ausência de funcionalidade de busca por código de questão","Aguardando N2","N2","Eduardo Bombarda",367,"QBank","Reclamação Ou Sugestão","Sugestoes"],
["SUPMED-4262","Aluno USMLE - Criação de Usuário e Liberação do qBank","Em atendimento N1","N1","Cíntia Oliveira Rocha dos Santos",367,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-4270","Aluna USMLE - Criação de Usuário e Liberação do qBank","Em atendimento N1","N1","Cíntia Oliveira Rocha dos Santos",367,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-4265","Solicitação de criação de usuário e liberação de curso - USA","Em atendimento N1","N1","tayene.silva",367,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-4250","Aluno USMLE - Criação de Usuário e Liberação do qBank","Em atendimento N1","N1","Cíntia Oliveira Rocha dos Santos",367,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-4247","Aluno USMLE - Criação de Usuário e Liberação do qBank","Em atendimento N1","N1","Maclaynne Brasilina da Silva Aguiar",367,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-4260","Aluno USA Infinity - Criação de Usuário e Liberação do QBank","Em atendimento N1","N1","Samuel Chamoun Hamdan Bambirra",367,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-4242","Aluna USMLE - Criação de Usuário e Liberação do qBank","Em atendimento N1","N1","Cíntia Oliveira Rocha dos Santos",367,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-4248","Aluna USMLE - Criação de Usuário e Liberação do qBank","Em atendimento N1","N1","Cíntia Oliveira Rocha dos Santos",367,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-4245","Aluna USMLE - Criação de Usuário e Liberação do QBank","Em atendimento N1","N1","Maclaynne Brasilina da Silva Aguiar",367,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-4253","Aluna USMLE - Criação de Usuário e Liberação do Qbank","Em atendimento N1","N1","Maclaynne Brasilina da Silva Aguiar",367,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-4246","Aluno USMLE - Criação de Usuário e Liberação do qBank","Em atendimento N1","N1","Cíntia Oliveira Rocha dos Santos",367,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-4249","Aluno USMLE - Criação de Usuário e Liberação do Qbank","Em atendimento N1","N1","Maclaynne Brasilina da Silva Aguiar",361,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-4280","Aluno USMLE - Criação de Usuário e Liberação do qBank","Em atendimento N1","N1","Rafaela Cristina Silva Alves",361,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-2143","Qbank prime - Não aparece ranking do simulado","Aguardando desenvolvimento N3","N3","—",360,"QBank","Simulados Presenciais","Em Desenvolvimento"],
["SUPMED-1850","qBank Prime – Nome não consta nos rankings presenciais","Aguardando desenvolvimento N3","N3","—",360,"QBank","Simulados Presenciais","Em Desenvolvimento"],
["SUPMED-4283","Flashcards - Não consegue resetar","Em Desenvolvimento","N3","—",360,"QBank","Flashcards","Suporte ao Aluno"],
["SUPMED-4244","Aluna USMLE - Criação de Usuário e Liberação do qBank","Em atendimento N1","N1","Uatana Assis",358,"Conta (Cadastro - Configuração)","Pacote","Suporte ao Aluno"],
["SUPMED-4251","Aluna USMLE - Criação de Usuário e Liberação do qBank","Em atendimento N1","N1","Uatana Assis",356,"Conta (Cadastro - Configuração)","Pacote","Suporte ao Aluno"],
["SUPMED-4281","Aluno USMLE - Criação de Usuário e Liberação do qBank","Em atendimento N1","N1","Rafaela Cristina Silva Alves",353,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-4277","Aluno USA - Criação de Usuário e Liberação do QBank","Em atendimento N1","N1","Rafaela Cristina Silva Alves",353,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-4306","Teste.teste@medcof.bernard","Ticket Aberto","N1","—",343,"Hermes (Login|Dashboard)","Atividades do Bloco","Suporte ao Aluno"],
["SUPMED-4308","Aluno USMLE - Criação de Usuário e Liberação do Qbank","Em atendimento N1","N1","Maclaynne Brasilina da Silva Aguiar",340,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-4303","Aluno USMLE - Criação de Usuário e Liberação do Qbank","Em atendimento N1","N1","Maclaynne Brasilina da Silva Aguiar",337,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-2501","Qbank – Ranking e desempenho não disponíveis nos simulados 2 e 4","Em Desenvolvimento","N3","—",335,"QBank","Simulado","Em Desenvolvimento"],
["SUPMED-2495","Qbank prime - Não aparece resultado do Simulado","Em Desenvolvimento","N3","—",335,"QBank","Simulados Presenciais","Em Desenvolvimento"],
["SUPMED-4276","Aluno USA Infinity - Criação de Usuário e Liberação do QBank","Em atendimento N1","N1","Samuel Chamoun Hamdan Bambirra",334,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-1330","Aluna não consegue resetar flashcards","Em produção N3","N2","—",333,"QBank","Flashcards","Suporte Desenvolvimento"],
["SUPMED-2273","Qbank prime - Não aparece no ranking do simulado Presencial","Em Desenvolvimento","N3","Pedro H Pinheiro",309,"QBank","Simulados Presenciais","Em Desenvolvimento"],
["SUPMED-4327","Aluno R.A - Fazer entrega do curso.","Em atendimento N1","N1","Maclaynne Brasilina da Silva Aguiar",295,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-4326","Sugestão sobre explicação da questão em um local especifico na plataforma","Aguardando N3","N3","—",295,"—","Outros","Em Desenvolvimento"],
["SUPMED-4329","Aluno USMLE - Criação de Usuário e Liberação do qBank","Em atendimento N1","N1","Rafaela Cristina Silva Alves",288,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-4332","Qbank - Revisões Núcleo - Quebra indevida de ofensiva por indisponibilidade de acesso à plataforma","Aguardando N3","N3","—",271,"QBank","Revisões Núcleo","Em Desenvolvimento"],
["SUPMED-4337","Qbank – Perda de ofensiva","Aguardando N3","N3","—",271,"QBank","Revisões Núcleo","Em Desenvolvimento"],
["SUPMED-4331","qBank - Perdeu a Streak de Revisões Núcleo","Aguardando N3","N3","—",271,"QBank","Revisões Núcleo","Em Desenvolvimento"],
["SUPMED-4339","Aluna indiciou sumiço de aulas e de seu cronograma.","Em atendimento N1","N1","Paulo Cesar Nascimento Magalhães",259,"Apollo (Aulas)","Cronograma","Suporte ao Aluno"],
["SUPMED-4317","Solicitação de criação de usuário e liberação de curso","Em atendimento N1","N1","tayene.silva",259,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-4342","Erro na Criação de Usuário.","Em atendimento N1","N1","Maclaynne Brasilina da Silva Aguiar",247,"Conta (Cadastro - Configuração)","Onboarding","Suporte ao Aluno"],
["SUPMED-4333","Aluno USMLE - Criação de Usuário e Liberação do Qbank","Em atendimento N1","N1","Maclaynne Brasilina da Silva Aguiar",241,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-4345","Apollo prime - Aulas não rodam no Celular","Em atendimento N1","N1","Nátaly França",223,"Apollo (Aulas)","AQFM (Aulas - Questões - Flashcards - Material de Apoio","Suporte ao Aluno"],
["SUPMED-1483","FlashCards- Ofensivas não estão sendo contabilizadas.","Em produção N3","N2","—",217,"QBank","Flashcards","Suporte Desenvolvimento"],
["SUPMED-4239","Qbank - Perda de ofensiva Revisões Núcleo","Aguardando N3","N3","—",215,"QBank","Revisões Núcleo","Em Desenvolvimento"],
["SUPMED-4338","Qbank – Divergência na contagem de acertos","Em atendimento N1","N1","wilton.junior",211,"QBank","Meus Testes","Suporte ao Aluno"],
["SUPMED-4347","Aluna USMLE - Criação de Usuário e Liberação do Qbank","Em atendimento N1","N1","Cíntia Oliveira Rocha dos Santos",193,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-4401","Erro no 1º acesso/ aceite de termos","Em atendimento N1","N1","Fernanda Kawabe",193,"Conta (Cadastro - Configuração)","Onboarding","Suporte ao Aluno"],
["SUPMED-3679","Qbank prime - Problema em Minhas Notas","Feedback Aluno","N1","—",186,"QBank","Minhas Notas","Suporte ao Aluno"],
["SUPMED-2491","Qbank prime - Problema em Minhas Notas","Feedback Aluno","N1","—",186,"QBank","Minhas Notas","Suporte ao Aluno"],
["SUPMED-4403","Qbank - Perda de ofensiva Revisões Núcleo","Aguardando N3","N3","—",175,"QBank","Revisões Núcleo","Em Desenvolvimento"],
["SUPMED-4416","Falha na conclusão do cadastro inicial e aceite dos Termos de Uso","Em atendimento N1","N1","Rafaela Cristina Silva Alves",175,"Conta (Cadastro - Configuração)","Onboarding","Suporte ao Aluno"],
["SUPMED-2164","Qbank - Divergência na pontuação e correção do Simulado Presencial 3.","Em Desenvolvimento","N3","—",167,"QBank","Simulado","Em Desenvolvimento"],
["SUPMED-4398","Aluno USMLE - Criação de Usuário e Liberação do qBank","Em atendimento N1","N1","Rafaela Cristina Silva Alves",162,"Conta (Cadastro - Configuração)","Checkout (Entrega Produto)","Suporte ao Aluno"],
["SUPMED-2356","Qbank - Índice de revisão travada em 91%","Em análise N3","N3","—",156,"QBank","Revisões Núcleo","Em Desenvolvimento"],
["SUPMED-4418","Aluno com 2 usuários, renovou o curso com e-mail diferente","Em atendimento N1","N1","Uatana Assis",151,"—","Outros","Suporte ao Aluno"],
["SUPMED-2213","Qbank prime - Problema simulado R+ Endoscopia","Aguardando desenvolvimento N3","N3","—",143,"QBank","Simulado","Em Desenvolvimento"],
["SUPMED-2651","Intranet - Cargo de \"Suporte\" não gera sugestão de revisão núcleo","Aguardando desenvolvimento N3","N3","—",143,"QBank","Revisões Núcleo","Em Desenvolvimento"],
["SUPMED-4417","QBank - Quebra da ofensiva de Revisão Núcleo","Aguardando N3","N3","—",142,"QBank","Revisões Núcleo","Em Desenvolvimento"],
["SUPMED-3509","Apollo - Aulas assistidas sendo desmarcadas e progresso não salvo","Em produção N3","N2","—",142,"Apollo (Aulas)","AQFM (Aulas - Questões - Flashcards - Material de Apoio","Suporte Desenvolvimento"],
["SUPMED-4394","Sugestão - Flashcards - Sugestão de remoção de baralho da revisão","Ticket Aberto","N1","—",140,"QBank","Flashcards","Sugestoes"],
["SUPMED-2358","Flashcards – Barra de pesquisa no baralho","Aguardando N3","N3","—",127,"QBank","Reclamação Ou Sugestão","Em Desenvolvimento"],
["SUPMED-2169","Qbank – Falha na contagem da ofensiva de Flashcards","Em produção N3","N2","—",120,"QBank","Flashcards","Suporte Desenvolvimento"],
["SUPMED-3595","Apollo – Ausência de tarefas mínimas e conteúdos no cronograma de missão no Internato","Em produção N3","N2","—",115,"Apollo (Aulas)","AQFM (Aulas - Questões - Flashcards - Material de Apoio","Suporte Desenvolvimento"],
["SUPMED-3685","Qbank:  Divergência de especialidade no ranking (App vs Navegador)","Em desenvolvimento N3","N3","Yuri Muniz",112,"QBank","Estatísticas","Em Desenvolvimento"],
["SUPMED-4446","Sugestão: Opção de filtro na aba NOVO TESTE","Em atendimento N1","N1","Caroline Silva",103,"QBank","Reclamação Ou Sugestão","Suporte ao Aluno"],
["SUPMED-4588","Qbank - Solicitação de reset do histórico de videoaulas","Em análise N2","N2","Eduardo Bombarda",96,"QBank","Revisões Núcleo","Suporte Desenvolvimento"],
["SUPMED-2067","Sugestão- Ter a opção de bloquear questões.","Aguardando N3","N3","—",92,"Apollo (Aulas)","Reclamação Ou Sugestão","Em Desenvolvimento"]
];

const TABLE_HEADERS = ["Ticket", "Título", "Fluxo", "Fila de Atendimento", "Status", "Responsável", "Dias", "Sistema", "Tipo"];
const HEALTH_PANEL_PATH = "C:/Users/BernardLadeia/.cursor/projects/d-Medcof-HealthPanel-Project/canvases/operational-governance-center.canvas.tsx";

function getFluxo(status: string): string {
  if (/N1/i.test(status)) return "N1";
  if (/N2/i.test(status)) return "N2";
  if (/N3/i.test(status)) return "N3";
  return "—";
}

const FLUXO_OPTIONS = [
  { value: "all", label: "Todos os Fluxos" },
  { value: "N1", label: "Fluxo N1" },
  { value: "N2", label: "Fluxo N2" },
  { value: "N3", label: "Fluxo N3" },
];

function filaOptions(issues: Issue[]): { value: string; label: string }[] {
  const unique = Array.from(new Set(issues.map(i => i[8]))).filter(Boolean).sort();
  return [{ value: "all", label: "Todas as Filas" }, ...unique.map(v => ({ value: v, label: v }))];
}

function systemOptions(issues: Issue[]): { value: string; label: string }[] {
  const unique = Array.from(new Set(issues.map(i => i[6]))).filter(Boolean).sort();
  return [{ value: "all", label: "Todos os Sistemas" }, ...unique.map(v => ({ value: v, label: v }))];
}

function systemsOf(issues: Issue[]): { label: string; value: number }[] {
  const counts: Record<string, number> = {};
  for (const i of issues) {
    const sys = i[6] || "—";
    counts[sys] = (counts[sys] ?? 0) + 1;
  }
  return Object.entries(counts)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

function toClipboardTsv(headers: string[], rows: string[][]): string {
  const lines = [
    headers.join("\t"),
    ...rows.map(row => row.map(cell => String(cell)).join("\t")),
  ];
  return lines.join("\n");
}

function IssueTable({ issues, filterKey }: { issues: Issue[]; filterKey: string }) {
  const [fluxo, setFluxo] = useCanvasState<string>(filterKey + "-fluxo", "all");
  const [fila, setFila] = useCanvasState<string>(filterKey, "all");
  const [system, setSystem] = useCanvasState<string>(filterKey + "-system", "all");
  const [exportFeedback, setExportFeedback] = useCanvasState<string>(filterKey + "-export-feedback", "");

  const filtered = issues.filter(i => {
    if (fluxo !== "all" && getFluxo(i[2]) !== fluxo) return false;
    if (fila !== "all" && i[8] !== fila) return false;
    if (system !== "all" && i[6] !== system) return false;
    return true;
  });

  async function handleCopyTable() {
    if (!navigator?.clipboard?.writeText) {
      setExportFeedback("Não foi possível copiar automaticamente neste ambiente.");
      return;
    }
    try {
      const rows = filtered.map(i => [i[0], i[1], getFluxo(i[2]), i[8], i[2], i[4], `${Math.round(i[5] / 24)}d`, i[6], i[7]]);
      const tsv = toClipboardTsv(TABLE_HEADERS, rows);
      await navigator.clipboard.writeText(tsv);
      setExportFeedback(`Tabela copiada (${rows.length} linhas).`);
    } catch {
      setExportFeedback("Falha ao copiar a tabela para a área de transferência.");
    }
  }

  return (
    <Stack gap={8}>
      <Row gap={8} align="center" wrap>
        <Text size="small" tone="secondary">Fluxo:</Text>
        <Select value={fluxo} onChange={setFluxo} options={FLUXO_OPTIONS} style={{ minWidth: 140 }} />
        <Text size="small" tone="secondary">Fila de Atendimento:</Text>
        <Select value={fila} onChange={setFila} options={filaOptions(issues)} style={{ minWidth: 200 }} />
        <Text size="small" tone="secondary">Sistema:</Text>
        <Select value={system} onChange={setSystem} options={systemOptions(issues)} style={{ minWidth: 180 }} />
        <Spacer />
        <Button onClick={() => void handleCopyTable()}>Copiar tabela</Button>
        <Text size="small" tone="secondary">{filtered.length} tickets</Text>
      </Row>
      {exportFeedback ? <Text size="small" tone="secondary">{exportFeedback}</Text> : null}
      <Table
        headers={TABLE_HEADERS}
        rows={filtered.map(i => [i[0], i[1], getFluxo(i[2]), i[8], i[2], i[4], String(Math.round(i[5] / 24)) + "d", i[6], i[7]])}
        rowTone={filtered.map(i => (i[5] > 168 ? "warning" : undefined))}
      />
    </Stack>
  );
}

function formatSnapshot(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export default function TicketsParados72h() {
  const dispatch = useCanvasAction();
  const snapshot = formatSnapshot(new Date());
  const n1 = ISSUES.filter(i => getFluxo(i[2]) === "N1");
  const n2 = ISSUES.filter(i => getFluxo(i[2]) === "N2");
  const n3 = ISSUES.filter(i => getFluxo(i[2]) === "N3");

  const total = ISSUES.length;
  const avgDias = Math.round(ISSUES.reduce((s, i) => s + i[5], 0) / total / 24);
  const oldest = [...ISSUES].sort((a, b) => b[5] - a[5])[0];
  const oldestDias = Math.round(oldest[5] / 24);

  const [chartFluxo, setChartFluxo] = useCanvasState<string>("chart-fluxo", "N1");

  const chartIssues = chartFluxo === "N1" ? n1 : chartFluxo === "N2" ? n2 : n3;
  const systems = systemsOf(chartIssues);
  const chartCats = systems.slice(0, 8).map(s => s.label);
  const chartData = systems.slice(0, 8).map(s => s.value);

  return (
    <Stack gap={24} style={{ padding: 24 }}>
      <Row align="center" justify="space-between">
        <Text tone="secondary" size="small">{`Gerado em ${snapshot}`}</Text>
        <Button
          variant="secondary"
          onClick={() => dispatch({ type: "openFile", path: HEALTH_PANEL_PATH })}
        >
          Voltar ao Operational Governance Center
        </Button>
      </Row>
      <Stack gap={4}>
        <H1>Tickets Parados 72h+ — SUPMED</H1>
        <Text tone="secondary" size="small">
          {`Tickets abertos sem atualização nas últimas 72h · Snapshot ${snapshot}`}
        </Text>
      </Stack>

      <Grid columns={6} gap={12}>
        <Stat value={String(total)} label="Total parados" />
        <Stat value={String(n1.length)} label="Fluxo N1" tone="warning" />
        <Stat value={String(n2.length)} label="Fluxo N2" tone="info" />
        <Stat value={String(n3.length)} label="Fluxo N3" tone="info" />
        <Stat value={`${avgDias}d`} label="Média parado" />
        <Stat value={`${oldestDias}d`} label={oldest[0]} tone="danger" />
      </Grid>

      <Stack gap={8}>
        <H2>Distribuição por Fluxo</H2>
        <Text tone="secondary" size="small">Fonte: Jira SUPMED · Janela: tickets com 72h+ sem atualização</Text>
      </Stack>
      <PieChart
        data={[
          { label: `N1 (${n1.length})`, value: n1.length },
          { label: `N2 (${n2.length})`, value: n2.length },
          { label: `N3 (${n3.length})`, value: n3.length },
        ]}
        donut
        size={180}
        style={{ alignSelf: "flex-start" }}
      />

      <Divider />
      <Stack gap={12}>
        <H2>Todos os Tickets</H2>
        <IssueTable issues={ISSUES} filterKey="global" />
      </Stack>

      <Divider />
      <Stack gap={16}>
        <Row gap={12} align="center">
          <H2>Tickets por Sistema</H2>
          <Pill tone="neutral">{chartIssues.length} tickets</Pill>
          <Select
            value={chartFluxo}
            onChange={setChartFluxo}
            options={[
              { value: "N1", label: "Fluxo N1" },
              { value: "N2", label: "Fluxo N2" },
              { value: "N3", label: "Fluxo N3" },
            ]}
            style={{ minWidth: 140 }}
          />
        </Row>
        <Text tone="secondary" size="small">
          Fonte: Jira SUPMED · Série: quantidade de tickets por sistema no fluxo selecionado
        </Text>
        <BarChart
          categories={chartCats}
          series={[{ name: "Tickets parados", data: chartData }]}
          horizontal
          height={Math.min(40 + chartCats.length * 36, 340)}
        />
      </Stack>

      <Divider />
      <Text tone="secondary" size="small">
        {`Fonte: Jira SUPMED · Snapshot ${snapshot} · Critério: tickets sem atualização por 72h ou mais`}
      </Text>
    </Stack>
  );
}
