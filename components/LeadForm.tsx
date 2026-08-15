"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Lock } from "lucide-react";
import { saveLead } from "@/lib/lead";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function LeadForm() {
  const router = useRouter();
  // The form appears twice on the landing page, so the ids have to stay unique.
  const uid = useId();
  const nameId = `${uid}-name`;
  const emailId = `${uid}-email`;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (name.trim().length < 2) {
      setError("Напишите как к вам обращаться");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("Проверьте адрес электронной почты");
      return;
    }

    setError(null);
    setPending(true);
    saveLead({ name: name.trim(), email: email.trim().toLowerCase() });
    router.push("/result");
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-line bg-card p-6 shadow-[0_24px_60px_-30px_rgba(232,80,122,0.5)] sm:p-8"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor={nameId} className="mb-2 block text-sm text-muted">
            Имя
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            autoComplete="given-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Как к вам обращаться"
            className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor={emailId} className="mb-2 block text-sm text-muted">
            Email
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {error ? (
        <p role="alert" className="mt-4 text-sm text-accent">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 font-semibold text-bg transition-transform hover:-translate-y-0.5 disabled:opacity-70"
      >
        {pending ? (
          <Loader2 className="size-5 animate-spin" aria-hidden="true" />
        ) : (
          <ArrowRight className="size-5" aria-hidden="true" />
        )}
        Получить первую технику бесплатно
      </button>

      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted">
        <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        Почта нужна только для доставки материала. Отправляя форму, вы соглашаетесь
        с политикой конфиденциальности.
      </p>
    </form>
  );
}
