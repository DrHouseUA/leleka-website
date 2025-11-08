"use client";

import Image from "next/image";
import css from "./DiaryEntryDetails.module.css";

export default function DiaryEntryDetails() {
  return (
    <section className={css["diary-details-container"]}>
      <div className={css["diary-details-block"]}>
        <div className={css["diary-details-header"]}>
          <div className={css["diary-details-header-wrapper"]}>
            <div className={css["diary-details-title"]}>
              Перший привіт{" "}
              <Image
                src="/edit_icon.svg"
                width={24}
                height={24}
                alt="add icon"
                onClick={() => {
                  console.log("mene najali");
                }}
              ></Image>
            </div>
            <div className={css["diary-details-date"]}>
              15 Липня 2025
              <Image
                src="/delete_icon.svg"
                width={24}
                height={24}
                alt="add icon"
                onClick={() => {
                  console.log("mene najali");
                }}
              ></Image>
            </div>
          </div>

          <div className={css["diary-details-content"]}>
            Це сталося! Сьогодні ввечері, коли я спокійно дивилася фільм, я це
            відчула. Спочатку подумала, що здалося. Такий ледь вловимий поштовх
            зсередини, ніби хтось легенько постукав. Я завмерла, поклала руку на
            живіт і стала чекати. І за хвилину — знову!
            <br /> Я розплакалась від щастя. Це перше справжнє «привіт» від мого
            малюка. Покликала чоловіка, він довго тримав руку на животі, і йому
            теж пощастило відчути один поштовх. Його очі в цей момент — я ніколи
            не забуду. <br />
            Тепер я точно знаю, що я не сама. Там справді хтось є, росте і
            спілкується зі мною. Неймовірне відчуття.
          </div>
          <div className={css["diary-details-emotions"]}>
            <ul className={css["diary-details-emotions-list"]}>
              <li className={css["diary-details-emotions-item"]}>Натхнення</li>
              <li className={css["diary-details-emotions-item"]}>Вдячність</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
