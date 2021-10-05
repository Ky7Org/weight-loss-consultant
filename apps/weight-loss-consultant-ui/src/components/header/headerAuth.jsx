import { Row } from 'antd';
import logoImg from '../../assets/image/weightlossLogo.png';
import Container from '../UI/Container/Container';
import { useHistory } from 'react-router-dom';

const HeaderAuth = (props) => {
  const history = useHistory();
  return (
    <div
      className="header"
      style={{ boxShadow: 'rgba(17, 12, 46, 0.1) 0px 0 100px 0px' }}
    >
      <Container>
        <Row align="middle" style={{ height: 75 }}>
          <div className="logo" onClick={() => history.push('/home')}>
            <img src={logoImg} alt="logo" />
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default HeaderAuth;
