import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Contact from "./components/sections/Contact";
import { useLanguage } from "./context/useLanguage";
import { COLORS } from "./constants/colors";

function App() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen antialiased">
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
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
