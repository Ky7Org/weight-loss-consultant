import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Row, Col, Spin } from 'antd';
import './ListUser.module.css';
import { getAllUser } from '../../services/admin';
import TableUser from './TableUser/TableUser';
import Container from '../../components/UIContainer/UIContainer';
import { useSelector } from 'react-redux';
const ListUser = () => {
  const [dataEmplOrigin, setDataEmplOrigin] = useState([]);
  const [dataEmpl, setDataEmpl] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [isButtonDownDisabled] = useState(false);
  const [messageError] = useState(null);
  const { search, textSearch } = useSelector((state) => state.search);
  const fetchAPIGetUser = () => {
    var api = getAllUser();
    console.log(api);
    setLoading(true);
    api
      .then(({ data }) => {
        setDataEmplOrigin(data);
        setDataEmpl(data);
      })
      .finally((x) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchAPIGetUser();
  }, []);

  const filterSuccess = (values) => {
    var dataFilter = dataEmplOrigin;
    if (values?.textSearch !== '') {
      setDataEmpl(
        (dataFilter = dataFilter.filter((x) =>
          x?.fullName.toLowerCase().includes(textSearch.toLowerCase())
        ))
      );
    }
  };

  const onNavigation = (id) => {
    history.push(`/admin/user/update/${id}`);
  };

  return (
    <div className="Container">
      <Container style={{ marginTop: 30 }}>
        <Row className="page">
          <Col xs={24} xl={24}>
            <Spin spinning={loading}>
              <TableUser
                dataEmpl={dataEmpl}
                onNavigation={(id) => onNavigation(id)}
                isButtonDownDisabled={isButtonDownDisabled}
                messageError={messageError}
              />
            </Spin>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ListUser;
