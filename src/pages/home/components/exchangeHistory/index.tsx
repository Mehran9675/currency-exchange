import {
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import styles from "./style.module.css";
import HistoryTable from "./historyTable";
import StatisticsTable from "./statisticsTable";
import { useContext, useState } from "react";
import { DATA_VIEW, DURATIONS } from "../../../../common/types";
import { ConversionContextInstance } from "../../../../common/context/conversion";

const ExchangeHistory = () => {
  const { duration, setDuration } = useContext(ConversionContextInstance);
  const [view, setView] = useState<DATA_VIEW>(DATA_VIEW.TABLE);

  return (
    <div className={styles["exchange-history-container"]}>
      <header>
        <h3>Exchange History</h3>
        <section>
          <Select
            label="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value as DURATIONS)}
          >
            <MenuItem value={DURATIONS.WEEK}>7 Days</MenuItem>
            <MenuItem value={DURATIONS.TWO_WEEKS}>14 Days</MenuItem>
            <MenuItem value={DURATIONS.MONTH}>30 Days</MenuItem>
          </Select>
          <RadioGroup
            sx={{ flexDirection: "row", margin: "0 auto" }}
            value={view}
            onChange={(e) => setView(e.target.value as DATA_VIEW)}
          >
            <FormControlLabel
              value={DATA_VIEW.TABLE}
              control={<Radio />}
              label="Table"
            />
            <FormControlLabel
              value={DATA_VIEW.CHART}
              control={<Radio />}
              label="Chart"
            />
          </RadioGroup>
        </section>
      </header>
      <div>
        <HistoryTable view={view} />
        <StatisticsTable view={view} />
      </div>
    </div>
  );
};
export default ExchangeHistory;
