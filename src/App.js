import { useState, useEffect, useRef } from "react";

// ── DEFAULT DATA ──────────────────────────────────────────────
const DEFAULT_DATA = {
  name: "Victoria Wiseman",
  tagline: "Curating the world's most beautiful stays — one frame at a time.",
  eyebrow: "Travel & Lifestyle · Content Creator · Brand Partner",
  tiktokHandle: "@victoriaw3",
  tiktokUrl: "https://www.tiktok.com/@victoriaw3",
  instagramHandle: "@victtoriia18",
  instagramUrl: "https://www.instagram.com/victtoriia18",
  email: "Contact.victoriaw3@gmail.com",
  beacons: "https://beacons.ai/victoriaw3",
  mediaKit: "",
  bio: "I'm Victoria — a travel and lifestyle content creator based in Michigan, sharing beautiful hotels, beaches, and hidden gems through an elevated yet feminine lens. My content blends aspirational visuals with fun storytelling, attracting an engaged audience of women who travel with taste. I truly believe where you stay matters and every stay deserves to be remembered — and I love helping brands create that lasting impression.",
  stats: [
    { num: "2,372", label: "TikTok Followers" },
    { num: "186.6K", label: "TikTok Likes" },
    { num: "1,032", label: "Instagram Followers" },
    { num: "23.5K", label: "IG Views · 30 Days" },
    { num: "2", label: "Platforms" },
  ],
  videos: [
    { id: "7561802273316293943", label: "Waldorf Astoria Chicago" },
    { id: "7534727352908025102", label: "The Daxton · Birmingham, MI" },
    { id: "7647906501306092813", label: "The Crockfords · Las Vegas" },
    { id: "", label: "Add a video…" },
  ],
  destinations: [
    { name: "Chicago", region: "Midwest USA", color: "#8898b8,#506080", soon: false },
    { name: "Anguilla", region: "Caribbean", color: "#7ab8c8,#4a8fa0", soon: false },
    { name: "Curaçao", region: "Caribbean", color: "#7ab8c8,#3a7a9a", soon: true },
    { name: "Las Vegas", region: "Southwest USA", color: "#d4c0a8,#b89878", soon: false },
    { name: "Arizona", region: "Southwest USA", color: "#c8a87a,#a07850", soon: true },
    { name: "Michigan", region: "Midwest USA", color: "#b8c8a0,#7a9860", soon: false },
  ],
};

// ── STYLES ────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --ivory: #F5E8E0; --blush: #EDD8CC; --rose: #C89080;
    --sage: #C4CDB8; --mocha: #3D2B1F; --mocha-lt: #7A5A4A; --cream: #F0DDD4;
  }
  body { background: #F5E8E0; font-family: 'DM Sans', sans-serif; font-weight: 300; color: var(--mocha); overflow-x: hidden; }

  /* EDIT BAR */
  .edit-bar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
    background: var(--mocha); color: var(--ivory);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.65rem 1.5rem; font-family: 'DM Sans', sans-serif; font-size: 0.72rem;
    letter-spacing: 0.12em; text-transform: uppercase;
  }
  .edit-bar button {
    padding: 0.4rem 1.1rem; border-radius: 100px; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 0.7rem; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase; transition: background 0.2s;
  }
  .btn-save { background: var(--rose); color: var(--mocha); }
  .btn-save:hover { background: #d4a898; }
  .btn-edit { background: rgba(255,255,255,0.15); color: var(--ivory); }
  .btn-edit:hover { background: rgba(255,255,255,0.25); }
  .edit-bar-actions { display: flex; gap: 0.6rem; }

  /* EDITOR PANEL */
  .editor-panel {
    position: fixed; top: 0; right: 0; bottom: 0; width: 380px; max-width: 95vw;
    z-index: 9998; background: #F0DDD4; border-left: 1px solid #C89080;
    overflow-y: auto; padding: 5rem 1.5rem 2rem; display: flex; flex-direction: column; gap: 1.8rem;
    box-shadow: -8px 0 40px rgba(61,43,31,0.12);
  }
  .editor-section h3 {
    font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 500;
    color: var(--mocha); margin-bottom: 0.8rem; padding-bottom: 0.4rem;
    border-bottom: 1px solid var(--rose);
  }
  .editor-section label { display: block; font-size: 0.68rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--mocha-lt); margin-bottom: 0.25rem; margin-top: 0.7rem; }
  .editor-section input, .editor-section textarea {
    width: 100%; padding: 0.55rem 0.8rem; border: 1px solid var(--rose);
    border-radius: 8px; background: var(--ivory); font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem; color: var(--mocha); outline: none;
  }
  .editor-section input:focus, .editor-section textarea:focus { border-color: var(--mocha-lt); }
  .editor-section textarea { resize: vertical; min-height: 80px; line-height: 1.6; }

  .stat-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem; }
  .stat-row input { font-size: 0.78rem; }

  .video-row { background: var(--blush); border-radius: 10px; padding: 0.8rem; margin-bottom: 0.6rem; }
  .video-row label { margin-top: 0; }
  .video-row-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; }
  .video-row-header span { font-size: 0.68rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--mocha-lt); }
  .btn-remove { background: none; border: 1px solid var(--rose); color: var(--mocha-lt); border-radius: 6px; padding: 0.2rem 0.5rem; font-size: 0.65rem; cursor: pointer; }
  .btn-remove:hover { background: var(--rose); color: var(--mocha); }
  .btn-add { width: 100%; padding: 0.55rem; background: var(--ivory); border: 1px dashed var(--rose); border-radius: 8px; color: var(--mocha-lt); font-size: 0.75rem; cursor: pointer; margin-top: 0.4rem; letter-spacing: 0.08em; }
  .btn-add:hover { background: var(--blush); }

  .dest-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; margin-bottom: 0.5rem; align-items: center; }
  .dest-row input { font-size: 0.78rem; }
  .dest-soon { display: flex; align-items: center; gap: 0.4rem; font-size: 0.72rem; color: var(--mocha-lt); }
  .dest-soon input[type=checkbox] { width: auto; }

  .save-toast {
    position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
    background: var(--mocha); color: var(--ivory); padding: 0.7rem 1.6rem;
    border-radius: 100px; font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
    z-index: 99999; opacity: 0; transition: opacity 0.3s; pointer-events: none;
  }
  .save-toast.show { opacity: 1; }

  /* PORTFOLIO */
  .portfolio-wrap { transition: margin-right 0.3s; }
  .portfolio-wrap.panel-open { margin-right: 380px; }

  .hero {
    position: relative; min-height: 100vh;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; padding: 5rem 1.5rem 4rem;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, #EDD8CC 0%, transparent 70%),
                radial-gradient(ellipse 60% 40% at 80% 100%, #d6e0cc 0%, transparent 60%), #F5E8E0;
  }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

  .hero-eyebrow { font-size: 0.7rem; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: var(--mocha-lt); margin-bottom: 1.8rem; }
  .hero-logo { margin-bottom: 1.8rem; animation: fadeUp 1s ease 0.3s both; }
  .hero-logo svg { max-width: 100%; height: auto; }
  .hero-handles { margin-top: 1rem; font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--mocha-lt); }
  .hero-handles a { color: inherit; text-decoration: none; border-bottom: 1px solid var(--rose); padding-bottom: 1px; }
  .hero-cta { margin-top: 2.5rem; }
  .btn-primary {
    display: inline-block; padding: 0.85rem 2.2rem; background: var(--mocha); color: var(--ivory);
    font-size: 0.72rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase;
    text-decoration: none; border-radius: 100px; border: none; cursor: pointer; transition: background 0.2s;
  }
  .btn-primary:hover { background: var(--mocha-lt); }
  .btn-secondary { background: var(--mocha-lt); }

  nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(245,232,224,0.92); backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(200,144,128,0.25);
    padding: 0.9rem 2rem; display: flex; align-items: center; justify-content: center;
    gap: 2.5rem; flex-wrap: wrap;
  }
  nav a { font-size: 0.68rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--mocha-lt); text-decoration: none; }
  nav a:hover { color: var(--mocha); }

  .port-section { padding: 5rem 1.5rem; max-width: 960px; margin: 0 auto; }
  .section-eyebrow { font-size: 0.62rem; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: var(--rose); margin-bottom: 0.75rem; }
  .section-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 400; line-height: 1.15; margin-bottom: 1.5rem; }
  .section-title em { font-style: italic; color: var(--mocha-lt); }
  .section-body { font-size: 0.93rem; color: var(--mocha-lt); max-width: 640px; line-height: 1.8; }
  .divider { max-width: 960px; margin: 0 auto; border: none; border-top: 1px solid rgba(232,197,184,0.35); }

  .stats-strip {
    background: var(--blush); border-radius: 20px; padding: 3rem 2rem;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(130px,1fr)); gap: 2rem; text-align: center;
    max-width: 960px; margin: 0 auto; border: 1px solid rgba(200,144,128,0.2);
  }
  .stat-num { font-family: 'Cormorant Garamond', serif; font-size: 2.6rem; font-weight: 300; color: var(--mocha); line-height: 1; margin-bottom: 0.4rem; }
  .stat-label { font-size: 0.62rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--mocha-lt); }

  .property-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; margin-top: 1.5rem; }
  .property-card { background: var(--blush); border-radius: 14px; padding: 1.5rem 1rem; text-align: center; border: 1px solid rgba(200,144,128,0.2); transition: transform 0.2s, box-shadow 0.2s; }
  .property-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(61,43,31,0.1); }
  .property-icon { font-size: 1.4rem; margin-bottom: 0.6rem; }
  .property-name { font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-weight: 400; color: var(--mocha); margin-bottom: 0.25rem; line-height: 1.3; }
  .property-location { font-size: 0.6rem; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; color: var(--rose); }

  /* Video card */
  .vcard { border-radius: 18px; overflow: hidden; box-shadow: 0 4px 24px rgba(61,43,31,0.08); }
  .vcard-header { aspect-ratio: 9/16; position: relative; cursor: pointer; }
  .vcard-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(61,43,31,0.75) 0%, rgba(61,43,31,0.1) 55%, transparent 100%);
    display: flex; flex-direction: column; justify-content: flex-end; padding: 1.2rem;
  }
  .vcard-tag { font-size: 0.58rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--rose); margin-bottom: 0.3rem; }
  .vcard-title { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-weight: 400; color: var(--ivory); line-height: 1.3; margin-bottom: 0.7rem; }
  .vcard-play {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: rgba(250,247,242,0.18); border: 1px solid rgba(250,247,242,0.35);
    color: var(--ivory); border-radius: 100px; padding: 0.4rem 0.9rem;
    font-size: 0.65rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase;
    cursor: pointer; transition: background 0.2s; width: fit-content;
  }
  .vcard-play:hover { background: rgba(250,247,242,0.3); }
  .vcard-embed { background: #000; }
  .vcard-empty { padding: 1.2rem; background: var(--blush); font-size: 0.78rem; color: var(--mocha-lt); text-align: center; border: 2px dashed var(--rose); border-top: none; }
  .tiktok-embed-wrap { border-radius: 0; overflow: hidden; }

  .dest-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px,1fr)); gap: 1.2rem; margin-top: 1.5rem; }
  .dest-card {
    border-radius: 20px; overflow: hidden; position: relative; aspect-ratio: 4/3;
  }
  .dest-bg { width: 100%; height: 100%; }
  .dest-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(61,43,31,0.45) 0%, transparent 60%);
    display: flex; flex-direction: column; justify-content: flex-end; padding: 1.4rem;
  }
  .dest-region { font-size: 0.58rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: var(--rose); margin-bottom: 0.3rem; }
  .dest-name { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 400; color: var(--ivory); }
  .dest-soon-tag { font-size: 0.55rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(250,247,242,0.6); margin-top: 0.2rem; }

  .offer-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); gap: 1rem; margin-top: 1.5rem; }
  .offer-card { background: var(--blush); border-radius: 16px; padding: 1.8rem; transition: background 0.2s; }
  .offer-card:hover { background: var(--rose); }
  .offer-icon { font-size: 1.4rem; margin-bottom: 0.8rem; }
  .offer-title { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; font-weight: 500; margin-bottom: 0.4rem; }
  .offer-desc { font-size: 0.8rem; color: var(--mocha-lt); line-height: 1.7; }

  .contact-wrap {
    background: radial-gradient(ellipse 70% 50% at 30% 50%, #EDD8CC 0%, transparent 70%),
                radial-gradient(ellipse 50% 40% at 80% 50%, #d6e0cc 0%, transparent 60%), #F5E8E0;
    padding: 5rem 1.5rem; text-align: center;
  }
  .contact-inner { max-width: 540px; margin: 0 auto; }
  .contact-form { margin-top: 2.5rem; display: flex; flex-direction: column; gap: 0.9rem; text-align: left; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem; }
  .contact-form input, .contact-form select, .contact-form textarea {
    width: 100%; padding: 0.8rem 1rem; background: rgba(245,232,224,0.9);
    border: 1px solid rgba(200,144,128,0.4); border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-size: 0.83rem; color: var(--mocha); outline: none;
  }
  .contact-form textarea { resize: vertical; min-height: 110px; }
  .success-msg { padding: 1rem; background: var(--sage); border-radius: 10px; text-align: center; font-size: 0.85rem; color: var(--mocha); }

  footer { text-align: center; padding: 2.5rem 1.5rem; font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--mocha-lt); border-top: 1px solid rgba(232,197,184,0.3); }
  footer a { color: inherit; text-decoration: none; }

  @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } .portfolio-wrap.panel-open { margin-right: 0; } }
`;

// ── TIKTOK EMBED ──────────────────────────────────────────────
function TikTokEmbed({ videoId }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!videoId) return;
    if (ref.current) ref.current.innerHTML = `
      <blockquote class="tiktok-embed"
        cite="https://www.tiktok.com/@victoriaw3/video/${videoId}"
        data-video-id="${videoId}"
        style="max-width:100%;min-width:0;margin:0;border:none;">
        <section></section>
      </blockquote>`;
    const existing = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
    if (existing) existing.remove();
    const s = document.createElement("script");
    s.src = "https://www.tiktok.com/embed.js";
    s.async = true;
    document.body.appendChild(s);
  }, [videoId]);
  if (!videoId) return null;
  return <div className="tiktok-embed-wrap" ref={ref} />;
}

// ── VIDEO CARD (place card + optional embed) ──────────────────
const CARD_COLORS = [
  "#8898b8,#506080",
  "#c8b8a8,#a89080",
  "#c8a87a,#8a7050",
  "#c4cdb8,#8aa898",
  "#e8c5b8,#c89880",
  "#7ab8c8,#4a8fa0",
];

function VideoCard({ video, index }) {
  const [showEmbed, setShowEmbed] = useState(false);
  const colors = (CARD_COLORS[index % CARD_COLORS.length]).split(",");

  return (
    <div className="vcard">
      {/* Place card header */}
      <div className="vcard-header" style={{ background: `linear-gradient(160deg, ${colors[0]}, ${colors[1]})` }}>
        <div className="vcard-overlay">
          <div className="vcard-tag">Hotels &amp; Resorts</div>
          <div className="vcard-title">{video.label || "Untitled"}</div>
          {video.id && !showEmbed && (
            <button className="vcard-play" onClick={() => setShowEmbed(true)}>
              <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
                <path d="M1 1l9 5.5-9 5.5V1z" fill="#FAF7F2"/>
              </svg>
              Watch Video
            </button>
          )}
        </div>
      </div>
      {/* TikTok embed below card */}
      {video.id && showEmbed && (
        <div className="vcard-embed">
          <TikTokEmbed videoId={video.id} />
        </div>
      )}
      {/* Placeholder if no ID */}
      {!video.id && (
        <div className="vcard-empty">📱 Add a TikTok video ID in Edit Mode</div>
      )}
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────
export default function Portfolio() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem("vw_portfolio");
      return saved ? { ...DEFAULT_DATA, ...JSON.parse(saved) } : DEFAULT_DATA;
    } catch { return DEFAULT_DATA; }
  });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(data);
  const [toast, setToast] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const openEditor = () => { setDraft(data); setEditing(true); };
  const closeEditor = () => setEditing(false);

  const save = () => {
    setData(draft);
    try { localStorage.setItem("vw_portfolio", JSON.stringify(draft)); } catch {}
    setEditing(false);
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  const setField = (key, val) => setDraft(d => ({ ...d, [key]: val }));

  const setStat = (i, key, val) => setDraft(d => {
    const stats = [...d.stats]; stats[i] = { ...stats[i], [key]: val }; return { ...d, stats };
  });

  const setVideo = (i, key, val) => setDraft(d => {
    const videos = [...d.videos]; videos[i] = { ...videos[i], [key]: val }; return { ...d, videos };
  });
  const addVideo = () => setDraft(d => ({ ...d, videos: [...d.videos, { id: "", label: "" }] }));
  const removeVideo = (i) => setDraft(d => ({ ...d, videos: d.videos.filter((_, j) => j !== i) }));

  const setDest = (i, key, val) => setDraft(d => {
    const destinations = [...d.destinations]; destinations[i] = { ...destinations[i], [key]: val }; return { ...d, destinations };
  });
  const addDest = () => setDraft(d => ({ ...d, destinations: [...d.destinations, { name: "", region: "", color: "#c4cdb8,#8aa898", soon: false }] }));
  const removeDest = (i) => setDraft(d => ({ ...d, destinations: d.destinations.filter((_, j) => j !== i) }));

  const nameParts = data.name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <>
      <style>{css}</style>

      {/* EDIT BAR */}
      <div className="edit-bar">
        <span>✦ Victoria Wiseman · Portfolio</span>
        <div className="edit-bar-actions">
          {editing ? (
            <>
              <button className="btn-edit" onClick={closeEditor}>Cancel</button>
              <button className="btn-save" onClick={save}>Save Changes</button>
            </>
          ) : (
            <button className="btn-edit" onClick={openEditor}>✏️ Edit Portfolio</button>
          )}
        </div>
      </div>

      {/* EDITOR PANEL */}
      {editing && (
        <div className="editor-panel">
          {/* BASICS */}
          <div className="editor-section">
            <h3>Basics</h3>
            <label>Full Name</label>
            <input value={draft.name} onChange={e => setField("name", e.target.value)} />
            <label>Tagline</label>
            <input value={draft.tagline} onChange={e => setField("tagline", e.target.value)} />
            <label>Eyebrow Text</label>
            <input value={draft.eyebrow} onChange={e => setField("eyebrow", e.target.value)} />
            <label>Bio</label>
            <textarea value={draft.bio} onChange={e => setField("bio", e.target.value)} />
          </div>

          {/* SOCIAL */}
          <div className="editor-section">
            <h3>Social & Contact</h3>
            <label>TikTok Handle</label>
            <input value={draft.tiktokHandle} onChange={e => setField("tiktokHandle", e.target.value)} />
            <label>TikTok URL</label>
            <input value={draft.tiktokUrl} onChange={e => setField("tiktokUrl", e.target.value)} />
            <label>Instagram Handle</label>
            <input value={draft.instagramHandle} onChange={e => setField("instagramHandle", e.target.value)} />
            <label>Instagram URL</label>
            <input value={draft.instagramUrl} onChange={e => setField("instagramUrl", e.target.value)} />
            <label>Contact Email</label>
            <input value={draft.email} onChange={e => setField("email", e.target.value)} />
            <label>Media Kit URL (paste Google Drive or PDF link)</label>
            <input value={draft.mediaKit} onChange={e => setField("mediaKit", e.target.value)} placeholder="https://drive.google.com/..." />
          </div>

          {/* STATS */}
          <div className="editor-section">
            <h3>Stats</h3>
            {draft.stats.map((s, i) => (
              <div key={i} className="stat-row">
                <input placeholder="Number" value={s.num} onChange={e => setStat(i, "num", e.target.value)} />
                <input placeholder="Label" value={s.label} onChange={e => setStat(i, "label", e.target.value)} />
              </div>
            ))}
          </div>

          {/* VIDEOS */}
          <div className="editor-section">
            <h3>TikTok Videos</h3>
            <p style={{ fontSize: "0.72rem", color: "var(--mocha-lt)", marginBottom: "0.8rem", lineHeight: 1.6 }}>
              Paste the video ID from your TikTok embed code (the number after <code>data-video-id=</code>).
            </p>
            {draft.videos.map((v, i) => (
              <div key={i} className="video-row">
                <div className="video-row-header">
                  <span>Video {i + 1}</span>
                  <button className="btn-remove" onClick={() => removeVideo(i)}>Remove</button>
                </div>
                <label>Label</label>
                <input placeholder="e.g. The Daxton · Birmingham" value={v.label} onChange={e => setVideo(i, "label", e.target.value)} />
                <label>TikTok Video ID</label>
                <input placeholder="e.g. 7534727352908025102" value={v.id} onChange={e => setVideo(i, "id", e.target.value)} />
              </div>
            ))}
            <button className="btn-add" onClick={addVideo}>+ Add Video</button>
          </div>

          {/* DESTINATIONS */}
          <div className="editor-section">
            <h3>Destinations</h3>
            {draft.destinations.map((d, i) => (
              <div key={i} style={{ background: "var(--blush)", borderRadius: 10, padding: "0.8rem", marginBottom: "0.6rem" }}>
                <div className="video-row-header">
                  <span style={{ fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mocha-lt)" }}>{d.name || `Destination ${i+1}`}</span>
                  <button className="btn-remove" onClick={() => removeDest(i)}>Remove</button>
                </div>
                <div className="dest-row">
                  <div><label>City / Place</label><input value={d.name} onChange={e => setDest(i, "name", e.target.value)} /></div>
                  <div><label>Region</label><input value={d.region} onChange={e => setDest(i, "region", e.target.value)} /></div>
                </div>
                <label className="dest-soon">
                  <input type="checkbox" checked={d.soon} onChange={e => setDest(i, "soon", e.target.checked)} />
                  Mark as "Coming Soon"
                </label>
              </div>
            ))}
            <button className="btn-add" onClick={addDest}>+ Add Destination</button>
          </div>
        </div>
      )}

      {/* TOAST */}
      <div className={`save-toast ${toast ? "show" : ""}`}>✦ Changes saved!</div>

      {/* PORTFOLIO */}
      <div className={`portfolio-wrap ${editing ? "panel-open" : ""}`} style={{ marginTop: "2.6rem" }}>

        {/* HERO */}
        <section className="hero">
          <p className="hero-eyebrow">{data.eyebrow}</p>

          {/* ── THE BLEND LOGO — M4-C × L3 · Ivory ── */}
          <div className="hero-logo">
            <svg width="260" height="180" viewBox="0 0 260 180" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="hero-rg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C89080"/>
                  <stop offset="50%" stopColor="#D4A090"/>
                  <stop offset="100%" stopColor="#B87868"/>
                </linearGradient>
              </defs>
              {/* THE */}
              <text x="130" y="36" fontFamily="DM Sans, sans-serif" fontSize="8" fontWeight="300" fill="#B89080" textAnchor="middle" letterSpacing="10">THE</text>
              {/* VW — rose gold gradient, italic */}
              <text x="130" y="118" fontFamily="Cormorant Garamond, serif" fontSize="90" fontWeight="300" fontStyle="italic" fill="url(#hero-rg)" textAnchor="middle">VW</text>
              {/* Double hairlines */}
              <rect x="68" y="125" width="124" height="1.2" rx="0.6" fill="#E8C5B8"/>
              <rect x="68" y="130" width="124" height="1.2" rx="0.6" fill="#E8C5B8"/>
              {/* EXPERIENCE */}
              <text x="130" y="150" fontFamily="DM Sans, sans-serif" fontSize="7.5" fontWeight="400" fill="#B89080" textAnchor="middle" letterSpacing="9">EXPERIENCE</text>
              {/* tagline */}
              <text x="130" y="168" fontFamily="DM Sans, sans-serif" fontSize="5.5" fontWeight="300" fill="#C4A898" textAnchor="middle" letterSpacing="5">TRAVEL · STAY · INSPIRE</text>
            </svg>
          </div>

          <p className="hero-handles">
            <a href={data.tiktokUrl} target="_blank">{data.tiktokHandle} on TikTok</a>
            &nbsp;·&nbsp;
            <a href={data.instagramUrl} target="_blank">{data.instagramHandle} on Instagram</a>
            &nbsp;·&nbsp;
            <a href={data.beacons} target="_blank">beacons.ai/victoriaw3</a>
          </p>
          <div className="hero-cta" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#contact" className="btn-primary">Partner With Me</a>
            <a href={data.mediaKit || "#"} target="_blank" className="btn-primary btn-secondary" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              ↓ Media Kit
            </a>
          </div>
        </section>

        {/* NAV */}
        <nav>
          <a href="#about">About</a>
          <a href="#stats">Reach</a>
          <a href="#properties">Properties</a>
          <a href="#content">Content</a>
          <a href="#destinations">Destinations</a>
          <a href="#offer">What I Offer</a>
          <a href="#contact">Collab</a>
        </nav>

        {/* ABOUT */}
        <section className="port-section" id="about">
          <p className="section-eyebrow">About Me</p>
          <h2 className="section-title">Authentic travels,<br /><em>genuinely shared.</em></h2>
          <p className="section-body">{data.bio}</p>
        </section>

        <hr className="divider" />

        {/* STATS */}
        <section className="port-section" id="stats" style={{ paddingTop: "3rem" }}>
          <div className="stats-strip">
            {data.stats.map((s, i) => (
              <div key={i}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider" style={{ marginTop: "3rem" }} />

        {/* AS SEEN AT */}
        <section className="port-section" id="properties">
          <p className="section-eyebrow">Properties I've Featured</p>
          <h2 className="section-title">Stays I've <em>loved &amp; shared.</em></h2>
          <div className="property-grid">
            {[
              { icon: "🌊", name: "Four Seasons Anguilla", location: "Anguilla, Caribbean" },
              { icon: "✨", name: "Waldorf Astoria", location: "Chicago, IL" },
              { icon: "🎰", name: "The Crockfords", location: "Las Vegas, NV" },
              { icon: "🏨", name: "The Daxton", location: "Birmingham, MI" },
            ].map((p, i) => (
              <div className="property-card" key={i}>
                <div className="property-icon">{p.icon}</div>
                <div className="property-name">{p.name}</div>
                <div className="property-location">{p.location}</div>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider" />

        {/* CONTENT */}
        <section className="port-section" id="content">
          <p className="section-eyebrow">Content Portfolio</p>
          <h2 className="section-title">Stories that <em>travel</em><br />beyond the screen.</h2>
          <p className="section-body">From resort tours and room reveals to spa mornings and sunset rooftops — I create content that makes viewers feel like they're already there.</p>
          <div className="video-grid">
            {data.videos.map((v, i) => (
              <VideoCard key={v.id || `placeholder-${i}`} video={v} index={i} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={data.tiktokUrl} target="_blank" className="btn-primary">View TikTok ↗</a>
            <a href={data.instagramUrl} target="_blank" className="btn-primary btn-secondary">View Instagram ↗</a>
          </div>
        </section>

        <hr className="divider" />

        {/* DESTINATIONS */}
        <section className="port-section" id="destinations">
          <p className="section-eyebrow">Destinations</p>
          <h2 className="section-title">Where I've been<br /><em>&amp; where I'm going.</em></h2>
          <div className="dest-grid">
            {data.destinations.map((d, i) => (
              <div className="dest-card" key={i}>
                <svg className="dest-bg" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id={`g${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={`#${d.color.split(",")[0].replace("#","")}`} />
                      <stop offset="100%" stopColor={`#${d.color.split(",")[1].replace("#","")}`} />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="300" fill={`url(#g${i})`} />
                </svg>
                <div className="dest-overlay">
                  <div className="dest-region">{d.region}</div>
                  <div className="dest-name">{d.name}</div>
                  {d.soon && <div className="dest-soon-tag">Coming Soon</div>}
                </div>
              </div>
            ))}
            <div className="dest-card">
              <svg className="dest-bg" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="gopen" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#e8c5b8" /><stop offset="100%" stopColor="#c89880" /></linearGradient></defs>
                <rect width="400" height="300" fill="url(#gopen)" />
              </svg>
              <div className="dest-overlay">
                <div className="dest-region">Open to Collaboration</div>
                <div className="dest-name">Your Destination →</div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* OFFER */}
        <section className="port-section" id="offer">
          <p className="section-eyebrow">Partnership Options</p>
          <h2 className="section-title">What we can<br /><em>create together.</em></h2>
          <p className="section-body">I offer flexible collaboration formats tailored to each property's goals — from intimate feature stays to full content campaigns across TikTok and Instagram.</p>
          <div className="offer-grid">
            {[
              { icon: "🎬", title: "TikTok Feature Video", desc: "A dedicated short-form video showcasing your property — room tour, amenities, atmosphere — edited in my signature aesthetic." },
              { icon: "🏨", title: "Hosted Stay Coverage", desc: "Full stay content package: multiple TikToks, photo assets, and an honest lifestyle narrative across all content." },
              { icon: "✨", title: "Add-On Collab", desc: "In exchange for comp experiences — spa, dining, excursions — I'll create dedicated highlight content for that offering." },
              { icon: "📍", title: "Destination Campaign", desc: "Multi-day, multi-post content series capturing your destination or resort across a full travel experience." },
            ].map((o, i) => (
              <div className="offer-card" key={i}>
                <div className="offer-icon">{o.icon}</div>
                <div className="offer-title">{o.title}</div>
                <div className="offer-desc">{o.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider" />

        {/* CONTACT */}
        <div className="contact-wrap" id="contact">
          <div className="contact-inner">
            <p className="section-eyebrow">Let's Connect</p>
            <h2 className="section-title">Every great stay<br />deserves to be seen.<br /><em>Let's work.</em></h2>
            <p className="section-body" style={{ margin: "0 auto", textAlign: "center" }}>
              Whether you have a specific campaign in mind or just want to explore what a partnership could look like, I'd love to hear from you.
            </p>
            {submitted ? (
              <div className="success-msg" style={{ marginTop: "2rem" }}>✦ Thank you! I'll be in touch within 48 hours.</div>
            ) : (
              <div className="contact-form">
                <div className="form-row">
                  <input id="fn" type="text" placeholder="Your Name" />
                  <input id="fb" type="text" placeholder="Property / Brand Name" />
                </div>
                <input id="fe" type="email" placeholder="Email Address" />
                <select id="ft" defaultValue="">
                  <option value="" disabled>Partnership Type</option>
                  <option>Hosted Stay</option>
                  <option>Add-On / Comp Experience</option>
                  <option>TikTok Feature Video</option>
                  <option>Destination Campaign</option>
                  <option>Other — Let's Chat</option>
                </select>
                <textarea id="fm" placeholder="Tell me about your property and what you have in mind…" />
                <button className="btn-primary" onClick={() => {
                  const name = document.getElementById("fn")?.value.trim();
                  const email = document.getElementById("fe")?.value.trim();
                  if (!name || !email) { alert("Please fill in your name and email."); return; }
                  setSubmitted(true);
                }}>Send Inquiry</button>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <footer>
          <p>
            © 2026 {data.name} &nbsp;·&nbsp;
            <a href={data.tiktokUrl} target="_blank">{data.tiktokHandle}</a> &nbsp;·&nbsp;
            <a href={data.instagramUrl} target="_blank">{data.instagramHandle}</a> &nbsp;·&nbsp;
            <a href={data.beacons} target="_blank">beacons.ai/victoriaw3</a> &nbsp;·&nbsp;
            <a href={`mailto:${data.email}`}>{data.email}</a>
          </p>
        </footer>
      </div>
    </>
  );
}
