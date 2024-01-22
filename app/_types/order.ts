export interface Order {
  id: string;
  user_id: string;
  name: string;
  address: string;
  phone: string;
  title: string;
  image: string;
  quantity: Number;
  note: string;
  total: Number;
  payment: null;
  status: string;
  created_at: string;
  updated_at: string;
}
