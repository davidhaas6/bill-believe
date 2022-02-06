import { useEffect, useState } from "react";
import Bill from "../models/Bill";
import { LocalResponse, PredictionContext } from "../models/Responses";

import predData from '../assets/predictions.json'

interface FetchInfo {
  status: string;
  data?: any;
}

export function useFetch(request: RequestInfo, reqOptions?: RequestInit): FetchInfo {
  const [fetchState, setFetchState] = useState<FetchInfo>({ status: 'idle' })

  useEffect(() => {
    const getData = async () => {
      setFetchState(() => ({ status: 'fetching' }));

      try {
        let resp = await fetch(request, reqOptions);
        let json = await resp.json();
        console.log("got data");

        setFetchState(() => ({ status: 'done', data: json }));
        // setData(json);
        // setStatus('done'); // TODO: this causes an unnecessary re-render

      } catch (e) {
        console.log(e);
        setFetchState(() => ({ status: 'error' }));
      }

    }
    getData();
  }, []);

  return fetchState;
}


export function useLocalPredictions(): { status: string, billData?: PredictionContext[] } {
  const [billData, setBillData] = useState<PredictionContext[]>();

  // fetch the data and listen to its status
  const status = 'done';
  const fetchedData = predData;

  // once the data is retrieved, cast them to our bill datatype
  useEffect(() => {
    if (fetchedData && billData == null) {
      const data = (fetchedData as any) as LocalResponse; // see if it fits our mold
      console.log("getting data", data);
      if (data) {
        setBillData(() => Object.values(data.house).concat(Object.values(data.senate)));
        console.log(Object.values(data.house));
      }
    }
  }, [fetchedData, billData]);

  return { status, billData };
}


export function useBillInfo(slug: string, session?: number) {
  // https://projects.propublica.org/api-docs/congress-api/bills/
  const congress_sesh = session ?? 117;
  const endpoint = `https://api.propublica.org/congress/v1/${congress_sesh}/bills/${slug}.json`;
  const key = "5GmztF3eOjzPwZetK5gDmimR9z6DXb1WnLOT5U9z";

  let { status, data } = useFetch(endpoint, { headers: { "X-Api-Key": key } });

  if (data) {
    data = data['results'][0];
  }

  return { status, data }
}