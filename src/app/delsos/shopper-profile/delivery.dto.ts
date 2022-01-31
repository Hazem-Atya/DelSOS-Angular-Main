import { DELIVERY_STATUS, DELIVERY_TYPE, PRIORITY } from "environments/constants";
import { Store } from "../model/Store";

export class Delivery  {
  description: string;
  source: string;
  destination: string;
  store: Store;
  weight: number;
  height: number;
  width: number;
  type: string;
  priority: number;
  status: string;
  trackingHistory: { date: Date; description: string, location:string }[];
  applicants: String[];
}
