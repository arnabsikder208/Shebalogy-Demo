import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Hero } from "./cancer";
import { useI18n } from "@/lib/i18n";
import { BLOOD_GROUPS, BloodGroup, DIVISIONS_ALL, Division, SEED_DONORS } from "@/lib/data";
import { useEffect, useState } from "react";
import { Droplet, Heart, MapPin, Phone, Search, X } from "lucide-react";
import bg from "@/assets/blood-bg.png";

import bloodLiveImg from "@/assets/bloodlive.png";
import bloodElgImg from "@/assets/bloodelg.png";
import bloodInfographicImg from "@/assets/bloodinfographic.png";
import bloodImpImg from "@/assets/bloodimp.png";
import recresBloodImg from "@/assets/recresblood.jpg";

type Donor = { name: string; group: BloodGroup; division: string; phone: string; source: string };

export const Route = createFileRoute("/blood")({ component: Blood });

function loadLocalDonors(): Donor[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("donors") || "[]"); } catch { return []; }
}

function Blood() {
  const { t, lang } = useI18n();
  const [group, setGroup] = useState<BloodGroup>("O+");
  const [div, setDiv] = useState<Division>("Dhaka");
  const [results, setResults] = useState<Donor[] | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [localDonors, setLocalDonors] = useState<Donor[]>([]);
  
  // State to manage the open pop-up image asset (matching the cancer page logic)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => { setLocalDonors(loadLocalDonors()); }, []);

  const search = () => {
    const pool = [...SEED_DONORS, ...localDonors];
    setResults(pool.filter((d) => d.group === group && d.division === div));
  };

  // Helper popup controller actions
  const openPopup = (imgSrc: string) => {
    setSelectedImage(imgSrc);
    document.body.style.overflow = "hidden"; // Locks main view scroll
  };

  const closePopup = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset"; // Unlocks scroll
  };

  // Structured dataset referencing your actual image assets
  const BLOOD_FACTS = [
    {
      id: "save-lives",
      img: bloodLiveImg,
      alt: "Blood Donation Saves Lives",
      textBn: "আপনার দান করা মাত্র এক পিন্ট রক্ত প্রক্রিয়াজাত করে পৃথক তিনজনের জীবন বাঁচানো সম্ভব।",
      textEn: "Did you know that donating just one pint of blood can be separated into components to save up to 3 separate lives?"
    },
    {
      id: "eligibility",
      img: bloodElgImg,
      alt: "Blood Donation Eligibility",
      textBn: "১৮ থেকে ৬০ বছর বয়সী যেকোনো সুস্থ ব্যক্তি যাদের ওজন ৫০ কেজির বেশি, তারা নিরাপদে রক্তদান করতে পারবেন।",
      textEn: "Check if you are eligible to save a life: Age 18–60, Weight 50kg+, and in a completely healthy medical condition."
    },
    {
      id: "blood-101",
      img: bloodInfographicImg,
      alt: "Blood 101 Fundamentals",
      textBn: "মানবদেহে প্রায় ৫ লিটার রক্ত থাকে। প্রতিবার রক্তদানে মাত্র ৪さと মিলি রক্ত সংগ্রহ করা হয় এবং প্রতি ৫৬ দিন পর পর রক্ত দেওয়া যায়।",
      textEn: "Every person's body contains around 5 liters of blood. 450 ml is collected per unit, and a healthy individual can donate every 56 days."
    },
    {
      id: "importance-stats",
      img: bloodImpImg,
      alt: "Critical Demand Metrics",
      textBn: "প্রতি ২ সেকেন্ডে একজন মানুষের রক্তের প্রয়োজন হয়। একটি সাধারণ সড়ক দুর্ঘটনার শিকার রোগীর জন্যই প্রায় ১০০ ইউনিট রক্ত লাগতে পারে।",
      textEn: "Every 2 seconds someone needs blood. A single car accident victim can require as many as 100 units of blood during emergency care."
    },
    {
      id: "one-blood-network",
      img: recresBloodImg,
      alt: "One Blood Network Plan",
      textBn: "সারাদেশে একটি কেন্দ্রীয় রক্তদাতার ডাটাবেজ, রেড ক্রিসেন্ট সহায়তা এবং বড় হাসপাতালগুলোতে ব্লাড এক্সচেঞ্জ নেটওয়ার্ক তৈরির পরিকল্পনা।",
      textEn: "A plan for a unified nationwide blood network system with Red Crescent support, a centralized donor database, and multi-divisional hubs."
    }
  ];

  return (
    <PageShell>
      <Hero bg={bg} icon={Droplet} title={t("blood_title")} sub={t("blood_desc")} />

      <section className="px-4 sm:px-6 py-8 mx-auto max-w-5xl space-y-6">
        
        {/* UPDATED: RED SOFT COMBINATION GLASS SEARCH BLOCK CONTAINER */}
      
        <div className="rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-500/[0.04] to-rose-500/[0.08] backdrop-blur-md p-6 sm:p-8 shadow-[0_8px_32px_0_rgba(239,68,68,0.06)] animate-fade-up">
          <div className="grid sm:grid-cols-3 gap-4">
            <Select label={t("blood_group")} value={group} onChange={(v) => setGroup(v as BloodGroup)} options={BLOOD_GROUPS as readonly string[]} />
            <Select label={t("location")} value={div} onChange={(v) => setDiv(v as Division)} options={DIVISIONS_ALL as readonly string[]} />
            <div className="flex items-end">
              <button 
                onClick={search} 
                className="w-full rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-3 font-semibold hover:opacity-95 active:scale-[0.99] transition-all shadow-[0_4px_12px_rgba(220,38,38,0.2)] flex items-center justify-center gap-2"
              >
                <Search className="size-4" /> {t("search_donors")}
              </button>
            </div>
          </div>
        </div>

        {results !== null && (
          <div className="glass rounded-3xl p-6 sm:p-8 shadow-soft animate-fade-up">
            <h3 className="font-bold text-lg">{t("donors_found")}: {results.length}</h3>
            {results.length === 0 ? (
              <p className="mt-3 text-muted-foreground">{t("no_donors")}</p>
            ) : (
              <div className="mt-4 space-y-3">
                {results.map((d, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/60">
                    <div className="size-12 rounded-full bg-red-500 text-white flex items-center justify-center font-bold shadow-soft">{d.group}</div>
                    <div className="flex-1">
                      <p className="font-semibold">{d.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-3 flex-wrap">
                        <span className="flex items-center gap-1"><MapPin className="size-3" />{d.division}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary">{d.source}</span>
                      </p>
                    </div>
                    <a href={`tel:${d.phone}`} className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 flex items-center gap-1.5"><Phone className="size-3.5" /> {d.phone}</a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <button onClick={() => setShowRegister((s) => !s)} className="w-full glass rounded-3xl p-8 shadow-soft hover:shadow-glow transition group">
          <div className="flex items-center justify-center gap-3">
            <Heart className="size-7 text-red-500 group-hover:scale-125 transition" fill="currentColor" />
            <span className="text-xl font-bold">{t("become_donor")}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{lang === "bn" ? "একটি ক্লিকে জীবন বাঁচান।" : "Save a life with one click."}</p>
        </button>

        {showRegister && <RegisterDonor onDone={() => { setLocalDonors(loadLocalDonors()); setShowRegister(false); }} />}
      </section>

      {/* ========================================================= */}
      {/* 5 BLOOD DONATION VISUAL INFOGRAPHIC CARDS SECTION        */}
      {/* ========================================================= */}
      <section className="border-t border-border/40 bg-secondary/5 px-4 sm:px-6 py-16 mt-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-2">
            {lang === "bn" ? "রক্তদান সচেতনতা ও তথ্যচিত্র" : "Blood Donation Insights & Realities"}
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 text-sm sm:text-base">
            {lang === "bn" 
              ? "রক্তদানের গুরুত্ব, যোগ্যতা এবং বৈশ্বিক তথ্যাবলী বিস্তারিত বড় আকারে দেখতে যেকোনো কার্ডে ক্লিক করুন।" 
              : "Click on any card to look closer into critical blood resource indicators, safety metrics, and systemic setups."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOOD_FACTS.map((fact) => (
              <div 
                key={fact.id}
                onClick={() => openPopup(fact.img)}
                className="glass rounded-3xl overflow-hidden shadow-soft flex flex-col transition-all hover:translate-y-[-4px] cursor-pointer group"
              >
                <div className="h-48 overflow-hidden bg-slate-950 flex items-center justify-center">
                  <img 
                    src={fact.img} 
                    alt={fact.alt} 
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between border-t border-border/20">
                  <p className="text-foreground font-medium text-sm sm:text-base leading-relaxed">
                    {lang === "bn" ? fact.textBn : fact.textEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* POPUP MODAL OVERLAY PORTAL (FOR IMAGE ENLARGEMENT)        */}
      {/* ========================================================= */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-opacity duration-300 animate-fade-in"
          onClick={closePopup}
        >
          <button 
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
            onClick={closePopup}
            aria-label="Close panel"
          >
            <X className="size-6" />
          </button>

          <div 
            className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl bg-secondary/10"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Expanded Blood Information Panel" 
              className="w-full h-auto max-h-[85vh] object-contain block mx-auto" 
            />
          </div>
        </div>
      )}
    </PageShell>
  );
}

function RegisterDonor({ onDone }: { onDone: () => void }) {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [group, setGroup] = useState<BloodGroup>("O+");
  const [div, setDiv] = useState<Division>("Dhaka");
  const [phone, setPhone] = useState("");
  const [thanks, setThanks] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const list = loadLocalDonors();
    list.push({ name, group, division: div, phone, source: "Shebalogy" });
    localStorage.setItem("donors", JSON.stringify(list));
    setThanks(true);
    setTimeout(onDone, 1500);
  };

  if (thanks) return <div className="glass rounded-3xl p-8 text-center animate-fade-up"><Heart className="size-12 mx-auto text-red-500 animate-pulse-soft" fill="currentColor" /><p className="mt-4 font-bold text-lg">{t("donor_thanks")}</p></div>;

  return (
    <form onSubmit={submit} className="glass rounded-3xl p-6 sm:p-8 shadow-soft animate-fade-up space-y-4">
      <h3 className="font-bold text-lg">{t("register_donor")}</h3>
      <Input label={t("name")} value={name} onChange={setName} />
      <div className="grid sm:grid-cols-2 gap-4">
        <Select label={t("blood_group")} value={group} onChange={(v) => setGroup(v as BloodGroup)} options={BLOOD_GROUPS as readonly string[]} />
        <Select label={t("location")} value={div} onChange={(v) => setDiv(v as Division)} options={DIVISIONS_ALL as readonly string[]} />
      </div>
      <Input label={t("phone")} value={phone} onChange={setPhone} />
      <button className="w-full rounded-full bg-primary text-primary-foreground py-3 font-semibold hover:opacity-90 shadow-soft">{t("register_donor")}</button>
    </form>
  );
}

export function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: readonly string[] }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-1.5 w-full rounded-xl bg-white/60 border border-border px-4 py-2.5 outline-none focus:border-primary">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

export function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</span>
      <input required type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1.5 w-full rounded-xl bg-white/60 border border-border px-4 py-2.5 outline-none focus:border-primary" />
    </label>
  );
}