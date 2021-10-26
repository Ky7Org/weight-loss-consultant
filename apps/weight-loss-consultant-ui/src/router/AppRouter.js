import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import PrivateRoute from '../router/PrivateRoute';
import PublicRoute from '../router/PublicRoute';
import Signin from '../pages/auth/Signin/Signin';
import ErrorPage from '../pages/ErrorPages/ErrorPages';
import ListUser from '../components/ListUser/ListUser';
import Profile from '../pages/Profile/Profile';
export default function AppRouter() {
  return (
    <Switch>
      <PublicRoute path="/auth/signin" component={Signin} exact={true} />
      <PrivateRoute path="/home" component={HomePage} exact={true} />
      <PrivateRoute path="/user/update/:idUser" component={Profile} />
      <Redirect exact from="/" to="/home" />
      <PrivateRoute path="/user/customer" component={ListUser} exact={true} />
      <PrivateRoute path="/user/trainer" component={ListUser} exact={true} />
      <PrivateRoute path="/user/admin" component={ListUser} exact={true} />
      <Route exact path="/page-not-found">
        <ErrorPage code={404} />
      </Route>
      <Redirect from="*" to="/page-not-found" />
    </Switch>
  );
}
