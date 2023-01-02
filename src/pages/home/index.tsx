import Converter from "./components/converter";
import ExchangeHistory from "./components/exchangeHistory";
import { useContext, useEffect } from "react";
import { ConversionContextInstance } from "../../common/context/conversion";
import Show from "../../common/components/show";
import ConversionResults from "./components/conversionResults";

const Home = () => {
  const {
    conversionResults,
    setFrom,
    setTo,
    setAmount,
    fetchConversionResults,
    getParamsFromQueries,
  } = useContext(ConversionContextInstance);

  useEffect(() => {
    const queryData = getParamsFromQueries();
    if (!queryData?.from) return;
    setFrom(queryData.from);
    setTo(queryData.to);
    setAmount(queryData.amount);
    fetchConversionResults(queryData, true);
  }, [location.pathname]);

  return (
    <>
      <h2>I want to convert</h2>
      <Converter />
      <Show if={!!conversionResults}>
        <ConversionResults />
        <ExchangeHistory />
      </Show>
    </>
  );
};
export default Home;
