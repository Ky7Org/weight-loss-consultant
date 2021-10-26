import Paper from '@mui/material/Paper';
import Typography from '@material-ui/core/Typography';
import { Button, Space } from 'antd';
import * as Yup from 'yup';
import { SubmitButton, Input, Checkbox, Form, FormItem } from 'formik-antd';
import { Radio } from 'antd';
import { Formik } from 'formik';
const ResetPassword = (props) => {
  const initValueForm = {
    password: 'BanhsBao',
    repassword: 'Ho Chi Minh City',
  };
  const { data } = props;
  const validateForm = Yup.object({
    fullname: Yup.string().required('Fullname is required'),
    address: Yup.string().required('Address is required'),
  });
  return (
    <div>
      <Paper elevation={2}>
        <div style={{ padding: '20px' }}>
          <Space direction="vertical">
            <Typography variant="h4" align="left">
              Account Managerment
            </Typography>

            <Typography variant="h6" align="left">
              Email: <a>{data.email}</a>
            </Typography>
          </Space>
          <Formik initialValues={initValueForm} validationSchema={validateForm}>
            {() => (
              <Form className="form">
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    <div className="label"> {'New Password'}* </div>
                    <FormItem name="password">
                      <Input.Password
                        name="password"
                        placeholder={'Password'}
                      />
                    </FormItem>
                  </div>
                  <div>
                    <div className="label"> {'Re-New Password'}* </div>
                    <FormItem name="password">
                      <Input.Password
                        name="password"
                        placeholder={'Password'}
                      />
                    </FormItem>
                  </div>
                  <div>
                    <div className="label"> {'Action'} </div>
                    <Button.Group>
                      <SubmitButton block className="main-button">
                        {'Change Password'}
                      </SubmitButton>
                    </Button.Group>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="label"> {'Account Status'} </div>
          <Radio.Group defaultValue={data.status}>
            <Radio.Button value="1">Active</Radio.Button>
            <Radio.Button value="2">InActive</Radio.Button>
            <Radio.Button value="3">Locked</Radio.Button>
          </Radio.Group>
        </div>
      </Paper>
    </div>
  );
};
export default ResetPassword;
