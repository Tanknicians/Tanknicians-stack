import Chart, { ChartItem } from "chart.js/auto";

(async function (
  tankId: string,
  yLabel: string,
  startDate: string,
  endDate: string,
) {
  // fetch data for period
  const data = fetchDataForPeriod(tankId, yLabel, startDate, endDate).data;
  new Chart(document.getElementById("chart") as ChartItem, {
    type: "line",
    data: {
      labels: data.map((row) => row.date),
      datasets: [
        {
          label: yLabel,
          data: data.map((row) => row.value),
        },
      ],
    },
  });
});

/**
 * Ideally, this utility function fetches a set of data points for
 * a given tankId's measured field (alkalinity, calcium, etc.) between
 * start and end
 * @param tankId
 * @param field
 * @param start
 * @param end
 * @returns {
 *      tankId:string,
 *      field:string,
 *      data:float[]
 * }
 */
function fetchDataForPeriod(
  tankId: string,
  field: string,
  start: string,
  end: string,
) {
  // use prisma to fetch ordered data for column name 'FIELD'
  // between start and end, inclusive. Returns model:
  //
  // data = {
  //      col: { 'alkalinity' | 'calcium' | etc },
  //      measurements: [
  //          5.78,
  //          2.18,
  //          5.40,
  //          5.48
  //      ]
  // }
  //
  // Raw relational query:
  // SELECT ? FROM db.ServiceCall
  // WHERE tankId = ? AND
  // WHERE createdOn gt start AND
  // where createdOn lt end
  //
  // Prisma has some nested filtering of lists and
  // maybe can do something like
  // const dataPoints = await prisma.servicecalls({
  //     where: {
  //         AND: [
  //          { tankId: tankId, },
  //          { createdOn_lt: end, },
  //          { createdOn_gt: start, },
  //         ]
  //     }
  // }

  const dummyData = {
    tankId: 1,
    field: "alkalinity",
    data: [
      { date: "2023-07-07", value: 5.78 },
      { date: "2023-07-08", value: 2.18 },
      { date: "2023-07-09", value: 5.4 },
      { date: "2023-07-10", value: 5.48 },
      { date: "2023-07-30", value: 3.45 },
    ],
  };

  return dummyData;
}
