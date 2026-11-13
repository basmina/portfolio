"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  AudioLines,
  BriefcaseBusiness,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Mic,
  Pause,
  Play,
  RotateCcw,
  Settings2,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  Zap,
} from "lucide-react";

type Id =
  | "about"
  | "skills"
  | "projects"
  | "agents"
  | "architecture"
  | "experience"
  | "education"
  | "contact";
const sections: { id: Id; label: string; speech: string }[] = [
  {
    id: "about",
    label: "About me",
    speech:
      "First stop, About Me. I'm Zamruth Begum, a Technical Lead and Angular specialist with twelve years of experience building enterprise applications. I have also served as a Scrum Master and Product Owner, helping connect engineering delivery with team and product priorities.",
  },
  {
    id: "skills",
    label: "Skills",
    speech:
      "Next, my technical toolkit. My strongest area is frontend engineering with Angular, TypeScript, RxJS, NgRx and modern UI architecture. I also work with Node.js, REST APIs, authentication, testing, and cloud delivery.",
  },
  {
    id: "projects",
    label: "Projects",
    speech:
      "Here are a few projects. DoIt Coach is my deployed AI accountability application, built with Node.js, Express, and the Claude API. I also have hands-on learning projects with Spring Boot, PostgreSQL, and Prisma.",
  },
  {
    id: "agents",
    label: "AI agents",
    speech:
      "I also design personalized AI agents around real workflows. Try my live goal planner: choose an audience to receive a professional, tailored three-step plan and one clear action to start right away.",
  },
  {
    id: "architecture",
    label: "Architecture",
    speech:
      "This is how I think about frontend architecture: clear feature boundaries, predictable state, reusable UI, secure API integration, performance, and quality checks. This is a conceptual architecture, not a client system diagram.",
  },
  {
    id: "experience",
    label: "Experience",
    speech:
      "I've worked across cloud governance, banking, telecom, and digital services. At CoreStack, I helped improve application performance by thirty percent and reduced dashboard API calls by sixty percent. Across my roles, I've served as a Technical Lead, Scrum Master, and Product Owner, and mentored fifteen engineers.",
  },
  {
    id: "education",
    label: "Education",
    speech:
      "A little about my education and certifications. I hold a Bachelor of Engineering in Computer Science, am a Certified ScrumMaster, and have completed Cambridge English BEC Vantage.",
  },
  {
    id: "contact",
    label: "Contact",
    speech:
      "Thanks for taking the tour. If you'd like to discuss Angular leadership, frontend architecture, or full-stack opportunities, I'd love to hear from you.",
  },
];

function Chibi() {
  return <img className="chibi-image" src="/images/me.png" alt="3D chibi portfolio guide" />;
}
function Stat({ v, t }: { v: string; t: string }) {
  return (
    <motion.div className="stat" whileHover={{ y: -4 }}>
      <b>{v}</b>
      <span>{t}</span>
    </motion.div>
  );
}
function Skill({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <motion.article className="skill" whileHover={{ y: -5 }}>
      <div className="skill-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </motion.article>
  );
}
function Job({ title, date, items }: { title: string; date: string; items: string[] }) {
  return (
    <article className="job">
      <div>
        <h3>{title}</h3>
        <time>{date}</time>
      </div>
      <ul>
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </article>
  );
}
function Project({
  tag,
  title,
  stack,
  items,
  links,
  note,
}: {
  tag: string;
  title: string;
  stack: string;
  items: string[];
  links?: [string, string][];
  note?: string;
}) {
  return (
    <motion.article className="project" whileHover={{ y: -5 }}>
      <div className="project-art">
        <div className="mock">
          <div className="dots">
            <i />
            <i />
            <i />
          </div>
          <div className="bars">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <div className="project-body">
        <small>{tag}</small>
        <h3>{title}</h3>
        <label>{stack}</label>
        <ul>
          {items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        {note && <p>{note}</p>}
        {links?.map(([a, b]) => (
          <a className="project-link" href={b} key={b} target="_blank" rel="noreferrer">
            {a} ↗
          </a>
        ))}
      </div>
    </motion.article>
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export default function Portfolio() {
  const [theme, setTheme] = useState("light"),
    [accent, setAccent] = useState("#7c3aed"),
    [accent2, setAccent2] = useState("#a855f7"),
    [radius, setRadius] = useState(22),
    [font, setFont] = useState("Manrope"),
    [card, setCard] = useState("soft"),
    [motionOn, setMotionOn] = useState(true),
    [hidden, setHidden] = useState<Id[]>([]),
    [editor, setEditor] = useState(false),
    [guide, setGuide] = useState(true),
    [muted, setMuted] = useState(false),
    [paused, setPaused] = useState(false),
    [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]),
    [selectedVoiceURI, setSelectedVoiceURI] = useState(""),
    [bubble, setBubble] = useState(true),
    [active, setActive] = useState<Id>("about"),
    [started, setStarted] = useState(false),
    [mobile, setMobile] = useState(false),
    [guideTop, setGuideTop] = useState(120),
    [agentGoal, setAgentGoal] = useState(""),
    [agentAudience, setAgentAudience] = useState("Individuals"),
    [agentSteps, setAgentSteps] = useState<string[]>([]),
    [agentNextAction, setAgentNextAction] = useState(""),
    [agentError, setAgentError] = useState(""),
    [agentLoading, setAgentLoading] = useState(false),
    [agentAttemptsRemaining, setAgentAttemptsRemaining] = useState<number | null>(null),
    [agentUsingLocalAttemptStorage, setAgentUsingLocalAttemptStorage] = useState(false),
    [agentReady, setAgentReady] = useState(false),
    [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const idx = sections.findIndex((s) => s.id === active),
    current = sections[idx] || sections[0],
    selectedVoice = voices.find((voice) => voice.voiceURI === selectedVoiceURI),
    visible = (id: Id) => !hidden.includes(id);
  useEffect(() => {
    try {
      const x = localStorage.getItem("zamruth-portfolio");
      if (x) {
        const s = JSON.parse(x);
        setTheme(s.theme || "light");
        setAccent(s.accent === "#087f8c" ? "#7c3aed" : s.accent || "#7c3aed");
        setAccent2(s.accent2 === "#7665d8" ? "#a855f7" : s.accent2 || "#a855f7");
        setRadius(s.radius || 22);
        setFont(s.font || "Manrope");
        setCard(s.card || "soft");
        setMotionOn(s.motionOn ?? true);
        setHidden(Array.isArray(s.hidden) ? s.hidden : []);
        setSelectedVoiceURI(typeof s.voiceURI === "string" ? s.voiceURI : "");
      }
    } catch (error) {
      console.error("Failed to load saved portfolio preferences.", error);
    } finally {
      setPreferencesLoaded(true);
    }
  }, []);
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    try {
      const synthesis = window.speechSynthesis;
      const updateVoices = () => {
        try {
          setVoices(synthesis.getVoices());
        } catch {}
      };
      updateVoices();
      synthesis.addEventListener?.("voiceschanged", updateVoices);
      return () => synthesis.removeEventListener?.("voiceschanged", updateVoices);
    } catch {}
  }, []);
  useEffect(() => {
    let active = true;
    const initializeAgent = async () => {
      try {
        const response = await fetch("/api/agent-plan", { cache: "no-store" });
        const payload: unknown = await response.json();
        if (!response.ok) {
          const apiError = isRecord(payload) && isRecord(payload.error) ? payload.error : null;
          throw new Error(
            apiError && typeof apiError.message === "string"
              ? apiError.message
              : "The AI planner is temporarily unavailable.",
          );
        }
        if (!isRecord(payload) || typeof payload.remainingAttempts !== "number") {
          throw new Error("The AI planner returned an unreadable attempt limit.");
        }
        if (active) {
          setAgentAttemptsRemaining(payload.remainingAttempts);
          setAgentUsingLocalAttemptStorage(payload.localAttemptStorage === true);
          setAgentReady(true);
        }
      } catch (error) {
        if (active) {
          setAgentError(
            error instanceof Error ? error.message : "The AI planner is temporarily unavailable.",
          );
        }
      }
    };
    void initializeAgent();
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    if (
      selectedVoiceURI &&
      voices.length &&
      !voices.some((voice) => voice.voiceURI === selectedVoiceURI)
    ) {
      setSelectedVoiceURI("");
    }
  }, [selectedVoiceURI, voices]);
  useEffect(() => {
    if (!preferencesLoaded) return;
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.card = card;
    document.documentElement.dataset.motion = motionOn ? "on" : "off";
    document.documentElement.style.setProperty("--accent", accent);
    document.documentElement.style.setProperty("--accent2", accent2);
    document.documentElement.style.setProperty("--radius", radius + "px");
    document.documentElement.style.setProperty("--font-head", font);
    try {
      localStorage.setItem(
        "zamruth-portfolio",
        JSON.stringify({
          theme,
          accent,
          accent2,
          radius,
          font,
          card,
          motionOn,
          hidden,
          voiceURI: selectedVoiceURI,
        }),
      );
    } catch {
      // Storage blocked or full (private mode, in-app browsers); ignore.
    }
  }, [
    theme,
    accent,
    accent2,
    radius,
    font,
    card,
    motionOn,
    hidden,
    selectedVoiceURI,
    preferencesLoaded,
  ]);
  useEffect(() => {
    if (!guide) return;
    const io = new IntersectionObserver(
      (es) => {
        const e = es
          .filter((x) => x.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (e && sections.some((s) => s.id === e.target.id)) setActive(e.target.id as Id);
      },
      { rootMargin: "-25% 0px -45% 0px", threshold: [0.1, 0.3, 0.6] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el && visible(s.id)) io.observe(el);
    });
    return () => io.disconnect();
  }, [guide, paused, hidden]);
  useEffect(() => {
    if (!guide || muted || paused || !started) return;
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(current.speech);
    if (selectedVoice) u.voice = selectedVoice;
    u.rate = 0.96;
    u.pitch = 1.08;
    u.onstart = () => setBubble(true);
    u.onend = () => {
      const nextSection = sections[idx + 1];
      if (nextSection) {
        setActive(nextSection.id);
        setBubble(true);
        document
          .getElementById(nextSection.id)
          ?.scrollIntoView({ behavior: motionOn ? "smooth" : "auto", block: "start" });
      }
    };
    window.speechSynthesis.speak(u);
    setBubble(true);
    return () => window.speechSynthesis.cancel();
  }, [active, guide, muted, paused, started, selectedVoice, motionOn]);
  useEffect(
    () => () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    },
    [],
  );
  useEffect(() => {
    if (!guide) return;
    const target = document.getElementById(active);
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const top = Math.max(96, Math.min(window.innerHeight - 230, rect.top + 12));
    setGuideTop(top);
  }, [active, guide]);
  const jump = (id: Id) => {
    setActive(id);
    setStarted(true);
    setPaused(false);
    setBubble(true);
    document.getElementById(id)?.scrollIntoView({ behavior: motionOn ? "smooth" : "auto" });
  };
  const read = () => {
    setStarted(true);
    setPaused(false);
    setMuted(false);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(current.speech);
      if (selectedVoice) u.voice = selectedVoice;
      u.rate = 0.96;
      window.speechSynthesis.speak(u);
    }
  };
  const next = () => jump(sections[(idx + 1) % sections.length].id),
    prev = () => jump(sections[(idx - 1 + sections.length) % sections.length].id);
  const reset = () => {
    setTheme("light");
    setAccent("#7c3aed");
    setAccent2("#a855f7");
    setRadius(22);
    setFont("Manrope");
    setCard("soft");
    setMotionOn(true);
    setHidden([]);
    setSelectedVoiceURI("");
  };
  const createAgentPlan = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!agentReady || agentAttemptsRemaining === 0) return;
    const goal = agentGoal.trim();
    if (goal.length < 5) {
      setAgentError("Describe a goal in at least five characters.");
      return;
    }
    if (goal.length > 350) {
      setAgentError("Keep your goal under 350 characters.");
      return;
    }

    setAgentError("");
    setAgentSteps([]);
    setAgentNextAction("");
    setAgentLoading(true);
    try {
      const response = await fetch("/api/agent-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal, audience: agentAudience }),
      });

      let payload: unknown;
      try {
        payload = await response.json();
      } catch (error) {
        if (error instanceof SyntaxError) {
          setAgentError("The agent returned an unreadable response. Please try again.");
          return;
        }
        throw error;
      }

      if (isRecord(payload) && typeof payload.remainingAttempts === "number") {
        setAgentAttemptsRemaining(payload.remainingAttempts);
      }

      if (!response.ok) {
        const apiError = isRecord(payload) && isRecord(payload.error) ? payload.error : null;
        setAgentError(
          apiError && typeof apiError.message === "string"
            ? apiError.message
            : "The agent could not make a plan. Please try again.",
        );
        return;
      }

      const steps =
        isRecord(payload) && Array.isArray(payload.steps)
          ? payload.steps
              .filter((step): step is string => typeof step === "string" && Boolean(step.trim()))
              .map((step) => step.trim())
          : [];
      if (
        steps.length !== 3 ||
        !isRecord(payload) ||
        !Array.isArray(payload.steps) ||
        payload.steps.length !== 3 ||
        typeof payload.nextAction !== "string" ||
        !payload.nextAction.trim()
      ) {
        setAgentError("The agent returned an incomplete plan. Please try again.");
        return;
      }
      setAgentSteps(steps);
      setAgentNextAction(payload.nextAction.trim());
    } catch (error) {
      if (error instanceof TypeError) {
        setAgentError("Could not reach the agent service. Check your connection and try again.");
      } else if (error instanceof Error) {
        setAgentError(error.message);
      } else {
        throw error;
      }
    } finally {
      setAgentLoading(false);
    }
  };

  return (
    <div className="site">
      <nav className="nav">
        <a className="brand" href="#home">
          ZAMRUTH<span>.</span>
        </a>
        <div className={"navlinks " + (mobile ? "show" : "")}>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#agents">AI agents</a>
          <a href="#experience">Experience</a>
        </div>
        <div className="navright">
          <button className="customize" onClick={() => setEditor(true)}>
            <Settings2 size={16} /> Customize
          </button>
          <a className="navcta" href="#contact">
            Let&apos;s talk ↗
          </a>
          <button className="menubtn" onClick={() => setMobile(!mobile)}>
            <Menu />
          </button>
        </div>
      </nav>

      <main>
        <header className="hero" id="home">
          <div className="hero-inner">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="available">
                <i /> OPEN TO MEANINGFUL OPPORTUNITIES
              </div>
              <p className="overline">
                TECHNICAL LEAD · ANGULAR SPECIALIST · PERSONALIZED AI AGENT BUILDER
              </p>
              <h1>
                Thoughtful products.
                <br />
                <span>Purposeful AI.</span>
              </h1>
              <p className="intro">
                I&apos;m Zamruth, a Technical Lead with 12 years of experience building scalable
                Angular applications. Now I bring that experience to personalized AI agents—shaped
                around real workflows, thoughtful guardrails, and people.
              </p>
              <div className="actions">
                <a className="btn dark" href="#projects">
                  Explore my work ↗
                </a>
                <a className="btn light" href="#agents">
                  Explore AI agents ↗
                </a>
              </div>
              <div className="meta">
                <span>
                  <MapPin size={15} /> Chennai, India
                </span>
                <a
                  href="https://www.linkedin.com/in/zamruth-begum"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
                <a href="https://github.com/basmina" target="_blank" rel="noreferrer">
                  <Github size={15} /> GitHub
                </a>
              </div>
            </motion.div>
            <div className="hero-visual">
              <div className="orbit o1" />
              <div className="orbit o2" />
              <div className="agent-hero-card">
                <div className="agent-hero-heading">
                  <span className="agent-status" />
                  <span>PERSONALIZED AI AGENT</span>
                  <Sparkles size={16} />
                </div>
                <div className="agent-hero-flow">
                  <div className="agent-hero-node">
                    <small>01</small>
                    <b>Your workflow</b>
                    <span>Needs + context</span>
                  </div>
                  <div className="agent-hero-arrow">↓</div>
                  <div className="agent-hero-node featured">
                    <small>02</small>
                    <b>Purpose-built agent</b>
                    <span>Reasoning + tools</span>
                  </div>
                  <div className="agent-hero-arrow">↓</div>
                  <div className="agent-hero-node">
                    <small>03</small>
                    <b>Useful outcome</b>
                    <span>With human oversight</span>
                  </div>
                </div>
                <div className="agent-hero-tags">
                  <span>Thoughtful UX</span>
                  <span>Secure APIs</span>
                  <span>Clear guardrails</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-highlights">
            <Stat v="12" t="Years of experience" />
            <Stat v="15" t="Engineers mentored" />
            <Stat v="30%" t="Performance improvement" />
            <Stat v="60%" t="Fewer dashboard API calls" />
          </div>
          <a className="scroll" href="#about">
            SCROLL TO EXPLORE ↓
          </a>
        </header>

        {visible("about") && (
          <section id="about" className="section">
            <div className="section-head">
              <div>
                <small>01 — ABOUT ME</small>
                <h2>
                  From complex requirements
                  <br />
                  to clear experiences.
                </h2>
              </div>
              <p>
                My work spans enterprise SaaS, banking, and telecom. Across my 12-year career, I
                have taken on Technical Lead, Scrum Master, and Product Owner responsibilities,
                connecting engineering delivery with team facilitation and product priorities. I
                have mentored 15 engineers.
              </p>
            </div>
          </section>
        )}

        {visible("skills") && (
          <section id="skills" className="section tint">
            <div className="section-head">
              <div>
                <small>02 — TECHNICAL EXPERTISE</small>
                <h2>My engineering toolkit.</h2>
              </div>
              <p>
                Core strengths in Angular and frontend architecture, supported by backend, cloud,
                testing, and delivery experience.
              </p>
            </div>
            <div className="skills">
              <Skill
                icon={<Code2 />}
                title="Frontend engineering"
                desc="Angular v12–v17+, TypeScript, JavaScript ES6+, HTML5, CSS3, SCSS, Angular Signals; React.js working knowledge."
              />
              <Skill
                icon={<AudioLines />}
                title="Reactive architecture"
                desc="RxJS, NgRx, Redux, Observables, BehaviorSubject, reusable components, lazy loading, code splitting, virtual scrolling."
              />
              <Skill
                icon={<BriefcaseBusiness />}
                title="Backend & APIs"
                desc="Node.js, Express.js, REST APIs, microservices integration, JWT, OAuth 2.0, RBAC; Java 8 and Spring Boot fundamentals."
              />
              <Skill
                icon={<Check />}
                title="Data & quality"
                desc="PostgreSQL, Prisma project experience, MongoDB exposure, Jest, Cypress, SonarQube, debugging and code reviews."
              />
              <Skill
                icon={<Zap />}
                title="Cloud & delivery"
                desc="AWS, Azure, Docker, Git, GitLab, Jenkins, CI/CD, Webpack, Angular CLI, Agile/Scrum."
              />
              <Skill
                icon={<Sparkles />}
                title="Leadership & collaboration"
                desc="Architecture decisions, mentoring, hiring, stakeholder collaboration, technical guidance and delivery quality."
              />
            </div>
          </section>
        )}

        {visible("projects") && (
          <section id="projects" className="section">
            <div className="section-head">
              <div>
                <small>03 — SELECTED PROJECTS</small>
                <h2>Building, learning, experimenting.</h2>
              </div>
              <p>
                Client work is represented through anonymized outcomes. Personal and learning
                projects are clearly identified and use only shareable material.
              </p>
            </div>
            <div className="projects">
              <Project
                tag="PERSONAL PROJECT · DEPLOYED"
                title="DoIt Coach — AI Accountability Agent"
                stack="Node.js · Express · Anthropic Claude API"
                items={[
                  "Built and deployed a conversational AI coaching app.",
                  "Integrated Claude API with conversation history for context continuity.",
                  "Used environment-based secret management.",
                ]}
                links={[
                  ["View live application", "https://dit-coach.onrender.com"],
                  ["Explore source code", "https://github.com/basmina/dit-coach"],
                ]}
              />
              <Project
                tag="LEARNING PROJECT"
                title="Employee Management API"
                stack="Java 8 · Spring Boot · PostgreSQL"
                items={[
                  "Hands-on REST API with Controller, Service, and Repository layers.",
                  "Practicing CRUD operations and Java 8 concepts.",
                  "Building persistence with PostgreSQL.",
                ]}
                note="Learning project — not represented as production client work."
              />
              <Project
                tag="PRODUCT DEVELOPMENT LEARNING"
                title="PostgreSQL + Prisma"
                stack="PostgreSQL · Prisma"
                items={[
                  "Set up a local PostgreSQL development database.",
                  "Used Prisma to define and validate a product data model.",
                ]}
                note="Hands-on product-development learning."
              />
            </div>
            <p className="note">
              Enterprise client projects are described through anonymized responsibilities and
              outcomes; no confidential client screenshots or proprietary assets are included.
            </p>
          </section>
        )}

        {visible("agents") && (
          <section id="agents" className="section agent-section">
            <div className="section-head">
              <div>
                <small>04 — A LIVE AI AGENT</small>
                <h2>Try a focused AI agent.</h2>
              </div>
              <p>
                Try a focused live AI agent I built: share one goal and get three concise,
                personalized steps plus one clear action to start now. The selected audience shapes
                a consistently professional response.
              </p>
            </div>
            <div className="agent-studio">
              <form className="agent-form" onSubmit={createAgentPlan}>
                <div className="agent-form-heading">
                  <span className="agent-form-icon">
                    <Sparkles size={19} />
                  </span>
                  <div>
                    <small>LIVE AI AGENT</small>
                    <h3>Three-step goal planner</h3>
                  </div>
                </div>
                <label htmlFor="agent-goal">What is one goal you want to move forward?</label>
                <textarea
                  id="agent-goal"
                  rows={4}
                  required
                  maxLength={350}
                  value={agentGoal}
                  onChange={(event) => {
                    setAgentGoal(event.target.value);
                    setAgentError("");
                    setAgentSteps([]);
                    setAgentNextAction("");
                  }}
                  placeholder="For example: build a consistent 20-minute daily exercise habit..."
                />
                <div className="agent-options">
                  <div>
                    <label htmlFor="agent-audience">Who will use it?</label>
                    <select
                      id="agent-audience"
                      value={agentAudience}
                      onChange={(event) => {
                        setAgentAudience(event.target.value);
                        setAgentError("");
                        setAgentSteps([]);
                        setAgentNextAction("");
                      }}
                    >
                      <option>Individuals</option>
                      <option>Small businesses</option>
                      <option>Internal teams</option>
                      <option>Customers</option>
                    </select>
                  </div>
                  <div>
                    <span className="agent-static-label">Communication style</span>
                    <p className="agent-style">Professional</p>
                  </div>
                </div>
                <button
                  className="agent-submit"
                  type="submit"
                  disabled={agentLoading || !agentReady || agentAttemptsRemaining === 0}
                >
                  <Sparkles size={16} />
                  {agentLoading
                    ? "Creating your plan..."
                    : !agentReady
                      ? agentError
                        ? "Planner unavailable"
                        : "Checking availability..."
                      : agentAttemptsRemaining === 0
                        ? "Plan limit reached"
                        : "Create my 3-step plan"}
                </button>
                <p className="agent-demo-note">
                  {agentUsingLocalAttemptStorage
                    ? "Local development counter; resets when the dev server restarts. "
                    : ""}
                  {agentAttemptsRemaining === null
                    ? "Two plan attempts are available per browser. No name or email is collected."
                    : `${agentAttemptsRemaining} of 2 plan attempts remaining for this browser. No name or email is collected.`}{" "}
                  Your goal and audience are sent to Anthropic; do not include private or sensitive
                  information.
                </p>
              </form>

              <div className="agent-preview" aria-live="polite" aria-busy={agentLoading}>
                {agentLoading ? (
                  <div className="agent-empty" role="status">
                    <span className="agent-spinner" />
                    <small>CLAUDE HAIKU 5.5</small>
                    <h3>Thinking through your goal…</h3>
                    <p>Putting together three practical steps and a clear place to start.</p>
                  </div>
                ) : agentError ? (
                  <div className="agent-empty agent-response-error" role="alert">
                    <div className="agent-empty-icon">
                      <X size={20} />
                    </div>
                    <small>AGENT NOT READY</small>
                    <h3>Couldn&apos;t make a plan yet.</h3>
                    <p>{agentError}</p>
                  </div>
                ) : agentSteps.length > 0 ? (
                  <div className="agent-result">
                    <div className="agent-result-heading">
                      <div>
                        <small>LIVE AI RESPONSE · CLAUDE HAIKU 5.5</small>
                        <h3>Your next three steps</h3>
                      </div>
                      <span className="agent-live-badge">LIVE</span>
                    </div>
                    <ol className="agent-live-steps">
                      {agentSteps.map((step, index) => (
                        <li key={`${index}-${step}`}>{step}</li>
                      ))}
                    </ol>
                    <div className="agent-next-action">
                      <small>YOUR NEXT MOVE</small>
                      <p>{agentNextAction}</p>
                    </div>
                    {agentAttemptsRemaining !== 0 && (
                      <button
                        className="agent-reset"
                        type="button"
                        onClick={() => {
                          setAgentSteps([]);
                          setAgentNextAction("");
                          setAgentError("");
                        }}
                      >
                        Plan another goal
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="agent-empty">
                    <div className="agent-empty-icon">
                      <Sparkles size={22} />
                    </div>
                    <small>YOUR LIVE AI RESPONSE</small>
                    <h3>Your plan will appear here.</h3>
                    <p>
                      Enter a small goal, choose an audience and tone, and get three tailored steps
                      plus one clear action to start.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {visible("architecture") && (
          <section id="architecture" className="section tint">
            <div className="section-head">
              <div>
                <small>05 — ARCHITECTURE THINKING</small>
                <h2>How I approach frontend systems.</h2>
              </div>
              <p>
                A conceptual reference architecture illustrating my approach to a scalable Angular
                enterprise application. This is an illustrative diagram, not a client system
                diagram.
              </p>
            </div>
            <div className="architecture">
              <div className="archrow">
                <Node title="Experience layer" sub="Angular app · UI" />
                <b>→</b>
                <Node title="State layer" sub="Signals · NgRx · RxJS" />
                <b>→</b>
                <Node title="Service layer" sub="HTTP · Auth · APIs" />
              </div>
              <div className="archrow">
                <Node title="Feature modules" sub="Lazy-loaded domains" />
                <b>→</b>
                <Node title="Shared UI" sub="Design system" />
                <b>→</b>
                <Node title="Platform" sub="CI/CD · Cloud" />
              </div>
              <p>
                Architecture principles: feature boundaries, reusable components, predictable state,
                secure API integration, lazy loading, observability, and automated quality checks.
              </p>
              <div className="pills">
                <span>Performance-first</span>
                <span>Accessible UI</span>
                <span>Maintainable boundaries</span>
                <span>Independent delivery where needed</span>
              </div>
            </div>
          </section>
        )}

        {visible("experience") && (
          <section id="experience" className="section">
            <div className="section-head">
              <div>
                <small>06 — CAREER JOURNEY</small>
                <h2>Experience that compounds.</h2>
              </div>
              <p>Selected responsibilities and outcomes from my professional experience.</p>
            </div>
            <div className="jobs">
              <Job
                title="Technical Lead · CoreStack"
                date="Jul 2025 – Aug 2026 · Chennai"
                items={[
                  "Led Angular, NgRx, RxJS, and TypeScript development for a cloud governance and FinOps SaaS platform handling 50,000+ cloud accounts.",
                  "Improved application performance by 30%; reduced dashboard API calls from 10 to 4 (60%).",
                  "Built multi-cloud hierarchy views and enterprise data grids with infinite scroll and server-side pagination across AWS, Azure, and GCP.",
                  "Implemented Auth0 SPA SDK, JWT, OAuth 2.0, and RBAC.",
                ]}
              />
              <Job
                title="Technology Lead · Infosys"
                date="Mar 2022 – Jul 2025"
                items={[
                  "Delivered frontend development and technical leadership across telecom, banking, and digital-services clients.",
                  "Stabilized a project transitioned from an overseas team through production with zero major incidents.",
                  "Introduced Cypress E2E automation alongside Jest; reduced redundant API usage by 40%.",
                  "Interviewed and hired 20+ frontend engineers.",
                ]}
              />
              <Job
                title="IT Analyst · TCS"
                date="Nov 2020 – Mar 2022"
                items={[
                  "Developed Angular features for Lloyds Banking Group’s e-banking platform.",
                  "Improved page-load performance by 25–30% using OnPush, trackBy, and lazy-loaded feature modules.",
                ]}
              />
              <Job
                title="Business Analyst (Frontend) · Techorbit"
                date="Mar 2020 – Nov 2020"
                items={[
                  "Translated requirements into specifications and wireframes; built multi-step forms with validation and REST API integration.",
                  "Created common SCSS and optimized bundle size by 5%.",
                ]}
              />
              <Job
                title="Web Developer · NMW Internet Technologies"
                date="Aug 2017 – Mar 2020"
                items={[
                  "Built responsive Angular/JavaScript web applications and CI/CD pipelines using Git and Jenkins.",
                ]}
              />
              <Job
                title="Programmer Analyst · Cognizant"
                date="Aug 2014 – Jan 2017"
                items={[
                  "Developed enterprise UI components using JavaScript, HTML, CSS, and early Angular.",
                ]}
              />
            </div>
          </section>
        )}

        {visible("education") && (
          <section id="education" className="section tint">
            <div className="section-head">
              <div>
                <small>07 — EDUCATION</small>
                <h2>Learning never stops.</h2>
              </div>
            </div>
            <div className="education">
              <div>
                <GraduationCap />
                <b>B.E. Computer Science</b>
                <span>MEPCO Schlenk Engineering College · Anna University · 2010–2014</span>
              </div>
              <div>
                <GraduationCap />
                <b>Certified ScrumMaster</b>
                <span>Scrum Alliance · Oct 2023; expires Dec 2027</span>
              </div>
              <div>
                <GraduationCap />
                <b>BEC Vantage (B2)</b>
                <span>Cambridge English</span>
              </div>
            </div>
          </section>
        )}

        {visible("contact") && (
          <section id="contact" className="section">
            <div className="contact">
              <div>
                <small>08 — GET IN TOUCH</small>
                <h2>
                  Let&apos;s create something
                  <br />
                  worth scaling.
                </h2>
                <p>
                  Open to conversations about Angular Technical Lead, UI / Frontend Architect, and
                  Full-Stack opportunities aligned with my experience and current learning.
                </p>
                <div className="contactlinks">
                  <a href="mailto:zamruthbegum.5793@gmail.com">✉ zamruthbegum.5793@gmail.com</a>
                  <a href="https://www.linkedin.com/in/zamruth-begum">LinkedIn ↗</a>
                </div>
              </div>
              <a
                className="btn white"
                href="mailto:zamruthbegum.5793@gmail.com?subject=Portfolio%20enquiry"
              >
                Contact me ↗
              </a>
            </div>
          </section>
        )}
      </main>

      <footer>
        <span>© {new Date().getFullYear()} Zamruth Begum M</span>
        <span>Designed with clarity · Built for the web</span>
      </footer>

      {guide && active !== "about" && active !== "agents" && (
        <div
          className="guide"
          style={{ position: "fixed", right: 24, top: guideTop, bottom: "auto", zIndex: 40 }}
        >
          <AnimatePresence>
            {bubble && (
              <motion.div
                className="bubble"
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <button className="bubblex" onClick={() => setBubble(false)}>
                  <X size={13} />
                </button>
                <small>✦ YOUR PORTFOLIO GUIDE · {current.label.toUpperCase()}</small>
                <p>{current.speech}</p>
                <div className="bubbletools">
                  <button onClick={prev}>
                    <ChevronLeft size={15} />
                  </button>
                  <span>
                    {idx + 1} / {sections.length}
                  </span>
                  <button onClick={next}>
                    <ChevronRight size={15} />
                  </button>
                  <button className="read" onClick={read}>
                    <Volume2 size={14} /> Read
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            key={active}
            className="guidechibi"
            onClick={() => setBubble(!bubble)}
            initial={{ y: 24, scale: 0.88, rotate: -5 }}
            animate={
              motionOn
                ? { y: [24, -18, 0], scale: [0.88, 1.06, 1], rotate: [-5, 4, 0] }
                : { y: 0, scale: 1, rotate: 0 }
            }
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <Chibi />
          </motion.button>
        </div>
      )}

      {active !== "agents" && (
        <div className="tourbar">
          <div className="tourtitle">
            <i /> <b>Meet your guide</b>
            <span>{current.label}</span>
          </div>
          <div className="dotsprogress">
            {sections.map((s, i) => (
              <button
                key={s.id}
                className={i === idx ? "current" : ""}
                onClick={() => jump(s.id)}
                aria-label={s.label}
              />
            ))}
          </div>
          <div className="tourbuttons">
            <button onClick={prev} title="Previous">
              <ChevronLeft />
            </button>
            <button
              onClick={() => {
                if (paused) {
                  setPaused(false);
                  window.speechSynthesis?.resume();
                } else {
                  setPaused(true);
                  window.speechSynthesis?.pause();
                }
              }}
              title="Pause or resume"
            >
              {paused ? <Play /> : <Pause />}
            </button>
            <button onClick={() => setMuted(!muted)} title="Mute">
              {muted ? <VolumeX /> : <Volume2 />}
            </button>
            <button onClick={read} title="Read section">
              <Mic />
            </button>
            <button onClick={next} title="Next">
              <ChevronRight />
            </button>
            <button
              onClick={() => {
                setGuide(false);
                window.speechSynthesis?.cancel();
              }}
              title="Turn off guide"
            >
              <X />
            </button>
          </div>
        </div>
      )}

      {!guide && (
        <button
          className="reopen"
          onClick={() => {
            setGuide(true);
            setBubble(true);
          }}
        >
          ✦ Meet your guide
        </button>
      )}

      <AnimatePresence>
        {editor && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setEditor(false);
            }}
          >
            <motion.aside
              className="panel"
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
            >
              <div className="panelhead">
                <div>
                  <small>LIVE DESIGN EDITOR</small>
                  <h3>Make it yours.</h3>
                </div>
                <button onClick={() => setEditor(false)}>
                  <X />
                </button>
              </div>
              <div className="panelbody">
                <Label>Appearance</Label>
                <div className="segment">
                  <button
                    className={theme === "light" ? "sel" : ""}
                    onClick={() => setTheme("light")}
                  >
                    Light
                  </button>
                  <button
                    className={theme === "dark" ? "sel" : ""}
                    onClick={() => setTheme("dark")}
                  >
                    Dark
                  </button>
                </div>
                <label className="label" htmlFor="guide-voice">
                  Narration voice
                </label>
                <select
                  id="guide-voice"
                  value={selectedVoiceURI}
                  disabled={voices.length === 0}
                  onChange={(event) => setSelectedVoiceURI(event.target.value)}
                >
                  {voices.length === 0 ? (
                    <option value="">No browser voices available</option>
                  ) : (
                    <>
                      <option value="">Browser default</option>
                      {voices.map((voice) => (
                        <option key={voice.voiceURI} value={voice.voiceURI}>
                          {voice.name} ({voice.lang}){voice.default ? " — default" : ""}
                        </option>
                      ))}
                    </>
                  )}
                </select>
                <p className="hint voice-hint">
                  Voice options depend on your browser and device. Use &quot;Read section&quot; to
                  hear the selected voice.
                </p>
                <Label>Accent colors</Label>
                <div className="colors">
                  <label>
                    <input
                      type="color"
                      value={accent}
                      onChange={(e) => setAccent(e.target.value)}
                    />{" "}
                    Primary
                  </label>
                  <label>
                    <input
                      type="color"
                      value={accent2}
                      onChange={(e) => setAccent2(e.target.value)}
                    />{" "}
                    Secondary
                  </label>
                </div>
                <Label>Heading font</Label>
                <select value={font} onChange={(e) => setFont(e.target.value)}>
                  <option>Manrope</option>
                  <option>Inter</option>
                  <option>DM Sans</option>
                </select>
                <Label>Card appearance</Label>
                <select value={card} onChange={(e) => setCard(e.target.value)}>
                  <option value="soft">Soft shadow</option>
                  <option value="outlined">Minimal outline</option>
                  <option value="glass">Glass effect</option>
                </select>
                <Label>
                  Corner radius <b>{radius}px</b>
                </Label>
                <input
                  type="range"
                  min="8"
                  max="32"
                  step="2"
                  value={radius}
                  onChange={(e) => setRadius(+e.target.value)}
                />
                <label className="check">
                  <input
                    type="checkbox"
                    checked={motionOn}
                    onChange={(e) => setMotionOn(e.target.checked)}
                  />{" "}
                  Enable motion effects
                </label>
                <hr />
                <Label>Show / hide sections</Label>
                {sections.map((s) => (
                  <label className="check" key={s.id}>
                    <input
                      type="checkbox"
                      checked={visible(s.id)}
                      onChange={() =>
                        setHidden((old) =>
                          old.includes(s.id) ? old.filter((x) => x !== s.id) : [...old, s.id],
                        )
                      }
                    />
                    {s.label}
                  </label>
                ))}
                <div className="panelactions">
                  <button onClick={reset}>
                    <RotateCcw size={14} /> Reset design
                  </button>
                  <button onClick={() => setEditor(false)}>
                    Done <Check size={14} />
                  </button>
                </div>
                <p className="hint">
                  Design choices are saved in this browser. Edit page content in
                  src/components/portfolio.tsx.
                </p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Node({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="node">
      <b>{title}</b>
      <span>{sub}</span>
    </div>
  );
}
function Label({ children }: { children: React.ReactNode }) {
  return <label className="label">{children}</label>;
}
