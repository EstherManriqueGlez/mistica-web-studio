import { useEffect, useRef } from "react";
import Sparkle from "./Sparkle";
import { COLORS } from "../../constants/colors";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { gsap } from "../../lib/gsap";

// Traced from the real mark at public/favicon-512x512.png (the same image
// used as the parallax "M" in About.jsx), not hand-drawn: the PNG was
// separated into its gold/pine color regions, the gold M's three strokes
// were bridged where the hat currently occludes them, and both shapes'
// outlines were extracted and simplified into these two closed paths via
// a Python/OpenCV pass (contour extraction + polygon simplification +
// Catmull-Rom-to-Bezier smoothing) — not typed by hand, so they match the
// actual logo rather than approximating it.
const M_PATH =
  "M 470.0 105.0 C 457.2 118.3, 407.2 240.8, 396.0 260.0 C 384.8 279.2, 402.7 231.0, 403.0 220.0 C 403.3 209.0, 408.5 198.7, 398.0 194.0 C 387.5 189.3, 351.7 190.3, 340.0 192.0 C 328.3 193.7, 329.8 198.7, 328.0 204.0 C 326.2 209.3, 331.3 219.8, 329.0 224.0 C 326.7 228.2, 320.0 232.5, 314.0 229.0 C 308.0 225.5, 298.3 216.3, 293.0 203.0 C 287.7 189.7, 287.5 161.2, 282.0 149.0 C 276.5 136.8, 270.7 133.7, 260.0 130.0 C 249.3 126.3, 236.2 123.2, 218.0 127.0 C 199.8 130.8, 171.0 142.3, 151.0 153.0 C 131.0 163.7, 114.3 175.5, 98.0 191.0 C 81.7 206.5, 63.3 228.8, 53.0 246.0 C 42.7 263.2, 37.2 277.7, 36.0 294.0 C 34.8 310.3, 40.7 331.2, 46.0 344.0 C 51.3 356.8, 62.2 366.3, 68.0 371.0 C 73.8 375.7, 83.3 378.8, 81.0 372.0 C 78.7 365.2, 58.8 343.0, 54.0 330.0 C 49.2 317.0, 48.3 308.5, 52.0 294.0 C 55.7 279.5, 65.7 258.3, 76.0 243.0 C 86.3 227.7, 96.3 216.2, 114.0 202.0 C 131.7 187.8, 159.3 167.8, 182.0 158.0 C 204.7 148.2, 235.0 142.3, 250.0 143.0 C 265.0 143.7, 267.7 151.0, 272.0 162.0 C 276.3 173.0, 277.2 198.0, 276.0 209.0 C 274.8 220.0, 266.0 220.7, 265.0 228.0 C 264.0 235.3, 273.7 225.8, 270.0 253.0 C 266.3 280.2, 245.2 368.0, 243.0 391.0 C 240.8 414.0, 241.7 417.3, 257.0 391.0 C 272.3 364.7, 314.7 258.3, 335.0 233.0 C 355.3 207.7, 374.7 220.3, 379.0 239.0 C 383.3 257.7, 361.5 325.3, 361.0 345.0 C 360.5 364.7, 361.3 382.2, 376.0 357.0 C 390.7 331.8, 439.7 206.2, 449.0 194.0 C 458.3 181.8, 435.7 255.2, 432.0 284.0 C 428.3 312.8, 426.2 347.5, 427.0 367.0 C 427.8 386.5, 431.8 393.3, 437.0 401.0 C 442.2 408.7, 456.7 417.0, 458.0 413.0 C 459.3 409.0, 447.3 390.2, 445.0 377.0 C 442.7 363.8, 439.3 366.8, 444.0 334.0 C 448.7 301.2, 468.7 218.2, 473.0 180.0 C 477.3 141.8, 482.8 91.7, 470.0 105.0 Z";

const HAT_PATH =
  "M 300.0 97.0 C 294.2 93.2, 295.7 104.5, 295.0 108.0 C 294.3 111.5, 298.0 114.3, 296.0 118.0 C 294.0 121.7, 284.7 127.5, 283.0 130.0 C 281.3 132.5, 283.3 133.5, 286.0 133.0 C 288.7 132.5, 296.2 126.7, 299.0 127.0 C 301.8 127.3, 302.0 128.0, 303.0 135.0 C 304.0 142.0, 305.7 157.8, 305.0 169.0 C 304.3 180.2, 300.8 195.8, 299.0 202.0 C 297.2 208.2, 295.3 201.8, 294.0 206.0 C 292.7 210.2, 292.8 224.0, 291.0 227.0 C 289.2 230.0, 285.8 226.8, 283.0 224.0 C 280.2 221.2, 277.0 211.8, 274.0 210.0 C 271.0 208.2, 266.0 211.0, 265.0 213.0 C 264.0 215.0, 263.7 218.3, 268.0 222.0 C 272.3 225.7, 283.7 233.5, 291.0 235.0 C 298.3 236.5, 308.0 232.7, 312.0 231.0 C 316.0 229.3, 311.8 226.2, 315.0 225.0 C 318.2 223.8, 325.3 226.2, 331.0 224.0 C 336.7 221.8, 341.5 218.0, 349.0 212.0 C 356.5 206.0, 370.7 191.7, 376.0 188.0 C 381.3 184.3, 380.8 187.3, 381.0 190.0 C 381.2 192.7, 379.0 200.3, 377.0 204.0 C 375.0 207.7, 373.2 209.5, 369.0 212.0 C 364.8 214.5, 352.2 218.0, 352.0 219.0 C 351.8 220.0, 362.7 219.3, 368.0 218.0 C 373.3 216.7, 379.2 215.3, 384.0 211.0 C 388.8 206.7, 395.2 200.3, 397.0 192.0 C 398.8 183.7, 397.5 166.2, 395.0 161.0 C 392.5 155.8, 389.5 158.8, 382.0 161.0 C 374.5 163.2, 358.7 179.0, 350.0 174.0 C 341.3 169.0, 338.3 143.8, 330.0 131.0 C 321.7 118.2, 305.8 100.8, 300.0 97.0 Z";

// Matches the traced paths' own coordinate space, with ~15px padding
// around their combined bounding box (x 34.8-482.8, y 91.7-417.3).
const VIEW_BOX = { minX: 20, minY: 75, width: 480, height: 360 };

// Two small twinkle accents near the hat, at the same relative spots
// they sit at in the real mark (tip and left flare). Positioned as
// percentages of VIEW_BOX so they line up with the traced paths
// regardless of how large the SVG is rendered.
const MARK_SPARKLES = [
  { xPct: 58.3, yPct: 3.6, size: 14, color: "goldLight", delay: 0 },
  { xPct: 49.6, yPct: 28.6, size: 10, color: "cream", delay: 0.8 },
];

/**
 * The "M with a little hat" brand mark (public/favicon-512x512.png, also
 * used as the parallax image in About.jsx), hand-drawn stroke by stroke
 * instead of shown as a static raster image. Each path's outline draws
 * itself in (strokeDasharray/strokeDashoffset animated back to 0, the
 * free/native equivalent of GSAP's paid DrawSVGPlugin), then its fill
 * fades in — the M first, then the hat, then two twinkle accents,
 * sequenced with a single GSAP timeline that fires once the mark
 * scrolls into view. Started life as an experiment in DrawMTest.jsx;
 * promoted here once the effect was confirmed to look right, for reuse
 * (currently the Footer's third column, lg+ only).
 *
 * Sizing is entirely up to the parent: this renders at 100% width/height
 * of its container while keeping the traced paths' own aspect ratio, so
 * a parent like `className="h-[158px]"` gets a mark exactly that tall.
 */
export default function DrawnMMark({ className = "" }) {
  const containerRef = useRef(null);
  const mPathRef = useRef(null);
  const hatPathRef = useRef(null);
  const sparkleRefs = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const mPath = mPathRef.current;
    const hatPath = hatPathRef.current;
    if (!mPath || !hatPath) return undefined;
    const sparkleEls = sparkleRefs.current.filter(Boolean);

    if (prefersReducedMotion) {
      [mPath, hatPath].forEach((path) => {
        path.style.strokeDasharray = "none";
        path.style.strokeDashoffset = "0";
        path.style.fillOpacity = "1";
      });
      sparkleEls.forEach((el) => {
        el.style.opacity = "1";
      });
      return undefined;
    }

    const ctx = gsap.context(() => {
      [mPath, hatPath].forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.style.fillOpacity = 0;
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.to(mPath, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" })
        .to(mPath, { fillOpacity: 1, duration: 0.6, ease: "power1.out" }, "-=0.4")
        .to(hatPath, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, "-=0.2")
        .to(hatPath, { fillOpacity: 1, duration: 0.5, ease: "power1.out" }, "-=0.3")
        .to(sparkleEls, { opacity: 1, duration: 0.5, stagger: 0.15 }, "-=0.2");
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ aspectRatio: `${VIEW_BOX.width} / ${VIEW_BOX.height}` }}
    >
      <svg
        viewBox={`${VIEW_BOX.minX} ${VIEW_BOX.minY} ${VIEW_BOX.width} ${VIEW_BOX.height}`}
        className="absolute inset-0 w-full h-full"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path
          ref={mPathRef}
          d={M_PATH}
          fill={COLORS.gold}
          stroke={COLORS.gold}
          strokeWidth={3}
        />
        <path
          ref={hatPathRef}
          d={HAT_PATH}
          fill={COLORS.pine}
          stroke={COLORS.goldLight}
          strokeWidth={2.5}
        />
      </svg>

      {MARK_SPARKLES.map((s, i) => (
        <div
          key={i}
          ref={(el) => {
            sparkleRefs.current[i] = el;
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${s.xPct}%`, top: `${s.yPct}%`, opacity: 0 }}
        >
          <Sparkle size={s.size} color={COLORS[s.color]} delay={s.delay} />
        </div>
      ))}
    </div>
  );
}
