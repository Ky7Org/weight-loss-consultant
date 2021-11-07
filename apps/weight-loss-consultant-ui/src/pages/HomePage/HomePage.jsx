import Container from '../../components/UIContainer/UIContainer';
import './HomePage.module.css';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { scaleBand } from '@devexpress/dx-chart-core';
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart';
import { Col, Row } from 'antd';
import { Typography } from '@mui/material';
const chartData = [
  {
    state: 'Customer',
    active: 1000,
    inactive: 50,
    pending: 60,
  },
  {
    state: 'Trainer',
    active: 900,
    inactive: 100,
    pending: 10,
  },
];

const HomePage = (props) => {
  return (
    <Row justify="center">
      <Col xs={23} lg={22} xl={22} xxl={21}>
        <Typography
          variant="button"
          display="block"
          style={{ textAlign: 'center' }}
          gutterBottom
          variant="h2"
        >
          Dashboard
        </Typography>
        <div style={{ display: 'flex' }}>
          <div>
            <Paper style={{ width: '50rem' }}>
              <Chart data={chartData}>
                <ArgumentScale factory={scaleBand} />
                <ArgumentAxis />
                <ValueAxis />

                <BarSeries
                  valueField="active"
                  argumentField="state"
                  name="Active"
                />
                <BarSeries
                  valueField="inactive"
                  argumentField="state"
                  name="In Active"
                />
                <BarSeries
                  valueField="pending"
                  argumentField="state"
                  name="Pending"
                />
                <Stack />
              </Chart>
              <Typography
                variant="button"
                display="block"
                style={{ textAlign: 'center' }}
                gutterBottom
              >
                Tracking User chart
              </Typography>
            </Paper>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default HomePage;
