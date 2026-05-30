import { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { AiAssistant } from "./AiAssistant";
import doodleBg from "@/assets/doodlebg.jpg.jpeg";

export function PageShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      
      {/* Ambient floating glass orbs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 size-96 rounded-full bg-primary/20 blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 -right-40 size-[28rem] rounded-full bg-blue-400/20 blur-3xl animate-float-delayed" />
        <div className="absolute bottom-0 left-1/3 size-80 rounded-full bg-slate-400/15 blur-3xl animate-float" />
      </div>

      {/* Global Background Doodle */}
      <div
        className="fixed inset-0 pointer-events-none z-[-5] opacity-[0.13] bg-repeat mix-blend-multiply"
        style={{
          backgroundImage: `url(${doodleBg})`,
          backgroundSize: "700px",
        }}
      />

      <SiteHeader />
      <main className={`pt-24 ${className}`}>{children}</main>
      <SiteFooter />
      <AiAssistant />
    </div>
  );
}