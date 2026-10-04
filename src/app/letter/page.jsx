"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";

/* ---------- Animations ---------- */
// Envelope shakes for ~0.6s, then rests, repeating
const shake = keyframes`
  0%   { transform: rotate(-2deg) translate(0, 0); }
  3%   { transform: rotate(-6deg) translate(-5px, 0); }
  6%   { transform: rotate(2deg) translate(5px, -2px); }
  9%   { transform: rotate(-6deg) translate(-5px, 0); }
  12%  { transform: rotate(2deg) translate(4px, -2px); }
  15%  { transform: rotate(-5deg) translate(-3px, 0); }
  18%  { transform: rotate(0deg) translate(3px, 0); }
  21%  { transform: rotate(-3deg) translate(-2px, 0); }
  25%, 100% { transform: rotate(-2deg) translate(0, 0); }
`;
const flap = keyframes`
  0%, 100% { transform: scaleX(1); }
  50%      { transform: scaleX(0.25); }
`;
const float = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(var(--tilt, 0deg)); }
  50%      { transform: translate(6px, -12px) rotate(calc(var(--tilt, 0deg) + 6deg)); }
`;
const openTransition = keyframes`
  to { opacity: 0; transform: scale(1.04); filter: blur(8px); }
`;

function Butterfly({ sx }) {
  const wing = { transformOrigin: "50px 40px", animation: `${flap} 0.5s ease-in-out infinite` };
  const paths = (
    <>
      <path d="M50 38 C30 2, 2 6, 6 28 C9 41, 30 45, 50 40 Z" />
      <path d="M50 42 C32 44, 14 52, 22 70 C30 78, 46 63, 50 46 Z" />
    </>
  );
  return (
    <Box sx={{ animation: `${float} 4s ease-in-out infinite`, ...sx }}>
      <Box
        component="svg"
        viewBox="0 0 100 80"
        sx={{ width: "100%", display: "block", fill: "#fff", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.35))" }}
      >
        <g style={wing}>{paths}</g>
        <g style={wing}>
          <g transform="translate(100 0) scale(-1 1)">{paths}</g>
        </g>
        <ellipse cx="50" cy="42" rx="2.4" ry="14" fill="#cfd8ee" />
        <path d="M49 28 C46 18, 42 14, 40 12 M51 28 C54 18, 58 14, 60 12" stroke="#fff" strokeWidth="1.2" fill="none" />
      </Box>
    </Box>
  );
}

/* ---------- PLACEHOLDER ASSETS (replace with your own) ---------- */
// Couple photo for the polaroid
const PHOTO_SRC = "/assets/WhatsApp%20Image%202026-10-04%20at%2014.00.07.jpeg";
// Optional: wax-seal image. Leave "" to use the CSS seal below.
const SEAL_SRC = "";

const SCRIBBLE = `love you  ♡  forever  ·  always  ·  you  ✦  my person  ·  home  ·  us  ·  ∞
you & me  ·  every day  ·  mine  ·  my heart  ·  love  ·  forever  ·  yours  ♡
x o x o  ·  hold me  ·  stay  ·  mine  ·  ✧  you, always  ·  love  ·  us  ·  ∞`;

const script = '"Great Vibes", "Brush Script MT", "Segoe Script", cursive';

export default function LetterPage() {
  const router = useRouter();
  const [isOpening, setIsOpening] = useState(false);
  const openLetter = () => {
    if (isOpening) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push("/letter_content");
      return;
    }
    setIsOpening(true);
    window.setTimeout(() => router.push("/letter_content"), 550);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        color: "#fff",
        // dark navy base with soft light patches, like the reference
        background:
          "radial-gradient(circle at 20% 30%, #1d3f86 0%, transparent 45%), radial-gradient(circle at 80% 80%, #16316d 0%, transparent 50%), #0b1f4d",
        animation: isOpening ? `${openTransition} 550ms ease-in forwards` : "none",
      }}
    >
      {/* Google font for the script text */}
      <link
        href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Caveat:wght@500&display=swap"
        rel="stylesheet"
      />

      {/* ---------- Scribble doodles (left side) ---------- */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          left: "1.5vw",
          top: "4vh",
          width: "34vw",
          height: "92vh",
          overflow: "hidden",
          fontFamily: '"Caveat", cursive',
          fontSize: { xs: "3.2vw", sm: "1.6vw" },
          lineHeight: 1.9,
          color: "rgba(255,255,255,0.22)",
          whiteSpace: "pre-wrap",
          transform: "rotate(-4deg)",
          pointerEvents: "none",
          maskImage: "linear-gradient(90deg, #000 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, #000 40%, transparent 100%)",
        }}
      >
        {Array.from({ length: 6 }).map(() => SCRIBBLE).join("\n")}
      </Box>

      {/* ---------- Polaroid ---------- */}
      <Box
        sx={{
          position: "absolute",
          left: { xs: "6vw", sm: "13vw" },
          top: { xs: "12vh", sm: "14vh" },
          width: { xs: "42vw", sm: "22vw" },
          maxWidth: 300,
          aspectRatio: "0.66 / 1",
          overflow: "hidden",
          transform: "rotate(-4deg)",
          boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
          zIndex: 3,
        }}
      >
        <Box
          component="img"
          src={PHOTO_SRC}
          alt="Us"
          sx={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      {/* Caption under polaroid */}
      <Typography
        sx={{
          position: "absolute",
          left: { xs: "8vw", sm: "13vw" },
          top: { xs: "42vh", sm: "62vh" },
          fontFamily: '"Caveat", cursive',
          fontSize: { xs: "0.95rem", sm: "1.05rem" },
          color: "#fff",
          bgcolor: "rgba(0,0,0,0.55)",
          px: 1,
          py: 0.2,
          zIndex: 4,
          transform: "rotate(-1deg)",
        }}
      >
        “You, always you.”
      </Typography>

      {/* Butterflies */}
      <Butterfly
        sx={{
          "--tilt": "-12deg",
          position: "absolute",
          left: { xs: "34vw", sm: "30vw" },
          top: { xs: "36vh", sm: "50vh" },
          width: { xs: 48, sm: 70 },
          zIndex: 5,
        }}
      />
      <Butterfly
        sx={{
          "--tilt": "14deg",
          position: "absolute",
          right: { xs: "30vw", sm: "36vw" },
          top: { xs: "30vh", sm: "24vh" },
          width: { xs: 26, sm: 38 },
          opacity: 0.9,
          zIndex: 5,
          animationDelay: "-1.5s",
        }}
      />

      {/* ---------- Title ---------- */}
      <Box
        sx={{
          position: "absolute",
          right: { xs: "5vw", sm: "7vw" },
          top: { xs: "5vh", sm: "9vh" },
          textAlign: "left",
          zIndex: 3,
        }}
      >
        <Typography
          sx={{
            fontFamily: script,
            fontSize: { xs: "2.6rem", sm: "4.2vw" },
            lineHeight: 1,
            ml: { xs: 4, sm: "5vw" },
            color: "#f2f4fa",
            whiteSpace: "nowrap",
          }}
        >
          Happy
        </Typography>
        <Typography
          sx={{
            fontFamily: script,
            fontSize: { xs: "2.2rem", sm: "3.8vw" },
            lineHeight: 1.1,
            color: "#f2f4fa",
            whiteSpace: "nowrap",
          }}
        >
          Birthday Cengaku
        </Typography>
      </Box>

      {/* ---------- Envelope (click to open) ---------- */}
      <Box
        role="button"
        tabIndex={0}
        aria-label="Open the letter"
        onClick={openLetter}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openLetter()}
        sx={{
          cursor: "pointer",
          position: "absolute",
          right: { xs: "4vw", sm: "9vw" },
          bottom: { xs: "14vh", sm: "14vh" },
          width: { xs: "62vw", sm: "34vw" },
          maxWidth: 560,
          aspectRatio: "1.55 / 1",
          zIndex: 4,
          transformOrigin: "50% 60%",
          animation: `${shake} 2.4s ease-in-out infinite`,
          "@media (prefers-reduced-motion: reduce)": { animation: "none", transform: "rotate(-2deg)" },
          filter: "drop-shadow(0 20px 28px rgba(0,0,0,0.45))",
        }}
      >
        {/* body */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "6px",
            background: "linear-gradient(160deg, #1b3f8f 0%, #0f2a6b 100%)",
          }}
        />
        {/* side flaps */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "6px",
            background: "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(0,0,0,0.12))",
            clipPath: "polygon(0 0, 50% 55%, 0 100%)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "6px",
            background: "linear-gradient(225deg, rgba(255,255,255,0.08), rgba(0,0,0,0.15))",
            clipPath: "polygon(100% 0, 50% 55%, 100% 100%)",
          }}
        />
        {/* bottom flap */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "6px",
            background: "linear-gradient(0deg, #0c2560 0%, #163a85 100%)",
            clipPath: "polygon(0 100%, 50% 50%, 100% 100%)",
          }}
        />
        {/* top flap (closed) */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "6px",
            background: "linear-gradient(180deg, #2a55ad 0%, #14337a 100%)",
            clipPath: "polygon(0 0, 100% 0, 50% 58%)",
          }}
        />

        {/* wax seal */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "56%",
            width: "20%",
            aspectRatio: "1 / 1",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: SEAL_SRC
              ? `url(${SEAL_SRC}) center / cover`
              : "radial-gradient(circle at 35% 30%, #e9ecf2 0%, #a9b0bf 55%, #6e7587 100%)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.5), inset 0 0 0 3px rgba(255,255,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: "18%",
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.55)",
            },
          }}
        >
          <Typography sx={{ fontFamily: script, fontSize: "clamp(1rem, 2.2vw, 1.8rem)", color: "#4b5367", lineHeight: 1 }}>
            S
          </Typography>
        </Box>
      </Box>

      {/* ---------- Date tag ---------- */}
      <Box
        sx={{
          position: "absolute",
          right: { xs: "6vw", sm: "7vw" },
          bottom: { xs: "20vh", sm: "28vh" },
          bgcolor: "#f4f4f4",
          color: "#101a33",
          px: 1.2,
          py: 0.4,
          display: "flex",
          alignItems: "baseline",
          gap: 0.4,
          zIndex: 6,
          transform: "rotate(2deg)",
          boxShadow: "0 6px 12px rgba(0,0,0,0.35)",
        }}
      >
        <Box component="span" sx={{ fontFamily: '"Caveat", cursive', fontSize: { xs: "1.6rem", sm: "2.2vw" }, fontWeight: 700 }}>
          05
        </Box>
        <Box component="span" sx={{ fontFamily: '"Caveat", cursive', fontSize: { xs: "0.8rem", sm: "0.9vw" } }}>
          Sept
        </Box>
      </Box>

      {/* ---------- Paper plane ---------- */}
      <Box
        component="svg"
        viewBox="0 0 48 40"
        sx={{
          position: "absolute",
          right: { xs: "10vw", sm: "13vw" },
          bottom: { xs: "46vh", sm: "50vh" },
          width: { xs: 28, sm: 40 },
          zIndex: 6,
          fill: "#fff",
        }}
      >
        <path d="M2 18 L46 2 L32 38 L22 24 Z" />
        <path d="M22 24 L46 2 L26 28 Z" fill="#c9d3ea" />
      </Box>

      {/* ---------- Swirl doodle (right) ---------- */}
      <Box
        component="svg"
        viewBox="0 0 120 200"
        sx={{
          position: "absolute",
          right: "2vw",
          top: "40vh",
          width: { xs: 40, sm: 70 },
          fill: "none",
          stroke: "rgba(255,255,255,0.7)",
          strokeWidth: 2,
          strokeLinecap: "round",
          zIndex: 2,
        }}
      >
        <path d="M100 10 C20 40, 110 90, 40 120 C0 140, 60 180, 90 190" />
      </Box>
    </Box>
  );
}