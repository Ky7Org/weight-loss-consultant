import Container from '../../components/UIContainer/UIContainer';
import './HomePage.module.css';

const HomePage = (props) => {
  return (
    <Container className="home-page">
      <h2
        style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '30px' }}
      >
        This is Home Page
      </h2>
    </Container>
  );
};

export default HomePage;
