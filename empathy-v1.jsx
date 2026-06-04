// Variation 1 — "Canvas" · the canonical empathy-map cross. Four quadrants
// (Think & Feel / See / Hear / Say & Do) around a centered stakeholder
// medallion, with a Pain | Gain band across the foot. Light cream paper,
// hairline gold cross. The textbook layout — most recognizable to students.
const EC1 = window.EmpathyCore;
const WS1 = window.WSCore;
const { useRef: useRef1 } = React;

const v1 = {
  root: { background: "var(--vu-paper)", display: "flex", flexDirection: "column", padding: "44px 56px 40px" },

  head: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 28 },
  headL: { display: "flex", flexDirection: "column", gap: 12, minWidth: 0 },
  title: {
    margin: "6px 0 0", fontFamily: "var(--sans)", fontSize: 44, lineHeight: 0.96,
    letterSpacing: "-0.035em", fontWeight: 700, color: "var(--vu-black)",
  },
  intro: { margin: 0, fontSize: 14.5, lineHeight: 1.46, color: "var(--vu-ink)", maxWidth: 1040 },
  headR: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12, flex: "0 0 auto" },

  // The 2×2 quadrant block
  grid: {
    flex: 1, marginTop: 22, position: "relative",
    display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr",
    border: "1.5px solid var(--vu-rule)", borderRadius: 18, background: "#fff", overflow: "hidden",
  },
  cell: { padding: "22px 28px", display: "flex", flexDirection: "column", minWidth: 0, minHeight: 0 },
  cellHead: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12, color: "var(--vu-oak)" },
  cellLabel: {
    fontFamily: "var(--sans)", fontSize: 21, fontWeight: 700, letterSpacing: "-0.01em",
    color: "var(--vu-black)", whiteSpace: "nowrap",
  },
  cellNo: {
    fontFamily: "var(--mono)", fontSize: 11, fontWeight: 600, color: "var(--vu-paper)",
    background: "var(--vu-gold-d)", borderRadius: 5, padding: "2px 7px", letterSpacing: "0.04em",
  },
  cellLead: { margin: "0 0 14px", fontSize: 12.5, lineHeight: 1.4, color: "var(--vu-muted)", maxWidth: 360 },

  // Center medallion
  medallion: {
    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
    width: 188, height: 188, borderRadius: "50%", background: "var(--vu-cream)",
    border: "1.5px solid var(--vu-rule)", boxShadow: "0 8px 30px rgba(28,28,28,0.10)",
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    gap: 8, padding: 14, textAlign: "center", zIndex: 3,
  },
  medName: {
    fontFamily: "var(--sans)", fontSize: 19, fontWeight: 700, letterSpacing: "-0.02em",
    color: "var(--vu-black)", lineHeight: 1.05, display: "block",
  },
  medRole: {
    fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 12.5, fontWeight: 500,
    color: "var(--vu-oak)", lineHeight: 1.25, display: "block",
  },

  // Pain / Gain foot band
  band: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 18 },
  panel: { borderRadius: 16, padding: "18px 24px 20px", border: "1.5px solid var(--vu-rule)" },
  panelHead: { display: "flex", alignItems: "center", gap: 11, marginBottom: 6 },
  pTab: {
    display: "inline-flex", alignItems: "center", gap: 7,
    fontFamily: "var(--sans)", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em",
    textTransform: "uppercase", padding: "5px 12px", borderRadius: 999,
  },
  pLead: { margin: "0 0 12px", fontSize: 12.5, lineHeight: 1.4, color: "var(--vu-muted)" },
};

function HairCross() {
  // The cross dividers + a soft halo behind the medallion.
  return (
    <React.Fragment>
      <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1.5, background: "var(--vu-rule)", transform: "translateY(-50%)", zIndex: 1 }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 1.5, background: "var(--vu-rule)", transform: "translateX(-50%)", zIndex: 1 }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0) 72%)", zIndex: 2 }} />
    </React.Fragment>
  );
}

function Quad({ id, items, onChange, h, v }) {
  const s = EC1.SECTION_BY_ID[id];
  const right = h === "r";
  return (
    <div className={right ? "quad-right" : undefined} style={{
      ...v1.cell,
      alignItems: right ? "flex-end" : "flex-start",
      justifyContent: v === "b" ? "flex-end" : "flex-start",
      textAlign: right ? "right" : "left",
    }}>
      <div style={{ ...v1.cellHead, flexDirection: right ? "row-reverse" : "row" }}>
        <EC1.SectionIcon id={id} size={22} />
        <span style={v1.cellLabel}>{s.label}</span>
      </div>
      <p style={v1.cellLead}>{s.lead}</p>
      <WS1.EditableChipList items={items} onChange={onChange}
        placeholder={(i) => `${s.label} \u2014 ${i + 1}`} addLabel="Add" minItems={1} maxItems={5} />
    </div>
  );
}

function EmpathyMapV1({ mode = "example" }) {
  const startBlank = mode === "blank";
  const { state, set, setList, loadExample, clearAll } = EC1.useStakeholderState(`v1-${mode}`, { startBlank });
  const ref = useRef1(null);
  const F = (props) => <WS1.Editable {...props} />;

  return (
    <div ref={ref} className="ws" style={v1.root}>
      <WS1.ExportButton getTarget={() => ref.current} pageClass="print-slide" />

      <div style={v1.head}>
        <div style={v1.headL}>
          <EC1.Eyebrow />
          <h1 style={v1.title}>Stakeholder Empathy Map.</h1>
          <p style={v1.intro}>{EC1.EMPATHY_INTRO}</p>
        </div>
        <div style={v1.headR}>
          <EC1.SampleToggle touched={state.touched} onExample={loadExample} onClear={clearAll} />
          {!state.touched && <EC1.SampleRibbon />}
        </div>
      </div>

      <div style={v1.grid}>
        <HairCross />
        <Quad id="thinkFeel" items={state.thinkFeel} onChange={(l) => setList("thinkFeel", l)} h="l" v="t" />
        <Quad id="see"       items={state.see}       onChange={(l) => setList("see", l)}       h="r" v="t" />
        <Quad id="hear"      items={state.hear}      onChange={(l) => setList("hear", l)}      h="l" v="b" />
        <Quad id="sayDo"     items={state.sayDo}     onChange={(l) => setList("sayDo", l)}     h="r" v="b" />

        <div style={v1.medallion}>
          <EC1.Avatar name={state.name} size={64} />
          <div>
            <F value={state.name} onChange={(v) => set("name", v)} placeholder="Stakeholder"
               className="id-field" style={v1.medName} />
            <F value={state.role} onChange={(v) => set("role", v)} placeholder="Role / stake"
               className="id-field" tag="div" style={v1.medRole} />
          </div>
        </div>
      </div>

      <div style={v1.band}>
        <div style={{ ...v1.panel, background: "rgba(148,110,36,0.05)" }}>
          <div style={v1.panelHead}>
            <span style={{ ...v1.pTab, background: "var(--vu-black)", color: "var(--vu-cream)" }}>
              <EC1.SectionIcon id="pain" size={15} /> Pain
            </span>
            <p style={{ ...v1.pLead, margin: 0 }}>{EC1.SECTION_BY_ID.pain.lead}</p>
          </div>
          <div style={{ marginTop: 10 }}>
            <WS1.EditableChipList items={state.pain} onChange={(l) => setList("pain", l)}
              placeholder={(i) => `Pain \u2014 ${i + 1}`} addLabel="Add a pain" minItems={1} maxItems={5} />
          </div>
        </div>
        <div style={{ ...v1.panel, background: "rgba(207,174,112,0.10)", borderColor: "var(--vu-gold)" }}>
          <div style={v1.panelHead}>
            <span style={{ ...v1.pTab, background: "var(--vu-gold-d)", color: "var(--vu-cream)" }}>
              <EC1.SectionIcon id="gain" size={15} /> Gain
            </span>
            <p style={{ ...v1.pLead, margin: 0 }}>{EC1.SECTION_BY_ID.gain.lead}</p>
          </div>
          <div style={{ marginTop: 10 }}>
            <WS1.EditableChipList items={state.gain} onChange={(l) => setList("gain", l)}
              placeholder={(i) => `Gain \u2014 ${i + 1}`} addLabel="Add a gain" minItems={1} maxItems={5} />
          </div>
        </div>
      </div>
    </div>
  );
}

window.EmpathyMapV1 = EmpathyMapV1;
