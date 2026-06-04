// Variation 3 — "Orbit" · the stakeholder sits at the centre of the map and
// the six sections radiate outward, split into two readings: what they
// outwardly experience & do (left) and what inwardly drives them (right).
// Hairline gold connectors fan from a central medallion to each card — the
// most literal "map" of the three. All light, airy, editorial.
const EC3 = window.EmpathyCore;
const WS3 = window.WSCore;
const { useRef: useRef3 } = React;

const v3 = {
  root: { background: "var(--vu-paper)", display: "flex", flexDirection: "column", padding: "44px 60px 44px" },

  head: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 28 },
  headL: { display: "flex", flexDirection: "column", gap: 11, minWidth: 0 },
  title: {
    margin: "6px 0 0", fontFamily: "var(--sans)", fontSize: 42, lineHeight: 0.96,
    letterSpacing: "-0.035em", fontWeight: 700, color: "var(--vu-black)",
  },
  intro: { margin: 0, fontSize: 14, lineHeight: 1.46, color: "var(--vu-ink)", maxWidth: 980 },

  orbit: { flex: 1, marginTop: 18, position: "relative",
    display: "grid", gridTemplateColumns: "1fr 300px 1fr", gridTemplateRows: "1fr 1fr 1fr",
    columnGap: 24, rowGap: 16, alignItems: "stretch" },

  colLabel: {
    position: "absolute", top: -4, fontFamily: "var(--sans)", fontSize: 11,
    fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--vu-gold-d)",
  },

  card: {
    border: "1px solid var(--vu-rule)", borderRadius: 14, background: "#fff",
    padding: "15px 20px 16px", position: "relative", zIndex: 2,
    display: "flex", flexDirection: "column", minWidth: 0, justifyContent: "center",
  },
  cardHead: { display: "flex", alignItems: "center", gap: 9, marginBottom: 5, color: "var(--vu-oak)" },
  cLabel: { fontFamily: "var(--sans)", fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em", color: "var(--vu-black)", whiteSpace: "nowrap" },
  cLead: { margin: "0 0 11px", fontSize: 11.5, lineHeight: 1.35, color: "var(--vu-muted)" },

  // Central medallion
  medWrap: { gridColumn: "2", gridRow: "1 / 4", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 3 },
  medallion: {
    width: 256, height: 256, borderRadius: "50%", background: "var(--vu-black)", color: "var(--vu-cream)",
    border: "3px solid var(--vu-gold)", boxShadow: "0 12px 40px rgba(28,28,28,0.22)",
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    gap: 12, padding: 26, textAlign: "center",
  },
  medKicker: {
    fontFamily: "var(--sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
    textTransform: "uppercase", color: "var(--vu-gold)",
  },
  medName: {
    fontFamily: "var(--sans)", fontSize: 26, fontWeight: 700, letterSpacing: "-0.025em",
    color: "var(--vu-cream)", lineHeight: 1.02, display: "block",
  },
  medRole: {
    fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 14, fontWeight: 500,
    color: "#EDE7DB", lineHeight: 1.28, display: "block",
  },
};

// Connector layer — straight hairlines from the medallion centre out to each
// of the six card anchors. Percent coords are tuned to the 3×3 grid so lines
// land under each card; the cards (zIndex 2) cover the outer half, leaving a
// clean radial stub. Gold dot marks the centre.
function Connectors() {
  const C = [50, 50];
  const anchors = [
    [27, 17], [27, 50], [27, 83],   // left column rows
    [73, 17], [73, 50], [73, 83],   // right column rows
  ];
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none"
         style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}>
      {anchors.map((a, i) => (
        <line key={i} x1={C[0]} y1={C[1]} x2={a[0]} y2={a[1]}
              stroke="var(--vu-gold)" strokeWidth="0.18" strokeDasharray="0.7 0.8" opacity="0.75" />
      ))}
      <circle cx={C[0]} cy={C[1]} r="0.7" fill="var(--vu-gold-d)" />
    </svg>
  );
}

function OrbitCard({ id, items, onChange, align = "left", col, row }) {
  const s = EC3.SECTION_BY_ID[id];
  return (
    <div style={{ ...v3.card, gridColumn: col, gridRow: row, textAlign: align === "right" ? "right" : "left" }}>
      <div style={{ ...v3.cardHead, justifyContent: align === "right" ? "flex-end" : "flex-start" }}>
        {align === "left" && <EC3.SectionIcon id={id} size={19} />}
        <span style={v3.cLabel}>{s.label}</span>
        {align === "right" && <EC3.SectionIcon id={id} size={19} />}
      </div>
      <p style={v3.cLead}>{s.lead}</p>
      <div style={{ display: "flex", justifyContent: align === "right" ? "flex-end" : "flex-start" }}>
        <WS3.EditableChipList items={items} onChange={onChange}
          placeholder={(i) => `${s.label} \u2014 ${i + 1}`} addLabel="Add" minItems={1} maxItems={4} variant="compact" />
      </div>
    </div>
  );
}

function EmpathyMapV3({ mode = "example" }) {
  const startBlank = mode === "blank";
  const { state, set, setList, loadExample, clearAll } = EC3.useStakeholderState(`v3-${mode}`, { startBlank });
  const ref = useRef3(null);
  const F = (props) => <WS3.Editable {...props} />;

  return (
    <div ref={ref} className="ws" style={v3.root}>
      <div style={v3.head}>
        <div style={v3.headL}>
          <EC3.Eyebrow />
          <h1 style={v3.title}>Empathy Map &mdash; Orbit.</h1>
          <p style={v3.intro}>{EC3.EMPATHY_INTRO}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <EC3.SampleToggle touched={state.touched} onExample={loadExample} onClear={clearAll} />
          <WS3.ExportMenu getTarget={() => ref.current} name={`empathy-map-orbit-${mode}`} />
        </div>
      </div>

      <div style={v3.orbit}>
        <Connectors />
        <span style={{ ...v3.colLabel, left: 0 }}>Outward &middot; what they experience &amp; do</span>
        <span style={{ ...v3.colLabel, right: 0 }}>Inward &middot; what drives them</span>

        {/* Left column — observable */}
        <OrbitCard id="see"   items={state.see}   onChange={(l) => setList("see", l)}   align="left" col="1" row="1" />
        <OrbitCard id="hear"  items={state.hear}  onChange={(l) => setList("hear", l)}  align="left" col="1" row="2" />
        <OrbitCard id="sayDo" items={state.sayDo} onChange={(l) => setList("sayDo", l)} align="left" col="1" row="3" />

        {/* Centre medallion */}
        <div style={v3.medWrap}>
          <div style={v3.medallion}>
            <EC3.Avatar name={state.name} size={70} variant="dark" />
            <div>
              <div style={v3.medKicker}>The Stakeholder</div>
              <F value={state.name} onChange={(v) => set("name", v)} placeholder="Stakeholder"
                 className="id-field" style={{ ...v3.medName, marginTop: 5 }} />
              <F value={state.role} onChange={(v) => set("role", v)} placeholder="Role / stake"
                 className="id-field" tag="div" style={v3.medRole} />
            </div>
          </div>
        </div>

        {/* Right column — internal */}
        <OrbitCard id="thinkFeel" items={state.thinkFeel} onChange={(l) => setList("thinkFeel", l)} align="right" col="3" row="1" />
        <OrbitCard id="pain"      items={state.pain}      onChange={(l) => setList("pain", l)}      align="right" col="3" row="2" />
        <OrbitCard id="gain"      items={state.gain}      onChange={(l) => setList("gain", l)}      align="right" col="3" row="3" />
      </div>
    </div>
  );
}

window.EmpathyMapV3 = EmpathyMapV3;
