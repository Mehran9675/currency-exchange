import axios from "./axios";
import END_POINTS from "./endPoints.enum";

const getCurrenciesOrNull = async () => {
  try {
    const currencies = [];
    const { data } = await axios.get(END_POINTS.LATEST_PRICES);
    for (const currency in data.rates) {
      currencies.push(currency);
    }
    return currencies;
  } catch (e) {
    return null;
  }
};

export default getCurrenciesOrNull;
