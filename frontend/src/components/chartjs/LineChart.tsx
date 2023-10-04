//  Component for a Line chart
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

// incoming object has data packet and option
export interface RequiredChartData {
  data: ChartData<'line', (number | null)[], unknown>;
}

function LineChart({ data }: RequiredChartData) {
  return <Line data={data} />;
}
export default LineChart;
