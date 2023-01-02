import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useContext, useMemo } from "react";
import { ConversionContextInstance } from "../../../../common/context/conversion";
import { DATA_VIEW } from "../../../../common/types";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import Show from "../../../../common/components/show";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const statisticsTable = (props: { view: DATA_VIEW }) => {
  const { from, historyData, to } = useContext(ConversionContextInstance);
  const statistics = useMemo(() => {
    let fromHighest = Number.MIN_VALUE;
    let fromLowest = Number.MAX_VALUE;
    let fromSum = 0;
    let toHighest = Number.MIN_VALUE;
    let toLowest = Number.MAX_VALUE;
    let toSum = 0;
    let count = 0;
    for (const key in historyData?.rates) {
      fromSum += historyData?.rates[key][from || ""];
      toSum += historyData?.rates[key][to || ""];
      if (historyData?.rates[key][from || ""] > fromHighest)
        fromHighest = historyData?.rates[key][from || ""];
      if (historyData?.rates[key][to || ""] > toHighest)
        toHighest = historyData?.rates[key][to || ""];
      if (historyData?.rates[key][from || ""] < fromLowest)
        fromLowest = historyData?.rates[key][from || ""];
      if (historyData?.rates[key][to || ""] < toLowest)
        toLowest = historyData?.rates[key][to || ""];
      ++count;
    }
    return {
      fromHighest,
      fromLowest,
      fromAverage: Number(fromSum / count).toFixed(6),
      toHighest,
      toLowest,
      toAverage: Number(toSum / count).toFixed(6),
    };
  }, [historyData, to, from]);

  const chartData = useMemo(
    () => ({
      labels: ["Highest", "Lowest", "Average"],
      datasets: [
        {
          label: from || "",
          data: [
            statistics.fromHighest,
            statistics.fromLowest,
            statistics.fromAverage,
          ],
          borderColor: "#009688",
        },
        {
          label: to || "",
          data: [
            statistics.toHighest,
            statistics.toLowest,
            statistics.toAverage,
          ],
          borderColor: "#94c720",
        },
      ],
    }),
    [statistics]
  );

  return (
    <>
      <Show if={props.view === DATA_VIEW.TABLE}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Statistics</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Highest</TableCell>
              <TableCell>{statistics.fromHighest}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Lowest</TableCell>
              <TableCell>{statistics.fromLowest}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Average</TableCell>
              <TableCell>{statistics.fromAverage}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Show>
      <Show if={props.view === DATA_VIEW.CHART}>
        <Line data={chartData} />
      </Show>
    </>
  );
};
export default statisticsTable;
