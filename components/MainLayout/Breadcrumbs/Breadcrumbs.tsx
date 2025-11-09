"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import css from "./Breadcrumbs.module.css";

// Тип для одного елемента хлібних крихт
type BreadcrumbItem = {
  label: string;
  href?: string; // якщо немає href — це активний елемент
};

// Словник шаблонів маршрутів
const breadcrumbMap: Record<
  string,
  (params: Record<string, string>) => BreadcrumbItem[]
> = {
  "/": () => [{ label: "Мій день", href: "/" }],

  "/diary": () => [{ label: "Щоденник", href: "/diary" }],

  "/profile": () => [{ label: "Мій Профіль", href: "/profile" }],

  "/diary/[id]": ({ id }) => [
    { label: "Щоденник", href: "/diary" },
    { label: "Нотатка " + decodeURIComponent(id) }, // можна замінити на назву з API
  ],

  "/journey/[id]": () => [{ label: "Подорож", href: "/journey" }],
};

// Функція для визначення ключа шаблону маршруту
function getRouteKey(segments: string[]): string {
  if (segments.length === 0) return "/";
  if (segments.length === 1) return "/" + segments[0];
  return "/" + segments.slice(0, -1).concat("[id]").join("/");
}

export default function Breadcrumbs() {
  const pathname = usePathname(); // поточний шлях, напр. /diary/jeans-123
  const segments = pathname.split("/").filter(Boolean); // ["diary", "jeans-123"]

  const routeKey = getRouteKey(segments); // напр. /diary/[id]
  const params = { id: segments[segments.length - 1] }; // останній сегмент — як id

  // Отримуємо масив хлібних крихт з мапи
  const items = breadcrumbMap[routeKey]?.(params) || [];

  return (
    <div className={css["breadcrumb-block"]}>
      {/* Початковий елемент — завжди "Лелека" */}
      <Link href="/">
        <p className={css["nav-link"]}>Лелека</p>
      </Link>

      {/* Рендеримо інші елементи з масиву */}
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className={css["breadcrumb-item"]}>
            {/* Стрілочка між елементами */}
            <Image
              src="/chevron_right.svg"
              width={24}
              height={24}
              alt="arrow right"
            />

            {/* Якщо останній — просто текст, інакше — посилання */}
            {isLast || !item.href ? (
              <p className={`${css.active}`}>{item.label}</p>
            ) : (
              <Link href={item.href}>
                <p className={css["nav-link"]}>{item.label}</p>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
