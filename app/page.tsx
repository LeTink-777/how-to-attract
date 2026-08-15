import { Brain, Compass, Heart, MessageCircleHeart, ShieldOff, Sparkles } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { Faq } from "@/components/Faq";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE } from "@/lib/site";

const PILLARS = [
  {
    icon: Brain,
    title: "Психология, а не трюки",
    text: "Каждая техника опирается на механизм, который работает независимо от того, знает о нём человек или нет.",
  },
  {
    icon: MessageCircleHeart,
    title: "Работает в живом разговоре",
    text: "Никаких заученных реплик. Вы понимаете принцип и подстраиваете его под свою манеру речи.",
  },
  {
    icon: ShieldOff,
    title: "Без манипуляций",
    text: "Мы не учим давить, играть в холод и вызывать тревогу. Такие приёмы дают быстрый эффект и разрушают отношения.",
  },
];

const STEPS = [
  { title: "Внимание", text: "Человек замечает вас среди остальных. Это вопрос контраста, а не яркости." },
  { title: "Интерес", text: "Он хочет узнать больше. Здесь работает недосказанность и точные вопросы." },
  { title: "Притяжение", text: "Рядом с вами ему хорошо и спокойно. Это уже про безопасность и темп." },
];

export default function HomePage() {
  return (
    <>
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 h-[520px] opacity-70"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 40%, rgba(232,80,122,0.22) 0%, rgba(240,192,96,0.08) 45%, transparent 75%)",
            }}
          />

          <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-24">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-xs uppercase tracking-[0.18em] text-accent2">
                <Sparkles className="size-3.5" aria-hidden="true" />
                15 техник притяжения
              </p>

              <h1 className="mt-7 font-display text-[2.5rem] leading-[1.08] text-ink sm:text-6xl">
                Как влюбить в себя —{" "}
                <span className="text-accent">работающие техники</span> которые
                меняют всё
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
                Не манипуляции. Не игры. Реальная психология притяжения которая
                объясняет почему одни люди притягивают других как магнит.
              </p>

              <div className="mt-10 grid gap-5 sm:grid-cols-3">
                {STEPS.map((step, index) => (
                  <div key={step.title} className="relative pl-6">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1.5 size-2.5 rounded-full bg-accent"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute left-[4px] top-5 h-[calc(100%-1rem)] w-px bg-line sm:hidden"
                    />
                    <p className="font-display text-lg text-accent2">
                      {index + 1}. {step.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pl-4">
              <p className="mb-4 flex items-center gap-2 font-display text-xl text-ink">
                <Heart className="size-5 text-accent" aria-hidden="true" />
                Первые 3 техники — бесплатно
              </p>
              <LeadForm />
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="border-t border-line bg-card/40">
          <div className="mx-auto w-full max-w-6xl px-5 py-20">
            <h2 className="max-w-2xl font-display text-3xl leading-tight text-ink sm:text-4xl">
              Почему это работает даже если вы не считаете себя харизматичным
            </h2>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {PILLARS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl border border-line bg-card p-6">
                  <Icon className="size-6 text-accent" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-xl text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What is inside */}
        <section className="mx-auto w-full max-w-6xl px-5 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                Что внутри гайда
              </h2>
              <p className="mt-5 leading-relaxed text-muted">
                Пятнадцать техник разложены по стадиям сближения: от первого
                взгляда до момента, когда человек начинает скучать по вам сам.
                К каждой технике идёт пример разговора и разбор — что именно в
                нём срабатывает.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Отдельный блок посвящён ошибкам. Обычно люди не «не умеют
                нравиться» — они делают три-четыре вещи, которые гасят интерес
                быстрее, чем всё остальное успевает сработать.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                "15 техник притяжения с живыми примерами",
                "Психология мужского и женского притяжения — в чём разница",
                "Скрипты первого разговора для трёх типичных ситуаций",
                "Ошибки которые отталкивают: список и как их заменить",
                "Аудиовведение — как собрать техники в свою манеру",
              ].map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-line bg-card px-5 py-4">
                  <Compass className="mt-0.5 size-5 shrink-0 text-accent2" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Closing */}
        <section className="border-t border-line">
          <div className="mx-auto w-full max-w-3xl px-5 py-20 text-center">
            <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
              Начните с трёх техник — они бесплатны
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">
              Оставьте имя и почту, и вы сразу увидите первые три техники с
              разбором. Решение о полном гайде — уже после того, как проверите
              их в деле.
            </p>
            <div className="mx-auto mt-10 max-w-md text-left">
              <LeadForm />
            </div>
            <p className="mt-8 text-xs text-muted">
              {SITE.owner.fullName}. ИНН {SITE.owner.inn}. {SITE.owner.status}.
            </p>
          </div>
        </section>
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
