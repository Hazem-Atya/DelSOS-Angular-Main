export enum DELIVERY_TYPE {
    BREAKABLE = 'breakable',
    HAZARDOUS = 'hazardous',
    FURNITURE = 'furniture',
    PACKAGE = 'package',
    LIQUID = 'liquid',
    CAN_EXPIRE = 'can expire',
    ELECTRONICS = 'electronics',
  }
  export enum PRIORITY {
    HIGH = 1,
    NORMAL = 2,
    LOW = 3,
  }
  export enum DELIVERY_STATUS {
    PENDING = 1,
    ON_THE_WAY = 2,
    DELIVERED = 3,
  }
export class Delivery{
    description: string;
    source: string;
    destination: string;
    store: Object;
    shopper: Object;
    weight: number;
    height: number;
    width: number;
    type: DELIVERY_TYPE[];
    priority: PRIORITY;
    status: DELIVERY_STATUS;
    trackingHistory: { date: Date; description: string }[];
    applicants: String[];
}