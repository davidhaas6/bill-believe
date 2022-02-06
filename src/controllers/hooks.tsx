import { useEffect, useState } from "react";
import Bill from "../models/Bill";
import { LocalResponse, PredictionContext } from "../models/Responses";

import predData from '../assets/predictions.json'

export function useLocalPredictions(): { status: string, billData?: PredictionContext[] } {
  const [billData, setBillData] = useState<PredictionContext[]>();

  // fetch the data and listen to its status
  // const { status, data: fetchedData } = useFetch(
  //   'predictions.json',
  //   { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', "Access-Control-Allow-Origin": "*"} }
  // );
  const status = 'done';
  const fetchedData = predData;

  // once the data is retrieved, cast them to our bill datatype
  useEffect(() => {
    if (fetchedData && billData == null) {
      const data = (fetchedData as any) as LocalResponse; // see if it fits our mold
      console.log("getting data",data);
      if (data) {
        setBillData(() => Object.values(data.house));
        console.log(Object.values(data.house));
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
      try {
        let resp = await fetch(request, reqOptions);
        let json = await resp.json();
        setData(json);
        setStatus('done');

      } catch (e) {
        console.log(e);
        setStatus('error')
      }

    }
    getData();
  }, []);

  return { status, data };
}