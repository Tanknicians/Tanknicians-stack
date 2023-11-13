import { Box, Container, Grid } from '@mui/material';
import { useGetAllServiceCallsByTankIdAndDateRangeQuery } from '../../redux/slices/forms/servicecallApiSlice';
import LineChart from './LineChart';
import { LinearScaleOptions } from 'chart.js';

export default function DefaultCharts({
  tankId,
  start,
  end
}: {
  tankId: number;
  start?: Date;
  end?: Date;
}) {
  const { data: serviceCalls } = useGetAllServiceCallsByTankIdAndDateRangeQuery(
    {
      tankId: tankId
    }
  );

  // ALKALINITY
  const alkDates: string[] = [];
  const alkVals: number[] = [];
  const aScale: Partial<LinearScaleOptions> = {
    max: 11,
    min: 6.5
  };

  serviceCalls?.alkalinity.forEach((datapoint) => {
    const date = new Date(datapoint[1]);
    alkVals.push(datapoint[0]);

    // months 0 indexed btw
    alkDates.push(`${date.getMonth() + 1}/${date.getDate() + 1}`);
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
  const cScale: Partial<LinearScaleOptions> = {
    max: 500,
    min: 400
  };

  serviceCalls?.calcium.forEach((datapoint) => {
    const date = new Date(datapoint[1]);

    calVals.push(datapoint[0]);
    calDates.push(`${date.getMonth() + 1}/${date.getDate() + 1}`);
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
  const nScale: Partial<LinearScaleOptions> = {
    max: 20,
    min: 1
  };

  serviceCalls?.nitrate.forEach((datapoint) => {
    const date = new Date(datapoint[1]);

    nitVals.push(datapoint[0]);
    nitDates.push(`${date.getMonth() + 1}/${date.getDate() + 1}`);
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
  const pScale: Partial<LinearScaleOptions> = {
    max: 0.24,
    min: 0.03
  };

  serviceCalls?.phosphate.forEach((datapoint) => {
    const date = new Date(datapoint[1]);

    phoVals.push(datapoint[0]);
    phoDates.push(`${date.getMonth() + 1}/${date.getDate() + 1}`);
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
    <Box sx={{ paddingBottom: '30px' }}>
      <Grid container maxWidth={'100%'} alignItems='center'>
        <Grid item xs={12} md={6}>
          <Container sx={{ alignItems: 'center' }}>
            <LineChart data={alk} yscale={aScale} title={'Alkalinity'} />
          </Container>
        </Grid>
        <Grid item xs={12} md={6}>
          <Container sx={{ alignItems: 'center' }}>
            <LineChart data={cal} yscale={cScale} title={'Calcium'} />
          </Container>
        </Grid>
        <Grid item xs={12} md={6}>
          <Container sx={{ alignItems: 'center' }}>
            <LineChart data={nit} yscale={nScale} title={'Nitrate'} />
          </Container>
        </Grid>
        <Grid item xs={12} md={6}>
          <Container sx={{ alignItems: 'center' }}>
            <LineChart data={pho} yscale={pScale} title={'Phosphate'} />
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}
