import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthUser } = useSelector((state) => state.authentication);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthUser ? <Component {...props} /> : <Redirect to="/auth/signin" />
      }
    />
  );
};

export default PrivateRoute;
