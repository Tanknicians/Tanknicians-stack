import LineChart from '../../../Components/ChartJS/LineChart'

export default function CustomChart() {
  const TankData = {
    labels: [1_01_1999, 1_08_1999, 1_15_1999, 1_22_1999, 1_29_1999, 2_05_1999],
    datasets: [
      {
        label: 'Alkilinity',
        data: [1, 2, 1, 3, 4, 2],
        borderColor: 'red'
      },
      {
        label: 'Calcium',
        data: [2, 3, 4, 5, 1, 2],
        borderColor: 'Blue'
      }
    ]
  }
  return (
    <div style={{ width: '50%', position: 'relative' }}>
      <h2>Two charts Demo</h2>
      <LineChart data={TankData} />;
    </div>
  )
}
