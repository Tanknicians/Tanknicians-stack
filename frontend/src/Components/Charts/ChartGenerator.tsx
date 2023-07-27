export default function ChartGenerator() {
  return (
    <div
      style={{
        width: "800px",
      }}
    >
      <canvas id="chart" />
      <script src="chart.tsx" />
    </div>
  );
}
