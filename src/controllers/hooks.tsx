import { useEffect, useState } from "react";
import Bill from "../models/Bill";
import { LocalResponse } from "../models/Responses";

export function useLocalPredictions(): { status: string, billData?: Bill[] } {
  const [billData, setBillData] = useState<Bill[]>();

  // fetch the data and listen to its status
  const { status, data: fetchedData } = useFetch(
    'predictions.json',
    { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }
  );

  // once the data is retrieved, cast them to our bill datatype
  useEffect(() => {
    if (fetchedData && billData == null) {
      const data = fetchedData as LocalResponse; // see if it fits our mold

      if (data) {
        setBillData(() => Object.values(data.house));
      }
    }
  }, [fetchedData, billData]);

  return { status, billData };
}

export function useFetch(request: RequestInfo, reqOptions?: RequestInit) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      setStatus('fetching');
      let resp = await fetch(request, reqOptions);
      let json = await resp.json();
      setData(json);
      setStatus('done');
    }
    getData();
  }, []);

  return { status, data };
}