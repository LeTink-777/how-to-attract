"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Clock, Flame, Loader2, ShieldCheck } from "lucide-react";
import { useCountdown } from "@/components/Countdown";
import { useSpots } from "@/components/Spots";
import { startCheckout } from "@/lib/checkout";
import { discountPercent, formatPrice } from "@/lib/format";
import { PLAN_LIST, type PlanId } from "@/lib/plans";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function TimelinePricing({
  defaultEmail = "",
  customerName = "",
  context = "",
}: {
  defaultEmail?: string;
  customerName?: string;
  context?: string;
}) {
  const uid = useId();
  const [selected, setSelected] = useState<PlanId>("full");
  const [email, setEmail] = useState(defaultEmail);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const countdown = useCountdown(24);
  const spots = useSpots(2, 4);

  useEffect(() => {
    if (defaultEmail) setEmail(defaultEmail);
  }, [defaultEmail]);

  const plan = PLAN_LIST.find((item) => item.id === selected) ?? PLAN_LIST[1];

  async function handlePay() {
    if (!EMAIL_RE.test(email.trim())) {
      setError("Укажите почту, на которую отправить материал");
      return;
    }
    setError(null);
    setPending(true);
    try {
      await startCheckout({
        plan: plan.id,
        email: email.trim().toLowerCase(),
        name: customerName,
        context,
      });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Не удалось создать платёж.");
      setPending(false);
    }
  }

  return (
    <div>
      <ol className="relative">
        <span
          aria-hidden="true"
          className="absolute bottom-8 left-[19px] top-8 w-px bg-line"
        />

        {PLAN_LIST.map((item, index) => {
          const active = item.id === selected;
          const gold = item.popular;

          return (
            <li key={item.id} className="relative pb-5 pl-14 last:pb-0">
              {/* Timeline node */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-5 flex size-10 items-center justify-center rounded-full border-2 bg-bg font-display text-lg transition-colors duration-300"
                style={{
                  borderColor: active
                    ? gold
                      ? "var(--accent-gold)"
                      : "var(--accent-rose)"
                    : "var(--line)",
                  background: active
                    ? gold
                      ? "var(--accent-gold)"
                      : "var(--accent-rose)"
                    : "var(--bg-primary)",
                  color: active ? "var(--bg-primary)" : "var(--text-secondary)",
                }}
              >
                {index + 1}
              </span>

              <button
                type="button"
                onClick={() => setSelected(item.id)}
                aria-pressed={active}
                className="w-full rounded-2xl border bg-card p-6 text-left transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  borderColor: active
                    ? gold
                      ? "var(--accent-gold)"
                      : "var(--accent-rose)"
                    : "var(--line)",
                  boxShadow: active
                    ? gold
                      ? "0 22px 50px -30px rgba(240,192,96,0.75)"
                      : "0 22px 50px -30px rgba(232,80,122,0.75)"
                    : "none",
                }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                  <h3
                    className="font-display text-2xl"
                    style={{ color: gold ? "var(--accent-gold)" : "var(--text-primary)" }}
                  >
                    {item.name}
                  </h3>

                  <p className="flex items-baseline gap-3">
                    <span className="tnum font-display text-3xl text-ink">
                      {formatPrice(item.price)} ₽
                    </span>
                    <span className="tnum text-sm text-muted line-through">
                      {formatPrice(item.oldPrice)} ₽
                    </span>
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs text-accent">
                      -{discountPercent(item.price, item.oldPrice)}%
                    </span>
                  </p>
                </div>

                <AnimatePresence initial={false}>
                  {active ? (
                    <motion.div
                      key="details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-5 space-y-2.5">
                        {item.features.map((feature) => (
                          <li key={feature} className="flex gap-3 text-sm leading-relaxed text-muted">
                            <Check
                              className="mt-0.5 size-4 shrink-0"
                              style={{ color: gold ? "var(--accent-gold)" : "var(--accent-rose)" }}
                              aria-hidden="true"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {item.timer ? (
                        <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent2/40 px-3 py-1.5 text-xs text-accent2">
                          <Clock className="size-3.5" aria-hidden="true" />
                          <span>Цена действует ещё</span>
                          <span className="tnum font-semibold" suppressHydrationWarning>
                            {countdown.text}
                          </span>
                        </p>
                      ) : null}

                      {item.spots ? (
                        <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/40 px-3 py-1.5 text-xs text-accent">
                          <Flame className="size-3.5" aria-hidden="true" />
                          <span suppressHydrationWarning>
                            Свободно мест на этой неделе: {spots ?? 4}
                          </span>
                        </p>
                      ) : null}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Checkout */}
      <div className="mt-8 rounded-2xl border border-line bg-card p-6">
        <label htmlFor={`${uid}-email`} className="mb-2 block text-sm text-muted">
          Куда отправить материал
        </label>
        <input
          id={`${uid}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none"
        />

        {error ? (
          <p role="alert" className="mt-3 flex items-start gap-2 text-sm text-accent">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {error}
          </p>
        ) : null}

        <button
          type="button"
          onClick={handlePay}
          disabled={pending}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold text-bg transition-transform hover:-translate-y-0.5 disabled:opacity-70"
          style={{
            background: plan.popular
              ? "linear-gradient(120deg, var(--accent-gold), var(--accent-rose))"
              : "var(--accent-rose)",
          }}
        >
          {pending ? <Loader2 className="size-5 animate-spin" aria-hidden="true" /> : null}
          Оформить «{plan.name}» за {formatPrice(plan.price)} ₽
        </button>

        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted">
          <ShieldCheck className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          Оплата через ЮKassa. На странице оплаты доступны все подключённые
          способы — карта, СБП, кошельки.
        </p>
      </div>
    </div>
  );
}
