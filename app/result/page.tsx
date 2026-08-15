import type { Metadata } from "next";
import { ResultView } from "@/components/ResultView";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Три техники притяжения — ваш результат",
  description:
    "Три рабочие техники притяжения с разбором психологии. Остальные 12 техник, скрипты первого разговора и разбор ошибок — в полном гайде.",
  alternates: { canonical: "/result" },
};

export default function ResultPage() {
  return (
    <>
      <ResultView />
      <SiteFooter />
    </>
  );
}
