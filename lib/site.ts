const FALLBACK_URL = "https://how-to-attract.vercel.app";

/**
 * Canonical origin for metadata, sitemap.xml and robots.txt.
 * NEXT_PUBLIC_SITE_URL wins when set (local development, custom domain),
 * otherwise Vercel's own production URL is used so the deployed site is
 * correct even if the assigned subdomain differs from the placeholder.
 */
function resolveUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return FALLBACK_URL;
}

export const SITE = {
  domain: "how-to-attract.vercel.app",
  url: resolveUrl(),
  productName: "Гайд «Как влюбить в себя»",
  productKind: "цифровой информационный продукт (PDF-гайд и аудиоматериалы)",
  title: "Как влюбить в себя — 15 техник которые работают",
  description: "Реальные психологические техники как влюбить в себя человека. Не манипуляции — рабочая психология притяжения. Первые 3 техники бесплатно.",
  keywords: [
      "как влюбить в себя",
      "как понравиться человеку",
      "техники притяжения",
      "психология влюблённости",
      "как привлечь мужчину",
      "как привлечь женщину",
      "нравиться людям психология"
  ] as string[],
  legalUpdated: "15 августа 2026",
  legalUpdatedISO: "2026-08-15",
  owner: {
    fullName: "Евдокимов Даниил Владимирович",
    inn: "381928138362",
    status: "Самозанятый (плательщик НПД)",
    email: "danyavdkmvv3@gmail.com",
    telegram: "@dvdkmv",
    telegramUrl: "https://t.me/dvdkmv",
  },
} as const;
