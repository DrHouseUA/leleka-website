import styles from "./page.module.css";
import StatusBlock from "@/components/Dashboard/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/Dashboard/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/Dashboard/MomTipCard/MomTipCard";
import GreetingBlock from "@/components/Dashboard/GreetingBlock/GreetingBlock";

export default function Home() {
  return (
    <div className={styles.page}>
      <GreetingBlock />
      <main className={styles.main}>
        <div>
          <div className={styles.greetingstatus}>
            <StatusBlock />
          </div>
          <div className={styles.babytodaymomtip}>
            <BabyTodayCard />
            <MomTipCard />
          </div>
        </div>
        <div>тут буде Den секція</div>
      </main>
    </div>
  );
}
