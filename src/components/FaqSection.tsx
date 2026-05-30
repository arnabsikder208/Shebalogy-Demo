import { useState } from 'react';
import { useI18n } from "@/lib/i18n";

export default function FaqSection() {
  const { t, lang } = useI18n();
  
  const currentLang = (lang || "").toString().toLowerCase();
  const isBn = currentLang === 'bn';

  const [activeCategory, setActiveCategory] = useState<'general' | 'support' | 'miscellaneous'>('general');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const getTranslation = (key: string, fallback: string) => {
    const value = t ? (t as any)(key) : null;
    if (!value || value === key) {
      return fallback;
    }
    return value;
  };

  const categories = [
    { id: 'general', name: getTranslation("faq_cat_general", isBn ? "সাধারণ জিজ্ঞাসা" : "General Questions") },
    { id: 'support', name: getTranslation("faq_cat_support", isBn ? "সাপোর্ট টিম" : "Support Team") },
    { id: 'miscellaneous', name: getTranslation("faq_cat_miscellaneous", isBn ? "অন্যান্য তথ্য" : "Miscellaneous") },
  ] as const;

  const faqs = {
    general: [
      {
        q: isBn ? "এই প্ল্যাটফর্মটি কী?" : "What is this platform?",
        a: isBn 
          ? "এটি একটি এআই-চালিত একক স্বাস্থ্যসেবা ইকোসিস্টেম যা স্বাস্থ্য নির্দেশিকা, মানসিক সুস্থতা সহায়তা, ক্যান্সার সচেতনতা, রক্ত ​​দান সহায়তা এবং ওষুধ অনুস্মারক এক জায়গায় প্রদান করে।" 
          : "This is an AI-powered unified healthcare ecosystem that provides health guidance, mental wellness support, cancer awareness, blood donation assistance, and medicine reminders in one place."
      },
      {
        q: isBn ? "এআই (AI) পরামর্শ কতটা নির্ভুল বা নির্ভরযোগ্য?" : "How accurate or reliable are the AI suggestions?",
        a: isBn 
          ? "আমাদের এআই সর্বাধুনিক মেডিকেল ডাটাবেজ ব্যবহার করে তৈরি। এটি আপনাকে প্রাথমিক ধারণা দিতে পারে, তবে এটি কখনোই সরাসরি পেশাদার ডাক্তারের বিকল্প নয়।" 
          : "Our AI is built using the latest medical databases to provide insights. However, it is an informational tool and should never replace a professional doctor's consultation."
      }
    ],
    support: [
      {
        q: isBn ? "জরুরি প্রয়োজনে আমি কীভাবে আপনাদের সাথে যোগাযোগ করতে পারি?" : "How can I contact support in case of emergencies?",
        a: isBn 
          ? "যেকোনো জিজ্ঞাসায় আমাদের ২৪/৭ সাপোর্ট প্যানেলে নক করতে পারেন। আমাদের টিম সাধারণত ২ ঘণ্টার মধ্যে আপনার সমস্যার সমাধান করতে সচেষ্ট থাকে।" 
          : "Our direct responses route around the clock, guaranteeing tier-1 engineering evaluation answers inside under two business hours."
      }
    ],
    miscellaneous: [
      {
        q: isBn ? "আমার মেডিকেল ডেটা বা তথ্য কি এখানে নিরাপদ থাকবে?" : "Will my medical data and information remain secure?",
        a: isBn 
          ? "হ্যাঁ, আপনার গোপনীয়তা আমাদের সর্বোচ্চ অগ্রাধিকার। সকল ডেটা সম্পূর্ণ এন্ড-টু-এন্ড এনক্রিপ্টেড এবং আন্তর্জাতিক সাইবার নিরাপত্তা প্রোটোকল মেনে সংরক্ষিত হয়।" 
          : "Yes, your privacy is our top priority. All user data goes through strict end-to-end encryption protocols in compliance with global data sovereignty laws."
      },
      {
        q: isBn ? "এই এআই হেলথবট কি ডাক্তারদের বিকল্প?" : "Is the AI HealthBot a replacement for doctors?",
        a: isBn 
          ? "না, এটি শুধুমাত্র একটি সহায়ক টুল যা স্বাস্থ্য সম্পর্কিত সাধারণ প্রশ্নের উত্তর দিতে এবং নির্দেশিকা প্রদান করতে পারে। এটি কখনোই পেশাদার চিকিৎসকের পরামর্শের বিকল্প নয়।" 
          : "No. It only provides health guidance and awareness. It does not replace professional medical advice."
      }
    ]
  };

  const toggleFaq = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleCategoryChange = (catId: 'general' | 'support' | 'miscellaneous') => {
    setActiveCategory(catId);
    setExpandedIndex(0); 
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 animate-fade-up text-left relative z-10">
      
      {/* Header Block */}
      <div 
        className="glass-strong rounded-3xl p-8 sm:p-12 text-center mb-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--color-navy-deep) 0%, var(--color-navy) 100%)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none" />
        
        <div className="relative z-10">
          <span className={`inline-block bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-white/90 mb-4 border border-white/10 ${isBn ? 'font-bangla' : 'font-sans'}`}>
            {getTranslation("faq_badge", isBn ? "সহায়তা কেন্দ্র" : "Support Center")}
          </span>
          <h2 className={`font-bold text-white mb-4 drop-shadow-sm ${isBn ? 'text-3xl sm:text-4xl font-bangla' : 'font-display text-3xl sm:text-4xl md:text-5xl'}`}>
            {getTranslation("faq_title", isBn ? "সাধারণ জিজ্ঞাসা (FAQ)" : "Frequently Asked Questions")}
          </h2>
          <p className={`text-white/70 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed ${isBn ? 'font-bangla' : 'font-sans'}`}>
            {getTranslation("faq_sub", isBn 
              ? "আমাদের প্ল্যাটফর্মটি আপনার কাজকে আরও সহজ ও নিখুঁত করতে তৈরি করা হয়েছে। আপনার মনের সাধারণ প্রশ্নগুলোর উত্তর এখানে খুঁজে নিন।" 
              : "Our platform is built to help you work smarter, not harder. It adapts to your needs and supports your goals.")
            }
          </p>
        </div>
      </div>

      {/* Grid Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Nav Tabs */}
        <div className="md:col-span-4 space-y-3">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 font-semibold text-foreground ${
                  isBn ? 'font-bangla text-lg' : 'font-display text-sm'
                } ${
                  isActive
                    ? 'glass-strong border-[var(--medical-teal)] opacity-100 shadow-glow scale-[1.01]'
                    : 'glass opacity-80 hover:opacity-100'
                }`}
              >
                <span>{cat.name}</span>
                <svg className="w-4 h-4 opacity-60 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            );
          })}
        </div>

        {/* Right Accordion List */}
        <div className="md:col-span-8 space-y-4">
          {faqs[activeCategory].map((faq, index) => {
            const isOpen = expandedIndex === index;
            return (
              <div key={index} className="faq-item glass rounded-2xl overflow-hidden transition-all duration-300">
                <button
                  className={`w-full flex items-center justify-between p-5 text-left font-semibold transition-colors duration-200 hover:bg-white/5 text-foreground ${
                    isBn ? 'font-bangla text-lg' : 'font-display text-sm'
                  }`}
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.q}</span>
                  <span 
                    className="flex-shrink-0 size-[22px] rounded-full border flex items-center justify-center transition-all duration-300"
                    style={{
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      borderColor: isOpen ? 'var(--medical-teal)' : 'oklch(1 0 0 / 0.3)',
                      backgroundColor: isOpen ? 'oklch(0.52 0.12 195 / 0.15)' : 'transparent',
                      color: isOpen ? 'var(--medical-teal)' : 'var(--color-foreground)'
                    }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>

                {/* Dropdown Answer */}
                <div
                  className="transition-all duration-300 ease-in-out bg-white/5 dark:bg-black/5 overflow-hidden"
                  style={{ 
                    maxHeight: isOpen ? '500px' : '0px',
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  <div className={`p-5 leading-relaxed border-t border-white/10 text-muted-foreground ${isBn ? 'text-base font-bangla' : 'text-sm font-sans'}`}>
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}