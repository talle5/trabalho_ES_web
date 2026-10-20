import { useState, type FormEvent } from "react";
import { AuthLayout } from "~/layouts/AuthLayout";
import { TextField } from "~/components/TextField";

export function meta() {
  return [{ title: "Saúde Digital | Login" }];
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const next: typeof errors = {};

    if (!email.trim()) next.email = "Informe seu e-mail.";
    else if (!EMAIL_REGEX.test(email.trim())) next.email = "Digite um e-mail válido.";

    if (!password) next.password = "Informe sua senha.";
    else if (password.length < 6) next.password = "A senha deve ter pelo menos 6 caracteres.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      alert("Login simulado com sucesso! Conecte aqui o seu backend.");
    } catch {
      setErrors({ password: "Não foi possível entrar. Tente novamente." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <section className="w-full max-w-105 rounded-[10px] border border-[#dfe3ec] bg-white p-6 shadow-sm sm:p-8">
        <h1 className="mb-3 text-center text-[22px] font-semibold">Acessar o Sistema</h1>
        <p className="mb-7 text-center text-xs leading-normal text-gray-500">
          Entre com seu email e a senha fornecida para gerenciar as filas da sua unidade
          básica de saúde.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            id="email"
            type="email"
            label="E-mail"
            placeholder="seu@email.com"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            error={errors.email}
            icon={
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
              </svg>
            }
          />

          <TextField
            id="password"
            type={showPassword ? "text" : "password"}
            label="Senha"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            error={errors.password}
            labelAside={
              <a href="#" className="text-[11px] font-medium text-[#005a9c] hover:underline">
                Esqueci minha senha
              </a>
            }
            icon={
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
            }
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="grid place-items-center text-gray-500 hover:text-[#005a9c]"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
                  <circle cx="12" cy="12" r="3" />
                  {showPassword && <path d="M3 3l18 18" />}
                </svg>
              </button>
            }
          />

          <label className="mb-5 flex cursor-pointer items-center gap-2 text-xs text-gray-500">
            <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="size-3.5 rounded border-[#dfe3ec] bg-white accent-[#005a9c] [color-scheme:light]"
            />
            Lembrar-me
          </label>

          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full cursor-pointer rounded-lg bg-[#005a9c] text-sm font-semibold text-white transition hover:bg-[#004a82] disabled:cursor-wait disabled:opacity-70"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </section>
    </AuthLayout>
  );
}