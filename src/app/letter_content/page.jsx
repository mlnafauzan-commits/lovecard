"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";

/* ---------- Animations ---------- */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: none; }
`;
const flap = keyframes`
  0%, 100% { transform: scaleX(1); }
  50%      { transform: scaleX(0.3); }
`;
const float = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(var(--tilt, 0deg)); }
  50%      { transform: translate(8px, -14px) rotate(calc(var(--tilt, 0deg) + 6deg)); }
`;
const twinkle = keyframes`
  0%, 100% { opacity: 0.15; transform: scale(0.8); }
  50%      { opacity: 0.9;  transform: scale(1.2); }
`;
const caret = keyframes`
  to { visibility: hidden; }
`;

/* ---------- Tokens ---------- */
const C = {
  navy: "#0b1f4d",
  navyDeep: "#071536",
  blue: "#2a5bc0",
  paper: "#f6f0e1",
  ink: "#1a2b5c",
  rule: "rgba(42,91,192,0.22)",
  silver: "#c9d0e0",
};
const pinyon = '"Pinyon Script", "Great Vibes", cursive';
const hand = '"Caveat", "Segoe Script", cursive';

/* ---------- The 3 photos (replace src 2 and 3 with your own files in /public/assets) ---------- */
const PHOTOS = [
  {
    src: "/assets/WhatsApp%20Image%202026-10-04%20at%2014.00.07.jpeg",
    caption: "Chosen. Loved. Forever.",
    rot: -7, dy: 0, w: 200,
    pos: { left: { lg: -235 }, top: { lg: 10 } },
  },
  {
    src: "/assets/WhatsApp%20Image%202026-10-04%20at%2014.00.07.jpeg",
    caption: "You, always you.",
    rot: 4, dy: 10, w: 190,
    pos: { left: { lg: -175 }, top: { lg: 350 } },
  },
  {
    src: "/assets/WhatsApp%20Image%202026-10-04%20at%2014.00.07.jpeg",
    caption: "Today, tomorrow, always.",
    rot: 7, dy: -4, w: 200,
    pos: { right: { lg: -235 }, top: { lg: 130 } },
  },
];

const LETTER = `Untuk kamu, orang tersayangku.

Selamat ulang tahun, sayang. ♥ Hari ini adalah hari spesial karena seseorang yang begitu berarti dalam hidupku dilahirkan ke dunia. Aku bersyukur bisa mengenalmu, menyayangimu, dan menjadi bagian dari perjalanan hidupmu.
Terima kasih sudah hadir dan memberikan begitu banyak cerita, tawa, dan kebahagiaan dalam hidupku. Semoga di usia yang baru ini, semua hal baik yang kamu harapkan perlahan bisa menjadi kenyataan. Semoga kamu selalu dikelilingi kebahagiaan, kesehatan, dan orang-orang yang tulus menyayangimu.
Semoga kita bisa terus menciptakan banyak cerita indah bersama, melewati hari-hari baik maupun sulit, dan tetap saling memilih satu sama lain.

Selamat bertambah usia, sayang. I love you, today, tomorrow, and always. ♥`;

// deterministic (no Math.random) so server and client render the same
const STARS = Array.from({ length: 40 }, (_, i) => ({
  x: (i * 37 + 11) % 100,
  y: (i * 61 + 7) % 100,
  s: 2 + (i % 3),
  d: (i % 8) * 0.45,
}));

/* ---------- Pieces ---------- */
function Butterfly({ fill = "#fff", opacity = 1, sx }) {
  const wing = { transformOrigin: "50px 40px", animation: `${flap} 0.8s ease-in-out infinite` };
  const paths = (
    <>
      <path d="M50 38 C30 2, 2 6, 6 28 C9 41, 30 45, 50 40 Z" />
      <path d="M50 42 C32 44, 14 52, 22 70 C30 78, 46 63, 50 46 Z" />
    </>
  );
  return (
    <Box sx={{ animation: `${float} 6s ease-in-out infinite`, opacity, pointerEvents: "none", ...sx }}>
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

function Tape({ sx }) {
  return (
    <Box
      sx={{
        position: "absolute",
        width: 70,
        height: 22,
        background: "rgba(201,208,224,0.65)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
        ...sx,
      }}
    />
  );
}

/* ---------- Page 2, alternative design: the stationery letter ---------- */
export default function LetterContentV2() {
  const router = useRouter();
  const onNext = () => router.push("/gifts");
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(LETTER.length);
      return;
    }
    const t = window.setInterval(() => {
      setShown((n) => {
        if (n >= LETTER.length) {
          window.clearInterval(t);
          return n;
        }
        return n + 1;
      });
    }, 5);
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
        background: `radial-gradient(ellipse at 50% 0%, #1b429a 0%, ${C.navy} 45%, ${C.navyDeep} 100%)`,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Caveat:wght@500;600&display=swap"
        rel="stylesheet"
      />

      {/* twinkling stars */}
      {STARS.map((st, i) => (
        <Box
          key={i}
          aria-hidden
          sx={{
            position: "fixed",
            left: `${st.x}%`,
            top: `${st.y}%`,
            width: st.s,
            height: st.s,
            borderRadius: "50%",
            bgcolor: "#fff",
            animation: `${twinkle} 3.2s ease-in-out ${st.d}s infinite`,
            "@media (prefers-reduced-motion: reduce)": { animation: "none", opacity: 0.4 },
            pointerEvents: "none",
          }}
        />
      ))}

      {/* butterflies */}
      <Butterfly sx={{ "--tilt": "-14deg", position: "fixed", left: "3%", top: "84%", width: { xs: 40, md: 70 }, zIndex: 2 }} />
      <Butterfly fill="#9db8ee" sx={{ "--tilt": "12deg", position: "fixed", right: "7%", top: "16%", width: { xs: 32, md: 52 }, zIndex: 2, animationDelay: "-2s" }} />
      <Butterfly fill={C.silver} opacity={0.6} sx={{ "--tilt": "8deg", position: "fixed", right: "10%", bottom: "8%", width: { xs: 44, md: 90 }, zIndex: 2, animationDelay: "-3s" }} />

      <Box
        sx={{
          position: "relative",
          zIndex: 3,
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 2,
          py: { xs: 3, md: 4 },
          animation: `${fadeUp} 0.8s ease-out`,
        }}
      >
        {/* Title */}
        <Typography
          component="h1"
          sx={{
            fontFamily: pinyon,
            fontWeight: 400,
            fontSize: { xs: "3rem", md: "4.6rem" },
            lineHeight: 1.05,
            textAlign: "center",
            textShadow: "0 0 30px rgba(120,160,255,0.45)",
          }}
        >
          Happy Birthday
        </Typography>
        <Box sx={{ width: 120, height: 2, mt: 1, mb: { xs: 3, md: 4 }, background: "linear-gradient(90deg, transparent, #fff, transparent)", opacity: 0.7 }} />

        {/* Paper + polaroid */}
        <Box sx={{ position: "relative", width: "100%", maxWidth: 640 }}>
          {/* three polaroids: a row above the paper on small screens, scattered around it on large ones */}
          <Box
            sx={{
              display: { xs: "flex", lg: "contents" },
              justifyContent: "center",
              alignItems: "flex-start",
              gap: { xs: 1.2, md: 2.5 },
              mb: { xs: -3, lg: 0 },
              position: "relative",
              zIndex: 4,
            }}
          >
            {PHOTOS.map((p, i) => (
              <Box
                key={i}
                sx={{
                  position: { xs: "relative", lg: "absolute" },
                  ...p.pos,
                  width: { xs: "28vw", md: 170, lg: p.w },
                  maxWidth: p.w,
                  bgcolor: "#fafafa",
                  p: { xs: "6px 6px 9px", lg: "10px 10px 14px" },
                  transform: { xs: `rotate(${p.rot * 0.7}deg) translateY(${p.dy}px)`, lg: `rotate(${p.rot}deg)` },
                  boxShadow: "0 18px 34px rgba(0,0,0,0.5)",
                  zIndex: 4,
                }}
              >
                <Tape sx={{ top: -10, left: "50%", width: 56, transform: `translateX(-50%) rotate(${i === 1 ? -4 : 3}deg)` }} />
                <Box
                  component="img"
                  src={p.src}
                  alt={`Foto ${i + 1}`}
                  sx={{ display: "block", width: "100%", aspectRatio: "1 / 1.05", objectFit: "cover", filter: "grayscale(1) contrast(1.05)" }}
                />
                <Typography
                  sx={{
                    mt: 0.8,
                    textAlign: "center",
                    fontFamily: hand,
                    fontWeight: 600,
                    fontSize: { xs: "0.85rem", md: "1.1rem", lg: "1.2rem" },
                    lineHeight: 1.1,
                    color: C.ink,
                  }}
                >
                  “{p.caption}”
                </Typography>
              </Box>
            ))}
          </Box>

          {/* letter paper */}
          <Box
            sx={{
              position: "relative",
              bgcolor: C.paper,
              color: C.ink,
              borderRadius: "3px",
              px: { xs: 3, md: 6 },
              pt: { xs: 5, md: 4.5 },
              pb: { xs: 7, md: 8 },
              transform: "rotate(0.6deg)",
              boxShadow: "0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.4) inset",
              // ruled lines, same height as the text line-height (2rem)
              backgroundImage: `linear-gradient(${C.rule} 1px, transparent 1px), linear-gradient(180deg, rgba(0,0,0,0.04) 0%, transparent 8%, transparent 92%, rgba(0,0,0,0.05) 100%)`,
              backgroundSize: "100% 2rem, 100% 100%",
              backgroundPosition: "0 1.2rem, 0 0",
            }}
          >
            {/* postmark */}
            <Box
              sx={{
                position: "absolute",
                top: 14,
                right: 16,
                width: 64,
                height: 64,
                borderRadius: "50%",
                border: `2px solid ${C.ink}`,
                opacity: 0.55,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                transform: "rotate(10deg)",
                fontFamily: hand,
                lineHeight: 0.9,
                "&::before": { content: '""', position: "absolute", inset: 4, borderRadius: "50%", border: `1px dashed ${C.ink}` },
              }}
            >
              <Box component="span" sx={{ fontSize: "1.5rem", fontWeight: 600 }}>05</Box>
              <Box component="span" sx={{ fontSize: "0.9rem" }}>Sept</Box>
            </Box>

            {/* the letter: full text is laid out invisibly so the paper never changes size while typing */}
            <Typography
              role="text"
              aria-label={LETTER}
              sx={{
                fontFamily: hand,
                fontWeight: 500,
                fontSize: { xs: "1.3rem", md: "1.5rem" },
                lineHeight: "2rem",
                whiteSpace: "pre-line",
                textAlign: "left",
                pr: { xs: 0, md: 6 },
              }}
            >
              <span>{LETTER.slice(0, shown)}</span>
              {shown < LETTER.length && (
                <Box
                  component="span"
                  aria-hidden
                  sx={{ display: "inline-block", width: "2px", height: "1.1em", ml: "1px", verticalAlign: "text-bottom", bgcolor: C.ink, animation: `${caret} 0.8s steps(2, start) infinite` }}
                />
              )}
              <span aria-hidden style={{ color: "transparent" }}>{LETTER.slice(shown)}</span>
            </Typography>

            {/* wax seal on the bottom edge */}
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                bottom: -28,
                width: 62,
                height: 62,
                transform: "translateX(-50%)",
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 30%, #e9ecf2 0%, #a9b0bf 55%, #6e7587 100%)",
                boxShadow: "0 6px 12px rgba(0,0,0,0.5), inset 0 0 0 3px rgba(255,255,255,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: pinyon,
                fontSize: "1.9rem",
                color: "#4b5367",
                "&::before": { content: '""', position: "absolute", inset: 8, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.55)" },
              }}
            >
              S
            </Box>
          </Box>
        </Box>

        {/* Next */}
        {shown >= LETTER.length && (
          <Box
            component="button"
            type="button"
            onClick={onNext}
            sx={{
              mt: 7,
              mb: 2,
              px: 5,
              py: 1,
              border: "2px solid #fff",
              borderRadius: "999px",
              background: `linear-gradient(180deg, ${C.blue}, #173f94)`,
              color: "#fff",
              fontFamily: hand,
              fontWeight: 600,
              fontSize: "1.5rem",
              lineHeight: 1,
              cursor: "pointer",
              transition: "transform 0.15s",
              "&:hover": { transform: "scale(1.06)" },
              "&:focus-visible": { outline: "3px solid #9db8ee", outlineOffset: 3 },
            }}
          >
            Next
          </Box>
        )}
      </Box>
    </Box>
  );
}