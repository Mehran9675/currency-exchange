import axios from "./axios";
import END_POINTS from "./endPoints.enum";
import makeQuery from "../common/functions/make-query";

export type GetConversionOrNullArguments = {
  from: string | null;
  to: string | null;
  amount: string | null;
  date?: string | null;
};

export type GetConversionOrNullFunction = (
  convertParams: GetConversionOrNullArguments
) => Promise<Record<string, string>>;

const getConversionOrNull: GetConversionOrNullFunction = async (
  convertParams
) => {
  try {
    const { data } = await axios.get(
      END_POINTS.CONVERT_FROM_TO + makeQuery(convertParams)
    );
    return data;
  } catch (e) {
    return null;
  }
};
export default getConversionOrNull;
