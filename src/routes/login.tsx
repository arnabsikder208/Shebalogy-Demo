import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { useState } from "react";

import bgLoginImg from "../assets/bg-login.jpeg"; 

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { t } = useI18n();
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  
  return (
    <PageShell>
      {/* UPDATED: Combined a dark linear-gradient with the background image.
        'rgba(0, 0, 0, 0.6)' creates a 60% dark overlay. 
        Increase 0.6 (e.g., to 0.75) to make it darker, or decrease it to make it lighter.
      */}
      <div 
        className="min-h-screen w-full flex justify-center items-center px-4 sm:px-6 py-12 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bgLoginImg})` 
        }}
      >
        <div className="glass rounded-3xl p-8 sm:p-10 w-full max-w-md animate-fade-up shadow-soft">
          <h1 className="text-3xl font-bold text-white/80">{t("welcome_back")}</h1>
          
          <form onSubmit={(e) => { e.preventDefault(); login(email, pw); nav({ to: "/" }); }} className="mt-6 space-y-4">
            <Field label={t("email")} type="email" value={email} onChange={setEmail} />
            <Field label={t("password")} type="password" value={pw} onChange={setPw} />
            <button className="w-full rounded-full bg-primary text-primary-foreground py-3 font-semibold hover:opacity-90 transition shadow-soft">{t("login")}</button>
          </form>
          <p className="mt-6 text-sm text-center text-white/80">
            {t("no_account")} <Link to="/signup" className="text-white/80 font-semibold hover:underline">{t("signup")}</Link>
          </p>
        </div>
      </div>
    </PageShell>
  );
}

export function Field({ label, type = "text", value, onChange }: { label: string; type?: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">{label}</span>
      <input type={type} required value={value} onChange={(e) => onChange(e.target.value)} className="mt-1.5 w-full rounded-xl bg-white/50 border border-border px-4 py-2.5 outline-none focus:border-primary focus:bg-white transition" />
    </label>
  );
}
