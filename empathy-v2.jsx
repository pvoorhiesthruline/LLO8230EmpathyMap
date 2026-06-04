// Variation 2 — "Portrait" · full-bleed dark identity panel left, the six
// empathy sections as bordered cards on the right (2 columns × 3 rows).
// Matches the persona-profile "Portrait" treatment so the worksheet family
// reads as one system: black panel + gold avatar ring carry the brand,
// sections become cards with mono tab labels. Pain & Gain get filled tabs.
const EC2 = window.EmpathyCore;
const WS2e = window.WSCore;
const { useRef: useRef2e } = React;

const v2e = {
  root: { background: "var(--vu-paper)", display: "grid", gridTemplateColumns: "560px 1fr" },

  panel: {
    background: "var(--vu-black)", color: "var(--vu-cream)",
    padding: "50px 50px 42px", display: "flex", flexDirection: "column", gap: 28,
    position: "relative", overflow: "hidden",
  },
  pKicker: {
    fontFamily: "var(--sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em",
    textTransform: "uppercase", color: "var(--vu-gold)",
  },
  pName: {
    fontFamily: "var(--sans)", fontSize: 50, fontWeight: 700, letterSpacing: "-0.035em",
    lineHeight: 0.98, color: "var(--vu-cream)", display: "block",
  },
  pRole: {
    fontFamily: "var(--sans)", fontSize: 19, fontWeight: 500, letterSpacing: "-0.01em",
    color: "var(--vu-gold)", display: "block", marginTop: 12,
  },
  pStakeWrap: { borderTop: "1px solid rgba(245,243,239,0.18)", paddingTop: 24, position: "relative" },
  pStakeLabel: {
    fontFamily: "var(--sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em",
    textTransform: "uppercase", color: "rgba(245,243,239,0.5)", marginBottom: 12, display: "block",
  },
  pMark: {
    fontFamily: "var(--serif)", fontSize: 80, lineHeight: 0.35, color: "rgba(207,174,112,0.5)",
    display: "block", height: 30, userSelect: "none",
  },
  pStake: {
    fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400, fontSize: 25,
    lineHeight: 1.42, color: "#EDE7DB", display: "block", letterSpacing: "-0.01em",
  },
  pFootHint: {
    display: "flex", gap: 9, alignItems: "center", color: "rgba(245,243,239,0.55)",
    fontSize: 12.5, fontWeight: 500,
  },

  right: { padding: "44px 52px 34px", display: "flex", flexDirection: "column", gap: 16, minHeight: 0 },
  headRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20 },
  title: {
    margin: "6px 0 0", fontFamily: "var(--sans)", fontSize: 40, lineHeight: 0.96,
    letterSpacing: "-0.035em", fontWeight: 700, color: "var(--vu-black)",
    whiteSpace: "nowrap", flex: "0 0 auto",
  },
  intro: { margin: "10px 0 0", fontSize: 14, lineHeight: 1.44, color: "var(--vu-ink)" },

  grid: {
    flex: 1, marginTop: 6, display: "grid",
    gridTemplateColumns: "1fr 1fr", gridAutoRows: "1fr", gap: 14,
  },
  card: {
    border: "1px solid var(--vu-rule)", borderRadius: 14, background: "#fff",
    padding: "16px 20px 18px", position: "relative", display: "flex", flexDirection: "column", minWidth: 0,
  },
  cardHead: { display: "flex", alignItems: "center", gap: 11, marginBottom: 7 },
  tab: {
    display: "inline-flex", alignItems: "center", gap: 6,
    fontFamily: "var(--mono)", fontSize: 11.5, fontWeight: 600, letterSpacing: "0.05em",
    color: "var(--vu-paper)", background: "var(--vu-gold-d)", padding: "4px 9px",
    borderRadius: 6, flex: "0 0 auto", textTransform: "uppercase",
  },
  cLead: { margin: "0 0 12px", fontSize: 12, lineHeight: 1.4, color: "var(--vu-muted)" },
};

function CardSec({ id, items, onChange, tabBg, tabFg }) {
  const s = EC2.SECTION_BY_ID[id];
  return (
    <div style={v2e.card}>
      <div style={v2e.cardHead}>
        <span style={{ ...v2e.tab, background: tabBg || "var(--vu-gold-d)", color: tabFg || "var(--vu-paper)" }}>
          <EC2.SectionIcon id={id} size={14} /> {s.label}
        </span>
      </div>
      <p style={v2e.cLead}>{s.lead}</p>
      <WS2e.EditableChipList items={items} onChange={onChange}
        placeholder={(i) => `${s.label} \u2014 ${i + 1}`} addLabel="Add" minItems={1} maxItems={5} />
    </div>
  );
}

function EmpathyMapV2({ mode = "example" }) {
  const startBlank = mode === "blank";
  const { state, set, setList, loadExample, clearAll } = EC2.useStakeholderState(`v2-${mode}`, { startBlank });
  const ref = useRef2e(null);
  const F = (props) => <WS2e.Editable {...props} />;

  return (
    <div ref={ref} className="ws" style={v2e.root}>

      {/* Dark identity panel */}
      <aside style={v2e.panel}>
        <EC2.Eyebrow dark />
        <EC2.Avatar name={state.name} size={150} variant="dark" />
        <div>
          <div style={v2e.pKicker}>The Stakeholder</div>
          <F value={state.name} onChange={(v) => set("name", v)} placeholder="Name the stakeholder"
             className="id-field" style={{ ...v2e.pName, marginTop: 10 }} />
          <F value={state.role} onChange={(v) => set("role", v)} placeholder="Role & stake in the program"
             className="id-field" tag="div" style={v2e.pRole} />
        </div>
        <div style={v2e.pStakeWrap}>
          <span style={v2e.pStakeLabel}>In their words</span>
          <span style={v2e.pMark}>&ldquo;</span>
          <F value={state.stake} onChange={(v) => set("stake", v)} multiline tag="div"
             className="id-field" placeholder="A short quote that captures their stake" style={v2e.pStake} />
        </div>
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
          {!state.touched && <EC2.SampleRibbon dark />}
          <div style={v2e.pFootHint}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="12" height="10" rx="2"/><circle cx="6" cy="7" r="1.4"/><path d="M3 12l3.5-3 2.5 2 2-1.5 2 2.5"/>
            </svg>
            Drop in a real photo when you have one.
          </div>
        </div>
      </aside>

      {/* Sections */}
      <div style={v2e.right}>
        <div style={v2e.headRow}>
          <div>
            <h1 style={v2e.title}>Empathy Map.</h1>
            <p style={v2e.intro}>{EC2.EMPATHY_INTRO}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <EC2.SampleToggle touched={state.touched} onExample={loadExample} onClear={clearAll} />
            <WS2e.ExportMenu getTarget={() => ref.current} name={`empathy-map-portrait-${mode}`} />
          </div>
        </div>

        <div style={v2e.grid}>
          <CardSec id="thinkFeel" items={state.thinkFeel} onChange={(l) => setList("thinkFeel", l)} />
          <CardSec id="see"       items={state.see}       onChange={(l) => setList("see", l)} />
          <CardSec id="hear"      items={state.hear}      onChange={(l) => setList("hear", l)} />
          <CardSec id="sayDo"     items={state.sayDo}     onChange={(l) => setList("sayDo", l)} />
          <CardSec id="pain"      items={state.pain}      onChange={(l) => setList("pain", l)}
                   tabBg="var(--vu-black)" tabFg="var(--vu-cream)" />
          <CardSec id="gain"      items={state.gain}      onChange={(l) => setList("gain", l)}
                   tabBg="var(--vu-gold)" tabFg="var(--vu-black)" />
        </div>
      </div>
    </div>
  );
}

window.EmpathyMapV2 = EmpathyMapV2;
