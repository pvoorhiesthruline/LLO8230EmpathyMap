// Empathy Map — shared building blocks for the LLO 8230 worksheet family.
// Reuses WSCore (Editable / Chip / Blank / EditableChipList / ExportButton)
// from worksheet-core.jsx and adds empathy-map-specific state + the six
// Gamestorming sections, tuned for program-evaluation stakeholders.
// Exposed via window.EmpathyCore.

const WSe = window.WSCore;
const { useState: useStateE, useCallback: useCallbackE } = React;

// ── Intro copy (shown once per sheet) ───────────────────────────────────
const EMPATHY_INTRO =
  "An empathy map builds a shared, vivid picture of one stakeholder in the program being evaluated. Before deciding what to measure, pause on a person who holds a stake in the findings — what they think and feel, see, hear, say and do, and the pains and gains that shape how they will receive the evaluation. Keep the end in mind: an evaluation only creates value if the interestholders can act on what it finds.";

// ── The six Gamestorming sections (Dave Gray / XPLANE), framed for the
// program-evaluation context. id · label · short lead prompt. ──────────────
const SECTIONS = [
  { id: "thinkFeel", label: "Think & Feel",
    lead: "What occupies this stakeholder? Their worries, aspirations, and what really matters to them about the program." },
  { id: "see", label: "See",
    lead: "What do they see in their environment — in the program, the data, and the people around them?" },
  { id: "hear", label: "Hear",
    lead: "What are they hearing — from funders, staff, families, peers — about the program and its evaluation?" },
  { id: "sayDo", label: "Say & Do",
    lead: "What do they say in public, and how do they behave? Watch for gaps between words and actions." },
  { id: "pain", label: "Pain",
    lead: "Fears, frustrations, obstacles. What makes the evaluation feel risky, burdensome, or threatening?" },
  { id: "gain", label: "Gain",
    lead: "Wants, needs, measures of success. What would make this evaluation genuinely useful to them?" },
];
const SECTION_BY_ID = Object.fromEntries(SECTIONS.map(s => [s.id, s]));

// ── Worked example — a frontline program stakeholder ────────────────────
// A site director whose after-school program is being evaluated: rich in
// observable behavior AND in the pains/gains that shape evaluation use.
const EXAMPLE = {
  name: "Renée Carter",
  role: "Site Director · Bridges After-School Program",
  stake: "I believe in this program — but every hour we spend documenting outcomes is an hour we’re not with the kids.",
  thinkFeel: [
    "Proud of the team, but stretched thin",
    "Anxious the data won’t capture what really matters",
    "Hopeful the evaluation could finally win stable funding",
  ],
  see: [
    "Funders asking for outcomes she can’t easily measure",
    "Staff burning out on extra paperwork",
    "Kids who light up — but only some weeks",
  ],
  hear: [
    "“Show us the numbers” from the district office",
    "Families calling the program a lifeline",
    "Peers warning that evaluations get used against programs",
  ],
  sayDo: [
    "Volunteers to pilot new tools, then runs out of time",
    "Tells staff “just do your best with the forms”",
    "Quietly keeps her own notes on what’s working",
  ],
  pain: [
    "No time or training to collect good data",
    "Fear results will be used to cut, not improve",
    "Past evaluations felt done to her, not with her",
  ],
  gain: [
    "Evidence to protect and grow the funding",
    "A clearer picture of which kids she’s reaching",
    "Being treated as a partner in the evaluation",
  ],
};

const BLANK = {
  name: "", role: "", stake: "",
  thinkFeel: ["", "", ""],
  see: ["", "", ""],
  hear: ["", "", ""],
  sayDo: ["", "", ""],
  pain: ["", "", ""],
  gain: ["", "", ""],
};

// ── Persisted state (one row per variation key) ─────────────────────────
// Starts on the worked EXAMPLE so students see a filled-in model; `touched`
// flips true on any edit (hides the “sample” ribbon). loadExample / clearAll
// reset the whole sheet.
function useStakeholderState(variantKey, { startBlank = false } = {}) {
  const storageKey = `ws.empathyMap.${variantKey}`;
  const [state, setState] = useStateE(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return startBlank ? { ...BLANK, touched: true } : { ...EXAMPLE, touched: false };
  });

  const commit = useCallbackE((next) => {
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch (_) {}
    return next;
  }, [storageKey]);

  const set = useCallbackE((field, value) => {
    setState(prev => commit({ ...prev, [field]: value, touched: true }));
  }, [commit]);

  const setList = useCallbackE((field, list) => {
    setState(prev => commit({ ...prev, [field]: list, touched: true }));
  }, [commit]);

  const loadExample = useCallbackE(() => setState(commit({ ...EXAMPLE, touched: false })), [commit]);
  const clearAll    = useCallbackE(() => setState(commit({ ...BLANK,   touched: true  })), [commit]);

  return { state, set, setList, loadExample, clearAll };
}

// ── Avatar placeholder ──────────────────────────────────────────────────
// Drop-a-photo placeholder. Shows derived initials if a name is typed, else
// a neutral head silhouette. `shape` = "circle" | "square".
function Avatar({ name = "", size = 168, shape = "circle", variant = "light" }) {
  const initials = (name || "").trim().split(/\s+/).filter(Boolean)
    .slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const dark = variant === "dark";
  const radius = shape === "square" ? 18 : "50%";
  const ring  = dark ? "var(--vu-gold)" : "var(--vu-gold-d)";
  const bg    = dark ? "rgba(207,174,112,0.10)" : "var(--vu-cream)";
  const fg    = dark ? "var(--vu-cream)" : "var(--vu-oak)";
  return (
    <div
      title="Stakeholder photo — drop in a real image later"
      style={{
        width: size, height: size, borderRadius: radius,
        background: bg,
        border: `2px ${initials ? "solid" : "dashed"} ${ring}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flex: "0 0 auto", overflow: "hidden", position: "relative",
      }}
    >
      {initials ? (
        <span style={{
          fontFamily: "var(--serif)", fontWeight: 600, fontStyle: "italic",
          fontSize: size * 0.4, color: fg, letterSpacing: "-0.02em", lineHeight: 1,
        }}>{initials}</span>
      ) : (
        <svg width={size * 0.52} height={size * 0.52} viewBox="0 0 24 24" fill="none"
             stroke={dark ? "var(--vu-gold)" : "var(--vu-gold-d)"} strokeWidth="1.4"
             strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.65 }}>
          <circle cx="12" cy="8.5" r="4" />
          <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
        </svg>
      )}
    </div>
  );
}

// ── Sample / Blank toggle ───────────────────────────────────────────────
function SampleToggle({ touched, onExample, onClear, dark = false }) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 7,
    padding: "7px 13px", borderRadius: 999,
    fontFamily: "var(--sans)", fontSize: 12.5, fontWeight: 600,
    letterSpacing: "0.01em", cursor: "pointer",
    border: `1.5px solid ${dark ? "rgba(245,243,239,0.30)" : "var(--vu-rule)"}`,
    background: "transparent",
    color: dark ? "var(--vu-cream)" : "var(--vu-ink)",
    transition: "background .14s, border-color .14s, color .14s",
  };
  return (
    <div className="export-hide" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
      <button type="button" style={base} onClick={onExample}
              title="Fill the sheet with the worked sample stakeholder">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor"
             strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 2v12M2 8h12" />
        </svg>
        Sample
      </button>
      <button type="button" style={base} onClick={onClear}
              title="Clear every field to map your own stakeholder">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor"
             strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 4h10M6.5 4V2.8h3V4M5 4l.6 9.2h4.8L11 4" />
        </svg>
        Blank
      </button>
    </div>
  );
}

// ── Sample ribbon — shown while the sheet still holds the untouched example
function SampleRibbon({ dark = false }) {
  return (
    <span className="export-hide" style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "5px 12px", borderRadius: 999,
      background: dark ? "rgba(207,174,112,0.18)" : "rgba(207,174,112,0.20)",
      color: dark ? "var(--vu-gold)" : "var(--vu-oak)",
      fontFamily: "var(--sans)", fontSize: 11.5, fontWeight: 700,
      letterSpacing: "0.14em", textTransform: "uppercase",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }}></span>
      Sample — edit any field to make it yours
    </span>
  );
}

// ── Eyebrow line (shared header kicker) ─────────────────────────────────
function Eyebrow({ dark = false }) {
  const muted = dark ? "rgba(245,243,239,0.55)" : "var(--vu-muted)";
  const gold  = dark ? "var(--vu-gold)" : "var(--vu-oak)";
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 9, flexWrap: "nowrap", whiteSpace: "nowrap",
      fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase",
      color: muted, fontWeight: 700, fontFamily: "var(--sans)",
    }}>
      <span style={{ flex: "0 0 auto" }}>Vanderbilt Peabody College</span>
      <span style={{ opacity: 0.4, flex: "0 0 auto" }}>—</span>
      <span style={{ color: gold, flex: "0 0 auto" }}>LLO 8230: Program Evaluation</span>
    </div>
  );
}

// ── Section glyphs — a small line icon per Gamestorming section ─────────
// 16×16 viewBox, stroke=currentColor. Used as quiet category markers.
function SectionIcon({ id, size = 18 }) {
  const common = {
    width: size, height: size, viewBox: "0 0 18 18", fill: "none",
    stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round",
  };
  switch (id) {
    case "thinkFeel": return (<svg {...common}><path d="M6 14c-2 0-3.5-1.5-3.5-3.3 0-1 .5-1.9 1.2-2.5C3.6 7.6 3.5 7 3.5 6.4 3.5 4.5 5 3 6.9 3c.8 0 1.5.3 2.1.7C9.4 3 10.2 2.7 11 2.7c1.9 0 3.4 1.5 3.4 3.4 0 .3 0 .6-.1.9 1 .6 1.6 1.6 1.6 2.8 0 1.8-1.5 3.2-3.3 3.2"/><path d="M9 14v2"/></svg>);
    case "see": return (<svg {...common}><path d="M1.5 9S4 4 9 4s7.5 5 7.5 5-2.5 5-7.5 5-7.5-5-7.5-5Z"/><circle cx="9" cy="9" r="2.2"/></svg>);
    case "hear": return (<svg {...common}><path d="M6 7a3 3 0 0 1 6 0c0 2-1.5 2.5-1.5 4a1.5 1.5 0 0 1-3 0"/><path d="M8.25 13.5h1.5"/><path d="M2.5 6.5 1 5.5M3 9H1.5M15.5 6.5 17 5.5M15 9h1.5"/></svg>);
    case "sayDo": return (<svg {...common}><path d="M3 3.5h12a1 1 0 0 1 1 1V11a1 1 0 0 1-1 1H7l-3.5 3V12H3a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"/><path d="M6 7h6M6 9.5h3.5"/></svg>);
    case "pain": return (<svg {...common}><path d="M9 15.5S2.5 11 2.5 6.6A3.6 3.6 0 0 1 9 4.6a3.6 3.6 0 0 1 6.5 2c0 4.4-6.5 8.9-6.5 8.9Z"/><path d="M6.5 8 8 9.5 11.5 6"/></svg>);
    case "gain": return (<svg {...common}><path d="M9 2.5l1.9 3.9 4.3.6-3.1 3 .7 4.3L9 12.3l-3.8 2 .7-4.3-3.1-3 4.3-.6Z"/></svg>);
    default: return null;
  }
}

window.EmpathyCore = {
  EMPATHY_INTRO, SECTIONS, SECTION_BY_ID, EXAMPLE, BLANK,
  useStakeholderState,
  Avatar, SampleToggle, SampleRibbon, Eyebrow, SectionIcon,
};
