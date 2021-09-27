import styles from './WelcomePage.module.scss';
import Logo from './components/Logo/Logo';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import ButtonTrain from './components/ButtonTrain/ButtonTrain';
import PublicRoute from '../../router/PublicRouter';
import ButtonSelectUser from './components/ButtonSelectUser/ButtonSelectUser';
import Login from '../../components/auth/Login/Login';
import Register from '../../components/auth/Register/Register';
import RegisterTrainer from '../../components/auth/RegisterTrainer/RegisterTrainer';
const WelcomePage = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.SignInButton}>
        <Link
          to="/auth/login"
          style={{
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          SIGN IN
        </Link>
      </div>
      <div className={styles.Logo}>
        <Logo />
      </div>
      <Switch>
        <div className={styles.Button}>
          <PublicRoute path="/" component={ButtonTrain} exact={true} />
          <PublicRoute path="/auth" component={ButtonSelectUser} exact={true} />
          <PublicRoute path="/auth/login" component={Login} exact={true} />
          <PublicRoute
            path="/auth/registerWithCustomer"
            component={Register}
            exact={true}
          />
          <PublicRoute
            path="/auth/registerWithTrainer"
            component={RegisterTrainer}
            exact={true}
          />
        </div>
      </Switch>
    </div>
  );
};
export default WelcomePage;
