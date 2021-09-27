import { Link } from 'react-router-dom';
import styles from './ButtonSelectUser.module.scss';
const ButtonSelectUser = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Text}>Let us know who you are</div>
      <div className={styles.Trainer}>
        {' '}
        <Link
          to="/auth/registerWithTrainer"
          style={{
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            border: '3px solid white',
            padding: '15px',
            textDecoration: 'none',
          }}
          className={styles.LinkTrainer}
        >
          TRAINER
        </Link>
      </div>
      <div className={styles.Customer}>
        <Link
          to="/auth/registerWithCustomer"
          style={{
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            border: '3px solid white',
            padding: '15px',
            textDecoration: 'none',
          }}
          className={styles.LinkCustomer}
        >
          CUSTOMER
        </Link>
      </div>
    </div>
  );
};
export default ButtonSelectUser;
