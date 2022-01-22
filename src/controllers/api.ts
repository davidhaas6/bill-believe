import Bill from "../models/Bill";

export interface BillPageRequest {
  page: number;
  sorting: string;
  descending: string;
}

export interface BillPageResponse {
  bills: Bill[];
  page: number;
}