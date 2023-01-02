import style from "./style.module.css";
import { useContext } from "react";
import { ConversionContextInstance } from "../../../../common/context/conversion";

const ConversionResults = () => {
  const { conversionResults } = useContext(ConversionContextInstance);

  return (
    <div className={style["conversion-results-container"]}>
      <div className={style["conversion-results"]}>
        <div>
          <span>{conversionResults?.query?.amount}</span>
          <span>{conversionResults?.query?.from}</span>
        </div>
        <span>=</span>
        <div>
          <span>{conversionResults?.result}</span>
          <span>{conversionResults?.query?.to}</span>
        </div>
      </div>
      <span></span>
      <br />
      <span></span>
    </div>
  );
};
export default ConversionResults;
