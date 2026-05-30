import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Hero } from "./cancer";
import { useI18n } from "@/lib/i18n";
import {
  DIVISIONS_ALL,
  DOCTORS,
  CANCER_LABELS,
  CancerType,
  CANCER_LABELS_BN,
  DIVISIONS_BN,
  DoctorType,
} from "@/lib/data";

import { useState } from "react";

import {
  Stethoscope,
  MapPin,
  Search,
  X,
  Calendar,
  Phone,
  Award,
  Home,
} from "lucide-react";

import bg from "@/assets/bg-ai.jpg";

export const Route = createFileRoute("/doctors")({
  component: Doctors,
});

function Doctors() {
  const { t, lang } = useI18n();

  const [div, setDiv] = useState<string>("All");
  const [spec, setSpec] = useState<string>("All");
  const [q, setQ] = useState("");

  const [selectedDoc, setSelectedDoc] = useState<DoctorType | null>(null);

  const filtered = DOCTORS.filter(
    (d) =>
      (div === "All" || d.division === div) &&
      (spec === "All" || d.specialty === spec) &&
      (q === "" ||
        d.name.toLowerCase().includes(q.toLowerCase()) ||
        d.name_bn.includes(q) ||
        d.hospital.toLowerCase().includes(q.toLowerCase()) ||
        d.hospital_bn.includes(q) ||
        d.degree.toLowerCase().includes(q.toLowerCase()) ||
        d.degree_bn.includes(q))
  );

  return (
    <PageShell>
      <Hero
        bg={bg}
        icon={Stethoscope}
        title={t("nav_doctors")}
        sub={
          lang === "bn"
            ? "বাংলাদেশের যাচাইকৃত বিশেষজ্ঞদের তালিকা এবং চেম্বার অ্যাপয়েন্টমেন্ট।"
            : "Verified specialists and chamber appointments across Bangladesh."
        }
      />

      <section className="px-4 sm:px-6 py-8 mx-auto max-w-6xl space-y-6">
        {/* FILTERS */}
        <div className="glass rounded-3xl p-4 sm:p-6 shadow-xl border border-white/10 grid sm:grid-cols-3 gap-4">
          
          {/* SEARCH */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={
                lang === "bn"
                  ? "নাম, হাসপাতাল বা ডিগ্রি..."
                  : "Name, hospital, or qualification..."
              }
              className={`w-full rounded-xl bg-white/40 border border-black/5 pl-10 pr-4 py-2.5 outline-none focus:border-blue-500 focus:bg-white/80 transition-all text-sm text-slate-800 ${
                lang === "bn" ? "font-bangla" : ""
              }`}
            />
          </div>

          {/* DIVISION */}
          <select
            value={div}
            onChange={(e) => setDiv(e.target.value)}
            className={`rounded-xl bg-white/40 border border-black/5 px-4 py-2.5 outline-none focus:border-blue-500 focus:bg-white/80 transition-all text-sm text-slate-700 ${
              lang === "bn" ? "font-bangla" : ""
            }`}
          >
            <option value="All">
              {lang === "bn" ? "সব বিভাগ" : "All divisions"}
            </option>

            {DIVISIONS_ALL.map((d) => (
              <option key={d} value={d}>
                {lang === "bn" ? DIVISIONS_BN[d] : d}
              </option>
            ))}
          </select>

          {/* SPECIALTY */}
          <select
            value={spec}
            onChange={(e) => setSpec(e.target.value)}
            className={`rounded-xl bg-white/40 border border-black/5 px-4 py-2.5 outline-none focus:border-blue-500 focus:bg-white/80 transition-all text-sm text-slate-700 ${
              lang === "bn" ? "font-bangla" : ""
            }`}
          >
            <option value="All">
              {lang === "bn" ? "সব বিশেষজ্ঞতা" : "All specialties"}
            </option>

            {(Object.keys(CANCER_LABELS) as CancerType[]).map((k) => (
              <option key={k} value={k}>
                {lang === "bn"
                  ? CANCER_LABELS_BN[k]
                  : CANCER_LABELS[k]}
              </option>
            ))}
          </select>
        </div>

        {/* DOCTOR CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((d, i) => (
            <div
              key={i}
              onClick={() => setSelectedDoc(d)}
              className="glass rounded-3xl p-5 shadow-sm border border-white/20 hover:shadow-xl hover:border-blue-500/30 hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between"
              style={{ animationDelay: `${i * 15}ms` }}
            >
              <div>
                <div className="flex items-start gap-3">
                  
                  {/* AVATAR */}
                  <div className="size-11 shrink-0 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    {(lang === "bn" ? d.name_bn : d.name)
                      .replace(
                        /^(Assistant Professor|Professor|Dr\.)\s+/i,
                        ""
                      )[0] || "D"}
                  </div>

                  <div className="space-y-0.5">
                    <h3
                      className={`font-bold text-slate-800 text-sm leading-snug ${
                        lang === "bn" ? "font-bangla" : ""
                      }`}
                    >
                      {lang === "bn" ? d.name_bn : d.name}
                    </h3>

                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100 ${
                        lang === "bn" ? "font-bangla" : ""
                      }`}
                    >
                      {lang === "bn"
                        ? CANCER_LABELS_BN[d.specialty]
                        : CANCER_LABELS[d.specialty]}
                    </span>
                  </div>
                </div>

                {/* DEGREE */}
                <p
                  className={`text-xs font-medium text-slate-600 mt-3 line-clamp-1 flex items-center gap-1 ${
                    lang === "bn" ? "font-bangla" : ""
                  }`}
                >
                  <Award className="size-3.5 text-slate-400 shrink-0" />

                  {lang === "bn" ? d.degree_bn : d.degree}
                </p>

                {/* HOSPITAL */}
                <p
                  className={`text-xs text-slate-500 mt-1.5 flex items-center gap-1.5 ${
                    lang === "bn" ? "font-bangla" : ""
                  }`}
                >
                  <MapPin className="size-3.5 text-blue-400 shrink-0" />

                  <span className="line-clamp-1">
                    {lang === "bn"
                      ? d.hospital_bn
                      : d.hospital}
                  </span>
                </p>
              </div>

              {/* FOOTER */}
              <div className="border-t border-slate-100 mt-4 pt-3 flex items-center justify-between text-xs text-slate-500">
                <span className={lang === "bn" ? "font-bangla" : ""}>
                  📍 {lang === "bn" ? d.division_bn : d.division}
                </span>

                <span
                  className={`font-semibold text-blue-600 ${
                    lang === "bn" ? "font-bangla" : ""
                  }`}
                >
                  {lang === "bn"
                    ? "বিস্তারিত দেখুন →"
                    : "View Details →"}
                </span>
              </div>
            </div>
          ))}

          {/* EMPTY */}
          {filtered.length === 0 && (
            <div className="glass rounded-3xl col-span-full text-center py-16 border border-dashed border-slate-200">
              <p
                className={`text-slate-400 text-sm font-medium ${
                  lang === "bn" ? "font-bangla" : ""
                }`}
              >
                {lang === "bn"
                  ? "কোনো বিশেষজ্ঞ ডাক্তার পাওয়া যায়নি।"
                  : "No doctors match your filters."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* MODAL */}
      {selectedDoc && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-all duration-500 animate-modal-backdrop"
          onClick={() => setSelectedDoc(null)}
        >
          <div
            className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden border border-white/20 animate-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* HEADER */}
            <div className="relative p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-start gap-4">
              
              <div className="size-14 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shrink-0">
                {selectedDoc.name
                  .replace(/^(Assistant|Professor|Dr\.)\s+/i, "")[0] || "D"}
              </div>

              <div className="pr-8 space-y-1">
                <h2
                  className={`text-lg font-bold leading-tight ${
                    lang === "bn" ? "font-bangla" : ""
                  }`}
                >
                  {lang === "bn"
                    ? selectedDoc.name_bn
                    : selectedDoc.name}
                </h2>

                <p
                  className={`text-xs text-blue-400 font-medium ${
                    lang === "bn" ? "font-bangla" : ""
                  }`}
                >
                  {lang === "bn"
                    ? CANCER_LABELS_BN[selectedDoc.specialty]
                    : CANCER_LABELS[selectedDoc.specialty]}
                </p>
              </div>

              <button
                onClick={() => setSelectedDoc(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all active:scale-90"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 space-y-5 max-h-[400px] overflow-y-auto">
              
              {/* DEGREE */}
              <div className="flex gap-4 items-start group">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Award className="size-5" />
                </div>

                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-widest text-slate-400 ${lang === "bn" ? "font-bangla" : ""}`}>
                    {lang === "bn"
                      ? "ডিগ্রি ও যোগ্যতা"
                      : "Qualifications"}
                  </p>

                  <p className={`text-sm font-semibold text-slate-700 leading-relaxed ${lang === "bn" ? "font-bangla" : ""}`}>
                    {lang === "bn"
                      ? selectedDoc.degree_bn
                      : selectedDoc.degree}
                  </p>
                </div>
              </div>

              {/* HOSPITAL */}
              <div className="flex gap-4 items-start group">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Home className="size-5" />
                </div>

                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-widest text-slate-400 ${lang === "bn" ? "font-bangla" : ""}`}>
                    {lang === "bn"
                      ? "সংলগ্ন হাসপাতাল"
                      : "Affiliated Hospital"}
                  </p>

                  <p className={`text-sm font-semibold text-slate-700 ${lang === "bn" ? "font-bangla" : ""}`}>
                    {lang === "bn"
                      ? selectedDoc.hospital_bn
                      : selectedDoc.hospital}
                  </p>
                </div>
              </div>

              {/* CHAMBER */}
              <div className="flex gap-4 items-start group">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <MapPin className="size-5" />
                </div>

                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-widest text-slate-400 ${lang === "bn" ? "font-bangla" : ""}`}>
                    {lang === "bn"
                      ? "চেম্বার ও ঠিকানা"
                      : "Chamber Location"}
                  </p>

                  <p className={`text-sm font-semibold text-slate-700 ${lang === "bn" ? "font-bangla" : ""}`}>
                    {lang === "bn"
                      ? selectedDoc.chamber_bn
                      : selectedDoc.chamber}
                  </p>
                </div>
              </div>

              {/* SCHEDULE */}
              <div className="flex gap-4 items-start group">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Calendar className="size-5" />
                </div>

                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-widest text-slate-400 ${lang === "bn" ? "font-bangla" : ""}`}>
                    {lang === "bn"
                      ? "রোগী দেখার সময়"
                      : "Visiting Schedule"}
                  </p>

                  <p className={`text-sm font-semibold text-slate-700 ${lang === "bn" ? "font-bangla" : ""}`}>
                    {lang === "bn"
                      ? selectedDoc.schedule_bn
                      : selectedDoc.schedule}
                  </p>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex gap-4 items-start p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                <Phone className="size-5 text-blue-600 mt-1 shrink-0" />

                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-widest text-blue-600/70 ${lang === "bn" ? "font-bangla" : ""}`}>
                    {lang === "bn"
                      ? "সিরিয়ালের জন্য যোগাযোগ"
                      : "Appointment Line"}
                  </p>

                  <p className="text-lg font-black text-blue-700 tracking-tight select-all">
                    {selectedDoc.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              
              <button
                onClick={() => setSelectedDoc(null)}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-200 transition-all active:scale-95 ${
                  lang === "bn" ? "font-bangla" : ""
                }`}
              >
                {lang === "bn" ? "বন্ধ করুন" : "Close"}
              </button>

              <a
                href={`tel:${selectedDoc.phone}`}
                className={`px-8 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center gap-2 ${
                  lang === "bn" ? "font-bangla" : ""
                }`}
              >
                <Phone className="size-3" />

                {lang === "bn" ? "কল করুন" : "Call Now"}
              </a>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}