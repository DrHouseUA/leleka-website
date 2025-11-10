import { BabyDetails } from "@/types/journey";
import Image from "next/image";
import css from "./BabyTab.module.css";

interface BabyTabProps {
  data: BabyDetails;
}

export default function BabyTab({ data }: BabyTabProps) {
  return (
    <div className={css.babyTabContainer}>
      <div>
        <div className={css.imgAnalogContainer}>
          <Image
            src={data.image}
            alt="Baby development"
            fill
            className={css.babySizeImage}
          />
        </div>
        <p className={css.analogyText}>{data.analogy}</p>
      </div>

      <div className={css.journeyTextInfo}>
        <div className={css.descriptionContainer}>
          {data.description.map((text, index) => (
            <p key={index} className={css.journeyDescription}>
              {text}
            </p>
          ))}
        </div>

        <div className={css.interestingFacts}>
          <div className={css.titleLogoFacts}>
            <svg className={css.factsIcon}>
              <use href="/leleka-sprite.svg#icon-star_shine" />
            </svg>
            <h4>Цікавий факт тижня</h4>
          </div>
          <p className={css.factsDescription}>{data.interestingFact}</p>
        </div>
      </div>
    </div>
  );
}
