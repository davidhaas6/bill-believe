import Bill from "./Bill";

export interface Prediction {
  bill: Bill,
  rawProb: number,
  doesPass: boolean
}

