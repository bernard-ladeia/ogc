import {
  Callout,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Spacer,
  Stack,
  Stat,
  Table,
  Text,
  useHostTheme,
  Select,
  useCanvasState,
} from "cursor/canvas";

interface FAQItem {
  q: string;
  a: string;
  tags?: string[];
}

interface Category {
  id: string;
  label: string;
  badge: "info" | "warning" | "success" | "danger" | undefined;
  source: string;
  items: FAQItem[];
}

const ALL_CATEGORIES: Category[] = [
  {
    id: "acesso",
    label: "Acesso & Login",
    badge: "info",
    source: "GateKeeper · KB",
    items: [
      {
        q: "Esqueci minha senha. Como recupero?",
        a: "Na tela inicial, clique em 'Esqueci minha senha', informe o e-mail e clique em Continuar. Use sempre o link mais recente recebido por e-mail.",
        tags: ["senha", "login", "recuperação"],
      },
      {
        q: "Posso acessar em dois dispositivos ao mesmo tempo?",
        a: "Não. O acesso simultâneo é bloqueado por segurança. Ao logar em novo dispositivo, a sessão anterior é encerrada automaticamente.",
        tags: ["dispositivo", "sessão"],
      },
      {
        q: "Qual o link direto para entrar na plataforma?",
        a: "https://login.medcof.com.br/",
        tags: ["link", "acesso"],
      },
      {
        q: "Não recebi o e-mail de confirmação ou recuperação.",
        a: "Verifique spam e lixo eletrônico. Confirme se o e-mail foi digitado corretamente. Aguarde alguns minutos. Se persistir, refaça o processo.",
        tags: ["email", "confirmação"],
      },
      {
        q: "O link de confirmação/redefinição não funciona.",
        a: "O link pode estar expirado — um novo pode ter sido enviado. Solicite um novo e-mail e use sempre o link mais recente.",
        tags: ["link", "token", "expirado"],
      },
      {
        q: "Tentei criar conta mas apareceu que meu e-mail já está cadastrado.",
        a: "Você já tem cadastro. Volte para o login e tente entrar normalmente. Se não lembrar a senha, clique em 'Esqueci minha senha'.",
        tags: ["cadastro", "email duplicado"],
      },
      {
        q: "iPhone/iPad: 'Application error: a client-side exception has occurred'.",
        a: "iOS/Safari desatualizados. Atualize o sistema e o Safari. Se o dispositivo não suportar atualização, acesse por computador ou dispositivo compatível.",
        tags: ["ios", "ipad", "iphone", "erro"],
      },
      {
        q: "A plataforma funciona no celular ou tablet?",
        a: "Sim. Apps MedCof QBank e MedCof Aulas disponíveis na App Store. Também funciona pelo navegador do celular/tablet.",
        tags: ["mobile", "app", "celular"],
      },
    ],
  },
  {
    id: "onboarding",
    label: "Onboarding & Cadastro",
    badge: undefined,
    source: "GateKeeper",
    items: [
      {
        q: "Apareceu 'Token Inválido' no primeiro acesso.",
        a: "O link de convite expirou ou já foi usado. Solicite novo envio de convite ou tente logar direto se já criou a senha.",
        tags: ["token", "primeiro acesso"],
      },
      {
        q: "O sistema fica pedindo para configurar o qBank toda vez que faço login.",
        a: "A configuração anterior não foi concluída até o botão 'Finalizar'. Siga todos os passos do CofBot até a mensagem de confirmação final.",
        tags: ["qbank", "configuração", "loop"],
      },
      {
        q: "O sistema travou na tela de carregamento do qBank.",
        a: "Falha temporária de comunicação. Clique em 'Tentar Novamente' ou faça login novamente para retomar.",
        tags: ["trava", "carregamento"],
      },
      {
        q: "Erro ao salvar o cadastro.",
        a: "Verifique se há campos obrigatórios em branco ou CPF com formato incorreto. Corrija os campos marcados em vermelho.",
        tags: ["cadastro", "erro", "CPF"],
      },
    ],
  },
  {
    id: "qbank-personalizado",
    label: "qBank Personalizado",
    badge: "info",
    source: "KB",
    items: [
      {
        q: "O que é o qBank Personalizado?",
        a: "Seleção de questões montada automaticamente com base nas instituições-alvo, especialidade e tempo de estudo do aluno. Foca no que é mais relevante para a prova dele.",
        tags: ["qbank", "personalizado"],
      },
      {
        q: "Quantas instituições posso selecionar?",
        a: "Até 15 instituições. Entre elas, até 5 podem ser definidas como prioritárias (TOP Instituições). A etapa de priorização só aparece com mais de 1 instituição selecionada.",
        tags: ["instituições", "limite"],
      },
      {
        q: "E se o aluno não souber quais instituições escolher?",
        a: "Na tela de seleção existe a opção 'Não sei'. O sistema seleciona automaticamente um conjunto de instituições representativas.",
        tags: ["não sei", "instituições"],
      },
      {
        q: "Quanto tempo leva para o qBank ficar pronto após configurar?",
        a: "Alguns minutos. O processamento continua em segundo plano se o aluno sair da tela. Quando pronto, um banner exibe 'Seu qBank personalizado está pronto'.",
        tags: ["processamento", "tempo"],
      },
      {
        q: "Posso alterar as escolhas do qBank Personalizado depois?",
        a: "Sim. Em Configurações > aba MedCof > 'Configurar qBank Personalizado'. Um aviso informa que pode resetar/alterar estatísticas. O sistema reprocessará o banco.",
        tags: ["alterar", "reconfigurar"],
      },
      {
        q: "Por que não apareço com a opção de qBank Personalizado?",
        a: "A funcionalidade não está disponível para: TEC 2025, R+ Radiologia, Medcof Radio 2025, Simulados-Radiologia, MEDCOF RADIO, MedCof Anestesio, TEA-Anestesia, Oftalmo, TEEM, Anestesia, USMLE STEP1.",
        tags: ["disponibilidade", "produto"],
      },
      {
        q: "Qual a diferença entre resetar o qBank e reconfigurar o qBank Personalizado?",
        a: "Reset apaga PERMANENTEMENTE histórico e estatísticas. Reconfigurar apenas ajusta preferências (instituições, especialidade, tempo). São ações completamente diferentes.",
        tags: ["reset", "diferença"],
      },
      {
        q: "O qBank Personalizado afeta as revisões núcleo?",
        a: "Sim. As revisões núcleo passam a priorizar assuntos com mais relevância para as instituições escolhidas.",
        tags: ["revisão núcleo", "impacto"],
      },
    ],
  },
  {
    id: "qbank-testes",
    label: "qBank — Testes & Questões",
    badge: undefined,
    source: "GateKeeper · KB",
    items: [
      {
        q: "Os filtros das Provas Comentadas não retornam resultados.",
        a: "Após escolher filtros (Instituição, Tipo, Ano), é OBRIGATÓRIO clicar no botão preto 'Pesquisar'. Sem clicar, a lista não muda. Se ainda em branco, limpe os filtros e refaça a busca.",
        tags: ["provas comentadas", "filtro", "pesquisar"],
      },
      {
        q: "O contador de progresso das Provas Comentadas não atualiza.",
        a: "O sistema só contabiliza após o aluno clicar em 'Finalizar e Entregar' no player. Apenas responder questões não conta. Oriente a reabrir o player e confirmar a entrega.",
        tags: ["progresso", "provas comentadas"],
      },
      {
        q: "Não encontro a prova em PDF desejada.",
        a: "Selecione os filtros e clique em 'Pesquisar'. Confira a paginação no canto superior direito. Se a prova deveria existir, verifique no Intranet: qBank > Provas > Cadastro de Provas.",
        tags: ["pdf", "prova", "filtro"],
      },
      {
        q: "O PDF da prova não abre em nova guia.",
        a: "O navegador está bloqueando pop-ups. Oriente o aluno a permitir pop-ups para o site da MedCof ou tentar no modo anônimo.",
        tags: ["pdf", "popup", "navegador"],
      },
      {
        q: "Como enviar uma dúvida sobre uma questão?",
        a: "Na interface padrão: clique no ícone de balão com interrogação no painel lateral. No Modo Foco: clique em '+' na barra inferior > 'Dúvidas da Questão'. Digite e clique em Enviar.",
        tags: ["dúvida", "questão", "envio"],
      },
      {
        q: "Preciso corrigir uma dúvida já enviada.",
        a: "Dúvidas não podem ser editadas. Exclua a dúvida em 'Minhas Dúvidas' (ícone lixeira) e retorne à questão para enviar uma nova com o texto correto.",
        tags: ["editar", "dúvida", "excluir"],
      },
      {
        q: "Devo usar Modo Padrão ou Modo Tutor?",
        a: "Modo Padrão: indicado para treinar agilidade e avaliar desempenho. Modo Tutor: ideal para aprendizado, exibe explicações detalhadas após cada resposta.",
        tags: ["modo padrão", "modo tutor"],
      },
    ],
  },
  {
    id: "revisoes",
    label: "Revisões Núcleo",
    badge: "warning",
    source: "GateKeeper",
    items: [
      {
        q: "A página de revisões está em branco.",
        a: "O aluno interagiu com todas as tags disponíveis ou tem muitos temas bloqueados. Oriente a desbloquear tags nas configurações. Se persistir, aguarde o próximo plano diário.",
        tags: ["revisão", "em branco", "tags"],
      },
      {
        q: "O Streak (Ofensiva) zerou sem motivo aparente.",
        a: "A ofensiva só é mantida quando o aluno finaliza e entrega pelo menos 1 bateria (Núcleo, Express ou Customizada) por dia. Só responder as questões sem entregar não conta.",
        tags: ["streak", "ofensiva", "contador"],
      },
      {
        q: "Apareceu um tema que o aluno nunca estudou nas revisões.",
        a: "Temas novos não possuem barreira de tempo. O sistema os prioriza quando são muito relevantes para a prova-alvo ou quando há aulas recém-liberadas.",
        tags: ["tema novo", "revisão"],
      },
      {
        q: "O plano de revisões de hoje é igual ao de ontem.",
        a: "Pouca disponibilidade de questões nos temas liberados. Sugestão: assistir novas aulas para liberar novos temas no algoritmo de prioridade.",
        tags: ["plano", "repetição"],
      },
    ],
  },
  {
    id: "sniper",
    label: "Modo Sniper",
    badge: undefined,
    source: "KB",
    items: [
      {
        q: "O Modo Sniper não aparece para o aluno.",
        a: "O produto do aluno pode não ter o Modo Sniper habilitado. Verificar em: Admin > Produtos > Funções do Produto > 'Possui Modo Sniper?'. Produtos com template Internato e produtos internacionais não possuem.",
        tags: ["sniper", "não aparece", "produto"],
      },
      {
        q: "Ativei o Modo Sniper mas a ordem das aulas não mudou.",
        a: "O aluno precisa: (1) selecionar ao menos uma instituição E (2) clicar em 'Enviar' para salvar. Sem salvar a seleção, o sistema não aplica as cores.",
        tags: ["sniper", "ordem", "salvar"],
      },
      {
        q: "Troquei as instituições no Sniper mas a ordem não mudou.",
        a: "O sistema armazena o cálculo em cache por até 24h. Se a troca foi recente, aguarde até o dia seguinte para o recálculo automático.",
        tags: ["sniper", "cache", "institucoes"],
      },
      {
        q: "O que significam as cores do Modo Sniper?",
        a: "Diamante (fixo pelos especialistas) → Verde (alta prioridade, 40% mais cobrado nas bancas) → Amarelo (prioridade intermediária, 20%) → Vermelho (prioridade baixa, 40%) → Bônus (conteúdo extra).",
        tags: ["sniper", "cores", "prioridade"],
      },
    ],
  },
  {
    id: "flashcards",
    label: "Flashcards",
    badge: undefined,
    source: "KB",
    items: [
      {
        q: "Não tenho acesso para criar Flashcards.",
        a: "A funcionalidade é liberada para produtos que possuem qBank. Se desejar upgrade, siga o link sugerido ao clicar na ferramenta ou entre em contato com o suporte.",
        tags: ["flashcards", "acesso", "upgrade"],
      },
      {
        q: "Como funciona o sistema de avaliação dos flashcards?",
        a: "Após ver a resposta: Errei = volta em 25 min (ou 10 min se já estava em Revisão). Difícil = 12h. Médio = 24h (novo) ou 3 dias (aprendendo). Fácil = 4 dias. O algoritmo é baseado no método SM-2.",
        tags: ["flashcards", "algoritmo", "revisão"],
      },
      {
        q: "Qual a diferença entre Revisão (Meta do Dia) e Estudo por Baralho?",
        a: "Revisão: o sistema escolhe quais cards aparecem (os que estão na hora certa de revisar). Modo Livre: você escolhe o baralho e pode estudar os cards quando quiser, sem agendamento.",
        tags: ["revisão", "modo livre", "baralho"],
      },
      {
        q: "O Streak dos Flashcards zerou.",
        a: "A sequência exige interação com pelo menos um flashcard por dia. Se passar mais de 24h sem atividade, a sequência é zerada.",
        tags: ["streak", "flashcards"],
      },
    ],
  },
  {
    id: "aulas",
    label: "Aulas & AQFM",
    badge: undefined,
    source: "KB · GateKeeper",
    items: [
      {
        q: "O vídeo da aula está travando ou não carrega.",
        a: "Verifique conexão com a internet e limpe o cache do navegador. Tente outro navegador ou rede. Se persistir, entre em contato via chat na plataforma ou suporte@grupomedcof.com.br.",
        tags: ["vídeo", "travando", "carregamento"],
      },
      {
        q: "Não consigo acessar o conteúdo do AQFM.",
        a: "O conteúdo pode não ter sido lançado ainda. O sistema exibirá um aviso com a data de liberação. Verifique se o produto contratado inclui esse conteúdo.",
        tags: ["aqfm", "acesso", "liberação"],
      },
      {
        q: "Assisti o vídeo mas ele não aparece como concluído.",
        a: "É necessário assistir pelo menos 80% do conteúdo. Também é possível forçar a conclusão clicando no checkbox disponível no player.",
        tags: ["concluído", "80%", "vídeo"],
      },
      {
        q: "Por que os conteúdos têm cores diferentes na lista?",
        a: "Vermelho = não iniciado. Amarelo = em andamento (iniciado mas não concluído). Verde = concluído (80%+ assistido).",
        tags: ["cores", "progresso", "aqfm"],
      },
      {
        q: "As aulas ficam gravadas? Posso assistir quantas vezes quiser?",
        a: "Sim. Todas as aulas ficam gravadas e disponíveis para assistir quantas vezes desejar durante o período do curso.",
        tags: ["gravadas", "aulas", "acesso"],
      },
      {
        q: "Devo assistir CofExpress ou Aprofundamento?",
        a: "Via de regra, CofExpress. Reserve o Aprofundamento para temas que continua errando mesmo após flashcards/questões, ou que sejam muito prevalentes nas bancas-alvo.",
        tags: ["cofexpress", "aprofundamento"],
      },
      {
        q: "Existe material em PDF para acompanhar as aulas?",
        a: "Sim. A maioria das aulas acompanha materiais de apoio ou slides, disponíveis geralmente abaixo do vídeo na página da aula.",
        tags: ["pdf", "material", "slides"],
      },
    ],
  },
  {
    id: "estatisticas",
    label: "Estatísticas & Dashboard",
    badge: "success",
    source: "GateKeeper",
    items: [
      {
        q: "Alterei o painel de estatísticas e tudo sumiu ao recarregar.",
        a: "O layout não foi salvo. No Modo de Edição, sempre clique em 'Salvar' antes de sair da tela.",
        tags: ["painel", "salvar", "layout"],
      },
      {
        q: "Como ver o desempenho de apenas uma especialidade?",
        a: "Adicione um widget, acesse suas configurações e use o 'Filtro por Tags' para selecionar a matéria desejada.",
        tags: ["filtro", "tags", "especialidade"],
      },
      {
        q: "Se excluir um widget, perco meu histórico de desempenho?",
        a: "Não. O widget é apenas uma visualização. Os dados ficam salvos no sistema mesmo após excluir o widget.",
        tags: ["widget", "histórico", "exclusão"],
      },
      {
        q: "Como sugerir um novo tipo de gráfico?",
        a: "Use o botão 'Sugerir novo Widget' no topo da tela de Estatísticas.",
        tags: ["sugestão", "widget", "gráfico"],
      },
    ],
  },
  {
    id: "configuracoes",
    label: "Configurações & Perfil",
    badge: undefined,
    source: "GateKeeper",
    items: [
      {
        q: "Não consigo alterar nome, e-mail ou dados cadastrais.",
        a: "Esses dados não estão liberados para edição direta no menu de Configurações. Para alteração de e-mail ou dados sensíveis, o aluno deve entrar em contato com o suporte.",
        tags: ["dados", "editar", "nome", "email"],
      },
      {
        q: "A foto de perfil não carrega ou não atualiza.",
        a: "Tente com imagem menor. Aguarde após selecionar. Atualize a página para verificar. Se persistir, tente outro navegador ou conexão.",
        tags: ["foto", "perfil", "upload"],
      },
      {
        q: "Ativei o modo anônimo ou alterei o apelido, mas nada mudou.",
        a: "A alteração depende de clicar em 'Salvar'. Volte à aba Dados MedCof e clique em Salvar. O novo apelido só aparece em novas provas realizadas.",
        tags: ["anônimo", "apelido", "salvar"],
      },
      {
        q: "Não consigo mudar a especialidade na tela de Configurações.",
        a: "A especialidade não é alterada diretamente nessa tela. Clique em 'Configurar qBank Personalizado' na aba Dados quando disponível.",
        tags: ["especialidade", "qbank"],
      },
      {
        q: "Não encontro opções de modo escuro, notificações ou tamanho de fonte.",
        a: "Essas opções não estão disponíveis no menu de Configurações atual. Se impactar o uso, procure o suporte para verificar alternativas.",
        tags: ["modo escuro", "notificações", "fonte"],
      },
    ],
  },
  {
    id: "reset",
    label: "Reset qBank / Flashcards",
    badge: "danger",
    source: "GateKeeper",
    items: [
      {
        q: "O botão final de reset não habilita mesmo digitando o texto.",
        a: "O texto deve ser digitado EXATAMENTE como aparece na tela — incluindo maiúsculas, minúsculas, pontuação e espaços. Apague tudo, copie a frase exibida e cole no campo.",
        tags: ["reset", "botão", "texto confirmação"],
      },
      {
        q: "Apareceu erro ao tentar fazer o reset.",
        a: "Instabilidade temporária. Aguarde, verifique se ainda está logado e tente novamente. Se persistir, entre em contato com o suporte informando qual reset tentou e o horário.",
        tags: ["reset", "erro"],
      },
      {
        q: "O aluno resetou o recurso errado por acidente.",
        a: "A ação é irreversível. O suporte pode orientar sobre o funcionamento, mas não há garantia de restauração do histórico apagado.",
        tags: ["reset", "irreversível", "acidente"],
      },
    ],
  },
  {
    id: "financeiro",
    label: "Financeiro & Pagamentos",
    badge: "warning",
    source: "GateKeeper · KB (Mercury/Shuri)",
    items: [
      {
        q: "Paguei mas o acesso não foi liberado.",
        a: "Pode haver tempo de compensação bancária. Verifique se pagou na conta correta, aguarde alguns minutos e atualize a página. Se persistir, envie o comprovante ao suporte.",
        tags: ["pagamento", "acesso", "compensação"],
      },
      {
        q: "O link de pagamento não abre.",
        a: "O navegador pode estar bloqueando pop-ups. Desative o bloqueador. Se o botão não aparecer, a parcela pode exigir tratativa direta com o suporte.",
        tags: ["link", "pagamento", "popup"],
      },
      {
        q: "A assinatura do aluno aparece como Inativa.",
        a: "Confira datas em 'Pacotes' e verifique se há parcelas 'Atrasadas' em 'Financeiro'. Regularize as pendências financeiras para reativar o acesso.",
        tags: ["assinatura", "inativa", "pacote"],
      },
      {
        q: "Como obter Nota Fiscal, recibo ou solicitar cancelamento?",
        a: "Essas funções não são de autoatendimento no Hermes. Contato direto com o suporte é necessário.",
        tags: ["nota fiscal", "cancelamento", "recibo"],
      },
      {
        q: "Como trocar o cartão cadastrado do aluno? (Mercury)",
        a: "Com parcela VENCIDA: oriente o aluno a pagar a parcela vencida com o novo cartão — ele ficará registrado automaticamente. Sem parcela vencida: acesse Perfil de Pagamentos > Assinatura > Opções > Alterar perfil de pagamento > copie e envie o link de adição de cartão ao aluno.",
        tags: ["cartão", "mercury", "atualização"],
      },
      {
        q: "Onde encontro o link de pagamento de uma parcela? (Mercury/Shuri)",
        a: "Localize a compra pelo e-mail ou CPF > acesse o registro da compra > aba Venda > localize a fatura > Opções > Cobrar Fatura > copie o link de pagamento e envie ao aluno.",
        tags: ["link pagamento", "fatura", "mercury", "shuri"],
      },
      {
        q: "Qual a diferença entre reembolso com fatura cancelada e fatura em aberto?",
        a: "Fatura Cancelada: a fatura original é estornada e cancelada — não é gerada nova fatura. Fatura em Aberto: a fatura é estornada mas o sistema gera automaticamente uma nova fatura em aberto — o aluno pode pagar por Pix ou boleto.",
        tags: ["reembolso", "cancelada", "aberta", "fatura"],
      },
    ],
  },
  {
    id: "comercial",
    label: "Comercial",
    badge: undefined,
    source: "KB",
    items: [
      {
        q: "Como comprar um produto?",
        a: "Acesse grupomedcof.com.br > navegue pelos produtos > clique em 'Saiba Mais' ou 'Quero ser aprovado' > preencha os dados e escolha a forma de pagamento. Após confirmação, o aluno recebe e-mail com dados de acesso.",
        tags: ["compra", "produto"],
      },
      {
        q: "Quais formas de pagamento são aceitas?",
        a: "Cartão de crédito (com parcelamento), boleto bancário e Pix à vista.",
        tags: ["pagamento", "cartão", "pix", "boleto"],
      },
      {
        q: "Os produtos têm prazo de garantia?",
        a: "Sim. Alguns produtos têm 7 dias e outros 14 dias de garantia. Sempre consulte o prazo específico do produto no site grupomedcof.com.br.",
        tags: ["garantia", "prazo"],
      },
      {
        q: "Posso trocar meu produto?",
        a: "Dentro do prazo de garantia, sim. Após esse período, é necessário consultar o suporte. A análise depende da disponibilidade e das políticas comerciais vigentes.",
        tags: ["troca", "produto", "garantia"],
      },
    ],
  },
  {
    id: "metodologia",
    label: "Metodologia & Estudo (Extensivo)",
    badge: "success",
    source: "KB",
    items: [
      {
        q: "Qual a ordem sugerida de estudo?",
        a: "CofExpress → Tarefa Mínima → Flashcards e Tarefas Bônus do AQFM. Além disso: flashcards de temas anteriores e revisões núcleo diariamente. Provas completas/simulados quinzenalmente ou semanalmente.",
        tags: ["ordem", "estudo", "metodologia"],
      },
      {
        q: "O que é AQFM?",
        a: "Acrônimo da metodologia: Aulas, Questões, Flashcards e Material de Apoio. É a base da plataforma de aulas MedCof.",
        tags: ["aqfm", "metodologia"],
      },
      {
        q: "Quando usar o DailyCof?",
        a: "Para complementar os estudos nos dias com pouco tempo disponível. Sugere o melhor aproveitamento do tempo disponível. Não é ideal usá-lo como única fonte de estudo — seguir os blocos é o principal.",
        tags: ["dailycof", "tempo", "estudo"],
      },
      {
        q: "Quais aulas priorizar no cronograma?",
        a: "Priorize as aulas diamante e verde.",
        tags: ["cronograma", "prioridade", "aulas"],
      },
      {
        q: "É recomendado resetar o qBank?",
        a: "Decisão pessoal. Em geral, é interessante manter as estatísticas do ano anterior para continuidade da análise de desempenho.",
        tags: ["reset", "qbank", "recomendação"],
      },
      {
        q: "Qual a diferença entre Tarefa Mínima e Tarefa Bônus?",
        a: "Tarefa Mínima é escolhida pelo especialista. Tarefa Bônus é selecionada pela plataforma com base nas provas do interesse do aluno. O ideal é realizar ambas.",
        tags: ["tarefa", "mínima", "bônus"],
      },
    ],
  },
  {
    id: "processo-suporte",
    label: "Processo de Suporte (Interno)",
    badge: "info",
    source: "SUPMED",
    items: [
      {
        q: "Como abrir um ticket no JSM?",
        a: "Acesse o Portal Suporte MedCof > clique em 'Abrir Ticket' > preencha: telefone, e-mail, resumo, descrição detalhada (o que ocorre, dispositivo, navegador, rede), categoria, urgência, impacto e anexe evidências.",
        tags: ["ticket", "jsm", "abrir"],
      },
      {
        q: "Quais são os status dos tickets e quando usar cada um?",
        a: "Ticket Aberto: aguardando atendimento. Em Atendimento: N1 assumiu o ticket. Aguardando TimeDev: escalonado ao N2. Em Desenvolvimento: equipe Dev atuando. Concluído: problema resolvido.",
        tags: ["status", "ticket", "fluxo"],
      },
      {
        q: "Quando escalar um ticket para o N2?",
        a: "Quando o problema não pode ser resolvido com base no conhecimento prévio (checklists, base de conhecimento, informativos). Forneça todas as informações e evidências ao escalar. Altere o status para 'Aguardando TimeDev'.",
        tags: ["escalonamento", "n1", "n2"],
      },
      {
        q: "Como funciona a comunicação entre N1 e N2?",
        a: "Toda comunicação interna entre equipes DEVE ocorrer pelos comentários do ticket no JSM. O contato com o aluno é feito exclusivamente via Infobip. Nunca comunique decisões fora do ticket.",
        tags: ["comunicação", "infobip", "jsm", "comentários"],
      },
      {
        q: "Como os tickets mudam de fila automaticamente?",
        a: "De 'Em Atendimento' → 'Aguardando TimeDev': ticket sai da fila N1 e entra na fila N2. De 'Aguardando TimeDev' → 'Ticket Aberto': ticket sai da fila N2 e volta para N1 para finalização.",
        tags: ["fila", "automático", "transição"],
      },
      {
        q: "O que registrar na nota de resolução ao concluir um ticket?",
        a: "Registre o que foi realizado para resolver o problema. Inclua evidências se necessário. Se a solução for relevante, sugira sua inclusão na base de conhecimento.",
        tags: ["resolução", "nota", "conclusão"],
      },
    ],
  },
];

const CATEGORY_OPTIONS = [
  { value: "all", label: "Todas as categorias" },
  ...ALL_CATEGORIES.map((c) => ({ value: c.id, label: c.label })),
];

export default function SuporteFAQCompleto() {
  const { tokens } = useHostTheme();
  const [selectedCategory, setSelectedCategory] = useCanvasState<string>("all");

  const filteredCategories =
    selectedCategory === "all"
      ? ALL_CATEGORIES
      : ALL_CATEGORIES.filter((c) => c.id === selectedCategory);

  const totalQuestions = ALL_CATEGORIES.reduce((acc, c) => acc + c.items.length, 0);
  const totalCategories = ALL_CATEGORIES.length;

  return (
    <Stack gap={24} style={{ padding: "24px", maxWidth: "1300px", margin: "0 auto" }}>
      <Text tone="secondary" size="small">Gerado em 19/05/2026 14:15</Text>
      <Stack gap={4}>
        <H1>FAQ Completo — Suporte MedCof</H1>
        <Text tone="secondary" size="small">
          Consolidado de todos os espaços do Confluence: GateKeeper · Base de Conhecimento (KB) · Suporte MedCof (SUPMED) · {totalCategories} categorias · {totalQuestions} perguntas
        </Text>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value={String(totalQuestions)} label="Total de perguntas" />
        <Stat value={String(totalCategories)} label="Categorias" />
        <Stat value="3" label="Espaços cobertos" tone="info" />
        <Stat value="100%" label="Cobertura dos espaços relevantes" tone="success" />
      </Grid>

      <Callout
        tone="info"
        title="Como usar este FAQ"
        message="Use o filtro abaixo para focar em uma categoria específica durante o atendimento. Cada pergunta inclui a fonte original no Confluence para referência. Itens em vermelho indicam ações irreversíveis — confirme antes de orientar o aluno."
      />

      <Row gap={12} style={{ alignItems: "center" }}>
        <Text size="small" tone="secondary">Filtrar por categoria:</Text>
        <Select
          value={selectedCategory}
          onChange={setSelectedCategory}
          options={CATEGORY_OPTIONS}
        />
      </Row>

      <Divider />

      {filteredCategories.map((category, index) => (
        <Stack key={category.id} gap={16}>
          <Row gap={8} style={{ alignItems: "center" }}>
            <H2>{category.label}</H2>
            {category.badge && (
              <Pill label={category.badge === "danger" ? "IRREVERSÍVEL" : category.badge === "warning" ? "Atenção" : ""} tone={category.badge} size="small" />
            )}
            <Pill label={`${category.items.length} perguntas`} size="small" />
            <Text tone="secondary" size="small">· Fonte: {category.source}</Text>
          </Row>
          <Table
            headers={["Pergunta", "Resposta"]}
            rows={category.items.map((item) => [item.q, item.a])}
            columnWidths={["35%", "65%"]}
            rowTone={category.badge === "danger" ? category.items.map(() => "danger" as const) : undefined}
          />
          {index < filteredCategories.length - 1 && <Divider />}
        </Stack>
      ))}

      <Spacer size={8} />
      <Text tone="secondary" size="small">
        Fontes: Confluence · GateKeeper (444006404) · Base de Conhecimento KB (412778499) · Suporte MedCof SUPMED (333774856) · medcof-team.atlassian.net · Extraído em 19/05/2026
      </Text>
    </Stack>
  );
}
