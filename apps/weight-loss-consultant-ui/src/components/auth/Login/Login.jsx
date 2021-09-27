import { useMemo, useState } from 'react';
import * as cookie from 'js-cookie';
import * as Yup from 'yup';
import { REMEMBER } from '../../../constants/appConst';
import { useDispatch } from 'react-redux';
import { signInAPI } from '../../../services/user';
import { SubmitButton, Input, Checkbox, Form, FormItem } from 'formik-antd';
import { Button, Row, Col, Alert } from 'antd';
import { Formik } from 'formik';
import { SigninHandler } from '../../../redux-flow/authentication/authentication-action';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';
const Login = () => {
  const rememberMe = useMemo(() => {
    return cookie.get(REMEMBER) ? JSON.parse(cookie.get(REMEMBER)) : null;
  }, []);
  const dispatch = useDispatch();
  const [errorRes, setErrorRes] = useState('');

  const initValueForm = {
    email: rememberMe?.email,
    password: rememberMe?.password,
    remember: rememberMe?.remember,
  };
  const validateForm = Yup.object({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const onSubmit = (values, actions) => {
    setErrorRes('');
    if (!values.remember) {
      cookie.remove(REMEMBER);
    }
    signInAPI({ email: values.email, password: values.password })
      .then((res) => {
        if (values.remember) {
          cookie.set(REMEMBER, values);
        }
        actions.setSubmitting(false);
        dispatch(SigninHandler(res.data));
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          setErrorRes(err?.response?.data?.message);
        }
        actions.setSubmitting(false);
      });
  };
  return (
    <div className={styles.loginContainer}>
      <Formik
        initialValues={initValueForm}
        validationSchema={validateForm}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className={styles.formContainer}>
            <div className={styles.formFillContainer}>
              {errorRes && (
                <Alert
                  message={errorRes}
                  type="error"
                  style={{ marginBlock: 20 }}
                />
              )}
              <FormItem name="email">
                <Input
                  name="email"
                  placeholder={'Email*'}
                  className={styles.email}
                />
              </FormItem>
              <FormItem name="password">
                <Input.Password
                  name="password"
                  placeholder={'Password* '}
                  style={{ width: 150 }}
                />
              </FormItem>
              <Button.Group style={{ width: '100%' }}>
                <SubmitButton block className={styles.button}>
                  Sign in
                </SubmitButton>
              </Button.Group>
              <div className={styles.selection}>
                <div className={styles.remember}>
                  <FormItem name="remember">
                    <Checkbox
                      name="remember"
                      style={{
                        fontWeight: 'normal',
                        color: 'white',
                        fontSize: '15px',
                      }}
                    >
                      {'Remember Me'}
                    </Checkbox>
                  </FormItem>
                </div>
                <div className={styles.text}>
                  {' '}
                  <Link
                    to="/auth/signin"
                    style={{
                      color: '#ff3939',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                    }}
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className={styles.footerText}>
                Don’t have an account? &nbsp;
                <Link
                  to="/auth"
                  style={{
                    color: '#ff3939',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                  }}
                >
                  Register
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Login;
