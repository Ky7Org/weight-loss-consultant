import { ADMIN, CDM, MANAGER } from 'constants/roleType';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { contains } from 'utils/commom';
import ErrorPage from '../page/ErrorPage';

function PrivateAdminRoute({ component: Component, ...rest }) {
  const { user, isAuthUser } = useSelector((state) => state.authentication);
  const resultComponent = (props) => {
    var role = user.roles;
    if (isAuthUser && contains(ADMIN, role)) {
      return <Component {...props} />;
    }
    if (isAuthUser && !contains(ADMIN)) {
      return <ErrorPage code={403} />;
    }

    if (!isAuthUser) {
      return <Redirect to="/auth/signin" />;
    }
  };
  return <Route {...rest} render={(props) => resultComponent(props)} />;
}

export default PrivateAdminRoute;
