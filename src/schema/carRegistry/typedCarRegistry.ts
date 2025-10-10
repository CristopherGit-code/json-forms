export default interface CarRegistry {
  owner_first_name: string;
  owner_last_name: string;
  car_make: string;
  car_model: string;
  car_year: number;
  vin: string;
  description?: string;
  registration_date: string; //string (ISO date)
  expiry_date: string;       //string (ISO date)
  is_active: boolean;
  condition?: 'New' | 'Like New' | 'Used' | 'Needs Repair';
  mileage?: number;
}