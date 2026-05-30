import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Bot, MessageSquare, Mic, MicOff, Send, X } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const REPLIES: { match: RegExp; en: string; bn: string }[] = [
  { match: /fever|জ্বর/i, en: "For fever above 38.5°C, stay hydrated, rest, and take paracetamol as directed. See a doctor if it lasts >3 days.", bn: "৩৮.৫°C-এর উপরে জ্বর হলে পানি পান করুন, বিশ্রাম নিন ও প্যারাসিটামল নিন। ৩ দিনের বেশি থাকলে চিকিৎসকের পরামর্শ নিন।" },
  { match: /blood|রক্ত/i, en: "You can search donors or register as one on our Blood Donation page.", bn: "আমাদের রক্তদান পেজে আপনি ডোনার খুঁজতে বা নিবন্ধন করতে পারেন।" },
  { match: /cancer|ক্যান্সার/i, en: "Try our guided Cancer Stage Detection survey for a quick risk screening.", bn: "দ্রুত স্ক্রিনিংয়ের জন্য আমাদের ক্যান্সার শনাক্তকরণ সার্ভে দিন।" },
  { match: /stress|anxiety|sad|মন|দুঃখ/i, en: "I hear you. Try the Mental Health check-in and calming sounds — you are not alone.", bn: "আপনার কথা শুনছি। মানসিক স্বাস্থ্য চেক-ইন ও প্রশান্তিদায়ক শব্দ দেখুন — আপনি একা নন।" },
  { match: /medicine|ওষুধ/i, en: "Set up a Medicine Reminder so you never miss a dose.", bn: "ডোজ মিস না করতে ওষুধের রিমাইন্ডার সেট করুন।" },
];

export function AiAssistant() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"text" | "voice">("text");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recRef = useRef<any>(null);

  useEffect(() => {
    if (open && msgs.length === 0) setMsgs([{ role: "assistant", content: t("ai_greeting") }]);
  }, [open, lang]); // eslint-disable-line

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  const reply = (text: string) => {
    const hit = REPLIES.find((r) => r.match.test(text));
    const fallback = lang === "bn"
      ? "আমি এখানে সাহায্যের জন্য আছি। আপনি ক্যান্সার, রক্তদান, ওষুধ, মানসিক স্বাস্থ্য সম্পর্কে জিজ্ঞাসা করতে পারেন।"
      : "I'm here to help. You can ask about cancer screening, blood donation, medicine reminders, or mental health.";
    return hit ? hit[lang] : fallback;
  };

  const send = (txt?: string) => {
    const message = (txt ?? input).trim();
    if (!message) return;
    setMsgs((m) => [...m, { role: "user", content: message }]);
    setInput("");
    setTimeout(() => setMsgs((m) => [...m, { role: "assistant", content: reply(message) }]), 500);
  };

  const toggleVoice = () => {
    const W: any = typeof window !== "undefined" ? window : {};
    const SR = W.SpeechRecognition || W.webkitSpeechRecognition;
    if (!SR) { alert(lang === "bn" ? "এই ব্রাউজারে ভয়েস সমর্থিত নয়।" : "Voice not supported in this browser."); return; }
    if (listening) { recRef.current?.stop(); setListening(false); return; }
    const rec = new SR();
    rec.lang = lang === "bn" ? "bn-BD" : "en-US";
    rec.interimResults = false;
    rec.onresult = (e: any) => { send(e.results[0][0].transcript); setListening(false); };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    rec.start();
    setListening(true);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 size-16 rounded-full gradient-accent text-white shadow-glow animate-pulse-soft hover:scale-110 transition-transform flex items-center justify-center"
        aria-label="AI Assistant"
      >
        {open ? <X className="size-7" /> : <Bot className="size-7" />}
      </button>

      {open && (
        <div className="fixed bottom-28 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[560px] glass-dark rounded-3xl flex flex-col overflow-hidden animate-fade-up text-white">
          <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
            <div className="size-10 rounded-full gradient-accent flex items-center justify-center">
              <Bot className="size-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Sheba AI</p>
              <p className="text-xs text-white/60">{t("ai_title")}</p>
            </div>
            <div className="glass rounded-full p-0.5 flex text-xs">
              <button onClick={() => setMode("text")} className={`px-2 py-1 rounded-full ${mode === "text" ? "bg-white/20" : ""}`}><MessageSquare className="size-3.5" /></button>
              <button onClick={() => setMode("voice")} className={`px-2 py-1 rounded-full ${mode === "voice" ? "bg-white/20" : ""}`}><Mic className="size-3.5" /></button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${m.role === "user" ? "bg-white/20 rounded-br-sm" : "bg-white/10 rounded-bl-sm"}`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          {mode === "text" ? (
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="p-3 border-t border-white/10 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("type_message")}
                className="flex-1 bg-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:bg-white/15"
              />
              <button type="submit" className="size-10 rounded-full gradient-accent flex items-center justify-center hover:scale-105 transition">
                <Send className="size-4" />
              </button>
            </form>
          ) : (
            <div className="p-5 border-t border-white/10 flex flex-col items-center gap-3">
              <button onClick={toggleVoice} className={`size-20 rounded-full ${listening ? "bg-red-500 animate-pulse-soft" : "gradient-accent"} flex items-center justify-center hover:scale-105 transition`}>
                {listening ? <MicOff className="size-8" /> : <Mic className="size-8" />}
              </button>
              <p className="text-xs text-white/60">{listening ? t("listening") : t("voice")}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
