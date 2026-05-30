import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useI18n } from "@/lib/i18n";
import {
  ArrowRight,
  Activity,
  Droplet,
  Brain,
  Pill,
  Bot,
  ShieldCheck,
  Globe2,
  Wifi,
  Lock,
  Heart,
  Stethoscope,
} from "lucide-react";

import hero from "@/assets/hero.jpg";
import bgCancer from "@/assets/bg-cancer.jpg";
import bgBlood from "@/assets/blood-bg.png";
import bgMental from "@/assets/bg-mental.jpg";
import bgMedicine from "@/assets/bg-medicine.jpg";
import bgAi from "@/assets/bg-ai.jpg";

import FaqSection from "../components/FaqSection";

export const Route = createFileRoute("/")({
  component: Home,
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MEDICAL BG ANIMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function MedicalBackgroundAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
      <div className="absolute top-[15%] left-[10%] animate-bounce duration-[6000ms] text-white">
        <Heart className="size-8 opacity-40 animate-pulse" />
      </div>

      <div className="absolute top-[40%] right-[15%] animate-pulse duration-[4000ms] text-white">
        <Activity className="size-12 opacity-30" />
      </div>

      <div
        className="absolute bottom-[20%] left-[25%] text-white"
        style={{ animation: "float 8s ease-in-out infinite" }}
      >
        <Pill className="size-7 opacity-40 rotate-45" />
      </div>

      <div className="absolute top-[25%] left-[45%] text-white animate-pulse duration-[5000ms]">
        <Stethoscope className="size-10 opacity-25" />
      </div>

      <div className="absolute bottom-[30%] right-[30%] text-white">
        <Brain className="size-9 opacity-30 animate-bounce duration-[7000ms]" />
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HOME PAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Home() {
  const { t } = useI18n();

  const services = [
    {
      to: "/cancer",
      icon: Activity,
      bg: bgCancer,
      title: t("cancer_title"),
      desc: t("cancer_desc"),
    },
    {
      to: "/blood",
      icon: Droplet,
      bg: bgBlood,
      title: t("blood_title"),
      desc: t("blood_desc"),
    },
    {
      to: "/mental",
      icon: Brain,
      bg: bgMental,
      title: t("mental_title"),
      desc: t("mental_desc"),
    },
    {
      to: "/medicine",
      icon: Pill,
      bg: bgMedicine,
      title: t("medicine_title"),
      desc: t("medicine_desc"),
    },
    {
      to: "#ai",
      icon: Bot,
      bg: bgAi,
      title: t("ai_title"),
      desc: t("ai_desc"),
      isAi: true,
    },
  ];

  const why = [
    {
      icon: ShieldCheck,
      t: t("why_1_t"),
      d: t("why_1_d"),
    },
    {
      icon: Globe2,
      t: t("why_2_t"),
      d: t("why_2_d"),
    },
    {
      icon: Wifi,
      t: t("why_3_t"),
      d: t("why_3_d"),
    },
    {
      icon: Lock,
      t: t("why_4_t"),
      d: t("why_4_d"),
    },
  ];

  return (
    <PageShell>
      <div className="relative w-full min-h-screen">

        {/* HERO */}
        <section className="relative px-4 sm:px-6 pt-8 pb-20 z-10">
          <div className="relative mx-auto max-w-7xl rounded-3xl overflow-hidden shadow-soft">

            <img
              src={hero}
              alt=""
              width={1920}
              height={1080}
              className="absolute inset-0 size-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.18_0.07_258/0.85)] via-[oklch(0.22_0.08_258/0.7)] to-[oklch(0.28_0.09_258/0.55)]" />

            <MedicalBackgroundAnimation />

            <div className="relative px-6 sm:px-12 lg:px-16 py-20 sm:py-28 text-black z-10">

              <div className="max-w-3xl animate-fade-up">

                <span className="inline-block glass rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-white">
                  Healthcare AI · Bangladesh
                </span>

                <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-white font-bangla">
                  {t("hero_title")}
                </h1>

                <p className="mt-6 text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed font-bangla">
                  {t("hero_sub")}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">

                  <a
                    href="#features"
                    className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-6 py-3 text-sm font-semibold hover:scale-[1.03] transition shadow-soft font-bangla"
                  >
                    {t("explore")}
                    <ArrowRight className="size-4" />
                  </a>

                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 rounded-full glass text-white px-6 py-3 text-sm font-semibold hover:bg-white/20 transition font-bangla"
                  >
                    {t("get_started")}
                  </Link>

                </div>
              </div>

              <div className="hidden lg:block absolute right-12 top-16 w-72 h-72">
                <div className="absolute inset-0 glass rounded-3xl animate-float-slow" />
                <div className="absolute -bottom-8 -left-10 size-40 glass rounded-2xl animate-float" />
                <div className="absolute -top-6 -right-6 size-24 glass rounded-2xl animate-float-delayed" />
              </div>

            </div>
          </div>
        </section>

        {/* FEATURES / SERVICES SECTION */}
        <section
          id="features"
          className="relative px-4 sm:px-6 py-12 z-10 scroll-mt-24"
        >
          <div className="mx-auto max-w-7xl">

            <div className="text-center mb-12 animate-fade-up">

              <h2 className="text-3xl sm:text-4xl font-bold text-gradient font-bangla">
                {t("services_title")}
              </h2>

              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto font-bangla">
                {t("services_sub")}
              </p>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {services.map((s, i) => {
                const Inner = (
                  <>
                    <img
                      src={s.bg}
                      alt=""
                      width={800}
                      height={520}
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.07_258/0.95)] via-[oklch(0.18_0.07_258/0.55)] to-[oklch(0.18_0.07_258/0.2)]" />

                    <div className="relative p-6 sm:p-7 h-full flex flex-col text-white min-h-[280px]">

                      <div className="glass rounded-2xl size-12 flex items-center justify-center mb-auto">
                        <s.icon className="size-6" />
                      </div>

                      <div className="mt-6">

                        <h3 className="text-xl font-bold font-bangla">
                          {s.title}
                        </h3>

                        <p className="mt-2 text-sm text-white/80 leading-relaxed font-bangla">
                          {s.desc}
                        </p>

                        <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold opacity-90 group-hover:opacity-100 group-hover:gap-2.5 transition-all font-bangla">
                          {t("open_service")}
                          <ArrowRight className="size-4" />
                        </div>

                      </div>
                    </div>
                  </>
                );

                const cls =
                  "group relative rounded-3xl overflow-hidden shadow-soft hover:shadow-glow transition-all duration-500 animate-fade-up";

                const style = {
                  animationDelay: `${i * 80}ms`,
                };

                return s.isAi ? (
                  <button
                    key={s.to}
                    onClick={() => {
                      document
                        .querySelector<HTMLButtonElement>(
                          '[aria-label="AI Assistant"]'
                        )
                        ?.click();
                    }}
                    className={`${cls} text-left`}
                    style={style}
                  >
                    {Inner}
                  </button>
                ) : (
                  <Link
                    key={s.to}
                    to={s.to}
                    className={cls}
                    style={style}
                  >
                    {Inner}
                  </Link>
                );
              })}

            </div>
          </div>
        </section>

        {/* WHY - TARGETED WITH SCROLL ID AND CLEARANCE */}
        <section id="why-us" className="relative px-4 sm:px-6 py-16 z-10 scroll-mt-24">
          <div className="mx-auto max-w-7xl">

            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gradient font-bangla">
              {t("why_title")}
            </h2>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              {why.map((w, i) => (
                <div
                  key={i}
                  className="glass rounded-3xl p-6 animate-fade-up"
                  style={{
                    animationDelay: `${i * 60}ms`,
                  }}
                >
                  <div className="size-12 rounded-2xl gradient-accent flex items-center justify-center text-white shadow-glow">
                    <w.icon className="size-6" />
                  </div>

                  <h3 className="mt-4 font-bold text-lg font-bangla">
                    {w.t}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed font-bangla">
                    {w.d}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="relative z-10 scroll-mt-24">
          <FaqSection />
        </section>

      </div>
    </PageShell>
  );
}