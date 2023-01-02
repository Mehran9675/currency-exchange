import { useCallback, useEffect, useState } from "react";

const useFetch = <T = any>(
  callback: Function,
  args?: typeof callback.arguments,
  condition?: boolean
) => {
  const [data, setData] = useState<T | null>(null);

  const fetch = useCallback(async () => {
    const data = await callback(args);
    setData(data);
  }, [callback]);

  useEffect(() => {
    if (condition !== false) fetch();
  }, [callback]);

  return data;
};
export default useFetch;
