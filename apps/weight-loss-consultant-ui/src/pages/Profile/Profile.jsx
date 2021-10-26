import { useHistory, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { Row, Col, Radio, DatePicker, Button } from 'antd';
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
const Profile = () => {
  const dateFormat = 'YYYY/MM/DD';
  const [currentSearchRole, setcurrentSearchRole] = useState();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const initValueForm = {
    fullname: 'BanhsBao',
    address: 'Ho Chi Minh City',
    phone: '',
  };
  const validateForm = Yup.object({
    fullname: Yup.string().required('Fullname is required'),
    address: Yup.string().required('Address is required'),
  });
  const mockData = {
    email: 'chaubao.work@gmail.com',
    password: '$2b$07$bduxf4eUUn1K/UtM/jP0ReyRsZ6P6alXytUzcq30w4/owJ42cMaXu',
    fullname: 'BanhsBao',
    address: 'Ho Chi Minh City',
    phone: '0956251254',
    gender: '1',
    status: '1',
    profileImage: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    dob: '19091999',
  };
  const handleUpdate = () => (setIsEditing(false), setIsSaved(true));
  useEffect(() => {
    console.log(location);
    setcurrentSearchRole(location.state);
  }, [location]);
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
                        alt={mockData.fullname}
                        src={mockData.profileImage}
                        sx={{ width: 200, height: 200 }}
                      />
                      <Typography
                        variant="h4"
                        align="right"
                        style={{ textAlign: 'center', fontWeight: 'bold' }}
                      >
                        {mockData.fullname}
                      </Typography>
                      <Typography
                        variant="h6"
                        align="right"
                        style={{ textAlign: 'center', fontSize: '1rem' }}
                      >
                        {mockData.address}
                      </Typography>
                    </div>
                  </Paper>
                  <Paper elevation={2}>
                    <div style={{ padding: '20px' }}>
                      <Typography variant="h4" align="left">
                        User Profiles
                      </Typography>
                      <Formik
                        initialValues={initValueForm}
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
                                  <Radio.Button value="2">Female</Radio.Button>
                                </Radio.Group>
                              </div>
                              <div>
                                <div className="label"> {'Date Of Birth'} </div>
                                <DatePicker
                                  defaultValue={moment(
                                    '2015/01/01',
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
                              <CountryPhoneInput disabled={isEditing} />
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
                </div>
              </Row>
              <div style={{ marginTop: '20px' }}>
                <ResetPassword data={mockData} />
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
