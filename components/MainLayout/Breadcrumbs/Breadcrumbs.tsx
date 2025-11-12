"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import css from "./Breadcrumbs.module.css";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

const breadcrumbMap: Record<
  string,
  (params: Record<string, string>) => BreadcrumbItem[]
> = {
  "/": () => [{ label: "Мій день", href: "/" }],

  "/diary": () => [{ label: "Щоденник", href: "/diary" }],

  "/profile": () => [{ label: "Мій Профіль", href: "/profile" }],

  "/diary/[id]": ({ id }) => [
    { label: "Щоденник", href: "/diary" },
    { label: "Нотатка " + decodeURIComponent(id) },
  ],

  "/journey/[id]": () => [{ label: "Подорож", href: "/journey" }],
};

function getRouteKey(segments: string[]): string {
  if (segments.length === 0) return "/";
  if (segments.length === 1) return "/" + segments[0];
  return "/" + segments.slice(0, -1).concat("[id]").join("/");
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const routeKey = getRouteKey(segments);
  const params = { id: segments[segments.length - 1] };

  const items = breadcrumbMap[routeKey]?.(params) || [];

  return (
    <div className={css["breadcrumb-block"]}>
      <Link href="/">
        <p className={css["nav-link"]}>Лелека</p>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className={css["breadcrumb-item"]}>
            <Image
              src="/chevron_right.svg"
              width={24}
              height={24}
              alt="arrow right"
            />

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
