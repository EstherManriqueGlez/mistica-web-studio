import { useCallback, useEffect, useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import IntroCurtain from "./components/layout/IntroCurtain";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Contact from "./components/sections/Contact";
import { useLanguage } from "./context/useLanguage";
import { COLORS } from "./constants/colors";
import { useBodyScrollLock } from "./hooks/useBodyScrollLock";
import { ScrollTrigger } from "./lib/gsap";

/**
 * The intro curtain shows on every page load/reload (per Dian's request)
 * — the only case it's skipped is `prefers-reduced-motion`, for
 * accessibility, not as a "seen it already" preference.
 */
function getInitialIntroRevealed() {
  if (typeof window === "undefined") return false;
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return true;
  }
  return false;
}

function App() {
  const { t } = useLanguage();
  const [introRevealed, setIntroRevealed] = useState(getInitialIntroRevealed);

  // Locks background scroll while the intro curtain is active.
  useBodyScrollLock(!introRevealed);

  const handleReveal = useCallback(() => {
    setIntroRevealed(true);
  }, []);

  // Safety net: the scroll gesture that reveals the curtain should never
  // move the real page (IntroCurtain already blocks that with
  // preventDefault), but in case some browser slips through, force the
  // Hero to always start from the top as soon as the curtain finishes
  // opening.
  useEffect(() => {
    if (introRevealed) {
      window.scrollTo(0, 0);
      // The body's scroll lock (overflow:hidden) was just released right
      // here, which can bring back the scrollbar and shift the available
      // width by a couple pixels — enough to desync the positions GSAP
      // ScrollTrigger had already calculated. Recalculate as soon as it's
      // released.
      ScrollTrigger.refresh();
    }
  }, [introRevealed]);

  // General safety net: if an image or font finishes loading after the
  // ScrollTriggers have already been created, the page's real height can
  // change and throw off the scroll trigger points (e.g. the M parallax
  // in "About"). Refreshing once everything is done loading fixes that.
  useEffect(() => {
    function refresh() {
      ScrollTrigger.refresh();
    }
    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh);
      return () => window.removeEventListener("load", refresh);
    }
    return undefined;
  }, []);

  return (
    <div className="min-h-screen antialiased">
      <IntroCurtain revealed={introRevealed} onReveal={handleReveal} />

      {/* While the curtain covers the screen, the rest of the site stays
          `inert`: it can't be Tab-navigated to, and screen readers won't
          announce content that isn't visible yet. */}
      <div inert={introRevealed ? undefined : true}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            background: COLORS.pine,
            color: COLORS.cream,
            outlineColor: COLORS.gold,
          }}
        >
          {t.skip.toContent}
        </a>

        <Header />
        <main id="main-content">
          <Hero revealed={introRevealed} />
          <About />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
