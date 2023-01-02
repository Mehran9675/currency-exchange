export const enum DURATIONS {
  WEEK = 7,
  TWO_WEEKS = 14,
  MONTH = 30,
}

export const enum DATA_VIEW {
  TABLE = "table",
  CHART = "chart",
}

export type HistoryItem = {
  date: string;
  time: string;
  from: string;
  to: string;
  amount: string;
  id: string;
};
