"use client";

import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";

/* ---------- Where each card goes (edit here) ---------- */
const PHOTO_SRC = "/assets/WhatsApp%20Image%202026-10-04%20at%2014.00.07.jpeg";

const GIFTS = [
  { id: "bouquet", label: "Hadiah 1: buket bunga", href: "/bouquet" },
  { id: "memories", label: "Hadiah 2: kenangan kita", href: "/gift_memories" },
  { id: "game", label: "Hadiah 3: game", href: "/gift_game" },
  // Optional: add  image: "/assets/your-art.png"  to a gift to use your own picture instead of the drawn one
];

/* ---------- Animations ---------- */
const riseIn = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: none; }
`;

/* ---------- Fonts / tokens ---------- */
const playfair = '"Playfair Display", "Libre Baskerville", Georgia, serif';
const garamond = '"Cormorant Garamond", "Playfair Display", serif';
const hand = '"Caveat", cursive';
const NAVY = "#14307a";

/* ---------- Background doodles ---------- */
const DOODLES = [
  { t: "MORE LOVE", x: 9, y: 3, r: -4, s: 5 },
  { t: "FOREVER", x: 47, y: 4, r: -3, s: 6 },
  { t: "♡", x: 62, y: 2, r: 8, s: 6 },
  { t: "ADORE", x: 80, y: 14, r: -6, s: 6 },
  { t: "YOU", x: 20, y: 17, r: -8, s: 5 },
  { t: "in love", x: 40, y: 20, r: -4, s: 5 },
  { t: "FOREVER", x: 10, y: 27, r: -6, s: 5 },
  { t: "♡", x: 4, y: 33, r: -12, s: 7 },
  { t: "LOVE", x: 2, y: 52, r: -8, s: 5 },
  { t: "YOU", x: 1, y: 66, r: 8, s: 6 },
  { t: "LOVE", x: 88, y: 40, r: -10, s: 5 },
  { t: "TRUE", x: 90, y: 54, r: -4, s: 5 },
  { t: "♡", x: 66, y: 55, r: 6, s: 7 },
  { t: "ER", x: 91, y: 70, r: -6, s: 6 },
  { t: "in love", x: 35, y: 90, r: -4, s: 4.5 },
  { t: "♡", x: 70, y: 86, r: 10, s: 5 },
];

/* ---------- Scalloped (postage-stamp) card outline ---------- */
const W = 270;
const H = 450;
const D = 22.5;
function scallopPath() {
  const nx = Math.round(W / D);
  const ny = Math.round(H / D);
  const dx = W / nx;
  const dy = H / ny;
  let p = "M0 0";
  for (let i = 1; i <= nx; i++) p += ` A${dx / 2} ${dx / 2} 0 0 1 ${i * dx} 0`;
  for (let j = 1; j <= ny; j++) p += ` A${dy / 2} ${dy / 2} 0 0 1 ${W} ${j * dy}`;
  for (let i = nx - 1; i >= 0; i--) p += ` A${dx / 2} ${dx / 2} 0 0 1 ${i * dx} ${H}`;
  for (let j = ny - 1; j >= 0; j--) p += ` A${dy / 2} ${dy / 2} 0 0 1 0 ${j * dy}`;
  return p + " Z";
}
const SCALLOP = scallopPath();

/* ---------- Corner flowers ---------- */
function Flower({ id, c1, c2, center, sx }) {
  return (
    <Box component="svg" viewBox="-50 -50 100 100" sx={{ display: "block", filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.35))", ...sx }}>
      <defs>
        <radialGradient id={id} cx="50%" cy="90%" r="85%">
          <stop offset="0" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </radialGradient>
      </defs>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy="-22" rx="17" ry="27" transform={`rotate(${a})`} fill={`url(#${id})`} />
      ))}
      <circle r="7" fill={center} />
    </Box>
  );
}

/* ---------- Card artwork (drawn in a 270 x 450 space) ---------- */
function Rose({ cx, cy, r, c1, c2 }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={c1} />
      <circle cx={cx} cy={cy} r={r * 0.68} fill="none" stroke={c2} strokeWidth="1.6" opacity="0.8" />
      <path
        d={`M${cx - r * 0.45} ${cy + r * 0.1} a${r * 0.45} ${r * 0.45} 0 1 1 ${r * 0.8} ${r * 0.25} M${cx - r * 0.15} ${cy - r * 0.1} a${r * 0.22} ${r * 0.22} 0 1 1 ${r * 0.3} ${r * 0.2}`}
        fill="none"
        stroke={c2}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </g>
  );
}

function BouquetArt() {
  const roses = [
    [92, 168, 25, "#7894c4", "#4d6aa3"],
    [138, 150, 26, "#6b89bb", "#465f98"],
    [182, 172, 25, "#86a1cc", "#566fa8"],
    [112, 205, 24, "#6f8cbd", "#4a6499"],
    [160, 202, 25, "#7c98c7", "#4f6ba3"],
    [196, 214, 20, "#8aa4cf", "#5a74ab"],
    [134, 240, 22, "#6684b7", "#425b94"],
  ];
  return (
    <g>
      {/* stems */}
      <g stroke="#6f8160" strokeWidth="3.4" strokeLinecap="round" fill="none">
        <path d="M118 250 C128 290, 134 320, 128 372" />
        <path d="M134 262 C136 300, 138 330, 134 376" />
        <path d="M150 256 C146 296, 142 330, 140 372" />
        <path d="M170 236 C160 280, 146 320, 142 366" />
      </g>
      {/* leaves */}
      <ellipse cx="82" cy="236" rx="24" ry="9" transform="rotate(35 82 236)" fill="#7a8f6e" />
      <ellipse cx="100" cy="262" rx="22" ry="8" transform="rotate(55 100 262)" fill="#6c8163" />
      <ellipse cx="190" cy="248" rx="20" ry="8" transform="rotate(-40 190 248)" fill="#7a8f6e" />
      {roses.map(([cx, cy, r, c1, c2], i) => (
        <Rose key={i} cx={cx} cy={cy} r={r} c1={c1} c2={c2} />
      ))}
      {/* ribbon */}
      <g fill="#a9c3e6" stroke="#7fa2d4" strokeWidth="1">
        <path d="M135 308 C112 288, 98 304, 118 316 C100 326, 112 338, 135 314 Z" />
        <path d="M135 308 C158 288, 172 304, 152 316 C170 326, 158 338, 135 314 Z" />
        <circle cx="135" cy="311" r="5" />
      </g>
      <path d="M130 316 C122 340, 116 360, 108 388 M140 316 C148 340, 150 362, 158 390" stroke="#a9c3e6" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  );
}

function MemoriesArt() {
  return (
    <g>
      {/* vinyl */}
      <circle cx="170" cy="182" r="60" fill="#141414" />
      <circle cx="170" cy="182" r="48" fill="none" stroke="#333" strokeWidth="1.4" />
      <circle cx="170" cy="182" r="38" fill="none" stroke="#2c2c2c" strokeWidth="1.2" />
      <circle cx="170" cy="182" r="14" fill="#1f4fb0" />
      <circle cx="170" cy="182" r="3" fill="#cfd5df" />
      {/* polaroid with bow */}
      <g transform="rotate(-6 85 215)">
        <rect x="30" y="150" width="112" height="132" fill="#f8f8f8" style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }} />
        <clipPath id="gift-photo-clip">
          <rect x="37" y="157" width="98" height="98" />
        </clipPath>
        <image href={PHOTO_SRC} x="37" y="157" width="98" height="98" preserveAspectRatio="xMidYMid slice" clipPath="url(#gift-photo-clip)" />
        <g fill="#14307a">
          <path d="M44 152 C26 128, 12 142, 30 152 C14 162, 34 172, 44 154 Z" />
          <path d="M44 152 C60 130, 78 136, 64 152 C80 160, 60 172, 44 154 Z" />
          <circle cx="45" cy="153" r="4" />
          <path d="M42 156 L32 196 L40 192 L38 206 L48 160 Z" />
        </g>
      </g>
      {/* camera */}
      <g transform="rotate(-4 135 320)">
        <rect x="58" y="276" width="158" height="92" rx="10" fill="#1f4fb0" />
        <rect x="58" y="264" width="158" height="30" rx="7" fill="#d3d8e2" />
        <rect x="76" y="258" width="26" height="12" rx="3" fill="#aab2c2" />
        <rect x="178" y="256" width="22" height="12" rx="3" fill="#c3c9d6" />
        <circle cx="140" cy="326" r="34" fill="#d3d8e2" />
        <circle cx="140" cy="326" r="26" fill="#1a1a1e" />
        <circle cx="140" cy="326" r="15" fill="#14307a" />
        <circle cx="133" cy="319" r="4" fill="rgba(255,255,255,0.6)" />
        <rect x="70" y="300" width="24" height="10" rx="3" fill="#0f3a8a" />
      </g>
    </g>
  );
}

const HEART = ["..##.##..", ".#######.", ".#######.", "..#####..", "...###...", "....#...."];
function PixelHeart({ x, y }) {
  return (
    <g fill={NAVY}>
      {HEART.flatMap((row, j) =>
        [...row].map((c, i) => (c === "#" ? <rect key={`${i}-${j}`} x={x + i * 3.6} y={y + j * 3.6} width="3.7" height="3.7" fill={i % 3 === 0 && j === 1 ? "#2f63c5" : "#2250b4"} /> : null))
      )}
    </g>
  );
}

function GameArt() {
  return (
    <g>
      <PixelHeart x={78} y={168} />
      <PixelHeart x={110} y={168} />
      <PixelHeart x={142} y={168} />
      <text x="40" y="238" fontFamily={garamond} fontStyle="italic" fontSize="40" fill={NAVY} transform="rotate(-8 90 228)">
        Game
      </text>
      <text x="168" y="238" fontFamily={playfair} fontSize="104" fill={NAVY} transform="rotate(8 200 200)">
        ?
      </text>
      <rect x="168" y="262" width="46" height="5" fill="#9aa3b5" />
      <g fill="none" stroke={NAVY} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M54 348 C42 322, 56 288, 86 286 L184 286 C214 288, 228 322, 216 348 C208 362, 192 358, 184 344 C178 335, 166 332, 135 332 C104 332, 92 335, 86 344 C78 358, 62 362, 54 348 Z" />
        <path d="M92 300 V324 M80 312 H104" />
      </g>
      <g fill="none" stroke={NAVY} strokeWidth="3">
        <circle cx="186" cy="300" r="4.5" />
        <circle cx="200" cy="312" r="4.5" />
        <circle cx="186" cy="324" r="4.5" />
        <circle cx="172" cy="312" r="4.5" />
      </g>
    </g>
  );
}

const ART = { bouquet: BouquetArt, memories: MemoriesArt, game: GameArt };

/* ---------- Page 3 ---------- */
export default function GiftsPage() {
  const router = useRouter();

  return (
    <Box sx={{ position: "fixed", inset: 0, bgcolor: "#000", display: "flex", alignItems: "center", justifyContent: "center", overflow: "auto" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Cormorant+Garamond:ital,wght@1,500&family=Caveat:wght@600&display=swap"
        rel="stylesheet"
      />

      <Box
        sx={{
          position: "relative",
          containerType: "inline-size",
          width: { xs: "100%", sm: "min(100vw, 187.7vh)" },
          aspectRatio: { xs: "auto", sm: "1220 / 650" },
          minHeight: { xs: "100vh", sm: "auto" },
          overflow: "hidden",
          display: { xs: "flex", sm: "block" },
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(180deg, #18398c 0%, #112c70 100%)",
          color: "#fff",
        }}
      >
        {/* handwriting on the wall */}
        <Box aria-hidden sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {DOODLES.map((d, i) => (
            <Box
              key={i}
              component="span"
              sx={{
                position: "absolute",
                left: `${d.x}%`,
                top: `${d.y}%`,
                transform: `rotate(${d.r}deg)`,
                fontFamily: hand,
                fontWeight: 600,
                fontSize: { xs: `${d.s * 0.5}rem`, sm: `${d.s}cqw` },
                lineHeight: 1,
                color: "rgba(190,210,255,0.16)",
                whiteSpace: "nowrap",
              }}
            >
              {d.t}
            </Box>
          ))}
        </Box>

        {/* woven band near the bottom */}
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "4.5%",
            height: "5.5%",
            backgroundColor: "#0a1a40",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "4px 4px",
          }}
        />

        {/* corner flowers */}
        <Flower id="g-fl-1" c1="#3a77ea" c2="#0f2f86" center="#0a1d5a" sx={{ position: "absolute", left: "-3%", top: "-5%", width: "9%", transform: "rotate(-20deg)", zIndex: 5 }} />
        <Flower id="g-fl-2" c1="#fff6e0" c2="#e6d2a2" center="#d9b873" sx={{ position: "absolute", left: "-2.5%", top: "9%", width: "7.5%", transform: "rotate(15deg)", zIndex: 5 }} />
        <Flower id="g-fl-3" c1="#3a77ea" c2="#0f2f86" center="#0a1d5a" sx={{ position: "absolute", right: "-3%", top: "-4%", width: "9%", transform: "rotate(25deg)", zIndex: 5 }} />
        <Flower id="g-fl-4" c1="#fff6e0" c2="#e6d2a2" center="#d9b873" sx={{ position: "absolute", right: "-2.5%", top: "12%", width: "7.5%", transform: "rotate(-10deg)", zIndex: 5 }} />

        {/* title */}
        <Typography
          component="h1"
          sx={{
            position: { xs: "static", sm: "absolute" },
            left: 0,
            right: 0,
            top: "14.6%",
            transform: { sm: "translateY(-50%)" },
            textAlign: "center",
            fontFamily: playfair,
            fontWeight: 500,
            fontSize: { xs: "1.8rem", sm: "5.1cqw" },
            lineHeight: 1.1,
            px: 2,
            mb: { xs: 4, sm: 0 },
            textShadow: "0 2px 18px rgba(0,0,0,0.35)",
            zIndex: 4,
          }}
        >
          Choose the gifts one by one
        </Typography>

        {/* the three cards */}
        <Box
          sx={{
            position: { xs: "relative", sm: "absolute" },
            left: { sm: "10.2%" },
            width: { xs: "100%", sm: "78.7%" },
            top: { sm: "30%" },
            px: { xs: "3vw", sm: 0 },
            display: "flex",
            alignItems: "flex-start",
            gap: { xs: "2vw", sm: "6cqw" },
            zIndex: 4,
          }}
        >
          {GIFTS.map((g, i) => {
            const Art = ART[g.id];
            return (
              <Box
                key={g.id}
                component="button"
                type="button"
                aria-label={g.label}
                onClick={() => router.push(g.href)}
                sx={{
                  flex: 1,
                  p: 0,
                  border: 0,
                  bgcolor: "transparent",
                  cursor: "pointer",
                  aspectRatio: "294 / 474",
                  animation: `${riseIn} 0.8s cubic-bezier(.2,.8,.2,1) ${0.15 + i * 0.15}s both`,
                  "@media (prefers-reduced-motion: reduce)": { animation: "none" },
                  transition: "transform 0.25s ease, filter 0.25s ease",
                  filter: "drop-shadow(0 10px 16px rgba(0,0,0,0.3))",
                  "&:hover, &:focus-visible": { transform: "translateY(-1.2cqw) rotate(-1deg)", filter: "drop-shadow(0 18px 24px rgba(0,0,0,0.4))" },
                  "&:active": { transform: "scale(0.98)" },
                  "&:focus-visible": { outline: "3px solid #9db8ee", outlineOffset: 6, borderRadius: 4 },
                }}
              >
                <svg viewBox="-12 -12 294 474" width="100%" height="100%" style={{ display: "block" }}>
                  <path d={SCALLOP} fill="#f7f5f0" />
                  {g.image ? (
                    <image href={g.image} x="20" y="70" width="230" height="310" preserveAspectRatio="xMidYMid meet" />
                  ) : (
                    <Art />
                  )}
                </svg>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}