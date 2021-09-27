import styles from './Logo.module.scss';
import logoImage from '../../../../assets/images/logo.png';
const Logo = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Centered}>
        <img src={logoImage} alt="logo" className={styles.logo} />
        <div className={styles.text}>
          If you need of a personal trainer, Fitness instructor advice, or a
          healthy
          <br />
          Living product review, please feel free to contact us
        </div>
      </div>
    </div>
  );
};
export default Logo;
