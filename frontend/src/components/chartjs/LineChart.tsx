//  Component for a Line chart
import { Line } from 'react-chartjs-2';
import { ChartData, LinearScaleOptions } from 'chart.js';
import { ChartOptions } from 'chart.js';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Title
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title);

// incoming object has data packet and option
export interface RequiredChartData {
  data: ChartData<'line', (number | null)[], unknown>;
  yscale: Partial<LinearScaleOptions>;
  title: string;
}

function LineChart({ data, yscale, title }: RequiredChartData) {
  const options: ChartOptions<'line'> = {
    plugins: {
      title: {
        display: true,
        text: title
      }
    },
    scales: {
      y: yscale
    }
  };
  return <Line data={data} options={options} />;
}

export default LineChart;
