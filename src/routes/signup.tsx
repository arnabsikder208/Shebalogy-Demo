import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { Field } from "./login";
import { useState } from "react";

import bgsignImg from "../assets/signup.jpg"; 

export const Route = createFileRoute("/signup")({ component: Signup });

function Signup() {
  const { t } = useI18n();
  const { signup } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  return (
    <PageShell>
            <div 
        className="min-h-screen w-full flex justify-center items-center px-4 sm:px-6 py-12 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bgsignImg})` 
        }}
      >
      <div className="px- sm:px-6 py-12 flex justify-center">
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 sm:p-10 w-full max-w-md transition-all duration-500 hover:-translate-y-1 shadow-xl border border-white/30">
          <h1 className="text-3xl font-bold text-white/80">{t("create_account")}</h1>
          
          <form onSubmit={(e) => { e.preventDefault(); signup(name, email, pw); nav({ to: "/" }); }} className="mt-6 space-y-4">
            <Field label={t("name")} value={name} onChange={setName} />
            <Field label={t("email")} type="email" value={email} onChange={setEmail} />
            <Field label={t("password")} type="password" value={pw} onChange={setPw} />
            <button className="w-full rounded-full bg-primary text-primary-foreground py-3 font-semibold hover:opacity-90 transition shadow-soft">{t("signup")}</button>
          </form>
          <p className="mt-6 text-sm text-center text-white/80">
            {t("have_account")} <Link to="/login" className="text-primary font-semibold hover:underline">{t("login")}</Link>
          </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
