import { useHistory, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { Row, Col, Radio, DatePicker, Button, Spin } from 'antd';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@material-ui/core/Typography';
import CountryPhoneInput, { ConfigProvider } from 'antd-country-phone-input';
import * as Yup from 'yup';
import { SubmitButton, Input, Checkbox, Form, FormItem } from 'formik-antd';
import en from 'world_countries_lists/data/en/world.json';
import { Formik } from 'formik';
import { SmileTwoTone } from '@ant-design/icons';
import moment from 'moment';
import ListItem from './components/listItem/ListItem';
import ResetPassword from './components/resetPassword/ResetPassword';
import {
  getAdminByEmail,
  getTrainerByEmail,
  getUserByEmail,
} from '../../services/admin';
import { transDateFormatYearFirst } from '../../utils/commom';
const Profile = () => {
  const dateFormat = 'YYYY/MM/DD';
  const [currentSearchRole, setcurrentSearchRole] = useState();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initValue, setInitValue] = useState();
  const fetchApiGetUser = (role, email) => {
    var api;
    if (role == 'customer') {
      api = getUserByEmail(email);
    }
    if (role == 'admin') {
      api = getAdminByEmail(email);
    }
    if (role == 'trainer') {
      api = getTrainerByEmail(email);
    }
    api
      .then(({ data }) => {
        setLoading(true);
        setInitValue(data);
      })
      .finally((x) => {
        setLoading(false);
      });
  };
  const validateForm = Yup.object({
    fullname: Yup.string().required('Fullname is required'),
    address: Yup.string().required('Address is required'),
  });
  useEffect(() => {
    console.log(initValue);
  }, [loading]);
  const handleUpdate = () => (setIsEditing(false), setIsSaved(true));
  useEffect(() => {
    fetchApiGetUser(
      location.state?.currentSearchRole,
      location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
    );
    setcurrentSearchRole(location.state);
  }, []);
  const [phoneNumber, setPhoneNumber] = useState();
  const initPhoneValue = () => {
    if (phoneNumber == null) {
      return '+12133734253';
    } else {
      return '+12133734253';
    }
  };
  return (
    <div>
      <Row justify="center">
        <Col xs={23} lg={22} xl={22} xxl={21}>
          <div style={{ display: 'flex' }}>
            <div>
              <Row justify="center">
                <div style={{ display: 'flex' }}>
                  <Paper elevation={2}>
                    <div style={{ padding: '50px' }}>
                      <Avatar
                        alt={initValue?.fullname}
                        src={initValue?.profileImage}
                        sx={{ width: 200, height: 200 }}
                      />
                      <Typography
                        variant="h4"
                        align="right"
                        style={{ textAlign: 'center', fontWeight: 'bold' }}
                      >
                        {initValue?.fullname}
                      </Typography>
                      <Typography
                        variant="h6"
                        align="right"
                        style={{ textAlign: 'center', fontSize: '1rem' }}
                      >
                        {initValue?.address}
                      </Typography>
                    </div>
                  </Paper>
                  <Spin spinning={loading}>
                    <Paper elevation={2}>
                      <div style={{ padding: '20px' }}>
                        <Typography variant="h4" align="left">
                          User Profile
                        </Typography>
                        <Formik
                          initialValues={initValue}
                          validationSchema={validateForm}
                        >
                          {() => (
                            <Form className="form" style={{ width: '20rem' }}>
                              <div className="label"> {'Fullname'}* </div>
                              <FormItem name="fullname">
                                <Input
                                  name="fullname"
                                  placeholder={'Email'}
                                  disabled={isEditing}
                                />
                              </FormItem>
                              <div className="label"> {'Address'} </div>
                              <FormItem name="address">
                                <Input
                                  name="address"
                                  placeholder={'Address'}
                                  disabled={isEditing}
                                />
                              </FormItem>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <div>
                                  <div className="label"> {'Gender'} </div>
                                  <Radio.Group
                                    defaultValue="1"
                                    buttonStyle="solid"
                                    disabled={isEditing}
                                  >
                                    <Radio.Button value="1">Male</Radio.Button>
                                    <Radio.Button value="2">
                                      Female
                                    </Radio.Button>
                                  </Radio.Group>
                                </div>
                                <div>
                                  <div className="label">
                                    {' '}
                                    {'Date Of Birth'}{' '}
                                  </div>
                                  <DatePicker
                                    defaultValue={moment(
                                      transDateFormatYearFirst(initValue?.dob),
                                      dateFormat
                                    )}
                                    format={dateFormat}
                                    disabled={isEditing}
                                  />
                                </div>
                              </div>
                              <div
                                className="label"
                                style={{ marginTop: '10px' }}
                              >
                                {'Phone Number'}
                              </div>
                              <ConfigProvider locale={en}>
                                <CountryPhoneInput
                                  disabled={isEditing}
                                  value={initPhoneValue}
                                />
                              </ConfigProvider>
                              <div style={{ marginTop: '10px' }}>
                                <Button
                                  type="primary"
                                  style={{ marginRight: '10px' }}
                                  onClick={handleUpdate}
                                  disabled={isSaved}
                                >
                                  Update Infor
                                </Button>
                                <Button.Group>
                                  <SubmitButton
                                    block
                                    className="main-button"
                                    disabled={isEditing}
                                  >
                                    {'Save'}
                                  </SubmitButton>
                                </Button.Group>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </Paper>
                  </Spin>
                </div>
              </Row>
              <div style={{ marginTop: '20px' }}>
                <ResetPassword
                  data={initValue}
                  currentSearchRole={currentSearchRole}
                />
              </div>
            </div>
            <div style={{ marginLeft: '20px' }}>
              <Paper elevation={2} style={{ padding: '10px' }}>
                <ListItem />
              </Paper>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Profile;
