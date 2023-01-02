import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Button,
  TextField,
} from "@mui/material";
import styles from "./styles.module.css";
import { CompareArrows } from "@mui/icons-material";
import { SyntheticEvent, useCallback, useContext } from "react";
import { ConversionContextInstance } from "../../../../common/context/conversion";

const Converter = () => {
  const {
    to,
    setTo,
    amount,
    setAmount,
    setFrom,
    from,
    handleSwap,
    fetchConversionResults,
    currencies,
  } = useContext(ConversionContextInstance);

  const handleSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      fetchConversionResults({ from, to, amount });
    },
    [amount, to, from]
  );
  return (
    <>
      <form onSubmit={handleSubmit} className={styles["input-group"]}>
        <TextField
          required
          sx={{
            width: "100%",
            maxWidth: "13rem",
          }}
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          variant="standard"
          label="Amount"
          type="text"
        />
        <Autocomplete
          disablePortal
          options={currencies || []}
          value={from}
          onChange={(e, value) => setFrom(value as string)}
          sx={{
            width: "100%",
            maxWidth: "25rem",
          }}
          renderInput={(params: AutocompleteRenderInputParams) => (
            <TextField required {...params} label="From" variant="standard" />
          )}
        />
        <Button
          sx={{
            backgroundColor: "white",
            color: "#009688",
            "&:hover": {
              backgroundColor: "#009688",
              color: "white",
            },
          }}
          onClick={handleSwap}
          variant="contained"
        >
          <CompareArrows />
        </Button>
        <Autocomplete
          disablePortal
          options={currencies || []}
          value={to}
          onChange={(e, value) => setTo(value as string)}
          sx={{
            width: "100%",
            maxWidth: "25rem",
          }}
          renderInput={(params: AutocompleteRenderInputParams) => (
            <TextField required {...params} label="To" variant="standard" />
          )}
        />
        <Button type="submit" variant="contained">
          CONVERT
        </Button>
      </form>
    </>
  );
};
export default Converter;
