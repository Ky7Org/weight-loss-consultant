import Container from '../../../components/UIContainer/UIContainer';
import logo from '../../../assets/image/weightlossLogo.png';
import { useSelector, useDispatch } from 'react-redux';
import styles from './AppHeader.module.scss';
import { Row } from 'antd';
const AppHeader = () => {
  const { isAuthUser } = useSelector((state) => state.authentication);
  return (
    <div className={styles.header}>
      <Container>
        <Row justify="space-between" align="middle">
          {!isAuthUser ? (
            <img src={logo} alt="WLC logo" style={{ width: '250px' }} />
          ) : (
            ''
          )}
        </Row>
      </Container>
    </div>
  );
};

export default AppHeader;
