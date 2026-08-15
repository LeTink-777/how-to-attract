export type PlanId = "basic" | "full" | "premium";

export interface Plan {
  id: PlanId;
  /** Shown on the pricing card. */
  name: string;
  price: number;
  oldPrice: number;
  /** Goes into the YooKassa payment description. */
  yooDescription: string;
  /** Delivery window promised for this plan. */
  delivery: string;
  features: string[];
  /** Renders the offer countdown on this plan. */
  timer?: boolean;
  /** Renders the remaining-slots counter on this plan. */
  spots?: boolean;
  /** Highlighted as the recommended plan. */
  popular?: boolean;
  /** Position of the plan on the depth slider, in percent. */
  depth?: number;
  /** Number of months the calendar plan covers. */
  months?: number;
}

export const PLANS: Record<PlanId, Plan> = {
  basic: {
    id: "basic",
    name: "Старт",
    price: 390,
    oldPrice: 1490,
    yooDescription: "Гайд техники притяжения старт",
    delivery: "24 часа",
    features: [
      "5 техник притяжения в PDF",
      "Чек-лист ошибок",
      "Доставка на email за 24 часа",
    ],
  },
  full: {
    id: "full",
    name: "Полный гайд",
    price: 790,
    oldPrice: 3490,
    yooDescription: "Полный гайд как влюбить в себя",
    delivery: "12 часов",
    features: [
      "Все 15 техник с живыми примерами",
      "Психология мужского и женского притяжения",
      "Скрипты первого разговора",
      "PDF 25 страниц и аудиовведение",
      "Доставка на email за 12 часов",
    ],
    timer: true,
    popular: true,
  },
  premium: {
    id: "premium",
    name: "Максимум",
    price: 1590,
    oldPrice: 5900,
    yooDescription: "Гайд притяжения максимум",
    delivery: "6 часов",
    features: [
      "Всё из полного гайда",
      "Персональный разбор вашей ситуации, аудио 10 минут",
      "Ответ на один ваш вопрос",
      "Доставка на email за 6 часов",
    ],
    spots: true,
  },
};

export const PLAN_IDS: PlanId[] = ["basic", "full", "premium"];

export const PLAN_LIST: Plan[] = PLAN_IDS.map((id) => PLANS[id]);

export function isPlanId(value: string): value is PlanId {
  return (PLAN_IDS as string[]).includes(value);
}
