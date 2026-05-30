import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import { CANCER_LABELS, CancerType, DIVISIONS_ALL, DOCTORS, Division } from "@/lib/data";
import { Activity, Stethoscope, MapPin, AlertCircle, RotateCcw, X } from "lucide-react";
import bg from "@/assets/bg-cancer.jpg";
import cancerFactsImg from "@/assets/cancerfacts.png";
import cancercareImg from "@/assets/cancercarebangla.jpg";
import lungCancerImg from "@/assets/lungcancer.jpg";
import cervicalCancerImg from "@/assets/cervicalcn2.jpg";
import cancersign from "@/assets/cancersigns.jpg";

export const Route = createFileRoute("/cancer")({ component: Cancer });

type Q = { id: string; q: string; q_bn: string; w: Partial<Record<CancerType, number>> };
const QUESTIONS: Q[] = [
  { id: "fatigue", q: "Do you experience frequent fatigue or weakness?", q_bn: "আপনি কি প্রায়ই কি ক্লান্তি অনুভব করেন?", w: { blood: 3, lung: 1, breast: 1 } },
  { id: "weight", q: "Have you had unexplained weight loss recently?", q_bn: "অব্যক্ত ওজন কমেছে?", w: { blood: 2, lung: 3, breast: 1, cervical: 1 } },
  { id: "cough", q: "Persistent cough or shortness of breath?", q_bn: "দীর্ঘস্থায়ী কাশি বা শ্বাসকষ্ট?", w: { lung: 4 } },
  { id: "lump", q: "Noticed any lump in breast or armpit?", q_bn: "স্তন বা বগলে গুটি অনুভব?", w: { breast: 5 } },
  { id: "mole", q: "Any new mole or skin lesion changing in color/size?", q_bn: "নতুন তিল বা চামড়ার দাগের পরিবর্তন?", w: { skin: 5 } },
  { id: "bleed", q: "Abnormal bleeding (gums, bruises, or between periods)?", q_bn: "অস্বাভাবিক রক্তপাত?", w: { blood: 3, cervical: 4 } },
  { id: "pain", q: "Persistent pelvic pain or discomfort?", q_bn: "তলপেটে দীর্ঘস্থায়ী ব্যথা?", w: { cervical: 4, breast: 1 } },
  { id: "infections", q: "Frequent infections or fevers without cause?", q_bn: "ঘন ঘন সংক্রমণ বা জ্বর?", w: { blood: 4 } },
  /* Added New Question 9 */
  { id: "swallowing", q: "Do you experience persistent difficulty swallowing or regular indigestion?", q_bn: "খাবার গিলতে দীর্ঘস্থায়ী সমস্যা বা নিয়মিত হজমে অসুবিধা অনুভব করছেন?", w: { lung: 2, cervical: 1 } },
  /* Added New Question 10 */
  { id: "sweats", q: "Are you suffering from heavy, drenching night sweats?", q_bn: "আপনি কি রাতে অতিরিক্ত এবং শরীর ভেজানো ঘামে ভুগছেন?", w: { blood: 4 } }
];

function Cancer() {
  const { t, lang } = useI18n();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 0 | 1 | 2 | 3 | 4>>({});
  const [division, setDivision] = useState<Division>("Dhaka");
  const [done, setDone] = useState(false);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const submit = () => setDone(true);
  const reset = () => { setStep(0); setAnswers({}); setDone(false); };

  const openPopup = (imgSrc: string) => {
    setSelectedImage(imgSrc);
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  let result: { type: CancerType; score: number; stage: string; severity: number } | null = null;
  if (done) {
    const scores: Record<CancerType, number> = { blood: 0, skin: 0, lung: 0, breast: 0, cervical: 0 };
    for (const q of QUESTIONS) {
      const a = answers[q.id] ?? 0;
      for (const [k, v] of Object.entries(q.w)) {
        scores[k as CancerType] += (v as number) * a;
      }
    }
    const top = (Object.entries(scores) as [CancerType, number][]).sort((a, b) => b[1] - a[1])[0];
    
    const maxPossible = QUESTIONS.reduce((s, q) => s + Math.max(...Object.values(q.w), 0) * 4, 0);
    const pct = top[1] / maxPossible;
    
    const stageIdx = pct < 0.15 ? 0 : pct < 0.3 ? 1 : pct < 0.5 ? 2 : pct < 0.7 ? 3 : 4;
    const stageEn = ["Very low (no clear indicators)", "Stage I — early indicators", "Stage II — moderate indicators", "Stage III — significant indicators", "Stage IV — strong indicators, seek urgent care"];
    const stageBn = ["খুব কম (স্পষ্ট লক্ষণ নেই)", "স্টেজ ১ — প্রাথমিক লক্ষণ", "স্টেজ ১ — মধ্যম লক্ষণ", "স্টেজ ৩ — উল্লেখযোগ্য লক্ষণ", "স্টেজ ৪ — গুরুতর, অবিলম্বে চিকিৎসা নিন"];
    result = { type: top[0], score: top[1], stage: (lang === "bn" ? stageBn : stageEn)[stageIdx], severity: stageIdx };
  }

  const recommendedDoctors = result ? DOCTORS.filter((d) => d.specialty === result!.type && d.division === division) : [];
  const fallback = result ? DOCTORS.filter((d) => d.specialty === result!.type).slice(0, 3) : [];
  const showDoctors = recommendedDoctors.length ? recommendedDoctors : fallback;

  const optionsList = [
    { v: 0 as const, l: lang === "bn" ? "না" : "Never" },
    { v: 1 as const, l: lang === "bn" ? "খুব কম" : "Rarely" },
    { v: 2 as const, l: lang === "bn" ? "কখনো কখনো" : "Sometimes" },
    { v: 3 as const, l: lang === "bn" ? "প্রায়ই" : "Often" },
    { v: 4 as const, l: lang === "bn" ? "সবসময়" : "Always" }
  ];

  return (
    <PageShell>
      <Hero bg={bg} icon={Activity} title={t("cancer_title")} sub={t("cancer_intro")} />

      <section className="px-4 sm:px-6 py-10 mx-auto max-w-3xl">
        {!done ? (
          /* ========================================================= */
          /* UPDATED: SOFT LAVENDER COMBINATION GLASS BOX FOR CANCER   */
          /* ========================================================= */
          <div className="rounded-3xl border border-purple-400/20 bg-gradient-to-br from-purple-500/[0.03] to-indigo-500/[0.06] backdrop-blur-md p-6 sm:p-10 shadow-[0_8px_32px_0_rgba(168,85,247,0.05)] animate-fade-up">
            {step < QUESTIONS.length ? (
              <>
                <div className="flex items-center justify-between text-xs font-semibold text-purple-600/70 dark:text-purple-300/70 uppercase tracking-wider">
                  <span>Q {step + 1} / {QUESTIONS.length}</span>
                  <span>{Math.round(((step) / QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="mt-2 h-1.5 bg-purple-100 dark:bg-purple-950/40 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all" style={{ width: `${((step) / QUESTIONS.length) * 100}%` }} />
                </div>
                <h2 className="mt-6 text-2xl font-bold text-foreground">{lang === "bn" ? QUESTIONS[step].q_bn : QUESTIONS[step].q}</h2>
                
                {/* Lavender Enhanced Option Buttons Grid */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {optionsList.map((o) => (
                    <button 
                      key={o.v} 
                      onClick={() => { setAnswers({ ...answers, [QUESTIONS[step].id]: o.v }); setStep(step + 1); }} 
                      className="rounded-2xl border border-purple-500/10 bg-white/50 dark:bg-purple-950/10 hover:bg-gradient-to-br hover:from-purple-600 hover:to-indigo-600 hover:text-white hover:border-transparent transition-all duration-250 py-4 px-2 text-center text-sm font-semibold flex items-center justify-center text-foreground/90 shadow-sm"
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button onClick={() => setStep(step - 1)} className="mt-6 text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 font-medium transition-colors">
                    ← {t("back")}
                  </button>
                )}
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-foreground">{t("your_division")}</h2>
                <select value={division} onChange={(e) => setDivision(e.target.value as Division)} className="mt-4 w-full rounded-xl bg-white/60 dark:bg-slate-900/40 border border-purple-500/20 px-4 py-3 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 text-foreground transition-all">
                  {DIVISIONS_ALL.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                <button 
                  onClick={submit} 
                  className="mt-6 w-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 font-semibold hover:opacity-95 active:scale-[0.99] transition-all shadow-[0_4px_12px_rgba(147,51,234,0.2)]"
                >
                  {t("submit")}
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-5 animate-fade-up">
            <div className="glass rounded-3xl p-6 sm:p-10 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="size-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-glow shrink-0">
                  <Activity className="size-7" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("result")}</p>
                  <h2 className="text-2xl font-bold mt-1">{t("likely_type")}: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 font-extrabold">{CANCER_LABELS[result!.type]}</span></h2>
                  <p className="mt-2 text-foreground">{t("estimated_stage")}: <strong>{result!.stage}</strong></p>
                  <div className="mt-4 h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full transition-all" style={{ width: `${(result!.severity / 4) * 100}%`, background: result!.severity >= 3 ? "oklch(0.58 0.22 25)" : "linear-gradient(to right, #a855f7, #6366f1)" }} />
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex gap-3">
                <AlertCircle className="size-5 shrink-0" /> {t("disclaimer")}
              </div>
            </div>

            <div className="glass rounded-3xl p-6 sm:p-10 shadow-soft">
              <h3 className="text-xl font-bold flex items-center gap-2"><Stethoscope className="size-5 text-purple-500" /> {t("suggested_doctors")} — {division}</h3>
              <div className="mt-5 space-y-3">
                {showDoctors.map((d) => (
                  <div key={d.name} className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 hover:bg-white/80 transition">
                    <div className="size-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white flex items-center justify-center font-bold">{d.name.split(" ")[1]?.[0] || "D"}</div>
                    <div className="flex-1">
                      <p className="font-semibold">{d.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="size-3" /> {d.hospital}, {d.division}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={reset} className="w-full rounded-full glass py-3 font-semibold hover:bg-white/60 flex items-center justify-center gap-2 text-foreground"><RotateCcw className="size-4" /> {t("restart")}</button>
          </div>
        )}
      </section>

      {/* Info Cards Matrix Grid */}
      <section className="border-t border-border/40 bg-secondary/5 px-4 sm:px-6 py-16 mt-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-2">
            {lang === "bn" ? "ক্যান্সার সচেতনতা ও পরিসংখ্যান" : "Cancer Insights & Global Realities"}
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-2 text-sm sm:text-base">
            {lang === "bn" 
              ? "ক্যান্সার প্রতিরোধ ও চিকিৎসার প্রথম ধাপ হলো সঠিক তথ্য জানা।" 
              : "Understanding standard global metrics and statistics is the key to early detection and treatment optimization."}
          </p>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 text-sm sm:text-base">
            {lang === "bn" 
              ? "ক্যানসারের লক্ষণ, প্রতিরোধ এবং চিকিৎসা সংক্রান্ত তথ্যাবলী বিস্তারিত বড় আকারে দেখতে যেকোনো কার্ডে ক্লিক করুন।" 
              : "Click on any card to look closer into cancer symptoms, prevention indicators, and healthcare guidelines."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div onClick={() => openPopup(cancerFactsImg)} className="glass rounded-3xl overflow-hidden shadow-soft flex flex-col transition-all hover:translate-y-[-4px] cursor-pointer group">
              <div className="h-48 overflow-hidden">
                <img src={cancerFactsImg} alt="Global Cancer Facts" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between border-t border-border/20">
                <p className="text-foreground font-medium text-sm sm:text-base leading-relaxed">
                  {lang === "bn" ? "বিশ্বব্যাপী প্রতি বছর প্রায় ১ কোটি মানুষ ক্যান্সারে মারা যায়, যা মোট মৃত্যুর প্রতি ৬ জনের মধ্যে ১ জন।" : "Cancer is the 2nd leading global cause of death, claiming 10 million lives annually or 1 in every 6 deaths."}
                </p>
              </div>
            </div>

            <div onClick={() => openPopup(cancercareImg)} className="glass rounded-3xl overflow-hidden shadow-soft flex flex-col transition-all hover:translate-y-[-4px] cursor-pointer group">
              <div className="h-48 overflow-hidden">
                <img src={cancercareImg} alt="Bangladesh Cancer Crisis" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between border-t border-border/20">
                <p className="text-foreground font-medium text-sm sm:text-base leading-relaxed">
                  {lang === "bn" ? "বাংলাদেশে অধিকাংশ ক্যানসার বিলম্বে সনাক্ত হয় এবং বর্তমানে চিকিৎসা ব্যবস্থার সংকটে রোগীরা দীর্ঘ সময় রেডিওথেরাপির অপেক্ষায় থাকেন।" : "Most cancer cases in Bangladesh are diagnosed at late stages, forcing patients to face month-long wait times for vital radiotherapy facilities."}
                </p>
              </div>
            </div>

            <div onClick={() => openPopup(lungCancerImg)} className="glass rounded-3xl overflow-hidden shadow-soft flex flex-col transition-all hover:translate-y-[-4px] cursor-pointer group">
              <div className="h-48 bg-slate-950 flex items-center justify-center overflow-hidden">
                <img src={lungCancerImg} alt="Lung Cancer Pathology" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between border-t border-border/20">
                <p className="text-foreground font-medium text-sm sm:text-base leading-relaxed">
                  {lang === "bn" ? "দীর্ঘস্থায়ী ফুসফুসের টিস্যু ক্ষতি ও কোষের অনিয়ন্ত্রিত বৃদ্ধিই মারাত্মক টিউমার বা পালমোনারি কার্সিনোমা তৈরি করে।" : "Persistent damage to pulmonary lung tissues can prompt abnormal cell mutations, triggering malignant tumor growth."}
                </p>
              </div>
            </div>

            <div onClick={() => openPopup(cervicalCancerImg)} className="glass rounded-3xl overflow-hidden shadow-soft flex flex-col transition-all hover:translate-y-[-4px] cursor-pointer group">
              <div className="h-48 overflow-hidden">
                <img src={cervicalCancerImg} alt="Cervical Cancer Stages" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between border-t border-border/20">
                <p className="text-foreground font-medium text-sm sm:text-base leading-relaxed">
                  {lang === "bn" ? "সার্ভিক্যাল ক্যান্সার ৪টি ধাপে ছড়ায়; প্রাথমিক স্তরে এটি জরায়ুমুখেই সীমাবদ্ধ থাকলেও সচেতনতা ও নিয়মিত স্ক্রিনিং জরুরি সুরক্ষা দেয়।" : "Cervical cancer develops through 4 distinct stages; while early stages remain localized, timely screening provides essential protection."}
                </p>
              </div>
            </div>

            <div onClick={() => openPopup(cancersign)} className="glass rounded-3xl overflow-hidden shadow-soft flex flex-col transition-all hover:translate-y-[-4px] cursor-pointer group">
              <div className="h-48 overflow-hidden">
                <img src={cancersign} alt="Highest Cancer Rates in the World" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between border-t border-border/20">
                <p className="text-foreground font-medium text-sm sm:text-base leading-relaxed">
                  {lang === "bn" ? "দীর্ঘস্থায়ী ক্লান্তি, অস্বাভাবিক পিণ্ড বা শরীরের আকস্মিক পরিবর্তনের মতো প্রাথমিক লক্ষণগুলো চেনা দ্রুত চিকিৎসার জন্য অত্যন্ত গুরুত্বপূর্ণ।" : "Recognizing early indicators like persistent fatigue, unusual lumps, or unexpected physical changes is vital for timely medical intervention."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Portal Layer */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4" onClick={closePopup}>
          <button className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors" onClick={closePopup} aria-label="Close interactive panel">
            <X className="size-6" />
          </button>
          <div className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl bg-secondary/10" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Expanded Statistics Panel Overview" className="w-full h-auto max-h-[85vh] object-contain block mx-auto" />
          </div>
        </div>
      )}
    </PageShell>
  );
}

export function Hero({ bg, icon: Icon, title, sub }: { bg: string; icon: any; title: string; sub: string }) {
  return (
    <section className="relative px-4 sm:px-6 pt-8 pb-12">
      <div className="relative mx-auto max-w-7xl rounded-3xl overflow-hidden shadow-soft min-h-[400px] flex items-end">
        <img src={bg} alt="" width={1536} height={1024} className="absolute inset-0 size-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.07_258/0.92)] via-[oklch(0.18_0.07_258/0.6)] to-[oklch(0.18_0.07_258/0.3)]" />
        <div className="relative p-8 sm:p-12 text-white max-w-3xl animate-fade-up">
          <div className="glass rounded-2xl size-14 flex items-center justify-center mb-4"><Icon className="size-7" /></div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{title}</h1>
          <p className="mt-3 text-white/80 text-base sm:text-lg max-w-2xl">{sub}</p>
        </div>
      </div>
    </section>
  );
}