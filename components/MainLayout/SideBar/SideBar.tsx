"use client";

import css from "./SideBar.module.css";
import Link from "next/link";
import Image from "next/image";
import { logoutRequest } from "@/lib/api/auth";
import { useModalStore } from "@/lib/store/modalStore";
import { useSidebarStore } from "@/lib/store/sidebarStore";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";

export default function SideBar() {
  const { isOpen, closeSidebar } = useSidebarStore();
  const { openModal } = useModalStore();
  const { user, clearIsAuthenticated } = useAuthStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1440);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogoutClick = () => {
    openModal({
      title: "Ви точно хочете вийти?",
      confirmBtnText: "Так",
      canceleBtnText: "Ні",
      onConfirm: async () => {
        console.log("Вихід підтверджено");
        await logoutRequest();
        clearIsAuthenticated();
        closeSidebar();
      },
    });
  };

  const isAuth = Boolean(user);

  const sidebarClass = `${css.sidebar} ${isOpen ? css.open : ""}`;

  const handleLinkClick = () => {
    if (isMobile) closeSidebar();
  };

  return (
    <>
      <aside className={sidebarClass} onClick={closeSidebar}>
        <div className={css.inner} onClick={(e) => e.stopPropagation()}>
          <div className={css.header}>
            <Link href="/" className={css.logo} onClick={handleLinkClick}>
              <Image src="/logo.svg" alt="Logo" width={30} height={30} />
              <Image
                src="/logotext.svg"
                alt="Logotext"
                width={61}
                height={13}
              />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              className={css.burgerBtn}
              onClick={closeSidebar}
            >
              <Image
                className={css.logoimg}
                src="/close.svg"
                alt="Burger"
                width={32}
                height={32}
              />
            </button>
          </div>
          <div className={css.wrapper}>
            <nav className={css.nav}>
              <ul className={css.navList}>
                <li className={css.navItem}>
                  <Image src="/myday.svg" alt="Close" width={24} height={24} />
                  <Link
                    className={css.navLink}
                    href={"/"}
                    onClick={handleLinkClick}
                  >
                    Мій день
                  </Link>
                </li>
                <li className={css.navItem}>
                  <Image src="/travel.svg" alt="Close" width={24} height={24} />
                  <Link
                    className={css.navLink}
                    href={"/journey/1"}
                    onClick={handleLinkClick}
                  >
                    Подорож
                  </Link>
                </li>
                <li className={css.navItem}>
                  <Image src="/diary.svg" alt="Close" width={24} height={24} />
                  <Link
                    className={css.navLink}
                    href={"/diary"}
                    onClick={handleLinkClick}
                  >
                    Щоденник
                  </Link>
                </li>
                <li className={css.navItem}>
                  <Image
                    src="/profile.svg"
                    alt="Close"
                    width={24}
                    height={24}
                  />
                  <Link
                    className={css.navLink}
                    href={"/profile"}
                    onClick={handleLinkClick}
                  >
                    Профіль
                  </Link>
                </li>
              </ul>
            </nav>
            <p className={css.line}></p>
          </div>
          <div className={css.footer}>
            {isAuth && user ? (
              <div className={css.wrapperuser}>
                <Image
                  src={user.avatarUrl}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className={css.avatar}
                />
                <div className={css.wrapperusertext}>
                  <p className={css.username}>{user.name}</p>
                  <p className={css.useremail}>{user.email}</p>
                </div>

                <button className={css.logoutBtn} onClick={handleLogoutClick}>
                  <Image src="/logout.svg" alt="Close" width={24} height={24} />
                </button>
              </div>
            ) : (
              <div className={css.authLinks}>
                <Link
                  className={css.linkSingin}
                  href="/auth/login"
                  onClick={handleLinkClick}
                >
                  Увійти
                </Link>
                <Link
                  className={css.linkSingup}
                  href="/auth/register"
                  onClick={handleLinkClick}
                >
                  Зареєструватися
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
