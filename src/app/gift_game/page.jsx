"use client";

import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { keyframes } from "@mui/material/styles";

/* ---------- Konfigurasi ---------- */
const W = 780;
const H = 426;
const SCRIPT = '"Brush Script MT", "Segoe Script", "Snell Roundhand", cursive';
const SERIF = 'Georgia, "Times New Roman", serif';

// Ganti dengan foto asli (taruh di /public lalu pakai "/foto-dia.jpg", dst.)
const BOY_PHOTO = "https://placehold.co/200x200/9a9a9a/252525?text=Dia";
const GIRL_PHOTO = "https://placehold.co/200x200/b4b4b4/252525?text=Kamu";

const TOLERANCE = 40; // seberapa jauh kursor boleh melenceng dari garis (satuan viewBox)
const MAX_LIVES = 3; // jumlah nyawa; habis = kembali ke awal
const LOOK_AHEAD = 160; // batas maju per gerakan, mencegah "lompat" memotong jalur

const shakeAnim = keyframes`
  0%, 100% { transform: translateX(0); }
  15% { transform: translateX(-10px); }
  30% { transform: translateX(9px); }
  45% { transform: translateX(-7px); }
  60% { transform: translateX(5px); }
  80% { transform: translateX(-2px); }
`;
const flashAnim = keyframes`
  0% { opacity: 0.5; }
  100% { opacity: 0; }
`;
const ticketIn = keyframes`
  from { opacity: 0; transform: translateY(-48px) rotate(-5deg) scale(0.95); }
  to { opacity: 1; transform: translateY(0) rotate(0) scale(1); }
`;
const stampIn = keyframes`
  from { opacity: 0; transform: scale(2.2) rotate(-8deg); }
  to { opacity: 1; transform: scale(1) rotate(-8deg); }
`;
const riseAnim = keyframes`
  0% { opacity: 0; transform: translateY(0) scale(0.6); }
  15% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-190px) scale(1.1); }
`;

const CREAM = "#f4efe5";
const NAVY = "#14264d";
const PINK = "#ff6f98";
const PINK_DEEP = "#d6456f";

// Lekukan setengah lingkaran di sisi kiri-kanan tiket (pos: sudut mana yang dilubangi)
const notch = (pos) => {
  const y = pos === "bottom" ? "100%" : "0";
  const mask = `radial-gradient(circle 12px at 0 ${y}, #0000 97%, #000), radial-gradient(circle 12px at 100% ${y}, #0000 97%, #000)`;
  return { maskImage: mask, WebkitMaskImage: mask, maskComposite: "intersect", WebkitMaskComposite: "source-in" };
};

const TICKET_INFO = [
  ["Tanggal", "Kamu yang pilih"],
  ["Jam", "Sepulang kita"],
  ["Kursi", "Sebelah aku"],
];

// Titik-titik jalur (koordinat viewBox 780x426)
const POINTS = [
  [116, 224], [116, 356], [210, 356], [210, 250], [294, 250], [294, 374],
  [380, 374], [380, 192], [440, 192], [440, 274], [600, 274], [600, 350],
];

/* ---------- Geometri jalur ---------- */
const SEGS = [];
let TOTAL = 0;
for (let i = 0; i < POINTS.length - 1; i++) {
  const [ax, ay] = POINTS[i];
  const [bx, by] = POINTS[i + 1];
  const len = Math.hypot(bx - ax, by - ay);
  SEGS.push({ ax, ay, bx, by, len, start: TOTAL });
  TOTAL += len;
}
const PATH_D = "M" + POINTS.map((p) => p.join(" ")).join(" L");
// Titik tikungan: kalau gagal, pemain kembali ke tikungan terakhir, bukan ke awal
const CORNERS = SEGS.map((g) => g.start);

function pointAt(s) {
  const seg = SEGS.find((g) => s <= g.start + g.len) ?? SEGS[SEGS.length - 1];
  const t = Math.min(1, Math.max(0, (s - seg.start) / seg.len));
  return { x: seg.ax + (seg.bx - seg.ax) * t, y: seg.ay + (seg.by - seg.ay) * t };
}

// Titik terdekat di jalur dari (px, py), dibatasi pada rentang jarak [from, to]
function project(px, py, from, to) {
  let best = null;
  for (const g of SEGS) {
    const dx = g.bx - g.ax;
    const dy = g.by - g.ay;
    const t = Math.min(1, Math.max(0, ((px - g.ax) * dx + (py - g.ay) * dy) / (g.len * g.len)));
    const s = g.start + t * g.len;
    if (s < from || s > to) continue;
    const d = Math.hypot(px - (g.ax + dx * t), py - (g.ay + dy * t));
    if (!best || d < best.d) best = { s, d };
  }
  return best;
}

const ANSWERS = {
  mau: "Tiketnya sudah aku simpan. Nanti aku kabari jamnya 🍿",
  banget: "Aku juga nggak sabar! Pilih filmnya bareng ya 🍿💙",
};
const STAMPS = { mau: "Deal!", banget: "Deal banget!" };

export default function GiftGame() {
  const svgRef = useRef(null);
  const dragging = useRef(false);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | playing | failed | gameover | won
  const [answer, setAnswer] = useState(null);
  const [shake, setShake] = useState(false);
  const [lives, setLives] = useState(MAX_LIVES);
  const livesRef = useRef(MAX_LIVES);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const setProg = (v) => {
    progressRef.current = v;
    setProgress(v);
  };

  const setLivesBoth = (v) => {
    livesRef.current = v;
    setLives(v);
  };

  const toSvg = (e) => {
    const r = svgRef.current.getBoundingClientRect();
    return { x: ((e.clientX - r.left) * W) / r.width, y: ((e.clientY - r.top) * H) / r.height };
  };

  const onDown = (e) => {
    if (status === "won") return;
    const p = toSvg(e);
    const h = pointAt(progressRef.current);
    if (Math.hypot(p.x - h.x, p.y - h.y) > 56) return;
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setStatus("playing");
  };

  const onMove = (e) => {
    if (!dragging.current) return;
    const p = toSvg(e);
    const cur = progressRef.current;
    const hit = project(p.x, p.y, cur - 40, cur + LOOK_AHEAD);

    if (!hit || hit.d > TOLERANCE) {
      dragging.current = false;
      const left = livesRef.current - 1;
      if (left <= 0) {
        // Nyawa habis: reset penuh ke awal dengan nyawa baru
        setLivesBoth(MAX_LIVES);
        setProg(0);
        setStatus("gameover");
      } else {
        setLivesBoth(left);
        setProg(CORNERS.filter((c) => c <= cur).pop() ?? 0);
        setStatus("failed");
      }
      if (!reduceMotion) setShake(true);
      return;
    }
    const next = Math.max(cur, hit.s);
    if (next >= TOTAL - 8) {
      dragging.current = false;
      setProg(TOTAL);
      setStatus("won");
      return;
    }
    setProg(next);
  };

  const onUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    setStatus("idle");
  };

  const reset = () => {
    setAnswer(null);
    setProg(0);
    setLivesBoth(MAX_LIVES);
    setStatus("idle");
  };

  const handle = pointAt(progress);
  const showPulse = progress === 0 && status !== "playing" && !reduceMotion;

  const hint =
    status === "gameover"
      ? `Nyawa habis! Kembali ke awal dengan ${MAX_LIVES} nyawa baru.`
      : status === "failed"
        ? `Oops, keluar jalur! Sisa ${lives} nyawa. Balik ke tikungan terakhir, pegang hatinya lagi.`
        : status === "playing"
        ? "Jaga tetap di garis putus-putus…"
        : status === "won"
          ? "Sampai! 💙"
          : progress > 0
            ? "Pegang hatinya lagi untuk lanjut."
            : "Tahan hati pink di awal garis, lalu geser mengikuti jalur sampai finish.";

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        p: { xs: 1, sm: 2.5 },
        bgcolor: "#090b10",
      }}
    >
      <Box
        component="section"
        aria-label="Game Time"
        sx={{
          width: "min(100%, 160vh)",
          aspectRatio: `${W} / ${H}`,
          overflow: "hidden",
          borderRadius: { xs: 0, sm: 1 },
          boxShadow: "0 20px 70px #0009",
          userSelect: "none",
          position: "relative",
          animation: shake ? `${shakeAnim} 0.5s ease` : "none",
        }}
        onAnimationEnd={() => setShake(false)}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="100%"
          style={{ display: "block", touchAction: "none" }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <defs>
            <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#0f2250" />
              <stop offset="0.55" stopColor="#173b76" />
              <stop offset="1" stopColor="#0d2048" />
            </linearGradient>
            <radialGradient id="glow" cx="0.7" cy="0.45" r="0.6">
              <stop offset="0" stopColor="#365b99" stopOpacity="0.4" />
              <stop offset="1" stopColor="#365b99" stopOpacity="0" />
            </radialGradient>
            <pattern id="scribble" width="300" height="130" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
              <g fill="#bcd0ee" fillOpacity="0.17" fontFamily={SCRIPT} fontStyle="italic">
                <text x="6" y="30" fontSize="30">LOVE</text>
                <text x="118" y="22" fontSize="20">forever</text>
                <text x="214" y="58" fontSize="26">YOU</text>
                <text x="18" y="82" fontSize="22">ADORE</text>
                <text x="128" y="104" fontSize="30">more</text>
                <text x="226" y="118" fontSize="18">I love you</text>
                <text x="96" y="62" fontSize="16">♡</text>
              </g>
            </pattern>
            <clipPath id="boyClip"><circle cx="100" cy="180" r="44" /></clipPath>
            <clipPath id="girlClip"><circle cx="664" cy="362" r="44" /></clipPath>
          </defs>

          {/* Latar */}
          <rect width={W} height={H} fill="url(#bg)" />
          <rect width={W} height={H} fill="url(#glow)" />
          <rect width={W} height={H} fill="url(#scribble)" />

          {/* Header */}
          <rect x="56" y="78" width="724" height="46" fill="#08122a" fillOpacity="0.6" />
          <line x1="56" y1="78" x2={W} y2="78" stroke="#bcd0ee" strokeOpacity="0.18" />
          <line x1="56" y1="124" x2={W} y2="124" stroke="#bcd0ee" strokeOpacity="0.18" />
          <g fill="#dfe8fb" fontFamily={SERIF}>
            <text x="20" y="62" fontSize="24">✦</text>
            <text x="44" y="88" fontSize="14">✦</text>
            <text x="726" y="76" fontSize="22">✦</text>
            <text x="750" y="102" fontSize="14">✦</text>
          </g>
          <text
            x="700"
            y="150"
            textAnchor="end"
            fontFamily={SCRIPT}
            fontStyle="italic"
            fontSize="88"
            fill="#f7f1e9"
          >
            Game Time
          </text>

          {/* Dekorasi */}
          <g fontFamily={SERIF} fontSize="22" role="img" aria-label={`Nyawa tersisa ${lives} dari ${MAX_LIVES}`}>
            {Array.from({ length: MAX_LIVES }, (_, i) => (
              <text key={i} x={172 + i * 24} y="160" fill={i < lives ? PINK : "#9db4da"} fillOpacity={i < lives ? 1 : 0.5}>
                {i < lives ? "♥" : "♡"}
              </text>
            ))}
          </g>
          <text x="540" y="404" fontSize="22" fill="#9db4da" fillOpacity="0.85" fontFamily={SERIF}>♡♡♡</text>
          <g fill="#e6e2da" fillOpacity="0.8" fontFamily={SERIF} fontSize="15" letterSpacing="2" fontWeight="700">
            <text x="36" y="300">GAME</text>
            <text x="36" y="320">TIME</text>
          </g>
          <text
            x="632"
            y="236"
            textAnchor="middle"
            fontSize="20"
            fill="#f4f1eb"
            fontFamily={SCRIPT}
            fontStyle="italic"
            transform="rotate(-4 632 236)"
          >
            Yayy Finishh!!!
          </text>

          {/* Pill Start */}
          <rect x="180" y="178" width="76" height="28" rx="14" fill="#0b0f1a" stroke="#eae6df" strokeWidth="1.5" />
          <text x="218" y="197" textAnchor="middle" fontSize="14" fill="#fff" fontFamily={SERIF}>Start</text>

          {/* Ikon controller */}
          <g transform="translate(426 322)" fill="#1b2438" stroke="#e9e6df" strokeWidth="2" strokeLinejoin="round">
            <path d="M10 8 H38 Q50 8 52 22 L54 34 Q55 44 46 44 Q40 44 36 38 H16 Q12 44 6 44 Q-1 44 0 34 L2 22 Q4 8 10 8 Z" />
            <path d="M14 22 H24 M19 17 V27" fill="none" strokeLinecap="round" />
            <circle cx="40" cy="19" r="2.6" fill="#e9e6df" stroke="none" />
            <circle cx="46" cy="25" r="2.6" fill="#e9e6df" stroke="none" />
          </g>

          {/* Jalur: dasar putus-putus + progres */}
          <path d={PATH_D} fill="none" stroke="#fff" strokeWidth="12" strokeDasharray="26 16" strokeLinejoin="miter" />
          <path
            d={PATH_D}
            pathLength={TOTAL}
            fill="none"
            stroke="#ff9db8"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={`${progress} ${TOTAL + 10}`}
            style={{ transition: status === "playing" ? "none" : "stroke-dasharray 0.45s ease" }}
          />

          {/* Avatar */}
          <image href={BOY_PHOTO} x="56" y="136" width="88" height="88" clipPath="url(#boyClip)" preserveAspectRatio="xMidYMid slice" style={{ filter: "grayscale(1) contrast(1.05)" }} />
          <circle cx="100" cy="180" r="46" fill="none" stroke="#f2efe8" strokeWidth="4" />
          <image href={GIRL_PHOTO} x="620" y="318" width="88" height="88" clipPath="url(#girlClip)" preserveAspectRatio="xMidYMid slice" style={{ filter: "grayscale(1) contrast(1.05)" }} />
          <circle cx="664" cy="362" r="46" fill="none" stroke="#f2efe8" strokeWidth="4" />

          {/* Hati yang di-drag */}
          <g
            style={{
              transform: `translate(${handle.x}px, ${handle.y}px)`,
              transition: status === "playing" ? "none" : "transform 0.45s ease",
              cursor: status === "playing" ? "grabbing" : "grab",
            }}
          >
            {showPulse && (
              <circle r="18" fill="none" stroke="#fff" strokeWidth="2">
                <animate attributeName="r" values="18;36" dur="1.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0" dur="1.6s" repeatCount="indefinite" />
              </circle>
            )}
            <circle r="18" fill={status === "failed" || status === "gameover" ? "#ff3b5c" : "#ff6f98"} stroke="#fff" strokeWidth="3" />
            <text textAnchor="middle" y="7" fontSize="20" fill="#fff" fontFamily={SERIF}>{status === "failed" || status === "gameover" ? "✕" : "♥"}</text>
          </g>
        </svg>
        {shake && (
          <Box
            aria-hidden="true"
            sx={{ position: "absolute", inset: 0, pointerEvents: "none", bgcolor: "#ff3b5c", animation: `${flashAnim} 0.5s ease-out forwards` }}
          />
        )}
      </Box>

      <Typography
        role="status"
        sx={{ minHeight: "1.5em", color: "#cdd7ee", fontFamily: SERIF, fontSize: { xs: 13, sm: 15 }, textAlign: "center" }}
      >
        {hint}
      </Typography>

      {/* Modal ajakan nonton: tiket bioskop */}
      <Dialog
        open={status === "won"}
        aria-labelledby="movie-title"
        sx={{ "& .MuiBackdrop-root": { backdropFilter: "blur(4px)", backgroundColor: "#050a18cc" } }}
        PaperProps={{
          sx: { m: 2, width: "100%", maxWidth: 380, overflow: "visible", bgcolor: "transparent", boxShadow: "none", backgroundImage: "none" },
        }}
      >
        <Box
          sx={{
            position: "relative",
            color: NAVY,
            filter: "drop-shadow(0 18px 28px #000b)",
            animation: reduceMotion ? "none" : `${ticketIn} 0.6s cubic-bezier(0.2, 0.9, 0.3, 1.15) both`,
          }}
        >
          {/* Bagian atas tiket */}
          <Box sx={{ ...notch("bottom"), bgcolor: CREAM, borderRadius: "14px 14px 0 0", px: 3, pt: 3.5, pb: 3 }}>
            <Typography
              id="movie-title"
              component="h2"
              sx={{ fontFamily: SCRIPT, fontStyle: "italic", fontWeight: 400, fontSize: 42, lineHeight: 1.1 }}
            >
              Yayy, kamu sampai!
            </Typography>
            <Typography sx={{ mt: 1, fontFamily: SERIF, fontSize: 15, lineHeight: 1.5 }}>
              Hadiahmu satu tiket nonton film bareng aku, kursinya untuk dua orang.
            </Typography>
            <Box sx={{ mt: 2.5, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1.5 }}>
              {TICKET_INFO.map(([label, value]) => (
                <Box key={label}>
                  <Typography sx={{ fontFamily: SERIF, fontSize: 11, opacity: 0.6 }}>{label}</Typography>
                  <Typography sx={{ fontFamily: SERIF, fontSize: 13, fontWeight: 700, lineHeight: 1.3 }}>{value}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Sobekan tiket */}
          <Box
            sx={{
              ...notch("top"),
              bgcolor: CREAM,
              borderTop: "2px dashed #14264d40",
              borderRadius: "0 0 14px 14px",
              px: 3,
              pt: 2.5,
              pb: 3,
              textAlign: "center",
            }}
          >
            {answer === null ? (
              <>
                <Typography sx={{ mb: 2, fontFamily: SERIF, fontSize: 17, fontWeight: 700 }}>
                  Nonton bareng aku, mau?
                </Typography>
                <Box sx={{ display: "flex", gap: 1.5 }}>
                  <Button
                    variant="outlined"
                    onClick={() => setAnswer("mau")}
                    sx={{ flex: 1, py: 1.1, borderRadius: 999, textTransform: "none", fontFamily: SERIF, fontSize: 16, color: NAVY, borderColor: NAVY, borderWidth: 2, "&:hover": { borderWidth: 2, borderColor: NAVY, bgcolor: "#14264d12" } }}
                  >
                    Mau
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setAnswer("banget")}
                    sx={{ flex: 1.3, py: 1.1, borderRadius: 999, textTransform: "none", fontFamily: SERIF, fontSize: 16, fontWeight: 700, bgcolor: PINK, boxShadow: "none", "&:hover": { bgcolor: "#ff5487", boxShadow: "none" } }}
                  >
                    Mau banget
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box
                  role="status"
                  sx={{
                    display: "inline-block",
                    px: 2.5,
                    py: 0.5,
                    border: `3px solid ${PINK_DEEP}`,
                    borderRadius: 1,
                    color: PINK_DEEP,
                    fontFamily: SCRIPT,
                    fontStyle: "italic",
                    fontSize: 32,
                    lineHeight: 1.2,
                    transform: "rotate(-8deg)",
                    animation: reduceMotion ? "none" : `${stampIn} 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.3) both`,
                  }}
                >
                  {STAMPS[answer]}
                </Box>
                <Typography sx={{ mt: 2, mb: 2.5, fontFamily: SERIF, fontSize: 15, lineHeight: 1.5 }}>
                  {ANSWERS[answer]}
                </Typography>
                <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center" }}>
                  <Button
                    onClick={reset}
                    sx={{ px: 3, borderRadius: 999, textTransform: "none", fontFamily: SERIF, color: NAVY }}
                  >
                    Main lagi
                  </Button>
                  <Button
                    component="a"
                    href="/gifts"
                    variant="outlined"
                    sx={{ px: 3, borderRadius: 999, textTransform: "none", fontFamily: SERIF, color: NAVY, borderColor: NAVY, borderWidth: 2, "&:hover": { borderWidth: 2, borderColor: NAVY, bgcolor: "#14264d12" } }}
                  >
                    Kembali
                  </Button>
                </Box>
              </>
            )}
          </Box>

          {/* Hati naik saat jawab "Mau banget" */}
          {answer === "banget" && !reduceMotion && (
            <Box aria-hidden="true" sx={{ position: "absolute", left: 0, right: 0, bottom: 90, height: 0, pointerEvents: "none" }}>
              {Array.from({ length: 12 }, (_, i) => (
                <Box
                  component="span"
                  key={i}
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: `${6 + i * 8}%`,
                    color: PINK,
                    fontSize: 16 + (i % 3) * 8,
                    lineHeight: 1,
                    animation: `${riseAnim} 1.4s ease-out ${(i % 6) * 0.08}s both`,
                  }}
                >
                  ♥
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Dialog>
    </Box>
  );
}