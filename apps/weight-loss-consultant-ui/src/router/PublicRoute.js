import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => {
  const { isAuthUser } = useSelector((state) => state.authentication);
  console.log(isAuthUser);
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthUser ? <Redirect to="/home" /> : <Component {...props} />
      }
    />
  );
};
export default PublicRoute;
