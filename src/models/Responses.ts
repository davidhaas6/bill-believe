import Bill from "./Bill";

export interface LocalResponse {
  house: {
    [number: string]: PredictionContext;
  }
  senate: {
    [number: string]: PredictionContext;
  }
}

// the data format of the json -- features (the Bill) + prediction output 
export interface PredictionContext extends Bill {
  raw_prediction: number           
  final_prediction: string
}