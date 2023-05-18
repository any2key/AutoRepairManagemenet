export interface APIResponse {
  isOk: boolean;
  code: number;
  message: string;
}
export interface DataResponse<TData> {
  isOk: boolean;
  code: number;
  message: string;
  data: TData;
}
export const environment = {
  apiUrl: 'https://localhost:7142'
  //apiUrl: ''
};
export class Client {
  id: number;
  name: string;
  phone: string;
  carBrand: string;
  carNumber: string;
  carVin: string;
}

export class Employee {
  id: number;
  name: string;
  phone: string;
  position: string;
}

export class AutoPart {
  id: number;
  name: string;
  price: number;
}

export class Job {
  id: number;
  name: string;
  price: number;
}

export class Order {
  id: number;
  client: Client;
  employee: Employee;
  job: Job;
  autoPart: AutoPart;
  dateTime: string;
}

export class Document {
  id: number;
  order: Order;
  orderStatus: OrderStatus;
  jobQuality: JobQuality;
  clientReview: ClientReview;
}

export enum OrderStatus {
  NotReady,
  Ready
}

export enum JobQuality {
  Low,
  Normal,
  High
}

export enum ClientReview {
  VeryBad,
  Bad,
  Normal,
  Good,
  Excellent
}
