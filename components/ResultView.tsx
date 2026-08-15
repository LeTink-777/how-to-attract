"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Sparkles, Unlock } from "lucide-react";
import { TimelinePricing } from "@/components/TimelinePricing";
import { readLead } from "@/lib/lead";

const FREE_TECHNIQUES = [
  {
    title: "Эффект незавершённости",
    text: "Память удерживает прерванное лучше завершённого. Если вы уходите из разговора на самом интересном месте — не обрывая грубо, а обещая вернуться к теме, — человек мысленно возвращается к нему сам. Это не игра в недоступность: тема действительно должна быть интересной обоим.",
  },
  {
    title: "Зеркало темпа",
    text: "Люди доверяют тем, кто движется в их ритме. Подстройтесь под скорость речи и паузы собеседника в первые пять минут — не копируя жесты, а совпадая по темпу. Ощущение «мы на одной волне» возникает раньше, чем человек успевает объяснить себе почему.",
  },
  {
    title: "Конкретное наблюдение вместо комплимента",
    text: "«Ты красивая» слышали все, и это ничего не значит. «У тебя меняется голос, когда ты говоришь о работе» значит, что вы слушали. Замеченная деталь работает сильнее любой похвалы, потому что её невозможно сказать кому угодно.",
  },
];

const LOCKED_TECHNIQUES = [
  "Правило второй встречи",
  "Дефицит без игр в холод",
  "Точка уязвимости",
  "Якорь общего опыта",
  "Контраст внимания",
  "Пауза которая притягивает",
  "Вопрос о смысле",
  "Тёплый отказ",
  "Ритм сообщений",
  "Эффект свидетеля",
  "Личная история в три предложения",
  "Возврат к детали",
];

const LOCKED_BLOCKS = [
  {
    title: "Психология мужского и женского притяжения",
    text: "Чем отличаются механизмы, за счёт которых возникает интерес, и почему одна и та же техника даёт разный эффект.",
  },
  {
    title: "Скрипты первого разговора",
    text: "Три готовых сценария под типичные ситуации: знакомство в компании, переписка, случайная встреча.",
  },
  {
    title: "Ошибки которые отталкивают",
    text: "Список из девяти действий, гасящих интерес быстрее, чем всё остальное успевает сработать, и чем их заменить.",
  },
];

export function ResultView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const lead = readLead();
    if (lead) {
      setName(lead.name ?? "");
      setEmail(lead.email ?? "");
    }
    setReady(true);
  }, []);

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-3xl px-5 py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          На главную
        </Link>

        <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-xs uppercase tracking-[0.18em] text-accent2">
          <Unlock className="size-3.5" aria-hidden="true" />
          Доступ открыт
        </p>

        <h1 className="mt-6 font-display text-4xl leading-[1.1] text-ink sm:text-5xl">
          {ready && name ? `${name}, ваши три техники` : "Ваши три техники"}
        </h1>

        <p className="mt-5 leading-relaxed text-muted">
          Это первые три из пятнадцати. Они самые простые в применении — и
          именно поэтому с них стоит начать. Прочитайте, попробуйте на этой
          неделе, и станет понятно, нужен ли вам полный гайд.
        </p>

        {/* Free */}
        <ol className="mt-12 space-y-6">
          {FREE_TECHNIQUES.map((technique, index) => (
            <li key={technique.title} className="rounded-2xl border border-line bg-card p-6 sm:p-7">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-3xl text-accent">{index + 1}</span>
                <h2 className="font-display text-2xl leading-snug text-ink">{technique.title}</h2>
              </div>
              <p className="mt-4 leading-relaxed text-muted">{technique.text}</p>
            </li>
          ))}
        </ol>

        {/* Locked */}
        <section className="mt-16">
          <h2 className="flex items-center gap-3 font-display text-2xl text-ink">
            <Lock className="size-5 text-accent2" aria-hidden="true" />
            Осталось закрыто
          </h2>

          <div className="relative mt-6 overflow-hidden rounded-2xl border border-line bg-card p-6 sm:p-7">
            <ol start={4} className="space-y-3" aria-hidden="true">
              {LOCKED_TECHNIQUES.map((title, index) => (
                <li key={title} className="flex items-baseline gap-4 blur-[5px] select-none">
                  <span className="font-display text-xl text-muted">{index + 4}</span>
                  <span className="font-display text-lg text-ink">{title}</span>
                </li>
              ))}
            </ol>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
              style={{
                background: "linear-gradient(to top, var(--bg-card) 15%, transparent)",
              }}
            />
          </div>

          <p className="sr-only">
            Ещё двенадцать техник доступны после оформления доступа.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {LOCKED_BLOCKS.map((block) => (
              <div key={block.title} className="rounded-2xl border border-line bg-card p-5">
                <Lock className="size-4 text-accent2" aria-hidden="true" />
                <h3 className="mt-3 font-display text-lg leading-snug text-ink">{block.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{block.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="mt-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-xs uppercase tracking-[0.18em] text-accent">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Выберите глубину
          </p>

          <h2 className="mt-6 font-display text-3xl leading-tight text-ink sm:text-4xl">
            Три шага — выберите свой
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">
            Нажмите на шаг, чтобы раскрыть его состав. Материал придёт на почту
            в срок, указанный в выбранном тарифе.
          </p>

          <div className="mt-10">
            <TimelinePricing
              defaultEmail={email}
              customerName={name}
              context="Гайд: как влюбить в себя"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
