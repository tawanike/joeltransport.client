//Authorization
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const LOADING = "LOADING";
export const GET_BOOKING = "GET_BOOKING";
export const SELECT_TRUCK = "SELECT_TRUCK";
export const RESET_BOOKING = "RESET_BOOKING";
export const ADD_STORAGE_COUNT = "ADD_STORAGE_COUNT";
export const RESET_COST_SUMMARY = "RESET_COST_SUMMARY";
export const ADD_BAKKIE_SHUTTLE = "ADD_BAKKIE_SHUTTLE";
export const ADJUST_ADDITIONAL_SERVICES = "ADJUST_ADDITIONAL_SERVICES";
export const ADD_MOVE_DETAILS = "ADD_MOVE_DETAILS";
export const ADD_PRODUCTS_DATA = "ADD_ADDITIONAL_PRODUCTS_DATA";
export const ADD_FORM_VALUES = "ADD_FORM_VALUES";
export const EDIT_ADDITIONAL_SERVICES = "EDIT_ADDITIONAL_SERVICES";
export const ADD_INVENTORY_ITEM = "ADD_INVENTORY_ITEM";
export const DELETE_INVENTORY_ITEM = "DELETE_INVENTORY_ITEM";
export const ZERO_TRUCK_QUANTITY = "ZERO_TRUCK_QUANTITY";
export const ADD_STORAGE_ADDITIONAL_SERVICES =
  "ADD_STORAGE_ADDITIONAL_SERVICES";
export const CHANGE_OPEN_SECTION = "CHANGE_OPEN_SECTION";
export const ADD_STORAGE_HANDLING_FEE = "ADD_STORAGE_HANDLING_FEE";

export type RequestOptions = {
  method: string;
  headers: {
    "Content-Type"?: string;
    Authorization: string;
  };
  body: any;
  mode?: "cors" | "no-cors" | "same-origin";
};

export type RequestDetails = {
  method: string;
  token?: string;
};

export type AuthView =
  | "login"
  | "register"
  | "forgotPassword"
  | "resetPassword"
  | "verifyEmail";

export type CostSummary = {
  truck: {
    quantity: number;
    price: number;
    off_peak_discount: number;
  } | null;
  bakkieShuttle: {
    quantity: number;
    price: number;
  } | null;
  storage: {
    quantity: number;
    price: number;
  };
  storageHandlingFee: {
    quantity: number;
    price: number;
  };
  subtotal: number;
  vat: number;
  total: number;
};

export type FetchWrapper = {
  get: (url: string, body?: any) => Promise<any>;
  post: (url: string, body: any) => Promise<any>;
  put: (url: string, body: any) => Promise<any>;
  patch: (url: string, body: any) => Promise<any>;
  delete: (url: string, body: any) => Promise<any>;
};

export type LoginDetails = { username: string; password: string };

export interface IAction {
  type: string;
  payload?: any;
}

export interface IProduct {
  storage_units_recommendations: any;
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  image: string;
  category: number | string;
  ordering: number;
  published: boolean;
  size: string;
  unit: string;
  price: number;
  weight: number | null;
  load_capacity: number | null;
  off_peak_discount: number;
  available: boolean;
}

export interface IFormValues {
  id: string | undefined;
  from_address: IAddress;
  to_address: IAddress;
  from_address_original: any;
  to_address_original: any;
  from_property_type: number;
  to_property_type: number;
  move_date: any;
  move_time_period: number;
  move_type: number;
  submited: boolean;
  to_floors_count: number;
  from_floors_count: number;
  from_working_lift: boolean;
  to_working_lift: boolean;
  requires_bakkie_shuttle: boolean;
  bakkie_address: number | null;
  storage_units_count: number;
  deliver_to_storage: boolean;
  products: IProduct[];

  moving_survey: boolean;
  packing_material: boolean;
  packing_service: boolean;
  insurance: boolean;
  storage: boolean;
  bakkie_shuttle: boolean;
  crating: boolean;
  gauteng_removal: boolean;
  international_moving_services: boolean;

  addOns: any[];
  inventoryList: IInventoryListItem[];
  self_delivery: boolean;

  user: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
  };
}

export interface IInventoryListItem {
  inventory_item: string;
  quantity: number;
  booking: string;
  room: number;
  category: number | string;
  description: string;
}

export interface IBooking {
  id: string | undefined;
  products: IProduct[];
  formValues: IFormValues;
  loading: boolean;
  openSection:
    | "move_details"
    | "additional_services"
    | "inventory"
    | "truck"
    | "bakkie_shuttle"
    | "storage"
    | "personal";
  additionalServices: { [key: string]: boolean };
  inventoryList: IInventoryListItem[];
}

export interface IAddress {
  place_id: string;
  formatted_address: string;
  street_address: string;
  city: string;
  suburb: string;
  province: string;
  country: string;
}

export interface IRoom {
  id: string;
  title: string;
  image: string;
  cover: string;
}

export interface IInventoryItem {
  id: string;
  category: number;
  created_at: string;
  description: string;
  title: string;
  updated_at: string;
  weight: string;
}
