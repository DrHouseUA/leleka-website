import { MomDetails } from "@/types/journey";
import css from "./MomTab.module.css";

interface MomTabProps {
  data: MomDetails;
}

const CategoryIcon = ({ category }: { category: string }) => {
  const getIconId = (category: string) => {
    const iconMap: Record<string, string> = {
      Харчування: "icon-fork_spoon",
      Активність: "icon-fitness_center",
      "Відпочинок та комфорт": "icon-chair",
    };
    return iconMap[category] || "icon-food";
  };

  const iconId = getIconId(category);

  return (
    <svg width={24} height={24} className={css.adviceIcon} aria-hidden="true">
      <use href={`/leleka-sprite.svg#${iconId}`} />
    </svg>
  );
};

export default function MomTab({ data }: MomTabProps) {
  console.log(data.comfortTips);
  return (
    <div className={css.momTabContainer}>
      <div className={css.infoForMomBlock}>
        <div className={css.howYouCanFeel}>
          <h3 className={css.advicesTitle}>Як ви можете почуватись</h3>

          <ul className={css.feelingsList}>
            {data.feelings.states.map((state, index) => (
              <li key={index} className={css.feelingTag}>
                {state}
              </li>
            ))}
          </ul>

          <p className={css.sensationDescription}>
            {data.feelings.sensationDescr}
          </p>
        </div>

        <div className={css.advices}>
          <h3 className={css.advicesTitle}>Поради для вашого комфорту</h3>
          <ul className={css.advicesList}>
            {data.comfortTips.map((tip, index) => (
              <li key={index} className={css.adviceItem}>
                <div className={css.iconTitleAdvice}>
                  <CategoryIcon category={tip.category} />
                  <h4 className={css.adviceCategory}>{tip.category}</h4>
                </div>
                <p className={css.comfortTips}>{tip.tip}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Тут можна додати TasksReminderCard */}
      {/* <div className={css.taskBlock}>
        <TasksReminderCard />
      </div> */}
    </div>
  );
}
