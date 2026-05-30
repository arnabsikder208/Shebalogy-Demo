import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type User = { name: string; email: string };
const Ctx = createContext<{
  user: User | null;
  login: (email: string, _password: string) => void;
  signup: (name: string, email: string, _password: string) => void;
  logout: () => void;
}>({ user: null, login: () => {}, signup: () => {}, logout: () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (raw) setUser(JSON.parse(raw));
  }, []);
  const save = (u: User | null) => {
    setUser(u);
    if (typeof window !== "undefined") {
      if (u) localStorage.setItem("user", JSON.stringify(u));
      else localStorage.removeItem("user");
    }
  };
  return (
    <Ctx.Provider value={{
      user,
      login: (email) => save({ email, name: email.split("@")[0] }),
      signup: (name, email) => save({ name, email }),
      logout: () => save(null),
    }}>{children}</Ctx.Provider>
  );
}
export const useAuth = () => useContext(Ctx);
