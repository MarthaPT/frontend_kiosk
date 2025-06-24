import { Api } from "@/common/utils/httpsinterceptor";
import useSWR from "swr";
import { ProductsInterface } from "./adminProduct";

const service = import.meta.env.VITE_ENV_SERVICE;
const route = "/orders";

export interface OrdersOut {
  created_at: string | number | Date;
  id: number;
  product_id: string;
  processed: boolean;
  products: ProductsInterface[];
  quantity: number;
}

export interface OrdersIn {
  product_id: number;
  quantity: number;
}
interface Orders {
  createOrder: (data: OrdersIn) => Promise<OrdersOut>;
  getOrders: () => Promise<OrdersOut[]>;
  getUnprocess: () => Promise<OrdersOut[]>;
  getProcessed: () => Promise<OrdersOut[]>;
  getOne: (id: number) => Promise<OrdersOut>;
  delete: (id: number) => Promise<OrdersOut>;
  update: (order_id: number, processed_status: boolean) => Promise<OrdersOut>;
}

export const OrdersService: Orders = {
  createOrder: (data) =>
    Api(service).post(route, data, {
      headers: { "Content-Type": "application/json" },
    }),
  getOne: (id) => Api(service).get(`${route}/${id}`),
  getUnprocess: () => Api(service).get(`${route}/unprocessed`),
  getProcessed: () => Api(service).get(`${route}/processed`),
  getOrders: () => Api(service).get(route),
  delete: (id) => Api(service).get(`${route}/${id}`),
  update: (order_id, processed_status ) =>
    Api(service).patch(`${route}/${order_id}/processed?processed_status=${processed_status}`)
};

export const useOrders = () => {
  // Use SWR to fetch products from the API
  const { data, error, isLoading } = useSWR(route, OrdersService.getUnprocess);

  return {
    data,
    isLoading,
    isError: error,
    createOrder: OrdersService.createOrder,
    update: OrdersService.update,
    getProcessed: OrdersService.getProcessed,
  };
};
