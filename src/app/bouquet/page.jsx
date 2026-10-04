"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";

/* ---------- Text on the note (edit freely) ---------- */
const NOTE = `Di antara banyaknya hal yang aku syukuri dalam hidup, bertemu dan memiliki kamu adalah salah satunya. Semoga di usia barumu, kamu semakin dekat dengan semua impianmu. Jangan lupa, di setiap langkahmu nanti, akan selalu ada aku yang mendukungmu dan menyayangimu.`;

/* ---------- Tokens ---------- */
const C = {
  navy: "#0c1f4b",
  deep: "#071536",
  blue: "#2a5bc0",
  powder: "#9db4e0",
  cream: "#f7f2e5",
  ink: "#1d2b52",
};
const pinyon = '"Pinyon Script", "Great Vibes", cursive';
const garamond = '"Cormorant Garamond", "Playfair Display", serif';
const playfair = '"Playfair Display", "Libre Baskerville", Georgia, serif';

/* ---------- Animations ---------- */
const rise = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: none; }
`;
const sway = keyframes`
  0%, 100% { transform: rotate(-1.5deg); }
  50%      { transform: rotate(1.5deg); }
`;
const flap = keyframes`
  0%, 100% { transform: scaleX(1); }
  50%      { transform: scaleX(0.3); }
`;
const float = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(var(--tilt, 0deg)); }
  50%      { transform: translate(8px, -14px) rotate(calc(var(--tilt, 0deg) + 6deg)); }
`;
const caret = keyframes`
  to { visibility: hidden; }
`;
const still = { "@media (prefers-reduced-motion: reduce)": { animation: "none" } };

/* ---------- Small pieces ---------- */
function Butterfly({ fill = "#fff", opacity = 1, sx }) {
  const wing = { transformOrigin: "50px 40px", animation: `${flap} 0.8s ease-in-out infinite` };
  const paths = (
    <>
      <path d="M50 38 C30 2, 2 6, 6 28 C9 41, 30 45, 50 40 Z" />
      <path d="M50 42 C32 44, 14 52, 22 70 C30 78, 46 63, 50 46 Z" />
    </>
  );
  return (
    <Box sx={{ animation: `${float} 6s ease-in-out infinite`, opacity, pointerEvents: "none", ...still, ...sx }}>
      <Box component="svg" viewBox="0 0 100 80" sx={{ width: "100%", display: "block", fill, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.35))" }}>
        <g style={wing}>{paths}</g>
        <g style={wing}>
          <g transform="translate(100 0) scale(-1 1)">{paths}</g>
        </g>
        <ellipse cx="50" cy="42" rx="2.4" ry="14" fill={fill} />
      </Box>
    </Box>
  );
}

function Bloom5({ c = "#4d74c6", sx }) {
  return (
    <Box component="svg" viewBox="-50 -50 100 100" sx={{ display: "block", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))", ...sx }}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy="-24" rx="16" ry="25" transform={`rotate(${a})`} fill={c} stroke="#e9effc" strokeWidth="2.6" />
      ))}
      <circle r="9" fill="#dfe8fb" stroke="#e9effc" strokeWidth="2" />
    </Box>
  );
}

function Dried({ id, sx }) {
  return (
    <Box component="svg" viewBox="-50 -50 100 100" sx={{ display: "block", filter: "drop-shadow(0 5px 6px rgba(0,0,0,0.3))", ...sx }}>
      <defs>
        <radialGradient id={id} cx="50%" cy="85%" r="85%">
          <stop offset="0" stopColor="#e9e2cc" />
          <stop offset="1" stopColor="#a89f78" />
        </radialGradient>
      </defs>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse key={a} cx="0" cy="-22" rx="17" ry="25" transform={`rotate(${a})`} fill={`url(#${id})`} stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />
      ))}
      <circle r="8" fill="#6f6b4f" />
    </Box>
  );
}

/* ---------- Bouquet drawn in code (swap for your own image if you have one) ---------- */
function Bloom({ cx, cy, r, c }) {
  return (
    <g>
      {[0, 72, 144, 216, 288].map((a) => {
        const rad = (a * Math.PI) / 180;
        return <circle key={a} cx={cx + Math.cos(rad) * r * 0.55} cy={cy + Math.sin(rad) * r * 0.55} r={r * 0.55} fill={c} stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />;
      })}
      <circle cx={cx} cy={cy} r={r * 0.3} fill="#e8eefc" />
    </g>
  );
}

function Bouquet() {
  const blooms = [
    [58, 78, 17, "#3d62b3"], [88, 62, 18, "#6f8fd0"], [122, 70, 17, "#4a6fc0"], [150, 88, 15, "#9db6e6"],
    [70, 104, 16, "#8aa6dc"], [102, 92, 19, "#2e4f9f"], [134, 108, 16, "#5b80cf"], [48, 100, 13, "#a9bfe8"],
    [86, 120, 15, "#4a6fc0"], [118, 128, 14, "#7d9bd6"], [160, 112, 12, "#3d62b3"], [104, 58, 12, "#a9bfe8"],
  ];
  return (
    <Box component="svg" viewBox="0 0 200 230" sx={{ display: "block", width: "100%", filter: "drop-shadow(0 12px 14px rgba(7,21,54,0.45))" }}>
      <g transform="rotate(-10 60 50)">
        <rect x="6" y="6" width="104" height="82" fill="#ecebe4" stroke="#cfcdc3" />
        <text x="12" y="24" fontFamily="Georgia, serif" fontWeight="700" fontSize="9" fill="#3b3b3b">SPRING FLOWERS</text>
        {[34, 42, 50, 58, 66, 74].map((y) => (
          <rect key={y} x="12" y={y} width="92" height="2.2" fill="#b8b6ad" />
        ))}
      </g>
      <path d="M24 96 C60 70, 140 66, 182 98 L116 226 Z" fill="#c4d1ea" />
      <path d="M34 104 C70 128, 112 120, 116 226 L58 200 Z" fill="#eaeff9" />
      <path d="M182 98 C172 144, 146 196, 116 226 L130 138 Z" fill="#aebfe0" />
      <path d="M58 200 L116 226 L96 150 Z" fill="#dce5f4" />
      {blooms.map(([cx, cy, r, c], i) => (
        <Bloom key={i} cx={cx} cy={cy} r={r} c={c} />
      ))}
      <g fill="#5b82cf" stroke="#3f63b0" strokeWidth="1">
        <path d="M112 176 C86 156, 72 176, 96 186 C76 200, 92 210, 112 188 Z" />
        <path d="M112 176 C138 156, 152 176, 128 186 C148 200, 132 210, 112 188 Z" />
        <circle cx="112" cy="182" r="6" />
      </g>
      <path d="M108 190 C100 206, 94 218, 86 228 M118 190 C126 206, 134 220, 142 228" stroke="#5b82cf" strokeWidth="4" fill="none" strokeLinecap="round" />
    </Box>
  );
}

/* ---------- Page: /bouquet ---------- */
export default function BouquetPage() {
  const router = useRouter();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(NOTE.length);
      return;
    }
    const t = window.setInterval(() => {
      setShown((n) => {
        if (n >= NOTE.length) {
          window.clearInterval(t);
          return n;
        }
        return n + 1;
      });
    }, 28);
    return () => window.clearInterval(t);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        overflowY: "auto",
        overflowX: "hidden",
        color: "#fff",
        background: `radial-gradient(ellipse at 50% 0%, #1b429a 0%, ${C.navy} 50%, ${C.deep} 100%)`,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Cormorant+Garamond:ital,wght@1,500&family=Playfair+Display:wght@400;500&display=swap"
        rel="stylesheet"
      />

      {/* faint gingham across the whole page */}
      <Box
        aria-hidden
        sx={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(90deg, rgba(140,175,255,0.07) 50%, transparent 50%), linear-gradient(0deg, rgba(140,175,255,0.07) 50%, transparent 50%)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* corner flowers: top-right and bottom-left, kept out of the content */}
      <Box aria-hidden sx={{ display: { xs: "none", md: "block" }, position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        <Bloom5 c="#3b5fae" sx={{ position: "absolute", right: 70, top: 24, width: 84, transform: "rotate(18deg)" }} />
        <Bloom5 c="#5c82d4" sx={{ position: "absolute", right: 24, top: 96, width: 56, transform: "rotate(-12deg)" }} />
        <Bloom5 c="#4d74c6" sx={{ position: "absolute", left: 26, bottom: 90, width: 64, transform: "rotate(10deg)" }} />
        <Dried id="br-dried-1" sx={{ position: "absolute", left: -34, bottom: -34, width: 150, transform: "rotate(-10deg)" }} />
        <Dried id="br-dried-2" sx={{ position: "absolute", right: -40, bottom: -40, width: 170, transform: "rotate(14deg)" }} />
      </Box>

      {/* butterflies */}
      <Butterfly sx={{ "--tilt": "-12deg", position: "fixed", left: "7%", top: "20%", width: { xs: 34, md: 56 }, zIndex: 2 }} />
      <Butterfly fill="#9db8ee" sx={{ "--tilt": "12deg", position: "fixed", right: "9%", top: "58%", width: { xs: 28, md: 44 }, zIndex: 2, animationDelay: "-2s" }} />

      {/* ===== Content ===== */}
      <Box
        sx={{
          position: "relative",
          zIndex: 3,
          maxWidth: 1100,
          minHeight: "100%",
          mx: "auto",
          px: { xs: 2, sm: 4 },
          py: { xs: 2.5, md: 3.5 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* top bar */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          <Box
            component="button"
            type="button"
            onClick={() => router.push("/gifts")}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2.5,
              py: 0.9,
              border: "1.5px solid rgba(255,255,255,0.85)",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.06)",
              color: "#fff",
              fontFamily: garamond,
              fontStyle: "italic",
              fontSize: "1.25rem",
              lineHeight: 1,
              cursor: "pointer",
              transition: "background 0.2s, transform 0.15s",
              "&:hover": { background: "rgba(255,255,255,0.16)", transform: "translateX(-2px)" },
              "&:focus-visible": { outline: "3px solid #9db8ee", outlineOffset: 3 },
            }}
          >
            <span aria-hidden>‹</span> Back
          </Box>
        </Box>

        {/* title */}
        <Typography
          component="h1"
          sx={{
            textAlign: "center",
            fontFamily: garamond,
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(2.4rem, 6.4vw, 4.6rem)",
            lineHeight: 1.1,
            mt: { xs: 1.5, md: 0.5 },
            mb: { xs: 3, md: 4 },
            textShadow: "0 0 34px rgba(120,160,255,0.45)",
            animation: `${rise} 0.8s ease-out both`,
            ...still,
          }}
        >
          <Box component="span" sx={{ fontFamily: pinyon, fontStyle: "normal", fontSize: "1.45em", mr: "0.02em" }}>B</Box>
          eautiful flowers
        </Typography>

        {/* bouquet + note */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(300px, 400px) 1fr" },
            alignItems: "center",
            justifyItems: "center",
            gap: { xs: 4, md: 7 },
            flex: 1,
            pb: { xs: 4, md: 2 },
          }}
        >
          {/* arch with the bouquet */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: { xs: 340, md: 400 },
              aspectRatio: "4 / 5",
              borderRadius: "999px 999px 22px 22px",
              border: `5px solid ${C.cream}`,
              overflow: "hidden",
              backgroundColor: C.powder,
              backgroundImage:
                "linear-gradient(90deg, rgba(48,88,172,0.34) 50%, transparent 50%), linear-gradient(0deg, rgba(48,88,172,0.34) 50%, transparent 50%)",
              backgroundSize: "40px 40px",
              boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
              animation: `${rise} 0.9s ease-out 0.15s both`,
              ...still,
            }}
          >
            <Box sx={{ position: "absolute", left: "50%", bottom: "6%", width: "82%", transform: "translateX(-50%)" }}>
              <Box sx={{ transformOrigin: "50% 92%", animation: `${sway} 6s ease-in-out infinite`, ...still }}>
                <Bouquet />
              </Box>
            </Box>
          </Box>

          {/* note */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: 520,
              px: { xs: 3.5, md: 5.5 },
              pt: { xs: 5, md: 6 },
              pb: { xs: 7, md: 8 },
              bgcolor: C.cream,
              color: C.ink,
              borderRadius: "6px",
              boxShadow: "0 24px 50px rgba(0,0,0,0.45)",
              // thin inner frame, like fine stationery
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 10,
                border: "1px solid rgba(29,43,82,0.28)",
                borderRadius: "3px",
                pointerEvents: "none",
              },
              animation: `${rise} 0.9s ease-out 0.3s both`,
              ...still,
            }}
          >
            <Typography
              role="text"
              aria-label={NOTE}
              sx={{
                fontFamily: playfair,
                fontSize: { xs: "1.05rem", md: "1.2rem" },
                lineHeight: 1.85,
                textAlign: "center",
              }}
            >
              <span>{NOTE.slice(0, shown)}</span>
              {shown < NOTE.length && (
                <Box
                  component="span"
                  aria-hidden
                  sx={{ display: "inline-block", width: "1px", height: "1em", ml: "2px", verticalAlign: "text-bottom", bgcolor: "currentColor", animation: `${caret} 0.8s steps(2, start) infinite` }}
                />
              )}
              {/* unrevealed text keeps its space so the note never changes size */}
              <span aria-hidden style={{ color: "transparent" }}>{NOTE.slice(shown)}</span>
            </Typography>

            <Typography
              aria-hidden
              sx={{ mt: 2, textAlign: "center", fontFamily: pinyon, fontSize: "2rem", lineHeight: 1, color: C.blue }}
            >
              ♥
            </Typography>

            {/* wax seal */}
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                right: 28,
                bottom: -26,
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 30%, #e9ecf2 0%, #a9b0bf 55%, #6e7587 100%)",
                boxShadow: "0 6px 12px rgba(0,0,0,0.45), inset 0 0 0 3px rgba(255,255,255,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: pinyon,
                fontSize: "1.8rem",
                color: "#4b5367",
                "&::before": { content: '""', position: "absolute", inset: 7, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.55)" },
              }}
            >
              S
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}