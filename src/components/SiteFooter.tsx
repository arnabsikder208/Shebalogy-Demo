import { useI18n } from "@/lib/i18n";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  const { t, lang } = useI18n();

  const currentLang = (lang || "").toString().toLowerCase();
  const isBn = currentLang === 'bn';

  const getTranslation = (key: string, fallback: string) => {
    const value = t ? (t as any)(key) : null;
    if (!value || value === key) {
      return fallback;
    }
    return value;
  };

  // Safe smooth-scrolling handler
  const handleScrollToSection = (id: string) => {
    // If we are on the homepage, scroll smoothly
    if (window.location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    // Fallback: If on another route, navigate to the home route with hash link
    window.location.href = `/#${id}`;
  };

  return (
    <footer className="w-full px-3 sm:px-6 pb-6 mt-24">
      {/* Container matches the exact 'glass' class and styling of your header */}
      <div className="glass mx-auto max-w-7xl rounded-2xl p-8 sm:p-12 text-left relative overflow-hidden text-foreground">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Left Column: Brand Logo & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src={logo} 
                alt="Shebalogy" 
                className="size-9 object-contain" 
              />
              <span className="font-display font-bold text-lg text-foreground">
                Shebalogy
              </span>
            </div>
            <p className={`text-muted-foreground max-w-sm text-sm leading-relaxed ${isBn ? 'font-bangla' : 'font-sans'}`}>
              {getTranslation(
                "footer_desc", 
                isBn 
                  ? "আপনার সার্বিক সুস্বাস্থ্য নিশ্চিত করতে আমাদের এআই-চালিত উন্নত স্বাস্থ্যসেবা ইকোসিস্টেম সর্বদা প্রস্তুত।" 
                  : "An AI-powered unified healthcare ecosystem dedicated to providing accessible guidance and digital medical assistance."
              )}
            </p>
          </div>

          {/* Center Column: Navigation Link Hub */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-muted-foreground/60 font-bangla">
              {isBn ? "ন্যাভিগেশন" : "Navigation"}
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <button 
                  onClick={() => handleScrollToSection('features')}
                  className="text-foreground/80 hover:text-black transition-colors duration-200 cursor-pointer text-left font-bangla"
                >
                  {isBn ? "বৈশিষ্ট্যসমূহ" : "Features"}
                </button>
              </li>
              <li>
                {/* ADDED: "Why us?" Section Link Container */}
                <button 
                  onClick={() => handleScrollToSection('why-us')}
                  className="text-foreground/80 hover:text-black transition-colors duration-200 cursor-pointer text-left font-bangla"
                >
                  {isBn ? "আমাদের কেন বেছে নেবেন?" : "Why us?"}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollToSection('faq')}
                  className="text-foreground/80 hover:text-black transition-colors duration-200 cursor-pointer text-left font-bangla"
                >
                  {isBn ? "সাধারণ জিজ্ঞাসা (FAQ)" : "Frequently Asked Questions"} 
                </button>
              </li>
            </ul>
          </div>

          {/* Right Column: Engineering/Team Info */}
          <div className="md:col-span-4 space-y-4 md:text-right">
            <h4 className="text-xs font-bold tracking-widest uppercase text-muted-foreground/60">
              {isBn ? "ডেভেলপমেন্ট" : "Engineering"}
            </h4>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground/90">
                Developed by <span className="font-bold">Team NexifyV</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Built with React & Tailwind CSS
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar Customization */}
        <div className="mt-12 pt-6 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Shebalogy. All rights reserved.</p>
          <p className={isBn ? 'font-bangla' : 'font-sans'}>
            {getTranslation("footer", "Your AI Health Companion")}
          </p>
          <p className="text-xs font-medium tracking-wide text-muted-foreground/60">Built with care in Bangladesh</p>
        </div>

      </div>
    </footer>
  );
}