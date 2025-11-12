"use client";

import css from "./SideBar.module.css";
import Link from "next/link";
import Image from "next/image";
import { logoutRequest } from "@/lib/api/auth";
import { useSidebarStore } from "@/lib/store/sidebarStore";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getBabyData } from "@/lib/api/babyService";

export default function SideBar() {
  const router = useRouter();
  const { isOpen, closeSidebar } = useSidebarStore();
  const { user, clearIsAuthenticated, isAuthenticated } = useAuthStore();
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1440);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = async () => {
    try {
      await logoutRequest();

      closeSidebar();
      clearIsAuthenticated();
      getBabyData(isAuthenticated);

      toast.success("Ви успішно вийшли з акаунту!");

      router.push("/");
    } catch (error) {
      console.error("Помилка виходу:", error);
      toast.error("Сталася помилка при виході. Спробуйте ще раз!");
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false);
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
                  <Link
                    className={css.navLink}
                    href={"/"}
                    onClick={handleLinkClick}
                  >
                    <Image
                      src="/myday.svg"
                      alt="Close"
                      width={24}
                      height={24}
                    />
                    <span className={css.navText}>Мій день</span>
                  </Link>
                </li>
                <li className={css.navItem}>
                  <Link
                    className={css.navLink}
                    href={"/journey/1"}
                    onClick={handleLinkClick}
                  >
                    <Image
                      src="/travel.svg"
                      alt="Close"
                      width={24}
                      height={24}
                    />
                    <span className={css.navText}>Подорож</span>
                  </Link>
                </li>
                <li className={css.navItem}>
                  <Link
                    className={css.navLink}
                    href={"/diary"}
                    onClick={handleLinkClick}
                  >
                    <Image
                      src="/diary.svg"
                      alt="Close"
                      width={24}
                      height={24}
                    />
                    <span className={css.navText}>Щоденник</span>
                  </Link>
                </li>
                <li className={css.navItem}>
                  <Link
                    className={css.navLink}
                    href={"/profile"}
                    onClick={handleLinkClick}
                  >
                    <Image
                      src="/profile.svg"
                      alt="Close"
                      width={24}
                      height={24}
                    />
                    <span className={css.navText}>Профіль</span>
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

      <ConfirmationModal
        isOpen={isModalOpen}
        title="Ви точно хочете вийти?"
        confirmBtnText="Так"
        cancelBtnText="Ні"
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </>
  );
}
