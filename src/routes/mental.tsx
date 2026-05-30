import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Hero } from "./cancer";
import { useI18n } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";
import {
  Brain,
  Heart,
  Pause,
  Play,
  Stethoscope,
  Gamepad2,
  ExternalLink,
} from "lucide-react";
import bg from "@/assets/bg-mental.jpg";

// ✅ আপনার দেওয়া ফাইলনেম অনুযায়ী ৩টি ইমেজ ইমপোর্ট করা হলো
import mentalconflictImg from "@/assets/mentalconflict.jpeg"; 
import mentalBd3Img from "@/assets/mentalbd3.png";
import goodMentalImg from "@/assets/goodmental.jpg";

export const Route = createFileRoute("/mental")({
  component: Mental,
});

type Q = { en: string; bn: string };

const Q: Q[] = [
  {
    en: "How often have you felt down or hopeless in the past 2 weeks?",
    bn: "গত ২ সপ্তাহে কতবার মন খারাপ বা হতাশ লেগেছে?",
  },
  {
    en: "Trouble falling or staying asleep?",
    bn: "ঘুমাতে বা ঘুম ধরে রাখতে অসুবিধা?",
  },
  {
    en: "Little interest or pleasure in doing things?",
    bn: "কাজে আগ্রহ বা আনন্দ কমে গেছে?",
  },
  {
    en: "Feeling nervous, anxious, or on edge?",
    bn: "উদ্বিগ্ন বা চিন্তিত অনুভব করছেন?",
  },
  {
    en: "Difficulty concentrating?",
    bn: "মনোযোগ দিতে সমস্যা?",
  },
  {
    en: "Feeling tired or having little energy?",
    bn: "ক্লান্তি বা শক্তি কম?",
  },
  {
    en: "Thoughts that you'd be better off not here?",
    bn: "নিজেকে শেষ করার চিন্তা এসেছে?",
  },
  {
    en: "Poor appetite or overeating?",
    bn: "ক্ষুধামন্দা বা অতিরিক্ত খাওয়া?",
  },
];

function Mental() {
  const { t, lang } = useI18n();

  const [scores, setScores] = useState<number[]>(
    Array(Q.length).fill(0)
  );

  const [done, setDone] = useState(false);

  const total = scores.reduce((a, b) => a + b, 0);

  let level = "minimal";
  let color = "var(--gradient-accent)";
  let suggestionEn = "";
  let suggestionBn = "";
  let heartEn = "";
  let heartBn = "";

  if (total < 6) {
    level = lang === "bn" ? "ন্যূনতম" : "Minimal";
    suggestionEn =
      "Keep up healthy routines: sleep well, move regularly, and spend time with loved ones.";
    suggestionBn =
      "স্বাস্থ্যকর অভ্যাস বজায় রাখুন: ভালো ঘুম, নিয়মিত হাঁটাচলা ও প্রিয়জনদের সাথে সময় কাটান।";
    heartEn = "You're doing well. Small acts of self-care matter.";
    heartBn = "আপনি ভালো করছেন। নিজের ছোট ছোট যত্ন অনেক গুরুত্বপূর্ণ।";
  } else if (total < 12) {
    level = lang === "bn" ? "হালকা" : "Mild";
    color = "oklch(0.7 0.18 80)";
    suggestionEn =
      "Try mindfulness, short walks, and talk to someone you trust.";
    suggestionBn =
      "মাইন্ডফুলনেস, হাঁটাচলা এবং বিশ্বাসী কারো সাথে কথা বলার চেষ্টা করুন।";
    heartEn =
      "It's okay to not feel okay. You already took a good step.";
    heartBn =
      "সবসময় ভালো না লাগাটাও স্বাভাবিক। আপনি ইতোমধ্যে ভালো পদক্ষেপ নিয়েছেন।";
  } else if (total < 18) {
    level = lang === "bn" ? "মাঝারি" : "Moderate";
    color = "oklch(0.65 0.2 50)";
    suggestionEn =
      "Consider speaking with a counselor and reduce stress triggers.";
    suggestionBn =
      "একজন কাউন্সেলরের সাথে কথা বলুন এবং চাপ কমানোর চেষ্টা করুন।";
    heartEn =
      "Your feelings matter. Asking for support is strength.";
    heartBn =
      "আপনার অনুভূতি গুরুত্বপূর্ণ। সাহায্য চাওয়া সাহসের পরিচয়।";
  } else {
    level = lang === "bn" ? "গুরুতর" : "Severe";
    color = "oklch(0.58 0.22 25)";
    suggestionEn =
      "Please speak with a mental health professional soon.";
    suggestionBn =
      "দয়া করে দ্রুত একজন মানসিক স্বাস্থ্য বিশেষজ্ঞের সাথে কথা বলুন।";
    heartEn = "You are not alone. Support is available.";
    heartBn = "আপনি একা নন। সাহায্য পাওয়া সম্ভব।";
  }

  return (
    <PageShell>
      <Hero
        bg={bg}
        icon={Brain}
        title={t("mental_title")}
        sub={t("mental_intro")}
      />

      <section className="px-4 sm:px-6 py-8 mx-auto max-w-3xl space-y-6">
        {!done ? (
          <div className="glass rounded-3xl p-6 sm:p-10 shadow-soft animate-fade-up space-y-5">
            {Q.map((q, i) => (
              <div key={i}>
                <p className="font-semibold mb-2">
                  {i + 1}. {lang === "bn" ? q.bn : q.en}
                </p>

                <div className="flex flex-wrap gap-2">
                  {[0, 1, 2, 3].map((v) => (
                    <button
                      key={v}
                      onClick={() => {
                        const ns = [...scores];
                        ns[i] = v;
                        setScores(ns);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        scores[i] === v
                          ? "bg-primary text-primary-foreground"
                          : "bg-white/60 hover:bg-white"
                      }`}
                    >
                      {lang === "bn"
                        ? ["কখনো না", "কয়েকদিন", "অর্ধেক দিন", "প্রায় প্রতিদিন"][v]
                        : ["Not at all", "Several days", "More than half", "Nearly every day"][v]}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={() => setDone(true)}
              className="w-full rounded-full bg-primary text-primary-foreground py-3 font-semibold hover:opacity-90 shadow-soft"
            >
              {t("submit")}
            </button>
          </div>
        ) : (
          <>
            {/* RESULT BOX */}
            <div className="glass rounded-3xl p-6 sm:p-10 shadow-soft animate-fade-up">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("result")}
              </p>

              <h2 className="mt-1 text-3xl font-bold">{level}</h2>

              <div className="mt-4 h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${Math.min(100, (total / 24) * 100)}%`,
                    background: color,
                  }}
                />
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-pink-50/80 border border-pink-200 flex gap-3">
                <Heart
                  className="size-5 shrink-0 mt-0.5 text-pink-500"
                  fill="currentColor"
                />
                <p className="text-sm">
                  {lang === "bn" ? heartBn : heartEn}
                </p>
              </div>

              <div className="mt-4 p-4 rounded-2xl bg-white/60">
                <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                  {t("suggestion")}
                </p>
                <p className="mt-1 text-sm">
                  {lang === "bn" ? suggestionBn : suggestionEn}
                </p>
              </div>
            </div>

            {/* SOUND */}
            <SoundPlayer />

            {/* GAMES */}
            <CalmnessGames />

            {/* IMPORTANCE CARDS SECTION */}
            <MentalHealthImportance />
          </>
        )}
      </section>
    </PageShell>
  );
}

/* =========================================================
   MENTAL HEALTH IMPORTANCE SECTION WITH SPECIFIC IMAGES
   ========================================================= */

function MentalHealthImportance() {
  const { lang } = useI18n();

  const items = [
    {
      titleEn: "Awareness & Understanding",
      titleBn: "সচেতনতা ও বোঝাপড়া",
      descEn:
        "Mental health helps you understand emotions, stress, and reactions in daily life.",
      descBn:
        "মানসিক স্বাস্থ্য আপনাকে আবেগ, চাপ এবং দৈনন্দিন প্রতিক্রিয়া বুঝতে সাহায্য করে।",
      image: mentalconflictImg, // ✅ mentalconflict.jpeg
    },
    {
      titleEn: "Mental Health Status and Statistical Realities in Bangladesh",
      titleBn: "বাংলাদেশে মানসিক স্বাস্থ্য পরিস্থিতি ও তার পরিসংখ্যানগত বাস্তবতা",
      descEn:
        "Despite nearly one in five adults in Bangladesh meeting the criteria for a mental health condition, a massive $92\%$ of patients do not receive medical care due to immense shortages in healthcare infrastructure and budget.",
      descBn:
        "বাংলাদেশে প্রতি পাঁচজন প্রাপ্তবয়স্কের মধ্যে প্রায় একজন মানসিক স্বাস্থ্য সমস্যায় ভুগলেও, অপর্যাপ্ত চিকিৎসাসেবা কাঠামো এবং বাজেট স্বল্পতার কারণে শতকরা ৯২ ভাগ রোগীই কোনো চিকিৎসা পান না।",
      image: mentalBd3Img, // ✅ mentalbd3.png
    },
    {
      titleEn: "Emotional Balance",
      titleBn: "মানসিক ভারসাম্য",
      descEn:
        "Good mental health helps manage anxiety, sadness, and pressure effectively.",
      descBn:
        "ভালো মানসিক স্বাস্থ্য উদ্বেগ, দুঃখ এবং চাপ নিয়ন্ত্রণে সাহায্য করে।",
      image: goodMentalImg, // ✅ goodmental.jpg
    },
  ];

  return (
    <div className="glass rounded-3xl p-6 sm:p-8 shadow-soft animate-fade-up">
      <h3 className="font-bold text-lg mb-4">
        {lang === "bn"
          ? "মানসিক স্বাস্থ্য কেন গুরুত্বপূর্ণ?"
          : "Why Mental Health is Important?"}
      </h3>

      <div className="grid md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.titleEn}
            className="rounded-2xl bg-white/60 overflow-hidden hover:bg-white transition flex flex-col shadow-sm"
          >
            {/* ইমেজ র‍্যাপার */}
            <div className="h-36 w-full overflow-hidden bg-slate-100">
              <img 
                src={item.image} 
                alt={item.titleEn} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* টেক্সট */}
            <div className="p-4 flex-1 flex flex-col">
              <h4 className="font-semibold mb-2 text-foreground">
                {lang === "bn" ? item.titleBn : item.titleEn}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {lang === "bn" ? item.descBn : item.descEn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
    SOUND PLAYER
========================= */

function SoundPlayer() {
  const { t } = useI18n();
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sounds = [
    {
      id: "rain",
      label: t("rain"),
      emoji: "🌧️",
      url: "https://pixabay.com/music/ambient-dark-atmosphere-with-rain-352570/",
    },
    {
      id: "forest",
      label: t("forest"),
      emoji: "🌲",
      url: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3",
    },
    {
      id: "ocean",
      label: t("ocean"),
      emoji: "🌊",
      url: "https://cdn.pixabay.com/audio/2022/03/10/audio_270f49b84e.mp3",
    },
  ];

  const toggle = (s: (typeof sounds)[number]) => {
    if (playing === s.id) {
      audioRef.current?.pause();
      setPlaying(null);
      return;
    }

    if (audioRef.current) audioRef.current.pause();

    const a = new Audio(s.url);
    a.loop = true;
    a.play().catch(() => {});
    audioRef.current = a;
    setPlaying(s.id);
  };

  useEffect(() => {
    return () => audioRef.current?.pause();
  }, []);

  return (
    <div className="glass rounded-3xl p-6 sm:p-8 shadow-soft animate-fade-up">
      <h3 className="font-bold text-lg">{t("relax_sounds")}</h3>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {sounds.map((s) => (
          <button
            key={s.id}
            onClick={() => toggle(s)}
            className={`p-5 rounded-2xl transition flex flex-col items-center gap-2 ${
              playing === s.id
                ? "gradient-accent text-white shadow-glow"
                : "bg-white/60 hover:bg-white"
            }`}
          >
            <span className="text-3xl">{s.emoji}</span>
            <span className="font-semibold text-sm">{s.label}</span>
            {playing === s.id ? (
              <Pause className="size-4" />
            ) : (
              <Play className="size-4" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* =========================
    GAMES
========================= */

function CalmnessGames() {
  const { lang } = useI18n();

  const games = [
    {
      icon: "🫁",
      en: "Breathing Game",
      bn: "শ্বাস নেওয়ার গেম",
      link: "https://xhalr.com",
    },
    {
      icon: "🧩",
      en: "Relaxing Games",
      bn: "শান্তির গেম",
      link: "https://www.crazygames.com/t/relaxing",
    },
  ];

  return (
    <div className="glass rounded-3xl p-6 sm:p-8 shadow-soft animate-fade-up">
      <h3 className="font-bold text-lg flex items-center gap-2">
        <Gamepad2 className="size-5" />
        {lang === "bn" ? "শান্তির গেম" : "Calmness Games"}
      </h3>

      <div className="mt-5 space-y-4">
        {games.map((g) => (
          <div
            key={g.en}
            className="flex items-center justify-between rounded-2xl bg-white/60 p-4"
          >
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-full gradient-accent flex items-center justify-center text-2xl text-white">
                {g.icon}
              </div>
              <p className="font-medium">
                {lang === "bn" ? g.bn : g.en}
              </p>
            </div>

            <a
              href={g.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-primary text-primary-foreground px-4 py-2 flex items-center gap-2"
            >
              {lang === "bn" ? "খুলুন" : "Play"}
              <ExternalLink className="size-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}