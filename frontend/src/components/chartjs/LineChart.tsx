//  Component for a Line chart
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
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
  title: string;
}

function LineChart({ data, title }: RequiredChartData) {
  const options: ChartOptions = {
    plugins: {
      title: {
        display: true,
        text: title
      }
    }
  };
  return <Line data={data} options={options} />;
}

export default LineChart;
