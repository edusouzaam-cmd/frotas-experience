import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  GraduationCap,
  MapPin,
  Menu,
  MessageCircle,
  Play,
  Target,
  Truck,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { Pricing } from "@/components/frotas/Pricing";
import { event } from "@/data/event";
import modules from "@/data/course-modules.json";
import "@/frotas.css";

const description =
  "Formação presencial em Gestão da Manutenção de Frotas e Máquinas Pesadas. 27, 28 e 29 de janeiro de 2027, em Brasília. 80h de formação, 7 módulos e 2 certificados.";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Frotas Experience | 27 a 29 de janeiro de 2027 · Brasília" },
      { name: "description", content: description },
      { property: "og:title", content: "Frotas Experience · Brasília 2027" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#111310" },
    ],
    links: [
      {
        rel: "preload",
        href: "/fonts/poppins-600.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
  }),
  component: Index,
});
const nav = [
  ["A experiência", "experiencia"],
  ["Conteúdo", "conteudo"],
  ["Professor", "professor"],
  ["Investimento", "investimento"],
] as const;
const outcomes = [
  {
    icon: Target,
    title: "Planeje antes da falha.",
    text: "Estruture planos preventivos, inspeções e rotinas de manutenção para reduzir os imprevistos da operação.",
  },
  {
    icon: BarChart3,
    title: "Decida com indicadores.",
    text: "Transforme MTBF, MTTR, disponibilidade e custos em informação para decisões mais consistentes.",
  },
  {
    icon: Wrench,
    title: "Organize a execução.",
    text: "Conecte planejamento, recursos e prioridades em uma programação estruturada para a sua operação.",
  },
];
const audience = [
  {
    icon: Wrench,
    title: "Quem faz a manutenção acontecer",
    text: "Técnicos, analistas, planejadores e programadores que querem estruturar processos e evoluir na carreira.",
  },
  {
    icon: Truck,
    title: "Quem lidera pessoas e operações",
    text: "Engenheiros, supervisores e gestores que buscam conectar disponibilidade, custos e resultados.",
  },
  {
    icon: GraduationCap,
    title: "Quem está construindo o próximo passo",
    text: "Estudantes e profissionais que querem ampliar sua base em gestão da manutenção de frotas.",
  },
];
const moduleNames = [
  "Fundamentos da gestão de frotas",
  "Estruturação do sistema de gestão",
  "Planejamento da manutenção",
  "Aprovisionamento e recursos",
  "Programação da manutenção",
  "Indicadores e controle",
  "Custos e ciclo de vida dos ativos",
];
const faq = [
  [
    "Quando e onde será o encontro?",
    `Nos dias ${event.date}, em Brasília–DF, no auditório do Ed. E-Business, em Águas Claras. ${event.address}`,
  ],
  [
    "Preciso ter experiência para participar?",
    "A formação atende profissionais de manutenção que querem estruturar ou aprimorar sua gestão: planejadores, programadores, analistas, técnicos, engenheiros, gestores e estudantes da área. Se tiver dúvidas sobre o conteúdo para o seu momento profissional, converse com nossa equipe.",
  ],
  [
    "Como funciona a carga horária e a certificação?",
    "São 20 horas presenciais e 60 horas de formação online, totalizando 80 horas. Você recebe dois certificados: um da etapa presencial e outro após concluir a etapa online.",
  ],
  [
    "O que está incluído na inscrição?",
    "A imersão presencial, a formação online com acesso vitalício, as ferramentas do curso, o grupo de alunos, o curso Líder 360 e o livro físico PCM — Planejamento e Controle da Manutenção Descomplicado.",
  ],
  [
    "Como funcionam os lotes e o pagamento?",
    "O primeiro lote vai de 26/10 a 22/11/2026; o segundo, de 23/11/2026 a 03/01/2027; e o terceiro, de 04/01 a 20/01/2027. As viradas ocorrem à meia-noite, no horário de Brasília. A compra é feita pela Hotmart. O parcelamento possui acréscimo, com o total indicado em cada lote e confirmado no checkout.",
  ],
  [
    "Posso inscrever uma equipe ou tirar dúvidas antes de comprar?",
    "Sim. Entre em contato pelo WhatsApp para receber orientação sobre inscrições de equipes, informações da formação e condições disponíveis. Nossa equipe ajuda você a escolher o próximo passo.",
  ],
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);
  return (
    <div className="frotas-page">
      <a className="skip-link" href="#principal">
        Pular para o conteúdo
      </a>
      <div className="announcement">
        <span className="status-dot" /> BRASÍLIA 2027 <span className="announcement-divider" /> 27,
        28 e 29 de janeiro{" "}
        <a href="#investimento">
          Confira as condições <ArrowUpRight size={13} />
        </a>
      </div>
      <header className="site-header">
        <div className="wrap nav-wrap">
          <a href="#principal" className="brand" aria-label="Frotas Experience, início">
            <img src="/images/logo.webp" alt="" width="54" height="54" />
            <span>
              FROTAS
              <span>
                EXPERIENCE<span className="brand-dot">.</span>
              </span>
            </span>
          </a>
          <nav
            className={menuOpen ? "main-nav is-open" : "main-nav"}
            aria-label="Navegação principal"
            id="main-nav"
          >
            {nav.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
          <a
            href="#investimento"
            className="button button-gold nav-cta"
            onClick={() => setMenuOpen(false)}
          >
            Quero participar <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="principal">
        <section className="hero" aria-labelledby="hero-title">
          <img
            className="hero-image"
            src="/images/hero.webp"
            width="1500"
            height="844"
            alt="Profissional em uma operação de frotas com máquinas pesadas"
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="wrap hero-content">
            <div className="hero-copy">
              <span className="eyebrow light">
                <span className="eyebrow-line" /> CERTIFICAÇÃO PRESENCIAL
              </span>
              <h1 id="hero-title">
                Sua frota em
                <br />
                outro nível
                <br />
                <em>de gestão.</em>
              </h1>
              <p className="hero-lead">
                Gestão da Manutenção de Frotas
                <br className="desktop-break" /> e Máquinas Pesadas, na prática.
              </p>
              <p className="hero-description">
                Três dias para conectar conhecimento, pessoas e ferramentas — e transformar a forma
                como você planeja, controla e lidera a manutenção.
              </p>
              <div className="hero-event">
                <span>
                  <CalendarDays size={18} />
                  27, 28 e 29 jan. 2027
                </span>
                <span>
                  <MapPin size={18} />
                  Brasília · DF
                </span>
              </div>
              <div className="hero-actions">
                <a href="#investimento" className="button button-gold">
                  Quero dar o próximo passo <ArrowUpRight size={19} />
                </a>
                <a href="#conteudo" className="text-link">
                  Explorar o conteúdo <ArrowRight size={16} />
                </a>
              </div>
              <div className="hero-signature">
                <span className="signature-line" />
                <span>
                  UMA EXPERIÊNCIA <strong>ENGETELES</strong>
                </span>
              </div>
            </div>
          </div>
          <div className="hero-caption">
            <span>27—29 JAN</span> CONHECIMENTO QUE MOVIMENTA SUA CARREIRA
          </div>
        </section>
        <section className="numbers-band" aria-label="A formação em números">
          <div className="wrap numbers-grid">
            {[
              ["03", "dias de imersão", "presencial em Brasília"],
              ["80h", "de formação", "presencial + online"],
              ["07", "módulos completos", "da estratégia à execução"],
              ["02", "certificados", "para o seu próximo passo"],
            ].map(([number, label, note]) => (
              <div key={number}>
                <strong>{number}</strong>
                <p>
                  {label}
                  <span>{note}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="section experience-section" id="experiencia">
          <div className="wrap">
            <div className="section-heading split-heading">
              <div>
                <span className="eyebrow">DA OPERAÇÃO À ESTRATÉGIA</span>
                <h2>
                  A manutenção não pode
                  <br />
                  viver no <em>modo emergência.</em>
                </h2>
              </div>
              <p>
                Mais do que apagar incêndios: desenvolva uma visão de gestão para antecipar
                problemas, organizar processos e construir uma operação mais confiável.
              </p>
            </div>
            <div className="outcomes-grid">
              {outcomes.map(({ icon: Icon, title, text }, i) => (
                <article className="outcome" key={title}>
                  <div className="outcome-top">
                    <Icon size={26} strokeWidth={1.5} />
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
            <div className="sector-strip">
              <span>CONHECIMENTO QUE SE APLICA A</span>
              <div>
                {[
                  "Agronegócio",
                  "Mineração",
                  "Construção civil",
                  "Florestal",
                  "Frotas de apoio",
                  "Frotas comerciais",
                ].map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section immersion-section">
          <div className="wrap immersion-grid">
            <div className="photo-composition">
              <img
                className="photo-main"
                src="/images/aula.webp"
                alt="Jhonata Teles explicando conceitos durante uma aula presencial"
                width="900"
                height="1350"
                loading="lazy"
                decoding="async"
              />
              <img
                className="photo-secondary"
                src="/images/turma.webp"
                alt="Participantes em uma atividade do curso"
                width="900"
                height="1350"
                loading="lazy"
                decoding="async"
              />
              <div className="photo-note">
                <Users size={21} />
                <span>
                  Trocas reais.
                  <br />
                  <strong>Aprendizado que fica.</strong>
                </span>
              </div>
            </div>
            <div className="immersion-copy">
              <span className="eyebrow">VOCÊ VAI VIVER ESSA EXPERIÊNCIA</span>
              <h2>
                Saia da rotina.
                <br />
                <em>Amplie sua visão.</em>
              </h2>
              <p>
                Esteja na mesma sala que profissionais que enfrentam os desafios da manutenção.
                Traga suas dúvidas, discuta cenários e conecte cada conceito à sua realidade.
              </p>
              <ul className="editorial-list">
                {[
                  [
                    "Aprenda com aplicação",
                    "Dos fundamentos aos indicadores: veja como estruturar a gestão da manutenção de ponta a ponta.",
                  ],
                  [
                    "Conecte-se com a área",
                    "Compartilhe experiências com profissionais de diferentes segmentos de frotas e máquinas pesadas.",
                  ],
                  [
                    "Continue depois do encontro",
                    "Revise o conteúdo na formação online e leve ferramentas para apoiar sua evolução profissional.",
                  ],
                ].map(([title, text], i) => (
                  <li key={title}>
                    <span>0{i + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section audience-section">
          <div className="wrap audience-grid">
            <div>
              <span className="eyebrow light">É PARA O SEU PRÓXIMO MOMENTO</span>
              <h2>
                Para quem quer
                <br />
                <em>assumir a direção.</em>
              </h2>
              <p>
                Se você quer sair do improviso e construir uma manutenção orientada por processos,
                esta formação conversa com o seu desafio.
              </p>
            </div>
            <div className="audience-list">
              {audience.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <Icon size={24} strokeWidth={1.5} />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                  <ArrowUpRight size={20} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section curriculum-section" id="conteudo">
          <div className="wrap curriculum-grid">
            <div className="curriculum-intro">
              <span className="eyebrow">UMA JORNADA COMPLETA</span>
              <h2>
                Do primeiro plano
                <br />à decisão
                <br />
                <em>estratégica.</em>
              </h2>
              <p>
                Sete módulos que conectam os fundamentos da manutenção ao controle de custos e ao
                ciclo de vida dos ativos.
              </p>
              <div className="curriculum-facts">
                <span>
                  <Clock3 size={19} />
                  <strong>20h</strong> presenciais
                </span>
                <span>
                  <Play size={19} />
                  <strong>60h</strong> online
                </span>
              </div>
              <a className="text-link dark-link" href="#investimento">
                Veja o que está incluído <ArrowRight size={17} />
              </a>
            </div>
            <div className="module-list">
              {modules.map((module, i) => (
                <details className="module" key={module.number} open={i === 0}>
                  <summary>
                    <span className="module-index">{module.number}</span>
                    <span>
                      <small>MÓDULO {module.number}</small>
                      <h3>{moduleNames[i]}</h3>
                    </span>
                    <ChevronDown size={21} />
                  </summary>
                  <div className="module-content">
                    <ul>
                      {module.topics.map((topic) => (
                        <li key={topic}>{topic.replace(/^\d+\s*[–-]\s*/, "")}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section professor-section" id="professor">
          <div className="wrap professor-grid">
            <div className="professor-image">
              <img
                src="/images/professor.webp"
                alt="Jhonata Teles, professor do Frotas Experience"
                width="900"
                height="900"
                loading="lazy"
                decoding="async"
              />
              <span className="photo-label">SEU PROFESSOR · SEU PARCEIRO DE EVOLUÇÃO</span>
            </div>
            <div className="professor-copy">
              <span className="eyebrow">EXPERIÊNCIA PARA COMPARTILHAR</span>
              <h2>
                Aprenda com
                <br />
                <em>Jhonata Teles.</em>
              </h2>
              <p className="lead">
                Conhecimento técnico e vivência de gestão, juntos na mesma sala.
              </p>
              <p>
                Autor de <strong>PCM — Planejamento e Controle da Manutenção Descomplicado</strong>{" "}
                e de outros livros na área. Atua como consultor em gestão da manutenção e na
                formação de profissionais no Brasil e no exterior.
              </p>
              <div className="professor-facts">
                <div>
                  <strong>30 mil+</strong>
                  <span>profissionais capacitados*</span>
                </div>
                <div>
                  <strong>101</strong>
                  <span>países alcançados*</span>
                </div>
              </div>
              <p className="source-note">
                *Trajetória informada pela ENGETELES no material do curso.
              </p>
              <div className="teacher-note">
                <Award size={25} />
                <p>
                  Especialista certificado pela ABRAMAN em disciplinas de gestão da manutenção e de
                  ativos, conforme a apresentação do curso.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section bonus-section">
          <div className="wrap">
            <div className="section-heading centered">
              <span className="eyebrow">O ENCONTRO É SÓ O COMEÇO</span>
              <h2>
                Mais repertório.
                <br />
                <em>Mais possibilidades.</em>
              </h2>
              <p>
                Recursos incluídos na inscrição para aprofundar o aprendizado além dos três dias
                presenciais.
              </p>
            </div>
            <div className="bonus-grid">
              <article className="bonus-card">
                <div className="bonus-art leader-art">
                  <img
                    src="/images/lider.webp"
                    alt="Líder 360"
                    width="450"
                    height="162"
                    loading="lazy"
                  />
                </div>
                <span className="small-label">BÔNUS 01 · LIDERANÇA</span>
                <h3>Curso Líder 360</h3>
                <p>
                  Desenvolva sua atuação como líder e a forma de conduzir pessoas. São 27 aulas
                  distribuídas em 7 módulos.
                </p>
                <span className="included-tag">
                  <Check size={14} /> Incluído na sua inscrição
                </span>
              </article>
              <article className="bonus-card">
                <div className="bonus-art online-art">
                  <div>
                    <GraduationCap size={40} strokeWidth={1.3} />
                    <strong>
                      FORMAÇÃO
                      <br />
                      QUE CONTINUA.
                    </strong>
                    <span>GESTÃO DA MANUTENÇÃO</span>
                  </div>
                </div>
                <span className="small-label">BÔNUS 02 · APROFUNDAMENTO</span>
                <h3>Formação online em frotas</h3>
                <p>
                  Acesso vitalício a 60 horas de conteúdo para revisar conceitos e continuar
                  estudando no seu ritmo.
                </p>
                <span className="included-tag">
                  <Check size={14} /> Incluído na sua inscrição
                </span>
              </article>
              <article className="bonus-card">
                <div className="bonus-art book-art">
                  <img
                    src="/images/livro.webp"
                    alt="Livro PCM Descomplicado, quarta edição"
                    width="450"
                    height="600"
                    loading="lazy"
                  />
                </div>
                <span className="small-label">BÔNUS 03 · CONSULTA</span>
                <h3>Livro físico PCM Descomplicado</h3>
                <p>
                  A 4ª edição do livro de Jhonata Teles para acompanhar sua jornada de planejamento
                  e controle da manutenção.
                </p>
                <span className="included-tag">
                  <Check size={14} /> Incluído na sua inscrição
                </span>
              </article>
            </div>
          </div>
        </section>

        <section className="section gallery-section">
          <div className="wrap">
            <div className="section-heading split-heading">
              <div>
                <span className="eyebrow">CONEXÕES QUE SAEM DO PAPEL</span>
                <h2>
                  Conhecimento se constrói
                  <br />
                  <em>com gente.</em>
                </h2>
              </div>
              <p>
                Um encontro para aprender, trocar experiências e olhar para os desafios da operação
                com novas perspectivas.
              </p>
            </div>
            <div className="gallery-grid">
              {[
                ["turma", "Troca de experiências"],
                ["pratica", "Conteúdo em sala"],
                ["encontro", "Conexões profissionais"],
              ].map(([image, caption]) => (
                <figure key={image}>
                  <img
                    src={`/images/${image}.webp`}
                    alt={caption}
                    width="900"
                    height="1350"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>
                    {caption}
                    <ArrowUpRight size={18} />
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="video-block">
              <a
                href="https://www.youtube.com/watch?v=ybWpETIBOo4"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Veja relatos de participantes da PCM Summit no YouTube (abre em nova aba)"
              >
                <span className="play-circle">
                  <Play size={23} fill="currentColor" />
                </span>
                <span>
                  <small>OUTRAS EXPERIÊNCIAS ENGETELES · YOUTUBE</small>
                  <strong>Relatos de participantes da PCM Summit</strong>
                </span>
                <ArrowUpRight size={22} />
              </a>
            </div>
          </div>
        </section>
        <Pricing />

        <section className="section location-section" id="local">
          <div className="wrap location-grid">
            <div className="location-image">
              <img
                src="/images/local.webp"
                alt="Edifício E-Business em Águas Claras, local do curso"
                width="1000"
                height="716"
                loading="lazy"
                decoding="async"
              />
              <span className="image-pill">
                <MapPin size={15} /> BRASÍLIA · DF
              </span>
            </div>
            <div>
              <span className="eyebrow">NOSSO PONTO DE ENCONTRO</span>
              <h2>
                Três dias para
                <br />
                <em>sair do lugar.</em>
              </h2>
              <p className="location-date">
                <CalendarDays size={21} /> {event.date}
              </p>
              <h3>{event.venue}</h3>
              <p>{event.address}</p>
              <div className="location-features">
                <span>
                  <Check size={16} /> Região com hotéis e serviços
                </span>
                <span>
                  <Check size={16} /> Próximo ao metrô Águas Claras
                </span>
              </div>
              <a
                className="text-link dark-link"
                href="https://www.google.com/maps/search/?api=1&query=Edificio+E-Business+Aguas+Claras+Brasilia+Av+Pau+Brasil+6"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver localização no mapa <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="duvidas">
          <div className="wrap faq-grid">
            <div>
              <span className="eyebrow">ANTES DO PRÓXIMO PASSO</span>
              <h2>
                Vamos tirar
                <br />
                <em>suas dúvidas?</em>
              </h2>
              <p>Conte com nossa equipe para decidir com todas as informações.</p>
              <a
                className="button button-outline"
                href={event.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} /> Conversar com a equipe <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="faq-list">
              {faq.map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <ChevronDown size={19} />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="final-cta">
          <div className="wrap">
            <span className="eyebrow light">MOVIMENTE O SEU PRÓXIMO CAPÍTULO</span>
            <h2>
              Uma nova visão de gestão.
              <br />
              <em>Começa com você.</em>
            </h2>
            <a href="#investimento" className="button button-gold">
              Conhecer os lotes <ArrowUpRight size={19} />
            </a>
            <p>27, 28 e 29 de janeiro de 2027 · Brasília/DF</p>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="wrap footer-top">
          <a href="#principal" className="brand">
            <img
              src="/images/logo.webp"
              alt="Frotas Experience"
              width="48"
              height="48"
              loading="lazy"
            />
            <span>
              FROTAS<span>EXPERIENCE.</span>
            </span>
          </a>
          <div>
            <strong>ENGETELES</strong>
            <p>
              Capacitação Profissional e Consultoria
              <br />
              CNPJ: 23.607.144/0001-06
            </p>
          </div>
          <div>
            <span>VAMOS CONVERSAR?</span>
            <a href="mailto:contato@engeteles.com.br">
              contato@engeteles.com.br <ArrowUpRight size={15} />
            </a>
            <a href={event.whatsapp} target="_blank" rel="noopener noreferrer">
              Atendimento pelo WhatsApp <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <p>© 2026 ENGETELES. Todos os direitos reservados.</p>
          <span>Conhecimento que movimenta.</span>
        </div>
      </footer>
      <a
        className="whatsapp-float"
        href={event.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a equipe pelo WhatsApp (abre em nova aba)"
      >
        <MessageCircle size={24} />
      </a>
      <div className="mobile-booking">
        <div>
          <small>BRASÍLIA · JANEIRO 2027</small>
          <strong>Seu próximo passo começa aqui.</strong>
        </div>
        <a className="button button-gold" href="#investimento">
          Ver lotes <ArrowUpRight size={17} />
        </a>
      </div>
    </div>
  );
}
