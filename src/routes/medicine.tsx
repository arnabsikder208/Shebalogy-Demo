import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Hero } from "./cancer";
import { useI18n } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";
import { Pill, Plus, Trash2, Bell, HeartPulse, ShieldAlert, Sparkles, X } from "lucide-react";
import bg from "@/assets/bg-medicine.jpg";

import infoImg1 from "@/assets/info-clock.jpg";
import infoImg2 from "@/assets/info-telemedicine.jpg"; 
import infoImg3 from "@/assets/info-safety.jpg";

export const Route = createFileRoute("/medicine")({ component: Medicine });

type Combo = "M" | "N" | "G" | "MN" | "MG" | "NG" | "MNG";
type Reminder = { id: string; name: string; combo: Combo; times: { M: string; N: string; G: string } };

const COMBOS: { id: Combo; label_en: string; label_bn: string }[] = [
  { id: "M", label_en: "Morning", label_bn: "সকাল" },
  { id: "N", label_en: "Noon", label_bn: "দুপুর" },
  { id: "G", label_en: "Night", label_bn: "রাত" },
  { id: "MN", label_en: "Morning + Noon", label_bn: "সকাল + দুপুর" },
  { id: "MG", label_en: "Morning + Night", label_bn: "সকাল + রাত" },
  { id: "NG", label_en: "Noon + Night", label_bn: "দুপুর + রাত" },
  { id: "MNG", label_en: "Morning + Noon + Night", label_bn: "সকাল + দুপুর + রাত" },
];

function load(): Reminder[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("reminders") || "[]"); } catch { return []; }
}
function save(rs: Reminder[]) { localStorage.setItem("reminders", JSON.stringify(rs)); }

function format12Hour(timeStr: string): string {
  if (!timeStr) return "";
  const [hoursStr, minutesStr] = timeStr.split(":");
  let hours = parseInt(hoursStr, 10);
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedHours = String(hours).padStart(2, "0");
  return `${formattedHours}:${minutesStr} ${ampm}`;
}

function Medicine() {
  const { t, lang } = useI18n();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [name, setName] = useState("");
  const [combo, setCombo] = useState<Combo>("MNG");
  const [times, setTimes] = useState({ M: "08:00", N: "13:00", G: "21:00" });
  const [now, setNow] = useState(new Date());
  const firedRef = useRef<Set<string>>(new Set());
  
  // State for the beautiful full-screen image pop-up
  const [enlargedImg, setEnlargedImg] = useState<string | null>(null);

  useEffect(() => { setReminders(load()); if (typeof Notification !== "undefined" && Notification.permission === "default") Notification.requestPermission(); }, []);

  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date();
      setNow(d);
      const hm = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
      for (const r of reminders) {
        for (const slot of ["M", "N", "G"] as const) {
          if (r.combo.includes(slot) && r.times[slot] === hm) {
            const key = `${r.id}-${slot}-${d.toDateString()}`;
            if (!firedRef.current.has(key)) {
              firedRef.current.add(key);
              const msg = `${r.name} — ${t("notif_msg")}`;
              if (typeof Notification !== "undefined" && Notification.permission === "granted") {
                new Notification("💊 Shebalogy", { body: msg });
              }
              alert(msg);
            }
          }
        }
      }
    }, 30000);
    return () => clearInterval(id);
  }, [reminders, t]);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const next = [...reminders, { id: crypto.randomUUID(), name, combo, times: { ...times } }];
    setReminders(next); save(next); setName("");
  };
  const remove = (id: string) => { const next = reminders.filter((r) => r.id !== id); setReminders(next); save(next); };

  return (
    <PageShell>
      <Hero bg={bg} icon={Pill} title={t("medicine_title") || "Medicine Reminder"} sub={t("medicine_desc") || "Never miss a dose"} />

      <section className="px-4 sm:px-6 py-8 mx-auto max-w-4xl space-y-6">
        
        {/* TOP BOX 1: Light blue glow */}
        <div className="glass rounded-3xl p-6 sm:p-8 shadow-soft animate-fade-up flex items-center gap-3 transition-all duration-300 ease-in-out hover:ring-4 hover:ring-blue-400/40 hover:shadow-xl hover:shadow-blue-400/30">
          <Bell className="size-5 text-primary" />
          <p className="text-sm">{lang === "bn" ? "এখন:" : "Now:"} <strong className="font-mono">{now.toLocaleTimeString()}</strong></p>
        </div>

        {/* TOP BOX 2: Light blue glow */}
        <form onSubmit={add} className="glass rounded-3xl p-6 sm:p-8 shadow-soft animate-fade-up space-y-4 transition-all duration-300 ease-in-out hover:ring-4 hover:ring-blue-400/40 hover:shadow-xl hover:shadow-blue-400/30">
          <label className="block">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("medicine_name") || "Medicine Name"}</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Napa, Metformin, ..." className="mt-1.5 w-full rounded-xl bg-white/60 border border-border px-4 py-2.5 outline-none focus:border-primary" />
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("schedule") || "Schedule"}</span>
            <select value={combo} onChange={(e) => setCombo(e.target.value as Combo)} className="mt-1.5 w-full rounded-xl bg-white/60 border border-border px-4 py-2.5 outline-none focus:border-primary">
              {COMBOS.map((c) => <option key={c.id} value={c.id}>{lang === "bn" ? c.label_bn : c.label_en}</option>)}
            </select>
          </label>

          <div className="grid grid-cols-3 gap-3">
            {[{ k: "M" as const, l: t("morning") || "Morning" }, { k: "N" as const, l: t("noon") || "Noon" }, { k: "G" as const, l: t("night") || "Night" }].map(({ k, l }) => (
              <label key={k} className={`block transition ${combo.includes(k) ? "opacity-100" : "opacity-40"}`}>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{l}</span>
                <input type="time" disabled={!combo.includes(k)} value={times[k]} onChange={(e) => setTimes({ ...times, [k]: e.target.value })} className="mt-1.5 w-full rounded-xl bg-white/60 border border-border px-3 py-2.5 outline-none focus:border-primary" />
              </label>
            ))}
          </div>

          <button className="w-full rounded-full bg-primary text-primary-foreground py-3 font-semibold hover:opacity-90 shadow-soft flex items-center justify-center gap-2"><Plus className="size-4" /> {t("add_reminder") || "Add Reminder"}</button>
        </form>

        {/* TOP BOX 3: Light blue glow */}
        <div className="glass rounded-3xl p-6 sm:p-8 shadow-soft animate-fade-up transition-all duration-300 ease-in-out hover:ring-4 hover:ring-blue-400/40 hover:shadow-xl hover:shadow-blue-400/30">
          <h3 className="font-bold text-black">{t("active_reminders") || "Active Reminders"} · {reminders.length}</h3>
          {reminders.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">{lang === "bn" ? "এখনও কোনো রিমাইন্ডার নেই।" : "No reminders yet."}</p>
          ) : (
            <div className="mt-4 space-y-3">
              {reminders.map((r) => (
                <div key={r.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/60">
                  <div className="size-12 rounded-2xl gradient-accent text-white flex items-center justify-center"><Pill className="size-5" /></div>
                  <div className="flex-1">
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      {(["M", "N", "G"] as const)
                        .filter((s) => r.combo.includes(s))
                        .map((s) => {
                          const slotLabel = ({ M: t("morning") || "Morning", N: t("noon") || "Noon", G: t("night") || "Night" })[s];
                          return `${slotLabel} ${format12Hour(r.times[s])}`;
                        })
                        .join(" · ")}
                    </p>
                  </div>
                  <button onClick={() => remove(r.id)} className="size-10 rounded-full bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center"><Trash2 className="size-4" /></button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Cards Grid Section */}
        <div className="pt-6 mt-10 space-y-6 animate-fade-up">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {lang === "bn" ? "সময়মতো ওষুধ, সুস্থ জীবনের প্রতিশ্রুতি" : "Medicine on Time, Wellness for Life"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {lang === "bn" ? "সুস্থ ও নিরাপদ জীবনের জন্য চিকিৎসকের পরামর্শ অনুযায়ী ওষুধ সেবনের প্রয়োজনীয়তা জানুন।" : "Understand how tracking your treatment timeline accurately directly influences recovery."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* BOTTOM BOX 1: Efficacy - FIXED STRONG POP-UP HOVER */}
            <div className="glass rounded-3xl overflow-hidden flex flex-col shadow-soft border border-white/40 bg-white/20 transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl">
              <div 
                onClick={() => setEnlargedImg(infoImg1)}
                className="h-44 relative overflow-hidden bg-slate-100 cursor-pointer group"
              >
                <img src={infoImg1} alt="Clock and pills" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="p-5 flex-1 flex flex-col space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider"><HeartPulse className="size-4" /><span>{lang === "bn" ? "কার্যকারিতা" : "Efficacy"}</span></div>
                <h3 className="font-bold text-base text-foreground">{lang === "bn" ? "রক্তে ওষুধের সঠিক মাত্রা" : "Maintaining Stable Levels"}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {lang === "bn" ? "নির্দিষ্ট বিরতিতে ওষুধ সেবন করলে শরীরের রক্তে এর কার্যকারী উপাদানগুলোর ভারসাম্য বজায় থাকে।" : "Taking doses at uniform intervals ensures that recovery ingredients stay at a constant level."}
                </p>
              </div>
            </div>

            {/* BOTTOM BOX 2: Smart Tracking - FIXED STRONG POP-UP HOVER */}
            <div className="glass rounded-3xl overflow-hidden flex flex-col shadow-soft border border-white/40 bg-white/20 transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl">
              <div 
                onClick={() => setEnlargedImg(infoImg2)}
                className="h-44 relative overflow-hidden bg-slate-100 cursor-pointer group"
              >
                <img src={infoImg2} alt="Digital health" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="p-5 flex-1 flex flex-col space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider"><Sparkles className="size-4" /><span>{lang === "bn" ? "স্মার্ট ট্র্যাকিং" : "Smart Tracking"}</span></div>
                <h3 className="font-bold text-base text-foreground">{lang === "bn" ? "ডিজিটাল স্বাস্থ্য ও যত্ন" : "Smart Health Management"}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {lang === "bn" ? "আজকের ডিজিটাল যুগে রিমাইন্ডার ব্যবহারের মাধ্যমে আপনি স্বাস্থ্যসুরক্ষা নিশ্চিত করতে পারেন।" : "Embracing automated digital tracking makes it seamless to align healthcare tasks with daily life."}
                </p>
              </div>
            </div>

            {/* BOTTOM BOX 3: Safety Guidelines - FIXED STRONG POP-UP HOVER */}
            <div className="glass rounded-3xl overflow-hidden flex flex-col shadow-soft border border-white/40 bg-white/20 transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl">
              <div 
                onClick={() => setEnlargedImg(infoImg3)}
                className="h-44 relative overflow-hidden bg-slate-100 cursor-pointer group"
              >
                <img src={infoImg3} alt="Safety guidelines" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="p-5 flex-1 flex flex-col space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider"><ShieldAlert className="size-4" /><span>{lang === "bn" ? "সতর্কতা" : "Safety First"}</span></div>
                <h3 className="font-bold text-base text-foreground">{lang === "bn" ? "নিরাপদ সেবনের নিয়মাবলী" : "Comprehensive Safety Guide"}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {lang === "bn" ? "ওষুধ ভুল সংরক্ষণ পদ্ধতি বা চিকিৎসকের না জানিয়ে ডোজ পরিবর্তন করা বড় ধরনের ঝুঁকি তৈরি করতে পারে।" : "Splitting tablets or ignoring storage parameters without talking to professionals can reduce safety."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BOX 4: Why It Matters - FIXED STRONG POP-UP HOVER */}
        <div className="glass rounded-3xl p-6 sm:p-8 shadow-soft animate-fade-up mt-10 border border-white/40 bg-white/20 transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl">
          <div className="flex items-center gap-2 mb-3 text-primary font-bold text-sm uppercase tracking-wider">
            <Sparkles className="size-5" />
            <span>{lang === "bn" ? "কেন এটি গুরুত্বপূর্ণ" : "Why It Matters"}</span>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-justify">
            {lang === "bn"
              ? "সময়মতো ওষুধ গ্রহণ শুধু একটি অভ্যাস নয় — এটি সুস্থ জীবন ও দ্রুত আরোগ্যের অন্যতম চাবিকাঠি। প্রতিটি ওষুধ ঠিক সময়ে গ্রহণ করলে শরীর আরও কার্যকরভাবে রোগের বিরুদ্ধে লড়াই করতে পারে এবং চিকিৎসা সঠিকভাবে কাজ করে। ওষুধ খেতে দেরি করা বা ভুলে যাওয়া সুস্থ হতে সময় বাড়ায় এবং স্বাস্থ্যঝুঁকি বৃদ্ধি করে। স্বল্পমেয়াদি অসুস্থতা হোক বা দীর্ঘমেয়াদি রোগ, নির্দিষ্ট সময় মেনে ওষুধ গ্রহণ করা অত্যন্ত গুরুত্বপূর্ণ। আজকের একটি ছোট্ট রিমাইন্ডার আগামী দিনের বড় স্বাস্থ্যঝুঁকি কমাতে পারে। মনে রাখবেন, প্রতিটি ডোজ গুরুত্বপূর্ণ এবং সুস্থ জীবনের জন্য প্রতিটি মুহূর্তেরই মূল্য আছে।"
              : "Timely medication is not just a habit — it is a key to better health and faster recovery. Every dose taken on time helps your body heal more effectively and keeps treatments working properly. Missing or delaying medicine can slow recovery and increase health risks. Whether it is a short-term illness or a long-term condition, following the right schedule makes a big difference. A simple reminder today can protect your health tomorrow. Remember, every dose counts, and every moment matters when it comes to living a healthier life."}
          </p>
        </div>
      </section>

      {/* --- BEAUTIFUL FULL-SCREEN IMAGE MODAL --- */}
      {enlargedImg && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md transition-all duration-300 p-4"
          onClick={() => setEnlargedImg(null)}
        >
          <div 
            className="relative max-w-5xl w-full flex items-center justify-center animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* The Close Button */}
            <button 
              onClick={() => setEnlargedImg(null)}
              className="absolute -top-12 right-0 sm:-right-12 sm:top-0 size-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shadow-lg border border-white/20"
            >
              <X className="size-5" />
            </button>

            {/* The Enlarged Image */}
            <img 
              src={enlargedImg} 
              alt="Enlarged view" 
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain border border-white/10" 
            />
          </div>
        </div>
      )}
    </PageShell>
  );
}

export default Medicine;