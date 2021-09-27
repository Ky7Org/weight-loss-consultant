import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
const ButtonTrain = () => {
  return (
    <div className={styles.Container}>
      <Link
        to="/auth/login"
        style={{
          color: 'white',
          fontWeight: 'bold',
          border: '3px solid white',
          padding: '15px',
          textDecoration: 'none',
        }}
      >
        LET'S TRAIN
      </Link>
    </div>
  );
};
export default ButtonTrain;
