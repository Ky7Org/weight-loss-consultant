import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import './Signin.module.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as cookie from 'js-cookie';
import { REMEMBER } from '../../../constants/AppConstants';
import { SubmitButton, Input, Checkbox, Form, FormItem } from 'formik-antd';
import { Button, Row, Col, Alert } from 'antd';
import { signInAPI, signInGoogle } from '../../../services/user';
import { SigninHandler } from '../../../states-manager/authentication/authentication-action';
import image from '../../../assets/image/image2.png';
import Container from '../../../components/UIContainer/UIContainer';
import { firebaseConfig } from '../../../constants/GoogleAuthenticaiton';
import { initializeApp } from '@firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { GoogleCircleFilled } from '@ant-design/icons';

const Signin = (props) => {
  const rememberMe = useMemo(() => {
    return cookie.get(REMEMBER) ? JSON.parse(cookie.get(REMEMBER)) : null;
  }, []);
  const dispatch = useDispatch();
  const [errorRes, setErrorRes] = useState();
  const initValueForm = {
    email: rememberMe?.email,
    password: rememberMe?.password,
    remember: rememberMe?.remember,
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
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
  const data = {
    fullname: 'banhsbao',
  };
  return (
    <Container className="sign-in">
      <Row className="auth-wrapper" gutter={20}>
        <Col xs={24} md={24} lg={12} xl={12} style={{ textAlign: 'center' }}>
          <img src={image} alt="sign in" />
        </Col>
        <Col xs={24} md={24} lg={12} xl={12}>
          <Formik
            initialValues={data}
            validationSchema={validateForm}
            onSubmit={onSubmit}
          >
            {() => (
              <Form className="form">
                <Row>
                  <Col xs={12} xl={12}>
                    <h3>{'Sign in'} </h3>
                  </Col>
                </Row>
                {errorRes && (
                  <Alert
                    message={errorRes}
                    type="error"
                    style={{ marginBlock: 20 }}
                  />
                )}
                <div className="label"> {'Email'}* </div>
                <FormItem name="email">
                  <Input name="email" placeholder={'Email'} />
                </FormItem>
                <div className="label"> {'Password'}* </div>
                <FormItem name="password">
                  <Input.Password name="password" placeholder={'Password'} />
                </FormItem>
                <FormItem name="remember">
                  <Checkbox name="remember" style={{ fontWeight: 'normal' }}>
                    {'Remember Me'}
                  </Checkbox>
                </FormItem>
                <Button.Group style={{ width: '100%' }}>
                  <SubmitButton block className="main-button">
                    {'Sign in'}
                  </SubmitButton>
                </Button.Group>
              </Form>
            )}
          </Formik>
          <div>
            <GoogleCircleFilled
              style={{ fontSize: '45px', marginTop: '15px', color: '#ff3333' }}
              className="resource flex"
              onClick={() => {
                setErrorRes('');
                signInWithPopup(auth, provider)
                  .then(({ user }) => {
                    user.getIdToken().then((token) => {
                      signInGoogle(token)
                        .then((res) => {
                          dispatch(SigninHandler(res.data));
                        })
                        .catch((err) => {
                          setErrorRes(err?.response?.statusText);
                        });
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signin;
