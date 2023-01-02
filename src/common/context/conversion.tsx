import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { DURATIONS, HistoryItem } from "../types";
import getConversionOrNull, {
  GetConversionOrNullArguments,
} from "../../services/getConversion";
import getRatesBasedOnTime from "../../services/getRatesBasedOnTime";
import dayjs from "dayjs";
import useFetch from "../hooks/useFetch";
import getCurrenciesOrNull from "../../services/getCurrencies";
import STORAGE_KEYS from "../storageKeys.enum";
import { useSearchParams } from "react-router-dom";

const DATE_FORMAT = "YYYY-MM-DD";
const TIME_FORMAT = "HH:MM";

type ConversionContextT = {
  from: string | null;
  setFrom: Dispatch<SetStateAction<string | null>>;
  to: string | null;
  setTo: Dispatch<SetStateAction<string | null>>;
  amount: string | null;
  setAmount: Dispatch<SetStateAction<string | null>>;
  historyData: Record<string, any> | null;
  setHistoryData: Dispatch<SetStateAction<Record<string, any> | null>>;
  duration: DURATIONS;
  setDuration: Dispatch<SetStateAction<DURATIONS>>;
  currencies: string[];
  conversionResults: Record<string, any> | null;
  handleSwap: () => void;
  fetchConversionResults: (
    conversionParams: GetConversionOrNullArguments,
    isViewingHistory?: boolean
  ) => void;
  fetchHistory: () => void;
  getLocalHistory: () => HistoryItem[];
  deleteItemFromHistory: (itemId: string) => HistoryItem[];
  getParamsFromQueries: () => {
    amount: string | null;
    from: string | null;
    to: string | null;
    date: string | null;
  };
};

export const ConversionContextInstance = createContext(
  {} as ConversionContextT
);

const ConversionContext = (props: { children: ReactNode }) => {
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>("");
  const [historyData, setHistoryData] = useState<Record<string, any> | null>(
    null
  );
  const [duration, setDuration] = useState<DURATIONS>(DURATIONS.WEEK);
  const [conversionResults, setConversionResults] = useState<Record<
    string,
    any
  > | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (from && to) fetchHistory();
  }, [duration]);

  const currencies = useFetch(getCurrenciesOrNull);

  const handleSwap = useCallback(() => {
    setTo(from);
    setFrom(to);
  }, [from, to]);

  const fetchConversionResults = useCallback(
    async (
      conversionParams: GetConversionOrNullArguments,
      isViewingHistory?: boolean
    ) => {
      const data = await getConversionOrNull(conversionParams);
      setConversionResults(data);
      if (!isViewingHistory) setLocalHistory(conversionParams);
      return fetchHistory(conversionParams?.date || undefined);
    },
    [from, to, amount]
  );

  const fetchHistory = useCallback(
    async (date?: string) => {
      const data = await getRatesBasedOnTime({
        start_date: dayjs(date).subtract(duration, "day").format(DATE_FORMAT),
        end_date: date || dayjs().format(DATE_FORMAT),
        symbol: from || "",
      });
      setHistoryData(data);
    },
    [from, duration]
  );

  const setLocalHistory = useCallback((data: GetConversionOrNullArguments) => {
    const newItem = {
      ...data,
      date: dayjs().format(DATE_FORMAT),
      time: dayjs().format(TIME_FORMAT),
      id: crypto.randomUUID(),
    };
    const history = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (history) {
      const parsedHistory: Record<string, any>[] = JSON.parse(history);
      parsedHistory.push(newItem);
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(parsedHistory));
    } else {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify([newItem]));
    }
  }, []);

  const getLocalHistory = useCallback(() => {
    const history = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (history) return JSON.parse(history);
    return [];
  }, []);

  const deleteItemFromHistory = useCallback((itemId: string) => {
    const history = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!history) return;
    const parsedHistory = JSON.parse(history);
    const newHistory = parsedHistory.filter(
      (item: HistoryItem) => item.id !== itemId
    );
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(newHistory));
    return newHistory;
  }, []);

  const getParamsFromQueries = useCallback(
    () => ({
      from: searchParams.get("from"),
      to: searchParams.get("to"),
      amount: searchParams.get("amount"),
      date: searchParams.get("date"),
    }),
    [searchParams]
  );

  return (
    <ConversionContextInstance.Provider
      value={{
        from,
        conversionResults,
        fetchConversionResults,
        amount,
        setAmount,
        duration,
        setDuration,
        fetchHistory,
        historyData,
        setHistoryData,
        to,
        setTo,
        setFrom,
        currencies,
        handleSwap,
        getLocalHistory,
        deleteItemFromHistory,
        getParamsFromQueries,
      }}
    >
      {props.children}
    </ConversionContextInstance.Provider>
  );
};
export default ConversionContext;
