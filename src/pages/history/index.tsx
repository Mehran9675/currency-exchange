import { useCallback, useContext, useEffect, useState } from "react";
import { ConversionContextInstance } from "../../common/context/conversion";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { HistoryItem } from "../../common/types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../common/routes.enum";
import makeQuery from "../../common/functions/make-query";

const History = () => {
  const { getLocalHistory, deleteItemFromHistory } = useContext(
    ConversionContextInstance
  );
  const [showDialog, setShowDialog] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[] | null>(null);
  const push = useNavigate();

  useEffect(() => {
    setHistory(getLocalHistory());
  }, []);

  const handleDeleteItem = useCallback(
    (itemId: string) => () => {
      const newData = deleteItemFromHistory(itemId);
      setHistory(newData);
      setShowDialog(null);
    },
    []
  );

  const handleCloseDialog = useCallback(
    () => setShowDialog(null),
    [showDialog]
  );

  const handleOpenDialog = useCallback(
    (itemId: string) => () => setShowDialog(itemId),
    [showDialog]
  );

  const handleViewItem = useCallback(
    (item: HistoryItem) => () =>
      push(
        ROUTES.HOME +
          makeQuery({
            amount: item.amount,
            from: item.from,
            to: item.to,
            date: item.date,
          })
      ),
    []
  );

  const renderHistoryItem = useCallback(
    (historyItem: HistoryItem) => (
      <TableRow key={historyItem.id}>
        <Dialog
          onClose={handleCloseDialog}
          open={showDialog === historyItem.id}
        >
          <DialogTitle>
            Delete this item from your history permanently ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleDeleteItem(historyItem.id)}>Yes</Button>
            <Button onClick={handleCloseDialog}>NO</Button>
          </DialogActions>
        </Dialog>
        <TableCell>
          {historyItem.date}@{historyItem.time}
        </TableCell>
        <TableCell>
          Converted an amount of {historyItem.amount} from {historyItem.from} to{" "}
          {historyItem.to}
        </TableCell>
        <TableCell align="left" className={styles["history-table-actions"]}>
          <span onClick={handleViewItem(historyItem)} aria-label="view-item">
            <VisibilityIcon />
            View
          </span>
          <span
            onClick={handleOpenDialog(historyItem.id)}
            aria-label="delete-item"
          >
            <DeleteForeverIcon />
            Delete from history
          </span>
        </TableCell>
      </TableRow>
    ),
    [showDialog]
  );

  return (
    <Table className={styles["history-table"]}>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Event</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{(history || []).map(renderHistoryItem)}</TableBody>
    </Table>
  );
};
export default History;
