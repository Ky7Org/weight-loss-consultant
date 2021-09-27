import React, { useState } from 'react';
import { Link, Prompt } from 'react-router-dom';
import * as Yup from 'yup';
import { signUpAPI, confirmEmailAPI } from '../../../services/user';
import * as cookie from 'js-cookie';
import { SubmitButton, Input, Form, FormItem } from 'formik-antd';
import { Button, Row, Col, Alert, Card } from 'antd';
import { Formik } from 'formik';
import { REMEMBER } from '../../../constants/appConst';
import styles from './Register.module.scss';
const Register = () => {
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [emailRegister, setEmailRegister] = useState('');
  const validateForm = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Please enter an email address'),
    password: Yup.string()
      .min(8, 'Must be 8 characters or more')
      .required('Please enter password'),
    comfirmPassword: Yup.string()
      .required('Please enter confirm password')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const [errorRes, setErrorRes] = useState(false);

  const onSubmit = (values, actions) => {
    var dataForm = {
      email: values.email,
      password: values.password,
    };
    signUpAPI(dataForm)
      .then((x) => {
        actions.setSubmitting(false);
        confirmEmailAPI({ email: values.email });
        setIsRegisterSuccess(true);
        setEmailRegister(values.email);
        if (cookie.get(REMEMBER)) {
          cookie.remove(REMEMBER);
        }
        cookie.set(REMEMBER, JSON.stringify({ ...dataForm, remember: true }));
      })
      .catch((err) => {
        actions.setSubmitting(false);
        console.log(err?.response?.data);
        if (err?.response?.data?.message) {
          setErrorRes(err?.response?.data?.message);
        }
      });
  };

  return (
    <div className={styles.RegisterContainer}>
      {!isRegisterSuccess && (
        <Formik
          initialValues={{
            email: '',
            password: '',
            comfirmPassword: '',
            agreeTerm: false,
          }}
          validationSchema={validateForm}
          onSubmit={onSubmit}
          render={({ errors, dirty, isValid }) => (
            <Form className={styles.formContainer}>
              <Prompt
                when={dirty}
                message={'Are you sure to leave? You have unsaved changes'}
              />
              <div className={styles.formFillContainer}>
                {!!errorRes && (
                  <Alert
                    message={errorRes}
                    type="error"
                    style={{ margin: '10px 0' }}
                  />
                )}
                <FormItem name="email">
                  <Input
                    name="email"
                    placeholder={'Email*'}
                    className={styles.Email}
                    style={{ marginRight: '12px' }}
                  />
                </FormItem>
                <FormItem name="password">
                  <Input.Password name="password" placeholder={'Password*'} />
                </FormItem>
                <FormItem name="comfirmPassword">
                  <Input.Password
                    name="comfirmPassword"
                    placeholder={'Confirm Password*'}
                  />
                </FormItem>
                <div className={styles.otherMethod}>
                  <p>Using other method</p>
                </div>
                <div className={styles.haveAAccount}>
                  <p>
                    Already have an account? &nbsp;
                    <Link
                      to="login"
                      style={{
                        color: '#ff3939',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        marginRight: '10px',
                      }}
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
                <Button.Group style={{ width: '100%' }}>
                  <SubmitButton block className={styles.button}>
                    {'REGISTER'}
                  </SubmitButton>
                </Button.Group>
                <div className={styles.footerText}>
                  By clicking Create account, I agree that I have read and
                  accepted the <a>Terms of Use</a> and <a>Privacy Policy</a>.
                </div>
              </div>
            </Form>
          )}
        />
      )}
      {isRegisterSuccess && (
        <Card
          title="Please confirm you email"
          bordered={false}
          style={{ width: 350 }}
        >
          <Alert
            message={`You Request has been sent to ${emailRegister}. Please check your inbox to confirm your account`}
            type="success"
            showIcon
          />
          <br />
          <div>
            <Link to="/auth/signin">{'Back Sign in'}</Link>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Register;
