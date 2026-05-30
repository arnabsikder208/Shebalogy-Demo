import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";

import logo from "@/assets/logo.png";

import {
  Globe,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";

export function SiteHeader() {
  const { lang, setLang, t } = useI18n();
  const { user, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const nav = [
    { to: "/", label: t("nav_home") },
    { to: "/cancer", label: t("nav_cancer") },
    { to: "/blood", label: t("nav_blood") },
    { to: "/mental", label: t("nav_mental") },
    { to: "/medicine", label: t("nav_medicine") },
    { to: "/doctors", label: t("nav_doctors") },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4">

      <div className="glass mx-auto max-w-7xl rounded-2xl px-3 sm:px-5 py-2.5 flex items-center justify-between gap-2 sm:gap-4">

        {/* LEFT */}
        <div className="flex items-center gap-2">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg lg:hidden hover:bg-white/40 transition text-black"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
          >
            <img
              src={logo}
              alt="Shebalogy"
              width={36}
              height={36}
              className="size-9 object-contain"
            />

            <span className="font-display font-bold text-base sm:text-lg text-foreground hidden sm:inline">
              Shebalogy
            </span>
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-1">

          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{
                exact: n.to === "/",
              }}
              className="px-3 py-1.5 rounded-lg text-sm font-bold text-black hover:bg-white/40 transition-colors data-[status=active]:text-black data-[status=active]:bg-white/50 font-bangla"
            >
              {n.label}
            </Link>
          ))}

        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2">

          {/* Language Switch */}
          <div className="glass rounded-full p-0.5 flex items-center text-xs font-medium">

            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-full transition-all ${
                lang === "en"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70"
              }`}
            >
              EN
            </button>

            <button
              onClick={() => setLang("bn")}
              className={`px-2.5 py-1 rounded-full transition-all font-bangla ${
                lang === "bn"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70"
              }`}
            >
              বাং
            </button>

            <Globe className="size-3.5 mx-1.5 text-muted-foreground" />

          </div>

          {/* USER */}
          {user ? (
            <div className="flex items-center gap-2">

              <span className="hidden sm:flex items-center gap-1.5 text-sm text-foreground/80 font-bangla">
                <User className="size-4" />
                {user.name}
              </span>

              <button
                onClick={logout}
                className="glass rounded-full p-2 hover:bg-white/50 transition"
                aria-label="Logout"
              >
                <LogOut className="size-4" />
              </button>

            </div>
          ) : (
            <div className="flex items-center gap-1.5">

              <Link
                to="/login"
                className="px-3 py-1.5 rounded-full text-sm font-bold text-black hover:bg-white/40 transition font-bangla"
              >
                {t("login")}
              </Link>

              <Link
                to="/signup"
                className="px-3.5 py-1.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition shadow-soft font-bangla"
              >
                {t("signup")}
              </Link>

            </div>
          )}

        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="lg:hidden mt-2 mx-auto max-w-7xl glass rounded-2xl p-4 animate-fade-up">

          <nav className="flex flex-col gap-2">

            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setIsOpen(false)}
                activeOptions={{
                  exact: n.to === "/",
                }}
                className="px-4 py-3 rounded-xl text-base font-bold text-black hover:bg-white/40 transition-colors data-[status=active]:text-black data-[status=active]:bg-white/50 font-bangla"
              >
                {n.label}
              </Link>
            ))}

          </nav>

        </div>
      )}
    </header>
  );
}