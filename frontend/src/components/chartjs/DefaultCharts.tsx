import { Container, Grid } from '@mui/material';
import { useGetAllServiceCallsByTankIdAndDateRangeQuery } from '../../redux/slices/forms/servicecallApiSlice';
import { ChartData } from 'chart.js';
import LineChart from './LineChart';

export default function DefaultCharts({
  tankId,
  start,
  end
}: { tankId: number; start?: Date; end?: Date }) {
  const { data: serviceCalls } = useGetAllServiceCallsByTankIdAndDateRangeQuery(
    {
      tankId: tankId
    }
  );

  // ALKALINITY
  const alkDates: string[] = [];
  const alkVals: number[] = [];

  serviceCalls?.alkalinity.forEach((datapoint) => {
    const date = new Date(datapoint[1]);
    alkVals.push(datapoint[0]);
    alkDates.push(`${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`);
  });

  const alk = {
    labels: alkDates,
    datasets: [
      {
        label: 'Alkalinity',
        data: alkVals,
        borderColor: 'blue'
      }
    ]
  };

  // CALCIUM
  const calDates: string[] = [];
  const calVals: number[] = [];

  serviceCalls?.calcium.forEach((datapoint) => {
    const date = new Date(datapoint[1]);

    calVals.push(datapoint[0]);
    calDates.push(`${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`);
  });

  const cal = {
    labels: calDates,
    datasets: [
      {
        label: 'Calcium',
        data: calVals,
        borderColor: 'red'
      }
    ]
  };

  // NITRATE
  const nitDates: string[] = [];
  const nitVals: number[] = [];

  serviceCalls?.nitrate.forEach((datapoint) => {
    const date = new Date(datapoint[1]);

    nitVals.push(datapoint[0]);
    nitDates.push(`${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`);
  });

  const nit = {
    labels: nitDates,
    datasets: [
      {
        label: 'Nitrate',
        data: nitVals,
        borderColor: 'orange'
      }
    ]
  };

  // PHOSPHATE
  const phoDates: string[] = [];
  const phoVals: number[] = [];

  serviceCalls?.phosphate.forEach((datapoint) => {
    const date = new Date(datapoint[1]);

    phoVals.push(datapoint[0]);
    phoDates.push(`${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`);
  });

  const pho = {
    labels: phoDates,
    datasets: [
      {
        label: 'Phosphate',
        data: phoVals,
        borderColor: 'green'
      }
    ]
  };

  return (
    <>
      <Grid container maxWidth={'100%'} alignItems='center'>
        <Grid item xs={12} md={6}>
          <Container sx={{ alignItems: 'center' }}>
            <LineChart data={alk} title={'Alkalinity'} />
          </Container>
        </Grid>
        <Grid item xs={12} md={6}>
          <Container sx={{ alignItems: 'center' }}>
            <LineChart data={cal} title={'Calcium'} />
          </Container>
        </Grid>
        <Grid item xs={12} md={6}>
          <Container sx={{ alignItems: 'center' }}>
            <LineChart data={nit} title={'Nitrate'} />
          </Container>
        </Grid>
        <Grid item xs={12} md={6}>
          <Container sx={{ alignItems: 'center' }}>
            <LineChart data={pho} title={'Phosphate'} />
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
