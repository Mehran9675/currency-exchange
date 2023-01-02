import axios from "./axios";
import END_POINTS from "./endPoints.enum";
import makeQuery from "../common/functions/make-query";

export type GetRatesBasedOnTimeOrNullArguments = {
  start_date: string;
  end_date: string;
  symbol: string;
};

const getRatesBasedOnTimeOrNull = async (
  rateParams: GetRatesBasedOnTimeOrNullArguments
) => {
  try {
    const { data } = await axios.get(
      END_POINTS.TIME_BASED + makeQuery(rateParams)
    );
    return data;
  } catch (e) {
    return null;
  }
};
export default getRatesBasedOnTimeOrNull;
