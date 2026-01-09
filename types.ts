
export enum OrderStatus {
  PENDING_PAYMENT = '待付款',
  PENDING_DELIVERY = '待配送',
  ACCEPTED = '已接单',
  DELIVERING = '配送中',
  COMPLETED = '已完成',
  CANCELLED = '已取消',
  REFUNDING = '退款中'
}

export interface Store {
  id: string;
  name: string;
  address: string;
  distance: string;
  businessHours: string;
  isOpen: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  unit: string;
  isPackage?: boolean;
  savings?: number;
  packageDetail?: string; // e.g. "共23桶", "共144瓶"
  desc?: string;
  tag?: string;
}

export interface User {
  id: string;
  nickname: string;
  avatar: string;
  phone: string;
  isMember: boolean;
  memberLevel: string;
  balance: {
    principal: number;
    bonus: number;
  };
  waterTickets: number;
  points: number;
  isActivated: boolean;
}

export interface RechargePackage {
  id: string;
  amount: number;
  bonus: number;
  isRecommended?: boolean;
}

// Added DeliveryOrder interface to fix the missing export error in pages/delivery/DeliveryOrders.tsx
export interface DeliveryOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  floor: string;
  items: { name: string; qty: number }[];
  deliveryTime: string;
  status: OrderStatus;
  commission: number;
  source?: string;
}
