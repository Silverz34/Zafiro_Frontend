import styles from './fondo-hero.module.css'


export function FondoHero() {
    return (
        <div className={styles.heroBackground}> 
            <div className={styles.cube}></div>
            <div className={styles.cube}></div>
            <div className={styles.cube}></div>
            <div className={styles.cube}></div>
            <div className={styles.cube}></div>
            <div className={styles.cube}></div>
        </div>
    );
}