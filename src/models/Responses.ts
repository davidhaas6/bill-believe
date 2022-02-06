import Bill from "./Bill";

export interface LocalResponse {
  house: {
    [number: string]: Bill;
  }
  senate: {
    [number: string]: Bill;
  }
}