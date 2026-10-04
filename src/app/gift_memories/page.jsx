import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const photos = [
  {
    src: "https://placehold.co/420x520/9a9a9a/252525?text=Memory+01",
    alt: "Placeholder foto kenangan pertama",
    caption: "The little things",
    transform: "rotate(-2deg)",
  },
  {
    src: "https://placehold.co/420x520/b4b4b4/252525?text=Memory+02",
    alt: "Placeholder foto kenangan kedua",
    caption: "Always together",
    transform: "rotate(1deg) translateY(-2%)",
  },
  {
    src: "https://placehold.co/420x520/858585/252525?text=Memory+03",
    alt: "Placeholder foto kenangan ketiga",
    caption: "My favorite day",
    transform: "rotate(-1deg) translateY(1%)",
  },
];

export default function GiftMemories() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        overflow: { xs: "visible", sm: "hidden" },
        p: { xs: 0, sm: 2.5 },
        bgcolor: "#090b10",
      }}
    >
      <Box
        component="section"
        aria-label="Kolase kenangan kita"
        sx={{
          position: "relative",
          width: { xs: "100%", sm: "min(100%, 160vh)" },
          height: "auto",
          minHeight: { xs: "760px", sm: 0 },
          aspectRatio: { xs: "auto", sm: "16 / 9" },
          overflow: "hidden",
          isolation: "isolate",
          color: "#f4f1eb",
          backgroundColor: "#102c62",
          backgroundImage: "radial-gradient(ellipse at 70% 45%, rgba(54,91,153,0.42), transparent 55%), repeating-linear-gradient(0deg, transparent 0 31px, rgba(190,205,229,0.055) 32px, transparent 33px), repeating-linear-gradient(90deg, transparent 0 31px, rgba(190,205,229,0.04) 32px, transparent 33px), linear-gradient(135deg, #10234b, #173b76 55%, #0d2048)",
          boxShadow: "0 20px 70px #0009",
          fontFamily: 'Georgia, "Times New Roman", serif',
          "&::before": {
            position: "absolute",
            zIndex: -1,
            inset: 0,
            content: '""',
            opacity: 0.25,
            pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(115deg, transparent 0 18px, #b4c5e016 19px 20px, transparent 21px 42px)",
          },
          "&::after": {
            position: "absolute",
            zIndex: -1,
            right: 0,
            bottom: 0,
            left: 0,
            height: "4%",
            content: '""',
            opacity: 0.9,
            background: "linear-gradient(90deg, #eee9dc, #d7d1c4 40%, #f4efe5)",
          },
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            inset: "0 auto 0 0",
            width: { xs: "7%", sm: "9%" },
            bgcolor: "#e7e2d7",
            backgroundImage: "repeating-linear-gradient(0deg, transparent 0 9px, #17254826 10px, transparent 11px), repeating-linear-gradient(90deg, transparent 0 20px, #15234320 21px, transparent 22px), linear-gradient(90deg, #d5d0c3, #f4efe4 28%, #d5d0c3 70%, #f1ecdf)",
            clipPath: "polygon(0 0, 100% 0, 94% 6%, 100% 12%, 94% 18%, 100% 25%, 94% 32%, 100% 40%, 93% 48%, 100% 57%, 94% 65%, 100% 74%, 93% 83%, 100% 92%, 94% 100%, 0 100%)",
          }}
        />
        <Typography
          aria-hidden="true"
          sx={{
            position: "absolute",
            top: "2%",
            right: "2%",
            left: "12%",
            overflow: "hidden",
            color: "#dce4f4",
            fontFamily: "cursive",
            fontSize: "clamp(10px, 1.2vw, 20px)",
            fontStyle: "italic",
            opacity: 0.12,
            whiteSpace: "nowrap",
            transform: "rotate(-4deg)",
          }}
        >
          love you · always · love you · always · love you · always
        </Typography>

        <Box
          component="a"
          href="/gifts"
          sx={{
            position: "absolute",
            zIndex: 3,
            top: { xs: "13%", sm: "12%" },
            left: { xs: "12%", sm: "24%" },
            minWidth: { xs: "22%", sm: "12%" },
            px: 2,
            py: 0.35,
            border: "1px solid #eae6df",
            borderRadius: 999,
            color: "#fff",
            fontSize: { xs: 12, sm: "clamp(9px, 0.8vw, 14px)" },
            textAlign: "center",
            transition: "background-color 160ms ease",
            "&:hover": { bgcolor: "#ffffff22" },
            "@media (prefers-reduced-motion: reduce)": { transition: "none" },
          }}
        >
          Back
        </Box>
        <Typography
          component="h1"
          sx={{
            position: "absolute",
            zIndex: 2,
            top: { xs: "4%", sm: "1%" },
            right: { xs: "7%", sm: "5%" },
            color: "#f7f1e9",
            fontFamily: '"Brush Script MT", "Segoe Script", cursive',
            fontSize: { xs: "clamp(48px, 14vw, 72px)", sm: "clamp(38px, 7.3vw, 112px)" },
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1,
            textShadow: "0 2px 8px #0008",
          }}
        >
          My Love
        </Typography>

        <Box
          sx={{
            position: "absolute",
            top: { xs: "24%", sm: "24%" },
            left: { xs: "8%", sm: "7%" },
            zIndex: 2,
            display: "flex",
            width: { xs: "84%", sm: "44%" },
            height: { xs: "20%", sm: "42%" },
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          {photos.map((photo) => (
            <Box
              component="figure"
              key={photo.alt}
              sx={{
                position: "relative",
                width: "29%",
                height: "100%",
                m: 0,
                p: { xs: "4px 4px 12px", sm: "4px 4px 14px" },
                bgcolor: "#e9e7e1",
                boxShadow: "0 6px 14px #0008",
                transform: photo.transform,
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={420}
                height={520}
                unoptimized
                style={{ width: "100%", height: "83%", display: "block", objectFit: "cover", filter: "grayscale(1) contrast(1.05)" }}
              />
              <Typography
                component="figcaption"
                sx={{
                  overflow: "hidden",
                  pt: "3px",
                  color: "#31343b",
                  fontFamily: "cursive",
                  fontSize: { xs: 8, sm: "clamp(7px, 0.72vw, 11px)" },
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {photo.caption}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box
          aria-label="Piringan hitam dekoratif"
          sx={{
            position: "absolute",
            top: { xs: "31%", sm: "35%" },
            left: { xs: "59%", sm: "58%" },
            zIndex: 1,
            display: "grid",
            width: { xs: "32%", sm: "21%" },
            aspectRatio: "1",
            placeItems: "center",
            border: "1px solid #ffffff35",
            borderRadius: "50%",
            background: "repeating-radial-gradient(circle, #13161b 0 3px, #282a2e 4px 5px, #090b10 6px 8px)",
            boxShadow: "0 8px 20px #0009",
            "& > span": {
              width: "36%",
              aspectRatio: "1",
              border: { xs: "4px solid #15294b", sm: "5px solid #15294b" },
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #d9e4f5 0 8%, #6092cf 9% 43%, #132e5d 44% 100%)",
            },
          }}
        >
          <Box component="span" />
        </Box>

        {[
          { src: "https://placehold.co/500x380/aaa/222?text=Our+Story", alt: "Placeholder foto cerita kita", caption: "our story", back: true },
          { src: "https://placehold.co/500x380/c2c2c2/222?text=You+%26+Me", alt: "Placeholder foto kamu dan aku", caption: "You & me", back: false },
        ].map((photo) => (
          <Box
            component="figure"
            key={photo.alt}
            sx={{
              position: "absolute",
              top: photo.back ? { xs: "49%", sm: "38%" } : { xs: "62%", sm: "57%" },
              right: photo.back ? { xs: "8%", sm: "8%" } : { xs: "36%", sm: "31%" },
              zIndex: photo.back ? 3 : 4,
              width: photo.back ? { xs: "37%", sm: "23%" } : { xs: "34%", sm: "19%" },
              height: photo.back ? { xs: "24%", sm: "47%" } : { xs: "20%", sm: "37%" },
              m: 0,
              p: { xs: "2% 2% 6%", sm: "1.2% 1.2% 3.5%" },
              bgcolor: "#f3f0e9",
              boxShadow: "0 9px 18px #000a",
              transform: photo.back ? "rotate(8deg)" : "rotate(-9deg)",
              "& img": { width: "100%", height: "83%", display: "block", objectFit: "cover", filter: "grayscale(1) contrast(1.05)" },
            }}
          >
            <Image src={photo.src} alt={photo.alt} width={500} height={380} unoptimized />
            <Typography
              component="figcaption"
              sx={{ pt: "2%", color: "#34343a", fontFamily: "cursive", fontSize: { xs: 12, sm: "clamp(10px, 1vw, 16px)" }, textAlign: "center" }}
            >
              {photo.caption}
            </Typography>
          </Box>
        ))}

        <Typography
          component="p"
          sx={{
            position: "absolute",
            bottom: { xs: "5%", sm: "12%" },
            left: "9%",
            zIndex: 2,
            width: { xs: "82%", sm: "37%" },
            color: "#e5e2dc",
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: { xs: 12, sm: "clamp(7px, 0.83vw, 13px)" },
            lineHeight: 1.4,
            textShadow: "0 1px 3px #000",
          }}
        >
          Terima kasih sudah menjadi untuk berjalan bersama, melewati setiap hari dengan penuh kebahagiaan dan rasa syukur. Kenangan-kenangan indah yang kita ciptakan adalah bukti betapa berharganya cinta kita. Tidak ada yang lebih indah dari kita.
        </Typography>

        {[
          { symbol: "♡", top: { xs: "20%", sm: "21%" }, left: { xs: "48%", sm: "53%" }, fontSize: "clamp(24px, 4vw, 60px)", transform: "rotate(12deg)" },
          { symbol: "✦", top: { xs: "45%", sm: "30%" }, right: { xs: "7%", sm: "9%" }, fontSize: "clamp(18px, 2.8vw, 42px)" },
          { symbol: "♡", bottom: { xs: "28%", sm: "31%" }, right: { xs: "5%", sm: "4%" }, fontSize: "clamp(24px, 3vw, 46px)", transform: "rotate(-12deg)" },
        ].map((doodle, index) => (
          <Typography
            key={index}
            aria-hidden="true"
            sx={{
              position: "absolute",
              zIndex: 5,
              top: doodle.top,
              right: doodle.right,
              bottom: doodle.bottom,
              left: doodle.left,
              color: "#f4f1e8",
              fontFamily: "cursive",
              fontSize: doodle.fontSize,
              lineHeight: 1,
              textShadow: "0 2px 5px #0007",
              transform: doodle.transform,
            }}
          >
            {doodle.symbol}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}