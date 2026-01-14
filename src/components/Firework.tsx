import styles from "./Firework.module.css";

const Firework = () => {
  return (
    <div>
      <div className={styles.firework}></div>
      <div className={styles.firework}></div>
      <div className={styles.firework}></div>
    </div>
  );
};

export default Firework;
