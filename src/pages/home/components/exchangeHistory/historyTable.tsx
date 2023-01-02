import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useContext, useMemo } from "react";
import { ConversionContextInstance } from "../../../../common/context/conversion";
import { DATA_VIEW } from "../../../../common/types";
import Show from "../../../../common/components/show";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const HistoryTable = (props: { view: DATA_VIEW }) => {
  const { historyData, from, to } = useContext(ConversionContextInstance);
  const renderRows = useMemo(() => {
    const result = [];
    for (const key in historyData?.rates) {
      result.push(
        <TableRow key={key}>
          <TableCell>{key}</TableCell>
          <TableCell>{historyData?.rates[key][from || ""]}</TableCell>
        </TableRow>
      );
    }
    return result;
  }, [historyData]);

  const chartData = useMemo(() => {
    const fromData = [];
    const toData = [];
    const labels = [];
    for (const key in historyData?.rates) {
      labels.push(key);
      fromData.push(historyData?.rates[key][from || ""]);
      toData.push(historyData?.rates[key][to || ""]);
    }
    return {
      labels,
      datasets: [
        { label: from || "", data: fromData, borderColor: "#009688" },
        { label: to || "", data: toData, borderColor: "#94c720" },
      ],
    };
  }, [historyData, from]);
  return (
    <>
      <Show if={props.view === DATA_VIEW.TABLE}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Exchange rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderRows}</TableBody>
        </Table>
      </Show>
      <Show if={props.view === DATA_VIEW.CHART}>
        <Line data={chartData} />
      </Show>
    </>
  );
};
export default HistoryTable;
