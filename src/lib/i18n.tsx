import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "bn";

const dict = {
  en: {
    nav_home: "Home", nav_cancer: "Cancer Detection", nav_blood: "Blood Donation",
    nav_mental: "Mental Health", nav_medicine: "Medicine Reminder", nav_doctors: "Doctors",
    login: "Login", signup: "Sign Up", logout: "Logout",
    hero_title: "Healthcare, reimagined for Bangladesh",
    hero_sub: "AI-augmented care across cancer detection, blood donation, mental wellness, and medicine reminders — built for all 9 divisions.",
    explore: "Explore Services", get_started: "Get Started",
    services_title: "Our Services",
    services_sub: "Five integrated tools designed for accessibility, ethics and impact.",
    cancer_title: "Cancer Stage Detection",
    cancer_desc: "Take a guided survey to identify possible cancer type and stage, then get doctor suggestions in your division.",
    blood_title: "Blood Donation",
    blood_desc: "Find donors near you in seconds or register yourself as a lifesaver.",
    mental_title: "Mental Health",
    mental_desc: "Compassionate self-assessment, calming sounds and verified counselors.",
    medicine_title: "Medicine Reminder",
    medicine_desc: "Never miss a dose — gentle notifications when it's time to heal.",
    ai_title: "AI Health Assistant",
    ai_desc: "Voice and chat guidance, anytime you need it.",
    open_service: "Open service",
    why_title: "Why Shebalogy",
    why_1_t: "Ethical AI", why_1_d: "Clinical validation logic with human-in-loop safeguards.",
    why_2_t: "Made for Bangladesh", why_2_d: "Localized for all 9 divisions, English and বাংলা.",
    why_3_t: "Offline resilience", why_3_d: "Low-bandwidth ready for rural reach.",
    why_4_t: "Privacy first", why_4_d: "Your data stays yours — WHO-aligned safeguards.",
    footer: "Built with care in Bangladesh.",
    email: "Email", password: "Password", name: "Full name", phone: "Phone",
    have_account: "Already have an account?", no_account: "New to Shebalogy?",
    welcome_back: "Welcome back", create_account: "Create your account",
    // Cancer
    cancer_intro: "Answer a few questions. This is a guidance tool, not a diagnosis.",
    next: "Next", back: "Back", submit: "Get assessment", restart: "Restart",
    your_division: "Your division",
    result: "Assessment",
    likely_type: "Likely focus area", estimated_stage: "Estimated risk level",
    suggested_doctors: "Suggested specialists near you",
    disclaimer: "This is an AI-assisted screening only. Please consult a qualified physician.",
    // Blood
    blood_group: "Blood group", location: "Location (Division)",
    search_donors: "Search Donors", become_donor: "Become a Donor",
    register_donor: "Register as Donor", donors_found: "Donors found",
    no_donors: "No donors yet for this combination. Be the first.",
    donor_thanks: "Thank you! You are now a registered donor.",
    // Mental
    mental_intro: "A gentle 8-question check-in. You are safe here.",
    relax_sounds: "Calming sounds", rain: "Rain", forest: "Forest", ocean: "Ocean",
    stop: "Stop", play: "Play",
    suggestion: "Recommendations", counseling: "Counseling & therapy",
    // Medicine
    medicine_name: "Medicine name", schedule: "Schedule",
    add_reminder: "Add reminder", active_reminders: "Active reminders",
    morning: "Morning", noon: "Noon", night: "Night",
    remove: "Remove", notif_msg: "Take your medicine, you will recover soon.",
    // AI
    ai_greeting: "Hi, I'm Sheba — your AI health companion. How can I help?",
    type_message: "Type your message…", send: "Send", listening: "Listening…",
    voice: "Voice", text: "Text",
  },
  bn: {
    nav_home: "হোম", nav_cancer: "ক্যান্সার শনাক্তকরণ", nav_blood: "রক্তদান",
    nav_mental: "মানসিক স্বাস্থ্য", nav_medicine: "ওষুধের রিমাইন্ডার", nav_doctors: "ডাক্তার",
    login: "লগইন", signup: "সাইন আপ", logout: "লগআউট",
    hero_title: "বাংলাদেশের জন্য পুনর্কল্পিত স্বাস্থ্যসেবা",
    hero_sub: "ক্যান্সার শনাক্তকরণ, রক্তদান, মানসিক সুস্থতা এবং ওষুধ রিমাইন্ডার — ৯টি বিভাগের জন্য AI-চালিত যত্ন।",
    explore: "সেবাসমূহ দেখুন", get_started: "শুরু করুন",
    services_title: "আমাদের সেবা",
    services_sub: "পাঁচটি সমন্বিত সরঞ্জাম — সহজলভ্যতা ও নৈতিকতার জন্য।",
    cancer_title: "ক্যান্সার স্টেজ শনাক্তকরণ",
    cancer_desc: "একটি নির্দেশিত সার্ভে দিয়ে সম্ভাব্য ক্যান্সারের ধরন ও স্টেজ এবং বিভাগে চিকিৎসকের পরামর্শ পান।",
    blood_title: "রক্তদান",
    blood_desc: "কাছের ডোনার খুঁজুন বা নিজেই একজন জীবনরক্ষক হিসেবে নিবন্ধন করুন।",
    mental_title: "মানসিক স্বাস্থ্য",
    mental_desc: "সহানুভূতিশীল আত্ম-মূল্যায়ন, প্রশান্তিদায়ক শব্দ ও যাচাইকৃত কাউন্সেলর।",
    medicine_title: "ওষুধের রিমাইন্ডার",
    medicine_desc: "কোনো ডোজ আর মিস হবে না — সময় হলে কোমল বিজ্ঞপ্তি।",
    ai_title: "AI স্বাস্থ্য সহকারী",
    ai_desc: "যখন প্রয়োজন, ভয়েস ও চ্যাট গাইডেন্স।",
    open_service: "সেবা দেখুন",
    why_title: "কেন শেবালজি",
    why_1_t: "নৈতিক AI", why_1_d: "ক্লিনিক্যাল ভ্যালিডেশন ও মানবিক সুরক্ষা।",
    why_2_t: "বাংলাদেশের জন্য", why_2_d: "৯টি বিভাগের জন্য, ইংরেজি ও বাংলা।",
    why_3_t: "অফলাইন প্রস্তুত", why_3_d: "গ্রামীণ অঞ্চলের জন্য কম-ব্যান্ডউইথে চলে।",
    why_4_t: "গোপনীয়তা অগ্রাধিকার", why_4_d: "আপনার ডেটা আপনারই — WHO-অনুমোদিত।",
    footer: "বাংলাদেশে যত্ন সহকারে নির্মিত।",
    email: "ইমেইল", password: "পাসওয়ার্ড", name: "পূর্ণ নাম", phone: "ফোন",
    have_account: "ইতিমধ্যে অ্যাকাউন্ট আছে?", no_account: "শেবালজিতে নতুন?",
    welcome_back: "আবার স্বাগতম", create_account: "আপনার অ্যাকাউন্ট তৈরি করুন",
    cancer_intro: "কয়েকটি প্রশ্নের উত্তর দিন। এটি গাইডেন্স, রোগনির্ণয় নয়।",
    next: "পরবর্তী", back: "পূর্ববর্তী", submit: "মূল্যায়ন দেখুন", restart: "আবার শুরু",
    your_division: "আপনার বিভাগ",
    result: "মূল্যায়ন",
    likely_type: "সম্ভাব্য ক্ষেত্র", estimated_stage: "সম্ভাব্য ঝুঁকি স্তর",
    suggested_doctors: "কাছাকাছি বিশেষজ্ঞ",
    disclaimer: "এটি একটি AI স্ক্রিনিং মাত্র। অনুগ্রহ করে চিকিৎসকের পরামর্শ নিন।",
    blood_group: "রক্তের গ্রুপ", location: "অবস্থান (বিভাগ)",
    search_donors: "ডোনার খুঁজুন", become_donor: "ডোনার হোন",
    register_donor: "ডোনার হিসেবে নিবন্ধন", donors_found: "ডোনার পাওয়া গেছে",
    no_donors: "এই সংমিশ্রণে এখনও কোনো ডোনার নেই। আপনিই প্রথম হোন।",
    donor_thanks: "ধন্যবাদ! আপনি এখন নিবন্ধিত ডোনার।",
    mental_intro: "একটি কোমল ৮-প্রশ্নের চেক-ইন। আপনি এখানে নিরাপদ।",
    relax_sounds: "প্রশান্তিদায়ক শব্দ", rain: "বৃষ্টি", forest: "বন", ocean: "সমুদ্র",
    stop: "বন্ধ", play: "চালান",
    suggestion: "পরামর্শ", counseling: "কাউন্সেলিং ও থেরাপি",
    medicine_name: "ওষুধের নাম", schedule: "সময়সূচী",
    add_reminder: "রিমাইন্ডার যোগ করুন", active_reminders: "চালু রিমাইন্ডার",
    morning: "সকাল", noon: "দুপুর", night: "রাত",
    remove: "মুছুন", notif_msg: "ওষুধ খেয়ে নিন, আপনি দ্রুত সেরে উঠবেন।",
    ai_greeting: "হাই, আমি শেবা — আপনার AI স্বাস্থ্য সঙ্গী। কীভাবে সাহায্য করতে পারি?",
    type_message: "আপনার বার্তা লিখুন…", send: "পাঠান", listening: "শুনছি…",
    voice: "ভয়েস", text: "টেক্সট",
  },
} as const;

type Key = keyof typeof dict.en;

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string }>({
  lang: "en", setLang: () => {}, t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "en" || saved === "bn") setLangState(saved);
  }, []);
  const setLang = (l: Lang) => { setLangState(l); if (typeof window !== "undefined") localStorage.setItem("lang", l); };
  const t = (k: Key) => dict[lang][k] ?? dict.en[k] ?? k;
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
