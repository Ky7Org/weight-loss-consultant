import React, { useMemo } from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
const ErrorPage = ({ code = 404 }) => {
  const history = useHistory();
  const subTitle = useMemo(() => {
    switch (code) {
      case 403:
        return 'Sorry, you are not authorized to access this page.';

      case 404:
        return 'Sorry, the page you visited does not exist.';

      default:
        return 'Sorry, something went wrong.';
    }
  }, [code]);

  return (
    <Result
      status={code}
      title={code}
      subTitle={subTitle}
      extra={
        <Button
          className="main-button"
          onClick={() => {
            history.push('/home');
          }}
          type="primary"
        >
          Back Home
        </Button>
      }
    />
  );
};

export default ErrorPage;
